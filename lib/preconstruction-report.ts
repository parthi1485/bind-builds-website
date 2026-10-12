import { approvalDocumentBrief, approvalDocumentSummary, type ApprovalDocumentAnswers } from './approval-guide.ts';
import { calculatePlotPlanning, type PlotPlanningResult } from './plot-planning.ts';

export const projectKinds = ['New home','Demolition & rebuild','Rental / multi-family building','Other'] as const;
export const projectStages = ['Just exploring','Looking for land','Land purchased','Design in progress','Drawings approved','Existing building to rebuild'] as const;
export const projectBudgets = ['Not decided yet','Under ₹25 lakh','₹25–50 lakh','₹50 lakh–₹1 crore','₹1–2 crore','Above ₹2 crore'] as const;
export const projectTimelines = ['Exploring options','Within 3 months','3–6 months','6–12 months','After 12 months'] as const;

export type PreconstructionInput = {
  locality:string; type:string; stage:string; budget:string; timeline:string;
  frontage:string; depth:string; levels:number; countedPerLevel:string;
  spaces:string; priorities:string; documents:ApprovalDocumentAnswers;
};
export const initialPreconstructionInput: PreconstructionInput = {
  locality:'',type:'New home',stage:'Just exploring',budget:'Not decided yet',timeline:'Exploring options',
  frontage:'',depth:'',levels:2,countedPerLevel:'',spaces:'',priorities:'',documents:{},
};
const short = (value:string,limit:number) => value.trim().replace(/[\r\n\t]+/g,' ').slice(0,limit);
const format = (value:number) => value.toLocaleString('en-IN',{maximumFractionDigits:2});

export function preconstructionPlot(input:PreconstructionInput):PlotPlanningResult|null {
  if (!input.frontage.trim() || !input.depth.trim() || !input.countedPerLevel.trim()) return null;
  return calculatePlotPlanning({
    frontageFt:Number(input.frontage),depthFt:Number(input.depth),
    levels:input.levels,illustrativeCountedAreaPerLevel:Number(input.countedPerLevel),
  });
}

export function preconstructionQuestions(input:PreconstructionInput):string[] {
  const summary=approvalDocumentSummary(input.documents);
  const questions=[
    'Which planning authority, land use, approval route and current development controls apply to this specific site?',
    'What is the actual measured plot area, road access and professional-verified FSI-counted area and setbacks?',
    'What design, structural, approval and construction services must be scoped separately?',
  ];
  if(summary.missing.length || summary.unsure.length || summary.unreviewed.length)
    questions.push('Which ownership, revenue, survey and other records must be obtained or checked before drawings and submission?');
  if(input.stage==='Looking for land' || input.stage==='Just exploring') questions.push('What due diligence should happen before purchasing land or setting a construction budget?');
  if(input.type==='Demolition & rebuild') questions.push('What existing-building checks, demolition permissions and utility disconnections are relevant?');
  if(input.type==='Rental / multi-family building') questions.push('How do dwelling count, use, parking and access affect this proposal and its approvals?');
  if(input.budget==='Not decided yet') questions.push('How can we establish a realistic area basis, specification and full budget including exclusions?');
  return questions.slice(0,6);
}

export function buildPreconstructionReport(input:PreconstructionInput) {
  const plot=preconstructionPlot(input);
  const documents=approvalDocumentSummary(input.documents);
  const questions=preconstructionQuestions(input);
  const plotLines=plot?[
    `Illustrative rectangular plot: ${format(plot.plotAreaSqft)} sq.ft (${format(Number(input.frontage))} × ${format(Number(input.depth))} ft; survey to verify)`,
    `Example levels: ${input.levels} | Assumed counted area per level: ${format(Number(input.countedPerLevel))} sq.ft`,
    `Example counted floor area: ${format(plot.exampleCountedAreaSqft)} sq.ft | Illustrative area ratio: ${plot.illustrativeRatio.toFixed(2)} (NOT permitted FSI)`,
    ...(plot.areaExceedsPlot?['Warning: assumed per-level counted area exceeds geometric plot area; revise assumptions.']:[]),
  ]:['Plot example: not provided / incomplete. No FSI ratio assessed.'];
  const lines=[
    'BIND BUILDS / PRE-CONSTRUCTION PREPARATION REPORT',
    'Homeowner working draft — NOT an approval, drawing, construction quote or legal/technical determination.',
    `Project: ${input.type} | Stage: ${input.stage}`,
    `General locality: ${short(input.locality,120)||'To confirm'}`,
    `Budget: ${input.budget} | Preferred start: ${input.timeline}`,
    `Space requirements: ${short(input.spaces,140)||'Not yet listed'}`,
    `Key priorities: ${short(input.priorities,140)||'Not yet listed'}`,
    ...plotLines,
    approvalDocumentBrief(input.documents),
    'QUESTIONS FOR THE ARCHITECT / REGISTERED PROFESSIONAL:',
    ...questions.map((q,i)=>`${i+1}. ${q}`),
    'NEXT: Confirm site survey, land title, land use, authority, professional scope, fees and required permissions before committing to construction.',
    'This example does not determine permitted FSI, setbacks, height, fees or approval eligibility. All client-supplied document statuses are unverified.',
  ];
  return {plot,documents,questions,fullText:lines.join('\n'),hasPlot:!!plot};
}

/** Short version for voluntary enquiry URL handoff, capped to the existing form's note limit. */
export function preconstructionEnquiryNotes(input:PreconstructionInput):string {
  const report=buildPreconstructionReport(input);
  const missing=report.documents.missing.map(g=>g.label).join(', ')||'None marked';
  const unsure=report.documents.unsure.map(g=>g.label).join(', ')||'None marked';
  return [
    'PRE-CONSTRUCTION WORKING REPORT — client-provided, not verified',
    `Project: ${input.type}; stage: ${input.stage}; budget: ${input.budget}; start: ${input.timeline}`,
    `Site: ${short(input.locality,120)||'Unconfirmed'}`,
    `Needs: ${short(input.spaces,140)||'To discuss'}; priorities: ${short(input.priorities,140)||'To discuss'}`,
    report.plot?`Illustrative plot: ${format(report.plot.plotAreaSqft)} sq.ft; ${input.levels} levels, example counted area ${format(report.plot.exampleCountedAreaSqft)} sq.ft, illustrative ratio ${report.plot.illustrativeRatio.toFixed(2)} (NOT permitted FSI)`:'Plot/FSI scenario: not provided',
    `Document groups reviewed: ${report.documents.reviewed}/6; missing: ${missing}; unsure: ${unsure}`,
    `Questions: ${report.questions.slice(0,3).join(' / ')}`,
    'Verify survey, documents, current approvals, design scope and fees with a registered professional. This is not an approval or quotation.',
  ].join('\n').slice(0,1800);
}
