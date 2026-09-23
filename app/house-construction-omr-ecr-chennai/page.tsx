import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/house-construction-omr-ecr-chennai';
const title='House Construction in OMR & ECR Chennai | Bind Builds';
const description='Architect-led home and villa construction for OMR and ECR Chennai sites, with site-specific planning for access, drainage, soil, exposure, approvals and construction scope.';
export const metadata=pageMetadata(title,description,path);

export default function OmrEcr(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led residential construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:[{'@type':'Place',name:'Old Mahabalipuram Road (OMR), Chennai'},{'@type':'Place',name:'East Coast Road (ECR), Chennai'}]};
 return <Page kicker="OMR + ECR / HOUSE CONSTRUCTION" title="Homes for Chennai’s south-east corridors.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>OMR + ECR</span></nav>
   <header className="guideIntro"><span className="productEyebrow">OMR · ECR · Site-specific planning</span><h2>Architecture first.<br/><span>Then engineer the build.</span></h2><p>OMR and ECR include very different plots—from dense urban edges to more exposed residential sites. Bind Builds treats the site investigation, drainage, soil information, access, structural coordination and material specification as part of the early decision process rather than assuming one standard solution across the corridor.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my OMR / ECR site ↗</Link><Link className="productTextLink" href="/cost-calculator">Build a planning estimate →</Link></div></header>
   <section className="guideSection"><span className="productEyebrow">Before the floor plan is frozen</span><h2>Read the site.<br/><span>Then design the home.</span></h2><div className="documentGrid">{[
    ['01','Ground and soil','Foundation assumptions should follow the actual site and structural advice, not a generic package assumption.'],
    ['02','Rain and drainage','Plot levels, road levels, roof falls and the external drainage strategy should be understood before fixing entry and landscape levels.'],
    ['03','Exposure and envelope','For exposed or coastal plots, facade details, hardware, waterproofing and material selections deserve project-specific review.'],
    ['04','Road and material access','Construction traffic, storage, neighbouring properties and unloading space affect the execution plan and preliminaries.'],
    ['05','Approvals','The exact site, jurisdiction and current applicable rules need to be checked before finalising buildable area or floor count.'],
    ['06','Villa / family brief','Privacy, outdoor space, views, heat control, ventilation and future family use should shape the architecture before specification upgrades.']
   ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div></section>
   <section className="guideSection"><span className="productEyebrow">What to compare</span><h2>Not every “turnkey” quote<br/><span>contains the same work.</span></h2><div className="guideCards three">
    <article><h3>Design + engineering</h3><p>Check architectural, structural and services coordination, drawing stages and who is responsible for decisions.</p><Link href="/process">See our process →</Link></article>
    <article><h3>Base + external works</h3><p>Clarify sump, septic or drainage systems, compound wall, gate, landscape, utility connections and site-specific works separately.</p><Link href="/cost-calculator">Model additional allowances →</Link></article>
    <article><h3>Evidence + supervision</h3><p>Understand what is completed, ongoing or design-only, and how site supervision and documentation are actually handled.</p><Link href="/project-evidence">Review project evidence →</Link></article>
   </div></section>
   <section className="guideClosing"><h2>Planning on OMR or ECR?</h2><p>Share the exact pin, plot size, road access, approximate built-up area and whether the site is vacant, occupied or a rebuild.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check project fit ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I have a site on OMR / ECR and would like to discuss architect-led construction.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in OMR and ECR Chennai',path),serviceSchema]}/>
 </Page>;
}
