import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema, founderPersonSchema, organizationSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const path='/projects/sunguvarchathiram-multigenerational-home';
const title='Ongoing Multi-Generational Home in Sunguvarchathiram';
const description='A transparent project case study from the Studio Bind Architects practice: a 6,519 sq.ft multi-generational residence in Sunguvarchathiram, shown as ongoing construction evidence rather than a completed handover.';
export const metadata=pageMetadata(title,description,path);

const caseSchema={
 '@context':'https://schema.org',
 '@type':'Article',
 headline:title,
 description,
 url:site.url+path,
 dateModified:'2026-09-24',
 author:{'@id':site.url+'/#founder'},
 publisher:{'@id':site.url+'/#organization'},
 about:[
  {'@type':'Place',name:'Sunguvarchathiram, Tamil Nadu'},
  {'@type':'Thing',name:'Multi-generational residential architecture'},
  {'@type':'Thing',name:'Residential construction in progress'}
 ]
};

const stages=[
 ['01','Foundation + footing','The project moved from setting-out and foundation work into the structural frame.'],
 ['02','Columns + tie beam','Column steel, shuttering and tie-beam coordination established the structural grid before wall work.'],
 ['03','Plinth + filling','Basement protection, soil filling and plinth-stage coordination prepared the ground-floor level.'],
 ['04','Brickwork + sill/lintel','Masonry progressed with sill and lintel levels checked against openings and the architectural drawings.'],
 ['05','Roof centering + reinforcement','Roof centering, fabrication and reinforcement were coordinated before the slab pour.'],
 ['06','Concrete milestone','A large roof-concrete operation became a useful site record of labour, sequencing and execution coordination.']
];

export default function SunguvarchathiramCaseStudy(){
 return <Page kicker="PROJECT EVIDENCE / ONGOING" title="A multi-generational home. Still in progress.">
  <article className="guidePage projectCaseStudy">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/project-evidence">Project evidence</Link><span>/</span><span>Sunguvarchathiram</span></nav>

   <header className="guideIntro projectCaseIntro">
    <span className="productEyebrow">Sunguvarchathiram · Chennai region</span>
    <h2>Evidence from the site.<br/><span>Without calling it a handover.</span></h2>
    <p>This is an active residential project from the Studio Bind Architects practice. The page records what an ongoing site can demonstrate—planning continuity, drawing coordination and construction sequencing—while keeping the project stage clear.</p>
    <div className="caseStatusBar"><strong>ONGOING</strong><span>Not a completed Bind Builds handover</span></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Project snapshot</span>
    <div className="caseSnapshotGrid">
     <article><span>Location</span><strong>Sunguvarchathiram</strong><small>Chennai region</small></article>
     <article><span>Scale</span><strong>6,519 sq.ft.</strong><small>Residential built-up area</small></article>
     <article><span>Type</span><strong>Multi-generational</strong><small>Family residence</small></article>
     <article><span>Role</span><strong>Architecture + site execution</strong><small>Construction in progress</small></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">What this project can show</span>
    <h2>A drawing is only useful<br/><span>when the site can follow it.</span></h2>
    <div className="guideCards three">
     <article><span className="guideNumber">01</span><h3>Planning continuity</h3><p>The architectural intent has to survive dimensions, openings, structure, service routes and site decisions as work progresses.</p></article>
     <article><span className="guideNumber">02</span><h3>Stage coordination</h3><p>Foundation, frame, masonry and roof stages depend on checks happening before the next trade closes the work.</p></article>
     <article><span className="guideNumber">03</span><h3>Progress evidence</h3><p>An ongoing site gives useful evidence of sequencing and coordination. It does not yet give evidence of completed finishes or long-term post-handover performance.</p></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Execution record</span>
    <h2>What has moved<br/><span>through the site sequence.</span></h2>
    <ol className="caseStageList">{stages.map(([no,h,p])=><li key={no}><span>{no}</span><div><h3>{h}</h3><p>{p}</p></div></li>)}</ol>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">What this page does not claim</span>
    <div className="caseBoundary">
     <h3>Ongoing construction is useful evidence, but it has a boundary.</h3>
     <p>This page does not present the project as a completed turnkey handover. Final finishes, commissioning, snag closure and post-handover performance should be assessed only after the project reaches those stages.</p>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Why this matters if you are choosing a construction team</span>
    <h2>Ask what the evidence<br/><span>actually proves.</span></h2>
    <div className="guideCards">
     <article><h3>Ask for the stage</h3><p>A current structural or masonry-stage site demonstrates different things from a finished house. The stage should be named before you compare.</p><Link href="/project-evidence">See our evidence labels →</Link></article>
     <article><h3>Ask for the role</h3><p>Architecture, supervision, project management and full construction are different responsibilities. Confirm which role the firm actually performed.</p><Link href="/process">See the Bind Builds process →</Link></article>
    </div>
   </section>

   <section className="guideClosing"><h2>Planning a home in Chennai?</h2><p>Use this project as evidence of process—not as a promise that every site will have the same conditions, sequence or outcome.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my project ↗</Link><Link className="productTextLink" href="/construction-company-chennai">How to compare construction companies →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Sunguvarchathiram multi-generational home',path),caseSchema,organizationSchema,founderPersonSchema]}/>
 </Page>;
}
