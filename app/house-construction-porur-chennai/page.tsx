import { pageMetadata } from '@/lib/seo';
import LocalAreaGuide, { type LocalAreaGuideData } from '@/components/LocalAreaGuide';

const path='/house-construction-porur-chennai';
export const metadata=pageMetadata(
 'House Construction Company in Porur, Chennai',
 'Architect-led house construction in Porur, Chennai. Compare Bind Builds packages, plan site access, parking, approvals, engineering and construction scope before execution.',
 path
);

const data:LocalAreaGuideData={
 path,
 locality:'Porur',
 kicker:'PORUR / HOUSE CONSTRUCTION',
 heroTitle:'House construction in Porur, Chennai.',
 introEyebrow:'Architect-led construction · Porur',
 introLead:'A Porur home needs more than a package rate.',
 introAccent:'It needs a site-specific plan.',
 intro:'Porur projects can range from compact residential streets to plots closer to major roads. Bind Builds starts with the exact access, plot dimensions, neighbouring buildings, parking, levels, family programme and approval context before turning a starting square-foot rate into a project proposal.',
 checks:[
  ['01','Road + unloading access','Confirm how concrete, steel, blocks, tiles and debris can move through the street without treating logistics as an afterthought.'],
  ['02','Plot level + drainage','Review road level, plot level, rainwater movement and external-work assumptions before fixing entry and plinth decisions.'],
  ['03','Parking + floor stacking','Car parking, parents’ accommodation, rental floors and future family use can change circulation and structural planning.'],
  ['04','Existing structure + neighbours','For rebuilds, separate demolition, temporary protection, utilities and neighbouring-building risks from new construction.'],
  ['05','Approval route','Use the exact property details and current jurisdiction to confirm the applicable approval process rather than relying on a generic Porur assumption.'],
  ['06','Base scope + external works','Keep compound wall, gate, sump, utility connections, special foundations and other project-specific work visible outside the headline package where applicable.']
 ],
 scenarios:[
  ['Independent family home','Coordinate the room programme, light, ventilation, parking and structure before site execution begins.'],
  ['Multi-generational / multi-floor home','Plan privacy, stairs, services, parking and future family use as one building rather than separate floor decisions.'],
  ['Demolition + rebuild','Treat demolition, neighbour protection and existing utilities as their own pre-construction scope before the new build.']
 ],
 faqs:[
  ['Does Bind Builds undertake house construction in Porur?','Yes. Porur is a priority West Chennai enquiry area. We confirm fit from the exact plot, access, proposed area, scope, budget, timeline and current site-management capacity before committing to a proposal.'],
  ['What is the construction cost per sq.ft in Porur?','Our published package rates are starting base-construction references. The final Porur proposal depends on the confirmed built-up area, structure, specification, access, site conditions, additions and exclusions.'],
  ['Can you handle a demolition and rebuild project in Porur?','Yes, subject to project fit. Demolition, utility disconnection, neighbour protection and existing-condition risks are scoped separately from the new construction work.'],
  ['Can I start with a site visit in Porur?','We first qualify the project from the plot, requirements, budget direction and timeline. When the project appears to fit, we arrange the appropriate site or office meeting.']
 ],
 nearby:[['Ramapuram house construction','/house-construction-ramapuram-chennai'],['Valasaravakkam house construction','/house-construction-valasaravakkam-chennai'],['Poonamallee house construction','/house-construction-poonamallee-chennai'],['All West Chennai service areas','/house-construction-west-chennai']]
};

export default function Page(){return <LocalAreaGuide data={data}/>;}
