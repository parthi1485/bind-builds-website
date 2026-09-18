'use client';
import { extraAmount, initialExtra, parkingArea, type ExtraOption, type ExtraSelection } from '@/lib/calculator-options';
import { money } from '@/lib/calculator';
type Props={item:ExtraOption;value?:ExtraSelection;onChange:(change:Partial<ExtraSelection>)=>void};
export default function CalculatorExtra({item,value:stored,onChange}:Props){
 const value=stored??initialExtra(item), amount=extraAmount(value);
 return <div className={`calcExtra ${value.selected?'selected':''}`}>
  <label className="calcCheck"><input type="checkbox" checked={value.selected} onChange={e=>onChange({selected:e.target.checked})}/><span>{item.label}<small>{item.detail}</small></span></label>
  {value.selected&&<div className="extraEditor">
   {item.key==='parking'&&<fieldset className="calcChoices"><legend>Number of cars · area preset</legend><div className="calcPresets">{[1,2,3,4].map(cars=><button type="button" key={cars} aria-pressed={value.cars===cars} onClick={()=>onChange({cars,quantity:String(parkingArea(cars)),mode:'unit'})}>{cars} {cars===1?'car':'cars'}<small>{parkingArea(cars)} sq.ft</small></button>)}</div><p className="calcHint">200 sq.ft per car is a budgeting preset, not a minimum parking standard. Edit the area to suit your layout.</p></fieldset>}
   <label>Pricing method<select value={value.mode} onChange={e=>onChange({mode:e.target.value as ExtraSelection['mode']})}><option value="unit">Quantity × unit rate</option><option value="lump">Enter total allowance</option><option value="unpriced">Request a quote</option></select></label>
   {value.mode==='unit'&&<>
    {item.presets&&<div className="calcPresets" aria-label={`${item.label} reference allowances`}>{item.presets.map(preset=><button type="button" key={preset.label} aria-pressed={value.rate===String(preset.rate)} onClick={()=>onChange({rate:String(preset.rate),quantity:'1'})}>{preset.label}<small>{money(preset.rate)}</small></button>)}</div>}
    <div className="extraUnitFields"><label>{item.key==='parking'?'Parking area':'Quantity'} <span>{item.unit}</span><input type="number" inputMode="decimal" min="0.01" max="100000" step="0.01" placeholder="To be confirmed" value={value.quantity} onChange={e=>onChange({quantity:e.target.value,...(item.key==='parking'?{cars:0}:{})})}/></label><label>Unit rate <span>₹ / {item.unit}</span><input type="number" inputMode="decimal" min="0.01" max="10000000" step="0.01" placeholder="Enter rate" value={value.rate} onChange={e=>onChange({rate:e.target.value})}/></label></div>
    {item.rate&&<button className="textButton" type="button" onClick={()=>onChange({rate:item.rate})}>Use reference rate · {money(Number(item.rate))} / {item.unit}</button>}
   </>}
   {value.mode==='lump'&&<label>Total allowance <span>₹</span><input type="number" inputMode="numeric" min="1" max="100000000" step="1" placeholder="To be quoted" value={value.amount} onChange={e=>onChange({amount:e.target.value})}/></label>}
   <output className="extraTotal" aria-live="polite">{amount===null?'To be quoted · excluded from total':Number.isFinite(amount)&&amount>=1&&amount<=100000000?money(amount):'Check quantity and rate'}</output>
   <p className="calcHint">{value.mode==='unpriced'?'This selected item stays in your report for follow-up.':'Editable planning allowance, not a confirmed Bind Builds price. Leave a value blank to request a quote.'}</p>
  </div>}
 </div>;
}
