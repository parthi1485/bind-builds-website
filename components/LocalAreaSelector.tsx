'use client';
import { useState } from 'react';
import Link from 'next/link';
import { whatsappUrl } from '@/lib/site';

export default function LocalAreaSelector({areas}:{areas:string[]}){
 const [selected,setSelected]=useState(areas[0] ?? '');
 if(!selected) return null;
 return <div className="localAreaSelector" id="choose-project-locality">
  <fieldset>
   <legend>Where is your plot?</legend>
   <div className="localAreaSelectorChoices">
    {areas.map(name=><button type="button" key={name} aria-pressed={selected===name} onClick={()=>setSelected(name)}>{name}</button>)}
   </div>
  </fieldset>
  <div className="guideActions">
   <Link className="cta primary" href={'/start-a-project?location='+encodeURIComponent(selected+', Chennai')}>Discuss my {selected} site ↗</Link>
   <a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I have a site in '+selected+', Chennai. I would like to discuss an architect-led construction project.')} target="_blank" rel="noopener noreferrer">WhatsApp site details ↗</a>
  </div>
  <p className="guideSmall">We will carry your chosen location into the project enquiry. You can correct the address in the form before submitting. Site visits depend on project fit and current availability.</p>
 </div>;
}
