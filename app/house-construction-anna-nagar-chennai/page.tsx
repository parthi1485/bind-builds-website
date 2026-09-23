import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/house-construction-anna-nagar-chennai';
const title='House Construction Company in Anna Nagar, Padi & Koyambedu | Bind Builds';
const description='Architect-led house construction in Anna Nagar, Padi and Koyambedu Chennai for new homes, demolition and rebuild, coordinated design, engineering and site execution.';
export const metadata=pageMetadata(title,description,path);

const areas=['Anna Nagar','Padi','Koyambedu'];
const faqs=[
 ['Do you take independent house projects in Anna Nagar?','Yes, subject to project fit. We review the exact plot, existing building if any, access, family programme, approximate area, budget and timeline before confirming the next step.'],
 ['Can Bind Builds handle demolition and rebuild in Anna Nagar, Padi or Koyambedu?','Yes, where the project fits. Demolition, utility disconnection, neighbour protection and existing-condition risks are separated from the new construction scope.'],
 ['How do you price construction in these areas?','Published package rates are starting references. The final proposal depends on the confirmed built-up area, specification, access, demolition or external works, approvals and project-specific scope.'],
 ['Can I start with a site visit?','We first have a qualification conversation. When the project appears to fit our scope and current delivery capacity, we arrange the appropriate site or office meeting.'],
];

export default function AnnaNagar(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:areas.map(name=>({'@type':'Place',name:name+', Chennai'}))};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="ANNA NAGAR + PADI + KOYAMBEDU" title="House construction in established Chennai neighbourhoods.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>Anna Nagar + nearby</span></nav>
   <header className="guideIntro"><span className="productEyebrow">Anna Nagar · Padi · Koyambedu</span><h2>New home or rebuild.<br/><span>Start with the existing context.</span></h2><p>For established Chennai neighbourhoods, the surrounding buildings, street access, demolition conditions, family requirements, parking and approval constraints can matter as much as the plot area itself. Bind Builds coordinates the design and construction conversation around those real conditions.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my site ↗</Link><Link className="productTextLink" href="/demolition-rebuild-house-chennai">Planning a rebuild? Start here →</Link></div></header>
   <section className="guideSection"><span className="productEyebrow">Priority areas</span><h2>One cluster.<br/><span>Three site contexts.</span></h2><div className="serviceAreaGrid">{areas.map(area=><article key={area}><h3>{area}</h3><p>We review the exact street, plot dimensions, adjoining buildings, access, existing structure and proposed family programme before confirming the construction route.</p><Link href="/start-a-project">Check a {area} project →</Link></article>)}</div></section>
   <section className="guideSection"><span className="productEyebrow">Typical early decisions</span><h2>Make the difficult decisions<br/><span>before site work begins.</span></h2><div className="documentGrid">{[
    ['01','Retain or demolish','Understand the existing structure and whether the project is a rebuild, renovation or new construction before mixing scopes.'],
    ['02','Neighbour protection','Demolition, excavation and new structural work need a site-specific approach where neighbouring buildings sit close to the plot.'],
    ['03','Parking + family planning','Car parking, parents, multiple generations, rental floors and future flexibility should be solved in the brief, not improvised later.'],
    ['04','Material movement','Street width, unloading, storage and working hours influence logistics and can affect preliminaries.'],
    ['05','Approval route','Confirm the current property details and applicable authority before treating online rules or another plot as directly transferable.'],
    ['06','Written scope','Align drawings, brands, allowances, exclusions, payment stages and change-order rules before comparing totals.']
   ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div></section>
   <section className="guideSection guideFaq"><span className="productEyebrow">Anna Nagar + nearby FAQs</span><h2>Common questions before we begin.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
   <section className="guideClosing"><h2>Have a site in Anna Nagar, Padi or Koyambedu?</h2><p>Share the address, plot dimensions, existing-building status and what you want the new home to do differently.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Start my project brief ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I have a site in Anna Nagar / Padi / Koyambedu and would like to discuss construction.')} target="_blank" rel="noopener noreferrer">WhatsApp the site details ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in Anna Nagar, Padi and Koyambedu',path),serviceSchema,faqSchema]}/>
 </Page>;
}
