import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { packages, site, whatsappUrl } from '@/lib/site';
import { money } from '@/lib/calculator';

const path='/turnkey-house-construction-chennai';
const title='Turnkey House Construction in Chennai';
const description='Architect-led turnkey house construction in Chennai by Bind Builds. Understand the coordinated design-to-handover process, package scope, exclusions and next steps.';
export const metadata=pageMetadata(title,description,path);

const faqs=[
 ['What does turnkey house construction mean at Bind Builds?','It means one coordinated construction engagement connects design development, engineering, agreed procurement and site execution through handover. The signed proposal and agreement define the exact inclusions, exclusions and responsibilities for your project.'],
 ['Do your turnkey packages include architectural design?','Architectural planning and design are part of the coordinated Bind Builds process, with the applicable design scope confirmed in the engagement and package documents. Project-specific design begins after the agreed paid engagement.'],
 ['Are approvals included in the package rate?','The published square-foot packages exclude statutory approval charges. Approval drawings, professional scope and authority fees are handled as separate confirmed items unless the project proposal states otherwise.'],
 ['Can I use my own drawings?','Yes, we can review existing architectural, structural and services drawings. Any checking, redesign or additional coordination required is agreed before construction pricing is finalised.'],
 ['How do I get a turnkey proposal?','Start with your plot location, approximate floor areas, requirements and budget. We review project fit, discuss the site and then prepare the appropriate design and construction path.']
];

export default function TurnkeyHouseConstruction(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Turnkey house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:{'@type':'City',name:'Chennai'}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="CHENNAI / TURNKEY HOME CONSTRUCTION" title="Turnkey house construction in Chennai.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Turnkey house construction in Chennai</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Architecture. Engineering. Construction.</span>
    <h2>One coordinated path.<br/><span>From brief to build.</span></h2>
    <p>Bind Builds is an architect-led construction studio for Chennai homes. The aim is not simply to combine vendors under one label, but to connect the decisions: your requirements, the floor plan, engineering, specification, approvals and site execution.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my turnkey project ↗</Link><Link className="productTextLink" href="/process">See the full construction process →</Link></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">What turnkey means here</span>
    <h2>Fewer hand-offs.<br/><span>Clearer responsibility.</span></h2>
    <div className="guideCards three">{[
      ['Design first','The home is planned around your family, site and budget before the execution scope is frozen.'],
      ['Coordinate the disciplines','Architecture, structural inputs and building services are developed toward one agreed construction drawing set.'],
      ['Execute the agreed scope','Procurement, labour, supervision, progress documentation and site coordination follow the signed specification and agreement.']
    ].map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">The coordinated journey</span>
    <h2>Before the first brick,<br/><span>there are decisions to finish.</span></h2>
    <ol className="approvalSteps">{[
      ['01','Brief + site','Understand the users, plot, budget and project constraints.'],
      ['02','Design','Develop and sign off the floor plan and facade direction.'],
      ['03','Engineering + approvals','Coordinate soil, structure, approval drawings and building services.'],
      ['04','Agreement + GFC','Confirm the built-up area, scope, specifications and construction drawing set.'],
      ['05','Construction + handover','Execute, document progress, manage decisions and complete the agreed handover.']
    ].map(([n,h,p])=><li key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></li>)}</ol>
    <Link href="/process" className="productTextLink">See every pre-construction milestone →</Link>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Starting construction packages</span>
    <h2>Choose the specification.<br/><span>Then confirm the scope.</span></h2>
    <div className="serviceRates">{packages.map(item=><article key={item.key}><h3>{item.name}</h3><strong>{money(item.rate)}<small> / sq.ft*</small></strong><p>{item.description}</p><Link href={'/packages#'+item.key}>View complete specification →</Link></article>)}</div>
    <p className="guideSmall">*Published starting base construction rate. Final pricing follows the confirmed design, built-up area, site conditions, package specification, taxes, exclusions and additional items.</p>
    <div className="guideActions"><Link href="/construction-cost-chennai" className="productTextLink">Understand Chennai construction costs →</Link><Link href="/cost-calculator" className="productTextLink">Build a planning estimate →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Scope clarity</span>
    <h2>Turnkey does not mean<br/><span>every possible item is hidden inside one rate.</span></h2>
    <p>We prefer visible boundaries. Your proposal identifies what the package covers and what remains separate, so optional or site-specific work can be decided consciously.</p>
    <div className="documentGrid">{[
      ['01','Inside the agreed construction package','The applicable architecture, structural work, civil construction, selected finishes, electrical, plumbing, supervision and documentation stated in your package and agreement.'],
      ['02','Project-specific additions','Separately measured headroom, compound wall, main gate, sump, septic tank, additional overhead storage, solar, lift and other extras can be added as priced allowances or quotations. Car parking, when selected in the estimator, is treated inside the base-construction calculation rather than as an additional-item allowance.'],
      ['03','Approvals and statutory fees','Authority charges and professional approval scope are kept visible instead of assumed inside the base rate.'],
      ['04','Existing conditions','Demolition, unusual access, dewatering, special foundation requirements or other site-specific work is confirmed after the site and design are understood.']
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Why architect-led construction</span>
    <h2>The architect is not<br/><span>an extra layer between you and the site.</span></h2>
    <div className="guideCards three">{[
      ['Design decisions stay connected','The planning intent can be checked against structure, services, materials and execution decisions as the project develops.'],
      ['Changes have context','When a site condition or client decision changes, the team can review the effect on space, drawings, cost and sequence together.'],
      ['The specification has a purpose','Materials are not just a shopping list. Allowances and selections are connected to the agreed design and performance requirements.']
    ].map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
    <Link href="/about" className="productTextLink">Meet the practice behind Bind Builds →</Link>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">Turnkey construction FAQs</span><h2>Before you choose the model.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Bring the plot. Bring the questions.</h2><p>We’ll start with your location, family requirements, approximate area and budget.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Prepare my project brief ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I would like to discuss turnkey house construction in Chennai.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Turnkey house construction in Chennai',path),serviceSchema,faqSchema]}/>
 </Page>;
}
