import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, calculateEmi, createVisualData, splitStages } from '../lib/calculator.ts';
const input = { plot: 1200, floors: [1000, 800], rate: 2649, headroom: 100, allowances: [], reservePercent: 0 };
test('different floor areas and headroom are charged exactly once', () => {
  const result = calculateEstimate(input);
  assert.equal(result.area, 1900);
  assert.equal(result.floorCost, 4768200);
  assert.equal(result.headroomCost, 235000);
  assert.equal(result.total, 5003200);
});
test('unpriced selections stay visible and do not masquerade as included items', () => {
  const result = calculateEstimate({ ...input, allowances: [
    { key: 'sump', label: 'Sump', selected: true, amount: null },
    { key: 'gate', label: 'Gate', selected: true, amount: 125000 },
    { key: 'lift', label: 'Lift', selected: false, amount: 800000 },
  ], reservePercent: 5 });
  assert.equal(result.allowanceTotal, 125000);
  assert.equal(result.unpriced.length, 1);
  assert.equal(result.reserve, 0);
  assert.equal(result.total, 5128200);
});
test('invalid and nonfinite inputs cannot produce an estimate', () => {
  for (const change of [{floors: []}, {floors: [NaN]}, {floors: [-1]}, {floors: [1.2]}, {plot: 0}, {rate: Infinity}, {headroom: -1}, {reservePercent: 26}, {floors: [1,1,1,1,1]}]) assert.throws(() => calculateEstimate({ ...input, ...change }), RangeError);
  assert.throws(() => calculateEstimate({...input, allowances: [{key:'x',label:'x',selected:true,amount:0}]}), RangeError);
});
test('stage allocation reconciles to the base after rupee rounding', () => {
  for (const base of [2399, 5033100, 5298001, 1279920000]) {
    const parts = splitStages(base);
    assert.equal(parts.reduce((sum, part) => sum + part.amount, 0), base);
    assert.equal(parts.reduce((sum, part) => sum + part.percent, 0), 100);
    assert.ok(parts.every(part => part.amount >= 0));
  }
});
test('report diagrams reconcile area and budget without pricing unknown extras', () => {
  const scenario = {...input, reservePercent: 5, allowances: [
    {key:'gate',label:'Gate',selected:true,amount:125000},
    {key:'sump',label:'Sump',selected:true,amount:null},
  ]};
  const estimate = calculateEstimate(scenario);
  const visual = createVisualData(scenario, estimate, 'Elevate', [{name:'Elevate',rate:2649,base:estimate.base}]);
  assert.equal(visual.parts.reduce((sum, item) => sum + item.value, 0), 5128200);
  assert.equal(visual.floors.reduce((sum, item) => sum + item.area, 0), 1900);
  assert.equal(visual.allocation.reduce((sum, item) => sum + item.amount, 0), estimate.base);
  assert.equal(visual.unpricedCount, 1);
  assert.equal(visual.comparisons[0].base, 5003200);
});
test('EMI follows amortization and handles zero interest', () => {
  assert.ok(Math.abs(calculateEmi(5000000, 8.5, 20).monthly - 43391.16) < 0.01);
  assert.equal(calculateEmi(1200000, 0, 10).monthly, 10000);
  assert.equal(calculateEmi(1200000, 0, 10).interest, 0);
  assert.equal(calculateEmi(100, 8, 0), null);
  assert.equal(calculateEmi(NaN, 8, 20), null);
});

import { compoundWallArea, constructionMonths, parkingArea, extraAmount, extraOptions, initialExtra, extraDescription } from '../lib/calculator-options.ts';
test('car parking is charged once inside base construction, not additional items', () => {
 const parking=extraOptions.find(item=>item.key==='parking');
 for(const cars of [1,2,3,4]) {
  const value={...initialExtra(parking),selected:true,cars,quantity:String(parkingArea(cars))};
  const amount=extraAmount(value);
  assert.equal(amount,cars*200*2350);
  const result=calculateEstimate({...input,allowances:[{key:'parking',label:'Parking',selected:true,amount}]});
  assert.equal(result.area,1900);
  assert.equal(result.parkingCost,amount);
  assert.equal(result.base,5003200+amount);
  assert.equal(result.allowanceTotal,0);
  assert.equal(result.total,5003200+amount);
  const visual=createVisualData({...input,allowances:[{key:'parking',label:'Parking',selected:true,amount}]},result,'Elevate',[]);
  assert.equal(visual.parts[0].value,result.base);
  assert.equal(visual.parts[1].value,0);
  assert.equal(visual.extras.some(item=>item.label==='Parking'),false);
 }
 assert.throws(()=>parkingArea(0),RangeError);
});
test('floor configurations produce 6, 10, 14, 18 month planning scenarios',()=>{
 assert.deepEqual([1,2,3,4].map(constructionMonths),[6,10,14,18]);
 assert.throws(()=>constructionMonths(0),RangeError);
});
test('unit rates, custom totals and unpriced choices remain distinct',()=>{
 const sump=extraOptions.find(item=>item.key==='sump');
 const value={...initialExtra(sump),selected:true};
 assert.equal(extraAmount(value),180000);
 assert.equal(extraAmount({...value,quantity:'7500',rate:'45'}),337500);
 assert.equal(extraAmount({...value,mode:'lump',amount:'123456'}),123456);
 assert.equal(extraAmount({...value,mode:'unpriced'}),null);
 assert.equal(extraAmount({...value,quantity:''}),null);
 assert.equal(extraAmount({...value,rate:''}),null);
 assert.ok(Number.isNaN(extraAmount({...value,quantity:'-10'})));
 assert.ok(Number.isNaN(extraAmount({...value,rate:'Infinity'})));
 assert.equal(extraDescription(sump,{...value,quantity:'7500',rate:'45'}),'7500 litres × ₹45 / litres');
 assert.deepEqual(sump.quantityPresets.map(p=>p.quantity),[6000,9000,12000,15000]);
 const septic=extraOptions.find(item=>item.key==='septic');
 assert.equal(septic.rate,'25');
 const tank=extraOptions.find(item=>item.key==='tank');
 assert.equal(tank.rate,'35');
 assert.equal(extraAmount(initialExtra(tank)),null,'included overhead capacity is not automatically charged twice');
 assert.equal(extraOptions.some(item=>item.key==='recycling'),false);
 assert.equal(extraOptions.some(item=>item.key==='smart'),false);
});

test('reference categories reconcile with additional items and no reserve',()=>{
 const result=calculateEstimate({...input,allowances:[{key:'gate',label:'Gate',selected:true,amount:125000},{key:'tank',label:'Tank',selected:true,amount:null}],reservePercent:5});
 const visual=createVisualData(input,result,'Elevate',[]);
 assert.deepEqual(visual.allocation.map(x=>x.percent),[20,13,12,6,10,8,7,7,8,9]);
 assert.equal(visual.allocation.reduce((sum,x)=>sum+x.amount,0),result.base);
 assert.equal(visual.extras.reduce((sum,x)=>sum+x.value,0),125000);
 assert.equal(visual.parts.reduce((sum,x)=>sum+x.value,0),result.total);
 assert.equal(visual.unpricedCount,1);
});

test('headroom pricing modes stay distinct and decimal areas are accepted',()=> {
 const unit=calculateEstimate({...input,headroom:200.5,headroomRate:2350,headroomMode:'unit'});
 assert.equal(unit.headroomCost,471175);
 assert.equal(unit.area,2000.5);
 const custom=calculateEstimate({...input,headroom:200,headroomRate:3000,headroomMode:'unit'});
 assert.equal(custom.headroomCost,600000);
 const lump=calculateEstimate({...input,headroom:200,headroomMode:'lump',headroomAmount:500000});
 assert.equal(lump.headroomCost,500000);
 const quote=calculateEstimate({...input,headroom:200,headroomMode:'unpriced'});
 assert.equal(quote.headroomCost,0);
 assert.equal(quote.unpriced.at(-1).key,'headroom');
 assert.throws(()=>calculateEstimate({...input,headroom:10000.01}),RangeError);
});

test('package comparison can keep headroom allowance fixed while package floor rate changes',()=> {
 const scenario={...input,headroom:200,headroomRate:2350,headroomMode:'unit'};
 const estimate=calculateEstimate(scenario);
 const comparisons=[
  {name:'Essential',rate:2399,base:estimate.floorArea*2399+estimate.headroomCost},
  {name:'Elevate',rate:2649,base:estimate.floorArea*2649+estimate.headroomCost},
  {name:'Signature',rate:3199,base:estimate.floorArea*3199+estimate.headroomCost},
 ];
 assert.equal(comparisons[1].base,estimate.base);
 assert.equal(comparisons[1].base-comparisons[0].base,estimate.floorArea*(2649-2399));
 assert.equal(comparisons[2].base-comparisons[1].base,estimate.floorArea*(3199-2649));
});

test('compound wall uses length × height square-foot pricing at the reference rate',()=> {
 const compound=extraOptions.find(item=>item.key==='compound');
 const value={...initialExtra(compound),selected:true};
 assert.equal(compound.unit,'sq.ft');
 assert.equal(compound.rate,'450');
 assert.equal(compoundWallArea(value.length,value.height),'600');
 assert.equal(extraAmount(value),270000);
 assert.match(extraDescription(compound,value),/100 ft × 6 ft = 600 sq.ft × ₹450 \/ sq.ft/);
});

test('package comparison keeps selected parking inside base construction at a fixed parking allowance',()=> {
 const parking=extraOptions.find(item=>item.key==='parking');
 const value={...initialExtra(parking),selected:true,cars:1,quantity:'200'};
 const parkingAmount=extraAmount(value);
 const scenario={...input,headroom:200,headroomRate:2350,headroomMode:'unit',allowances:[{key:'parking',label:'Parking',selected:true,amount:parkingAmount}]};
 const estimate=calculateEstimate(scenario);
 const comparisons=[
  {name:'Essential',rate:2399,base:estimate.floorArea*2399+estimate.headroomCost+estimate.parkingCost},
  {name:'Elevate',rate:2649,base:estimate.floorArea*2649+estimate.headroomCost+estimate.parkingCost},
  {name:'Signature',rate:3199,base:estimate.floorArea*3199+estimate.headroomCost+estimate.parkingCost},
 ];
 assert.equal(comparisons[1].base,estimate.base);
 assert.equal(comparisons[1].base-comparisons[0].base,estimate.floorArea*(2649-2399));
 assert.equal(comparisons[2].base-comparisons[1].base,estimate.floorArea*(3199-2649));
});
