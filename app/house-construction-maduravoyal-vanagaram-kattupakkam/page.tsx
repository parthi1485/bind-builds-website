import { pageMetadata } from '@/lib/seo';
import LocalClusterGuide,{type LocalClusterGuideData} from '@/components/LocalClusterGuide';
const path='/house-construction-maduravoyal-vanagaram-kattupakkam';
export const metadata=pageMetadata('House Construction in Maduravoyal, Vanagaram & Kattupakkam','Architect-led house construction in Maduravoyal, Vanagaram and Kattupakkam, Chennai with site-specific planning for access, levels, utilities and scope.',path);
const data:LocalClusterGuideData={
 path,areas:['Maduravoyal','Vanagaram','Kattupakkam'],kicker:'MADURAVOYAL + VANAGARAM + KATTUPAKKAM',heroTitle:'House construction in Maduravoyal, Vanagaram & Kattupakkam.',
 introEyebrow:'West Chennai · Residential growth corridor',introLead:'Start with access, levels',introAccent:'and the way the family will use the building.',
 intro:'Across Maduravoyal, Vanagaram and Kattupakkam, the practical questions often begin with road access, site levels, utilities, parking and whether the building is a single-family home or a multi-floor family/rental project. Bind Builds coordinates those inputs with architecture, structure, services and construction scope before execution.',
 areaNotes:[
  ['Maduravoyal','Mixed street conditions can make unloading, storage, parking and demolition planning important. Multi-floor family use should be resolved before the structure is fixed.'],
  ['Vanagaram','For new residential projects we review access, plot levels, drainage, utilities, future expansion and the exact site context before confirming the external-work scope.'],
  ['Kattupakkam','Road width, levels, utility availability, family requirements, parking and expected floors shape the early design, engineering and budget decisions together.']
 ],
 checks:[
  ['01','Construction access','Plan concrete, reinforcement, blocks, finishing materials and debris movement around the actual road and site width.'],
  ['02','Levels + external works','Entry, plinth, rainwater movement, compound edges and driveway decisions should respond to the existing site levels.'],
  ['03','Parking + circulation','Resolve cars, pedestrians, stairs and multi-floor family movement before room planning is treated as complete.'],
  ['04','Utilities','Keep water, drainage, power and service provisions visible in the project scope and timing plan.'],
  ['05','Structure for intended use','A family home, rental building and future-extension brief create different structural and service coordination needs.'],
  ['06','Proposal clarity','Separate base construction from approvals, compound wall, gate, sump, special site work and other applicable additions.']
 ],
 scenarios:[
  ['New independent family home','Build the programme around the real plot, levels, parking and construction access.'],
  ['G+2 family / rental building','Coordinate stairs, parking, meters, shafts and privacy across floors before execution.'],
  ['Demolition + rebuild','Treat the existing building, utilities and neighbour interfaces as their own pre-construction workstream.']
 ],
 faqs:[
  ['Does Bind Builds work in Maduravoyal, Vanagaram and Kattupakkam?','Yes, these are priority West Chennai enquiry areas. Project fit is still confirmed from the exact site, built-up area, scope, budget, timeline and current delivery capacity.'],
  ['What does house construction cost in these areas?','Use our published packages and calculator for early planning. The final proposal depends on the measured area, specification, structural scope, site conditions, additions and exclusions.'],
  ['Can you plan a rental or multi-family building?','Yes, subject to project fit. Parking, privacy, stairs, service meters, shafts and structural intent should be coordinated before the building is priced and executed.'],
  ['Do you arrange a site visit immediately?','We first review the project information. When the site and scope appear to fit, we arrange the appropriate site or office meeting.']
 ],
 nearby:[['Porur','/house-construction-porur-chennai'],['Poonamallee','/house-construction-poonamallee-chennai'],['Mangadu + Kundrathur','/house-construction-mangadu-kundrathur-chennai'],['West Chennai hub','/house-construction-west-chennai']]
};
export default function Page(){return <LocalClusterGuide data={data}/>;}
