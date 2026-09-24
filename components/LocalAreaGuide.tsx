import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { Page } from '@/components/Site';
import { breadcrumbSchema } from '@/lib/seo';
import { money } from '@/lib/calculator';
import { packages, site, whatsappUrl } from '@/lib/site';

export type LocalAreaGuideData = {
 path:string;
 locality:string;
 kicker:string;
 heroTitle:string;
 introEyebrow:string;
 introLead:string;
 introAccent:string;
 intro:string;
 localNote?:string;
 checks:Array<[string,string,string]>;
 scenarios:Array<[string,string]>;
 faqs:Array<[string,string]>;
 nearby:Array<[string,string]>;
};

export default function LocalAreaGuide({data}:{data:LocalAreaGuideData}){
 const serviceSchema={
  '@context':'https://schema.org',
  '@type':'Service',
  name:`House construction in ${data.locality}, Chennai`,
  serviceType:'Architect-led residential construction',
  description:data.intro,
  url:site.url+data.path,
  provider:{'@id':site.url+'/#localbusiness'},
  areaServed:{'@type':'Place',name:data.locality+', Chennai'}
 };
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:data.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};

 return <Page kicker={data.kicker} title={data.heroTitle}>
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>{data.locality}</span></nav>

   <header className="guideIntro">
    <span className="productEyebrow">{data.introEyebrow}</span>
    <h2>{data.introLead}<br/><span>{data.introAccent}</span></h2>
    <p>{data.intro}</p>
    {data.localNote&&<p className="guideSmall">{data.localNote}</p>}
    <div className="guideActions">
     <Link className="cta primary" href={'/start-a-project?location='+encodeURIComponent(data.locality+', Chennai')}>Discuss my {data.locality} site ↗</Link>
     <Link className="productTextLink" href="/cost-calculator">Calculate my construction budget →</Link>
    </div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Before the proposal</span>
    <h2>Six checks for a<br/><span>{data.locality} construction site.</span></h2>
    <div className="documentGrid">{data.checks.map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">House construction cost</span>
    <h2>Start with a visible specification.<br/><span>Then make it site-specific.</span></h2>
    <p>Bind Builds publishes three starting base-construction packages. They are useful for early budgeting, but the project proposal must still confirm the measured area, structure, site conditions, additions, exclusions, taxes and the final specification.</p>
    <div className="serviceRates">{packages.map(item=><article key={item.key}><h3>{item.name}</h3><strong>{money(item.rate)}<small> / sq.ft*</small></strong><p>{item.description}</p><Link href={'/packages#'+item.key}>See the {item.name} specification →</Link></article>)}</div>
    <p className="guideSmall">*Starting base construction rates. A locality page is not a quotation and does not override the project-specific proposal or agreement.</p>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Common project conversations</span>
    <h2>The brief changes.<br/><span>The coordination should not.</span></h2>
    <div className="guideCards three">{data.scenarios.map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
    <div className="guideActions"><Link className="productTextLink" href="/process">See the construction process →</Link><Link className="productTextLink" href="/project-evidence">Review project evidence →</Link><Link className="productTextLink" href="/building-plan-approval-chennai">Understand approval planning →</Link></div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Authority before appointment</span>
    <h2>Verify the business.<br/><span>Then assess the proposal.</span></h2>
    <div className="guideCards three">
     <article><h3>Chennai business base</h3><p>{site.address.streetAddress}, {site.address.addressLocality} {site.address.postalCode}. Studio discussions are by appointment.</p><a href={site.maps} target="_blank" rel="noopener noreferrer">Find the Chennai base on Google Maps ↗</a></article>
     <article><h3>Project evidence by status</h3><p>We separate design experience, ongoing construction and completed work so the role behind each example stays clear.</p><Link href="/project-evidence">Review project evidence →</Link></article>
     <article><h3>Architecture practice behind the build</h3><p>Studio Bind Architects began in 2019. Bind Builds is the architect-led construction chapter, connecting design thinking with site execution.</p><a href={site.studio} target="_blank" rel="noopener noreferrer">Explore Studio Bind Architects ↗</a></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Nearby service areas</span>
    <h2>Continue by locality.</h2>
    <div className="relatedGuides">{data.nearby.map(([name,href])=><Link href={href} key={href}>{name} →</Link>)}</div>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">{data.locality} construction FAQs</span><h2>Questions before the first site meeting.</h2>{data.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Planning a home in {data.locality}?</h2><p>Share the plot location, dimensions, road width, expected floors, approximate built-up area, family requirements, budget direction and desired start date.</p><div className="guideActions"><Link className="cta primary" href={'/start-a-project?location='+encodeURIComponent(data.locality+', Chennai')}>Check my project fit ↗</Link><a className="productTextLink" href={whatsappUrl(`Hello Bind Builds, I have a site in ${data.locality}, Chennai and would like to discuss house construction.`)} target="_blank" rel="noopener noreferrer">WhatsApp my site details ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in '+data.locality,data.path),serviceSchema,faqSchema]}/>
 </Page>;
}
