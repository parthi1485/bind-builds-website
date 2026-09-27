import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema, founderPersonSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const path='/project-evidence';
const title='Projects | Bind Builds — Architect-Led Construction Chennai';
const description='Explore Bind Builds projects in Chennai: completed architecture, active residential construction and homes moving from planning to execution.';
export const metadata=pageMetadata(title,description,path);

const principles=[
 ['DESIGN / CONSULTANCY','Design work','Architecture or interior-design evidence shows design capability. It is not presented as a completed construction handover unless that role is separately established.'],
 ['SITE COORDINATION','Site role','Supervision, project management or site coordination is labelled for the responsibility actually performed.'],
 ['ONGOING','In progress','An active site can show drawings, organisation, workmanship and progress. It is still not a completed handover.'],
 ['COMPLETED','Completed construction','We use this label only when the construction scope has reached handover and the role is clear.']
];

export default function ProjectEvidence(){
 const pageSchema={'@context':'https://schema.org','@type':'CollectionPage',name:title,description,url:site.url+path,about:{'@id':site.url+'/#organization'},author:{'@id':site.url+'/#founder'},dateModified:'2026-09-25'};
 return <Page kicker="BIND BUILDS / PROJECTS" title="Designed with intent. Built with discipline.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Projects</span></nav>

   <header className="guideIntro">
    <p>Selected work across architecture, pre-construction and active execution. Each project shows where it stands, what we are responsible for and how the work is progressing.</p>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Selected projects</span>
    <h2>From design intent<br/><span>to built reality.</span></h2>
    <div className="evidenceGrid">
      <article className="evidenceCard evidenceCardFeatured">
        <img className="evidenceCardVisual" src="/projects/ccbm-commercial-complex.webp" alt="CCBM Commercial Complex in Maduravoyal — completed Studio Bind architectural design project sheet" loading="lazy"/>
        <div className="evidenceCardTop"><span className="evidenceStatus evidenceStatusCompleted">Completed · Architecture</span><span className="evidenceMeta">Maduravoyal<br/>Chennai</span></div>
        <h3>CCBM Commercial Complex</h3>
        <p>A commercial complex designed by Studio Bind Architects around flexible, floor-wise planning for independent business occupancy. A completed project that reflects the architectural thinking behind the Bind practice.</p>
        <ul className="evidenceFacts">
          <li><strong>Site area</strong><span>4,000 sq.ft.</span></li>
          <li><strong>Built-up</strong><span>12,494 sq.ft.</span></li>
          <li><strong>Configuration</strong><span>Basement + 3.5 floors</span></li>
          <li><strong>Role</strong><span>Studio Bind Architects — Architectural Design</span></li>
          <li><strong>Status</strong><span>Completed project</span></li>
          
        </ul>
        <Link className="productTextLink" href="/projects/ccbm-commercial-complex">View project →</Link>
      </article>

      <article className="evidenceCard">
        <div className="evidenceCardTop"><span className="evidenceStatus">Under construction</span><span className="evidenceMeta">Sunguvarchathiram<br/>Chennai region</span></div>
        <h3>SK’s Multi-Generational Home</h3>
        <p>A multi-generational residence progressing through construction, with architecture, detailing and site execution coordinated as one continuous process.</p>
        <ul className="evidenceFacts">
          <li><strong>Scale</strong><span>6,519 sq.ft.</span></li>
          <li><strong>Type</strong><span>Multi-generational residence</span></li>
          <li><strong>Role</strong><span>Architecture + construction / site execution in progress</span></li>
          <li><strong>Status</strong><span>Under construction</span></li>
          <li><strong>Focus</strong><span>Design coordination, site execution and stage-wise quality control</span></li>
        </ul>
        <Link className="productTextLink" href="/projects/sunguvarchathiram-multigenerational-home">View project →</Link>
      </article>

      <article className="evidenceCard">
        <div className="evidenceCardTop"><span className="evidenceStatus">In planning</span><span className="evidenceMeta">Pallikaranai<br/>Chennai</span></div>
        <h3>Family Residence — Bind Builds</h3>
        <p>A Bind Builds family residence moving through design development and pre-construction coordination before site execution begins.</p>
        <ul className="evidenceFacts">
          <li><strong>Type</strong><span>Family residence</span></li>
          <li><strong>Stage</strong><span>Schematic design + design development</span></li>
          <li><strong>Next</strong><span>Agreement, approvals, structural/GFC coordination, then construction commencement</span></li>
          <li><strong>Status</strong><span>Pre-construction</span></li>
        </ul>
        <Link className="productTextLink" href="/projects/pallikaranai-family-home">View project →</Link>
      </article>

      <article className="evidenceCard">
        <div className="evidenceCardTop"><span className="evidenceStatus">Design practice</span><span className="evidenceMeta">2019 → 2026<br/>Studio Bind Architects</span></div>
        <h3>Architecture + interiors across sectors</h3>
        <p>Studio Bind Architects has worked across residential, healthcare, hospitality, retail, workplace and commercial projects since 2019. That design foundation now informs the architect-led construction approach at Bind Builds.</p>
        <ul className="evidenceFacts">
          <li><strong>Practice</strong><span>Studio Bind Architects</span></li>
          <li><strong>Since</strong><span>2019</span></li>
          <li><strong>Work</strong><span>Architecture, interiors and site coordination</span></li>
          
        </ul>
        <a className="productTextLink" href={site.studio} target="_blank" rel="noopener noreferrer">Visit Studio Bind Architects ↗</a>
      </article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Project stages</span>
    <h2>Know where<br/><span>every project stands.</span></h2>
    <div className="evidencePrinciples">{principles.map(([status,h,p])=><article key={status}><span>{status}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Clarity by default</span>
    <h2>Clear roles.<br/><span>Clear project stages.</span></h2>
    <div className="evidencePolicy">
      <h3>Every project should be easy to understand.</h3>
      <ul>
        <li>Ongoing sites are shown as work in progress.</li>
        <li>Architecture, interiors and construction roles are identified separately.</li>
        <li>Site visits are arranged where client permission, safety and project stage allow.</li>
        <li>Project information is updated as the work progresses.</li>
        <li>Completed work is identified only after the relevant scope reaches completion.</li>
      </ul>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Go deeper</span>
    <h2>Look beyond<br/><span>the finished photograph.</span></h2>
    <div className="guideCards three">
      <article><h3>Explore the design thinking</h3><p>Review planning logic, drawings and how each design responds to users, climate and site constraints.</p><a href={site.portfolio} target="_blank" rel="noopener noreferrer">Explore the design portfolio ↗</a></article>
      <article><h3>See how we build</h3><p>Follow active construction, stage-wise checks and the coordination that turns drawings into site decisions.</p><Link href="/faq">Read confidence FAQs →</Link></article>
      <article><h3>Understand the scope</h3><p>Compare specifications, inclusions, exclusions, area basis and process before discussing your project-specific proposal.</p><Link href="/packages">Compare package scope →</Link></article>
    </div>
   </section>

   <section className="guideClosing"><h2>Your home deserves the same discipline.</h2><p>Start with your site, priorities and budget. We’ll connect the right design, planning and construction process around them.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my project ↗</Link><Link className="productTextLink" href="/construction-company-chennai">Compare construction-company criteria →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Projects',path),pageSchema,founderPersonSchema]}/>
 </Page>;
}
