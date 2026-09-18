import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, calculateEmi, createVisualData, splitStages } from '../lib/calculator.ts';
const input = { plot: 1200, floors: [1000, 800], rate: 2649, headroom: 100, allowances: [], reservePercent: 0 };
test('different floor areas and headroom are charged exactly once', () => {
  const result = calculateEstimate(input);
  assert.equal(result.area, 1900);
  assert.equal(result.floorCost, 4768200);
  assert.equal(result.headroomCost, 264900);
  assert.equal(result.total, 5033100);
});
test('unpriced selections stay visible and do not masquerade as included items', () => {
  const result = calculateEstimate({ ...input, allowances: [
    { key: 'sump', label: 'Sump', selected: true, amount: null },
    { key: 'gate', label: 'Gate', selected: true, amount: 125000 },
    { key: 'lift', label: 'Lift', selected: false, amount: 800000 },
  ], reservePercent: 5 });
  assert.equal(result.allowanceTotal, 125000);
  assert.equal(result.unpriced.length, 1);
  assert.equal(result.reserve, 257905);
  assert.equal(result.total, 5416005);
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
  assert.equal(visual.parts.reduce((sum, item) => sum + item.value, 0), 5416005);
  assert.equal(visual.floors.reduce((sum, item) => sum + item.area, 0), 1900);
  assert.equal(visual.allocation.reduce((sum, item) => sum + item.amount, 0), estimate.base);
  assert.equal(visual.unpricedCount, 1);
  assert.equal(visual.comparisons[0].base, 5033100);
});
test('EMI follows amortization and handles zero interest', () => {
  assert.ok(Math.abs(calculateEmi(5000000, 8.5, 20).monthly - 43391.16) < 0.01);
  assert.equal(calculateEmi(1200000, 0, 10).monthly, 10000);
  assert.equal(calculateEmi(1200000, 0, 10).interest, 0);
  assert.equal(calculateEmi(100, 8, 0), null);
  assert.equal(calculateEmi(NaN, 8, 20), null);
});

import { constructionMonths, parkingArea, extraAmount, extraOptions, initialExtra, extraDescription } from '../lib/calculator-options.ts';
test('car presets charge parking once as an extra, not again at the package rate', () => {
 const parking=extraOptions.find(item=>item.key==='parking');
 for(const cars of [1,2,3,4]) {
  const value={...initialExtra(parking),selected:true,cars,quantity:String(parkingArea(cars))};
  const amount=extraAmount(value);
  assert.equal(amount,cars*200*2350);
  const result=calculateEstimate({...input,allowances:[{key:'parking',label:'Parking',selected:true,amount}]});
  assert.equal(result.area,1900);
  assert.equal(result.total,5033100+amount);
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
 assert.equal(extraAmount(value),200000);
 assert.equal(extraAmount({...value,quantity:'7500',rate:'45'}),337500);
 assert.equal(extraAmount({...value,mode:'lump',amount:'123456'}),123456);
 assert.equal(extraAmount({...value,mode:'unpriced'}),null);
 assert.equal(extraAmount({...value,quantity:''}),null);
 assert.equal(extraAmount({...value,rate:''}),null);
 assert.ok(Number.isNaN(extraAmount({...value,quantity:'-10'})));
 assert.ok(Number.isNaN(extraAmount({...value,rate:'Infinity'})));
 assert.equal(extraDescription(sump,{...value,quantity:'7500',rate:'45'}),'7500 litres × ₹45 / litres');
 const tank=extraOptions.find(item=>item.key==='tank');
 assert.equal(extraAmount(initialExtra(tank)),null,'included overhead capacity is not automatically charged twice');
});
