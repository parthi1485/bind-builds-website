'use client';

import { useRef, useState } from 'react';

export type QualityCheck = readonly [string, string, boolean];
export type QualityStage = {
  no: string;
  title: string;
  note: string;
  checks: QualityCheck[];
};

type Props = { stages: QualityStage[] };

function compactTitle(title: string) {
  return title
    .replace(' — before pour', '')
    .replace('Column & slab reinforcement', 'Column + slab')
    .replace('Waterproofing & pre-flooring', 'Waterproofing')
    .replace('Block work / brickwork', 'Brickwork');
}

export default function QualityStageTabs({ stages }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[activeIndex] ?? stages[0];
  if (!stage) return null;
  const holds = stage.checks.filter(([, , hold]) => hold).length;
  const selectStage = (index: number, focus = false) => {
    setActiveIndex(index);
    setExpanded(false);
    if (focus) tabs.current[index]?.focus({ preventScroll: true });
    tabs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  };
  return <div className="qualityStageExperience qualityCalm">
    <div className="qualityStageRail" role="tablist" aria-label="Quality control stages">
      {stages.map((item,index)=><button key={item.no} ref={node=>{tabs.current[index]=node;}}
        id={`qc-stage-${item.no}`} type="button" role="tab" aria-selected={activeIndex===index}
        aria-controls="qc-panel" tabIndex={activeIndex===index?0:-1}
        onClick={()=>selectStage(index)} onKeyDown={event=>{
          let next=index;
          if(event.key==='ArrowRight')next=(index+1)%stages.length;
          else if(event.key==='ArrowLeft')next=(index-1+stages.length)%stages.length;
          else if(event.key==='Home')next=0;
          else if(event.key==='End')next=stages.length-1;
          else return;
          event.preventDefault();selectStage(next,true);
        }}><span>{item.no}</span>{compactTitle(item.title)}</button>)}
    </div>
    <section className="qualityStagePanel" id="qc-panel" role="tabpanel" aria-labelledby={`qc-stage-${stage.no}`} tabIndex={0}>
      <div className="qualityCalmContent" key={stage.no}>
        <span className="eyebrow">Stage {stage.no} / {stage.checks.length} checks / {holds} hold points</span>
        <h4>{stage.title}</h4>
        <p>Drawing checks, site verification and recorded hold points guide this stage.</p>
        <ul className="qualityPreview">{stage.checks.filter(([, ,hold])=>hold).slice(0,3).map(([check])=><li key={check}>{check}</li>)}</ul>
        <button type="button" className="qualityExpand" aria-expanded={expanded} aria-controls="qc-checklist" onClick={()=>setExpanded(!expanded)}>{expanded?'Hide detailed checklist':'View detailed checklist'} <span aria-hidden="true">{expanded?'−':'+'}</span></button>
        <div id="qc-checklist" hidden={!expanded}><ol className="qualityCalmChecks">{stage.checks.map(([check,spec,hold])=><li key={check}><div><strong>{check}</strong>{hold&&<span className="qualityHold">Hold point</span>}</div><p>{spec}</p></li>)}</ol><p className="processSourceNote">Hold points must be cleared before the next dependent activity proceeds. Project-specific consultant instructions govern the checks.</p></div>
      </div>
    </section>
  </div>;
}
