'use client';
import Link from 'next/link';
import { useState } from 'react';
import { packages } from '@/lib/site';
export type PackageCategory={no:string;title:string;essential:string[];elevate:string[];signature:string[]};
export default function PackageComparison({categories}:{categories:PackageCategory[]}){
 const [open,setOpen]=useState<Record<string,number>>({});
 return <div className="simplePackageGrid">{packages.map((tier,index)=><article id={tier.key} className={'simplePackageCard package-'+tier.key+' '+(tier.key==='elevate'?'featured':'')} key={tier.key}><header className="simplePackageHead"><span className="eyebrow">0{index+1} / Starting specification</span><h2>{tier.name}</h2><div className="simplePrice"><strong>₹{tier.rate.toLocaleString('en-IN')}</strong><span>/ sq.ft*</span></div><small className="simpleRateNote">Base construction starting rate · final scope confirmed in your proposal</small><p>EXPLORE WHAT’S INCLUDED</p></header><div>{categories.map((category,i)=>{const expanded=open[tier.key]===i;const id=tier.key+'-'+i;return <div className="simpleCategory" key={category.no}><button type="button" aria-expanded={expanded} aria-controls={id} onClick={()=>setOpen(current=>({...current,[tier.key]:expanded?-1:i}))}><span>{category.title}</span><b aria-hidden="true">{expanded?'−':'+'}</b></button><div id={id} className="simpleCategoryPanel" hidden={!expanded}><ul>{category[tier.key].map(text=><li key={text}>{text}</li>)}</ul></div></div>})}</div><Link className="cta packageSelect" href={'/start-a-project?package='+tier.name}>Discuss {tier.name} ↗</Link></article>)}</div>;
}
