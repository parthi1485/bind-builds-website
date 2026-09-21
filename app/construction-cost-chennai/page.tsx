import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';
import { packages, site, whatsappUrl } from '@/lib/site';
import { money } from '@/lib/calculator';

const path='/construction-cost-chennai';
const title='House Construction Cost in Chennai 2026';
const description='Understand Bind Builds house construction costs in Chennai for 2026. Compare ₹2,399, ₹2,649 and ₹3,199/sq.ft packages, sample budgets, exclusions and cost drivers.';
const updated='2026-09-21';
const sizes=[1000,1500,2000,2500];

export const metadata=pageMetadata(title,description,path);

const faqs=[
 ['What is the house construction cost per sq.ft in Chennai with Bind Builds?',`Our published starting package rates are ${money(packages[0].rate)}, ${money(packages[1].rate)} and ${money(packages[2].rate)} per sq.ft for Essential, Elevate and Signature. These are starting base construction rates. Your final proposal depends on the confirmed built-up area, site, design, specification and exclusions.`],
 ['Is plot area the same as construction area?','No. The planning estimate uses the agreed built-up construction area across the floors being priced. Plot area by itself does not tell you the construction cost. Parking, headroom and other items need to be measured consistently so nothing is counted twice.'],
 ['Are approval charges included in the square-foot rate?','No. Statutory approval charges and related professional or authority fees are outside the published base construction packages unless a project-specific proposal says otherwise.'],
 ['Why can two quotes have different per-square-foot rates?','The number only becomes comparable when the drawings, measured area, material allowances, engineering scope, supervision, exclusions, taxes and external works are also comparable.'],
 ['Does the calculator give a final quotation?','No. It is a planning tool using published package rates and the additional allowances you select. The project-specific proposal follows site review, design development and scope confirmation.']
];

export default function ConstructionCostChennai(){
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 const articleSchema={'@context':'https://schema.org','@type':'Article',headline:title,description,dateModified:updated,datePublished:updated,mainEntityOfPage:site.url+path,author:{'@type':'Organization','@id':site.url+'/#organization',name:site.name},publisher:{'@type':'Organization','@id':site.url+'/#organization',name:site.name}};
 return <Page kicker="CHENNAI / CONSTRUCTION COST GUIDE" title="House construction cost in Chennai.">
  <article className="guidePage">
   <nav className="guideBreadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Construction cost in Chennai</span></nav>
   <header className="guideIntro">
    <span className="productEyebrow">Updated 21 September 2026</span>
    <h2>Start with the rate.<br/><span>Then look behind it.</span></h2>
    <p>A useful Chennai construction budget starts with the built-up area and a written specification. Bind Builds publishes three starting package rates, then separates site-specific work, approvals and additional items so the planning number stays understandable.</p>
    <div className="guideActions"><Link className="cta primary" href="/cost-calculator">Calculate my construction cost ↗</Link><Link className="productTextLink" href="/packages">Compare package specifications →</Link></div>
    <p className="guideSmall">Published rates are planning starting points, not a final quotation. Taxes and exclusions are confirmed in the project proposal.</p>
   </header>

   <section className="guideSection" id="rates">
    <span className="productEyebrow">2026 Bind Builds starting rates</span>
    <h2>Three specifications.<br/><span>One measured area.</span></h2>
    <div className="serviceRates">{packages.map(item=><article key={item.key}><h3>{item.name}</h3><strong>{money(item.rate)}<small> / sq.ft*</small></strong><p>{item.description}</p><Link href={'/packages#'+item.key}>Open {item.name} specification →</Link></article>)}</div>
    <p className="guideSmall">*Base construction starting rate. Land, taxes, approval charges, site-specific work, external works and items outside the selected specification are additional unless the project proposal states otherwise.</p>
   </section>

   <section className="guideSection" id="examples">
    <span className="productEyebrow">Sample Chennai construction budgets</span>
    <h2>What does the area<br/><span>mean in rupees?</span></h2>
    <p>The table below multiplies the same built-up area by each published package rate. It is a base-cost comparison before additional items.</p>
    <div className="guideTableWrap"><table className="guideCostTable"><thead><tr><th>Built-up area</th>{packages.map(item=><th key={item.key}>{item.name}<small>{money(item.rate)} / sq.ft</small></th>)}</tr></thead><tbody>{sizes.map(size=><tr key={size}><th>{size.toLocaleString('en-IN')} sq.ft</th>{packages.map(item=><td key={item.key}>{money(size*item.rate)}</td>)}</tr>)}</tbody></table></div>
    <div className="guideNote"><strong>Formula</strong><p>Base construction estimate = confirmed built-up construction area × selected package rate. Add parking, headroom, approval allowances and other selected items separately where applicable.</p></div>
    <Link href="/cost-calculator" className="productTextLink">Use your actual floor areas in the calculator →</Link>
   </section>

   <section className="guideSection" id="drivers">
    <span className="productEyebrow">What changes the final construction cost</span>
    <h2>The site and scope<br/><span>change the number.</span></h2>
    <div className="documentGrid">{[
      ['01','Built-up area and number of floors','The measured construction area across each floor is the starting quantity. Headroom, parking and terraces need a consistent measurement basis.'],
      ['02','Foundation and soil conditions','Soil investigation, structural design and the actual foundation solution can change the work below ground.'],
      ['03','Material specification and allowances','Flooring, sanitaryware, windows, doors, electrical and other finish allowances differ between package levels.'],
      ['04','Site access and existing conditions','Narrow roads, demolition, difficult storage, dewatering or other site constraints can create project-specific work.'],
      ['05','Approvals and statutory charges','Building-plan approvals, authority fees and related professional work are budgeted separately from the published base rate.'],
      ['06','External and optional works','Compound walls, gates, sumps, recycling systems, solar, lifts and other additions should be priced visibly instead of hidden inside the headline rate.']
    ].map(([n,h,p])=><article key={n}><span>{n}</span><div><h3>{h}</h3><p>{p}</p></div></article>)}</div>
   </section>

   <section className="guideSection" id="compare">
    <span className="productEyebrow">Before comparing builder quotations</span>
    <h2>Compare the same thing.</h2>
    <div className="guideCards three">{[
      ['Area basis','Ask exactly which areas are charged and how parking, headroom, balconies and voids are treated.'],
      ['Specification','Compare brand allowances, quantities, grades, engineering, supervision and drawings—not only ₹/sq.ft.'],
      ['Exclusions','Put approvals, taxes, compound wall, gate, sump, lift, utility connections and site-specific items on one visible list.']
    ].map(([h,p])=><article key={h}><h3>{h}</h3><p>{p}</p></article>)}</div>
    <div className="guideActions"><Link href="/packages" className="productTextLink">Compare Bind Builds packages →</Link><Link href="/house-construction-chennai" className="productTextLink">Read the Chennai house-construction guide →</Link></div>
   </section>

   <section className="guideSection guideFaq" id="faq"><span className="productEyebrow">Construction cost FAQs</span><h2>Questions behind the number.</h2>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

   <section className="guideClosing"><h2>Build a number you can discuss.</h2><p>Enter your plot and floor areas, select the package and add the items relevant to your project.</p><div className="guideActions"><Link className="cta primary" href="/cost-calculator">Build my estimate ↗</Link><a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I would like to discuss the construction cost for my Chennai home.')} target="_blank" rel="noopener noreferrer">Discuss my budget on WhatsApp ↗</a></div></section>
  </article>
  <StructuredData data={[breadcrumbSchema('House construction cost in Chennai',path),articleSchema,faqSchema]}/>
 </Page>;
}
