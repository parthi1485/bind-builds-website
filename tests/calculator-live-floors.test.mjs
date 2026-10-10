import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateEstimate, compactMoney } from '../lib/calculator.ts';
import { constructionMonths } from '../lib/calculator-options.ts';

const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const estimateForFloors = floors => calculateEstimate({ plot: 1200, floors, rate: 2350, headroom: 0, allowances: [], reservePercent: 0 });

test('floor changes recalculate the complete construction subtotal alongside timeline', () => {
  for (const [count,months] of [[1,6],[2,10],[3,14],[4,18]]) {
    const estimate = estimateForFloors(Array(count).fill(900));
    assert.equal(constructionMonths(count),months);
    assert.equal(estimate.floorArea,count*900);
    assert.equal(estimate.total,count*900*2350);
    assert.match(compactMoney(estimate.total),/^₹/);
  }
  assert.equal(estimateForFloors([1000,1200]).total, 2200*2350);
});

test('floor selector, duration card and both subtotal readouts share the same estimate', () => {
  const component = source('components/ConstructionCalculator.tsx');
  assert.match(component,/onChange=\{\(\) => setFloorCount\(count\)\}/);
  assert.match(component,/const duration=constructionMonths\(floorCount\)/);
  assert.match(component,/className="calcDurationBudget"/);
  assert.match(component,/className="calcActionsLive"/);
  assert.match(component,/className="calcPreviewAmount"/);
  assert.match(component,/estimate \? compactMoney\(estimate\.total\)/);
  assert.match(component,/estimate\.floorArea\.toLocaleString\('en-IN'\)/);
  assert.match(component,/key=\{`\$\{floorCount\}-\$\{estimate\?\.total \?\? 'invalid'\}`\}/);
  const css = source('app/ui-fixes.css');
  assert.match(css,/\.calcDurationTop\{/);
  assert.match(css,/\.calcDurationBudget>output\{/);
  assert.match(css,/\.calcActions\{background:#fff;-webkit-backdrop-filter:none!important;backdrop-filter:none!important/);
});
