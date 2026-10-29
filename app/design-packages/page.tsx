import Link from 'next/link';
import {Nav, Footer} from '@/components/Site';
import {pageMetadata,breadcrumbSchema} from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
import {site} from '@/lib/site';
import './design-packages.css';

export const metadata=pageMetadata(
 'Architectural Design Packages & Prices in Chennai',
 'Compare START ₹40, BUILD ₹90, ELEVATE ₹150 and REFINE ₹250 per sq.ft architectural design packages, deliverables, consultations and timelines.',
 '/design-packages'
);

const tiers=[
 {key:'start',name:'START',rate:40,days:7,visits:2,kind:'Concept design',summary:'Floor planning and exterior concepts.'},
 {key:'build',name:'BUILD',rate:90,days:21,visits:3,kind:'Concept + working drawings',summary:'Detailed architectural and engineering documents.'},
 {key:'elevate',name:'ELEVATE',rate:150,days:30,visits:6,kind:'Concept + drawings + interiors',summary:'Technical drawings with interior design visuals.'},
 {key:'refine',name:'REFINE',rate:250,days:50,visits:12,kind:'Comprehensive design consultancy',summary:'Extended design, selections, budgets and approval drawings.'}
] as const;

const groups=[
 {title:'01 / Planning & visualisation',features:[
  ['2D floor plans for all levels',0,'Rooms, circulation and spatial arrangement'],
  ['2D furniture layout plans',0,'Furniture placement and functionality'],
  ['3D exterior elevation views',0,'Exterior design visualisation'],
  ['Detailed elevation drawings (2D)',1,'Dimensioned façade drawings'],
  ['3D floor-wise spatial layouts',1,'Three-dimensional floor visualisations']
 ]},
 {title:'02 / Technical drawings & site',features:[
  ['Detailed construction drawings (all floors)',1,'Drawings used for construction coordination'],
  ['Electrical layouts (all floors)',1,'Lights, switches and sockets'],
  ['Plumbing layouts (all floors)',1,'Supply and drainage planning'],
  ['Soil test & site-condition report',1,'Soil and site investigation within agreed scope'],
  ['Structural design drawings',1,'Columns, beams and slabs; with a qualified engineer'],
  ['Site visit & measurement plan',1,'Site assessment and measured site information']
 ]},
 {title:'03 / Interiors & landscape',features:[
  ['Interior 3D visuals — all rooms',2,'Room-by-room interior visualisations'],
  ['Interior working drawings (2D)',2,'Execution drawings for interiors'],
  ['Material selection & brand suggestions',3,'Recommended finishes and products'],
  ['Landscape design concepts',3,'Garden, driveway and outdoor concepts']
 ]},
 {title:'04 / Approvals & costing',features:[
  ['Drawings for government approval',3,'Drawing set for local-authority submission'],
  ['Estimated construction cost',3,'Preliminary project cost guidance'],
  ['Estimated interior budget',3,'Preliminary fit-out budget guidance']
 ]}
] as const;

const enquiry=(name:string,rate:number)=>'/start-a-project?'+new URLSearchParams({
 type:'Architectural design',
 package:'Design '+name,
 notes:'Design consultancy enquiry: '+name+' package, listed at ₹'+rate+'/sq.ft. Please discuss scope, drawings, timelines and professional fees.'
}).toString();

export default function DesignPackages(){
 const offers={'@context':'https://schema.org','@type':'Service',name:'Architectural design packages',serviceType:'Architectural design consultancy',url:site.url+'/design-packages',provider:{'@type':'Organization',name:'Studio Bind Architects',url:site.portfolio},hasOfferCatalog:{'@type':'OfferCatalog',name:'Architectural design packages',itemListElement:tiers.map(t=>({'@type':'Offer',name:t.name+' design package',priceCurrency:'INR',priceSpecification:{'@type':'UnitPriceSpecification',price:t.rate,priceCurrency:'INR',unitText:'per square foot'},url:site.url+'/design-packages#design-'+t.key}))}};
 return <><Nav/><main id="main-content" className="designPackagesPage">
  <StructuredData data={[breadcrumbSchema('Design Packages','/design-packages'),offers]}/>
  <header className="designHero">
   <div className="designHeroCopy"><span className="designEyebrow">STUDIO BIND ARCHITECTS / DESIGN CONSULTANCY</span>
    <h1>Design packages.<br/><span>Clearly defined.</span></h1>
    <p>From the first floor plan to detailed drawings and interiors. Choose the design scope your project needs.</p>
    <a className="designButton" href="#design-tiers">Explore packages <span aria-hidden="true">↗</span></a>
    <Link className="designSecondaryLink" href="/packages">Looking for construction? View construction packages →</Link>
   </div>
   <div className="designHeroDrawing" role="img" aria-label="Technical line drawing of a conceptual building with elevation and construction geometry">
    <div className="designDrawingTop"><span>DESIGN STUDY / 01</span><span>PLAN · DRAW · DETAIL</span></div>
    <svg viewBox="0 0 540 435" fill="none" aria-hidden="true" focusable="false"><g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M81 340V135L282 53L468 123V344L282 403Z"/><path d="M81 135L282 211L468 123M282 211V403"/><path d="M105 166V325L254 370V233ZM309 234V372L444 329V161Z"/><path d="M105 206L254 254M105 251L254 296M105 295L254 341M309 271L444 222M309 314L444 271M309 349L444 314"/><path d="M140 180V335M181 195V348M222 215V360M349 221V356M398 190V342"/><path d="M52 121L282 29L496 111M51 359L282 431L496 359"/></g><g stroke="currentColor" strokeWidth=".75" opacity=".45"><path d="M0 15H540M0 95H540M0 175H540M0 255H540M0 335H540M0 415H540M40 0V435M120 0V435M200 0V435M280 0V435M360 0V435M440 0V435M520 0V435"/></g></svg>
    <span className="designDrawingFoot">Architectural thinking / documented</span>
   </div>
  </header>
  <section className="designPackagesBand" id="design-tiers" aria-labelledby="design-tier-heading">
   <div className="designSectionIntro"><span className="designEyebrow">01 / THE PACKAGES</span><h2 id="design-tier-heading">Four starting points.</h2><p>Choose based on the work you need, not only the price.</p></div>
   <div className="designTierGrid">{tiers.map((tier,index)=><article className="designTier" id={'design-'+tier.key} key={tier.key}>
    <div className="designTierTop"><span>{String(index+1).padStart(2,'0')} / DESIGN</span><span>{tier.kind}</span></div>
    <h3>{tier.name}</h3><div className="designRate">₹{tier.rate.toLocaleString('en-IN')}<small> / sq.ft*</small></div>
    <p>{tier.summary}</p>
    <div className="designTierMeta"><span><strong>{tier.days}</strong> working days</span><span>Max <strong>{tier.visits}</strong> consultations</span></div>
    <a className="designTierLink" href={enquiry(tier.name,tier.rate)}>Get started <span aria-hidden="true">↗</span></a>
   </article>)}</div>
   <p className="designDisclaimer">*Rates apply to total built-up area, for projects of at least 1,500 sq.ft. Applicable GST is additional. Final fees and scope are confirmed in a written design proposal.</p>
  </section>
  <section className="designScopeBand" id="design-inclusions" aria-labelledby="design-scope-heading">
   <div className="designSectionIntro"><span className="designEyebrow">02 / DESIGN DELIVERABLES</span><h2 id="design-scope-heading">What each package includes.</h2><p>The complete comparison from your reference, organised by deliverable. Scroll the table sideways on smaller screens.</p></div>
   <div className="designTableHolder" role="region" aria-label="Design package comparison, horizontally scrollable" tabIndex={0}>
    <table className="designComparison"><thead><tr><th scope="col">Deliverable</th>{tiers.map(t=><th scope="col" key={t.key}><strong>{t.name}</strong><small>₹{t.rate}/sq.ft</small></th>)}</tr></thead>
     {groups.map(group=><tbody key={group.title}><tr className="designTableGroup"><th scope="colgroup" colSpan={5}>{group.title}</th></tr>
      {group.features.map(([title,min,description])=><tr key={title}><th scope="row">{title}<small>{description}</small></th>
       {tiers.map((tier,i)=><td key={tier.key}><span className={i>=min?'designIncluded':'designExcluded'} aria-label={i>=min?'Included':'Not included'}>{i>=min?'✓':'—'}</span></td>)}</tr>)}
     </tbody>)}
     <tbody><tr className="designTableGroup"><th scope="colgroup" colSpan={5}>05 / Consultations & delivery</th></tr>
      <tr><th scope="row">Maximum in-person office consultations</th>{tiers.map(t=><td key={t.key}>{t.visits}</td>)}</tr>
      <tr><th scope="row">Indicative design delivery timeline</th>{tiers.map(t=><td key={t.key}>{t.days} working days</td>)}</tr>
     </tbody>
    </table>
   </div>
  </section>
  <section className="designTermsBand" aria-labelledby="design-terms-heading"><div className="designTermsIntro"><span className="designEyebrow">03 / IMPORTANT DETAILS</span><h2 id="design-terms-heading">A clear scope, from day one.</h2></div>
   <div className="designTermsList">
    <div><strong>Minimum size</strong><p>1,500 sq.ft total built-up area across floors.</p></div>
    <div><strong>Design only</strong><p>Construction, site supervision and ongoing construction monitoring are not included.</p></div>
    <div><strong>Additional fees</strong><p>Applicable GST, extra site visits, statutory approval charges and work outside the agreed scope are billed separately.</p></div>
    <div><strong>Timelines</strong><p>Working-day estimates assume timely client inputs and exclude authority processing time and other external delays.</p></div>
   </div>
  </section>
  <section className="designFinalCta"><span className="designEyebrow">04 / BEGIN</span><h2>Start with the<br/><span>right drawings.</span></h2><p>Discuss a design-only engagement before you commit to construction.</p><a className="designButton" href={enquiry('BUILD',90)}>Request a design proposal <span aria-hidden="true">↗</span></a><Link className="designSecondaryLink" href="/packages">Explore construction packages →</Link></section>
 </main><Footer/></>;
}
