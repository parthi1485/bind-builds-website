import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('homepage positions architect-led decisions with honest project evidence',()=>{
 const home=read('app/page.tsx');
 const hero=read('components/HomeExperience.tsx');
 assert.match(hero,/Architect-led construction/);
 assert.match(hero,/One team\. From the first sketch to the final key\./);
 assert.doesNotMatch(hero,/homeTamilLine|lang="ta"|An architect-led team coordinating the decisions/);
 assert.match(hero,/Calculate my construction cost/);
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

test('calculator explains illustrative allocation and supports contact-free sharing',()=>{
 const report=read('components/CalculatorReport.tsx');
 const roadmap=read('components/StageCostRoadmap.tsx');
 assert.match(report,/StageCostRoadmap allocation=\{allocation\}/);
 assert.match(report,/estimate_summary_saved/);
 assert.match(report,/estimate_summary_shared/);
 assert.match(report,/Save summary \(TXT\)/);
 assert.match(report,/Share with family/);
 assert.match(roadmap,/not payment demands or agreed milestones/);
 assert.match(roadmap,/signed project agreement/);
 assert.match(roadmap,/allocation\.slice\(8,10\)/);
});

test('personalised home brief remains optional and prefills project enquiry',()=>{
 const plan=read('components/MyHomePlan.tsx');
 const report=read('components/CalculatorReport.tsx');
 const enquiry=read('components/ProjectForm.tsx');
 assert.match(report,/MyHomePlan input=\{input\}/);
 assert.match(plan,/Share with family/);
 assert.match(plan,/Nothing is sent to Bind Builds until you choose to enquire/);
 assert.match(plan,/URLSearchParams/);
 assert.match(plan,/Edit floors, package or extras/);
 assert.match(plan,/home_plan_saved/);
 assert.match(enquiry,/stageParam=params\.get\('stage'\)/);
 assert.match(enquiry,/timelineParam=params\.get\('timeline'\)/);
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
 assert.match(analytics,/homeEvidenceFeature/);
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

test('editorial homepage prioritises architecture and removes duplicate highlight cards',()=>{
 const home=read('app/page.tsx');
 const css=read('app/conversion.css');
 assert.doesNotMatch(home,/className="proofRail"|className="highlightGrid"/);
 assert.match(home,/homeEvidenceVisual/);
 assert.match(home,/Studio Bind Architects · Completed architecture project/);
 assert.match(home,/Ongoing construction · Pre-construction/);
 assert.ok(home.indexOf('homeEvidenceFeature')<home.indexOf('designStatement'));
 assert.ok(home.indexOf('designStatement')<home.indexOf('homeScopeContrast'));
 assert.ok(home.indexOf('specificationSection')<home.indexOf('homePlanningTools'));
 assert.match(css,/homeEvidenceGrid\{max-width:1260px/);
});
test('simplified package choices preserve the full specification comparison',()=>{
 const quick=read('components/PackageQuickGuide.tsx');
 const full=read('app/packages/page.tsx');
 assert.match(quick,/Flooring: /);
 assert.doesNotMatch(quick,/Site support: /);
 assert.match(full,/PackageComparison categories=\{categories\}/);
});

test('homepage sections have intentional color contrast and a working project-information panel',()=>{
 const home=read('app/page.tsx');
 const css=read('app/homepage-rhythm.css');
 const layout=read('app/layout.tsx');
 const motion=read('components/Motion.tsx');
 assert.doesNotMatch(home,/<img src="\/projects\/ccbm-commercial-complex\.webp"/);
 assert.match(home,/homeProjectSheet/);
 assert.match(home,/CCBM/);
 assert.match(home,/Studio Bind Architects · Completed architecture project/);
 assert.match(home,/Beyond<br\/><span>the rate\./);
 assert.match(layout,/import '\.\/homepage-rhythm\.css'/);
 assert.match(css,/\.premiumHome \.designStatement\{[\s\S]*?background:#161a20;[\s\S]*?color:#f6f7f8/);
 assert.match(css,/\.premiumHome \.designStatement>h2\{color:#f6f7f8/);
 assert.match(css,/body:has\(\.premiumHome\) \.mobileProjectBar\{display:none!important\}/);
 assert.match(motion,/\['\/', '\/start-a-project'/);
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
