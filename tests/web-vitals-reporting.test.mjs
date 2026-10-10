import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareWebVitalEvent } from '../lib/web-vitals-reporting.ts';

test('Core Web Vitals are reportable by metric name and rating using standard GA4 fields', () => {
  assert.deepEqual(prepareWebVitalEvent({name:'LCP', value:2479.9, rating:'good'}, '/packages'), {
    name:'web_vital_lcp_good',
    params:{value:2480,metric_name:'LCP',metric_value:2480,metric_unit:'ms',page_path:'/packages'},
  });
  assert.deepEqual(prepareWebVitalEvent({name:'INP',value:289.6,rating:'needs-improvement'},'/'), {
    name:'web_vital_inp_needs_improvement',
    params:{value:290,metric_name:'INP',metric_value:290,metric_unit:'ms',page_path:'/'},
  });
  assert.deepEqual(prepareWebVitalEvent({name:'CLS',value:0.12,rating:'needs-improvement'}, '/process'), {
    name:'web_vital_cls_needs_improvement',
    params:{value:120,metric_name:'CLS',metric_value:120,metric_unit:'thousandths',page_path:'/process'},
  });
  assert.equal(prepareWebVitalEvent({name:'LCP',value:Infinity,rating:'poor'},'/'),null);
  assert.equal(prepareWebVitalEvent({name:'LCP',value:-1,rating:'poor'},'/'),null);
  assert.equal(prepareWebVitalEvent({name:'NOT_A_VITAL',value:12,rating:'good'},'/'),null);
});
