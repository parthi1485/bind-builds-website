'use client';
import { useEffect, useRef, useState } from 'react';
import { calculateEstimate, compactMoney, createVisualData, money, type VisualEstimate } from '@/lib/calculator';
import { packages } from '@/lib/site';

export function BudgetComposition({data}:{data:VisualEstimate}){
 let offset=0;
 const circumference=2*Math.PI*76;
 return <figure className="budgetComposition"><div className="budgetDonut"><svg viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="76" fill="none" stroke="#ededf0" strokeWidth="21"/>{data.parts.filter(part=>part.value>0).map(part=>{const segment=part.value/data.total*circumference;const start=offset;offset+=segment;return <circle key={part.label} cx="110" cy="110" r="76" fill="none" stroke={part.color} strokeWidth="21" strokeDasharray={`${segment} ${circumference-segment}`} strokeDashoffset={-start} transform="rotate(-90 110 110)" className="donutSegment"/>;})}</svg><div><span>Planning subtotal</span><strong>{compactMoney(data.total)}</strong></div></div><figcaption><span className="productEyebrow">Where your budget goes</span><dl>{data.parts.map(part=><div key={part.label}><dt><i style={{background:part.color}}/>{part.label}</dt><dd>{money(part.value)}<small>{(part.value/data.total*100).toFixed(1)}%</small></dd></div>)}</dl><p>Excludes taxes, approvals and unpriced work.{data.unpricedCount>0?` ${data.unpricedCount} selected ${data.unpricedCount===1?'extra still needs':'extras still need'} a quote.`:''}</p></figcaption></figure>;
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
 const groups=[{label:'Foundation',indices:[0],color:'#0071e3'},{label:'RCC frame',indices:[1],color:'#4389e7'},{label:'Masonry & waterproofing',indices:[2,3],color:'#7974e8'},{label:'Finishes',indices:[4,5,8],color:'#9c9cb9'},{label:'Services & handover',indices:[6,7,9],color:'#66b9ce'}].map(group=>({...group,percent:group.indices.reduce((sum,index)=>sum+data.allocation[index].percent,0)}));
 return <figure className="stageDiagram"><figcaption><span className="productEyebrow">An illustrative base-cost allocation</span><h3>See the bigger picture.</h3><p>Ten assumed stages, grouped into five work areas. This is a planning illustration, not a BOQ or payment schedule.</p></figcaption><div className="stageSegments" aria-hidden="true">{groups.map(group=><i key={group.label} style={{width:`${group.percent}%`,background:group.color}}/>)}</div><div className="stageLegend">{groups.map(group=><div key={group.label}><i style={{background:group.color}}/><strong>{group.percent}%</strong><span>{group.label}</span></div>)}</div><ol className="stageDiagramList">{data.allocation.map(stage=><li key={stage.name}><span>{stage.name}</span><strong>{money(stage.amount)}<small>{stage.percent}%</small></strong></li>)}</ol></figure>;
}
export default function ProposalVisuals({data}:{data:VisualEstimate}){
 return <section className="visualEstimate"><div className="visualEstimateHeading"><span className="productEyebrow">Your estimate, at a glance</span><h3>Every number.<br/><span>A clearer picture.</span></h3></div><div className="visualEstimateGrid"><BudgetComposition data={data}/><AreaDiagram data={data}/></div></section>;
}
export function EstimatePresentation({data}:{data:VisualEstimate}){
 const [open,setOpen]=useState(false);
 const [slide,setSlide]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null);
 const title=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(open&&!dialog.current?.open)dialog.current?.showModal();},[open]);
 useEffect(()=>{if(open)title.current?.focus({preventScroll:true});},[open,slide]);
 const close=()=>{dialog.current?.close();setOpen(false);};
 const titles=['Your home. In numbers.','The specification. In perspective.','Your build. In stages.'];
 return <><button className="cta presentationButton" type="button" onClick={()=>{setSlide(0);setOpen(true);}}>Present estimate <span aria-hidden="true">↗</span></button><dialog className="estimatePresentation" ref={dialog} aria-label="Estimate presentation" onClose={()=>setOpen(false)} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();setSlide(value=>Math.min(2,value+1));}if(event.key==='ArrowLeft'){event.preventDefault();setSlide(value=>Math.max(0,value-1));}}}>
   {open&&<div className="presentationCanvas"><header><span>BIND BUILDS <small>Planning estimate</small></span><button type="button" onClick={close} aria-label="Close presentation">Close <span aria-hidden="true">×</span></button></header><div className="presentationSlide" key={slide}><span className="productEyebrow">{data.packageName} · {data.configuration} · {data.area.toLocaleString('en-IN')} sq.ft</span><h2 ref={title} tabIndex={-1}>{titles[slide]}</h2>{slide===0?<BudgetComposition data={data}/>:slide===1?<ComparisonDiagram data={data}/>:<StageDiagram data={data}/>}</div><footer><p>Planning estimate · Taxes, approvals and other exclusions are additional.</p><div><button type="button" disabled={slide===0} onClick={()=>setSlide(slide-1)} aria-label="Previous slide">←</button><span>{slide+1} / 3</span><button type="button" disabled={slide===2} onClick={()=>setSlide(slide+1)} aria-label="Next slide">→</button></div></footer></div>}
 </dialog></>;
}
const exampleInput={plot:1400,floors:[1000,1000],rate:packages[1].rate,headroom:0,reservePercent:5,allowances:[{key:'example',label:'Illustrative extras',selected:true,amount:250000}]};
const example=calculateEstimate(exampleInput);
const exampleData=createVisualData(exampleInput,example,'Elevate',packages.map(item=>({name:item.name,rate:item.rate,base:example.area*item.rate})));
export function ProposalTeaser(){return <div className="proposalTeaser reveal"><div className="proposalTeaserTop"><span className="proposalBrand">BIND BUILDS<span>Planning estimate</span></span><span className="exampleBadge">Illustrative example</span></div><div className="proposalTeaserBody"><div className="proposalTeaserIntro"><span className="productEyebrow">2,000 sq.ft · Elevate</span><h3>Your home.<br/>In numbers.</h3><p>₹2.50 lakh in example allowances.<br/>A 5% planning reserve.<br/>Every assumption stays visible.</p><EstimatePresentation data={exampleData}/></div><BudgetComposition data={exampleData}/></div><div className="proposalTeaserStats"><div><span>Base construction</span><strong>{money(example.base)}</strong></div><div><span>Example allowances</span><strong>{money(example.allowanceTotal)}</strong></div><div><span>Planning reserve</span><strong>{money(example.reserve)}</strong></div></div></div>;}
