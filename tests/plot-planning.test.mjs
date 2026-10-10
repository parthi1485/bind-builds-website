import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculatePlotPlanning, plotPlanningBrief } from '../lib/plot-planning.ts';
const read = path => readFileSync(new URL('../' + path, import.meta.url),'utf8');

test('illustrative area ratio arithmetic is correct for example ground and G+1 through G+3 scenarios',()=>{
 const base={frontageFt:30,depthFt:40,illustrativeCountedAreaPerLevel:750};
 for (let n=1;n<=4;n++){
  const value=calculatePlotPlanning({...base,levels:n});
  assert.equal(value.plotAreaSqft,1200);
  assert.equal(value.exampleCountedAreaSqft,750*n);
  assert.equal(value.illustrativeRatio,Math.round(750*n/1200*100)/100);
 }
});
test('decimals, invalid dimensions and non-finite values are handled safely',()=>{
 assert.equal(calculatePlotPlanning({frontageFt:27.5,depthFt:40,illustrativeCountedAreaPerLevel:550,levels:2}).illustrativeRatio,1);
 const valid={frontageFt:30,depthFt:40,illustrativeCountedAreaPerLevel:700,levels:2};
 for(const patch of [{frontageFt:0},{depthFt:4},{frontageFt:Infinity},{depthFt:NaN},{illustrativeCountedAreaPerLevel:0},{levels:0},{levels:5},{levels:2.2}]){
  assert.equal(calculatePlotPlanning({...valid,...patch}),null);
 }
 assert.equal(calculatePlotPlanning({...valid,illustrativeCountedAreaPerLevel:1300}).areaExceedsPlot,true);
});
test('scenario brief says illustrative, never asserts official building permission',()=>{
 const input={frontageFt:30,depthFt:40,illustrativeCountedAreaPerLevel:750,levels:2};
 const brief=plotPlanningBrief(input,calculatePlotPlanning(input),'Porur, Chennai');
 assert.match(brief,/Porur, Chennai/);
 assert.match(brief,/Illustrative area ratio: 1\.25/);
 assert.match(brief,/NOT permitted FSI/);
 assert.match(brief,/registered professional/);
 assert.doesNotMatch(brief,/approved for construction|permitted FSI: 1\.25/i);
});
test('worksheet provides an explicit consent-to-share and does not confuse counted area with built-up area',()=>{
 const ui=read('components/PlotPlanningWorksheet.tsx');
 const page=read('app/building-plan-approval-chennai/page.tsx');
 assert.match(ui,/type="number"/);
 assert.match(ui,/aria-label="Illustrative area ratio"/);
 assert.match(ui,/not a permitted FSI/i);
 assert.match(ui,/plotPlanningBrief/);
 assert.match(ui,/whatsappUrl/);
 assert.match(ui,/new URLSearchParams/);
 assert.doesNotMatch(ui,/area:.*result\.exampleCountedAreaSqft/);
 assert.match(page,/<PlotPlanningWorksheet\/>/);
 assert.match(page,/href="#plot-worksheet"/);
});
