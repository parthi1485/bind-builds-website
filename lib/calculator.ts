/** Pure planning calculations. All money is rounded to whole INR. No quotation or approval logic. */
export type Allowance = { key: string; label: string; selected: boolean; amount: number | null; detail?: string };
export const HEADROOM_STANDARD_RATE = 2350;\nexport type EstimateInput = { plot: number; floors: number[]; rate: number; headroom: number; headroomRate?: number; allowances: Allowance[]; reservePercent: number };
export const floorName = (index: number) => ['Ground floor', 'First floor', 'Second floor', 'Third floor'][index] || `Floor ${index + 1}`;
export const configuration = (count: number) => count === 1 ? 'Ground only' : `G + ${count - 1}`;
export const stages = [
  { name: 'Foundation & excavation', percent: 20, color: '#0071e3' },
  { name: 'RCC structure & columns', percent: 13, color: '#4389e7' },
  { name: 'Masonry & block work', percent: 12, color: '#7974e8' },
  { name: 'Waterproofing & terrace', percent: 6, color: '#34a6b8' },
  { name: 'Flooring & tiling', percent: 10, color: '#d58954' },
  { name: 'Doors & windows', percent: 8, color: '#4d9b82' },
  { name: 'Plumbing & sanitary', percent: 7, color: '#5372ae' },
  { name: 'Electrical & wiring', percent: 7, color: '#ae913a' },
  { name: 'Painting & finishing', percent: 8, color: '#b86c97' },
  { name: 'Miscellaneous & overheads', percent: 9, color: '#727888' },
] as const;
export function validNumber(value: number, min: number, max: number, whole = false) {
  return Number.isFinite(value) && value >= min && value <= max && (!whole || Number.isInteger(value));
}
export function calculateEstimate(input: EstimateInput) {
  if (!validNumber(input.plot, 1, 100000) || !validNumber(input.rate, 1, 100000) ||
      input.floors.length < 1 || input.floors.length > 4 || input.floors.some(area => !validNumber(area, 1, 100000, true)) ||
      !validNumber(input.headroom, 0, 10000, true) || !validNumber(input.reservePercent, 0, 25)) throw new RangeError('Invalid estimate inputs');
  const selected = input.allowances.filter(item => item.selected);
  if (selected.some(item => item.amount !== null && !validNumber(item.amount, 1, 100000000, true))) throw new RangeError('Invalid allowance');
  const floorArea = input.floors.reduce((total, area) => total + area, 0);
  const area = floorArea + input.headroom;
  const floorCost = Math.round(floorArea * input.rate);
  const headroomCost = Math.round(input.headroom * headroomRate);
  const base = floorCost + headroomCost;
  const allowanceTotal = selected.reduce((total, item) => total + (item.amount ?? 0), 0);
  const subtotal = base + allowanceTotal;
  const reserve = 0; // Estimates contain base construction and selected additional items only.
  return { area, floorArea, floorCost, headroomRate, headroomCost, base, allowanceTotal, subtotal, reserve, total: subtotal + reserve,
    unpriced: selected.filter(item => item.amount === null), selected,
    coverage: input.floors[0] / input.plot * 100,
  };
}
export type Estimate = ReturnType<typeof calculateEstimate>;
export function splitStages(base: number) {
  if (!validNumber(base, 0, 100000000000)) throw new RangeError('Invalid base cost');
  const rounded = Math.round(base);
  let assigned = 0;
  return stages.map((stage, index) => {
    const amount = index === stages.length - 1 ? rounded - assigned : Math.round(rounded * stage.percent / 100);
    assigned += amount;
    return { ...stage, amount };
  });
}
/** Standard reducing-balance EMI: P*r / (1-(1+r)^-n); zero-interest case handled separately. */
export function calculateEmi(principal: number, annualRate: number, years: number) {
  if (!validNumber(principal, 1, 1000000000) || !validNumber(annualRate, 0, 30) || !validNumber(years, 1, 40, true)) return null;
  const months = years * 12;
  const monthlyRate = annualRate / 1200;
  const monthly = monthlyRate === 0 ? principal / months : principal * monthlyRate / -Math.expm1(-months * Math.log1p(monthlyRate));
  const repayment = monthly * months;
  return { monthly, repayment, interest: Math.max(0, repayment - principal) };
}
export const money = (value: number) => '₹' + Math.round(value).toLocaleString('en-IN');
export const compactMoney = (value: number) => value >= 10000000
  ? '₹' + (value / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + ' crore'
  : '₹' + (value / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + ' lakh';

/** One numeric source for on-screen charts, presentation slides and PDF diagrams. */
export function createVisualData(input: EstimateInput, estimate: Estimate, packageName: string, comparisons: {name:string; rate:number; base:number}[]) {
  return {
    packageName, plot: input.plot, area: estimate.area, configuration: configuration(input.floors.length), total: estimate.total, unpricedCount: estimate.unpriced.length,
    parts: [{ label: 'Base construction', value: estimate.base, color: '#0071e3' }, { label: 'Additional items', value: estimate.allowanceTotal, color: '#7974e8' }],
    floors: [...input.floors.map((area,index)=>({label:floorName(index),area})), ...(input.headroom?[{label:'Separate headroom',area:input.headroom}]:[])],
    extras: estimate.selected.filter(item=>item.amount!==null).map((item,index)=>({label:item.label,value:item.amount!,color:stages[index%stages.length].color})),
    comparisons, allocation: splitStages(estimate.base),
  };
}
export type VisualEstimate = ReturnType<typeof createVisualData>;
