'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function Motion(){
 const pathname=usePathname();
 const [paused,setPaused]=useState(false);
 const [reduced,setReduced]=useState(false);
 useEffect(()=>{const preference=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(preference.matches);update();preference.addEventListener('change',update);return()=>preference.removeEventListener('change',update);},[]);
 useEffect(()=>{
  const stopped=paused||reduced;
  document.documentElement.dataset.motion=stopped?'paused':'running';
  if(stopped)return;
  const elements=[...document.querySelectorAll<HTMLElement>('.reveal')];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('inView');observer.unobserve(entry.target);}}),{threshold:.1});
  elements.forEach(element=>observer.observe(element));
  const hero=document.querySelector<HTMLElement>('.homeObject');
  const progress=document.querySelector<HTMLElement>('.readingProgress');
  const desktop=window.matchMedia('(min-width:900px) and (pointer:fine)').matches;
  let frame=0;
  const paint=()=>{frame=0;const height=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.transform=`scaleX(${height>0?Math.min(1,window.scrollY/height):0})`;if(desktop&&hero){const rect=hero.getBoundingClientRect();if(rect.bottom>0&&rect.top<window.innerHeight)hero.style.setProperty('--hero-drift',`${Math.min(window.scrollY,600)*.04}px`);}};
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(paint);};onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
  return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);if(hero)hero.style.removeProperty('--hero-drift');if(progress)progress.style.transform='';};
 },[pathname,paused,reduced]);
 return <><div className="readingProgress" aria-hidden="true"/><button className="motionToggle" type="button" onClick={()=>setPaused(!paused)} disabled={reduced} aria-pressed={paused||reduced} aria-label={reduced?'Motion reduced by your device setting':paused?'Enable decorative motion':'Pause decorative motion'} title={reduced?'Respects your reduced-motion setting':paused?'Enable motion':'Pause motion'}><svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">{paused||reduced?<path d="M6 3L16 10L6 17Z" fill="currentColor"/>:<><rect x="5" y="4" width="3" height="12" rx="1" fill="currentColor"/><rect x="12" y="4" width="3" height="12" rx="1" fill="currentColor"/></>}</svg><span>{reduced?'Reduced motion':paused?'Motion off':'Motion on'}</span></button></>;
}
