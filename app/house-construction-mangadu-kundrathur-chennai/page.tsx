import { pageMetadata } from '@/lib/seo';
import LocalClusterGuide,{type LocalClusterGuideData} from '@/components/LocalClusterGuide';
const path='/house-construction-mangadu-kundrathur-chennai';
export const metadata=pageMetadata('House Construction in Mangadu & Kundrathur, Chennai','Architect-led house construction in Mangadu and Kundrathur, Chennai. Plan access, levels, utilities, soil inputs, approvals and construction scope before execution.',path);
const data:LocalClusterGuideData={
 path,areas:['Mangadu','Kundrathur'],kicker:'MANGADU + KUNDRATHUR / HOUSE CONSTRUCTION',heroTitle:'House construction in Mangadu & Kundrathur.',
 introEyebrow:'Western growth corridor · Site-specific planning',introLead:'The locality is familiar.',introAccent:'The exact plot still decides the build.',
 intro:'Mangadu and Kundrathur residential sites can vary significantly in road width, surrounding development, plot levels, utilities and approval context. Bind Builds starts with the exact property, family brief, future floors, soil/structural inputs and external-work assumptions before treating a package rate as the project price.',
 areaNotes:[
  ['Mangadu','Road access, site level, drainage, water planning, utility connections and intended future floors should be reviewed before the structural and external-work scope is frozen.'],
  ['Kundrathur','Plot access and surrounding development can differ street by street. We connect the family programme with engineering, approvals, logistics and the written specification before construction starts.']
 ],
 checks:[
  ['01','Road width + logistics','Check whether excavation, steel, concrete, blocks and finishing materials can reach and operate at the site practically.'],
  ['02','Site level + drainage','Understand road level, plot level and rainwater movement before fixing entry, plinth and external works.'],
  ['03','Soil + foundation inputs','Use project-specific geotechnical and structural information rather than assuming one foundation approach for the locality.'],
  ['04','Utilities + water','Keep water storage, power, drainage and connection work visible in the scope instead of hiding them inside a headline rate.'],
  ['05','Approval route','Confirm the current property records and applicable authority for the exact site before design assumptions are fixed.'],
  ['06','Future use','If additional floors or rental use may come later, discuss that intent before structural and service decisions are finalised.']
 ],
 scenarios:[
  ['Independent home on a vacant plot','Connect family requirements with access, levels, structural inputs and the final specification.'],
  ['Multi-floor family / rental building','Coordinate parking, stairs, service meters, privacy and structural intent from the beginning.'],
  ['Plot with uncertain ground conditions','Reduce assumptions with survey, soil information and engineering review before foundation work is priced.']
 ],
 faqs:[
  ['Does Bind Builds take projects in Mangadu and Kundrathur?','Yes, these are priority western Chennai enquiry areas. We confirm the exact site, size, access, scope, budget, timeline and delivery fit before committing.'],
  ['Do I need a soil test?','Foundation design should use appropriate project-specific engineering information. Soil investigation is coordinated where it forms part of the agreed pre-construction scope.'],
  ['Does the package rate include every site-specific item?','No. The published rate is a starting base-construction reference. Site works, approvals, external works, utilities and other additions or exclusions are confirmed in the proposal.'],
  ['Can you handle a multi-floor family building?','Yes, where the project fits. The early design should coordinate parking, access, services, privacy and any future-use intent before execution.']
 ],
 nearby:[['Poonamallee','/house-construction-poonamallee-chennai'],['Porur','/house-construction-porur-chennai'],['Gerugambakkam + Kolapakkam','/house-construction-gerugambakkam-kolapakkam-chennai'],['West Chennai hub','/house-construction-west-chennai']]
};
export default function Page(){return <LocalClusterGuide data={data}/>;}
