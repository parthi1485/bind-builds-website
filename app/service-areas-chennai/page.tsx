import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/service-areas-chennai';
const title='House Construction Service Areas in Chennai';
const description='See the Chennai areas where Bind Builds discusses architect-led house construction projects, plus the site factors we review before confirming fit, visits and scope.';
export const metadata=pageMetadata(title,description,path);

const zones=[
  ['South Chennai',['Pallikaranai','Medavakkam','Velachery','Perungudi','Sholinganallur','OMR corridor','Thoraipakkam','Tambaram and nearby areas']],
  ['West Chennai',['Porur','Valasaravakkam','Ramapuram','Manapakkam','Mogappair','Ambattur','Poonamallee','Iyyappanthangal']],
  ['Central & North Chennai',['Anna Nagar','Kilpauk','Arumbakkam','Ayanavaram','Kolathur','Perambur','Madhavaram','Tondiarpet and nearby areas']],
];

const faqs=[
 ['Do you take projects everywhere in Chennai?','We discuss projects across Chennai and nearby urban areas, but project fit depends on the site, access, project type, approximate construction value, timing and our current capacity. We confirm this during the qualification call.'],
 ['Can you visit my site before I decide?','Site visits are arranged after the initial qualification conversation when the project appears to fit our service area and scope. The purpose is to understand access, context, existing conditions and the next professional step.'],
 ['Does my locality change the construction package rate?','The published package rate is a starting base rate. Site access, soil, demolition, approval route, logistics and other location-specific conditions can create project-specific additions or exclusions.'],
 ['Can you work outside Greater Chennai?','Share the exact location first. We can review whether the travel, supervision model and project size make the engagement practical before committing to a site visit or proposal.'],
];

export default function ServiceAreasChennai(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:{'@type':'AdministrativeArea',name:'Chennai and surrounding urban areas'}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="CHENNAI / AREAS WE SERVE" title="House construction across Chennai.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Service areas in Chennai</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Project fit before promises</span>
    <h2>Your locality matters.<br/><span>So does the actual site.</span></h2>
    <p>Bind Builds discusses architect-led residential construction across Chennai and nearby urban areas. We do not treat a locality name as enough information: road access, plot size, existing buildings, approvals, soil, logistics and project value all affect whether the project is a practical fit.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Check my project fit ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I would like to check whether my location is within your construction service area.')} target="_blank" rel="noopener noreferrer">Ask about my locality ↗</a></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Common Chennai enquiry areas</span>
    <h2>South. West. Central.<br/><span>One qualification process.</span></h2>
    <p>These are examples of Chennai localities and corridors we may discuss, not a guarantee of automatic service coverage. Every project is qualified individually.</p>
    <div className="serviceAreaGrid">{zones.map(([name,areas])=><article key={name as string}><h3>{name}</h3><ul>{(areas as string[]).map(area=><li key={area}>{area}</li>)}</ul></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">What we check before confirming a site visit</span>
    <h2>The pin code is only<br/><span>the beginning.</span></h2>
    <div className="documentGrid">{[
      ['01','Road and material access','Street width, turning space, unloading, neighbour constraints and construction-vehicle access affect logistics.'],
      ['02','Plot and existing structure','Plot dimensions, orientation, setbacks, demolition needs and neighbouring buildings influence planning and execution.'],
      ['03','Approval jurisdiction','The applicable local body, planning route and current regulations need to be confirmed for the exact property.'],
      ['04','Ground and drainage context','Soil investigation, site levels, surrounding drainage and water conditions can affect foundations and external works.'],
      ['05','Project size and scope','The approximate built-up area, use, package level and additional items help us check commercial and operational fit.'],
      ['06','Timeline and decision readiness','Land ownership, family decisions, finance, desired start date and design readiness shape the next step.']
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Useful next steps by situation</span>
    <h2>Start with what you know.</h2>
    <div className="guideCards three">
      <article><h3>I know my plot location.</h3><p>Share the locality, plot dimensions, road width and approximate construction requirement.</p><Link href="/start-a-project">Prepare my project brief →</Link></article>
      <article><h3>I’m checking my budget.</h3><p>Build a floor-wise estimate using the published package rates and your selected allowances.</p><Link href="/cost-calculator">Use the construction calculator →</Link></article>
      <article><h3>I’m rebuilding an old house.</h3><p>Existing structure, demolition, services and neighbour conditions need their own review before new construction starts.</p><Link href="/demolition-rebuild-house-chennai">Read the demolition & rebuild guide →</Link></article>
    </div>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">Service area FAQs</span><h2>Before we schedule the site.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Tell us where the site is.</h2><p>Share the locality, plot dimensions, approximate built-up area and what you want to build.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check my project fit ↗</Link><Link className="productTextLink" href="/house-construction-chennai">Read the Chennai construction guide →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction service areas in Chennai',path),serviceSchema,faqSchema]}/>
 </Page>;
}
