'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { calculateEstimate, compactMoney, createVisualData, money, type VisualEstimate } from '@/lib/calculator';
import { packages } from '@/lib/site';

type CostPart={label:string;value:number;color:string};
function CostDistribution({parts,total,label,note}:{parts:CostPart[];total:number;label:string;note:string}) {
 let offset=0; const circumference=2*Math.PI*76;
 return <figure className="budgetComposition categoryComposition"><div className="budgetDonut"><svg viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="76" fill="none" stroke="#ededf0" strokeWidth="21"/>{parts.filter(part=>part.value>0).map(part=>{const segment=part.value/total*circumference;const start=offset;offset+=segment;return <circle key={part.label} cx="110" cy="110" r="76" fill="none" stroke={part.color} strokeWidth="21" strokeDasharray={`${segment} ${circumference-segment}`} strokeDashoffset={-start} transform="rotate(-90 110 110)" className="donutSegment"/>;})}</svg><div><span>{label}</span><strong>{compactMoney(total)}</strong><small>{total>0?'100% of this category':'No priced items'}</small></div></div><figcaption><span className="productEyebrow">{label} / Cost distribution</span><dl>{parts.filter(part=>part.value>0).map(part=><div key={part.label}><dt><i style={{background:part.color}}/>{part.label}</dt><dd>{money(part.value)}<small>{total>0?(part.value/total*100).toFixed(1):'0.0'}%</small></dd></div>)}</dl>{total===0&&<p>No priced items in this category.</p>}<p>{note}</p></figcaption></figure>;
}
export function BudgetComposition({data,compact=false}:{data:VisualEstimate;compact?:boolean}){
 const [view,setView]=useState<'construction'|'extras'|'overview'>(compact?'overview':'construction');
 const parts=view==='construction'?data.allocation.map(stage=>({label:stage.name,value:stage.amount,color:stage.color})):view==='extras'?data.extras:data.parts;
 const total=parts.reduce((sum,part)=>sum+part.value,0);
 const note=view==='construction'?'Illustrative allocation of base construction only. Additional items are separate. These assumed percentages are not a BOQ or agreed payment schedule.':view==='extras'?`Selected, priced additional items only. ${data.unpricedCount} selected item(s) still need a quote and are excluded.`:'Base construction + priced additional items, including any selected approval allowance. Taxes and unpriced work are excluded.';
 return <div className="costDistributionPanel">{!compact&&<div className="distributionTabs" role="group" aria-label="Choose cost distribution">{(['construction','extras','overview'] as const).map(item=><button type="button" key={item} aria-pressed={view===item} onClick={()=>setView(item)}>{item==='construction'?'Construction categories':item==='extras'?'Additional items':'Total overview'}</button>)}</div>}<CostDistribution parts={parts} total={total} label={view==='construction'?'Base construction':view==='extras'?'Additional items':'Planning subtotal'} note={note}/></div>;
}
export function AreaDiagram({data}:{data:VisualEstimate}){
 const max=Math.max(...data.floors.map(floor=>floor.area));
 return <figure className="areaDiagram"><figcaption><span className="productEyebrow">Your area, floor by floor</span><strong>{data.area.toLocaleString('en-IN')} <small>sq.ft calculated area</small></strong></figcaption><div className="areaDiagramRows">{data.floors.map((floor,index)=><div key={floor.label}><div><span>{floor.label}</span><strong>{floor.area.toLocaleString('en-IN')} sq.ft</strong></div><div className="areaTrack" aria-hidden="true"><i style={{width:`${floor.area/max*100}%`,animationDelay:`${index*70}ms`}}/></div></div>)}</div><p>Each floor and any separate headroom counted once. Final area measurement needs agreement.</p></figure>;
}
export function ComparisonDiagram({data}:{data:VisualEstimate}){
 const max=Math.max(...data.comparisons.map(item=>item.base));
 return <figure className="comparisonDiagram"><figcaption><span className="productEyebrow">Same area. Different specifications.</span><h3>Find your starting point.</h3><p>{data.area.toLocaleString('en-IN')} sq.ft · Base construction only</p></figcaption><div>{data.comparisons.map(item=><div className={item.name===data.packageName?'chosen':''} key={item.name}><div><strong>{item.name}</strong><span>{money(item.base)}</span></div><div className="comparisonTrack" aria-hidden="true"><i style={{width:`${item.base/max*100}%`}}/></div><small>{money(item.rate)} / sq.ft{item.name===data.packageName?' · Selected':''}</small></div>)}</div></figure>;
}
export function StageDiagram({data}:{data:VisualEstimate}){
 const parts=data.allocation.map(stage=>({label:stage.name,value:stage.amount,color:stage.color}));
 return <section className="stageDiagram"><header><span className="productEyebrow">Ten construction categories</span><h3>Your build. Category by category.</h3></header><CostDistribution parts={parts} total={parts.reduce((sum,part)=>sum+part.value,0)} label="Base construction" note="Illustrative allocation of base construction only. Additional items are separate. Not a BOQ or payment schedule."/></section>;
}
export default function ProposalVisuals({data}:{data:VisualEstimate}){
 return <section className="visualEstimate"><div className="visualEstimateHeading"><span className="productEyebrow">Your estimate, at a glance</span><h3>Every number.<br/><span>A clearer picture.</span></h3></div><div className="visualEstimateGrid"><BudgetComposition data={data}/><AreaDiagram data={data}/></div></section>;
}
export function EstimatePresentation({data,example=false}:{data:VisualEstimate;example?:boolean}){
 const [open,setOpen]=useState(false);
 const [slide,setSlide]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null);
 const title=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(open&&!dialog.current?.open)dialog.current?.showModal();},[open]);
 useEffect(()=>{if(open)title.current?.focus({preventScroll:true});},[open,slide]);
 const close=()=>{dialog.current?.close();setOpen(false);};
 const titles=['Your home. In numbers.','The specification. In perspective.','Your build. By category.'];
 return <><button className="cta presentationButton" type="button" onClick={()=>{setSlide(0);setOpen(true);}}>Present estimate <span aria-hidden="true">↗</span></button><dialog className="estimatePresentation" ref={dialog} aria-label="Estimate presentation" onClose={()=>setOpen(false)} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();setSlide(value=>Math.min(2,value+1));}if(event.key==='ArrowLeft'){event.preventDefault();setSlide(value=>Math.max(0,value-1));}}}>
   {open&&<div className="presentationCanvas"><header><span>BIND BUILDS <small>{example?'Illustrative example':'Planning estimate'}</small></span><button type="button" onClick={close} aria-label="Close presentation">Close <span aria-hidden="true">×</span></button></header><div className="presentationSlide" key={slide}><span className="productEyebrow">{data.packageName} · {data.configuration} · {data.area.toLocaleString('en-IN')} sq.ft</span><h2 ref={title} tabIndex={-1}>{titles[slide]}</h2>{slide===0?<BudgetComposition data={data}/>:slide===1?<ComparisonDiagram data={data}/>:<StageDiagram data={data}/>}</div><footer><p>{slide===2?'Illustrative base-cost allocation, not a BOQ or agreed payment schedule.':slide===1?'Base construction comparison. Additional items, taxes and approvals are excluded.':'Planning estimate. Taxes, unpriced approval charges and other exclusions are additional.'}</p><div><button type="button" disabled={slide===0} onClick={()=>setSlide(slide-1)} aria-label="Previous slide">←</button><span>{slide+1} / 3</span><button type="button" disabled={slide===2} onClick={()=>setSlide(slide+1)} aria-label="Next slide">→</button></div></footer></div>}
 </dialog></>;
}
const exampleInput={plot:1400,floors:[1000,1000],rate:packages[1].rate,headroom:0,reservePercent:0,allowances:[{key:'example',label:'Illustrative extras',selected:true,amount:250000}]};
const example=calculateEstimate(exampleInput);
const exampleData=createVisualData(exampleInput,example,'Elevate',packages.map(item=>({name:item.name,rate:item.rate,base:example.area*item.rate})));
export function ProposalTeaser(){return <div className="proposalTeaser reveal"><div className="proposalTeaserTop"><span className="proposalBrand">BIND BUILDS<span>Planning estimate</span></span><span className="exampleBadge">Illustrative example</span></div><div className="proposalTeaserBody"><div className="proposalTeaserIntro"><span className="productEyebrow">2,000 sq.ft · Elevate</span><h3>Your home.<br/>In numbers.</h3><p>₹2.50 lakh in additional items.<br/>Every assumption stays visible.</p><Link className="cta presentationButton" href="/cost-calculator">Build my detailed estimate <span aria-hidden="true">↗</span></Link></div><BudgetComposition data={exampleData} compact/></div><div className="proposalTeaserStats"><div><span>Base construction</span><strong>{money(example.base)}</strong></div><div><span>Additional items</span><strong>{money(example.allowanceTotal)}</strong></div><div><span>Planning subtotal</span><strong>{money(example.total)}</strong></div></div></div>;}
