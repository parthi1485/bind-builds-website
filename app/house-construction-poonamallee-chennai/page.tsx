import { pageMetadata } from '@/lib/seo';
import LocalAreaGuide, { type LocalAreaGuideData } from '@/components/LocalAreaGuide';

const path='/house-construction-poonamallee-chennai';
export const metadata=pageMetadata(
 'House Construction Company in Poonamallee, Chennai',
 'Architect-led house construction in Poonamallee, Chennai. Plan the exact approval route, site access, soil investigation, utilities, packages and construction scope before building.',
 path
);

const data:LocalAreaGuideData={
 path,
 locality:'Poonamallee',
 kicker:'POONAMALLEE / HOUSE CONSTRUCTION',
 heroTitle:'House construction in Poonamallee, Chennai.',
 introEyebrow:'West growth corridor · Site-specific planning',
 introLead:'The plot may look simple.',
 introAccent:'The execution route still needs checking.',
 intro:'Poonamallee and nearby western growth areas can present very different road, layout, utility and approval conditions from one site to the next. Bind Builds starts with the exact property, access, intended floors, soil investigation strategy, family programme and external-work scope before finalising a construction proposal.',
 checks:[
  ['01','Exact jurisdiction','Confirm the applicable local authority and property records for the specific plot rather than assuming one approval route for every Poonamallee address.'],
  ['02','Road + material movement','Check whether site access comfortably supports excavation, steel, concrete, blocks, finishing materials and debris removal.'],
  ['03','Soil + foundation inputs','Use a project-specific geotechnical and structural review before treating a base package foundation assumption as final.'],
  ['04','Levels + drainage','Review the relationship between road level, plot level, rainwater movement and entry/plinth decisions early.'],
  ['05','Utilities + external work','Water, power, drainage, sump, septic requirements where applicable, compound wall and gate should stay visible in the project scope.'],
  ['06','Future floors + family use','If the home may grow later, discuss the intended future use early; any future addition still needs structural and regulatory review.']
 ],
 scenarios:[
  ['Independent house on a vacant plot','Connect the family brief with site levels, access, structural inputs and the final written specification.'],
  ['Multi-floor family / rental building','Coordinate circulation, parking, service meters, shafts and privacy before the structure is fixed.'],
  ['Plot with uncertain site conditions','Use surveys, records and soil information to reduce assumptions before foundation and external works are priced.']
 ],
 faqs:[
  ['Does Bind Builds undertake construction projects in Poonamallee?','Yes. Poonamallee is a priority West Chennai enquiry area. We confirm the exact location, project size, access, scope, budget, timeline and delivery fit before proceeding.'],
  ['Which authority approves a Poonamallee building plan?','The answer depends on the exact property and current jurisdiction. We verify the applicable approval route from the site records instead of publishing one universal authority for every Poonamallee address.'],
  ['Do I need a soil test before building in Poonamallee?','Foundation design should be based on appropriate project-specific engineering information. We coordinate the soil investigation and structural inputs where they form part of the agreed pre-construction scope.'],
  ['How do I compare construction quotes for a Poonamallee project?','Use the same area basis, drawings, structural assumptions, material allowances, exclusions, external works and change process. A lower headline square-foot rate is not meaningful if major work is outside the scope.']
 ],
 nearby:[['Porur house construction','/house-construction-porur-chennai'],['Ramapuram house construction','/house-construction-ramapuram-chennai'],['Mangadu + Kundrathur','/house-construction-west-chennai#mangadu'],['All West Chennai service areas','/house-construction-west-chennai']]
};

export default function Page(){return <LocalAreaGuide data={data}/>;}
