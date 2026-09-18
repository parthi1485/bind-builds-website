'use client';
import { useRef } from 'react';
import { storyImages } from '@/lib/story-images';
export type StoryStep={title:string;body?:string;output?:string;image?:number};
export default function StoryTiles({steps,label}:{steps:StoryStep[];label:string}){
 const rail=useRef<HTMLDivElement>(null);
 const move=(direction:number)=>{const el=rail.current;if(el)el.scrollBy({left:direction*(el.querySelector('article')?.getBoundingClientRect().width??320)+direction*20,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
 return <div className="storyCollection"><div className="storyRail" ref={rail} role="region" aria-label={label} tabIndex={0}>{steps.map((step,index)=><article className={`storyTile storyTone${index%3}`} key={step.title}><div className="storyPicture"><img src={storyImages[step.image??index%storyImages.length]} alt="" width="900" height="1100" loading="lazy" decoding="async"/><span className="storyNumber">{String(index+1).padStart(2,'0')}</span><div className="storyPictureCopy"><span>{label}</span><h3>{step.title}</h3></div></div><div className="storyText">{step.body&&<p>{step.body}</p>}{step.output&&<details><summary>What you receive <span aria-hidden="true">+</span></summary><p>{step.output}</p></details>}</div></article>)}</div><div className="storyRailFooter"><p>Illustrative architecture imagery · Explore every step</p><div><button type="button" aria-label={`Previous ${label} cards`} onClick={()=>move(-1)}>←</button><button type="button" aria-label={`Next ${label} cards`} onClick={()=>move(1)}>→</button></div></div></div>;
}
