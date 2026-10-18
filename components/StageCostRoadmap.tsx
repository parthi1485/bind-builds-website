import { money, splitStages } from '@/lib/calculator';
type Allocation=ReturnType<typeof splitStages>;
export default function StageCostRoadmap({allocation,base,extras}:{allocation:Allocation;base:number;extras:number}){
 const parts=[
  {no:'01',name:'Groundworks',detail:'Foundation and excavation',items:allocation.slice(0,1)},
  {no:'02',name:'Structure and walls',detail:'RCC frame and masonry',items:allocation.slice(1,3)},
  {no:'03',name:'Services and key finishes',detail:'Waterproofing, flooring, joinery, plumbing and electrical',items:allocation.slice(3,8)},
  {no:'04',name:'Completion and overheads',detail:'Painting, finishing and remaining overheads',items:allocation.slice(8,10)}
 ];
 return <section className="stageCostRoadmap calcReportCard" aria-labelledby="stage-cost-title">
  <span className="eyebrow">A budget you can plan around / illustrative distribution</span>
  <h3 id="stage-cost-title">Understand where<br/>construction money goes.</h3>
  <p>Breaking down the base construction estimate makes the total easier to understand. These are example cost allocations, <strong>not payment demands or agreed milestones.</strong></p>
  <div className="stageCostBars" role="img" aria-label={parts.map(p=>p.name+': '+p.items.reduce((s,i)=>s+i.percent,0)+' percent').join('; ')}>
   {parts.map(p=><span key={p.no} style={{width:p.items.reduce((s,i)=>s+i.percent,0)+'%'}} aria-hidden="true"/>)}
  </div>
  <div className="stageCostCards">{parts.map(p=><article key={p.no}><span className="stageCostNumber">{p.no}</span><h4>{p.name}</h4><p>{p.detail}</p><div><strong>{money(p.items.reduce((s,i)=>s+i.amount,0))}</strong><span>{p.items.reduce((s,i)=>s+i.percent,0)}% of base</span></div></article>)}</div>
  <div className="stageCostTotals"><span>Base construction allocation</span><strong>{money(base)}</strong>{extras>0&&<><span>Other priced additional items</span><strong>{money(extras)}</strong></>}</div>
  <p className="stageCostDisclaimer">Actual cash-flow, invoice timing and stage payments are determined only by your signed project agreement. The estimate excludes unpriced items, taxes and other stated exclusions. Cost stages may overlap during construction.</p>
 </section>
}
