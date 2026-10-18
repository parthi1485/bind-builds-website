'use client';
import { useState } from 'react';
import Link from 'next/link';
import { configuration, money, type Estimate, type EstimateInput } from '@/lib/calculator';
import { trackEvent } from '@/lib/analytics';

type Props={input:EstimateInput;estimate:Estimate;packageName:string;onEdit:()=>void};
type Stage='Looking for a plot'|'Land purchased'|'Design in progress'|'Approved drawings ready';
type Timeline='Exploring options'|'Within 3 months'|'3–6 months'|'6–12 months';
const stages:Stage[]=['Looking for a plot','Land purchased','Design in progress','Approved drawings ready'];
const timelines:Timeline[]=['Exploring options','Within 3 months','3–6 months','6–12 months'];
const priorities=['Comfort and ventilation','Stay within budget','Family privacy','Future flexibility','Premium finishes','Not decided yet'] as const;
export default function MyHomePlan({input,estimate,packageName,onEdit}:Props){
 const [location,setLocation]=useState('');
 const [stage,setStage]=useState<Stage>('Land purchased');
 const [timeline,setTimeline]=useState<Timeline>('Exploring options');
 const [priority,setPriority]=useState<(typeof priorities)[number]>('Comfort and ventilation');
 const [rooms,setRooms]=useState('3 BHK');
 const [status,setStatus]=useState('');
 const pricedExtras=estimate.selected.filter(item=>item.key!=='parking');
 const content=[
  'MY HOME PLAN — BIND BUILDS','Illustrative planning brief, not a final quotation.','',
  'Site locality: '+(location.trim()||'Not entered'),
  'Plot / readiness: '+stage,'Target timeline: '+timeline,'Top priority: '+priority,
  'Rooms preference: '+rooms,
  'Plot: '+input.plot.toLocaleString('en-IN')+' sq.ft',
  'Floors: '+configuration(input.floors.length),
  'Floor areas: '+input.floors.map(a=>a.toLocaleString('en-IN')+' sq.ft').join(', '),
  'Calculated area: '+estimate.area.toLocaleString('en-IN')+' sq.ft',
  'Specification: '+packageName+' — '+money(input.rate)+'/sq.ft',
  'Base construction: '+money(estimate.base),
  ...pricedExtras.map(x=>x.label+': '+(x.amount===null?'To be quoted':money(x.amount))),
  'Planning subtotal: '+money(estimate.total),'',
  'Not included: applicable taxes, site-specific or separately scoped work, and unpriced items.',
  'Contractual schedule, exact specifications and final scope require a signed proposal.'
 ].join('\n');
 const query=new URLSearchParams({
  package:packageName,area:String(estimate.area),location:location.trim().slice(0,120),stage,timeline,
  notes:content.slice(0,1850)
 });
 const sharePlan=async()=>{
  if(navigator.share){try{await navigator.share({title:'My Home Plan — Bind Builds',text:content});trackEvent('home_plan_share',{package_name:packageName});setStatus('Shared with your chosen app.');return;}catch(e){if((e as Error)?.name==='AbortError')return;}}
  try{await navigator.clipboard.writeText(content);trackEvent('home_plan_copy',{package_name:packageName});setStatus('Brief copied. Paste it into a family chat.');}
  catch{setStatus('Sharing was unavailable. You can still save the summary as a text file.');}
 };
 const save=()=>{
  const href=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=href;a.download='my-home-plan-bind-builds.txt';document.body.appendChild(a);a.click();a.remove();
  window.setTimeout(()=>URL.revokeObjectURL(href),1000);trackEvent('home_plan_saved',{package_name:packageName});setStatus('Home plan saved as a text file.');
 };
 return <section className="myHomePlan calcReportCard" aria-labelledby="my-home-plan-title">
  <div className="myHomePlanIntro"><span className="eyebrow">Plan it together / Homeowner-controlled</span><h3 id="my-home-plan-title">Your home. Your brief.</h3><p>Make your estimate more meaningful. Add a few optional preferences, share it with family, or carry it into a conversation with us. Nothing is sent to Bind Builds until you choose to enquire.</p></div>
  <div className="myHomePlanGrid">
   <label>Site locality <small>(optional)</small><input value={location} onChange={e=>setLocation(e.target.value.slice(0,120))} maxLength={120} placeholder="e.g. Porur, Chennai" autoComplete="address-level2" /></label>
   <label>Where are you in the process?<select value={stage} onChange={e=>setStage(e.target.value as Stage)}>{stages.map(v=><option key={v} value={v}>{v}</option>)}</select></label>
   <label>Home requirement<select value={rooms} onChange={e=>setRooms(e.target.value)}>{['2 BHK','3 BHK','4 BHK','5+ bedrooms','Rental / multiple units','Still exploring'].map(v=><option key={v}>{v}</option>)}</select></label>
   <label>What matters most?<select value={priority} onChange={e=>setPriority(e.target.value as (typeof priorities)[number])}>{priorities.map(v=><option key={v}>{v}</option>)}</select></label>
   <label>Preferred start<select value={timeline} onChange={e=>setTimeline(e.target.value as Timeline)}>{timelines.map(v=><option key={v}>{v}</option>)}</select></label>
  </div>
  <div className="myHomePlanSnapshot"><div><span>Plot / Built-up area</span><strong>{input.plot.toLocaleString('en-IN')} / {estimate.area.toLocaleString('en-IN')} sq.ft</strong></div><div><span>Configuration</span><strong>{configuration(input.floors.length)}</strong></div><div><span>Specification</span><strong>{packageName}</strong></div><div><span>Indicative subtotal</span><strong>{money(estimate.total)}</strong></div></div>
  <div className="myHomePlanActions"><button type="button" className="cta" onClick={sharePlan}>Share with family ↗</button><button type="button" className="textButton" onClick={save}>Save my home plan ↓</button><button type="button" className="textButton" onClick={onEdit}>Edit floors, package or extras →</button><Link className="cta primary" href={'/start-a-project?'+query.toString()}>Discuss this plan ↗</Link></div>
  <p className="myHomePlanPrivacy" role="status">{status||'Your preferences stay in this page until you use Share, Save or Discuss this plan. No account required.'}</p>
 </section>;
}
