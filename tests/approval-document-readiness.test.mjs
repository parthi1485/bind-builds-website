import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {approvalDocumentGroups,approvalDocumentSummary,approvalDocumentBrief} from '../lib/approval-guide.ts';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('document preparation has six non-overlapping groups',()=>{
 assert.equal(approvalDocumentGroups.length,6);
 assert.equal(new Set(approvalDocumentGroups.map(g=>g.id)).size,6);
 assert.ok(approvalDocumentGroups.every(g=>g.label&&g.example&&g.next));
});
test('next steps prioritize missing before unsure and not reviewed',()=>{
 const summary=approvalDocumentSummary({ownership:'available',revenue:'unsure',survey:'missing'});
 assert.equal(summary.reviewed,3);
 assert.equal(summary.available.length,1);
 assert.equal(summary.missing.length,1);
 assert.equal(summary.unsure.length,1);
 assert.equal(summary.unreviewed.length,3);
 assert.equal(summary.next[0].id,'survey');
 assert.equal(summary.next[1].id,'revenue');
 assert.equal(summary.next[2].id,'encumbrance');
});
test('complete status does not misrepresent verification',()=>{
 const answers=Object.fromEntries(approvalDocumentGroups.map(g=>[g.id,'available']));
 const summary=approvalDocumentSummary(answers);
 assert.equal(summary.reviewed,6);
 assert.equal(summary.next.length,0);
 const brief=approvalDocumentBrief(answers);
 assert.match(brief,/6 of 6/);
 assert.match(brief,/not verified/);
 assert.match(brief,/registered professional/);
});
test('approval readiness shares document group statuses without uploads or credential fields',()=>{
 const ui=read('components/ApprovalReadiness.tsx');
 const assistant=read('components/DocumentReadinessAssistant.tsx');
 const page=read('app/building-plan-approval-chennai/page.tsx');
 assert.match(ui,/approvalDocumentBrief\(documents\)/);
 assert.match(ui,/<DocumentReadinessAssistant answers=\{documents\}/);
 assert.match(assistant,/approval_document_status_changed/);
 assert.match(assistant,/aria-expanded=\{expanded\}/);
 assert.match(assistant,/value=\{answers\[group.id\]\|\|''\}/);
 assert.doesNotMatch(assistant,/<input[^>]*type="file"/);
 assert.match(page,/href="#document-readiness"/);
});
