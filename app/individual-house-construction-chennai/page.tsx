import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { packages, site, whatsappUrl } from '@/lib/site';
import { money } from '@/lib/calculator';

const path='/individual-house-construction-chennai';
const title='Individual House Construction in Chennai';
const description='Architect-led individual house construction in Chennai for owner-built homes, rebuilds and family residences. Compare packages, cost, process and priority service areas.';
export const metadata=pageMetadata(title,description,path);

const faqs=[
 ['What do you mean by individual house construction?','We mean a residential home built for an owner or family on their own plot, rather than a mass-housing or apartment development. The exact project can be a new independent home, a multi-generation residence or a demolition-and-rebuild.'],
 ['How much does individual house construction cost in Chennai?','Our published package rates are starting references for base construction. The final project value depends on the confirmed built-up area, design, structure, specification, site access, external works, approvals and exclusions.'],
 ['Can Bind Builds design the house as well as construct it?','Yes. Bind Builds follows an architect-led route in which architecture, engineering coordination and construction scope are developed as connected decisions. Project-specific design begins after the agreed professional engagement.'],
 ['Do you undertake G+1 or multi-generation family homes?','We discuss multi-level and multi-generation residential projects subject to the exact plot, applicable approvals, structural requirements, family brief, budget and project fit.'],
 ['Which Chennai areas do you prioritise?','Priority enquiries include Ramapuram, Valasaravakkam, Porur, Virugambakkam, Vadapalani, Saligramam, Gerugambakkam, Mangadu, Kundrathur, Kolapakkam, Anna Nagar, Padi, Koyambedu, Maduravoyal, Vanagaram, Kattupakkam, Poonamallee, OMR and ECR.']
];

export default function IndividualHouseConstructionChennai(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Individual and independent house construction',url:site.url+path,provider:{'@id':site.url+'/#localbusiness'},areaServed:{'@type':'City',name:'Chennai'}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="CHENNAI / INDIVIDUAL HOUSE CONSTRUCTION" title="Individual house construction in Chennai.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Individual house construction in Chennai</span></nav>

   <header className="guideIntro">
    <span className="productEyebrow">Your plot · Your family · One coordinated build</span>
    <h2>Start with the home.<br/><span>Not only the square-foot rate.</span></h2>
    <p>Individual house construction is personal by definition. The plan needs to work for your family, the structure needs to suit the site, and the written construction scope needs to stay clear from design through handover. Bind Builds connects those decisions through an architect-led process.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my house project ↗</Link><Link className="productTextLink" href="/cost-calculator">Calculate my construction budget →</Link></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Before the first major commitment</span>
    <h2>Seven decisions that shape<br/><span>an independent home.</span></h2>
    <div className="documentGrid">{[
     ['01','Family brief','Bedrooms, parents, children, guests, work, pets, privacy and future needs should be understood before the floor plan is frozen.'],
     ['02','Plot + parking','Plot dimensions, orientation, access, setbacks, car parking and neighbouring buildings influence the usable plan from day one.'],
     ['03','Area + budget','A realistic built-up area and specification level make the budget discussion useful before design expands beyond the intended spend.'],
     ['04','Soil + structure','Foundation and structural assumptions should follow the actual site, soil information and the intended building rather than a generic template.'],
     ['05','Approvals','The exact property and applicable approval route need to be checked before a floor count or buildable area is treated as final.'],
     ['06','Specification','Brands, finish allowances, services, external works and exclusions should be visible in writing before site execution.'],
     ['07','Supervision + changes','Know who reviews the site, how progress is documented and how design or scope changes are approved before work proceeds.'],
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Individual house construction cost</span>
    <h2>Same area.<br/><span>Different specification.</span></h2>
    <p>Use the published package rates as an early planning reference. A project-specific proposal then confirms the actual area basis, structural requirements, selected specification and site-specific additions.</p>
    <div className="serviceRates">{packages.map(item=><article key={item.key}><h3>{item.name}</h3><strong>{money(item.rate)}<small> / sq.ft*</small></strong><p>{item.description}</p><Link href={'/packages#'+item.key}>Review {item.name} →</Link></article>)}</div>
    <div className="constructionExample"><div><span className="productEyebrow">Illustrative base construction</span><h3>2,000 sq.ft.<br/>Planning comparison.</h3><p>Area × published package rate.</p></div><dl>{packages.map(item=><div key={item.key}><dt>{item.name}</dt><dd>{money(2000*item.rate)}</dd></div>)}</dl></div>
    <p className="guideSmall">*Starting base rates only. Land, taxes, authority charges, site-specific work, external works and items outside the selected specification are not automatically included.</p>
    <div className="guideActions"><Link className="productTextLink" href="/construction-cost-chennai">Read the Chennai cost guide →</Link><Link className="productTextLink" href="/packages">Compare full package specifications →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Common individual-home scenarios</span>
    <h2>Different families.<br/><span>Different planning priorities.</span></h2>
    <div className="guideCards three">
     <article><h3>Single-family home</h3><p>Focus on everyday circulation, privacy, light, ventilation, parking, storage and long-term flexibility before styling decisions take over.</p></article>
     <article><h3>Multi-generation home</h3><p>Parents, married children, shared living, separate kitchens, future floors and lift readiness can change circulation and structural planning.</p></article>
     <article><h3>Demolition + rebuild</h3><p>Existing services, neighbour protection, demolition, salvage and the new foundation need their own pre-construction decisions before the new home begins.</p><Link href="/demolition-rebuild-house-chennai">Plan a rebuild →</Link></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Priority Chennai service areas</span>
    <h2>Closer to the site.<br/><span>Clearer from the start.</span></h2>
    <p>We prioritise residential enquiries across West Chennai, Anna Nagar / Padi / Koyambedu, OMR and ECR. Our Chennai base is in Ramapuram. Project fit is confirmed from the exact location, road access, area, scope, budget and current delivery capacity.</p>
    <div className="guideCards three">
     <article><h3>West Chennai</h3><p>Ramapuram, Valasaravakkam, Porur, Virugambakkam, Vadapalani, Saligramam, Gerugambakkam, Mangadu, Kundrathur, Kolapakkam, Maduravoyal, Vanagaram, Kattupakkam and Poonamallee.</p><Link href="/house-construction-west-chennai">Explore West Chennai →</Link></article>
     <article><h3>Anna Nagar + North-West</h3><p>Anna Nagar, Padi and Koyambedu, including established-site and rebuild conversations.</p><Link href="/house-construction-anna-nagar-chennai">Explore Anna Nagar + nearby →</Link></article>
     <article><h3>OMR + ECR</h3><p>Residential sites where access, drainage, soil, exposure and the exact approval route deserve site-specific planning.</p><Link href="/house-construction-omr-ecr-chennai">Explore OMR + ECR →</Link></article>
    </div>
    <div className="guideActions"><Link className="productTextLink" href="/service-areas-chennai">See all priority service areas →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Architect-led construction</span>
    <h2>The plan, engineering and site<br/><span>should not become separate conversations.</span></h2>
    <div className="guideCards three">
     <article><h3>Architecture</h3><p>Develop the home around people, site and budget before construction quantities and finishes are treated as final.</p></article>
     <article><h3>Engineering coordination</h3><p>Connect structural and services information to the architectural intent before the site team is asked to resolve conflicts informally.</p></article>
     <article><h3>Construction scope</h3><p>Execute against coordinated drawings, a written specification, exclusions, payment stages and a documented change process.</p></article>
    </div>
    <div className="guideActions"><Link className="productTextLink" href="/process">See the complete process →</Link><Link className="productTextLink" href="/project-evidence">Review project evidence →</Link></div>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">Individual house construction FAQs</span><h2>Before you appoint a builder.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Have a plot in Chennai?</h2><p>Share the locality, plot size, approximate built-up area, intended floors, family requirements and budget direction.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Prepare my project brief ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I am planning an individual house in Chennai and would like to discuss design and construction.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('Individual house construction in Chennai',path),serviceSchema,faqSchema]}/>
 </Page>;
}
