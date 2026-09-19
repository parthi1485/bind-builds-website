/** Planning presets transcribed from the supplied Archipedia guide, page 6.
 * These are not a verified current government tariff. No zone-to-rate inference.
 * The superseded flat village figure (37) is deliberately not a preset.
 */
export const approvalSlabs = [
  { id: 'gcc', label: 'Greater Chennai Corporation', rate: 100 },
  { id: 'corp-a', label: 'Special Grade A Corporation', rate: 88 },
  { id: 'corp-b', label: 'Special Grade B Corporation', rate: 84 },
  { id: 'corp-selection', label: 'Selection Grade Corporation', rate: 79 },
  { id: 'corp-i-ii', label: 'Grade I & II Corporations', rate: 74 },
  { id: 'municipal-special', label: 'Special & Selection Grade Municipalities', rate: 74 },
  { id: 'municipal-i-ii', label: 'Grade I & II Municipalities', rate: 70 },
  { id: 'town-special', label: 'Special Grade Town Panchayat', rate: 70 },
  { id: 'town-selection', label: 'Selection Grade Town Panchayat', rate: 65 },
  { id: 'town-i', label: 'Grade I Town Panchayat', rate: 55 },
  { id: 'town-ii', label: 'Grade II Town Panchayat', rate: 45 },
  { id: 'village-a', label: 'Village Panchayat — Category A', rate: 27 },
  { id: 'village-b', label: 'Village Panchayat — Category B', rate: 25 },
  { id: 'village-c', label: 'Village Panchayat — Category C', rate: 22 },
  { id: 'village-d', label: 'Village Panchayat — Category D', rate: 15 },
] as const;

export const approvalCharges = [
  { key: 'scrutiny', label: 'Scrutiny fee' },
  { key: 'development', label: 'Development charges' },
  { key: 'welfare', label: 'Construction Workers Welfare Fund' },
  { key: 'service', label: 'Processing / service charges' },
  { key: 'other', label: 'Other confirmed authority charges' },
] as const;
type ChargeKey = typeof approvalCharges[number]['key'];
export type ApprovalSelection = {
  selected: boolean;
  mode: 'reference' | 'total' | 'unpriced';
  category: string;
  zone: string;
  locality: string;
  linkedArea: boolean;
  area: string;
  rate: string;
  total: string;
  charges: Record<ChargeKey, string>;
};
export const initialApproval: ApprovalSelection = {
  selected: false, mode: 'reference', category: '', zone: '', locality: '',
  linkedArea: true, area: '', rate: '', total: '',
  charges: { scrutiny: '', development: '', welfare: '', service: '', other: '' },
};
const inRange = (n: number, min: number, max: number) => Number.isFinite(n) && n >= min && n <= max;
export function approvalAmount(value: ApprovalSelection, builtArea: number): number | null {
  if (value.mode === 'unpriced') return null;
  if (value.mode === 'total') {
    if (!value.total.trim()) return null;
    const total = Number(value.total);
    return inRange(total, 1, 100000000) && Number.isInteger(total) ? total : NaN;
  }
  if (!approvalSlabs.some(slab => slab.id === value.category) || !value.rate.trim() || (!value.linkedArea && !value.area.trim())) return null;
  const area = value.linkedArea ? builtArea : Number(value.area);
  const rate = Number(value.rate);
  const charges = approvalCharges.map(({ key }) => Number(value.charges[key] || 0));
  if (!inRange(area, 1, 500000) || !inRange(rate, .01, 100000) || charges.some(n => !inRange(n, 0, 100000000) || !Number.isInteger(n))) return NaN;
  const total = Math.round(area * rate) + charges.reduce((sum, n) => sum + n, 0);
  return inRange(total, 1, 100000000) ? total : NaN;
}
export function approvalAllowance(value: ApprovalSelection, builtArea: number) {
  const slab = approvalSlabs.find(slab => slab.id === value.category);
  const location = [slab?.label, value.category === 'gcc' && value.zone ? `GCC Zone ${value.zone}` : '', value.locality.trim()].filter(Boolean).join(' / ');
  const area = value.linkedArea ? builtArea : Number(value.area);
  const chargeDetail = approvalCharges.filter(({key}) => Number(value.charges[key]) > 0).map(({key, label}) => `${label}: INR ${value.charges[key]}`).join('; ');
  const pricing = value.mode === 'total' ? 'Entered total; replaces the slab and separate charges' : value.mode === 'unpriced' ? 'Route and fee to be confirmed' : `${area} sq.ft x INR ${value.rate || '?'} / sq.ft; reference estimate, eligibility and current fees need verification${chargeDetail ? '; ' + chargeDetail : '; no separate charges entered'}`;
  return { key: 'approval', label: 'Building approval fee', selected: value.selected, amount: approvalAmount(value, builtArea), detail: [location, pricing, 'Professional fees excluded'].filter(Boolean).join(' · ') };
}
