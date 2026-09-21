import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { classifyLead } from '../lib/lead-quality.ts';

const read = path => readFileSync(new URL('../'+path, import.meta.url), 'utf8');

test('launch-critical routes are represented in the sitemap', () => {
  const sitemap=read('app/sitemap.ts');
  const routes=[
    "''",
    "'/about'",
    "'/packages'",
    "'/cost-calculator'",
    "'/construction-cost-chennai'",
    "'/house-construction-chennai'",
    "'/turnkey-house-construction-chennai'",
    "'/building-plan-approval-chennai'",
    "'/service-areas-chennai'",
    "'/demolition-rebuild-house-chennai'",
    "'/process'",
    "'/faq'",
    "'/contact'",
    "'/start-a-project'",
    "'/privacy'",
  ];
  for(const route of routes) assert.ok(sitemap.includes('['+route+','), 'Missing sitemap route '+route);
  assert.equal((sitemap.match(/\['\//g)||[]).length+Number(sitemap.includes("['',1]")),15);
});

test('robots, icon and social preview surfaces exist', () => {
  const robots=read('app/robots.ts');
  assert.match(robots,/allow:'\/'/);
  assert.match(robots,/sitemap\.xml/);
  assert.ok(existsSync(new URL('../app/icon.svg',import.meta.url)));
  assert.ok(existsSync(new URL('../app/opengraph-image.tsx',import.meta.url)));
});

test('lead conversion events remain wired to the conversion paths', () => {
  const project=read('components/ProjectForm.tsx');
  const report=read('components/CalculatorReport.tsx');
  const analytics=read('components/Analytics.tsx');
  assert.match(project,/trackEvent\('project_enquiry'/);
  assert.match(report,/trackEvent\('pdf_download_lead'/);
  assert.match(report,/trackEvent\('estimate_pdf_download'/);
  assert.match(analytics,/call_click/);
  assert.match(analytics,/whatsapp_click/);
  assert.match(analytics,/project_cta_click/);
  assert.match(analytics,/calculator_cta_click/);
  assert.match(analytics,/scroll_depth/);
  assert.match(project,/project_form_step_view/);
  assert.match(project,/project_form_step_complete/);
  assert.match(report,/pdf_gate_open/);
  assert.match(report,/estimateConversionBar/);
  assert.match(project,/project_form_optional_skipped/);
  assert.match(project,/lead_intent_selected/);
  assert.match(project,/Just researching/);
  assert.match(project,/qualificationNextStep/);
  assert.match(project,/lead_priority/);
  assert.match(project,/leadHandoffLine/);
  assert.match(analytics,/trust_evidence_click/);
  const home=read('app/page.tsx');
  const slug=read('app/[slug]/page.tsx');
  assert.match(slug,/projectFitIntro/);
  assert.match(home,/confidence-before-commit/);
  assert.match(home,/One practice\. Two chapters\./);
});

test('lead API accepts only known website sources and keeps the honeypot check', () => {
  const api=read('app/api/website-lead/route.ts');
  for(const source of ['Website – Estimate PDF','Website – Project Enquiry','Website – Contact Form']) assert.ok(api.includes(source));
  assert.match(api,/raw\.website/);
  assert.match(api,/digits\.length < 10 \|\| digits\.length > 15/);
});

test('baseline production security headers are configured', () => {
  const config=read('next.config.ts');
  for(const header of ['X-Content-Type-Options','Referrer-Policy','X-Frame-Options','Permissions-Policy']) assert.ok(config.includes(header));
  assert.match(config,/poweredByHeader:false/);
});


test('lead handoff scoring separates ready and early-stage enquiries', () => {
  const priority=classifyLead({intent:'Ready to discuss scope and next steps',stage:'Land purchased',timeline:'Within 3 months',budget:'₹50 lakh–₹1 crore',area:'1800',package:'Elevate'});
  assert.equal(priority.priority,'Priority');
  assert.ok(priority.score >= 8);

  const nurture=classifyLead({intent:'Just researching',stage:'Looking for a plot',timeline:'Exploring options',budget:'Not decided yet',area:'',package:''});
  assert.equal(nurture.priority,'Nurture');
  assert.ok(nurture.score <= 3);
});
