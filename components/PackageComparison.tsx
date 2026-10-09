'use client';
import Link from 'next/link';
import { useState } from 'react';
import { packages } from '@/lib/site';

export type PackageCategory={no:string;title:string;essential:string[];elevate:string[];signature:string[]};

function Chevron(){
 return <span className="simpleCategoryToggle" aria-hidden="true">
  <svg viewBox="0 0 20 20" focusable="false">
   <path d="M5.25 7.5 10 12.25 14.75 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
 </span>;
}

export default function PackageComparison({categories}:{categories:PackageCategory[]}){
 const [open,setOpen]=useState<Record<string,number[]>>({});
 return <div className="packageCompareExperience">
  <nav className="packageJumpNav" aria-label="Jump to a construction package">
    <span className="packageJumpLabel">Compare the specification</span>
    <div className="packageJumpItems">{packages.map(item=><a key={item.key} href={'#'+item.key} className={'packageJumpItem '+(item.key==='elevate'?'isRecommended':'')}>
      <span>{item.name}</span><strong>₹{item.rate.toLocaleString('en-IN')} <small>/sq.ft</small></strong>
    </a>)}</div>
  </nav>
  <div className="simplePackageGrid">{packages.map((tier,index)=>
  <article id={tier.key} className={'simplePackageCard package-'+tier.key+' '+(tier.key==='elevate'?'featured':'')} key={tier.key}>
   <header className="simplePackageHead">
    <span className="eyebrow">0{index+1} / Starting specification</span>
    <h2>{tier.name}</h2>
    <div className="simplePrice"><strong>₹{tier.rate.toLocaleString('en-IN')}</strong><span>/ sq.ft*</span></div>
    <small className="simpleRateNote">Base construction starting rate · final scope confirmed in your proposal</small>
    <div className="packageCategoryToolbar">
      <span>Explore the specifications</span>
      <button type="button" className="packageExpandAll"
        aria-expanded={(open[tier.key]?.length||0)===categories.length}
        onClick={()=>setOpen(current=>({...current,[tier.key]:(current[tier.key]?.length||0)===categories.length?[]:categories.map((_,i)=>i)}))}>
        {(open[tier.key]?.length||0)===categories.length?'Collapse all':'Expand all'}
      </button>
    </div>
   </header>
   <div className="simpleCategoryList">
    {categories.map((category,i)=>{
     const expanded=open[tier.key]?.includes(i) ?? false;
     const id=tier.key+'-'+i;
     return <div className={'simpleCategory '+(expanded?'isOpen':'')} key={category.no}>
      <button type="button" aria-expanded={expanded} aria-controls={id} onClick={()=>setOpen(current=>{const selected=current[tier.key]||[];return {...current,[tier.key]:expanded?selected.filter(value=>value!==i):[...selected,i]};})}>
       <span className="simpleCategoryTitle">{category.title}</span>
       <Chevron/>
      </button>
      <div id={id} className="simpleCategoryPanel" hidden={!expanded}>
       <ul>{category[tier.key].map(text=><li key={text}>{text}</li>)}</ul>
      </div>
     </div>;
    })}
   </div>
   <Link className="cta packageSelect" href={'/start-a-project?package='+tier.name}>Discuss {tier.name} ↗</Link>
  </article>
 )}</div></div>;
}
