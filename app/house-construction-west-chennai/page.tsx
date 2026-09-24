import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import LocalityIntentGrid from '@/components/LocalityIntentGrid';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/house-construction-west-chennai';
const title='House Construction Company in West Chennai | Porur, Ramapuram & Valasaravakkam';
const description='Architect-led house construction in Porur, Ramapuram, Valasaravakkam, Virugambakkam, Vadapalani, Saligramam, Mangadu, Kundrathur, Poonamallee and West Chennai.';
export const metadata=pageMetadata(title,description,path);

const innerWest=['Valasaravakkam','Ramapuram','Virugambakkam','Porur','Vadapalani','Saligramam'];
const growthBelt=['Gerugambakkam','Mangadu','Kundrathur','Kolapakkam','Maduravoyal','Vanagaram','Kattupakkam','Poonamallee'];
const localityIntent=[
 {id:'valasaravakkam',name:'House construction in Valasaravakkam',eyebrow:'Valasaravakkam',copy:'For established residential streets, we focus early on plot efficiency, parking, neighbouring buildings, construction access and whether the project is a new home or a demolition-and-rebuild.',link:'/house-construction-valasaravakkam-chennai',linkLabel:'Read the Valasaravakkam guide →'},
 {id:'ramapuram',name:'House construction in Ramapuram',eyebrow:'Ramapuram · Our Chennai base',copy:'Bind Builds is based in Kurinji Nagar, Ramapuram. For nearby projects we still begin with the exact plot, street access, family brief, parking, existing structure and approval route before fixing scope or price.',link:'/house-construction-ramapuram-chennai',linkLabel:'Read the Ramapuram guide →'},
 {id:'virugambakkam',name:'House construction in Virugambakkam',eyebrow:'Virugambakkam',copy:'Compact plots, adjoining homes, car parking and rebuild decisions can strongly shape the plan. We coordinate architecture, structure and services before execution assumptions are locked.'},
 {id:'porur',name:'House construction in Porur',eyebrow:'Porur',copy:'Porur projects can vary from tight residential streets to larger plots near major roads. We review material access, site levels, parking, floor stacking and external works before treating a package rate as the full project cost.',link:'/house-construction-porur-chennai',linkLabel:'Read the Porur guide →'},
 {id:'vadapalani',name:'House construction in Vadapalani',eyebrow:'Vadapalani',copy:'For established urban plots, demolition sequence, neighbour interfaces, storage space, parking and movement of construction materials deserve early planning alongside the family brief.'},
 {id:'saligramam',name:'House construction in Saligramam',eyebrow:'Saligramam',copy:'Plot efficiency matters on many inner-city sites. We work through setbacks, circulation, parking, light, ventilation, neighbouring buildings and build access as connected design decisions.'},
 {id:'gerugambakkam',name:'House construction in Gerugambakkam',eyebrow:'Gerugambakkam',copy:'For growing residential streets, road width, utilities, site levels, drainage, soil information and the applicable approval route should be checked before the structural and external-work scope is finalised.'},
 {id:'mangadu',name:'House construction in Mangadu',eyebrow:'Mangadu',copy:'We assess the exact street and plot rather than assuming one standard solution across the locality. Access, site levels, water and drainage planning, utilities and future floor requirements are reviewed early.'},
 {id:'kundrathur',name:'House construction in Kundrathur',eyebrow:'Kundrathur',copy:'Residential plots can differ significantly in road access and surrounding development. We connect the family programme with soil investigation, engineering, approvals and site logistics before construction starts.'},
 {id:'kolapakkam',name:'House construction in Kolapakkam',eyebrow:'Kolapakkam',copy:'For independent homes, we look at plot orientation, street width, levels, parking, outdoor space and services together so the architecture and execution plan are not developed separately.'},
 {id:'maduravoyal',name:'House construction in Maduravoyal',eyebrow:'Maduravoyal',copy:'Mixed street conditions make construction access and storage important. We also review multi-floor family use, parking, demolition where relevant, external works and the written specification before pricing.'},
 {id:'vanagaram',name:'House construction in Vanagaram',eyebrow:'Vanagaram',copy:'For new residential projects we review access, levels, drainage, utility connections, future expansion and the exact site context before confirming the building and external-work scope.'},
 {id:'kattupakkam',name:'House construction in Kattupakkam',eyebrow:'Kattupakkam',copy:'The first decisions are practical: road width, plot levels, utility availability, family requirements, parking and expected floors. Those inputs shape design, engineering and budget together.'},
 {id:'poonamallee',name:'House construction in Poonamallee',eyebrow:'Poonamallee',copy:'Poonamallee sites vary widely in access and surrounding development. We qualify the exact plot, jurisdiction, logistics, soil/structural inputs and intended building use before proposing the construction route.',link:'/house-construction-poonamallee-chennai',linkLabel:'Read the Poonamallee guide →'},
];
const faqs=[
 ['Do you undertake house construction in Porur, Ramapuram and Valasaravakkam?','Yes. These are priority West Chennai enquiry areas for Bind Builds. We still confirm project fit from the exact plot, road access, built-up area, scope, budget, timeline and current site-management capacity before committing to a proposal.'],
 ['Do you handle demolition and rebuild projects in West Chennai?','Yes, subject to project fit. We separate demolition, neighbour protection, utility disconnection and existing-condition risks from the new construction scope before pricing the rebuild.'],
 ['What is the construction cost per sq.ft in West Chennai?','Our published package rates are starting references for base construction. The project-specific proposal confirms the actual area basis, specification, exclusions, access constraints and additional works for the site.'],
 ['Can you visit a site in Mangadu, Kundrathur, Poonamallee or nearby areas?','Site visits are arranged after an initial qualification conversation when the plot, scope, budget and timeline appear to fit our delivery model.'],
];

export default function WestChennai(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:[...innerWest,...growthBelt].map(name=>({'@type':'Place',name:name+', Chennai'}))};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <Page kicker="WEST CHENNAI / HOUSE CONSTRUCTION" title="House construction across West Chennai.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>West Chennai</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Porur · Ramapuram · Valasaravakkam + nearby</span>
    <h2>Architect-led house construction.<br/><span>Built around the actual site.</span></h2>
    <p>Bind Builds discusses new homes, demolition-and-rebuild projects and selected residential construction across West Chennai. Our Chennai base is in Kurinji Nagar, Ramapuram. We start with road access, plot dimensions, neighbours, existing structures, parking, approval route and the family programme before treating a square-foot rate as meaningful.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my West Chennai site ↗</Link><Link className="productTextLink" href="/cost-calculator">Estimate my construction budget →</Link></div>
   </header>
   <section className="guideSection" id="priority-localities">
    <span className="productEyebrow">Priority localities</span>
    <h2>Our main West Chennai<br/><span>search + service cluster.</span></h2>
    <p>These are the localities we are prioritising for relevant residential enquiries. A listing here means we actively consider projects in the area; it is not an automatic service guarantee.</p>
    <div className="serviceAreaGrid">
     <article><h3>Inner West Chennai</h3><p>Established neighbourhoods where plot efficiency, adjoining buildings, parking, demolition and construction access often deserve early attention.</p><ul>{innerWest.map(area=><li key={area}>{area}</li>)}</ul></article>
     <article><h3>West growth belt</h3><p>Residential growth areas where road access, site levels, utilities, soil information and the exact approval jurisdiction need to be checked early.</p><ul>{growthBelt.map(area=><li key={area}>{area}</li>)}</ul></article>
     <article><h3>Project-fit check</h3><p>Send the exact locality, plot size, road width, approximate built-up area, intended floors, budget and desired start date. We use that information before scheduling the next step.</p><Link href="/start-a-project">Share my site details →</Link></article>
    </div>
   </section>
   <section className="guideSection" id="locality-guides">
    <span className="productEyebrow">Local search, useful answers</span>
    <h2>House construction<br/><span>by locality.</span></h2>
    <p>Instead of cloning the same landing page for every pin code, these sections answer the location-specific questions we want homeowners to consider before asking for a quote.</p>
    <LocalityIntentGrid items={localityIntent}/>
   </section>
   <section className="guideSection">
    <span className="productEyebrow">What changes the design + build strategy</span>
    <h2>Urban plots need<br/><span>connected decisions.</span></h2>
    <div className="documentGrid">{[
      ['01','Narrow or busy access','Concrete, steel, blocks, debris removal and unloading need a workable logistics plan before execution starts.'],
      ['02','Existing houses and neighbours','For rebuilds, demolition sequence, shared edges, temporary protection and utility disconnection should be planned before the new foundation.'],
      ['03','Parking and floor stacking','Ground-floor parking, parents’ accommodation, rental floors and future family use can change the structural and circulation logic.'],
      ['04','Approvals and setbacks','The exact property and applicable authority need to be checked before treating any generic floor count or setback as final.'],
      ['05','Drainage and site levels','Road level, plot level and the proposed rainwater / wastewater route affect external works and entry levels.'],
      ['06','Specification discipline','Compare the written inclusions, material allowances, exclusions and change process—not only the advertised rate per square foot.']
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>
   <section className="guideSection">
    <span className="productEyebrow">Useful next steps</span>
    <h2>Choose the next decision.</h2>
    <div className="guideCards three">
     <article><h3>New independent home</h3><p>Start with family requirements, plot dimensions, floors and a realistic budget range.</p><Link href="/house-construction-chennai">Read the Chennai home-construction guide →</Link></article>
     <article><h3>Old house to rebuild</h3><p>Separate demolition, temporary protection and existing services from the new construction scope.</p><Link href="/demolition-rebuild-house-chennai">Plan demolition + rebuild →</Link></article>
     <article><h3>Compare package scope</h3><p>See the starting specifications before comparing proposals or committing to a headline rate.</p><Link href="/packages">Compare construction packages →</Link></article>
    </div>
   </section>
   <section className="guideSection guideFaq"><span className="productEyebrow">West Chennai FAQs</span><h2>Before the first site meeting.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
   <section className="guideClosing"><h2>Have a plot in West Chennai?</h2><p>Send the locality, plot size, road width, approximate built-up area and what your family needs from the home.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check project fit ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I have a site in West Chennai and would like to discuss house construction.')} target="_blank" rel="noopener noreferrer">WhatsApp my locality ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction company in West Chennai',path),serviceSchema,faqSchema]}/>
 </Page>;
}
