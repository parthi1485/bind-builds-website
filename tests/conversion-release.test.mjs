import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('homepage retains the original hero while removing the project feature',()=>{
 const home=read('app/page.tsx'), hero=read('components/HomeExperience.tsx');
 assert.match(hero,/Architect-led construction/);
 assert.ok(hero.includes('One team. From the first sketch to the final key.'));
 assert.ok(hero.includes('Calculate my construction cost')&&hero.includes('Plan my home'));
 assert.ok(!home.includes('homeEvidenceFeature')&&!home.includes('homeProjectSheet'));
 assert.ok(home.includes('confidenceSection')&&home.includes('Review project evidence'));
 assert.ok(home.includes('homeScopeContrast'));
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
 assert.match(guide,/selected===p.key/);
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

test('calculator results return to compact original estimate without stage roadmap or Home Plan form',()=>{
 const report=read('components/CalculatorReport.tsx');
 assert.ok(!report.includes('StageCostRoadmap') && !report.includes('MyHomePlan'));
 assert.ok(!report.includes('Share with family') && !report.includes('Save summary (TXT)'));
 for(const required of ['Your home.', 'Your cost breakdown.', 'Download estimate PDF', 'Copy estimate', 'Edit my inputs', '<EstimatePresentation data={visuals}', '<ProposalVisuals data={visuals}/>', 'estimateConversionBar', 'calculateEmi']){
  assert.ok(report.includes(required), 'Missing original result component: '+required);
 }
 const css=read('app/conversion.css');
 for(const removed of ['.stageCostRoadmap','.myHomePlanGrid','.stageCostCards']){
  assert.ok(!css.includes(removed), 'Orphaned result UI styles: '+removed);
 }
});

test('process page adds specific construction risk education without scare pricing',()=>{
 const process=read('app/process/page.tsx');
 assert.match(process,/avoidable-construction-mistakes/);
 assert.match(process,/Concealing wet-area work without checks/);
 assert.match(process,/Approving extra work verbally/);
 assert.match(process,/pre-construction-planning-report/);
 assert.doesNotMatch(process,/save ₹2 lakh|lose ₹2 lakh/i);
});

test('homepage makes existing free preparation tools discoverable',()=>{
 const home=read('app/page.tsx');
 assert.match(home,/homePlanningTools/);
 assert.match(home,/Home-building readiness report/);
 assert.match(home,/href="\/pre-construction-planning-report"/);
 assert.match(home,/href="\/building-plan-approval-chennai"/);
 assert.match(home,/href="\/cost-calculator"/);
 assert.match(home,/Detailed design, statutory verification and professional site assessments require an agreed engagement/);
});

test('new package and planning interactions have privacy-conscious funnel events',()=>{
 const guide=read('components/PackageQuickGuide.tsx');
 const analytics=read('components/Analytics.tsx');
 assert.match(guide,/package_preference_preview/);
 assert.match(analytics,/planning_resource_click/);
 assert.match(analytics,/confidence-before-commit/);
 assert.doesNotMatch(guide,/trackEvent\([^\n]*location:/);
});

test('original minimal homepage hero keeps restrained mobile CTA and spacing',()=>{
 const hero=read('components/HomeExperience.tsx');
 const css=read('app/conversion.css');
 const copy=hero.slice(hero.indexOf('productHeroCopy'),hero.indexOf('architectureScene'));
 assert.match(copy,/One team\. From the first sketch to the final key\./);
 assert.match(copy,/href="\/start-a-project" className="cta primary"/);
 assert.match(copy,/href="\/cost-calculator"/);
 assert.doesNotMatch(copy,/homeTamilLine/);
 assert.match(css,/premiumHome \.productHeroActions \.cta\{width:auto/);
});

test('editorial homepage starts with the hero and maintains the original sections',()=>{
 const home=read('app/page.tsx');
 for(const deleted of ['className="proofRail"','className="highlightGrid"','homeEvidenceVisual','homeProjectSheet'])
  assert.ok(!home.includes(deleted));
 assert.ok(home.indexOf('<HomeHero/>')<home.indexOf('designStatement'));
 assert.ok(home.indexOf('designStatement')<home.indexOf('homeScopeContrast'));
 assert.ok(home.indexOf('specificationSection')<home.indexOf('<BuildAssurance/>'));
 assert.ok(home.indexOf('<BuildAssurance/>')<home.indexOf('homePlanningTools'));
});
test('simplified package choices preserve the full specification comparison',()=>{
 const quick=read('components/PackageQuickGuide.tsx');
 const full=read('app/packages/page.tsx');
 assert.match(quick,/Flooring: /);
 assert.doesNotMatch(quick,/Site support: /);
 assert.match(full,/PackageComparison categories=\{categories\}/);
});

test('homepage clearly separates the price comparison and construction assurance',()=>{
 const home=read('app/page.tsx'), css=read('app/homepage-rhythm.css');
 const layout=read('app/layout.tsx'), motion=read('components/Motion.tsx');
 assert.ok(!home.includes('homeEvidenceFeature')&&!home.includes('homeProjectSheet'));
 assert.ok(home.includes('specificationSection')&&home.includes('<BuildAssurance/>'));
 assert.ok(home.includes('Beyond<br/><span>the rate.</span>'));
 assert.ok(layout.includes('homepage-rhythm.css'));
 assert.ok(css.includes('background:#fff;')&&css.includes('background:#e7edf4;'));
 assert.ok(css.includes('.premiumHome .assuranceSection::before'));
 assert.ok(css.includes('.premiumHome .designStatement>h2'));
 assert.ok(css.includes('body:has(.premiumHome) .mobileProjectBar'));
 assert.ok(motion.includes('inlineControl'));
});
test('CCBM project evidence pages do not expose a failing media file as project photography',()=>{
 const evidence=read('app/project-evidence/page.tsx');
 const caseStudy=read('app/projects/ccbm-commercial-complex/page.tsx');
 const css=read('app/homepage-rhythm.css');
 assert.doesNotMatch(evidence,/img className="evidenceCardVisual"/);
 assert.doesNotMatch(caseStudy,/<img src="\/projects\/ccbm-commercial-complex\.webp"/);
 assert.doesNotMatch(caseStudy,/image:site\.url\+'\/projects\/ccbm-commercial-complex\.webp'/);
 assert.match(evidence,/not a project photograph/);
 assert.match(caseStudy,/Project information graphic, not site photography/);
 assert.match(css,/\.projectSheetPlaceholder/);
});
