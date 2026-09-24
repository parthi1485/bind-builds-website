import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/service-areas-chennai';
const title='House Construction Service Areas in Chennai + Coimbatore';
const description='Priority Bind Builds house-construction areas: Ramapuram, Valasaravakkam, Porur, Virugambakkam, Anna Nagar, OMR, ECR, Poonamallee and selected Coimbatore projects.';
export const metadata=pageMetadata(title,description,path);

const priorityZones:Array<[string,Array<[string,string]>]>=[
 ['Inner West Chennai',[['Valasaravakkam','/house-construction-valasaravakkam-chennai'],['Ramapuram','/house-construction-ramapuram-chennai'],['Virugambakkam','/house-construction-virugambakkam-vadapalani-saligramam'],['Porur','/house-construction-porur-chennai'],['Vadapalani','/house-construction-virugambakkam-vadapalani-saligramam'],['Saligramam','/house-construction-virugambakkam-vadapalani-saligramam']]],
 ['West growth belt',[['Gerugambakkam','/house-construction-gerugambakkam-kolapakkam-chennai'],['Mangadu','/house-construction-mangadu-kundrathur-chennai'],['Kundrathur','/house-construction-mangadu-kundrathur-chennai'],['Kolapakkam','/house-construction-gerugambakkam-kolapakkam-chennai'],['Maduravoyal','/house-construction-maduravoyal-vanagaram-kattupakkam'],['Vanagaram','/house-construction-maduravoyal-vanagaram-kattupakkam'],['Kattupakkam','/house-construction-maduravoyal-vanagaram-kattupakkam'],['Poonamallee','/house-construction-poonamallee-chennai']]],
 ['Central / North-West',[['Anna Nagar','/house-construction-anna-nagar-chennai#anna-nagar'],['Padi','/house-construction-anna-nagar-chennai#padi'],['Koyambedu','/house-construction-anna-nagar-chennai#koyambedu']]],
 ['South-East corridors',[['OMR','/house-construction-omr-ecr-chennai#omr'],['ECR','/house-construction-omr-ecr-chennai#ecr']]],
];

const locationLandingPages=[
 ['West Chennai','/house-construction-west-chennai'],
 ['Ramapuram','/house-construction-ramapuram-chennai'],
 ['Porur','/house-construction-porur-chennai'],
 ['Valasaravakkam','/house-construction-valasaravakkam-chennai'],
 ['Poonamallee','/house-construction-poonamallee-chennai'],
 ['Virugambakkam + Vadapalani + Saligramam','/house-construction-virugambakkam-vadapalani-saligramam'],
 ['Mangadu + Kundrathur','/house-construction-mangadu-kundrathur-chennai'],
 ['Gerugambakkam + Kolapakkam','/house-construction-gerugambakkam-kolapakkam-chennai'],
 ['Maduravoyal + Vanagaram + Kattupakkam','/house-construction-maduravoyal-vanagaram-kattupakkam'],
 ['Anna Nagar + Padi + Koyambedu','/house-construction-anna-nagar-chennai'],
 ['OMR + ECR','/house-construction-omr-ecr-chennai'],
 ['Coimbatore','/house-construction-coimbatore'],
] as const;

const faqs=[
 ['Do you work in all of these Chennai localities?','These are priority enquiry areas, not an automatic service guarantee. We confirm fit from the exact site, access, project type, approximate construction value, timeline and current site-management capacity.'],
 ['Do you take projects in Coimbatore?','Yes, we consider selected residential projects in Coimbatore. The supervision model, travel, local execution logistics and commercial basis are confirmed project by project before a proposal.'],
 ['Can you visit my site before I decide?','Site visits are arranged after the initial qualification conversation when the project appears to fit our service area and scope. The purpose is to understand access, context, existing conditions and the next professional step.'],
 ['Does locality change the construction package rate?','The published package rate is a starting base reference. Site access, soil, demolition, approval route, logistics, external works and location-specific execution conditions can create project-specific additions or exclusions.'],
];

export default function ServiceAreasChennai(){
 const serviceAreas=priorityZones.flatMap(([,areas])=>areas).map(([name])=>({'@type':'Place',name:name+', Chennai'}));
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:[{'@type':'City',name:'Chennai'},...serviceAreas,{'@type':'City',name:'Coimbatore'}]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 const locationListSchema={'@context':'https://schema.org','@type':'ItemList',name:'Bind Builds priority construction service areas',itemListElement:locationLandingPages.map(([name,href],index)=>({'@type':'ListItem',position:index+1,name,url:site.url+href}))};
 return <Page kicker="PRIORITY SERVICE AREAS" title="Chennai first. Selected Coimbatore projects.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Service areas</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Project fit before promises</span>
    <h2>Local knowledge helps.<br/><span>The exact site still decides.</span></h2>
    <p>Bind Builds is Chennai-based, with priority residential enquiry areas concentrated around West Chennai, Central / North-West Chennai and the OMR–ECR corridors. We also consider selected Coimbatore projects where the project size and supervision model make sense.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Check my project fit ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I would like to check whether my location is within your construction service area.')} target="_blank" rel="noopener noreferrer">Ask about my locality ↗</a></div>
   </header>
   <section className="guideSection">
    <span className="productEyebrow">Priority Chennai enquiry areas</span>
    <h2>Neighbourhood clusters.<br/><span>Useful context, not repeated pages.</span></h2>
    <p>We group nearby localities into useful construction contexts instead of publishing a near-identical page for every pin code. Each cluster links to guidance that is relevant to the site conditions and project type.</p>
    <div className="serviceAreaGrid">{priorityZones.map(([name,areas])=><article key={name}><h3>{name}</h3><ul>{areas.map(([area,href])=><li key={area}><Link href={href}>{area}<span aria-hidden="true">→</span></Link></li>)}</ul></article>)}</div>
   </section>
   <section className="guideSection">
    <span className="productEyebrow">Location guides</span>
    <h2>Go deeper by corridor.</h2>
    <div className="guideCards">
     <article><h3>West Chennai</h3><p>Porur, Ramapuram, Valasaravakkam, Virugambakkam and the western growth belt.</p><Link href="/house-construction-west-chennai">Explore West Chennai construction →</Link></article>
     <article><h3>Anna Nagar + nearby</h3><p>Anna Nagar, Padi and Koyambedu, with a focus on established-site and rebuild decisions.</p><Link href="/house-construction-anna-nagar-chennai">Explore Anna Nagar / Padi / Koyambedu →</Link></article>
     <article><h3>OMR + ECR</h3><p>Site-specific planning for Chennai’s south-east residential corridors.</p><Link href="/house-construction-omr-ecr-chennai">Explore OMR / ECR construction →</Link></article>
     <article><h3>Coimbatore</h3><p>Selected residential projects with a project-specific supervision and logistics model.</p><Link href="/house-construction-coimbatore">Explore Coimbatore construction →</Link></article>
    </div>
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
    <span className="productEyebrow">Local authority signals</span>
    <h2>One real Chennai base.<br/><span>Clear service-area pages.</span></h2>
    <div className="guideCards three">
     <article><h3>Ramapuram business address</h3><p>{site.address.streetAddress}, {site.address.addressLocality} {site.address.postalCode}. We keep this identity consistent across the website and local listings.</p><a href={site.maps} target="_blank" rel="noopener noreferrer">Find our Chennai base on Google Maps ↗</a></article>
     <article><h3>Project evidence</h3><p>Review what is design experience, ongoing construction and completed work before deciding whether our current track record fits your project.</p><Link href="/project-evidence">Review project evidence →</Link></article>
     <article><h3>Design practice lineage</h3><p>Studio Bind Architects began in 2019. Bind Builds extends that architecture-led approach into construction from 2026.</p><a href={site.studio} target="_blank" rel="noopener noreferrer">Explore Studio Bind Architects ↗</a></article>
    </div>
   </section>
   <section className="guideSection guideFaq"><span className="productEyebrow">Service area FAQs</span><h2>Before we schedule the site.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
   <section className="guideClosing"><h2>Tell us where the site is.</h2><p>Share the locality, plot dimensions, road width, approximate built-up area and what you want to build.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check my project fit ↗</Link><Link className="productTextLink" href="/house-construction-chennai">Read the Chennai construction guide →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction service areas',path),serviceSchema,faqSchema,locationListSchema]}/>
 </Page>;
}
