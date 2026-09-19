'use client';
import Link from 'next/link';
import { approvalAmount, approvalCharges, approvalSlabs, type ApprovalSelection } from '@/lib/approval-fees';
import { money } from '@/lib/calculator';

type Props = { value: ApprovalSelection; builtArea: number; onChange: (change: Partial<ApprovalSelection>) => void };
export default function ApprovalFeeExtra({ value, builtArea, onChange }: Props) {
  const amount = approvalAmount(value, builtArea);
  const slab = approvalSlabs.find(item => item.id === value.category);
  return <div className={`calcExtra approvalExtra ${value.selected ? 'selected' : ''}`} id="approval-fee">
    <label className="calcCheck"><input type="checkbox" checked={value.selected} onChange={e => onChange({ selected: e.target.checked })}/><span>Building approval fee<small>Select a local-body fee slab, record your zone and plan a separate allowance.</small></span></label>
    {value.selected && <div className="extraEditor">
      <p className="calcHint">Self-certification reference rates, not a confirmed government demand. Your architect must check the approval route, eligibility and current fee for your plot.</p>
      <label>Approval pricing<select value={value.mode} onChange={e => onChange({ mode: e.target.value as ApprovalSelection['mode'] })}><option value="reference">Self-certification reference estimate</option><option value="total">Enter a quoted / confirmed total</option><option value="unpriced">Not sure — request a fee review</option></select></label>
      <label>Local-body category<select value={value.category} onChange={e => { const next = approvalSlabs.find(item => item.id === e.target.value); onChange({ category: e.target.value, rate: next ? String(next.rate) : '', zone: '' }); }}><option value="">Choose category / not confirmed</option>{approvalSlabs.map(item => <option key={item.id} value={item.id}>{item.label} · ₹{item.rate}/sq.ft reference</option>)}</select></label>
      {value.category === 'gcc' && <><label>Chennai Corporation zone<select value={value.zone} onChange={e => onChange({ zone: e.target.value })}><option value="">Not sure — confirm my zone</option>{Array.from({length: 15}, (_, i) => <option key={i+1} value={String(i+1)}>Zone {i+1}</option>)}</select></label><p className="calcHint">The supplied reference lists one GCC rate, ₹100/sq.ft. It provides no separate zone-wise rates. Selecting a zone records your location and does not change the rate.</p></>}
      <label>Local body / locality <span>optional</span><input type="text" maxLength={100} value={value.locality} placeholder="Enter the local body or site locality" onChange={e => onChange({locality:e.target.value})}/></label>
      {value.mode === 'reference' && <>
        <label className="calcCheck approvalAreaCheck"><input type="checkbox" checked={value.linkedArea} onChange={e => onChange({linkedArea:e.target.checked, area: Number.isFinite(builtArea) ? String(builtArea) : ''})}/><span>Use the calculated building area<small>Follows your floor areas and headroom. Separately entered parking is excluded; confirm the approval area from your drawings.</small></span></label>
        <div className="extraUnitFields"><label>Chargeable area <span>sq.ft</span><input type="number" inputMode="decimal" min="1" max="500000" step="0.01" readOnly={value.linkedArea} value={value.linkedArea ? (Number.isFinite(builtArea) ? builtArea : '') : value.area} onChange={e => onChange({area:e.target.value})}/></label><label>Approval rate <span>₹ / sq.ft</span><input type="number" inputMode="decimal" min="0.01" max="100000" step="0.01" placeholder="Choose a category" value={value.rate} onChange={e => onChange({rate:e.target.value})}/></label></div>
        {slab && <button className="textButton" type="button" onClick={() => onChange({rate:String(slab.rate)})}>Reset to reference rate · ₹{slab.rate}/sq.ft</button>}
        <details className="approvalChargeDetails"><summary>Separate authority charges, if applicable</summary><p className="calcHint">Add only charges confirmed as payable separately. Do not add a charge already covered by the selected rate. Blank fields add nothing; they do not mean a charge is waived.</p><div className="extraUnitFields">{approvalCharges.map(item => <label key={item.key}>{item.label} <span>₹</span><input type="number" inputMode="numeric" min="0" max="100000000" step="1" placeholder="Not added" value={value.charges[item.key]} onChange={e => onChange({charges:{...value.charges,[item.key]:e.target.value}})}/></label>)}</div></details>
      </>}
      {value.mode === 'total' && <><label>Total approval allowance <span>₹</span><input type="number" inputMode="numeric" min="1" max="100000000" step="1" placeholder="Enter the quoted total" value={value.total} onChange={e => onChange({total:e.target.value})}/></label><p className="calcHint">This total replaces the slab calculation and all separate charges above.</p></>}
      <output className="extraTotal" aria-live="polite">{amount === null ? 'To be confirmed · excluded from total' : Number.isFinite(amount) ? money(amount) : 'Check approval area, rate and charges'}</output>
      <p className="calcHint">Added once to Additional items when priced. Professional design and submission fees are separate. For scrutiny applications, use a confirmed total or request a review.</p>
      <Link className="textLink" href="/building-plan-approval-chennai#fee-slabs" target="_blank" rel="noopener noreferrer">Fee slabs, documents & approval guidance ↗</Link>
    </div>}
  </div>;
}
