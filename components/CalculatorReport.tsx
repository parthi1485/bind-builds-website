'use client';
import { useState, type RefObject } from 'react';
import Link from 'next/link';
import { packages, site, whatsappUrl } from '@/lib/site';
import { calculateEmi, compactMoney, configuration, createVisualData, floorName, money, splitStages, validNumber, type Estimate, type EstimateInput } from '@/lib/calculator';
import ProposalVisuals, { EstimatePresentation, ComparisonDiagram, StageDiagram } from './ProposalVisuals';
import { constructionMonths } from '@/lib/calculator-options';
import type { PdfReportData } from '@/lib/estimate-pdf';

type Props = { input: EstimateInput; estimate: Estimate; packageIndex: number; headingRef: RefObject<HTMLHeadingElement | null>; onEdit: () => void };
export default function CalculatorReport({ input, estimate, packageIndex, headingRef, onEdit }: Props) {
  const selected = packages[packageIndex];
  const [status, setStatus] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [months, setMonths] = useState(String(constructionMonths(input.floors.length)));
  const [loan, setLoan] = useState(String(Math.round(estimate.total * .8)));
  const [interest, setInterest] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const parse = (value: string) => value.trim() ? Number(value) : NaN;
  const emi = calculateEmi(parse(loan), parse(interest), parse(tenure));
  const allocation = splitStages(estimate.base);
  const rows: [string, string][] = input.floors.map((area, index) => [`${floorName(index)} · ${area.toLocaleString('en-IN')} sq.ft`, money(area * input.rate)]);
  if (input.headroom) rows.push([`Separate headroom · ${input.headroom.toLocaleString('en-IN')} sq.ft`, money(estimate.headroomCost)]);
  rows.push(['Base construction total', money(estimate.base)]);
  estimate.selected.forEach(item => rows.push([`${item.label}${item.detail ? ' · '+item.detail : ''}${item.amount === null ? '' : ' · allowance'}`, item.amount === null ? 'To be quoted' : money(item.amount)]));
  const notes = [
    'Bind Builds planning estimate (not a quotation)',
    `Plot: ${input.plot.toLocaleString('en-IN')} sq.ft | ${configuration(input.floors.length)}`,
    ...input.floors.map((area, index) => `${floorName(index)}: ${area} sq.ft`),
    input.headroom ? `Separate headroom: ${input.headroom} sq.ft` : '',
    `${selected.name}: ${money(input.rate)}/sq.ft | Base: ${money(estimate.base)}`,
    ...estimate.selected.map(item => `${item.label}${item.detail ? " · "+item.detail : ""}: ${item.amount === null ? 'TO BE QUOTED (excluded)' : money(item.amount) + ' allowance'}`),
    `Planning subtotal: ${money(estimate.total)}`,
    `Construction scenario: approximately ${constructionMonths(input.floors.length)} months; 6 months + 4 per additional floor. Design and approvals excluded; not a delivery commitment.`,
    'Only priced additional items are included. Taxes, unpriced approval charges, site-specific work and other exclusions are additional.',
    'Please review the scope and prepare a project-specific proposal.',
  ].filter(Boolean).join('\n');
  const enquiryUrl = '/start-a-project?' + new URLSearchParams({ package: selected.name, area: String(estimate.area), notes }).toString();
  const comparisons = packages.map(item => ({ name: item.name, rate: item.rate, base: estimate.area * item.rate }));
  const visuals = createVisualData(input, estimate, selected.name, comparisons);
  const assumptions = [
    'This is a planning estimate, not a quotation or construction agreement. Published package rates are starting rates and need confirmation for your design and site.',
    'Floor areas are combined and any separate headroom is added once. Final area measurement and treatment of parking, headroom and open spaces must be agreed.',
    'Extra rates begin as reference allowances from a supplied example and can be edited. They are not verified Bind Builds prices. Selected extras with amounts are planning allowances. Selected extras without amounts are excluded from the total and still need a quote.',
    'An approval allowance is included only when selected and priced. Reference fee slabs need current authority and eligibility verification; they do not establish permission to build. Unentered authority charges and professional approval services remain excluded. Allow separately for land, taxes, utility charges, demolition, special foundations and work beyond the agreed package.',
    'Your package already includes an overhead tank to its stated specification. Only an upgrade should be added separately. Confirm every inclusion and exclusion in the proposal.',
    'The ten-stage allocation is an illustrative distribution of base construction cost only. It is not a bill of quantities, invoice or payment schedule. Site-specific quantities, sequence and milestones can differ.',
    `Construction duration is a planning scenario: ${constructionMonths(input.floors.length)} months for ${configuration(input.floors.length)}, using 6 months plus 4 per additional floor. It excludes design and approvals. Site, area, weather and scope affect the actual programme.`,
    'Floor choices and plot conversions do not assess legal buildability, setbacks or permitted FSI. Your architect must confirm the applicable approval route for the site.',
  ];
  const copy = async () => { try { await navigator.clipboard.writeText(notes); setStatus('Estimate copied. You can paste it into a message.'); } catch { setStatus('Copy is unavailable in this browser. Use the WhatsApp draft or download the PDF.'); } };
  const download = async () => {
    setDownloading(true); setStatus('Preparing your PDF…');
    try {
      const data: PdfReportData = { packageName: selected.name, total: money(estimate.total), date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        duration: `Construction scenario: ~${constructionMonths(input.floors.length)} months. Excludes design and approvals; subject to the agreed programme.`,
        facts: [['Plot', `${input.plot.toLocaleString('en-IN')} sq.ft`], ['Configuration', configuration(input.floors.length)], ['Calculated area', `${estimate.area.toLocaleString('en-IN')} sq.ft`], ['Package rate', `${money(input.rate)} / sq.ft`]],
        visuals, rows, unpriced: estimate.unpriced.map(item => item.label), comparisons: comparisons.map(item => [item.name, `${money(item.rate)} / sq.ft`, money(item.base)]),
        stages: allocation.map(item => [item.name, `${item.percent}%`, money(item.amount)]), assumptions,
        contact: `${site.phone} | ${site.email}`, url: site.url + '/cost-calculator',
      };
      const { createEstimatePdf } = await import('@/lib/estimate-pdf');
      const doc = createEstimatePdf(data);
      doc.save('bind-builds-construction-estimate.pdf');
      setStatus('PDF prepared. Check your browser downloads.');
    } catch { setStatus('The PDF could not be created. Please try again, or copy your estimate.'); }
    finally { setDownloading(false); }
  };

  return <div className="calcReport">
    <div className="calcReportHero">
      <div><span className="eyebrow">Your first step towards a well-planned home</span><h2 ref={headingRef} tabIndex={-1}>Your home.<br />In numbers.</h2><p>{selected.name} · {configuration(input.floors.length)} · {estimate.area.toLocaleString('en-IN')} sq.ft calculated area</p></div>
      <div className="calcReportTotal"><span>Planning subtotal</span><strong>{compactMoney(estimate.total)}</strong><span>{money(estimate.total)}</span><p>Only priced additional items are included. Taxes, unpriced approval charges and other exclusions are additional. Subject to a project-specific proposal.</p></div>
    </div>
    {estimate.unpriced.length > 0 && <div className="calcQuoteNotice"><strong>{estimate.unpriced.length} selected {estimate.unpriced.length === 1 ? 'extra still needs' : 'extras still need'} a quote</strong><p>{estimate.unpriced.map(item => item.label).join(' · ')}</p><span>These items are excluded from the subtotal above.</span></div>}
    <div className="calcReportToolbar"><EstimatePresentation data={visuals}/><button className="cta" type="button" onClick={download} disabled={downloading}>{downloading ? 'Preparing PDF…' : 'Download estimate PDF'} <span aria-hidden="true">↓</span></button><button className="textButton" type="button" onClick={copy}>Copy estimate</button><button className="textButton" type="button" onClick={onEdit}>Edit my inputs</button></div>
    <p role="status" className="calcStatus">{status}</p>
    <section className="calcReportCard calcDuration"><span className="eyebrow">Construction planning scenario</span><strong>~{constructionMonths(input.floors.length)}<small> months</small></strong><div className="durationTrack"><span style={{width:`${constructionMonths(input.floors.length)/18*100}%`}}/></div><p>6 months for ground only + 4 months per additional floor. Design and approval time is separate. Actual duration depends on area, site conditions, scope and the agreed programme.</p></section><ProposalVisuals data={visuals}/>
    <div className="calcReportColumns">
      <section className="calcReportCard"><span className="eyebrow">01 / Where the number comes from</span><h3>Your cost breakdown.</h3><p className="calcHint">{estimate.area.toLocaleString('en-IN')} sq.ft calculated area, plus selected additional items.</p><dl className="calcCostRows">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}<div className="calcCostTotal"><dt>Planning subtotal</dt><dd>{money(estimate.total)}</dd></div></dl></section>
      <section className="calcReportCard calcNextStep"><span className="eyebrow">Make it specific to your site</span><h3>A number starts the conversation.<br />A plan brings it together.</h3><p>We’ll review your site, design priorities and the scope behind this estimate. Your selections are carried into the project brief.</p><Link href={enquiryUrl} className="cta primary">Discuss this estimate ↗</Link><a href={whatsappUrl('Hello Bind Builds, I would like to discuss this estimate.\n\n' + notes)} className="textLink" target="_blank" rel="noopener noreferrer">Open estimate in WhatsApp ↗</a><p className="calcHint">No details needed to see or download your estimate. You choose when to contact us.</p></section>
    </div>
    <section className="calcReportCard calcCompare"><ComparisonDiagram data={visuals}/><p className="calcHint">Additional items are excluded from this comparison.</p><div className="comparisonSpecLinks">{packages.map(item=><Link key={item.key} href={`/packages#${item.key}`} target="_blank" rel="noopener noreferrer">{item.name} specification ↗</Link>)}</div></section>
    <section className="calcReportCard"><StageDiagram data={visuals}/></section>
    <details className="calcPlanning"><summary>Explore a time and loan scenario <span aria-hidden="true">+</span></summary><div className="calcPlanningGrid"><section><h3>A simple spend scenario.</h3><label>Assumed construction duration <span>months</span><input type="number" inputMode="numeric" min="1" max="60" step="1" value={months} onChange={e => setMonths(e.target.value)} /></label><output>{validNumber(parse(months), 1, 60, true) ? money(estimate.base / Number(months)) + ' / month' : 'Enter 1–60 whole months'}</output><p>Base construction cost divided evenly by your chosen duration. Real spending varies by stage. This is not a delivery timeline or a payment commitment; design and approval time is separate.</p></section><section><h3>Explore a loan repayment.</h3><div className="calcLoanFields"><label>Loan amount <span>₹</span><input type="number" inputMode="numeric" min="1" max="1000000000" step="1" value={loan} onChange={e => setLoan(e.target.value)} /></label><label>Annual interest <span>%</span><input type="number" inputMode="decimal" min="0" max="30" step="0.05" value={interest} onChange={e => setInterest(e.target.value)} /></label><label>Loan tenure <span>years</span><input type="number" inputMode="numeric" min="1" max="40" step="1" value={tenure} onChange={e => setTenure(e.target.value)} /></label></div><output>{emi ? money(emi.monthly) + ' / month' : 'Check the loan amount, rate and tenure'}</output>{emi && <p>Total repayment: {money(emi.repayment)}<br />Interest over the term: {money(emi.interest)}</p>}<p>The initial 80% loan amount, 8.5% rate and 20-year term are editable examples, not lender offers. Assumes a fully disbursed loan and constant rate; excludes fees and pre-EMI. <a href="https://homeloans.hdfc.bank.in/home-loan-emi-calculator" target="_blank" rel="noopener noreferrer">EMI formula reference ↗</a></p></section></div><p className="calcPlanningFootnote">These exploratory time and loan scenarios are separate from the construction estimate and are not included in its PDF or enquiry brief.</p></details>
    <section className="calcAssumptions"><h3>Keep these assumptions with your estimate.</h3><ul>{assumptions.map(text => <li key={text}>{text}</li>)}</ul><div><Link href="/faq" className="textLink">Chennai construction FAQs ↗</Link><a href={'tel:' + site.telephone} className="textLink">Questions? Call {site.phone} ↗</a></div></section>
  </div>;
}
