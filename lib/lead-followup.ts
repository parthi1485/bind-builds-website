import { classifyLead, type LeadPriority, type LeadQualityInput } from './lead-quality';

export type LeadFollowupInput = LeadQualityInput & {
  name: string;
  type: string;
  location: string;
};

export type LeadFollowup = {
  priority: LeadPriority;
  responseMode: string;
  suggestedTiming: string;
  objective: string;
  firstQuestion: string;
  whatsapp: string;
  callChecklist: string[];
  nurtureAsset?: string;
};

function firstName(name: string) {
  const trimmed=name.trim();
  return trimmed ? trimmed.split(/\s+/)[0] : 'there';
}

function missingInfoQuestion(input: LeadFollowupInput) {
  if (input.stage === 'Looking for a plot') return 'Have you shortlisted or purchased the plot yet, and which locality are you considering?';
  if (!input.area?.trim()) return 'Do you have a rough built-up area or floor configuration in mind?';
  if (input.budget === 'Not decided yet') return 'Do you have a comfortable construction budget range you want us to plan around?';
  if (input.timeline === 'Exploring options') return 'When would you realistically like design or construction to begin?';
  if (input.intent === 'Comparing construction proposals') return 'Which part of the proposals are you comparing most closely — scope, specification, design, timeline or price?';
  return 'What is the one decision you need help with before moving to the next step?';
}

function projectLabel(input: LeadFollowupInput) {
  return [input.type, input.location ? 'in '+input.location : ''].filter(Boolean).join(' ');
}

export function createLeadFollowup(input: LeadFollowupInput): LeadFollowup {
  const quality=classifyLead(input);
  const name=firstName(input.name);
  const project=projectLabel(input);
  const firstQuestion=missingInfoQuestion(input);

  const coreChecklist=[
    'Confirm exact site/locality and current ownership or approval stage.',
    'Confirm approximate users, floors and built-up requirement.',
    'Confirm budget direction, finance readiness and who is involved in the decision.',
    'Confirm realistic design/construction start window.',
    'Close with one next step only: information follow-up, qualification call, office/site meeting or proposal review.'
  ];

  if (quality.priority === 'Priority') {
    return {
      priority: quality.priority,
      responseMode: 'Call first; WhatsApp acknowledgement if unanswered',
      suggestedTiming: 'Same business day',
      objective: 'Qualify site, scope, decision-makers and timing before offering a site meeting.',
      firstQuestion,
      whatsapp: `Hi ${name}, this is Bind Builds. Thanks for sharing your ${project} project. I’ve reviewed the brief. Before we plan the next meeting, I’d like to clarify the site, approximate scope and decision timeline so the discussion is useful. Is a short qualification call convenient today?`,
      callChecklist: coreChecklist
    };
  }

  if (quality.priority === 'Develop') {
    return {
      priority: quality.priority,
      responseMode: 'Personalised WhatsApp first; call after reply or when timing is clear',
      suggestedTiming: 'Within 1 business day',
      objective: 'Resolve the clearest missing readiness signal and move to a qualification call only when useful.',
      firstQuestion,
      whatsapp: `Hi ${name}, thanks for sharing your ${project} project with Bind Builds. I’ve reviewed the brief. Before I suggest the next step, one detail will help: ${firstQuestion} You can reply here, or we can take a short call if that is easier.`,
      callChecklist: coreChecklist
    };
  }

  return {
    priority: quality.priority,
    responseMode: 'Resource-first WhatsApp/email; avoid repeated sales calls',
    suggestedTiming: 'Useful nurture response; follow up when intent/site/timing changes',
    objective: 'Help the lead plan without pushing for a site meeting before the project is ready.',
    firstQuestion,
    whatsapp: `Hi ${name}, thanks for sharing your ${project} enquiry with Bind Builds. Since you’re still at an early planning stage, it may be more useful to understand the numbers and process first rather than rush into a sales meeting. I can point you to our construction cost calculator and Chennai planning guides. When your site or timeline becomes clearer, we can pick up the project conversation from there.`,
    callChecklist: coreChecklist,
    nurtureAsset: 'Construction cost calculator + Chennai cost guide + process/FAQ content'
  };
}

export function leadFollowupSummary(input: LeadFollowupInput) {
  const followup=createLeadFollowup(input);
  return [
    `Follow-up plan: ${followup.priority}`,
    `Mode: ${followup.responseMode}`,
    `Timing: ${followup.suggestedTiming}`,
    `Objective: ${followup.objective}`,
    `First question: ${followup.firstQuestion}`,
    `Suggested WhatsApp: ${followup.whatsapp}`,
    followup.nurtureAsset ? `Nurture content: ${followup.nurtureAsset}` : ''
  ].filter(Boolean).join(' · ');
}
