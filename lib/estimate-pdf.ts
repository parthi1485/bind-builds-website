import { jsPDF } from 'jspdf';
import { regular, bold } from './pdf-fonts.mjs';
export type PdfReportData = {
  packageName: string; total: string; date: string; facts: [string, string][];
  rows: [string, string][]; unpriced: string[]; comparisons: string[][]; stages: string[][];
  assumptions: string[]; contact: string; url: string;
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
  const ink = '#17221f', muted = '#56655d', blue = '#1459df', paper = '#eff3ed';
  const left = 18, right = 192;
  let y = 0;
  function header(title: string, kicker: string) {
    doc.setFillColor(ink); doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor('#ffffff'); doc.setFont('BindReportSans', 'bold'); doc.setFontSize(18); doc.text('BIND BUILDS', left, 17);
    doc.setFont('BindReportSans', 'normal'); doc.setFontSize(8); doc.text('ARCHITECT-LED CONSTRUCTION | CHENNAI', left, 25);
    doc.text(clean(data.date), right, 17, { align: 'right' });
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
  function row(label: string, value: string, highlight = false) {
    doc.setFont('BindReportSans', 'normal'); doc.setFontSize(9);
    const lines: string[] = doc.splitTextToSize(clean(label), 112);
    const height = Math.max(10, lines.length * 4.5 + 5);
    ensure(height);
    if (highlight) { doc.setFillColor(paper); doc.rect(left - 2, y - 5, 178, height, 'F'); }
    doc.setTextColor(ink); doc.setFont('BindReportSans', highlight ? 'bold' : 'normal'); doc.setFontSize(9);
    doc.text(lines, left, y, { lineHeightFactor: 1.35 }); doc.text(clean(value), right, y, { align: 'right' });
    y += height; doc.setDrawColor('#d8dfd6'); doc.line(left, y - 5, right, y - 5);
  }
  header('Your construction budget.', 'Planning estimate / ' + clean(data.packageName));
  doc.setFillColor(paper); doc.roundedRect(left, y - 3, 174, 32, 2, 2, 'F');
  doc.setFont('BindReportSans', 'normal'); doc.setTextColor(muted); doc.setFontSize(9); doc.text('PLANNING SUBTOTAL', left + 6, y + 5);
  doc.setFont('BindReportSans', 'bold'); doc.setTextColor(blue); doc.setFontSize(25); doc.text(clean(data.total), left + 6, y + 19); y += 38;
  paragraph('Not a quotation. Taxes, approval charges, site-specific work and other exclusions are additional. See the assumptions in this report.');
  data.facts.forEach(([label, value]) => row(label, value));
  if (data.unpriced.length) { section('Selected extras still to be quoted'); paragraph(data.unpriced.join(' | ') + '. These items are excluded from the subtotal.', 9, '#8b4216'); }
  section('Cost breakdown');
  data.rows.forEach(([label, value]) => row(label, value, label === 'Base construction total'));
  row('Planning subtotal', data.total, true);
  paragraph('Amounts beside selected extras are your planning allowances, not Bind Builds prices. An empty amount means the work is unpriced, not included for free.', 8);
  newPage('Compare. Plan. Refine.', 'Package comparison & budget allocation');
  paragraph('The package comparison uses the same calculated area. It excludes extras and the optional reserve to keep the base construction costs comparable.');
  data.comparisons.forEach(([name, rate, base]) => row(name + ' | ' + rate, base, name === data.packageName));
  section('Illustrative ten-stage allocation');
  paragraph('An assumed distribution of the base construction cost only. This is not a bill of quantities, invoice or agreed payment schedule. Actual quantities, sequence and milestones can differ.');
  data.stages.forEach(([name, percent, amount]) => row(name + ' | ' + percent, amount));
  newPage('The scope behind the number.', 'Keep these assumptions with your estimate');
  data.assumptions.forEach((text, index) => paragraph(`${index + 1}. ${text}`, 9));
  section('About this report');
  paragraph('This report records the construction estimate only. Optional time and loan scenarios explored on the website are separate and are not included. Package rates and project requirements must be reconfirmed before any commitment.');
  paragraph('Prepared using the Bind Builds construction cost calculator. No personal contact information is required to generate this estimate.');
  section('Let\'s make it specific to your site');
  paragraph('Share this report with Bind Builds to review your site, requirements, inclusions and exclusions, then prepare a project-specific proposal.');
  paragraph(data.contact, 10, ink);
  paragraph(data.url, 8, blue);
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page); doc.setDrawColor('#d8dfd6'); doc.line(left, 279, right, 279);
    doc.setTextColor(muted); doc.setFont('BindReportSans', 'normal'); doc.setFontSize(8);
    doc.text('BIND BUILDS | Planning estimate - not a quotation', left, 286);
    doc.text(`${page} / ${pages}`, right, 286, { align: 'right' });
  }
  return doc;
}
