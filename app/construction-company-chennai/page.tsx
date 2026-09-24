import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { packages, site, whatsappUrl } from '@/lib/site';
import { money } from '@/lib/calculator';
import PriorityAreaLinks from '@/components/PriorityAreaLinks';

const path='/construction-company-chennai';
const title='Construction Company in Chennai | Architect-Led Home Construction';
const description='Compare what matters when choosing a construction company in Chennai. See Bind Builds packages from ₹2,399/sq.ft, architect-led process, scope clarity, approvals and site coordination.';
export const metadata=pageMetadata(title,description,path);

const faqs=[
 ['Is Bind Builds a construction company or an architecture firm?','Bind Builds is an architect-led construction studio for Chennai projects. It brings architecture, engineering coordination and construction execution into one project route. Studio Bind Architects is the design practice behind the construction approach.'],
 ['What should I compare between construction companies in Chennai?','Compare the area basis, detailed specification, design and engineering responsibility, site supervision, exclusions, change process, payment milestones, approval scope and the evidence shown for completed or ongoing work. A headline square-foot rate alone is not enough.'],
 ['How much does Bind Builds charge per square foot?','Bind Builds currently publishes three starting base construction packages: Essential, Elevate and Signature. The final project price depends on the confirmed built-up area, site, structure, specification, exclusions and additional work.'],
 ['Do you handle building-plan approvals in Chennai?','The approval route is coordinated as part of pre-construction planning, while authority charges and the professional approval scope remain visible rather than being assumed inside the base construction rate.'],
 ['Can I compare your package before speaking to the team?','Yes. The package specifications, Chennai cost guide and construction calculator are available on the website before you submit a project enquiry.']
];

export default function ConstructionCompanyChennai(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:'Architect-led construction company in Chennai',description,serviceType:'Residential construction and architect-led home building',url:site.url+path,provider:{'@id':site.url+'/#localbusiness'},areaServed:{'@type':'City',name:'Chennai'}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="CHENNAI / CONSTRUCTION COMPANY" title="Construction company in Chennai. Architect-led from plan to site.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Construction company in Chennai</span></nav>

   <header className="guideIntro">
    <span className="productEyebrow">Compare the process, not only the price</span>
    <h2>A construction company should make<br/><span>hundreds of decisions easier to understand.</span></h2>
    <p>If you are comparing construction companies in Chennai, start beyond the headline square-foot rate. Ask how the floor area is measured, who owns the design and engineering decisions, what the specification includes, how site work is supervised, how changes are recorded and what remains outside the base price.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my construction project ↗</Link><Link className="productTextLink" href="/cost-calculator">Calculate my construction budget →</Link></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Before choosing a construction company in Chennai</span>
    <h2>Six things worth<br/><span>comparing line by line.</span></h2>
    <div className="documentGrid">{[
      ['01','Area basis','Confirm exactly which covered areas are multiplied by the square-foot rate, and how parking, headroom, balconies, terraces and open areas are treated.'],
      ['02','Specification','Compare actual material brands, finish allowances, quantities, exclusions and upgrade rules instead of comparing only package names.'],
      ['03','Design + engineering ownership','Know who prepares and coordinates architectural, structural, electrical and plumbing information before site execution.'],
      ['04','Site supervision + quality process','Ask who visits the site, what gets checked at each stage, how progress is documented and who closes technical decisions.'],
      ['05','Changes + exclusions','Understand how client changes, site surprises, authority requirements and work outside the package are priced and approved.'],
      ['06','Evidence + role clarity','When you review a project, check whether it is completed construction, ongoing construction, design work or site coordination, and what role the company actually performed.']
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">The Bind Builds model</span>
    <h2>Architecture first.<br/><span>Construction connected to it.</span></h2>
    <div className="guideCards three">{[
      ['One coordinated route','Architecture, engineering coordination and construction are treated as connected project decisions rather than separate hand-offs.'],
      ['Scope before execution','The package specification, exclusions, project-specific additions and payment stages are discussed before they become site disputes.'],
      ['Progress with context','Site documentation and professional review are tied back to the issued drawings, selected specification and agreed construction scope.']
    ].map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
    <div className="guideActions"><Link className="productTextLink" href="/project-evidence">Review project evidence →</Link><Link className="productTextLink" href="/process">See the complete process →</Link><Link className="productTextLink" href="/about">Meet the practice behind Bind Builds →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">House construction packages in Chennai</span>
    <h2>A rate is useful<br/><span>when the specification is visible.</span></h2>
    <div className="serviceRates">{packages.map(item=><article key={item.key}><h3>{item.name}</h3><strong>{money(item.rate)}<small> / sq.ft*</small></strong><p>{item.description}</p><Link href={'/packages#'+item.key}>Read the {item.name} specification →</Link></article>)}</div>
    <p className="guideSmall">*Published starting base construction rates. Final area, structure, site conditions, taxes, approvals, additional items and exclusions are confirmed in the project-specific proposal and agreement.</p>
    <div className="guideActions"><Link href="/construction-cost-chennai" className="productTextLink">Read the Chennai construction cost guide →</Link><Link href="/packages" className="productTextLink">Compare all package specifications →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">A coordinated pre-construction route</span>
    <h2>More decisions before<br/><span>the first major site commitment.</span></h2>
    <ol className="approvalSteps">{[
      ['01','Qualification + site context','Start with the location, plot, users, approximate area, budget and timeline.'],
      ['02','Budget + engagement','Review the preliminary construction direction and agree the professional next step.'],
      ['03','Architecture + 3D direction','Develop, review and confirm the floor plan and facade direction for the project.'],
      ['04','Engineering + approvals','Coordinate soil, structure, MEP information and the applicable approval process.'],
      ['05','GFC + construction','Issue coordinated construction information and execute against the agreed scope and specification.']
    ].map(([n,h,p])=><li key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></li>)}</ol>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Chennai-specific checks</span>
    <h2>The city is one market.<br/><span>Every site is still different.</span></h2>
    <p>Road width and unloading access, existing neighbouring buildings, soil and drainage conditions, demolition, local approval jurisdiction and the intended number of floors can all change the project route. That is why a Chennai construction quotation should eventually become site- and design-specific.</p>
    <div className="guideActions"><Link className="productTextLink" href="/individual-house-construction-chennai">Individual house construction →</Link><Link className="productTextLink" href="/service-areas-chennai">Check Chennai service areas →</Link><Link className="productTextLink" href="/building-plan-approval-chennai">Understand building-plan approvals →</Link><Link className="productTextLink" href="/demolition-rebuild-house-chennai">Planning a demolition + rebuild? →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Priority construction areas</span>
    <h2>Local search should lead<br/><span>to useful site context.</span></h2>
    <p>We prioritise residential enquiries across our Ramapuram / Porur / Valasaravakkam base cluster, the wider West Chennai growth belt, Anna Nagar and nearby areas, OMR–ECR, and selected Coimbatore projects. Each location still begins with the exact plot, access, scope and delivery fit.</p>
    <PriorityAreaLinks/>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">If you are comparing quotations</span>
    <h2>Put the same questions<br/><span>in front of every company.</span></h2>
    <div className="guideCards three">
      <article><h3>What is measured?</h3><p>Ask for the precise area basis and a floor-wise area statement before comparing total values.</p></article>
      <article><h3>What is specified?</h3><p>Match structural, flooring, plumbing, electrical, doors, windows, finishes and excluded work on the same sheet.</p></article>
      <article><h3>What happens when something changes?</h3><p>Ask who documents the decision, updates drawings, prices the change and authorises work before execution.</p></article>
    </div>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">Construction company FAQs</span><h2>Questions worth asking before you appoint.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Compare us on the details.</h2><p>Bring your plot location, approximate area, family requirements and budget. We’ll help you identify the next useful decision.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Prepare my project brief ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I am comparing construction companies in Chennai and would like to discuss my project.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Construction company in Chennai',path),serviceSchema,faqSchema]}/>
 </Page>;
}
