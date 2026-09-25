'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { site, whatsappUrl } from '@/lib/site';
import { attributedPageUrl, leadAttributionFields, leadAttributionSummary, trackEvent } from '@/lib/analytics';
import { classifyLead, leadHandoffLine } from '@/lib/lead-quality';
import { createLeadFollowup, leadFollowupSummary } from '@/lib/lead-followup';

type Brief = {type:string;location:string;stage:string;intent:string;area:string;budget:string;timeline:string;notes:string;name:string;phone:string;email:string;package:string};
type Props = { source?: 'Website – Project Enquiry' | 'Website – Contact Form' };
const initial:Brief={type:'New home',location:'',stage:'Land purchased',intent:'',area:'',budget:'Not decided yet',timeline:'Exploring options',notes:'',name:'',phone:'',email:'',package:''};

export default function ProjectForm({source='Website – Project Enquiry'}:Props){
 const [step,setStep]=useState(0);
 const [form,setForm]=useState<Brief>(initial);
 const [prepared,setPrepared]=useState(false);
 const [submitting,setSubmitting]=useState(false);
 const [submitStatus,setSubmitStatus]=useState('');
 const [copyStatus,setCopyStatus]=useState('');
 const heading=useRef<HTMLHeadingElement>(null);

 useEffect(()=>{const params=new URLSearchParams(window.location.search);const requestedType=params.get('type');const type=['New home','Demolition & rebuild','Rental / multi-family building','Commercial','Healthcare','Retail / hospitality','Interiors','Other'].includes(requestedType||'')?requestedType!:'New home';const tier=params.get('package');const area=params.get('area');const location=(params.get('location')||'').slice(0,120).replace(/[\u0000-\u001f]/g,'');const notes=(params.get('notes')||'').slice(0,2000).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'');setForm(value=>({...value,type,location,package:['Essential','Elevate','Signature'].includes(tier||'')?tier!:'',area:area&&/^\d{1,6}$/.test(area)?area:'',notes}));},[]);
 useEffect(()=>{if(step>0||prepared)heading.current?.focus();},[step,prepared]);
 useEffect(()=>{if(!prepared)trackEvent('project_form_step_view',{form_source:source,step_number:step+1,step_name:['project','priorities','contact'][step]});},[step,prepared,source]);

 const update=(key:keyof Brief,value:string)=>setForm(current=>({...current,[key]:value}));
 const brief=['Hello Bind Builds, I would like to discuss my project.','', 'Name: '+form.name,'Phone: '+form.phone,form.email?'Email: '+form.email:'','Project: '+form.type,'Location: '+form.location,'Stage: '+form.stage,'Intent: '+form.intent,'Approx. built-up area: '+(form.area?form.area+' sq.ft':'To be discussed'),'Budget: '+form.budget,'Preferred start: '+form.timeline,form.package?'Package interest: '+form.package:'',form.notes?'Requirements: '+form.notes:'','','Enquiry from the Bind Builds website.'].filter(Boolean).join('\n');
 const leadQuality=classifyLead(form);
 const leadFollowup=createLeadFollowup(form);
 const requirements=[leadHandoffLine(form),leadFollowupSummary(form),'Lead intent: '+form.intent,form.notes].filter(Boolean).join(' | ');

 const submit=async(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
  setSubmitStatus('');
  if(step<2){trackEvent('project_form_step_complete',{form_source:source,step_number:step+1,step_name:['project','priorities'][step]});setStep(step+1);return;}
  setSubmitting(true);
  try{
   const attribution=leadAttributionFields();
   const attributedRequirements=[requirements,leadAttributionSummary()].filter(Boolean).join(' | ');
   const response=await fetch('/api/website-lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
    source,name:form.name,phone:form.phone,email:form.email,projectType:form.type,location:form.location,stage:form.stage,
    builtUpArea:form.area,budget:form.budget,timeline:form.timeline,requirements:attributedRequirements,package:form.package,
    pdfDownloaded:'No',pageUrl:attributedPageUrl(),...attribution,website:''
   })});
   const result=await response.json().catch(()=>({ok:false}));
   if(!response.ok||!result.ok)throw new Error('Lead capture failed');
   trackEvent('project_form_step_complete',{form_source:source,step_number:3,step_name:'contact'});
   trackEvent('project_enquiry',{source,project_type:form.type,budget_band:form.budget,timeline:form.timeline,package_interest:form.package||'none',lead_intent:form.intent,site_stage:form.stage,area_provided:Boolean(form.area),lead_priority:leadQuality.priority,lead_score:leadQuality.score,followup_mode:leadFollowup.responseMode});
   setPrepared(true);
  }catch{
   trackEvent('project_enquiry_error',{form_source:source,step_number:3});
   setSubmitStatus('We could not send your enquiry right now. Please try again, or use WhatsApp below.');
  }finally{setSubmitting(false);}
 };

 const copy=async()=>{try{await navigator.clipboard.writeText(brief);setCopyStatus('Brief copied. Paste it into your message.');}catch{setCopyStatus('Copy is unavailable. Select and copy the brief below.');}};

 if(prepared)return <div className="projectForm preparedBrief"><span className="eyebrow">Enquiry received</span><h2 ref={heading} tabIndex={-1}>Thank you.<br/>We have your project brief.</h2><p>Your enquiry has been recorded and sent to the Bind Builds team. We’ll first review the location, scope, budget/timeline context and the most useful next step before arranging a site visit or proposal discussion.</p><div className="qualificationNextStep"><span>01</span><p><strong>First: qualification conversation.</strong> We clarify the project fit and the questions that matter before asking you to spend time on a site meeting.</p></div><pre className="briefPreview">{brief}</pre><div className="sendActions"><a className="cta primary" href={whatsappUrl(brief)} target="_blank" rel="noopener noreferrer">Continue on WhatsApp ↗</a><a className="cta" href={'mailto:'+site.email+'?subject='+encodeURIComponent('Bind Builds project enquiry — '+form.location)+'&body='+encodeURIComponent(brief)}>Open email draft ↗</a></div><div className="formActions"><button type="button" className="textButton" onClick={()=>setPrepared(false)}>← Edit details</button><button type="button" className="textButton" onClick={copy}>Copy brief</button></div><p role="status">{copyStatus}</p><p className="smallPrint">Need help? <a href={'tel:'+site.telephone}>Call {site.phone}</a>.</p></div>;

 return <div className="enquiryLayout"><aside className="enquiryAside"><span className="eyebrow">A good place to begin</span><h2>A few details.<br />A useful conversation.</h2><p>Tell us what you are planning. Submit the brief and our team will receive it directly.</p><ol><li>Discuss your site and priorities</li><li>Understand the scope and next step</li><li>Begin design after an agreed engagement</li></ol><p className="smallPrint">English or Tamil · No commitment to proceed</p><p className="smallPrint">Project-specific design starts after an agreed paid engagement.</p><Link href="/project-evidence">Explore our projects →</Link></aside><div className="projectForm"><ol className="formSteps" aria-label="Project brief progress">{['Your project','Your priorities','Your details'].map((label,index)=><li key={label} className={index<step?'complete':''} aria-current={step===index?'step':undefined}><span>{index<step?'✓':index+1}</span>{label}</li>)}</ol><form onSubmit={submit} aria-busy={submitting}><h2 ref={heading} tabIndex={-1}>{['What are you planning?','Anything else we should know?','How can we reach you?'][step]}</h2>
 {step===0&&<div className="fields"><label>Project type<select value={form.type} onChange={e=>update('type',e.target.value)}>{['New home','Demolition & rebuild','Rental / multi-family building','Commercial','Healthcare','Retail / hospitality','Interiors','Other'].map(value=><option key={value}>{value}</option>)}</select></label><label>Site location <span>(required)</span><input required maxLength={120} autoComplete="address-level2" value={form.location} onChange={e=>update('location',e.target.value)} placeholder="For example, Porur, Chennai or Coimbatore" /></label><label>Current stage<select value={form.stage} onChange={e=>update('stage',e.target.value)}>{['Land purchased','Looking for a plot','Design in progress','Approved drawings ready','Existing building to renovate / rebuild'].map(value=><option key={value}>{value}</option>)}</select></label><label>What best describes you right now? <span>(required)</span><select required value={form.intent} onChange={e=>{update('intent',e.target.value);trackEvent('lead_intent_selected',{form_source:source,lead_intent:e.target.value});}}><option value="" disabled>Select your current intent</option>{['Ready to discuss scope and next steps','Comparing construction proposals','Planning for later','Just researching'].map(value=><option key={value}>{value}</option>)}</select></label></div>}
 {step===1&&<div className="fields">{form.intent==='Just researching'&&<div className="researchRoute"><span className="eyebrow">Still researching?</span><h3>You may not need a sales conversation yet.</h3><p>Use the calculator and Chennai cost guide to understand the numbers first. You can still continue with this form whenever you want us to contact you.</p><div><Link href="/cost-calculator">Calculate my construction cost →</Link><Link href="/construction-cost-chennai">Read the Chennai cost guide →</Link></div></div>}<p className="formOptionalNote"><strong>Optional details.</strong> Add what you know, or skip straight to your contact details.</p><label>Approximate total built-up area <span>(sq.ft · optional)</span><input type="number" inputMode="numeric" min="1" max="999999" step="1" value={form.area} onChange={e=>update('area',e.target.value)} placeholder="Combined area of all floors" /></label><div className="fieldPair"><label>Construction budget<select value={form.budget} onChange={e=>update('budget',e.target.value)}>{['Not decided yet','Under ₹25 lakh','₹25–50 lakh','₹50 lakh–₹1 crore','₹1–2 crore','Above ₹2 crore'].map(value=><option key={value}>{value}</option>)}</select></label><label>Preferred start<select value={form.timeline} onChange={e=>update('timeline',e.target.value)}>{['Exploring options','Within 3 months','3–6 months','6–12 months','After 12 months'].map(value=><option key={value}>{value}</option>)}</select></label></div><label>Your priorities <span>(optional)</span><textarea maxLength={2000} rows={3} value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder="Bedrooms, parents’ needs, rental units, Vastu…" /></label>{form.package&&<p className="selectionNote">Package interest: {form.package}</p>}</div>}
 {step===2&&<div className="fields"><label>Your name <span>(required)</span><input required minLength={2} maxLength={80} autoComplete="name" value={form.name} onChange={e=>update('name',e.target.value)} /></label><label>Phone number <span>(with country code if outside India)</span><input required type="tel" inputMode="tel" autoComplete="tel" maxLength={22} pattern="[+0-9() -]{10,22}" title="Enter a phone number with 10–15 digits, including country code if outside India." value={form.phone} onChange={e=>update('phone',e.target.value)} onInput={e=>{const input=e.currentTarget;const count=input.value.replace(/\D/g,'').length;input.setCustomValidity(count>=10&&count<=15?'':'Please enter 10–15 digits.');}} /></label><label>Email <span>(optional)</span><input type="email" autoComplete="email" maxLength={150} value={form.email} onChange={e=>update('email',e.target.value)} /></label><p className="smallPrint">By submitting, your project details are sent to Bind Builds and recorded for enquiry follow-up. <Link href="/privacy">Privacy details</Link>.</p></div>}
 <div className="formActions">{step>0?<button className="textButton" type="button" onClick={()=>setStep(step-1)} disabled={submitting}>← Back</button>:<span className="smallPrint">Step {step+1} of 3</span>}{step===1&&<button className="textButton formSkipButton" type="button" onClick={()=>{trackEvent('project_form_optional_skipped',{form_source:source,step_number:2});setStep(2);}} disabled={submitting}>Skip optional details →</button>}<button className="cta primary" type="submit" disabled={submitting}>{submitting?'Sending…':step===2?'Send enquiry':step===1?'Continue to contact':'Continue'} →</button></div><p className="formSubmitStatus" role="status">{submitStatus}</p></form></div></div>;
}
