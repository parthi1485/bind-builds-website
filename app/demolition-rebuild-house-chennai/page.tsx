import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/demolition-rebuild-house-chennai';
const title='Old House Demolition & Rebuild in Chennai';
const description='Planning to demolish and rebuild an old house in Chennai? Understand site review, demolition scope, approvals, neighbour safety, soil investigation, design and construction sequencing.';
export const metadata=pageMetadata(title,description,path);

const faqs=[
 ['Is demolition included in the normal construction square-foot rate?','No. Existing-building demolition is treated as a separate project-specific scope because volume, access, disposal, salvage, utilities and neighbour conditions vary.'],
 ['Should the new house be designed before demolition?','The new project should be developed far enough to confirm the intended layout, approximate built-up area and construction direction before the demolition sequence is finalised. The exact order depends on the site, approvals and investigations required.'],
 ['What happens to electricity, water and other existing services?','Existing connections and services need to be identified and safely isolated, protected, shifted or managed as applicable before demolition begins. The responsible parties should be clear in the demolition scope.'],
 ['Can materials from the old house be reused?','Potential salvage items can be identified before demolition, but reuse depends on condition, dimensions, safety, design compatibility and storage. Do not assume structural materials are reusable without professional assessment.'],
 ['When is soil investigation done for a rebuild project?','The investigation strategy depends on access and the existing building. Where practical, the team coordinates the appropriate timing so the structural consultant receives reliable information for the new foundation design.']
];

export default function DemolitionRebuildChennai(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Demolition and house rebuild planning',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:{'@type':'City',name:'Chennai'}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="CHENNAI / DEMOLITION + REBUILD" title="Old house demolition and rebuild in Chennai.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Demolition and rebuild in Chennai</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Existing house. New chapter.</span>
    <h2>Rebuilding starts<br/><span>before demolition day.</span></h2>
    <p>An old-house rebuild is not simply “demolish first, design later.” The existing structure, neighbours, utility connections, access, salvage, approval path, new floor area and structural strategy need to be understood as one coordinated project.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project?type=Demolition%20%26%20rebuild">Discuss my rebuild ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I am planning to demolish and rebuild an existing house in Chennai.')} target="_blank" rel="noopener noreferrer">Talk about my existing house ↗</a></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Before demolition</span>
    <h2>Document what exists.<br/><span>Decide what comes next.</span></h2>
    <div className="documentGrid">{[
      ['01','Existing building and neighbours','Record the structure, shared walls or close boundaries, visible distress, access and neighbouring conditions.'],
      ['02','Ownership and approvals','Review the available property documents, previous approvals and the route required for demolition and the new proposal.'],
      ['03','Utilities and services','Identify electricity, water, drainage, borewell, septic, overhead tanks and other services that may need isolation or protection.'],
      ['04','Salvage decisions','Decide what, if anything, is to be retained before labour and machinery begin dismantling.'],
      ['05','New design direction','Confirm the family brief, approximate floor area, parking and future needs so the rebuild has a defined target.'],
      ['06','Demolition scope and safety','Agree who handles barricading, debris removal, machinery, manual dismantling, neighbour protection and site clearance.']
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">A coordinated rebuild sequence</span>
    <h2>Old structure out.<br/><span>New information in.</span></h2>
    <ol className="approvalSteps">{[
      ['01','Brief + measured review','Understand the users, site and existing conditions.'],
      ['02','New design direction','Develop and freeze the proposed floor plan and facade direction.'],
      ['03','Agreement + demolition scope','Confirm construction intent, commercial scope and the separate demolition responsibilities.'],
      ['04','Demolition + investigation','Clear the existing structure safely and coordinate soil/structural inputs at the appropriate stage.'],
      ['05','Approvals + GFC + build','Complete the applicable approval and coordinated construction drawings before execution proceeds.']
    ].map(([n,h,p])=><li key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></li>)}</ol>
    <div className="guideActions"><Link href="/process" className="productTextLink">See the Bind Builds pre-construction process →</Link><Link href="/building-plan-approval-chennai" className="productTextLink">Review the Chennai approval guide →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Budgeting a rebuild</span>
    <h2>Separate the old-house cost<br/><span>from the new-house cost.</span></h2>
    <div className="guideCards three">
      <article><h3>Demolition</h3><p>Price dismantling, machinery, labour, debris removal, protection and salvage as its own scope.</p></article>
      <article><h3>New construction</h3><p>Use the confirmed new built-up area and selected package specification as the starting construction basis.</p><Link href="/construction-cost-chennai">See Chennai construction costs →</Link></article>
      <article><h3>Project-specific extras</h3><p>Approvals, unusual foundations, external works, utility changes and other additions should remain visible.</p><Link href="/cost-calculator">Build a planning estimate →</Link></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Neighbour and site protection</span>
    <h2>Demolition is construction work too.</h2>
    <p>The exact safety method must suit the site and contractor’s demolition plan. Close boundaries, shared walls, overhead cables, narrow streets and occupied neighbouring buildings need more care than an open isolated plot.</p>
    <div className="guideNote"><strong>Do not treat demolition as an informal pre-step.</strong><p>The scope, access, debris movement, utility isolation, protection measures and responsibilities should be agreed before work begins.</p></div>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">Demolition & rebuild FAQs</span><h2>Questions before the old house comes down.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Start with the existing house.</h2><p>Send the location, plot dimensions, approximate existing building size and what you want the new home to become.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project?type=Demolition%20%26%20rebuild">Prepare my rebuild brief ↗</Link><Link className="productTextLink" href="/service-areas-chennai">Check Chennai service areas →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Demolition and rebuild in Chennai',path),serviceSchema,faqSchema]}/>
 </Page>;
}
