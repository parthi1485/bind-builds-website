export const approvalSources={
 cmda:'https://www.cmdachennai.gov.in/planningpermission.html',
 gcc:'https://chennaicorporation.gov.in/gcc/department/town-planning',
 portal:'https://onlineppa.tn.gov.in/',
 charter:'https://www.cmdachennai.gov.in/citizen.html',
 self:'https://onlineppa.tn.gov.in/sites/default/files/2024-07/self_certification_user_manual.pdf',
};
export const readinessItems=[
 {id:'site',label:'Site location and plot dimensions',hint:'Locality, survey details if known, and frontage × depth.'},
 {id:'road',label:'Road width and access details',hint:'Record the adjoining road and how the plot is accessed.'},
 {id:'ownership',label:'Ownership and land-record status',hint:'Know which records you have; no document upload here.'},
 {id:'existing',label:'Layout and existing-approval status',hint:'Note available approval references, or that they need checking.'},
 {id:'brief',label:'Proposed use and floor requirements',hint:'Family home, rental units, parking and any future-floor intention.'},
 {id:'budget',label:'A starting budget and timeline',hint:'Include design, approval and site-preparation allowances.'},
];
export const approvalQuestions=[
 ['Is an approved layout enough to start building?','Treat plot or layout approval and permission for your proposed building as separate checks. Confirm the planning permission, building permit and other applicable conditions for the actual design before construction.'],
 ['Is every Chennai application submitted directly to CMDA?','No. CMDA delegates certain categories to local bodies. The plot jurisdiction and development category determine the route. Ask the registered professional to confirm the current route for your proposal.'],
 ['Can I use the self-certification route?','Tamil Nadu publishes a self-certification procedure for qualifying buildings. Eligibility must be checked against the current scheme and your complete proposal; selecting G+1 or a small plot in a calculator does not establish eligibility.'],
 ['How much does building plan approval cost in Chennai?','Use the calculator’s optional Building approval fee item to budget from a local-body reference slab or enter a confirmed total. The reference rates need current verification. Approval is separate from the base construction package; professional services and unentered charges are excluded.'],
 ['How long will approval take?','Request a programme that separates document collection, drawing preparation, authority review, responses and payment. Missing information or additional clearances can affect the sequence. A target review period is not a guaranteed approval date.'],
 ['Does approval guarantee ownership or a housing loan?','Do not treat a building permission as a substitute for legal title due diligence or a lender’s assessment. Ask your legal adviser and lender which checks and documents they require for your case.'],
];

/** Preparation prompts only; site-specific document requirements need professional review. */
export const approvalDocumentGroups = [
 {id:'ownership',label:'Ownership records',example:'Sale deed, parent deeds or relevant authorisation.',next:'Gather available title records and ask your professional which documents require verification.'},
 {id:'revenue',label:'Land and revenue records',example:'Patta, Chitta, TSLR or corresponding extracts.',next:'Use the appropriate land-record service and check which extract applies to the site.'},
 {id:'survey',label:'Survey and site measurements',example:'FMB or town survey sketch, plot dimensions and road access.',next:'Verify survey sketches, boundaries and site access before planning drawings.'},
 {id:'encumbrance',label:'Encumbrance records',example:'Encumbrance certificate for the applicable period.',next:'Ask your adviser about the required search period and certificate recency.'},
 {id:'permissions',label:'Existing permissions',example:'Layout references and any existing building permissions.',next:'Locate available references; confirm their relevance and any further approvals needed.'},
 {id:'drawings',label:'Professional drawings',example:'Site plan, floor plans, elevations and applicable declarations.',next:'Ask the registered professional which drawings and clearances are required.'},
] as const;
export type ApprovalDocumentId=(typeof approvalDocumentGroups)[number]['id'];
export type ApprovalDocumentStatus='available'|'missing'|'unsure';
export type ApprovalDocumentAnswers=Partial<Record<ApprovalDocumentId,ApprovalDocumentStatus>>;

export function approvalDocumentSummary(answers:ApprovalDocumentAnswers){
 const groups=approvalDocumentGroups.map(g=>({...g,status:answers[g.id]||'unreviewed'}));
 const available=groups.filter(g=>g.status==='available');
 const missing=groups.filter(g=>g.status==='missing');
 const unsure=groups.filter(g=>g.status==='unsure');
 const unreviewed=groups.filter(g=>g.status==='unreviewed');
 return {reviewed:6-unreviewed.length,available,missing,unsure,unreviewed,next:[...missing,...unsure,...unreviewed]};
}

export function approvalDocumentBrief(answers:ApprovalDocumentAnswers){
 const summary=approvalDocumentSummary(answers);
 const names=(groups:typeof summary.available)=>groups.map(g=>g.label).join('; ')||'None specified';
 return [
  `Document preparation: ${summary.reviewed} of 6 groups reviewed (client-reported, not verified)`,
  'Available, unverified: '+names(summary.available),
  'Need to obtain: '+names(summary.missing),
  'Need clarification: '+names(summary.unsure),
  'Not yet reviewed: '+names(summary.unreviewed),
  'A registered professional must confirm the current checklist, document validity and applicability.'
 ].join('\n');
}
