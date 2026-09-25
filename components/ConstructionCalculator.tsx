'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { packages } from '@/lib/site';
import { calculateEstimate, compactMoney, configuration, floorName, HEADROOM_STANDARD_RATE, money, validNumber, type EstimateInput } from '@/lib/calculator';
import CalculatorReport from './CalculatorReport';
import CalculatorExtra from './CalculatorExtra';
import ApprovalFeeExtra from './ApprovalFeeExtra';
import { approvalAllowance, initialApproval } from '@/lib/approval-fees';
import { constructionMonths, extraOptions, extraAmount, extraDescription, initialExtra, packageMetrics, type ExtraSelection } from '@/lib/calculator-options';
import { trackEvent } from '@/lib/analytics';

const stepNames = ['Your site', 'Your floors', 'Your package', 'Your extras'];
const progressShortNames = ['Site', 'Floors', 'Package', 'Extras', 'Estimate'];
const tankIncluded = ['2,000 L three-layer overhead tank', '3,000 L overhead tank with sensor', 'RCC overhead tank up to 6,000 L'];
const highlights = [
  ['2D plans & 3D exterior elevation', 'M20 concrete specification', 'Main flooring allowance up to ₹65/sq.ft', 'Parryware fittings allowance up to ₹20,000/bathroom'],
  ['Soil test & structural drawings', 'M20 concrete specification', 'Main flooring allowance up to ₹90/sq.ft', 'Jaquar fittings allowance up to ₹30,000/bathroom'],
  ['Interior views & detailed drawings', 'M25 concrete specification', 'Main flooring allowance up to ₹200/sq.ft', 'Kohler fittings allowance up to ₹60,000/bathroom'],
];
const number = (value: string) => value.trim() === '' ? NaN : Number(value);

function Building({ floors }: { floors: number }) {
  return <svg className="calcBuilding" viewBox="0 -30 300 280" aria-hidden="true">
    <path d="M20 187L145 123L280 187L155 251Z" fill="#283242" />
    <path d="M20 187L145 123L280 187M55 205L180 141M92 223L218 159M56 169L191 233M94 149L230 213" fill="none" stroke="#57677e" strokeWidth=".6" />
    {Array.from({ length: floors }, (_, index) => <g key={index} className="calcBuildingFloor" style={{ animationDelay: `${index * 70}ms` }}>
      <path d={`M75 ${166 - index * 38}L150 ${128 - index * 38}L225 ${166 - index * 38}L150 ${204 - index * 38}Z`} fill="#f4f6fa" stroke="#c5d1e2" />
      <path d={`M75 ${166 - index * 38}L150 ${204 - index * 38}V${175 - index * 38}L75 ${137 - index * 38}Z`} fill="#c6d0df" />
      <path d={`M150 ${204 - index * 38}L225 ${166 - index * 38}V${137 - index * 38}L150 ${175 - index * 38}Z`} fill="#849dbd" />
      <path d={`M75 ${137 - index * 38}L150 ${99 - index * 38}L225 ${137 - index * 38}L150 ${175 - index * 38}Z`} fill="#fafbff" stroke="#c6d0df" />
      <path d={`M88 ${148 - index * 38}L110 ${159 - index * 38}V${177 - index * 38}L88 ${166 - index * 38}Z M119 ${164 - index * 38}L139 ${174 - index * 38}V${192 - index * 38}L119 ${182 - index * 38}Z`} fill="#29415f" />
      <path d={`M163 ${174 - index * 38}L185 ${163 - index * 38}V${181 - index * 38}L163 ${192 - index * 38}Z M194 ${158 - index * 38}L215 ${148 - index * 38}V${166 - index * 38}L194 ${176 - index * 38}Z`} fill="#233a56" />
    </g>)}
  </svg>;
}

export default function ConstructionCalculator() {
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [plot, setPlot] = useState('1200');
  const [areas, setAreas] = useState(['900', '900', '900', '900']);
  const [floorCount, setFloorCount] = useState(1);
  const [tier, setTier] = useState(1);
  const [hasHeadroom, setHasHeadroom] = useState(false);
  const [headroom, setHeadroom] = useState('200');
  const [headroomRate, setHeadroomRate] = useState(String(HEADROOM_STANDARD_RATE));
  const [headroomMode, setHeadroomMode] = useState<ExtraSelection['mode']>('unit');
  const [headroomAmount, setHeadroomAmount] = useState('');
  const [allowances, setAllowances] = useState<Partial<Record<string, ExtraSelection>>>({});
  const [approval, setApproval] = useState(initialApproval);
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const analyticsStarted = useRef(false);
  const selected = packages[tier];
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTier = packages.findIndex(item => item.name === params.get('package'));
    if (requestedTier >= 0) setTier(requestedTier);
    const area = params.get('area');
    if (area && /^\d{1,6}$/.test(area) && validNumber(Number(area), 1, 100000, true)) {
      setAreas([area, area, area, area]); setFloorCount(1); setPlot(String(Math.max(1200, Number(area))));
    }
  }, []);
  useEffect(() => {
    trackEvent('calculator_step_view',{step_number:step+1,step_name:[...stepNames,'Your estimate'][step]});
    if (firstRender.current) { firstRender.current = false; return; }
    root.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    heading.current?.focus({ preventScroll: true });
  }, [step]);
  const builtArea = areas.slice(0, floorCount).reduce((sum, area) => sum + number(area), 0) + (hasHeadroom ? number(headroom) : 0);
  const input: EstimateInput = { plot: number(plot), floors: areas.slice(0, floorCount).map(number), rate: selected.rate,
    headroom: hasHeadroom ? number(headroom) : 0, headroomRate: hasHeadroom ? number(headroomRate) : HEADROOM_STANDARD_RATE,
    headroomMode: hasHeadroom ? headroomMode : 'unit', headroomAmount: hasHeadroom && headroomMode === 'lump' ? (headroomAmount.trim()==='' ? null : number(headroomAmount)) : null, reservePercent: 0,
    allowances: [...extraOptions.map(item => { const value=allowances[item.key]??initialExtra(item); return {key:item.key,label:item.label,selected:value.selected,amount:extraAmount(value),detail:extraDescription(item,value)}; }), approvalAllowance(approval, builtArea)] };
  let estimate = null;
  try { estimate = calculateEstimate(input); } catch { /* Invalid input is explained by the native form constraints. */ }
  const setArea = (index: number, value: string) => setAreas(current => current.map((area, i) => i === index ? value : area));
  const setGround = (value: string) => setAreas(current => current.map((area, i) => i === 0 || area === current[0] ? value : area));
  const updateExtra = (key:string,change:Partial<ExtraSelection>) => setAllowances(current => {
    const item=extraOptions.find(item=>item.key===key)!;
    const updated={...current,[key]:{...initialExtra(item),...current[key],...change}};
    return updated;
  });
  const duration=constructionMonths(floorCount);
  const metrics=packageMetrics[tier];
  const headroomPlanningAmount = hasHeadroom ? extraAmount({selected:true,mode:headroomMode,quantity:headroom,rate:headroomRate,amount:headroomAmount,cars:0}) : 0;
  const next = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (step === 3 && !estimate) return; if(step===0&&!analyticsStarted.current){analyticsStarted.current=true;trackEvent('calculator_started',{plot_area:Number(plot)||0});} trackEvent('calculator_step_complete',{step_number:step+1,step_name:stepNames[step],package_name:selected.name}); if(step===3&&estimate){trackEvent('estimate_generated',{package_name:selected.name,floors:floorCount,calculated_area:estimate.area,value:estimate.total,currency:'INR'});} setFurthest(Math.max(furthest, step + 1)); setStep(step + 1); };

  return <div className="calculator" id="calculator" ref={root}>
    <ol className="calcProgress" aria-label="Estimate progress">{[...stepNames, 'Your estimate'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={index < step ? 'complete' : ''}><button type="button" disabled={index > furthest || index === 4 && !estimate} onClick={() => setStep(index)}><span>{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span><b><span className="progressLong">{label}</span><span className="progressShort">{progressShortNames[index]}</span></b></button></li>)}</ol>
    {step === 4 && estimate ? <CalculatorReport input={input} estimate={estimate} packageIndex={tier} headingRef={heading} onEdit={() => setStep(0)} /> : <div className="calcLayout">
      <form className="calcForm" onSubmit={next}>
        <div className="calcStepContent" key={step}>
          <span className="eyebrow">Step {step + 1} of 4</span>
          <h2 tabIndex={-1} ref={heading}>{['Let’s start with your site.', 'Make room for your plans.', 'Choose your level of finish.', 'Look beyond the square foot.'][step]}</h2>
          <p className="calcIntro">{['A rough area is enough to explore. You can refine every number later.', 'Use the built-up area of each floor, including its walls and circulation.', 'The same design-led approach, with different material and finish allowances.', 'Choose additional work. Use an editable reference rate, enter your own total or request a quote.'][step]}</p>
          {step === 0 && <div className="calcFields">
            <label htmlFor="calc-plot">Plot area <span>sq.ft</span></label><input id="calc-plot" required type="number" inputMode="decimal" min="1" max="100000" step="0.01" value={plot} onChange={e => setPlot(e.target.value)} aria-describedby="plot-help" />
            <div className="calcPresets" aria-label="Common plot sizes">{[600, 1200, 1800, 2400].map(value => <button key={value} type="button" aria-pressed={Number(plot) === value} onClick={() => setPlot(String(value))}>{value.toLocaleString('en-IN')} sq.ft</button>)}</div>
            <p id="plot-help" className="calcHint">{validNumber(number(plot), 1, 100000) ? `${(Number(plot) / 9).toLocaleString('en-IN', { maximumFractionDigits: 1 })} sq.yd · ${(Number(plot) / 435.6).toFixed(2)} cents · ${(Number(plot) / 2400).toFixed(2)} grounds` : 'Enter a plot area between 1 and 1,00,000 sq.ft.'}</p>
            <label htmlFor="calc-ground">Ground-floor built-up area <span>sq.ft</span></label><input id="calc-ground" required type="number" inputMode="numeric" min="1" max="100000" step="1" value={areas[0]} onChange={e => setGround(e.target.value)} aria-describedby="ground-help" />
            <p id="ground-help" className="calcHint">Enter the building area, not the full plot. Count staircases and covered circulation once. Exclude any parking or headroom you plan to add separately.</p>
            {validNumber(number(plot), 1, 100000) && Number(areas[0]) > Number(plot) && <p className="calcNotice">Your ground-floor area exceeds the plot area. Please review these figures with your architect.</p>}
            <CalculatorExtra item={extraOptions[0]} value={allowances.parking} onChange={change=>updateExtra('parking',change)}/><p className="calcHint">Enter each floor separately in the next step so the area and construction-time scenario reflect your actual configuration.</p>
          </div>}
          {step === 1 && <div className="calcFields">
            <fieldset className="calcChoices"><legend>Number of floors</legend><div className="floorChoices">{[1, 2, 3, 4].map(count => <label key={count}><input type="radio" name="floors" checked={floorCount === count} onChange={() => setFloorCount(count)} /><span><strong>{count === 1 ? 'Ground' : `G + ${count - 1}`}</strong><small>{count} {count === 1 ? 'floor' : 'floors'}</small></span></label>)}</div></fieldset>
            <div className="calcDuration" aria-live="polite"><span className="eyebrow">Construction planning scenario</span><strong>{duration}<small> months</small></strong><div className="durationTrack"><span style={{width:`${duration/18*100}%`}}/></div><p>6 months for ground only + 4 months per additional floor. Indicative only; area, soil, design, access and weather can change the programme. Design and approvals are separate.</p></div><div className="calcFloorFields">{areas.slice(0, floorCount).map((area, index) => <label key={index}>{floorName(index)} <span>sq.ft</span><input required type="number" inputMode="numeric" min="1" max="100000" step="1" value={area} onChange={e => setArea(index, e.target.value)} /></label>)}</div>
            {floorCount > 1 && <button className="textButton calcCopyArea" type="button" onClick={() => setAreas(areas.map(() => areas[0]))}>Use the ground-floor area for every floor</button>}
            <div className={`calcExtra ${hasHeadroom?'selected':''}`}>
              <label className="calcCheck"><input type="checkbox" checked={hasHeadroom} onChange={e => setHasHeadroom(e.target.checked)} /><span>Add staircase headroom separately<small>Only when it is not already counted in a floor area.</small></span></label>
              {hasHeadroom&&<div className="extraEditor">
                <label>Pricing method<select value={headroomMode} onChange={e=>setHeadroomMode(e.target.value as ExtraSelection['mode'])}><option value="unit">Quantity × unit rate</option><option value="lump">Enter total allowance</option><option value="unpriced">Request a quote</option></select></label>
                {headroomMode==='unit'&&<><div className="extraUnitFields"><label>Headroom area <span>sq.ft</span><input required type="number" inputMode="decimal" min="0.01" max="10000" step="0.01" value={headroom} onChange={e=>setHeadroom(e.target.value)}/></label><label>Unit rate <span>₹ / sq.ft</span><input required type="number" inputMode="decimal" min="0.01" max="10000000" step="0.01" value={headroomRate} onChange={e=>setHeadroomRate(e.target.value)}/></label></div><button className="textButton" type="button" onClick={()=>setHeadroomRate(String(HEADROOM_STANDARD_RATE))}>Use reference rate · {money(HEADROOM_STANDARD_RATE)} / sq.ft</button></>}
                {headroomMode==='lump'&&<label>Total allowance <span>₹</span><input type="number" inputMode="numeric" min="1" max="100000000" step="1" placeholder="To be quoted" value={headroomAmount} onChange={e=>setHeadroomAmount(e.target.value)}/></label>}
                {headroomMode!=='lump'&&headroomMode!=='unit'&&<div className="extraUnitFields"><label>Headroom area <span>sq.ft</span><input required type="number" inputMode="decimal" min="0.01" max="10000" step="0.01" value={headroom} onChange={e=>setHeadroom(e.target.value)}/></label></div>}
                <output className="extraTotal" aria-live="polite">{headroomPlanningAmount===null?'To be quoted · excluded from total':Number.isFinite(headroomPlanningAmount)&&Number(headroomPlanningAmount)>=1&&Number(headroomPlanningAmount)<=100000000?money(Number(headroomPlanningAmount)):'Check quantity and rate'}</output>
                <p className="calcHint">{headroomMode==='unpriced'?'This headroom stays in your estimate for follow-up and is excluded from the total.':'Editable planning allowance. Standard reference rate is ₹2,350/sq.ft; final measurement, scope and pricing need confirmation.'}</p>
              </div>}
            </div>
            <p className="calcHint">Floor choices describe your budget scenario. They do not confirm permitted floors, setbacks, FSI or planning approval for your Chennai site.</p>
          </div>}
          {step === 2 && <div className="calcFields">
            <fieldset className="calcChoices"><legend>Construction package</legend><div className="calcPackageChoices">{packages.map((item, index) => <label key={item.key}><input type="radio" name="package" checked={tier === index} onChange={() => {setTier(index);trackEvent('package_selected',{package_name:item.name,package_rate:item.rate,calculator_step:3});}} /><span><b>{item.name}</b><strong>{money(item.rate)}<small> / sq.ft</small></strong><em>{item.description}</em></span></label>)}</div></fieldset>
            <div className="packageImpact" aria-live="polite"><span className="eyebrow">{selected.name} / The difference in numbers</span><h3>{tier===0?'A considered starting point.':tier===1?'More choice. More coordination.':'More room for the details.'}</h3><div className="packageMetricGrid">{[{label:'Main flooring allowance',value:metrics.flooring,max:200,unit:'/ sq.ft'},{label:'Bathroom fittings allowance',value:metrics.bathroom,max:60000,unit:'/ bathroom'}].map(metric=><div key={metric.label}><span>{metric.label}</span><strong>{money(metric.value)}<small>{metric.unit}</small></strong><div className="metricTrack"><span style={{width:`${metric.value/metric.max*100}%`}}/></div></div>)}<div><span>Included overhead tank</span><strong>{metrics.tank.toLocaleString('en-IN')}<small>litres · package specification</small></strong><div className="metricTrack"><span style={{width:`${metrics.tank/6000*100}%`}}/></div></div></div><ul className="packageBenefits">{metrics.benefits.map(benefit=><li key={benefit}>✓ {benefit}</li>)}</ul>{tier>0&&<p><strong>+{money(selected.rate-packages[0].rate)} / sq.ft</strong> above Essential{estimate?` · ${compactMoney(estimate.floorArea*(selected.rate-packages[0].rate))} more across your ${estimate.floorArea.toLocaleString('en-IN')} sq.ft floor area`:''}. Base construction comparison; extras are separate.</p>}<p className="calcHint">Bars compare allowance amounts and tank capacity across our three packages, not quality scores. Material allowances are within package scope, not cash credits.</p></div><div className="calcSpecification"><span className="eyebrow">A few {selected.name} details</span><ul>{highlights[tier].map(text => <li key={text}>{text}</li>)}<li>{tankIncluded[tier]}</li></ul><Link className="textLink" href={`/packages#${selected.key}`} target="_blank" rel="noopener noreferrer">See the complete specification ↗</Link></div>
            <p className="calcHint">Published starting rates. Area measurement, design, structural requirements, quantities and the project agreement determine the final price.</p>
          </div>}
          {step === 3 && <div className="calcFields">
            <ApprovalFeeExtra value={approval} builtArea={builtArea} onChange={change => setApproval(current => ({...current, ...change}))}/>
            <div className="calcExtras">{extraOptions.filter(item=>item.key!=='parking').map(item=><CalculatorExtra key={item.key} item={item} value={allowances[item.key]} onChange={change=>updateExtra(item.key,change)}/>)}</div>
          </div>}
        </div>
        <div className="calcActions">{step > 0 ? <button type="button" className="textButton" onClick={() => setStep(step - 1)}>← Back</button> : <span className="calcHint">No sign-up required</span>}<button type="submit" className="cta primary">{step === 3 ? 'See my estimate' : ['Choose floors', 'Compare packages', 'Add extras'][step]} <span aria-hidden="true">→</span></button></div>
        {step === 3 && !estimate && <p role="alert" className="fieldError">Please check the area and additional item values before creating your estimate.</p>}
      </form>
      <aside className="calcPreview" aria-label="Live estimate preview">
        <div className="calcPreviewTop"><span className="eyebrow">Your home, taking shape</span><span className="calcLive"><i /> Live estimate</span></div>
        <Building floors={floorCount} />
        <div className="calcPreviewMeta"><span>{configuration(floorCount)}</span><span>{selected.name}</span></div>
        <p className="calcPreviewTime">~{duration} months <span>construction scenario · excludes design & approvals</span></p><span className="calcPreviewLabel">Planning subtotal</span><output className="calcPreviewAmount" aria-live="polite" aria-atomic="true">{estimate ? compactMoney(estimate.total) : 'Check your inputs'}</output>
        <p className="calcPreviewEquation">{estimate ? `${estimate.floorArea.toLocaleString('en-IN')} sq.ft × ${money(selected.rate)}${input.headroom ? estimate.headroomUnpriced ? ` + ${input.headroom.toLocaleString('en-IN')} sq.ft headroom · quote` : estimate.headroomMode==='lump' ? ` + headroom allowance ${money(estimate.headroomCost)}` : ` + ${input.headroom.toLocaleString('en-IN')} sq.ft headroom × ${money(estimate.headroomRate)}` : ''}` : 'Enter valid areas to see your estimate.'}{estimate && estimate.allowanceTotal > 0 ? ' + additional items' : ''}</p>
        {estimate && <dl className="calcMiniBreakdown"><div><dt>Base construction</dt><dd>{money(estimate.base)}</dd></div><div><dt>Additional items</dt><dd>{money(estimate.allowanceTotal)}</dd></div></dl>}
        {estimate && estimate.unpriced.length > 0 && <p className="calcUnpriced">+ {estimate.unpriced.length} {estimate.unpriced.length === 1 ? 'selected extra needs' : 'selected extras need'} a quote</p>}
        <p className="calcPreviewDisclaimer">An initial budget, subject to a site-specific proposal. Only priced additional items are included. Taxes, unpriced approval charges and other exclusions are additional.</p>
      </aside>
    </div>}
  </div>;
}
