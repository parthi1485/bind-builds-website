/** Pure planning calculations. All money is rounded to whole INR. No quotation or approval logic. */
export type Allowance = { key: string; label: string; selected: boolean; amount: number | null };
export type EstimateInput = { plot: number; floors: number[]; rate: number; headroom: number; allowances: Allowance[]; reservePercent: number };
export const floorName = (index: number) => ['Ground floor', 'First floor', 'Second floor', 'Third floor'][index] || `Floor ${index + 1}`;
export const configuration = (count: number) => count === 1 ? 'Ground only' : `G + ${count - 1}`;
export const extras = [
  { key: 'parking', label: 'Separate car parking', detail: 'Only if excluded from the floor areas above.' },
  { key: 'compound', label: 'Compound wall & gate', detail: 'Boundary length, height and gate design affect cost.' },
  { key: 'sump', label: 'Underground sump', detail: 'Capacity, ground conditions and construction need review.' },
  { key: 'septic', label: 'Septic / wastewater system', detail: 'Confirm the drainage solution suitable for your site.' },
  { key: 'solar', label: 'Solar installation', detail: 'System capacity and equipment to be agreed.' },
  { key: 'lift', label: 'Lift equipment', detail: 'Equipment and installation; confirm shaft scope separately.' },
  { key: 'smart', label: 'CCTV & smart-home upgrades', detail: 'Devices, cabling and automation beyond package scope.' },
  { key: 'interiors', label: 'Interiors & fitted furniture', detail: 'Wardrobes, modular kitchen and other excluded fit-out.' },
  { key: 'tank', label: 'Overhead tank upgrade', detail: 'Only the upgrade beyond the tank already in your package.' },
] as const;
export const stages = [
  { name: 'Site work & foundation', percent: 15 },
  { name: 'RCC frame & roof', percent: 25 },
  { name: 'Masonry', percent: 12 },
  { name: 'Plaster & waterproofing', percent: 10 },
  { name: 'Flooring', percent: 9 },
  { name: 'Doors & windows', percent: 9 },
  { name: 'Plumbing & sanitary', percent: 7 },
  { name: 'Electrical', percent: 6 },
  { name: 'Painting', percent: 5 },
  { name: 'Finishing & handover', percent: 2 },
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
  const headroomCost = Math.round(input.headroom * input.rate);
  const base = floorCost + headroomCost;
  const allowanceTotal = selected.reduce((total, item) => total + (item.amount ?? 0), 0);
  const subtotal = base + allowanceTotal;
  const reserve = Math.round(subtotal * input.reservePercent / 100);
  return { area, floorArea, floorCost, headroomCost, base, allowanceTotal, subtotal, reserve, total: subtotal + reserve,
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
