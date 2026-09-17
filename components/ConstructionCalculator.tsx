'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { packages } from '@/lib/site';
import { calculateEstimate, compactMoney, configuration, extras, floorName, money, validNumber, type EstimateInput } from '@/lib/calculator';
import CalculatorReport from './CalculatorReport';

const stepNames = ['Your site', 'Your floors', 'Your package', 'Your extras'];
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
  const [floorCount, setFloorCount] = useState(2);
  const [tier, setTier] = useState(1);
  const [hasHeadroom, setHasHeadroom] = useState(false);
  const [headroom, setHeadroom] = useState('150');
  const [allowances, setAllowances] = useState<Partial<Record<string, { selected: boolean; amount: string }>>>({});
  const [reserve, setReserve] = useState('0');
  const root = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
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
    if (firstRender.current) { firstRender.current = false; return; }
    root.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    heading.current?.focus({ preventScroll: true });
  }, [step]);
  const input: EstimateInput = { plot: number(plot), floors: areas.slice(0, floorCount).map(number), rate: selected.rate,
    headroom: hasHeadroom ? number(headroom) : 0, reservePercent: number(reserve),
    allowances: extras.map(item => ({ ...item, selected: allowances[item.key]?.selected ?? false,
      amount: allowances[item.key]?.amount?.trim() ? number(allowances[item.key]?.amount ?? '') : null })) };
  let estimate = null;
  try { estimate = calculateEstimate(input); } catch { /* Invalid input is explained by the native form constraints. */ }
  const setArea = (index: number, value: string) => setAreas(current => current.map((area, i) => i === index ? value : area));
  const setGround = (value: string) => setAreas(current => current.map((area, i) => i === 0 || area === current[0] ? value : area));
  const updateExtra = (key: string, change: Partial<{ selected: boolean; amount: string }>) => setAllowances(current => ({ ...current, [key]: { selected: false, amount: '', ...current[key], ...change } }));
  const next = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (step === 3 && !estimate) return; setFurthest(Math.max(furthest, step + 1)); setStep(step + 1); };

  return <div className="calculator" id="calculator" ref={root}>
    <ol className="calcProgress" aria-label="Estimate progress">{[...stepNames, 'Your estimate'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={index < step ? 'complete' : ''}><button type="button" disabled={index > furthest || index === 4 && !estimate} onClick={() => setStep(index)}><span>{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span><b>{label}</b></button></li>)}</ol>
    {step === 4 && estimate ? <CalculatorReport input={input} estimate={estimate} packageIndex={tier} headingRef={heading} onEdit={() => setStep(0)} /> : <div className="calcLayout">
      <form className="calcForm" onSubmit={next}>
        <div className="calcStepContent" key={step}>
          <span className="eyebrow">Step {step + 1} of 4</span>
          <h2 tabIndex={-1} ref={heading}>{['Let’s start with your site.', 'Make room for your plans.', 'Choose your level of finish.', 'Look beyond the square foot.'][step]}</h2>
          <p className="calcIntro">{['A rough area is enough to explore. You can refine every number later.', 'Use the built-up area of each floor, including its walls and circulation.', 'The same design-led approach, with different material and finish allowances.', 'Choose additional work and add any budget you have in mind. Leave the amount empty if you need us to price it.'][step]}</p>
          {step === 0 && <div className="calcFields">
            <label htmlFor="calc-plot">Plot area <span>sq.ft</span></label><input id="calc-plot" required type="number" inputMode="decimal" min="1" max="100000" step="0.01" value={plot} onChange={e => setPlot(e.target.value)} aria-describedby="plot-help" />
            <div className="calcPresets" aria-label="Common plot sizes">{[600, 1200, 1800, 2400].map(value => <button key={value} type="button" aria-pressed={Number(plot) === value} onClick={() => setPlot(String(value))}>{value.toLocaleString('en-IN')} sq.ft</button>)}</div>
            <p id="plot-help" className="calcHint">{validNumber(number(plot), 1, 100000) ? `${(Number(plot) / 9).toLocaleString('en-IN', { maximumFractionDigits: 1 })} sq.yd · ${(Number(plot) / 435.6).toFixed(2)} cents · ${(Number(plot) / 2400).toFixed(2)} grounds` : 'Enter a plot area between 1 and 1,00,000 sq.ft.'}</p>
            <label htmlFor="calc-ground">Ground-floor built-up area <span>sq.ft</span></label><input id="calc-ground" required type="number" inputMode="numeric" min="1" max="100000" step="1" value={areas[0]} onChange={e => setGround(e.target.value)} aria-describedby="ground-help" />
            <p id="ground-help" className="calcHint">Enter the building area, not the full plot. Count staircases and covered circulation once. Exclude any parking or headroom you plan to add separately.</p>
            {validNumber(number(plot), 1, 100000) && Number(areas[0]) > Number(plot) && <p className="calcNotice">Your ground-floor area exceeds the plot area. Please review these figures with your architect.</p>}
            <div className="calcNote"><span aria-hidden="true">↗</span><p>Have a total area from a drawing? Choose <strong>Ground only</strong> in the next step and enter that total for a simple budget calculation.</p></div>
          </div>}
          {step === 1 && <div className="calcFields">
            <fieldset className="calcChoices"><legend>Number of floors</legend><div className="floorChoices">{[1, 2, 3, 4].map(count => <label key={count}><input type="radio" name="floors" checked={floorCount === count} onChange={() => setFloorCount(count)} /><span><strong>{count === 1 ? 'Ground' : `G + ${count - 1}`}</strong><small>{count} {count === 1 ? 'floor' : 'floors'}</small></span></label>)}</div></fieldset>
            <div className="calcFloorFields">{areas.slice(0, floorCount).map((area, index) => <label key={index}>{floorName(index)} <span>sq.ft</span><input required type="number" inputMode="numeric" min="1" max="100000" step="1" value={area} onChange={e => setArea(index, e.target.value)} /></label>)}</div>
            {floorCount > 1 && <button className="textButton calcCopyArea" type="button" onClick={() => setAreas(areas.map(() => areas[0]))}>Use the ground-floor area for every floor</button>}
            <label className="calcCheck"><input type="checkbox" checked={hasHeadroom} onChange={e => setHasHeadroom(e.target.checked)} /><span>Add staircase headroom separately<small>Only when it is not already counted in a floor area.</small></span></label>
            {hasHeadroom && <label className="calcHeadroom">Headroom area <span>sq.ft</span><input required type="number" inputMode="numeric" min="1" max="10000" step="1" value={headroom} onChange={e => setHeadroom(e.target.value)} /><small>Estimated at the selected package rate. Final measurement and pricing need confirmation.</small></label>}
            <p className="calcHint">Floor choices describe your budget scenario. They do not confirm permitted floors, setbacks, FSI or planning approval for your Chennai site.</p>
          </div>}
          {step === 2 && <div className="calcFields">
            <fieldset className="calcChoices"><legend>Construction package</legend><div className="calcPackageChoices">{packages.map((item, index) => <label key={item.key}><input type="radio" name="package" checked={tier === index} onChange={() => setTier(index)} /><span><b>{item.name}</b><strong>{money(item.rate)}<small> / sq.ft</small></strong><em>{item.description}</em></span></label>)}</div></fieldset>
            <div className="calcSpecification"><span className="eyebrow">A few {selected.name} details</span><ul>{highlights[tier].map(text => <li key={text}>{text}</li>)}<li>{tankIncluded[tier]}</li></ul><Link className="textLink" href={`/packages#${selected.key}`} target="_blank" rel="noopener noreferrer">See the complete specification ↗</Link></div>
            <p className="calcHint">Published starting rates. Area measurement, design, structural requirements, quantities and the project agreement determine the final price.</p>
          </div>}
          {step === 3 && <div className="calcFields">
            <div className="calcNote"><span aria-hidden="true">✓</span><p>Your {selected.name} package already lists a <strong>{tankIncluded[tier].toLowerCase()}</strong>. Add an allowance only for an upgrade beyond that scope.</p></div>
            <div className="calcExtras">{extras.map(item => { const value = allowances[item.key]; return <div className={`calcExtra ${value?.selected ? 'selected' : ''}`} key={item.key}><label className="calcCheck"><input type="checkbox" checked={value?.selected ?? false} onChange={e => updateExtra(item.key, { selected: e.target.checked })} /><span>{item.label}<small>{item.detail}</small></span></label>{value?.selected && <label className="calcAllowance">Your budget allowance <span>₹ · optional</span><input type="number" inputMode="numeric" min="1" max="100000000" step="1" placeholder="To be quoted" value={value.amount} onChange={e => updateExtra(item.key, { amount: e.target.value })} /><small>{value.amount ? 'Your planning amount; not a Bind Builds rate.' : 'Will be listed as unpriced and excluded from the total.'}</small></label>}</div>; })}</div>
            <label htmlFor="calc-reserve">Optional planning reserve <span>%</span></label><div className="calcReserve"><input id="calc-reserve" required type="number" inputMode="decimal" min="0" max="25" step="0.5" value={reserve} onChange={e => setReserve(e.target.value)} /><p>Extra room in your budget. Applied to base construction plus the allowances you enter; it does not price excluded work.</p></div>
          </div>}
        </div>
        <div className="calcActions">{step > 0 ? <button type="button" className="textButton" onClick={() => setStep(step - 1)}>← Back</button> : <span className="calcHint">No sign-up needed</span>}<button type="submit" className="cta primary">{step === 3 ? 'See my estimate' : ['Choose floors', 'Compare packages', 'Add extras'][step]} <span aria-hidden="true">→</span></button></div>
        {step === 3 && !estimate && <p role="alert" className="fieldError">Please check the area, allowance and reserve values before creating your estimate.</p>}
      </form>
      <aside className="calcPreview" aria-label="Live estimate preview">
        <div className="calcPreviewTop"><span className="eyebrow">Your home, taking shape</span><span className="calcLive"><i /> Live estimate</span></div>
        <Building floors={floorCount} />
        <div className="calcPreviewMeta"><span>{configuration(floorCount)}</span><span>{selected.name}</span></div>
        <span className="calcPreviewLabel">Planning subtotal</span><output className="calcPreviewAmount" aria-live="polite" aria-atomic="true">{estimate ? compactMoney(estimate.total) : 'Check your inputs'}</output>
        <p className="calcPreviewEquation">{estimate ? `${estimate.area.toLocaleString('en-IN')} sq.ft × ${money(selected.rate)}` : 'Enter valid areas to see your estimate.'}{estimate && (estimate.allowanceTotal > 0 || estimate.reserve > 0) ? ' + allowances / reserve' : ''}</p>
        {estimate && <dl className="calcMiniBreakdown"><div><dt>Base construction</dt><dd>{money(estimate.base)}</dd></div><div><dt>Your allowances</dt><dd>{money(estimate.allowanceTotal)}</dd></div>{estimate.reserve > 0 && <div><dt>Planning reserve</dt><dd>{money(estimate.reserve)}</dd></div>}</dl>}
        {estimate && estimate.unpriced.length > 0 && <p className="calcUnpriced">+ {estimate.unpriced.length} {estimate.unpriced.length === 1 ? 'selected extra needs' : 'selected extras need'} a quote</p>}
        <p className="calcPreviewDisclaimer">An initial budget, subject to a site-specific proposal. Taxes, approval charges and other exclusions are additional.</p>
      </aside>
    </div>}
  </div>;
}
