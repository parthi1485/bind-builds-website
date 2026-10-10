'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculatePlotPlanning, plotPlanningBrief } from '@/lib/plot-planning';
import { approvalSources } from '@/lib/approval-guide';
import { whatsappUrl } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

const format = (value: number) => value.toLocaleString('en-IN', { maximumFractionDigits: 2 });

export default function PlotPlanningWorksheet() {
  const [frontage, setFrontage] = useState('30');
  const [depth, setDepth] = useState('40');
  const [levelArea, setLevelArea] = useState('750');
  const [levels, setLevels] = useState(2);
  const [locality, setLocality] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const values = { frontageFt: Number(frontage), depthFt: Number(depth), illustrativeCountedAreaPerLevel: Number(levelArea), levels };
  // Reject empty fields before converting: Number('') would incorrectly become zero.
  const result = frontage.trim() && depth.trim() && levelArea.trim() ? calculatePlotPlanning(values) : null;
  const brief = result ? plotPlanningBrief(values, result, locality) : '';
  const enquiry = result ? '/start-a-project?' + new URLSearchParams({ location: locality.trim().slice(0, 120), type: 'New home', notes: brief }) : '/start-a-project';
  const log = (action: string) => trackEvent('plot_planning_action', { action, levels, has_locality: Boolean(locality.trim()) });
  const copy = async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus('Planning scenario copied. You can paste it into a conversation.');
      log('copy_scenario');
    } catch { setCopyStatus('Copy unavailable. Use the enquiry or WhatsApp option below.'); }
  };

  return <section className="plotWorksheet guideSection" id="plot-worksheet" aria-labelledby="plotWorksheetTitle">
    <div className="plotWorksheetIntro">
      <div>
        <span className="productEyebrow">Interactive learning tool / No sign-up</span>
        <h2 id="plotWorksheetTitle">Your plot area.<br/><span>One clearer planning conversation.</span></h2>
        <p>Try an illustrative floor-area scenario. Understand the arithmetic behind an FSI ratio, then take the right questions to your architect or planning professional.</p>
      </div>
      <p className="plotWorksheetAside">This is a <strong>learning exercise</strong>, not a permitted FSI calculation, building feasibility result or approval decision. Your official counted floor area can differ from the example below.</p>
    </div>
    <div className="plotWorksheetBody">
      <div className="plotWorksheetInputs">
        <span className="productEyebrow">01 / Describe the plot</span>
        <div className="plotWorksheetFieldGrid">
          <label>Frontage <small>feet</small><input type="number" min="5" max="1000" step="any" inputMode="decimal" value={frontage} onChange={e=>{setFrontage(e.target.value);setCopyStatus('');}} /></label>
          <label>Depth <small>feet</small><input type="number" min="5" max="1000" step="any" inputMode="decimal" value={depth} onChange={e=>{setDepth(e.target.value);setCopyStatus('');}} /></label>
        </div>
        <label>General site locality <small>(optional, not an authority lookup)</small><input type="text" maxLength={120} autoComplete="address-level2" placeholder="e.g. Porur, Chennai" value={locality} onChange={e=>{setLocality(e.target.value);setCopyStatus('');}} /></label>
        <span className="productEyebrow">02 / Test an illustrative floor-area scenario</span>
        <fieldset className="plotWorksheetFloors"><legend>Number of example levels</legend><div>{[1,2,3,4].map(n=><label key={n}><input type="radio" name="planning-levels" checked={levels===n} onChange={()=>{setLevels(n);setCopyStatus('');}} /><span>{n===1?'Ground only':`G + ${n-1}`}</span></label>)}</div></fieldset>
        <label>Assumed FSI-counted floor area <small>sq.ft per level</small><input type="number" min="1" max="1000000" step="any" inputMode="decimal" value={levelArea} onChange={e=>{setLevelArea(e.target.value);setCopyStatus('');}} /></label>
        <p className="plotWorksheetHint">For learning, we use the <strong>same assumed counted area on every selected level</strong>. This is not the construction built-up area or an assertion about exemptions.</p>
      </div>
      <div className="plotWorksheetResults" aria-label="Illustrative planning figures">
        <span className="productEyebrow">Your live example</span>
        {result ? <>
          <div className="plotWorksheetBigResult"><span>Illustrative FSI ratio</span><output aria-live="polite" aria-atomic="true" aria-label="Illustrative area ratio">{result.illustrativeRatio.toFixed(2)}<small> : 1</small></output><p><strong>Not permitted FSI.</strong> This only divides the example counted floor area by the geometric plot area.</p></div>
          <div className="plotWorksheetStats"><div><span>Geometric plot area</span><strong>{format(result.plotAreaSqft)} <small>sq.ft</small></strong></div><div><span>Example counted floor area</span><strong>{format(result.exampleCountedAreaSqft)} <small>sq.ft</small></strong></div></div>
          <p className="plotWorksheetFormula">{format(result.exampleCountedAreaSqft)} ÷ {format(result.plotAreaSqft)} = {result.illustrativeRatio.toFixed(2)}</p>
          {result.areaExceedsPlot&&<p className="plotWorksheetWarning" role="status">The assumed per-level area is greater than the rectangular plot area. Recheck this illustration with your professional; this is not an eligibility verdict.</p>}
        </>:<p className="plotWorksheetWarning" role="status">Enter valid frontage, depth (5–1,000 ft) and a positive illustrative floor area to calculate your example.</p>}
        <div className="plotWorksheetNext"><strong>What must still be verified?</strong><p>Survey boundaries · local body and planning authority · land use · road access · legally counted areas and exemptions · setbacks · height · permission route.</p><a href={approvalSources.portal} target="_blank" rel="noopener noreferrer">Check the official planning portal ↗</a></div>
      </div>
    </div>
    <div className="plotWorksheetActions"><div><strong>Take your scenario into a useful conversation.</strong><p>We’ll help identify what needs to be checked before design or construction. Professional services require an agreed scope and fee.</p></div><div className="plotWorksheetButtons">{result?<Link className="cta primary" href={enquiry} onClick={()=>log('enquiry')}>Discuss my site ↗</Link>:<button className="cta primary" type="button" disabled>Discuss my site ↗</button>}{result?<a className="cta" href={whatsappUrl('Hello Bind Builds, I would like to discuss this illustrative planning scenario.\n\n'+brief)} target="_blank" rel="noopener noreferrer" onClick={()=>log('whatsapp_draft')}>WhatsApp scenario ↗</a>:<button className="cta" type="button" disabled>WhatsApp scenario ↗</button>}<button type="button" className="plotWorksheetCopy" disabled={!result} onClick={copy}>Copy summary <span aria-hidden="true">↗</span></button></div></div>
    <p className="plotWorksheetCopyStatus" role="status" aria-live="polite">{copyStatus}</p>
    <p className="guideSmall">Figures are generated locally on this page. Only if you choose WhatsApp, copy or enquiry are your inputs used in that next step. Do not enter survey numbers, property deeds, passwords or personal ID documents here.</p>
  </section>;
}
