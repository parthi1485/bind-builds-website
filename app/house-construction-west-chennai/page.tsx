import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/house-construction-west-chennai';
const title='House Construction in West Chennai | Porur, Ramapuram & Valasaravakkam';
const description='Architect-led house construction across West Chennai including Porur, Ramapuram, Valasaravakkam, Virugambakkam, Mangadu, Kundrathur, Poonamallee and nearby areas.';
export const metadata=pageMetadata(title,description,path);

const innerWest=['Ramapuram','Valasaravakkam','Virugambakkam','Porur','Vadapalani','Saligramam'];
const growthBelt=['Gerugambakkam','Kolapakkam','Mangadu','Kundrathur','Maduravoyal','Vanagaram','Kattupakkam','Poonamallee'];

export default function WestChennai(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:[...innerWest,...growthBelt].map(name=>({'@type':'Place',name}))};
 return <Page kicker="WEST CHENNAI / HOUSE CONSTRUCTION" title="Build around the site. Not just the square feet.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>West Chennai</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Porur · Ramapuram · Valasaravakkam + nearby</span>
    <h2>Architect-led house construction.<br/><span>Across West Chennai.</span></h2>
    <p>Bind Builds discusses new homes, demolition-and-rebuild projects and selected residential construction across West Chennai. We start with the actual plot: road width, neighbours, access, existing structures, approval route, family programme and the construction scope that can realistically be executed there.</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my West Chennai site ↗</Link><Link className="productTextLink" href="/cost-calculator">Estimate my construction budget →</Link></div>
   </header>
   <section className="guideSection">
    <span className="productEyebrow">Priority localities</span>
    <h2>Two connected belts.<br/><span>Different site conditions.</span></h2>
    <div className="serviceAreaGrid">
     <article><h3>Inner West Chennai</h3><p>Established neighbourhoods where plot efficiency, adjoining buildings, demolition, parking and construction access often deserve early attention.</p><ul>{innerWest.map(area=><li key={area}>{area}</li>)}</ul></article>
     <article><h3>West growth belt</h3><p>Residential growth areas where access, site levels, soil information, utilities and the exact approval jurisdiction need to be confirmed before assumptions are locked.</p><ul>{growthBelt.map(area=><li key={area}>{area}</li>)}</ul></article>
     <article><h3>How we qualify a project</h3><p>Locality alone does not confirm fit. We review plot dimensions, built-up requirement, budget, timeline, road access and our current site-management capacity before committing to a visit or proposal.</p><Link href="/start-a-project">Share my site details →</Link></article>
    </div>
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
   <section className="guideClosing"><h2>Have a plot in West Chennai?</h2><p>Send the locality, plot size, road width, approximate built-up area and what your family needs from the home.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check project fit ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I have a site in West Chennai and would like to discuss house construction.')} target="_blank" rel="noopener noreferrer">WhatsApp my locality ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in West Chennai',path),serviceSchema]}/>
 </Page>;
}
