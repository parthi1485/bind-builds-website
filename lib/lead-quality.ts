export type LeadPriority = 'Priority' | 'Develop' | 'Nurture';

export type LeadQualityInput = {
  intent: string;
  stage: string;
  timeline: string;
  budget: string;
  area?: string;
  package?: string;
};

export type LeadQuality = {
  priority: LeadPriority;
  score: number;
  reasons: string[];
  nextAction: string;
};

export function classifyLead(input: LeadQualityInput): LeadQuality {
  let score = 0;
  const reasons: string[] = [];

  if (input.intent === 'Ready to discuss scope and next steps') {
    score += 4; reasons.push('ready to discuss');
  } else if (input.intent === 'Comparing construction proposals') {
    score += 3; reasons.push('comparing proposals');
  } else if (input.intent === 'Planning for later') {
    score += 1; reasons.push('planning for later');
  } else if (input.intent === 'Just researching') {
    reasons.push('research stage');
  }

  if (input.stage === 'Land purchased' || input.stage === 'Approved drawings ready') {
    score += 3; reasons.push(input.stage.toLowerCase());
  } else if (input.stage === 'Design in progress' || input.stage === 'Existing building to renovate / rebuild') {
    score += 2; reasons.push(input.stage.toLowerCase());
  } else {
    reasons.push('plot not finalised');
  }

  if (input.timeline === 'Within 3 months') {
    score += 3; reasons.push('start within 3 months');
  } else if (input.timeline === '3–6 months') {
    score += 2; reasons.push('start in 3–6 months');
  } else if (input.timeline === '6–12 months') {
    score += 1; reasons.push('start in 6–12 months');
  } else {
    reasons.push(input.timeline.toLowerCase());
  }

  if (input.budget && input.budget !== 'Not decided yet') {
    score += 1; reasons.push('budget band selected');
  }
  if (input.area?.trim()) {
    score += 1; reasons.push('area supplied');
  }
  if (input.package?.trim()) {
    score += 1; reasons.push('package selected');
  }

  if (score >= 8) {
    return { priority: 'Priority', score, reasons, nextAction: 'Call first. Qualify site, scope and decision-makers; then decide whether to schedule a site meeting.' };
  }
  if (score >= 4) {
    return { priority: 'Develop', score, reasons, nextAction: 'Follow up with the most relevant scope/cost question and move to a qualification call when timing is clear.' };
  }
  return { priority: 'Nurture', score, reasons, nextAction: 'Send useful planning content and keep follow-up light until site, timing or intent becomes clearer.' };
}

export function leadHandoffLine(input: LeadQualityInput) {
  const result = classifyLead(input);
  return `Sales handoff: ${result.priority} · Score ${result.score}/13 · ${result.nextAction} · Signals: ${result.reasons.join(', ')}`;
}
