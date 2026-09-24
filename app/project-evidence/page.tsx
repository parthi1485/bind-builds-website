import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema, founderPersonSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const path='/project-evidence';
const title='Project Evidence & Construction Track Record in Chennai';
const description='Review how Bind Builds labels design experience, ongoing construction, pre-construction and completed work. See current project evidence and the Studio Bind Architects practice behind the construction studio.';
export const metadata=pageMetadata(title,description,path);

const principles=[
 ['DESIGN / CONSULTANCY','Design work','Architecture or interior-design evidence shows design capability. It is not presented as a completed construction handover unless that role is separately established.'],
 ['SITE COORDINATION','Site role','Supervision, project management or site coordination is labelled for the responsibility actually performed.'],
 ['ONGOING','In progress','An active site can show drawings, organisation, workmanship and progress. It is still not a completed handover.'],
 ['COMPLETED','Completed construction','We use this label only when the construction scope has reached handover and the role is clear.']
];

export default function ProjectEvidence(){
 const pageSchema={'@context':'https://schema.org','@type':'CollectionPage',name:title,description,url:site.url+path,about:{'@id':site.url+'/#organization'},author:{'@id':site.url+'/#founder'},dateModified:'2026-09-24'};
 return <Page kicker="AUTHORITY / PROJECT EVIDENCE" title="Proof should come with context.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Project evidence</span></nav>

   <header className="guideIntro">
    <span className="productEyebrow">Role. Stage. Evidence.</span>
    <h2>We would rather label the work clearly<br/><span>than make a bigger claim.</span></h2>
    <p>Bind Builds is the construction chapter of a practice that began with Studio Bind Architects in 2019. Because design experience, site coordination, ongoing construction and completed construction are different kinds of evidence, we separate them instead of presenting every project image as the same thing.</p>
    <div className="guideActions"><a className="cta primary" href={site.portfolio} target="_blank" rel="noopener noreferrer">Explore the design portfolio ↗</a><Link className="productTextLink" href="/about">Understand Studio Bind → Bind Builds →</Link></div>
    <div className="evidenceUpdated"><span>Evidence framework updated: 24 September 2026</span><span>Founder: Ar. Parthiban Moorthy</span><span>Chennai</span></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">How we label evidence</span>
    <h2>Four labels.<br/><span>No blurred categories.</span></h2>
    <div className="evidencePrinciples">{principles.map(([status,h,p])=><article key={status}><span>{status}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Current evidence</span>
    <h2>What we can show<br/><span>without overstating the stage.</span></h2>
    <div className="evidenceGrid">
      <article className="evidenceCard">
        <div className="evidenceCardTop"><span className="evidenceStatus">Ongoing residential work</span><span className="evidenceMeta">Sunguvarchathiram<br/>Chennai region</span></div>
        <h3>SK’s Multi-Generational Home</h3>
        <p>An ongoing residential project from the Studio Bind Architects practice, shown as work in progress rather than as a completed Bind Builds handover.</p>
        <ul className="evidenceFacts">
          <li><strong>Scale</strong><span>6,519 sq.ft.</span></li>
          <li><strong>Type</strong><span>Multi-generational residence</span></li>
          <li><strong>Role</strong><span>Architecture + construction / site execution in progress</span></li>
          <li><strong>Status</strong><span>Ongoing — not a completed handover</span></li>
          <li><strong>Documentation</strong><span>52-page internal construction-documentation set verified for the project</span></li>
        </ul>
        <Link className="productTextLink" href="/projects/sunguvarchathiram-multigenerational-home">Open ongoing project case study →</Link>
      </article>

      <article className="evidenceCard">
        <div className="evidenceCardTop"><span className="evidenceStatus">Pre-construction</span><span className="evidenceMeta">Pallikaranai<br/>Chennai</span></div>
        <h3>Family Residence — Bind Builds</h3>
        <p>A current Bind Builds residential project in the planning and coordination stage. It is presented as pre-construction evidence, not as completed construction.</p>
        <ul className="evidenceFacts">
          <li><strong>Type</strong><span>Family residence</span></li>
          <li><strong>Stage</strong><span>Schematic design + design development</span></li>
          <li><strong>Next</strong><span>Agreement, approvals, structural/GFC coordination, then construction commencement</span></li>
          <li><strong>Status</strong><span>Pre-construction — not yet a handover</span></li>
        </ul>
        <Link className="productTextLink" href="/projects/pallikaranai-family-home">Open pre-construction case study →</Link>
      </article>

      <article className="evidenceCard">
        <div className="evidenceCardTop"><span className="evidenceStatus">Practice experience</span><span className="evidenceMeta">2019 → 2026<br/>Studio Bind Architects</span></div>
        <h3>Architecture + interiors across sectors</h3>
        <p>The design practice has experience across residential, healthcare, hospitality, retail, offices and commercial spaces. We treat this as professional design/practice experience rather than automatically calling it Bind Builds construction history.</p>
        <ul className="evidenceFacts">
          <li><strong>Practice</strong><span>Studio Bind Architects</span></li>
          <li><strong>Since</strong><span>2019</span></li>
          <li><strong>Evidence</strong><span>Architecture, interiors and site-related professional work</span></li>
          <li><strong>Boundary</strong><span>Not equivalent to completed Bind Builds turnkey handovers</span></li>
        </ul>
        <a className="productTextLink" href={site.studio} target="_blank" rel="noopener noreferrer">Visit Studio Bind Architects ↗</a>
      </article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Our evidence policy</span>
    <h2>What we will not<br/><span>turn into a marketing shortcut.</span></h2>
    <div className="evidencePolicy">
      <h3>Trust grows when the role behind the image is visible.</h3>
      <ul>
        <li>We do not label an ongoing site as a completed project.</li>
        <li>We do not treat architecture/interior work as construction history without stating the actual role.</li>
        <li>We do not promise a site visit when client permission, safety or scheduling does not allow it.</li>
        <li>We do not publish a testimonial or review unless it comes from a real client source we can stand behind.</li>
        <li>We update this page as projects move from pre-construction to execution and, later, handover.</li>
      </ul>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">How to assess us</span>
    <h2>Ask for the evidence<br/><span>relevant to your decision.</span></h2>
    <div className="guideCards three">
      <article><h3>If design matters most</h3><p>Review the Studio Bind portfolio, planning logic, drawings and how the design responds to real users and site constraints.</p><a href={site.portfolio} target="_blank" rel="noopener noreferrer">Explore the design portfolio ↗</a></article>
      <article><h3>If site execution matters most</h3><p>Ask what can be shown from an ongoing site, what stage it is at and what professional role Bind/Studio Bind has on that project.</p><Link href="/faq">Read confidence FAQs →</Link></article>
      <article><h3>If you are ready to appoint</h3><p>Compare the package specification, exclusions, area basis, process and project-specific proposal before making the decision.</p><Link href="/packages">Compare package scope →</Link></article>
    </div>
   </section>

   <section className="guideClosing"><h2>Bring your questions, not blind trust.</h2><p>We’ll show the stage, role and scope as clearly as we can, then connect that evidence to your own project.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my project ↗</Link><Link className="productTextLink" href="/construction-company-chennai">Compare construction-company criteria →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Project evidence',path),pageSchema,founderPersonSchema]}/>
 </Page>;
}
