'use client';
import { useState } from 'react';
import { approvalDocumentGroups,approvalDocumentSummary,approvalDocumentBrief,type ApprovalDocumentId,type ApprovalDocumentStatus,type ApprovalDocumentAnswers } from '@/lib/approval-guide';
import { trackEvent } from '@/lib/analytics';

type Props={answers:ApprovalDocumentAnswers;project:string;onChange:(id:ApprovalDocumentId,status:ApprovalDocumentStatus|'')=>void};
export default function DocumentReadinessAssistant({answers,project,onChange}:Props){
 const [expanded,setExpanded]=useState(false);
 const [copyState,setCopyState]=useState('');
 const summary=approvalDocumentSummary(answers);
 const next=expanded?summary.next:summary.next.slice(0,3);
 const update=(id:ApprovalDocumentId,status:ApprovalDocumentStatus|'')=>{
  onChange(id,status);setCopyState('');
  trackEvent('approval_document_status_changed',{document_group:id,document_status:status||'unreviewed'});
 };
 const copy=async()=>{
  try{
   await navigator.clipboard.writeText(approvalDocumentBrief(answers));
   setCopyState('Document preparation summary copied.');
   trackEvent('approval_document_summary_copied',{groups_reviewed:summary.reviewed});
  }catch{setCopyState('Copy unavailable. Use the site-review enquiry or WhatsApp link below.');}
 };
 return <section className="documentAssistant" id="document-readiness" aria-labelledby="document-assistant-title">
  <header className="documentAssistantHeader"><span className="productEyebrow">Document readiness / Preparation assistant</span>
   <h3 id="document-assistant-title">What do you have?<br/><span>What is still needed?</span></h3>
   <p>Choose a status for each group. This helps organise your first professional review; no files or ID numbers are required.</p>
   <div className="documentAssistantProgress" aria-live="polite"><strong>{summary.reviewed}<small> / 6</small></strong><span>groups reviewed</span></div>
   <progress value={summary.reviewed} max={6} aria-label="Document groups reviewed"/>
  </header>
  <div className="documentAssistantRows">{approvalDocumentGroups.map((group,i)=><div className="documentAssistantRow" key={group.id}>
   <div><span className="documentAssistantNumber">{String(i+1).padStart(2,'0')}</span><strong>{group.label}</strong><p>{group.example}</p></div>
   <label>My status<select value={answers[group.id]||''} onChange={event=>update(group.id,event.target.value as ApprovalDocumentStatus|'')} aria-label={`${group.label} status`}>
     <option value="">Not reviewed</option><option value="available">Available to me</option><option value="missing">Need to obtain</option><option value="unsure">Unsure / ask adviser</option>
   </select></label>
  </div>)}</div>
  <div className="documentAssistantNext" aria-live="polite"><span className="productEyebrow">Suggested next steps</span>
   <h4>{summary.next.length===0?'All groups reviewed — records still need professional checking':summary.missing.length?`${summary.missing.length} ${summary.missing.length===1?'gap':'gaps'} identified`:summary.unsure.length?`${summary.unsure.length} ${summary.unsure.length===1?'question':'questions'} to clarify`:'Start with these document groups'}</h4>
   {next.length?<ol>{next.map(group=><li key={group.id}><span>{group.status==='missing'?'Need to obtain':group.status==='unsure'?'Ask adviser':'Not reviewed'}</span><strong>{group.label}</strong><p>{group.next}</p></li>)}</ol>:<p>A registered professional must verify the records, current requirements and the applicable approval route before submission.</p>}
   {summary.next.length>3&&<button className="documentAssistantMore" type="button" aria-expanded={expanded} onClick={()=>setExpanded(value=>!value)}>{expanded?'Show fewer steps':`Show all ${summary.next.length} next steps`} ↗</button>}
  </div>
  <p className="documentAssistantProjectNote">{project==='Demolition and rebuild'?'For a rebuild, also discuss existing building approvals, demolition scope and service disconnections.':project==='Rental / multi-family home'?'For a rental or multi-family development, confirm building use, unit count and scrutiny requirements.':project==='Other development'?'For this proposal, confirm intended land use and any special clearances.':'For a new home, check plot access and the permission route for your proposed design.'}</p>
  <div className="documentAssistantCopy"><button type="button" onClick={copy}>Copy my document summary ↗</button><p role="status">{copyState}</p></div>
  <p className="guideSmall">Your choices stay on this page until you copy them or open the enquiry or WhatsApp below. A completed checklist is not an approval, submission or verification. Your registered professional must confirm which records apply.</p>
 </section>;
}
