'use client';
import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { packages } from '@/lib/site';
import { compactMoney, money } from '@/lib/calculator';

const point = (x: number, y: number, z: number) => `${480 + (x - y) * 1.2},${300 + (x + y) * .46 - z}`;
const face = (points: number[][]) => points.map(([x, y, z]) => point(x, y, z)).join(' ');
const modes = ['The plan', 'The structure', 'The home'];
const modeCopy = ['Spaces shaped around your life.', 'Architecture and engineering, in sync.', 'Every detail, brought together.'];
export function HomeHero() {
  const [mode, setMode] = useState(2);
  return <section className="productHero" id="home-hero">
    <div className="productHeroCopy"><span className="productEyebrow">Bind Builds · Architect-led construction · Chennai</span><h1>Your home.<br /><span>Thought through.</span></h1><p>One team. From the first sketch to the final key.</p><div className="productHeroActions"><Link href="/start-a-project" className="cta primary">Plan my home <span aria-hidden="true">↗</span></Link><Link className="productTextLink" href="/cost-calculator">Calculate my construction cost <span aria-hidden="true">→</span></Link></div><div className="productHeroTrust" aria-label="Project enquiry details"><span>~2 minute brief</span><i aria-hidden="true"/><span>No commitment</span><i aria-hidden="true"/><span>English or Tamil</span></div></div>
    <figure className={`architectureScene sceneMode${mode}`} aria-label="An illustrative home concept, shown as a plan, structure or finished home">
      <div className="sceneGlow" aria-hidden="true" />
      <svg viewBox="0 0 1000 610" aria-hidden="true" className="homeObject">
        <defs><linearGradient id="homeGlass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#adbacb"/><stop offset=".46" stopColor="#344556"/><stop offset="1" stopColor="#8c9bae"/></linearGradient><linearGradient id="homeSide" x1="0" x2="1"><stop stopColor="#e3e5e8"/><stop offset="1" stopColor="#bec4cd"/></linearGradient><linearGradient id="homeTop" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#e9ebef"/></linearGradient><filter id="homeShadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter></defs>
        <ellipse cx="519" cy="466" rx="280" ry="65" fill="#b7beca" opacity=".24" filter="url(#homeShadow)"/>
        <polygon className="plotPlane" points={face([[-35,-30,-12],[330,-30,-12],[330,270,-12],[-35,270,-12]])} fill="#eef0f4" stroke="#d4d9e1"/>
        <g className="sceneSiteLines" fill="none" stroke="#c0cbdc" strokeWidth=".8">{[0,75,150,225,300].map(x=><polyline key={'x'+x} points={face([[x,-30,-10],[x,270,-10]])}/>)}{[0,75,150,225].map(y=><polyline key={'y'+y} points={face([[-35,y,-10],[330,y,-10]])}/>)}</g>
        <g className="houseLayer houseGround">
          <polygon points={face([[0,0,0],[300,0,0],[300,230,0],[0,230,0]])} fill="#d5d9df"/>
          <polygon className="houseWall" points={face([[0,230,0],[300,230,0],[300,230,96],[0,230,96]])} fill="url(#homeTop)"/>
          <polygon className="houseWall" points={face([[300,0,0],[300,230,0],[300,230,96],[300,0,96]])} fill="url(#homeSide)"/>
          <polygon className="houseGlass" points={face([[28,231,10],[178,231,10],[178,231,84],[28,231,84]])} fill="url(#homeGlass)"/>
          <polygon className="houseDoor" points={face([[209,231,0],[259,231,0],[259,231,83],[209,231,83]])} fill="#484d53"/>
          <polyline points={face([[246,232,32],[246,232,52]])} stroke="#dadde1" strokeWidth="2"/>
          {[65,103,141].map(x=><polyline key={x} points={face([[x,232,10],[x,232,84]])} stroke="#e1e6ec" strokeWidth="2"/>)}
          <polygon className="houseGlass" points={face([[301,28,17],[301,187,17],[301,187,82],[301,28,82]])} fill="url(#homeGlass)"/>
          {[75,128].map(y=><polyline key={y} points={face([[302,y,17],[302,y,82]])} stroke="#e6e9ef" strokeWidth="2"/>)}
          <polygon points={face([[-7,-7,100],[308,-7,100],[308,237,100],[-7,237,100]])} fill="url(#homeTop)" stroke="#d6dbe3"/>
          <polygon points={face([[-7,237,92],[308,237,92],[308,237,100],[-7,237,100]])} fill="#d3d9e1"/>
        </g>
        <g className="houseLayer houseUpper">
          <polygon className="houseWall" points={face([[18,208,108],[288,208,108],[288,208,207],[18,208,207]])} fill="url(#homeTop)"/>
          <polygon className="houseWall" points={face([[288,12,108],[288,208,108],[288,208,207],[288,12,207]])} fill="url(#homeSide)"/>
          <polygon className="houseGlass" points={face([[40,209,127],[184,209,127],[184,209,190],[40,209,190]])} fill="url(#homeGlass)"/>
          {[88,136].map(x=><polyline key={x} points={face([[x,210,127],[x,210,190]])} stroke="#e6eaf0" strokeWidth="2"/>)}
          <polygon className="houseGlass" points={face([[289,45,127],[289,157,127],[289,157,190],[289,45,190]])} fill="url(#homeGlass)"/>
          <polyline points={face([[290,101,127],[290,101,190]])} stroke="#e6eaf0" strokeWidth="2"/>
          {[218,227,236,245,254,263].map(x=><polyline className="houseFin" key={x} points={face([[x,210,120],[x,210,198]])} stroke="#8b96a6" strokeWidth="3"/>)}
          <polygon points={face([[10,4,212],[296,4,212],[296,216,212],[10,216,212]])} fill="url(#homeTop)" stroke="#ccd3dd"/>
          <polygon points={face([[10,216,204],[296,216,204],[296,216,212],[10,216,212]])} fill="#d5dbe2"/>
          <polygon points={face([[290,4,204],[296,4,204],[296,216,204],[290,216,204]])} fill="#aeb8c5"/>
        </g>
        <g className="houseLayer houseRoof"><polygon points={face([[32,24,222],[275,24,222],[275,192,222],[32,192,222]])} fill="#fafbfc" stroke="#d8dfe8"/><polygon points={face([[66,52,224],[151,52,224],[151,126,224],[66,126,224]])} fill="#d9e4f0" stroke="#aabfd5"/>{[83,101,119,137].map(x=><polyline key={x} points={face([[x,52,225],[x,126,225]])} stroke="#b7c9dc" strokeWidth="1"/>)}</g>
        <g className="houseSkeleton" fill="none" stroke="#0071e3" strokeWidth="1.6">{[0,100,210].map(z=><polygon key={z} points={face([[0,0,z],[300,0,z],[300,230,z],[0,230,z]])}/>)}{[[0,0],[300,0],[300,230],[0,230],[150,230],[300,115]].map(([x,y])=><polyline key={x+'-'+y} points={face([[x,y,0],[x,y,210]])}/>)}<polyline points={face([[0,115,100],[300,115,100],[150,115,100],[150,230,100]])}/></g>
        <g className="housePlan" fill="none" stroke="#0071e3" strokeWidth="2"><polygon points={face([[0,0,6],[300,0,6],[300,230,6],[0,230,6]])}/><polyline points={face([[130,0,6],[130,135,6],[0,135,6]])}/><polyline points={face([[300,115,6],[185,115,6],[185,230,6]])}/><polygon points={face([[20,20,6],[105,20,6],[105,99,6],[20,99,6]])}/><polygon points={face([[214,142,6],[280,142,6],[280,213,6],[214,213,6]])}/><polyline points={face([[150,25,6],[275,25,6],[275,58,6],[150,58,6],[150,25,6]])}/>{[0,1,2,3,4].map(n=><polyline key={n} points={face([[15,160+n*11,6],[70,160+n*11,6]])}/>)}</g>
        <g className="sceneDetail" fill="#a7b5a2"><ellipse cx="229" cy="407" rx="17" ry="9" fill="#d3d8d0"/><path d="M229 404V365" stroke="#819178" strokeWidth="3"/><ellipse cx="227" cy="365" rx="20" ry="28"/><ellipse cx="242" cy="376" rx="14" ry="19" fill="#c2ccb9"/></g>
        <g className="sceneDimension" fill="none" stroke="#9fb1c9" strokeWidth="1"><polyline points={face([[-32,255,-8],[317,255,-8]])}/><polyline points={face([[-32,247,-8],[-32,264,-8]])}/><polyline points={face([[317,247,-8],[317,264,-8]])}/></g>
      </svg>
      <div className="sceneCallout sceneCalloutOne"><span className="sceneDot"/><div><small>01 / Designed around you</small><strong>Life comes first.</strong></div></div><div className="sceneCallout sceneCalloutTwo"><span className="sceneDot"/><div><small>02 / Built as one</small><strong>Every detail connects.</strong></div></div>
      <div className="sceneControls"><div className="segmentedControl" role="group" aria-label="Explore the home concept">{modes.map((label,index)=><button type="button" aria-pressed={mode===index} onClick={()=>setMode(index)} key={label}>{label}</button>)}</div><p aria-live="polite">{modeCopy[mode]}</p></div><figcaption>Illustrative home concept · Explore the thinking behind the build</figcaption>
    </figure>
  </section>;
}

export function DetailIcon({kind}:{kind:'plan'|'connect'|'scope'|'progress'}){
  return <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className={`detailIcon icon-${kind}`}>
    {kind==='plan'&&<><rect x="30" y="20" width="100" height="80" rx="3"/><path d="M30 66H82V20M82 66H130M82 80V100M50 44H65M50 35H65V53H50Z"/><path className="iconAccent" d="M40 80L55 90L70 77"/><circle cx="110" cy="41" r="8" className="iconAccent"/></>}
    {kind==='connect'&&<><path d="M48 38H113V87H48Z" className="iconDashed"/>{[[48,38],[113,38],[113,87],[48,87]].map(([x,y],i)=><g key={i} className={'iconNode node'+i}><rect x={x-13} y={y-13} width="26" height="26" rx="8"/><path d={`M${x-5} ${y}l4 4 7-8`} className="iconAccent"/></g>)}</>}
    {kind==='scope'&&<><path d="M41 96V65M80 96V42M119 96V22" strokeWidth="18" className="iconBars"/><path d="M26 105H135"/><path d="M34 42L70 22L103 10" className="iconAccent"/></>}
    {kind==='progress'&&<><rect x="34" y="18" width="93" height="86" rx="12"/><path d="M34 41H127M49 29H60M105 29H113"/>{[56,74,92].map((y,i)=><g key={y} className={'iconNode node'+i}><path d={`M49 ${y}l4 4 7-8`} className="iconAccent"/><path d={`M73 ${y}H111`}/></g>)}</>}
  </svg>;
}

export function HomeBudget(){
 const [area,setArea]=useState(2000);
 const [selected,setSelected]=useState(1);
 const chosen=packages[selected];
 return <div className="homeBudgetExperience">
   <div className="homeBudgetControl"><div><span className="productEyebrow">Total built-up area</span><output htmlFor="home-area">{area.toLocaleString('en-IN')} <small>sq.ft</small></output></div><label htmlFor="home-area" className="srOnly">Explore the total built-up area</label><input id="home-area" type="range" min="600" max="5000" step="100" value={area} onChange={e=>setArea(Number(e.target.value))}/><div className="rangeEnds"><span>600 sq.ft</span><span>5,000 sq.ft</span></div></div>
   <div className="homePackageGrid">{packages.map((item,index)=><button type="button" key={item.key} className={selected===index?'selected':''} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span className="packageDot"/><span className="homePackageName">{item.name}</span><strong>{compactMoney(area*item.rate)}</strong><span className="homePackageRate">{money(item.rate)} / sq.ft</span><div className="homePackageBar" aria-hidden="true"><i style={{'--bar':`${item.rate/packages[2].rate*100}%`} as CSSProperties}/></div><span className="homePackageDescription">{item.description}</span><span className="packageCheck" aria-hidden="true">{selected===index?'✓':'+'}</span></button>)}</div>
   <div className="homeBudgetBottom"><div aria-live="polite"><strong>{selected===0?'A clear starting point.':`${compactMoney(area*(chosen.rate-packages[0].rate))} above Essential.`}</strong><p>At {area.toLocaleString('en-IN')} sq.ft, for the {chosen.name} specification.</p></div><Link className="cta primary" href={'/cost-calculator?'+new URLSearchParams({package:chosen.name,area:String(area)})}>Build my detailed estimate ↗</Link></div>
   <p className="productFootnote">Illustrative base construction only. Taxes, approvals, site-specific work and other exclusions are additional. The final scope and price need a project-specific proposal.</p>
 </div>;
}
