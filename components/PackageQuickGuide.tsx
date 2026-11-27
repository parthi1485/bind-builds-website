'use client';
import { usePackagePlanner } from './PackagePlannerState';
import Link from 'next/link';
import { packages } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';
import type { PackageCategory } from '@/components/PackageComparison';

type PackageKey = 'essential' | 'elevate' | 'signature';
const personas: Record<PackageKey,{title:string;who:string}> = {
 essential:{title:'Considered essentials',who:'Practical finishes for a family home.'},
 elevate:{title:'Balanced specification',who:'Greater allowances and more coordinated support.'},
 signature:{title:'Personalised finishes',who:'Premium materials and detailing.'}
};
export default function PackageQuickGuide({categories}:{categories:PackageCategory[]}){
 const { area, setArea, setTier, selected, valid, amount, estimateUrl } = usePackagePlanner();
 const spec=(n:string,t:PackageKey,index=0)=>categories.find(c=>c.no===n)?.[t][index]||'Refer to the complete specification below';
 return <section className="packageDecisionSection" aria-labelledby="package-decision-title">
  <div className="packageDecisionHeader"><span className="eyebrow">Choose with confidence / 01—03</span><h2 id="package-decision-title">Three clear starting points.<br/><span>One considered approach.</span></h2><p>Choose a specification, compare the key differences, then explore the full details below.</p></div>
  <div className="packageDecisionGrid">{packages.map((p,index)=><button type="button" className={'packageDecisionCard'+(selected.key===p.key?' isSelected':'')} key={p.key} aria-pressed={selected.key===p.key} onClick={()=>{setTier(index);trackEvent('package_preference_preview',{package_name:p.name});}}>
   <span className="packageDecisionCardTop"><span>{p.name}</span><span aria-hidden="true">{selected.key===p.key?'✓':'↗'}</span></span>
   <strong className="packageDecisionRate">₹{p.rate.toLocaleString('en-IN')} <small>/ sq.ft*</small></strong>
   <span className="packageDecisionPersona">{personas[p.key].title}</span>
   <span className="packageDecisionWho">{personas[p.key].who}</span>
   <span className="packageDecisionSpec">Flooring: {spec('05',p.key)}</span>
  </button>)}</div>
  <div className="packageDecisionResult"><div><label htmlFor="package-decision-area">Total built-up area (all floors) · sq.ft</label><input id="package-decision-area" type="number" min="1" max="100000" step="1" inputMode="numeric" value={area} onChange={e=>setArea(e.target.value)} aria-invalid={!valid}/>{!valid&&<small role="alert">Enter a whole number from 1 to 100,000 sq.ft.</small>}</div><div className="packageDecisionEstimate"><span>Indicative {selected.name} base construction</span><output aria-live="polite">{valid?'₹'+(amount*selected.rate/100000).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})+' lakh':'Enter your area'}</output><p>Same area, different specifications. Taxes, approvals, separately priced works and site conditions are extra as applicable.</p></div>{valid&&<Link className="cta primary" href={estimateUrl}>Build my detailed estimate ↗</Link>}</div>
  <p className="packageDecisionFootnote">*Published base starting rates. Package inclusions, material brands, quantities, taxes and exclusions are confirmed in a project-specific proposal. All structural design must follow applicable professional and engineering requirements.</p>
 </section>;
}
