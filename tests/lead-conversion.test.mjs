import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { classifyLead, leadHandoffLine } from '../lib/lead-quality.ts';
import { createLeadFollowup } from '../lib/lead-followup.ts';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('lead scoring does not presume the visitor has already purchased land', () => {
  const basic = {intent:'Ready to discuss scope and next steps',stage:'',timeline:'Within 3 months',budget:'Not decided yet',area:''};
  const withoutOwnership = classifyLead(basic);
  const withOwnership = classifyLead({...basic,stage:'Land purchased'});
  assert.equal(withOwnership.score - withoutOwnership.score,3);
  assert.equal(withoutOwnership.priority,'Develop');
  assert.equal(withOwnership.priority,'Priority');
  assert.match(leadHandoffLine({...basic,stage:'Land purchased'}),/Sales handoff: Priority/);
  assert.match(createLeadFollowup({...basic,type:'New home',name:'Prospect',location:'Chennai'}).firstQuestion,/built-up area/);
});

test('project form requires an explicit stage and offers contextual WhatsApp without requiring a CRM lead', () => {
  const form=source('components/ProjectForm.tsx');
  const styles=source('app/ui-fixes.css');
  assert.match(form,/stage:'',intent:''/);
  assert.match(form,/<select required value=\{form.stage\}/);
  assert.match(form,/Select your current stage/);
  assert.match(form,/project_brief_whatsapp_click/);
  assert.match(form,/whatsappUrl\(brief\)/);
  assert.match(form,/lead_priority:leadQuality.priority/);
  assert.match(form,/Preferred reply channel:/);
  assert.match(form,/form.preferredContact==='Email'/);
  assert.match(form,/preferredContact:'',website:''/);
  assert.match(styles,/\.qualifiedWhatsapp\{/);
});

test('enquiry API checks project readiness and optional email without altering PDF lead flow', () => {
  const api=source('app/api/website-lead/route.ts');
  assert.match(api,/payload.source !== 'Website – Estimate PDF'/);
  assert.match(api,/if \(!payload.location\)/);
  assert.match(api,/stages.includes\(payload.stage\)/);
  assert.match(api,/Lead intent: /);
  assert.match(api,/if \(payload.email &&/);
  assert.match(api,/payload.source === 'Website – Estimate PDF'/);
  assert.match(api,/clean\(raw.website, 100\)/);
});

test('form never knowingly double-posts and preserves a WhatsApp/email recovery path', () => {
  const form=source('components/ProjectForm.tsx');
  assert.match(form,/submissionInFlight.current/);
  assert.match(form,/if\(submitting \|\| submissionInFlight.current\) return/);
  assert.match(form,/AbortSignal.timeout\(20000\)/);
  assert.match(form,/role="alert"/);
  assert.match(form,/ref=\{errorRef\}/);
  assert.match(form,/project_enquiry_recovery_click/);
  assert.match(form,/formRecoveryActions/);
  assert.match(form,/project_enquiry_whatsapp_followup/);
  assert.match(form,/Start another enquiry/);
  assert.match(form,/leadQuality.priority==='Nurture'/);
  assert.match(form,/nurtureNextLinks/);
  assert.doesNotMatch(form,/← Edit details/);
});
