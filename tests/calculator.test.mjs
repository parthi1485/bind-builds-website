import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, calculateEmi, splitStages } from '../lib/calculator.ts';
const input = { plot: 1200, floors: [1000, 800], rate: 2649, headroom: 100, allowances: [], reservePercent: 0 };
test('different floor areas and headroom are charged exactly once', () => {
  const result = calculateEstimate(input);
  assert.equal(result.area, 1900);
  assert.equal(result.floorCost, 4768200);
  assert.equal(result.headroomCost, 264900);
  assert.equal(result.total, 5033100);
});
test('unpriced selections stay visible and do not masquerade as included items', () => {
  const result = calculateEstimate({ ...input, allowances: [
    { key: 'sump', label: 'Sump', selected: true, amount: null },
    { key: 'gate', label: 'Gate', selected: true, amount: 125000 },
    { key: 'lift', label: 'Lift', selected: false, amount: 800000 },
  ], reservePercent: 5 });
  assert.equal(result.allowanceTotal, 125000);
  assert.equal(result.unpriced.length, 1);
  assert.equal(result.reserve, 257905);
  assert.equal(result.total, 5416005);
});
test('invalid and nonfinite inputs cannot produce an estimate', () => {
  for (const change of [{floors: []}, {floors: [NaN]}, {floors: [-1]}, {floors: [1.2]}, {plot: 0}, {rate: Infinity}, {headroom: -1}, {reservePercent: 26}, {floors: [1,1,1,1,1]}]) assert.throws(() => calculateEstimate({ ...input, ...change }), RangeError);
  assert.throws(() => calculateEstimate({...input, allowances: [{key:'x',label:'x',selected:true,amount:0}]}), RangeError);
});
test('stage allocation reconciles to the base after rupee rounding', () => {
  for (const base of [2399, 5033100, 5298001, 1279920000]) {
    const parts = splitStages(base);
    assert.equal(parts.reduce((sum, part) => sum + part.amount, 0), base);
    assert.equal(parts.reduce((sum, part) => sum + part.percent, 0), 100);
    assert.ok(parts.every(part => part.amount >= 0));
  }
});
test('EMI follows amortization and handles zero interest', () => {
  assert.ok(Math.abs(calculateEmi(5000000, 8.5, 20).monthly - 43391.16) < 0.01);
  assert.equal(calculateEmi(1200000, 0, 10).monthly, 10000);
  assert.equal(calculateEmi(1200000, 0, 10).interest, 0);
  assert.equal(calculateEmi(100, 8, 0), null);
  assert.equal(calculateEmi(NaN, 8, 20), null);
});
