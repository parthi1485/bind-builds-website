import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import LocalityIntentGrid from '@/components/LocalityIntentGrid';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/house-construction-coimbatore';
const title='Architect-Led House Construction Company in Coimbatore';
const description='Architect-led house construction in Coimbatore for selected residential projects. Design, engineering coordination, budgeting, supervision planning and construction scope by Bind Builds.';
export const metadata=pageMetadata(title,description,path);

const coimbatoreIntent=[
 {id:'independent-house',name:'Independent house construction in Coimbatore',eyebrow:'Own plot / Family home',copy:'For an independent house, the first inputs are the plot, users, floor requirements, parking, budget and realistic start date. Architecture and engineering should be coordinated before the construction scope is frozen.'},
 {id:'turnkey',name:'Turnkey house construction in Coimbatore',eyebrow:'End-to-end delivery',copy:'A turnkey proposal should make the area basis, design responsibility, engineering, approvals, material specification, site supervision, exclusions and change process clear—not just quote one square-foot rate.'},
 {id:'villa',name:'Villa construction in Coimbatore',eyebrow:'Custom residential',copy:'Villa planning can involve larger openings, landscape, outdoor living, premium finishes and more complex services. We treat those choices as part of the design-and-budget conversation before execution.'},
 {id:'rebuild',name:'Demolition and rebuild in Coimbatore',eyebrow:'Existing house / New home',copy:'For rebuilds, the existing structure, utilities, demolition, salvage, neighbour protection and new foundation strategy should be separated from the new construction scope before pricing.'},
];
const faqs=[
 ['Does Bind Builds have a Coimbatore office?','Bind Builds is Chennai-based. We consider selected Coimbatore residential projects when the project size, design scope, supervision plan, travel and local execution logistics can be agreed clearly.'],
 ['Do you undertake turnkey house construction in Coimbatore?','We consider selected end-to-end residential projects. The exact delivery model, local site responsibility, consultant coordination, visit frequency, commercial basis and exclusions are confirmed project by project.'],
 ['Are the Chennai package rates the final construction cost in Coimbatore?','No. Website package rates are useful planning references, but a Coimbatore proposal must confirm local labour, materials, logistics, supervision, site conditions, area basis and project-specific scope.'],
 ['What should I send before requesting a Coimbatore site visit?','Share the exact location, plot dimensions, road width, approximate built-up area, intended floors, family brief, budget range and desired construction start. We use those details to assess fit before planning travel.'],
];

export default function CoimbatoreConstruction(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:{'@type':'City',name:'Coimbatore'}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="COIMBATORE / HOUSE CONSTRUCTION" title="Architect-led house construction in Coimbatore.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>House construction in Coimbatore</span></nav>
   <header className="guideIntro"><span className="productEyebrow">Selected residential projects · Coimbatore</span><h2>Design first.<br/><span>Build with a clear delivery model.</span></h2><p>Bind Builds considers selected residential construction projects in Coimbatore where the project size, architecture scope, site conditions, travel and supervision model can be agreed clearly. We are Chennai-based, so we state that operating model upfront rather than presenting a local office we do not have.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my Coimbatore project ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I am planning a house construction project in Coimbatore and would like to discuss project fit.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div></header>
   <section className="guideSection" id="project-types"><span className="productEyebrow">Coimbatore search + project intent</span><h2>What are you<br/><span>planning to build?</span></h2><LocalityIntentGrid items={coimbatoreIntent}/></section>
   <section className="guideSection"><span className="productEyebrow">How we approach Coimbatore enquiries</span><h2>Confirm the operating model<br/><span>before promising the build.</span></h2><div className="documentGrid">{[
    ['01','Site + project fit','We first review location, plot, access, approximate built-up area, budget, programme and the expected construction start.'],
    ['02','Architecture + engineering','The design, structure and services need one coordinated drawing direction before execution quantities and scope can be meaningful.'],
    ['03','Local execution logistics','Material sourcing, labour, local consultants, inspections and site supervision need a project-specific plan rather than a Chennai assumption.'],
    ['04','Budget basis','Published website package rates are useful references, but a Coimbatore proposal must confirm the actual local scope, logistics and commercial basis.'],
    ['05','Site supervision','The visit frequency, resident site responsibility, documentation and decision process are agreed according to the project’s scale and location.'],
    ['06','Evidence before commitment','Review our stated role and project status. We do not present design work or ongoing work as a completed turnkey handover.']
   ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div></section>
   <section className="guideSection"><span className="productEyebrow">What to send us first</span><h2>A useful first conversation.</h2><div className="guideCards three">
    <article><h3>Plot information</h3><p>Location, dimensions, road width, orientation and whether the site is vacant or has an existing building.</p></article>
    <article><h3>Family + building brief</h3><p>Users, bedrooms, floors, parking, rental requirements, future expansion and any special lifestyle priorities.</p></article>
    <article><h3>Budget + timing</h3><p>Approximate total construction budget, finance status and when you realistically want design and site work to begin.</p></article>
   </div><div className="guideActions"><Link className="productTextLink" href="/process">See the pre-construction process →</Link><Link className="productTextLink" href="/project-evidence">Review project evidence →</Link></div></section>
   <section className="guideSection">
    <span className="productEyebrow">Authority + operating transparency</span>
    <h2>Chennai-based.<br/><span>Coimbatore delivery agreed project by project.</span></h2>
    <div className="guideCards three">
     <article><h3>Real business base</h3><p>Bind Builds is based at {site.address.streetAddress}, {site.address.addressLocality} {site.address.postalCode}. We do not present a Coimbatore office we do not operate.</p><a href={site.maps} target="_blank" rel="noopener noreferrer">View the Chennai base on Google Maps ↗</a></article>
     <article><h3>Evidence before travel</h3><p>Review our stated project roles and status before deciding whether the architecture, construction process and supervision model suit your project.</p><Link href="/project-evidence">Review project evidence →</Link></article>
     <article><h3>Design practice lineage</h3><p>Studio Bind Architects began in 2019. Bind Builds is the construction chapter launched in 2026, led by the same architecture-first thinking.</p><a href={site.studio} target="_blank" rel="noopener noreferrer">Explore Studio Bind Architects ↗</a></article>
    </div>
   </section>
   <section className="guideSection guideFaq"><span className="productEyebrow">Coimbatore construction FAQs</span><h2>Before we plan travel or supervision.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
   <section className="guideClosing"><h2>Planning a home in Coimbatore?</h2><p>Start with the site and programme. We will tell you whether the project fits our current delivery model before moving into a detailed proposal.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check Coimbatore project fit ↗</Link><Link className="productTextLink" href="/packages">Review specification levels →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in Coimbatore',path),serviceSchema,faqSchema]}/>
 </Page>;
}
