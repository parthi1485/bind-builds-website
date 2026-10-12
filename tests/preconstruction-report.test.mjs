import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildPreconstructionReport, initialPreconstructionInput, preconstructionEnquiryNotes, preconstructionQuestions, preconstructionPlot } from '../lib/preconstruction-report.ts';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('new preparation report starts without inferred site entitlement or owner document status',()=>{
 const report=buildPreconstructionReport(initialPreconstructionInput);
 assert.equal(report.plot,null);
 assert.equal(report.documents.reviewed,0);
 assert.equal(report.documents.unreviewed.length,6);
 assert.match(report.fullText,/not verified|not professionally verified|not a[n]? approval|NOT an approval/i);
});

test('project geometry is illustrative and consistent with existing plot worksheet',()=>{
 const input={...initialPreconstructionInput,frontage:'30',depth:'40',levels:2,countedPerLevel:'750'};
 const report=buildPreconstructionReport(input);
 assert.equal(report.plot.plotAreaSqft,1200);
 assert.equal(report.plot.exampleCountedAreaSqft,1500);
 assert.equal(report.plot.illustrativeRatio,1.25);
 assert.match(report.fullText,/NOT permitted FSI/);
 assert.equal(preconstructionPlot({...input,depth:''}),null);
 assert.equal(preconstructionPlot({...input,countedPerLevel:'0'}),null);
 assert.equal(preconstructionPlot({...input,frontage:'Infinity'}),null);
 const over=buildPreconstructionReport({...input,countedPerLevel:'1300'});
 assert.equal(over.plot.areaExceedsPlot,true);
 assert.match(over.fullText,/Warning: assumed per-level/);
});

test('existing 6 document statuses are represented in full report and short handoff',()=>{
 const input={...initialPreconstructionInput,locality:'Porur, Chennai',frontage:'30',depth:'40',countedPerLevel:'750',levels:2,type:'New home',stage:'Land purchased',documents:{ownership:'available',survey:'missing',revenue:'unsure'}};
 const report=buildPreconstructionReport(input),notes=preconstructionEnquiryNotes(input);
 assert.equal(report.documents.reviewed,3);
 assert.equal(report.documents.missing[0].label,'Survey and site measurements');
 assert.match(report.fullText,/Available, unverified: Ownership records/);
 assert.match(report.fullText,/Need to obtain: Survey and site measurements/);
 assert.match(report.fullText,/Need clarification: Land and revenue records/);
 assert.match(notes,/Porur, Chennai/);
 assert.match(notes,/illustrative ratio 1.25 \(NOT permitted FSI\)/);
 assert.match(notes,/registered professional/);
 assert.ok(notes.length<=1800);
});

test('report supplies project-specific questions and caps user-provided text in shared brief',()=>{
 const input={...initialPreconstructionInput,type:'Demolition & rebuild',stage:'Looking for land',spaces:'x'.repeat(1000),priorities:'y'.repeat(1000)};
 const questions=preconstructionQuestions(input);
 assert.ok(questions.some(q=>/demolition/i.test(q)));
 assert.ok(questions.some(q=>/before purchasing land/i.test(q)));
 const text=preconstructionEnquiryNotes(input);
 assert.ok(text.length<=1800);
 assert.ok(!text.includes('x'.repeat(141)));
 assert.ok(!text.includes('y'.repeat(141)));
});

test('new report is discoverable, accessible, printable and safe to share voluntarily',()=>{
 const component=read('components/PreconstructionReport.tsx');
 const route=read('app/pre-construction-planning-report/page.tsx');
 const css=read('app/pre-construction-planning-report/report.css');
 const source=read('lib/preconstruction-report.ts');
 const approval=read('app/building-plan-approval-chennai/page.tsx');
 const calculator=read('app/cost-calculator/page.tsx');
 const sitemap=read('app/sitemap.ts');
 assert.match(component,/window\.print\(\)/);
 assert.match(component,/clipboard\.writeText\(report\.fullText\)/);
 assert.match(component,/whatsappUrl\(/);
 assert.match(component,/new URLSearchParams/);
 assert.match(component,/aria-label=\{`\$\{group.label\} status`\}/);
 assert.match(component,/role="status"/);
 assert.match(component,/report\.documents\.missing\.map/);
 assert.match(component,/NOT permitted FSI/);
 assert.match(route,/<PreconstructionReport\/>/);
 assert.match(css,/@media print/);
 assert.match(approval,/\/pre-construction-planning-report/);
 assert.match(calculator,/\/pre-construction-planning-report/);
 assert.match(sitemap,/\['\/pre-construction-planning-report',/);
 assert.doesNotMatch(component,/localStorage|sessionStorage|document\.cookie/);
 const events=component.match(/trackEvent\('planning_report_action',\{([^}]+)\}/)?.[1]||'';
 assert.doesNotMatch(events,/locality|spaces|priorities|frontage|depth/);
 assert.match(source,/\.slice\(0,1800\)/);
});
