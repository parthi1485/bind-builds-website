'use client';
import { useState } from 'react';
import Link from 'next/link';
import { packages } from '@/lib/site';
export default function BudgetPlanner(){
 const [area,setArea]=useState('2000');
 const [tier,setTier]=useState(0);
 const amount=Number(area);
 const valid=Number.isFinite(amount)&&amount>=1&&amount<=100000&&Number.isInteger(amount);
 const selected=packages[tier];
 return <section id="budget-planner" className="budgetPlanner"><div><span className="eyebrow">A starting point / Budget planner</span><h2>Get a feel for<br />your construction budget.</h2><p>Use the total built-up area across all floors. This is a base construction calculation, not an all-inclusive estimate or an offer.</p><label htmlFor="budget-area">Total built-up area (sq.ft)</label><input id="budget-area" type="number" inputMode="numeric" min="1" max="100000" step="1" value={area} onChange={e=>setArea(e.target.value)} aria-invalid={!valid} aria-describedby={!valid?'area-error':undefined}/>{!valid&&<p id="area-error" className="fieldError">Enter a whole area between 1 and 100,000 sq.ft.</p>}<fieldset><legend>Specification</legend><div className="filterButtons">{packages.map((item,index)=><button type="button" key={item.key} aria-pressed={tier===index} onClick={()=>setTier(index)}>{item.name}</button>)}</div></fieldset></div><div className="budgetResult"><span className="eyebrow">Indicative base construction</span><output aria-live="polite">{valid?'₹'+(amount*selected.rate/100000).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})+' lakh':'Enter an area'}</output><p>{valid?amount.toLocaleString('en-IN')+' sq.ft × ₹'+selected.rate.toLocaleString('en-IN')+' / sq.ft': 'Choose your approximate built-up area.'}</p><ul><li>Based on published starting rates</li><li>Final scope, quantities and rates need a proposal</li><li>Allow separately for taxes, approvals, excluded works and site-specific requirements</li></ul>{valid&&<Link className="cta primary" href={'/start-a-project?package='+selected.name+'&area='+amount}>Discuss this with an architect ↗</Link>}</div></section>;
}
