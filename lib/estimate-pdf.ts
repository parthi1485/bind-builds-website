import { jsPDF } from 'jspdf';
import { regular, bold } from './pdf-fonts.mjs';
import type { VisualEstimate } from './calculator';
export type PdfReportData = {
  packageName: string; total: string; date: string; duration?: string; facts: [string, string][];
  rows: [string, string][]; unpriced: string[]; comparisons: string[][]; stages: string[][];
  assumptions: string[]; contact: string; url: string;
  visuals: VisualEstimate;
};
// Standard PDF fonts do not include the rupee glyph. Use an explicit INR currency label.
const clean = (value: string) => value.replace(/₹/g, 'INR ').replace(/[–—]/g, '-').replace(/·/g, '|').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7e\n]/g, '');
export function createEstimatePdf(data: PdfReportData) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  doc.addFileToVFS('BindReportSans-Regular.ttf', regular);
  doc.addFont('BindReportSans-Regular.ttf', 'BindReportSans', 'normal');
  doc.addFileToVFS('BindReportSans-Bold.ttf', bold);
  doc.addFont('BindReportSans-Bold.ttf', 'BindReportSans', 'bold');
  doc.setProperties({ title: 'Bind Builds | Construction planning estimate', author: 'Bind Builds', subject: 'Indicative construction budget and assumptions' });
  const ink = '#151518', muted = '#65656c', blue = '#0071e3', paper = '#f5f5f7';
  const inr = (value: number) => 'INR ' + Math.round(value).toLocaleString('en-IN');
  const left = 18, right = 192;
  let y = 0;
  function header(title: string, kicker: string) {
    doc.setTextColor(ink); doc.setFont('BindReportSans', 'bold'); doc.setFontSize(16); doc.text('BIND BUILDS', left, 17);
    doc.setFont('BindReportSans', 'normal'); doc.setFontSize(7); doc.setTextColor(muted); doc.text('ARCHITECT-LED CONSTRUCTION | CHENNAI', left, 25);
    doc.text(clean(data.date), right, 17, { align: 'right' });
    doc.setDrawColor('#e0e0e5'); doc.line(left, 32, right, 32);
    y = 48; doc.setTextColor(blue); doc.setFontSize(8); doc.text(kicker.toUpperCase(), left, y);
    y += 12; doc.setTextColor(ink); doc.setFontSize(23); doc.text(title, left, y); y += 12;
  }
  function newPage(title = 'Estimate details', kicker = 'Planning report / Continued') { doc.addPage(); header(title, kicker); }
  function ensure(height: number) { if (y + height > 271) newPage(); }
  function paragraph(text: string, size = 9, color = muted) {
    doc.setFont('BindReportSans', 'normal'); doc.setFontSize(size); doc.setTextColor(color);
    const lines = doc.splitTextToSize(clean(text), right - left);
    ensure(lines.length * (size * .45) + 4);
    // ensure() may have drawn a new page header; restore paragraph typography.
    doc.setFont('BindReportSans', 'normal'); doc.setFontSize(size); doc.setTextColor(color);
    doc.text(lines, left, y, { lineHeightFactor: 1.4 }); y += lines.length * (size * .5) + 4;
  }
  function section(title: string) {
    ensure(20); y += 4; doc.setTextColor(ink); doc.setFont('BindReportSans', 'bold'); doc.setFontSize(12); doc.text(title, left, y); y += 8;
  }
  function row(label: string, value: string, highlight = false, share?: number) {
    doc.setFont('BindReportSans', 'normal'); doc.setFontSize(9);
    const lines: string[] = doc.splitTextToSize(clean(label), 112);
    const height = Math.max(10, lines.length * 4.5 + 5);
    ensure(height);
    if (highlight) { doc.setFillColor(paper); doc.rect(left - 2, y - 5, 178, height, 'F'); }
    doc.setTextColor(ink); doc.setFont('BindReportSans', highlight ? 'bold' : 'normal'); doc.setFontSize(9);
    doc.text(lines, left, y, { lineHeightFactor: 1.35 }); doc.text(clean(value), right, y, { align: 'right' });
    y += height; doc.setDrawColor('#e0e0e5'); doc.line(left, y - 5, right, y - 5);
    if (share !== undefined) { doc.setFillColor(blue); doc.rect(left, y - 5.5, (right - left) * share, 1.1, 'F'); y += 2; }
  }
  header('Your home. In numbers.', 'Planning estimate / ' + clean(data.packageName));
  doc.setFillColor(paper); doc.roundedRect(left, y - 3, 174, 32, 2, 2, 'F');
  doc.setFont('BindReportSans', 'normal'); doc.setTextColor(muted); doc.setFontSize(9); doc.text('PLANNING SUBTOTAL', left + 6, y + 5);
  doc.setFont('BindReportSans', 'bold'); doc.setTextColor(blue); doc.setFontSize(25); doc.text(clean(data.total), left + 6, y + 19); y += 38;
  paragraph('Not a quotation. Taxes, approval charges, site-specific work and other exclusions are additional. See the assumptions in this report.');
  if (data.duration) paragraph(data.duration, 9, ink);
  const factTop = y;
  data.facts.forEach(([label, value], index) => {
    const x = left + (index % 2) * 89, top = factTop + Math.floor(index / 2) * 21;
    doc.setFont('BindReportSans', 'normal'); doc.setTextColor(muted); doc.setFontSize(8); doc.text(clean(label), x, top);
    doc.setFont('BindReportSans', 'bold'); doc.setTextColor(ink); doc.setFontSize(12); doc.text(clean(value), x, top + 7);
  });
  y = factTop + 43;
  section('Where your budget goes');
  const chartTop = y, cx = left + 34, cy = chartTop + 29, radius = 24;
  let angle = -Math.PI / 2;
  doc.setLineWidth(8);
  data.visuals.parts.filter(part => part.value > 0).forEach(part => {
    const end = angle + part.value / data.visuals.total * Math.PI * 2;
    const steps = Math.max(4, Math.ceil((end - angle) * 24));
    const startX = cx + Math.cos(angle) * radius, startY = cy + Math.sin(angle) * radius;
    let previousX = startX, previousY = startY;
    const lines: number[][] = [];
    for (let step = 1; step <= steps; step++) {
      const next = angle + (end - angle) * step / steps;
      const x = cx + Math.cos(next) * radius, pointY = cy + Math.sin(next) * radius;
      lines.push([x - previousX, pointY - previousY]); previousX = x; previousY = pointY;
    }
    doc.setDrawColor(part.color); doc.lines(lines, startX, startY, [1, 1], 'S', false); angle = end;
  });
  doc.setLineWidth(.2); doc.setTextColor(ink); doc.setFont('BindReportSans', 'bold'); doc.setFontSize(14); doc.text('100%', cx, cy + 1, { align: 'center' });
  doc.setTextColor(muted); doc.setFont('BindReportSans', 'normal'); doc.setFontSize(7); doc.text('of the subtotal', cx, cy + 7, { align: 'center' });
  data.visuals.parts.forEach((part, index) => {
    const x = left + 78, top = chartTop + 9 + index * 17;
    doc.setFillColor(part.color); doc.circle(x, top - 1, 1.3, 'F');
    doc.setTextColor(muted); doc.setFont('BindReportSans', 'normal'); doc.setFontSize(8); doc.text(clean(part.label), x + 5, top);
    doc.text((part.value / data.visuals.total * 100).toFixed(1) + '%', right, top, { align: 'right' });
    doc.setTextColor(ink); doc.setFont('BindReportSans', 'bold'); doc.setFontSize(11); doc.text(inr(part.value), x + 5, top + 6);
  });
  y = chartTop + 68;
  paragraph(data.unpriced.length ? `${data.unpriced.length} selected extra(s) still need a quote and are excluded from the subtotal. See the breakdown on the next page.` : 'The diagram shows the planning subtotal only. Taxes, approvals and site-specific exclusions remain additional.', 8);
  newPage('Your build. By category.', 'Construction cost distribution');
  paragraph('Illustrative allocation of base construction only. The percentages follow the supplied reference and total 100%. Extras and planning reserve are separate; this is not a BOQ or payment schedule.');
  const categoryTotal = data.visuals.allocation.reduce((sum, part) => sum + part.amount, 0);
  const ringX = 105, ringY = y + 25, ringRadius = 22;
  let ringAngle = -Math.PI / 2;
  doc.setLineWidth(9);
  data.visuals.allocation.forEach(part => {
    const end = ringAngle + part.amount / categoryTotal * Math.PI * 2;
    const count = Math.max(4, Math.ceil((end - ringAngle) * 25));
    let px = ringX + Math.cos(ringAngle) * ringRadius, py = ringY + Math.sin(ringAngle) * ringRadius;
    const sx = px, sy = py, points: number[][] = [];
    for (let i = 1; i <= count; i++) { const theta = ringAngle + (end - ringAngle) * i / count; const nx = ringX + Math.cos(theta) * ringRadius, ny = ringY + Math.sin(theta) * ringRadius; points.push([nx-px,ny-py]); px=nx; py=ny; }
    doc.setDrawColor(part.color); doc.lines(points,sx,sy,[1,1],'S',false); ringAngle=end;
  });
  doc.setLineWidth(.2); doc.setFont('BindReportSans','bold'); doc.setFontSize(16); doc.setTextColor(ink); doc.text('100%',ringX,ringY,{align:'center'});
  doc.setFont('BindReportSans','normal'); doc.setFontSize(8); doc.text('base construction',ringX,ringY+7,{align:'center'}); y+=61;
  data.visuals.allocation.forEach(part => row(part.name + ' | ' + part.percent + '%', inr(part.amount)));
  row('Base construction total',inr(categoryTotal),true);
  newPage('The detail behind the total.', 'Cost breakdown / ' + clean(data.packageName));
  data.rows.forEach(([label, value]) => row(label, value, label === 'Base construction total'));
  row('Planning subtotal', data.total, true);
  paragraph('Extra quantities and rates are editable reference or custom planning allowances, not verified Bind Builds prices. An empty amount means the work is unpriced, not included for free.', 8);
  newPage('Compare. Plan. Refine.', 'Package comparison & budget allocation');
  paragraph('The package comparison uses the same calculated area. It excludes extras and the optional reserve to keep the base construction costs comparable.');
  const maximumBase = Math.max(...data.visuals.comparisons.map(item => item.base));
  data.visuals.comparisons.forEach(item => row(item.name + ' | ' + inr(item.rate) + ' / sq.ft', inr(item.base), item.name === data.packageName, item.base / maximumBase));
  section('Illustrative category allocation');
  paragraph('An assumed distribution of the base construction cost only. This is not a bill of quantities, invoice or agreed payment schedule. Actual quantities, sequence and milestones can differ.');
  data.visuals.allocation.forEach(item => row(item.name + ' | ' + item.percent + '%', inr(item.amount), false, item.percent / 100));
  newPage('The scope behind the number.', 'Keep these assumptions with your estimate');
  data.assumptions.forEach((text, index) => paragraph(`${index + 1}. ${text}`, 9));
  section('About this report');
  paragraph('This report includes the floor-based construction duration assumption. Optional spending and loan scenarios explored on the website are separate and are not included. Package rates and project requirements must be reconfirmed before any commitment.');
  paragraph('Prepared using the Bind Builds construction cost calculator. No personal contact information is required to generate this estimate.');
  section('Let\'s make it specific to your site');
  paragraph('Share this report with Bind Builds to review your site, requirements, inclusions and exclusions, then prepare a project-specific proposal.');
  paragraph(data.contact, 10, ink);
  paragraph(data.url, 8, blue);
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page); doc.setDrawColor('#e0e0e5'); doc.line(left, 279, right, 279);
    doc.setTextColor(muted); doc.setFont('BindReportSans', 'normal'); doc.setFontSize(8);
    doc.text('BIND BUILDS | Planning estimate - not a quotation', left, 286);
    doc.text(`${page} / ${pages}`, right, 286, { align: 'right' });
  }
  return doc;
}
