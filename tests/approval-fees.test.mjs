import { test } from 'node:test';
import assert from 'node:assert/strict';
import { approvalSlabs, initialApproval, approvalAmount, approvalAllowance } from '../lib/approval-fees.ts';
import { calculateEstimate, createVisualData } from '../lib/calculator.ts';

const municipality = { ...initialApproval, selected: true, category: 'municipal-i-ii', rate: '70' };
test('reference example reconciles without silently adding incidental charges', () => {
  assert.equal(approvalAmount(municipality, 1000), 70000);
  const charges = { scrutiny: '2500', development: '8000', welfare: '2500', service: '1000', other: '' };
  assert.equal(approvalAmount({...municipality, charges}, 1000), 84000);
});
test('every supplied slab calculates and GCC zones do not invent a different rate', () => {
  for (const slab of approvalSlabs) assert.equal(approvalAmount({...municipality, category:slab.id, rate:String(slab.rate)}, 1000), slab.rate * 1000);
  for (let zone = 1; zone <= 15; zone++) {
    const value = {...municipality, category:'gcc', rate:'100', zone:String(zone)};
    assert.equal(approvalAmount(value, 1000), 100000);
    assert.match(approvalAllowance(value, 1000).detail, new RegExp(`GCC Zone ${zone}`));
  }
  assert.equal(approvalSlabs.some(slab => slab.rate === 37), false);
});
test('linked area follows floor changes while a manual approval area remains fixed', () => {
  assert.equal(approvalAmount(municipality, 1800), 126000);
  assert.equal(approvalAmount(municipality, 2700), 189000);
  assert.equal(approvalAmount({...municipality,linkedArea:false,area:'1000'}, 2700), 70000);
});
test('confirmed total replaces all slab and separate-charge calculations', () => {
  const value = {...municipality, mode:'total', total:'92000', charges:{...initialApproval.charges,development:'8000'}};
  assert.equal(approvalAmount(value, 2700), 92000);
  assert.match(approvalAllowance(value, 2700).detail, /replaces the slab/);
  assert.doesNotMatch(approvalAllowance(value, 2700).detail, /8000/);
});
test('unknown, blank and review selections stay unpriced; invalid values block totals', () => {
  for (const value of [initialApproval, {...municipality,mode:'unpriced'}, {...municipality,rate:''}, {...municipality,linkedArea:false,area:''}, {...municipality,mode:'total',total:''}]) assert.equal(approvalAmount(value, 1000), null);
  for (const value of [{...municipality,rate:'-1'}, {...municipality,rate:'Infinity'}, {...municipality,linkedArea:false,area:'0'}, {...municipality,charges:{...initialApproval.charges,development:'-10'}}, {...municipality,mode:'total',total:'1.5'}, {...municipality,mode:'total',total:'100000001'}]) assert.ok(Number.isNaN(approvalAmount(value, 1000)));
});
test('approval appears once in additional items and never in base construction', () => {
  const allowance = approvalAllowance(municipality, 1000);
  const input = { plot:1200, floors:[1000], rate:2649, headroom:0, reservePercent:0, allowances:[allowance] };
  const result = calculateEstimate(input);
  assert.equal(result.base, 2649000);
  assert.equal(result.allowanceTotal, 70000);
  assert.equal(result.total, 2719000);
  const visual = createVisualData(input,result,'Elevate',[]);
  assert.equal(visual.extras[0].label, 'Building approval fee');
  assert.equal(visual.extras[0].value, 70000);
  assert.equal(calculateEstimate({...input,allowances:[{...allowance,selected:false}]}).total, result.base);
  const unpriced = calculateEstimate({...input,allowances:[approvalAllowance({...municipality,mode:'unpriced'},1000)]});
  assert.equal(unpriced.total, result.base);
  assert.equal(unpriced.unpriced[0].key, 'approval');
});
