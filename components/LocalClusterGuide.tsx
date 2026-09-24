import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { Page } from '@/components/Site';
import { breadcrumbSchema } from '@/lib/seo';
import { money } from '@/lib/calculator';
import { packages, site, whatsappUrl } from '@/lib/site';

export type LocalClusterGuideData={
 path:string;
 areas:string[];
 kicker:string;
 heroTitle:string;
 introEyebrow:string;
 introLead:string;
 introAccent:string;
 intro:string;
 areaNotes:Array<[string,string]>;
 checks:Array<[string,string,string]>;
 scenarios:Array<[string,string]>;
 faqs:Array<[string,string]>;
 nearby:Array<[string,string]>;
};

export default function LocalClusterGuide({data}:{data:LocalClusterGuideData}){
 const label=data.areas.join(', ');
 const serviceSchema={
  '@context':'https://schema.org','@type':'Service',
  name:`House construction in ${label}, Chennai`,
  serviceType:'Architect-led residential construction',
  description:data.intro,url:site.url+data.path,
  provider:{'@id':site.url+'/#localbusiness'},
  areaServed:data.areas.map(name=>({'@type':'Place',name:name+', Chennai'}))
 };
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:data.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};

 return <Page kicker={data.kicker} title={data.heroTitle}>
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/service-areas-chennai">Service areas</Link><span aria-hidden="true">/</span><span>{data.areas[0]} + nearby</span></nav>

   <header className="guideIntro">
    <span className="productEyebrow">{data.introEyebrow}</span>
    <h2>{data.introLead}<br/><span>{data.introAccent}</span></h2>
    <p>{data.intro}</p>
    <div className="guideActions"><Link className="cta primary" href="/start-a-project">Discuss my site ↗</Link><Link className="productTextLink" href="/cost-calculator">Calculate my construction budget →</Link></div>
   </header>

   <section className="guideSection">
    <span className="productEyebrow">Locality context</span>
    <h2>One corridor.<br/><span>Different site conversations.</span></h2>
    <div className="localityIntentGrid">{data.areaNotes.map(([name,copy])=><article className="localityIntentCard" key={name}><span className="productEyebrow">{name}</span><h3>House construction in {name}</h3><p>{copy}</p><Link href={'/start-a-project?location='+encodeURIComponent(name+', Chennai')}>Check a {name} project →</Link></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Before the proposal</span>
    <h2>Site questions before<br/><span>the square-foot rate.</span></h2>
    <div className="documentGrid">{data.checks.map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">House construction cost</span>
    <h2>Published starting rates.<br/><span>Project-specific final scope.</span></h2>
    <p>Use the package rates below for early planning. The actual proposal still needs the confirmed measured area, structure, access, external works, site conditions, taxes, additions, exclusions and written specification.</p>
    <div className="serviceRates">{packages.map(item=><article key={item.key}><h3>{item.name}</h3><strong>{money(item.rate)}<small> / sq.ft*</small></strong><p>{item.description}</p><Link href={'/packages#'+item.key}>See the {item.name} specification →</Link></article>)}</div>
    <p className="guideSmall">*Starting base-construction reference only. This page is not a quotation.</p>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Common project conversations</span>
    <h2>Different briefs.<br/><span>One coordinated route.</span></h2>
    <div className="guideCards three">{data.scenarios.map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Authority before appointment</span>
    <h2>Verify the process.<br/><span>Then decide.</span></h2>
    <div className="guideCards three">
     <article><h3>Chennai-based practice</h3><p>Bind Builds operates from Kurinji Nagar, Ramapuram and qualifies each site before promising delivery.</p><Link href="/about">About Bind Builds →</Link></article>
     <article><h3>Project evidence by status</h3><p>We separate design experience, ongoing construction and completed work instead of presenting them as the same thing.</p><Link href="/project-evidence">Review project evidence →</Link></article>
     <article><h3>Scope before headline price</h3><p>Packages, exclusions, approvals and additional items are published so a proposal can be compared on the same basis.</p><Link href="/packages">Compare package scope →</Link></article>
    </div>
   </section>

   <section className="guideSection">
    <span className="productEyebrow">Nearby service areas</span>
    <h2>Continue by location.</h2>
    <div className="relatedGuides">{data.nearby.map(([name,href])=><Link href={href} key={href}>{name} →</Link>)}</div>
   </section>

   <section className="guideSection guideFaq"><span className="productEyebrow">Construction FAQs</span><h2>Before the first site meeting.</h2>{data.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Have a site in this corridor?</h2><p>Share the exact locality, plot dimensions, road width, proposed floors, approximate built-up area, family requirements, budget direction and target start date.</p><div className="guideActions"><Link className="cta primary" href="/start-a-project">Check my project fit ↗</Link><a className="productTextLink" href={whatsappUrl(`Hello Bind Builds, I have a site in ${data.areas[0]} / nearby Chennai and would like to discuss house construction.`)} target="_blank" rel="noopener noreferrer">WhatsApp my site details ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction in '+data.areas.join(', '),data.path),serviceSchema,faqSchema]}/>
 </Page>;
}
