import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

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
