import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('homepage positions architect-led decisions with honest project evidence',()=>{
 const home=read('app/page.tsx');
 const hero=read('components/HomeExperience.tsx');
 assert.match(hero,/Architect-led construction/);
 assert.match(hero,/lang="ta"/);
 assert.match(hero,/Calculate construction cost/);
 assert.match(hero,/Plan my home/);
 assert.match(home,/homeEvidenceFeature/);
 assert.match(home,/Studio Bind Architects · Completed architecture project/);
 assert.match(home,/Ongoing construction/);
 assert.match(home,/Pre-construction/);
 assert.match(home,/homeScopeContrast/);
 assert.match(home,/same area, specification and exclusions/);
});

test('three package decisions use published rates and route to calculator',()=>{
 const guide=read('components/PackageQuickGuide.tsx');
 const page=read('app/packages/page.tsx');
 const site=read('lib/site.ts');
 for(const rate of ['2399','2649','3199']) assert.match(site,new RegExp('rate: '+rate));
 assert.match(page,/PackageQuickGuide categories=\{categories\}/);
 assert.match(guide,/packages\.map\(p=>/);
 assert.match(guide,/aria-pressed=\{selected===p\.key\}/);
 assert.match(guide,/\/cost-calculator\?package=/);
 assert.match(guide,/selected package/);
 assert.match(guide,/Taxes, approvals, separately priced works/);
});

test('construction evidence is internal but the project index remains a Studio Bind redirect',()=>{
 const config=read('next.config.ts');
 const sitemap=read('app/sitemap.ts');
 const smoke=read('scripts/production-smoke.mjs');
 assert.doesNotMatch(config,/source:'\/project-evidence',destination:/);
 assert.match(config,/source:'\/projects',destination:'https:\/\/www\.bindarchitects\.com\/',permanent:true/);
 assert.match(sitemap,/\['\/project-evidence',/);
 assert.match(smoke,/\['\/project-evidence',/);
});
