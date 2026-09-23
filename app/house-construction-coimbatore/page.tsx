import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { site, whatsappUrl } from '@/lib/site';

const path='/house-construction-coimbatore';
const title='Architect-Led House Construction in Coimbatore | Bind Builds';
const description='Discuss architect-led house construction in Coimbatore with Bind Builds. Design, engineering coordination, project-specific budgeting and construction planning for selected residential projects.';
export const metadata=pageMetadata(title,description,path);

export default function CoimbatoreConstruction(){
 const serviceSchema={'@context':'https://schema.org','@type':'Service',name:title,description,serviceType:'Architect-led house construction',url:site.url+path,provider:{'@type':'Organization','@id':site.url+'/#organization',name:site.name,url:site.url},areaServed:{'@type':'City',name:'Coimbatore'}};
 return <Page kicker="COIMBATORE / HOUSE CONSTRUCTION" title="Architect-led construction in Coimbatore.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>House construction in Coimbatore</span></nav>
   <header className="guideIntro"><span className="productEyebrow">Selected residential projects · Coimbatore</span><h2>Design first.<br/><span>Build with a clear scope.</span></h2><p>Bind Builds considers selected residential construction projects in Coimbatore where the project size, design scope, site conditions, travel and supervision model can be agreed clearly. The starting point is not a generic rate—it is the site, family brief, built-up area and the level of coordination the project needs.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my Coimbatore project ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I am planning a house construction project in Coimbatore and would like to discuss project fit.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div></header>
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
   <section className="guideClosing"><h2>Planning a home in Coimbatore?</h2><p>Start with the site and programme. We will tell you whether the project fits our current delivery model before moving into a detailed proposal.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check Coimbatore project fit ↗</Link><Link className="productTextLink" href="/packages">Review specification levels →</Link></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in Coimbatore',path),serviceSchema]}/>
 </Page>;
}
