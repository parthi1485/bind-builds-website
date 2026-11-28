import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema, founderPersonSchema, organizationSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const path='/projects/pallikaranai-family-home';
const worksheetPath='/project-briefs/pallikaranai-design-review.pdf';
const title='Narrow Plot Family Home in Pallikaranai — Pre-Construction Case Study';
const description='A Bind Builds pre-construction case study for a 17 × 44 ft east-facing Pallikaranai plot planned for parents and two sons, showing how user needs, parking, privacy and Vastu are resolved before construction begins.';
export const metadata=pageMetadata(title,description,path);

const caseSchema={
 '@context':'https://schema.org',
 '@type':'Article',
 headline:title,
 description,
 url:site.url+path,
 dateModified:'2026-11-28',
 hasPart:{'@type':'DigitalDocument',name:'Pallikaranai family home design review worksheet',url:site.url+worksheetPath,encodingFormat:'application/pdf',inLanguage:'en-IN'},
 author:{'@id':site.url+'/#founder'},
 publisher:{'@id':site.url+'/#organization'},
 about:[
  {'@type':'Place',name:'Pallikaranai, Chennai'},
  {'@type':'Thing',name:'Narrow plot residential planning'},
  {'@type':'Thing',name:'Multi-generational family home'}
 ]
};

const brief=[
 ['Plot','17 ft × 44 ft','East-facing narrow urban plot'],
 ['Ground floor','Parents + dog','1BHK home with car parking'],
 ['First floor','Younger son + spouse','Independent family unit'],
 ['Second floor','Elder son + spouse','Independent family unit'],
 ['Terrace','Shared family use','Headroom, sitout and terrace garden']
];

const decisions=[
 ['01','Keep the family together without forcing one household.','Each generation needs independence, but circulation and services still have to work as one building.'],
 ['02','Make a 17-foot frontage work harder.','Parking, staircase, daylight, room widths and service shafts compete for the same narrow cross-section.'],
 ['03','Use Vastu as a planning input, not an afterthought.','The working brief prioritises a north-east entry, south-east kitchen, south-west bedroom and north-west toilet zone where the plan permits.'],
 ['04','Resolve the building before pricing the final scope.','Floor area, facade direction and major planning decisions need confirmation before agreement, approvals, structure and GFC coordination.']
];

export default function PallikaranaiCaseStudy(){
 return <Page kicker="PROJECT EVIDENCE / PRE-CONSTRUCTION" title="Pallikaranai family home on a 17 × 44 ft plot">
  <article className="guidePage projectCaseStudy">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/project-evidence">Project evidence</Link><span>/</span><span>Pallikaranai</span></nav>

   <header className="guideIntro projectCaseIntro">
    <span className="productEyebrow">Pallikaranai · Chennai</span>
    <h2>The important decisions<br/><span>happen before construction.</span></h2>
    <p>This current Bind Builds project is still in pre-construction. It is useful evidence of how a narrow urban plot, multi-generational requirements, parking and Vastu are translated into a coordinated design brief before site execution begins.</p>
    <div className="caseStatusBar"><strong>PRE-CONSTRUCTION</strong><span>Design + coordination stage · not yet a handover</span></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Project brief</span>
    <div className="caseBriefTable">{brief.map(([label,value,note])=><div key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}</div>
    <div className="guideActions">
     <a className="productTextLink" href={worksheetPath} download>Download the design review worksheet (1-page PDF) ↓</a>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">The planning problem</span>
    <h2>Not “how many rooms?”<br/><span>How should this family live?</span></h2>
    <div className="caseDecisionGrid">{decisions.map(([no,h,p])=><article key={no}><span>{no}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Current design anchors</span>
    <h2>Four Vastu positions.<br/><span>Resolved with the real plot.</span></h2>
    <div className="caseCompass">
     <article><span>NE</span><strong>Entry</strong><p>North or east-facing entry in the north-east zone where circulation permits.</p></article>
     <article><span>SE</span><strong>Kitchen</strong><p>Kitchen planned toward the south-east zone as one of the primary layout anchors.</p></article>
     <article><span>SW</span><strong>Bedroom</strong><p>Primary bedroom preference toward the south-west zone.</p></article>
     <article><span>NW</span><strong>Toilet</strong><p>Toilet preference toward the north-west zone, coordinated with plumbing practicality.</p></article>
    </div>
    <p className="guideSmall">These are project design preferences, not a claim that the same arrangement will suit every plot. Setbacks, structure, light, ventilation, services and local approval requirements still have to be coordinated.</p>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">What happens before construction</span>
    <h2>Lock the decisions.<br/><span>Then mobilise the site.</span></h2>
    <ol className="caseStageList">
     <li><span>01</span><div><h3>Schematic floor-plan options</h3><p>Test the family programme, circulation and usable room proportions within the narrow plot.</p></div></li>
     <li><span>02</span><div><h3>Revised plan + first-cut facade</h3><p>Connect the internal planning with the external massing and review both together.</p></div></li>
     <li><span>03</span><div><h3>Final plan + facade confirmation</h3><p>Confirm the design direction before using the finalised area for the construction agreement.</p></div></li>
     <li><span>04</span><div><h3>Approvals + structural coordination</h3><p>Proceed with the applicable approval drawings, structural inputs and coordinated GFC information.</p></div></li>
     <li><span>05</span><div><h3>Construction commencement</h3><p>The project moves to site only after the pre-construction decisions and required documentation reach the agreed stage.</p></div></li>
    </ol>
   </section>

   <section className="guideSection" id="plan-review">
    <h2>What to check at the first plan review.</h2>
    <div className="guideCards three">
     <article>
      <h3>Trace the route to each front door.</h3>
      <p>Start at the gate and follow a visitor to either upstairs home. Circle any point where they would pass through the parents’ living space.</p>
     </article>
     <article>
      <h3>Leave the car in the drawing.</h3>
      <p>Mark the parked car with its doors open. Can someone carrying groceries still reach the ground-floor entrance or the stairs?</p>
     </article>
     <article>
      <h3>Look at the floors together.</h3>
      <p>Mark where each main room could get daylight. Compare the kitchens and bathrooms across floors to see where their service shafts could line up.</p>
     </article>
    </div>
   </section>

   <section className="guideClosing"><h2>Have a difficult plot?</h2><p>Bring the plot dimensions, family requirements and what matters most. See how we plan and price independent homes in our <Link className="productTextLink" href="/house-construction-chennai">guide to house construction in Chennai</Link>.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my plot ↗</Link><Link className="productTextLink" href="/cost-calculator">Estimate the construction budget →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Pallikaranai family home',path),caseSchema,organizationSchema,founderPersonSchema]}/>
 </Page>;
}
