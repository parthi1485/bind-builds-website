import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema, founderPersonSchema, organizationSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const path='/projects/ccbm-commercial-complex';
const title='CCBM Commercial Complex, Maduravoyal — Completed Architecture Project';
const description='Completed Studio Bind Architects commercial project in Maduravoyal: a 4,000 sq.ft site with 12,494 sq.ft built-up area, basement + 3.5 floors and flexible floor-wise planning for independent leasing.';
export const metadata=pageMetadata(title,description,path);

const studioProjectUrl='https://www.bindarchitects.com/project/ccbm';

const caseSchema={
 '@context':'https://schema.org',
 '@type':'Article',
 headline:title,
 description,
 url:site.url+path,
 image:site.url+'/projects/ccbm-commercial-complex.webp',
 dateModified:'2026-09-25',
 author:{'@id':site.url+'/#founder'},
 publisher:{'@id':site.url+'/#organization'},
 about:[
  {'@type':'Place',name:'Maduravoyal, Chennai'},
  {'@type':'Thing',name:'Commercial architecture'},
  {'@type':'Thing',name:'Flexible floor-wise leasing design'}
 ]
};

const priorities=[
 ['01','Rental yield as a planning driver','The project was conceived as a high rental-yield commercial building rather than a single-tenant block.'],
 ['02','Independent floor-wise leasing','Flexible planning allows different floors to operate for multiple businesses instead of forcing one occupancy model.'],
 ['03','Commercial visibility + identity','The facade gives the building a strong street presence while keeping individual floors legible within one architectural composition.'],
 ['04','Buildable area from a compact site','A 4,000 sq.ft site supports a 12,494 sq.ft built-up commercial programme across a basement + 3.5 floor configuration.']
];

export default function CcbmCommercialComplex(){
 return <Page kicker="PROJECT EVIDENCE / COMPLETED DESIGN PROJECT" title="A commercial building planned to lease floor by floor.">
  <article className="guidePage projectCaseStudy">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/project-evidence">Project evidence</Link><span>/</span><span>CCBM Commercial Complex</span></nav>

   <header className="guideIntro projectCaseIntro">
    <span className="productEyebrow">Maduravoyal · Chennai</span>
    <h2>Completed commercial architecture.<br/><span>Role stated clearly.</span></h2>
    <p>CCBM Commercial Complex is a completed Studio Bind Architects project in Maduravoyal. The project sheet records the status as completed and the professional role as architectural design. We show it here as completed design/practice evidence—not as a Bind Builds construction handover.</p>
    <div className="caseStatusBar"><strong>COMPLETED</strong><span>Studio Bind Architects · Architectural Design</span></div>
   </header>

   <figure className="caseProjectVisual">
    <img src="/projects/ccbm-commercial-complex.webp" alt="CCBM Commercial Complex project sheet showing architectural renderings, completed building photograph and site aerials in Maduravoyal" width="900" height="518"/>
    <figcaption>CCBM Commercial Complex · Maduravoyal · project sheet supplied from the Studio Bind Architects portfolio.</figcaption>
   </figure>

   <section className="guideSection">
    <span className="productEyebrow">Project snapshot</span>
    <div className="caseSnapshotGrid">
     <article><span>Location</span><strong>Maduravoyal</strong><small>Chennai</small></article>
     <article><span>Site area</span><strong>4,000 sq.ft.</strong><small>Commercial site</small></article>
     <article><span>Built-up area</span><strong>12,494 sq.ft.</strong><small>Completed project</small></article>
     <article><span>Configuration</span><strong>Basement + 3.5 floors</strong><small>Flexible floor-wise planning</small></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Design intent</span>
    <h2>One building.<br/><span>Multiple leasing possibilities.</span></h2>
    <p>The project was designed as a high rental-yield commercial building with flexible floor-wise planning, allowing independent leasing for multiple businesses.</p>
    <div className="caseDecisionGrid">{priorities.map(([no,h,p])=><article key={no}><span>{no}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">What this evidence proves</span>
    <div className="caseBoundary caseBoundaryCompleted">
     <h3>A completed building can strengthen confidence only when the role behind it is explicit.</h3>
     <p>This project supports Studio Bind Architects’ completed commercial architecture experience. The supplied project sheet identifies the role as <strong>Architectural Design</strong>. We therefore do not use it to claim that Bind Builds delivered the construction contract.</p>
    </div>
    <div className="guideActions caseSourceActions">
      <a className="productTextLink" href={studioProjectUrl} target="_blank" rel="noopener noreferrer">View the original Studio Bind project page ↗</a>
      <Link className="productTextLink" href="/project-evidence">See how we label project evidence →</Link>
    </div>
   </section>

   <section className="guideClosing">
    <h2>Planning a commercial or residential project?</h2>
    <p>Bring the site, programme and business goals. We’ll connect the design decisions to the project scope before construction begins.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my project ↗</Link><Link className="productTextLink" href="/process">See the Bind Builds process →</Link></div>
   </section>
  </article>
  <StructuredData data={[breadcrumbSchema('CCBM Commercial Complex, Maduravoyal',path),caseSchema,organizationSchema,founderPersonSchema]}/>
 </Page>;
}
