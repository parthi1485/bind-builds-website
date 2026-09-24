'use client';

import { useState } from 'react';

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
  const stage = stages[activeIndex] ?? stages[0];
  if (!stage) return null;

  const holds = stage.checks.filter(([, , hold]) => hold).length;
  const routine = stage.checks.length - holds;
  const panelId = `qc-panel-${stage.no}`;

  return <div className="qualityStageExperience">
    <div className="qualityStageRail" role="tablist" aria-label="Quality control stages">
      {stages.map((item, index) => {
        const holdCount = item.checks.filter(([, , hold]) => hold).length;
        const selected = index === activeIndex;
        return <button
          key={item.no}
          id={`qc-stage-${item.no}`}
          className={`qualityStageTab ${selected ? 'isActive' : ''}`}
          type="button"
          role="tab"
          aria-selected={selected}
          aria-controls={panelId}
          tabIndex={selected ? 0 : -1}
          onClick={() => setActiveIndex(index)}
        >
          <span className="qualityStageTabMark" aria-hidden="true">{selected ? '✓' : item.no}</span>
          <span className="qualityStageTabCopy">
            <strong>{compactTitle(item.title)}</strong>
            <small>{item.checks.length} checks · {holdCount} hold</small>
          </span>
          <span className="qualityStageTabNo" aria-hidden="true">{item.no}</span>
        </button>;
      })}
    </div>

    <section
      className="qualityStagePanel"
      id={panelId}
      role="tabpanel"
      aria-labelledby={`qc-stage-${stage.no}`}
      key={stage.no}
    >
      <div className="qualityStagePanelHero">
        <div className="qualityStagePanelCopy">
          <span className="qualityStageKicker">Stage {stage.no} · Quality gate</span>
          <h3>{stage.title}</h3>
          <p>{stage.note}</p>
          <div className="qualityStageMetrics" aria-label="Selected stage quality metrics">
            <div><strong>{stage.checks.length}</strong><span>Total checks</span></div>
            <div><strong>{holds}</strong><span>Hold points</span></div>
            <div><strong>{routine}</strong><span>Routine checks</span></div>
          </div>
        </div>
        <div className="qualityStageSignal" aria-hidden="true">
          <svg viewBox="0 0 240 240" role="img">
            <circle cx="120" cy="120" r="82"/>
            <path d="M82 122l25 25 53-62"/>
            <path d="M120 22v25M120 193v25M22 120h25M193 120h25"/>
          </svg>
          <span>QC</span>
        </div>
      </div>

      <div className="qualityStageChecklist">
        <div className="qualityStageChecklistHead">
          <div>
            <span className="eyebrow">Stage checklist</span>
            <h4>Verify before the work is covered.</h4>
          </div>
          <p><strong>HOLD</strong> items must be cleared before the next dependent activity is released.</p>
        </div>

        <div className="qualityCheckGrid">
          {stage.checks.map(([check, spec, hold], index) =>
            <article className={`qualityCheckCard ${hold ? 'isHold' : ''}`} key={check}>
              <div className="qualityCheckCardTop">
                <span className="qualityCheckIndex">{String(index + 1).padStart(2, '0')}</span>
                {hold && <span className="holdBadge">HOLD</span>}
              </div>
              <h5>{check}</h5>
              <p>{spec}</p>
            </article>
          )}
        </div>

        <div className="qualityStageGate">
          <span className="qualityStageGateIcon" aria-hidden="true">→</span>
          <div><small>Release gate</small><strong>{holds} hold point{holds === 1 ? '' : 's'} must be cleared before the next dependent activity proceeds.</strong></div>
        </div>
      </div>
    </section>
  </div>;
}
