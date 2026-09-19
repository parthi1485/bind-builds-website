'use client';

import { useState } from 'react';

type AssuranceKind = 'engineer' | 'timeline' | 'payment' | 'construction' | 'quality' | 'updates';

const assurance: Array<{
  kind: AssuranceKind;
  short: string;
  eyebrow: string;
  title: string;
  copy: string;
  note: string;
}> = [
  {
    kind: 'engineer',
    short: 'Site engineer',
    eyebrow: 'Site coordination',
    title: 'Dedicated engineering oversight.',
    copy: 'A project engineer coordinates site activity, checks stage requirements and keeps the execution team aligned with the issued drawings.',
    note: 'Supervision frequency and site staffing follow the final project scope and agreement.',
  },
  {
    kind: 'timeline',
    short: 'Timeline',
    eyebrow: 'Planned milestones',
    title: 'A structured project timeline.',
    copy: 'Your build is organised around clear stages, dependencies and review points so you can understand what is happening now and what comes next.',
    note: 'Timelines are project-specific and are updated for approvals, selections, site conditions and agreed changes.',
  },
  {
    kind: 'payment',
    short: 'Payments',
    eyebrow: 'Stage-wise visibility',
    title: 'Payments linked to progress.',
    copy: 'The commercial schedule is broken into agreed milestones. You can see the stage, amount and next payment trigger instead of working with an unclear lump sum.',
    note: 'The signed proposal and construction agreement remain the final commercial reference.',
  },
  {
    kind: 'construction',
    short: 'Construction',
    eyebrow: 'One coordinated route',
    title: 'From drawings to handover.',
    copy: 'Architecture, engineering, procurement coordination, construction and finishing are connected through one architect-led process.',
    note: 'Specialist works, statutory services and client-selected items are handled as defined in the project scope.',
  },
  {
    kind: 'quality',
    short: 'Quality',
    eyebrow: 'Specification control',
    title: 'Materials checked against the scope.',
    copy: 'Approved brands, grades and project specifications are reviewed at procurement and installation stages, with relevant site checks documented along the way.',
    note: 'Final brand, model and grade depend on the selected package, availability and approved project specification.',
  },
  {
    kind: 'updates',
    short: 'Updates',
    eyebrow: 'Progress you can follow',
    title: 'Site updates that keep you connected.',
    copy: 'Progress photos, videos, stage notes and key decisions help you follow the build even when you cannot be at site every day.',
    note: 'Update frequency follows the selected package and project communication plan.',
  },
];

function FeatureIcon({ kind }: { kind: AssuranceKind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 32 32" aria-hidden="true">
    {kind === 'engineer' && <g {...common}><circle cx="16" cy="10" r="4"/><path d="M8 27v-3.2c0-4.8 3.6-7.8 8-7.8s8 3 8 7.8V27"/><path d="M11.5 8.3c.5-3 2.3-4.5 4.5-4.5s4 1.5 4.5 4.5"/></g>}
    {kind === 'timeline' && <g {...common}><rect x="5" y="7" width="22" height="20" rx="4"/><path d="M9 4v6M23 4v6M5 12h22M10 17h4M18 17h4M10 22h4"/></g>}
    {kind === 'payment' && <g {...common}><circle cx="16" cy="16" r="11"/><path d="M12 10h8M12 14h8M13 10c3.8 0 6 1.5 6 4.2 0 2.5-2.1 4.1-6 4.1h-1l7 4.2"/></g>}
    {kind === 'construction' && <g {...common}><path d="M4 15.5 16 5l12 10.5"/><path d="M7.5 14v13h17V14M12 27v-8h8v8"/><path d="M5 10.5 16 1l11 9.5"/></g>}
    {kind === 'quality' && <g {...common}><path d="M16 3 26 7v7c0 7.1-4.1 12.1-10 15-5.9-2.9-10-7.9-10-15V7l10-4Z"/><path d="m11 16 3.2 3.2L21 12.4"/></g>}
    {kind === 'updates' && <g {...common}><path d="M8 7.5A12 12 0 0 0 8 24.5M24 7.5a12 12 0 0 1 0 17M11.5 11a7 7 0 0 0 0 10M20.5 11a7 7 0 0 1 0 10"/><circle cx="16" cy="16" r="2.5"/></g>}
  </svg>;
}

function AssuranceVisual({ kind }: { kind: AssuranceKind }) {
  return <div className={'assuranceVisual visual-' + kind} aria-hidden="true">
    <div className="visualOrb"/>
    {kind === 'engineer' && <svg viewBox="0 0 520 390">
      <path className="avLine" d="M82 335h356M129 335v-75h262v75M184 260v-48h152v48"/>
      <circle className="avSoft" cx="260" cy="145" r="57"/>
      <path className="avStrong" d="M205 137c5-44 27-67 55-67s50 23 55 67M194 137h132"/>
      <path className="avStrong" d="M217 164c9 25 25 38 43 38s34-13 43-38M166 335v-33c0-58 42-94 94-94s94 36 94 94v33"/>
      <path className="avAccent" d="M230 229 260 272l30-43"/>
    </svg>}
    {kind === 'timeline' && <svg viewBox="0 0 520 390">
      <path className="avLine" d="M88 198h344"/>
      {[110,185,260,335,410].map((x,i)=><g key={x}><circle className={i<3?'avAccentFill':'avSoft'} cx={x} cy="198" r="18"/><circle className="avPaper" cx={x} cy="198" r="6"/><path className="avLine" d={'M'+x+' 225v46'}/><rect className="avSoft" x={x-35} y="280" width="70" height="10" rx="5"/><rect className="avSoft" x={x-24} y="300" width="48" height="7" rx="4"/></g>)}
      <path className="avAccent" d="M110 150h150"/>
    </svg>}
    {kind === 'payment' && <svg viewBox="0 0 520 390">
      <rect className="avPaper avStroke" x="98" y="73" width="324" height="244" rx="24"/>
      <circle className="avAccentFill" cx="151" cy="127" r="26"/><path className="avWhite" d="M139 119h24M139 128h24M143 119c12 0 18 4 18 10s-6 10-18 10h-3l20 19"/>
      {[186,222,258].map((y,i)=><g key={y}><rect className={i<2?'avAccentFill':'avSoft'} x="151" y={y} width={i===0?190:i===1?142:86} height="12" rx="6"/><circle className={i<2?'avAccentFill':'avSoft'} cx="126" cy={y+6} r="7"/></g>)}
    </svg>}
    {kind === 'construction' && <svg viewBox="0 0 520 390">
      <path className="avLine" d="m90 256 168-140 172 140M126 233v102h266V233"/>
      <path className="avStrong" d="M169 335v-90h86v90M293 258h60v54h-60z"/>
      <path className="avAccent" d="M77 224 258 73l184 151"/>
      <path className="avSoftFill" d="M111 335h298v18H111z"/>
    </svg>}
    {kind === 'quality' && <svg viewBox="0 0 520 390">
      <path className="avSoftFill" d="M94 270h116v64H94zM220 230h98v104h-98zM328 252h96v82h-96z"/>
      <path className="avStrong" d="m260 66 91 34v64c0 72-36 125-91 158-55-33-91-86-91-158v-64l91-34Z"/>
      <path className="avAccent" d="m217 184 30 30 60-69"/>
      <path className="avLine" d="M73 334h374"/>
    </svg>}
    {kind === 'updates' && <svg viewBox="0 0 520 390">
      <rect className="avPaper avStroke" x="154" y="42" width="212" height="310" rx="30"/>
      <rect className="avSoftFill" x="180" y="83" width="160" height="82" rx="14"/>
      <path className="avStrong" d="M197 145v-24l25-20 24 20v24M219 145v-16h9v16"/>
      <rect className="avSoft" x="180" y="190" width="94" height="10" rx="5"/>
      <rect className="avSoft" x="180" y="213" width="140" height="8" rx="4"/>
      <rect className="avAccentFill" x="180" y="251" width="160" height="54" rx="15"/>
      <path className="avWhite" d="m205 278 12 12 24-26M260 270h55M260 288h39"/>
    </svg>}
  </div>;
}

export function BuildAssurance() {
  const [active, setActive] = useState(0);
  const item = assurance[active];

  return <section className="productSection assuranceSection" id="build-assurance">
    <div className="productSectionHeader reveal">
      <span className="productEyebrow">The build, made easier to follow</span>
      <h2>Clarity at every<br/><span>stage of construction.</span></h2>
      <p>Six parts of the experience that keep your project coordinated, visible and easier to understand.</p>
    </div>

    <div className="assuranceExperience reveal">
      <div className="assuranceTabs" role="tablist" aria-label="Construction experience">
        {assurance.map((feature, index) => <button
          key={feature.kind}
          type="button"
          role="tab"
          aria-selected={active === index}
          aria-controls="assurance-panel"
          onClick={() => setActive(index)}
        >
          <span className="assuranceTabIcon"><FeatureIcon kind={feature.kind}/></span>
          <span>{feature.short}</span>
          <small>0{index + 1}</small>
        </button>)}
      </div>

      <article className="assurancePanel" id="assurance-panel" role="tabpanel" aria-live="polite">
        <div className="assuranceCopy">
          <span className="productEyebrow">{item.eyebrow}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <div className="assuranceNote"><span>i</span><p>{item.note}</p></div>
        </div>
        <AssuranceVisual kind={item.kind}/>
      </article>
    </div>
  </section>;
}

type BrandLogo = {
  key: string;
  name: string;
  src?: string;
  tone?: 'dark' | 'blue' | 'orange' | 'burgundy' | 'green' | 'red';
  label?: string;
};

const materialBrands: BrandLogo[] = [
  { key: 'ultratech', name: 'UltraTech Cement', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UltraTech_logo.jpg', tone: 'blue' },
  { key: 'jsw', name: 'JSW Steel', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/JSW_Group_logo.svg', tone: 'blue' },
  { key: 'tata', name: 'Tata Tiscon', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tata_Steel_Logo.svg', tone: 'blue' },
  { key: 'kohler', name: 'Kohler', src: 'https://www.kohler.co.in/content/dam/kohler-site/global/kps/logos/kohler-logo-black.svg', tone: 'dark' },
  { key: 'sites', name: 'Sites', tone: 'dark', label: 'Sites' },
  { key: 'parryware', name: 'Parryware', src: 'https://www.parryware.in/wp-content/uploads/2023/10/Parryware-Logo.svg', tone: 'blue' },
  { key: 'nippon', name: 'Nippon Paint', src: 'https://www.nipponpaint.co.in/wp-content/themes/nippon/images/logo.png', tone: 'orange' },
  { key: 'asian-paints', name: 'Asian Paints', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Asian_Paints_Logo.svg', tone: 'orange' },
  { key: 'kajaria', name: 'Kajaria', src: 'https://www.kajariaceramics.com/assets/images/logo.svg', tone: 'blue' },
  { key: 'jaquar', name: 'Jaquar', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Official_Jaquar_Group_Logo.png', tone: 'blue' },
  { key: 'lag', name: 'LAG', tone: 'dark', label: 'LAG' },
  { key: 'ars-steel', name: 'ARS Steel', tone: 'blue', label: 'ARS Steel' },
  { key: 'orbit', name: 'Orbit', tone: 'orange', label: 'ORBIT' },
  { key: 'finolex', name: 'Finolex', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Finolex_Logo.svg', tone: 'blue' },
  { key: 'ashirvad', name: 'Ashirvad', src: 'https://ashirvad.com/wp-content/themes/ashirvad/assets/images/logo.svg', tone: 'orange' },
  { key: 'astral', name: 'Astral', src: 'https://www.astralpipes.com/wp-content/themes/astral/assets/images/logo.svg', tone: 'blue' },
  { key: 'gm-switches', name: 'GM Switches', src: 'https://www.gmmodular.com/assets/images/logo.svg', tone: 'red' },
  { key: 'legrand', name: 'Legrand Switches', src: 'https://www.legrand.co.in/themes/custom/legrand/logo.svg', tone: 'red', label: 'legrand' },
];

const lenders: BrandLogo[] = [
  { key: 'sbi', name: 'State Bank of India', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/State_Bank_of_India.svg', tone: 'blue' },
  { key: 'hdfc', name: 'HDFC Bank', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/HDFC_Bank_Logo.svg', tone: 'blue' },
  { key: 'icici', name: 'ICICI Bank', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ICICI_Bank_Logo.svg', tone: 'orange' },
  { key: 'axis', name: 'Axis Bank', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Axis_Bank_logo.svg', tone: 'burgundy' },
  { key: 'bob', name: 'Bank of Baroda', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bank_of_Baroda_logo.svg', tone: 'orange' },
];

function LogoCard({ brand }: { brand: BrandLogo }) {
  const [failed, setFailed] = useState(!brand.src);
  return <span className={'brandWordmark brand-' + brand.key + (failed ? ' isFallback' : '')}>
    {!failed && brand.src ? (
      <img
        src={brand.src}
        alt={brand.name}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    ) : (
      <span className={'brandTextLogo tone-' + (brand.tone ?? 'dark')}>{brand.label ?? brand.name}</span>
    )}
  </span>;
}

function Marquee({ items, reverse = false }: { items: BrandLogo[]; reverse?: boolean }) {
  const repeated = [...items, ...items];
  return <div className={'brandMarquee' + (reverse ? ' reverse' : '')} aria-label={items.map(item => item.name).join(', ')}>
    <div className="brandMarqueeTrack">
      {repeated.map((brand, index) => <div className="brandWordmarkWrap" key={brand.key + index} aria-hidden={index >= items.length}><LogoCard brand={brand}/></div>)}
    </div>
  </div>;
}

export function BrandEcosystem() {
  return <section className="productSection ecosystemSection">
    <div className="ecosystemIntro reveal">
      <div>
        <span className="productEyebrow">Project ecosystem</span>
        <h2>Trusted vendors.<br/><span>Banking partners.</span></h2>
      </div>
      <p>Reference brands and financial institutions commonly considered while planning, specifying and delivering residential construction projects.</p>
    </div>

    <div className="ecosystemBlock reveal">
      <div className="ecosystemLabel"><span>01</span><div><strong>Trusted vendors</strong><small>Materials, fittings, paint, piping, steel, switches and sanitaryware considered across project specifications.</small></div></div>
      <Marquee items={materialBrands}/>
    </div>

    <div className="ecosystemBlock reveal">
      <div className="ecosystemLabel"><span>02</span><div><strong>Banking partners</strong><small>Major lenders homeowners may explore for construction finance and home-loan support.</small></div></div>
      <Marquee items={lenders} reverse/>
    </div>

    <p className="ecosystemDisclaimer">Brand and lender selection depend on the final specification, project scope, local availability, client approval, eligibility and lender terms. Displayed names are reference ecosystems and do not imply an exclusive partnership or endorsement.</p>
  </section>;
}
