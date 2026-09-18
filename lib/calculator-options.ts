/** Reference-based allowances for exploration, not confirmed Bind Builds prices. */
export type ExtraOption = {key:string; label:string; detail:string; unit:string; quantity:string; rate:string; presets?:{label:string;rate:number}[]};
export const extraOptions: ExtraOption[] = [
 {key:'parking',label:'Separate car parking',detail:'Exclude this area from the floor areas to avoid counting it twice. Layout and access need review.',unit:'sq.ft',quantity:'200',rate:'2350'},
 {key:'compound',label:'Compound wall',detail:'Wall only; gate is a separate item. Height, foundations and finishes affect cost.',unit:'running ft',quantity:'100',rate:'2750'},
 {key:'gate',label:'Main gate · MS / sliding',detail:'Size, finish and automation need confirmation.',unit:'item',quantity:'1',rate:'125000'},
 {key:'sump',label:'Underground sump',detail:'Select a capacity for budgeting; actual sizing depends on demand and supply.',unit:'litres',quantity:'5000',rate:'40'},
 {key:'septic',label:'Conventional septic tank',detail:'Alternative to the recycling allowance here. The site drainage solution requires professional review.',unit:'litres',quantity:'2000',rate:'35'},
 {key:'recycling',label:'Wastewater recycling system',detail:'Choose an occupancy allowance. Suitability, treatment, discharge and scope need review.',unit:'system',quantity:'1',rate:'170000',presets:[{label:'1–6 people',rate:170000},{label:'7–10 people',rate:200000},{label:'11–15 people',rate:250000}]},
 {key:'solar',label:'Solar panels · 3 kW',detail:'Reference equipment allowance; capacity and installation scope need confirmation.',unit:'system',quantity:'1',rate:'150000'},
 {key:'cctv',label:'CCTV & security',detail:'Devices and cabling beyond the package provision.',unit:'system',quantity:'1',rate:'30000'},
 {key:'smart',label:'Smart-home automation',detail:'Equipment beyond package provisions; devices and controls to be agreed.',unit:'system',quantity:'1',rate:'20000'},
 {key:'lift',label:'Lift · 4 passengers',detail:'Equipment allowance; stops and installation affect price. Check shaft and civil-work scope separately.',unit:'item',quantity:'1',rate:'800000'},
 {key:'tank',label:'Additional overhead tank capacity',detail:'Only extra capacity beyond the included tank. This reference RCC rate is not an upgrade credit calculation.',unit:'litres',quantity:'',rate:'55'},
 {key:'interiors',label:'Interiors & fitted furniture',detail:'Enter an allowance or leave unpriced for a project-specific proposal.',unit:'item',quantity:'1',rate:''},
];
export type ExtraSelection = {selected:boolean;mode:'unit'|'lump'|'unpriced';quantity:string;rate:string;amount:string;cars:number};
export const initialExtra = (item:ExtraOption):ExtraSelection => ({selected:false,mode:item.rate?'unit':'unpriced',quantity:item.quantity,rate:item.rate,amount:'',cars:item.key==='parking'?1:0});
export function extraAmount(value:ExtraSelection):number|null {
 if(value.mode==='unpriced')return null;
 if(value.mode==='lump')return value.amount.trim()===''?null:Number(value.amount);
 if(!value.quantity.trim() || !value.rate.trim())return null;
 const quantity=Number(value.quantity),rate=Number(value.rate);
 if(!Number.isFinite(quantity)||!Number.isFinite(rate)||quantity<=0||quantity>100000||rate<=0||rate>10000000)return NaN;
 return Math.round(quantity*rate);
}
export function parkingArea(cars:number) {
 if(!Number.isInteger(cars)||cars<1||cars>4)throw new RangeError('Select 1–4 cars');
 return cars*200;
}
export function constructionMonths(floors:number) {
 if(!Number.isInteger(floors)||floors<1||floors>4)throw new RangeError('Select 1–4 floors');
 return 6+(floors-1)*4;
}
export function extraDescription(item:ExtraOption,value:ExtraSelection) {
 if(value.mode==='unit' && value.quantity.trim() && value.rate.trim())return `${value.quantity} ${item.unit} × ₹${Number(value.rate).toLocaleString('en-IN')} / ${item.unit}${item.key==='parking'&&value.cars?` · ${value.cars}-car preset`:''}`;
 return value.mode==='lump'?'Custom total allowance':'To be quoted';
}
export const packageMetrics = [
 {flooring:65,bathroom:20000,tank:2000,benefits:['2D plans + 3D exterior','Twice-weekly project-manager visits','Daily progress photographs']},
 {flooring:90,bathroom:30000,tank:3000,benefits:['Soil test + structural drawings','Daily project-manager visit','Dedicated architect + stage visits']},
 {flooring:200,bathroom:60000,tank:6000,benefits:['Interior views + walkthrough','Frequent architect site visits','Landscape + approval drawings']},
];
