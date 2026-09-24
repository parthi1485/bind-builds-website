import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { classifyLead } from '../lib/lead-quality.ts';
import { createLeadFollowup } from '../lib/lead-followup.ts';

const read = path => readFileSync(new URL('../'+path, import.meta.url), 'utf8');

test('launch-critical routes are represented in the sitemap', () => {
  const sitemap=read('app/sitemap.ts');
  const routes=[
    "''",
    "'/about'",
    "'/project-evidence'",
    "'/projects/sunguvarchathiram-multigenerational-home'",
    "'/projects/pallikaranai-family-home'",
    "'/packages'",
    "'/cost-calculator'",
    "'/construction-cost-chennai'",
    "'/construction-company-chennai'",
    "'/house-construction-chennai'",
    "'/individual-house-construction-chennai'",
    "'/turnkey-house-construction-chennai'",
    "'/building-plan-approval-chennai'",
    "'/service-areas-chennai'",
    "'/house-construction-west-chennai'",
    "'/house-construction-ramapuram-chennai'",
    "'/house-construction-porur-chennai'",
    "'/house-construction-valasaravakkam-chennai'",
    "'/house-construction-poonamallee-chennai'",
    "'/house-construction-virugambakkam-vadapalani-saligramam'",
    "'/house-construction-mangadu-kundrathur-chennai'",
    "'/house-construction-maduravoyal-vanagaram-kattupakkam'",
    "'/house-construction-gerugambakkam-kolapakkam-chennai'",
    "'/house-construction-anna-nagar-chennai'",
    "'/house-construction-omr-ecr-chennai'",
    "'/house-construction-coimbatore'",
    "'/construction-cost-coimbatore'",
    "'/demolition-rebuild-house-chennai'",
    "'/process'",
    "'/faq'",
    "'/contact'",
    "'/start-a-project'",
    "'/privacy'",
  ];
  for(const route of routes) assert.ok(sitemap.includes('['+route+','), 'Missing sitemap route '+route);
  assert.equal((sitemap.match(/\['\//g)||[]).length+Number(sitemap.includes("['',1]")),routes.length);
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
  assert.match(project,/leadFollowupSummary/);
  assert.match(project,/followup_mode/);
  assert.match(analytics,/trust_evidence_click/);
  assert.match(analytics,/review_click/);
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


test('lead follow-up intelligence changes by priority', () => {
  const priority=createLeadFollowup({
    name:'Ramesh Kumar', type:'New home', location:'Pallikaranai', intent:'Ready to discuss scope and next steps', stage:'Land purchased', timeline:'Within 3 months', budget:'₹50 lakh–₹1 crore', area:'1800', package:'Elevate'
  });
  assert.equal(priority.priority,'Priority');
  assert.match(priority.responseMode,/Call first/i);
  assert.match(priority.whatsapp,/Ramesh/);
  assert.match(priority.whatsapp,/Pallikaranai/);
  const develop=createLeadFollowup({name:'Priya',type:'New home',location:'Porur',intent:'Comparing construction proposals',stage:'Design in progress',timeline:'3–6 months',budget:'Not decided yet',area:'',package:''});
  assert.equal(develop.priority,'Develop');
  assert.match(develop.firstQuestion,/built-up area|budget|proposal/i);
  const nurture=createLeadFollowup({name:'Arun',type:'New home',location:'Chennai',intent:'Just researching',stage:'Looking for a plot',timeline:'Exploring options',budget:'Not decided yet',area:'',package:''});
  assert.equal(nurture.priority,'Nurture');
  assert.match(nurture.responseMode,/Resource-first/i);
  assert.ok(nurture.nurtureAsset);
});


test('canonical and legacy-domain migration signals remain configured', () => {
  const seo=read('lib/seo.ts');
  const config=read('next.config.ts');
  assert.match(seo,/const canonical=site\.url\+path/);
  assert.match(seo,/alternates:\{canonical\}/);
  for(const host of ['bindconstructions.com','www.bindconstructions.com']) assert.ok(config.includes(host));
  assert.match(config,/type:'host'/);
  assert.match(config,/https:\/\/www\.bindbuilds\.com\/packages/);
  assert.match(config,/https:\/\/www\.bindbuilds\.com\/project-evidence/);
});


test('project evidence links to substantive case-study pages', () => {
  const evidence=read('app/project-evidence/page.tsx');
  const sung=read('app/projects/sunguvarchathiram-multigenerational-home/page.tsx');
  const palli=read('app/projects/pallikaranai-family-home/page.tsx');
  assert.match(evidence,/sunguvarchathiram-multigenerational-home/);
  assert.match(evidence,/pallikaranai-family-home/);
  assert.match(sung,/6,519 sq\.ft\./);
  assert.match(sung,/Not a completed Bind Builds handover/);
  assert.match(palli,/17 ft × 44 ft/);
  assert.match(palli,/PRE-CONSTRUCTION/);
});
