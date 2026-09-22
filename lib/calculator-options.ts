/** Reference-based allowances for exploration, not confirmed Bind Builds prices. */
export type ExtraOption = {
 key:string;
 label:string;
 detail:string;
 unit:string;
 quantity:string;
 rate:string;
 quantityPresets?:{label:string;quantity:number;note?:string}[];
};
export const extraOptions: ExtraOption[] = [
 {key:'parking',label:'Separate car parking',detail:'Exclude this area from the floor areas to avoid counting it twice. Layout and access need review.',unit:'sq.ft',quantity:'200',rate:'2350'},
 {key:'compound',label:'Compound wall',detail:'Enter wall length and average height. Wall only; gate is a separate item. Foundations and finishes affect cost.',unit:'sq.ft',quantity:'600',rate:'450'},
 {key:'gate',label:'Main gate · MS / sliding',detail:'Size, finish and automation need confirmation.',unit:'item',quantity:'1',rate:'125000'},
 {key:'sump',label:'Underground sump',detail:'Standard minimum planning capacity starts at 6,000 litres. Choose a family-size preset or enter a higher capacity manually. Final sizing depends on occupancy, supply frequency, tanker dependence, overhead storage and site requirements.',unit:'litres',quantity:'6000',rate:'30',quantityPresets:[
  {label:'1–4 members',quantity:6000,note:'6,000 L'},
  {label:'5–8 members',quantity:9000,note:'9,000 L'},
  {label:'9–12 members',quantity:12000,note:'12,000 L'},
  {label:'13–16 members',quantity:15000,note:'15,000 L'},
 ]},
 {key:'septic',label:'Conventional septic tank',detail:'Capacity is a planning allowance only. Final sizing and drainage solution require professional review.',unit:'litres',quantity:'2000',rate:'25'},
 {key:'solar',label:'Solar panels · 3 kW',detail:'Reference equipment allowance; capacity and installation scope need confirmation.',unit:'system',quantity:'1',rate:'150000'},
 {key:'cctv',label:'CCTV & security',detail:'Devices and cabling beyond the package provision.',unit:'system',quantity:'1',rate:'30000'},
 {key:'lift',label:'Lift · 4 passengers',detail:'Equipment allowance; stops and installation affect price. Check shaft and civil-work scope separately.',unit:'item',quantity:'1',rate:'800000'},
 {key:'tank',label:'Additional overhead tank capacity',detail:'Only extra capacity beyond the included tank. This reference rate is not an upgrade credit calculation.',unit:'litres',quantity:'',rate:'35'},
 {key:'interiors',label:'Interiors & fitted furniture',detail:'Enter an allowance or leave unpriced for a project-specific proposal.',unit:'item',quantity:'1',rate:''},
];
export type ExtraSelection = {
 selected:boolean;
 mode:'unit'|'lump'|'unpriced';
 quantity:string;
 rate:string;
 amount:string;
 cars:number;
 length?:string;
 height?:string;
};
export const initialExtra = (item:ExtraOption):ExtraSelection => ({
 selected:false,
 mode:item.rate?'unit':'unpriced',
 quantity:item.quantity,
 rate:item.rate,
 amount:'',
 cars:item.key==='parking'?1:0,
 length:item.key==='compound'?'100':'',
 height:item.key==='compound'?'6':'',
});
export function extraAmount(value:ExtraSelection):number|null {
 if(value.mode==='unpriced')return null;
 if(value.mode==='lump')return value.amount.trim()===''?null:Number(value.amount);
 if(!value.quantity.trim() || !value.rate.trim())return null;
 const quantity=Number(value.quantity),rate=Number(value.rate);
 if(!Number.isFinite(quantity)||!Number.isFinite(rate)||quantity<=0||quantity>100000||rate<=0||rate>10000000)return NaN;
 return Math.round(quantity*rate);
}
export function compoundWallArea(length:string,height:string):string {
 if(!length.trim()||!height.trim())return '';
 const l=Number(length),h=Number(height);
 if(!Number.isFinite(l)||!Number.isFinite(h)||l<=0||h<=0||l>10000||h>100)return '';
 return String(Math.round(l*h*100)/100);
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
 if(item.key==='compound'&&value.mode==='unit'&&value.length?.trim()&&value.height?.trim()&&value.quantity.trim()&&value.rate.trim())return `${value.length} ft × ${value.height} ft = ${value.quantity} sq.ft × ₹${Number(value.rate).toLocaleString('en-IN')} / sq.ft`;
 if(value.mode==='unit' && value.quantity.trim() && value.rate.trim())return `${value.quantity} ${item.unit} × ₹${Number(value.rate).toLocaleString('en-IN')} / ${item.unit}${item.key==='parking'&&value.cars?` · ${value.cars}-car preset`:''}`;
 return value.mode==='lump'?'Custom total allowance':'To be quoted';
}
export const packageMetrics = [
 {flooring:65,bathroom:20000,tank:2000,benefits:['2D plans + 3D exterior','Twice-weekly project-manager visits','Daily progress photographs']},
 {flooring:90,bathroom:30000,tank:3000,benefits:['Soil test + structural drawings','Daily project-manager visit','Dedicated architect + stage visits']},
 {flooring:200,bathroom:60000,tank:6000,benefits:['Interior views + walkthrough','Frequent architect site visits','Landscape + approval drawings']},
];
