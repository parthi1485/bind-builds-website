import { pageMetadata } from '@/lib/seo';
import LocalClusterGuide,{type LocalClusterGuideData} from '@/components/LocalClusterGuide';
const path='/house-construction-gerugambakkam-kolapakkam-chennai';
export const metadata=pageMetadata('House Construction in Gerugambakkam & Kolapakkam, Chennai','Architect-led house construction in Gerugambakkam and Kolapakkam, Chennai with planning for access, plot levels, utilities, engineering and execution.',path);
const data:LocalClusterGuideData={
 path,areas:['Gerugambakkam','Kolapakkam'],kicker:'GERUGAMBAKKAM + KOLAPAKKAM / HOUSE CONSTRUCTION',heroTitle:'House construction in Gerugambakkam & Kolapakkam.',
 introEyebrow:'Near our Ramapuram base · Site-specific planning',introLead:'Independent-home planning',introAccent:'starts with the street and the plot.',
 intro:'Gerugambakkam and Kolapakkam are close to Bind Builds’ Ramapuram base, but proximity does not replace site due diligence. We review road width, plot levels, utilities, parking, drainage, soil/structural inputs, family requirements and external works before confirming the construction route.',
 areaNotes:[
  ['Gerugambakkam','Growing residential streets can vary in access, levels, drainage and utility conditions. Those inputs should be checked before structural and external-work assumptions are fixed.'],
  ['Kolapakkam','Plot orientation, road width, parking, outdoor space, services and future family use should be planned together so architecture and execution do not become separate decisions.']
 ],
 checks:[
  ['01','Road + unloading','Understand vehicle access, turning, material storage and debris movement before setting the site sequence.'],
  ['02','Plot + road levels','Use actual levels to inform entry, plinth, drainage and driveway decisions rather than relying on a neighbouring plot.'],
  ['03','Water + drainage','Keep sump, overhead storage, rainwater and wastewater planning visible in the early scope.'],
  ['04','Soil + structure','Confirm the engineering inputs needed for the actual building, especially where additional floors are intended.'],
  ['05','Parking + family brief','Cars, parents, rental floors, pets, work-from-home and future additions can change the ground-floor and circulation strategy.'],
  ['06','Scope discipline','Use the same drawings, specifications, exclusions and area basis when comparing contractors or package rates.']
 ],
 scenarios:[
  ['Independent family home','Coordinate orientation, light, ventilation, parking and services around the actual site conditions.'],
  ['Multi-generational house','Plan privacy, circulation and service distribution across floors before structural decisions are frozen.'],
  ['Future expansion intent','Discuss likely future floors or changing family use early; any later addition still requires structural and regulatory review.']
 ],
 faqs:[
  ['Does Bind Builds undertake projects in Gerugambakkam and Kolapakkam?','Yes, these are priority nearby enquiry areas. We still confirm project fit from the actual site, proposed area, scope, budget, timeline and delivery capacity.'],
  ['Are these areas charged at the same rate as Ramapuram?','Our published packages are starting base-construction references. The final project proposal depends on the actual area, structure, access, site conditions, external works, additions and exclusions.'],
  ['Can you visit the site from your Ramapuram office?','Site visits can be arranged after the initial project qualification conversation when the project appears to fit our scope and current capacity.'],
  ['Can you plan for future floors?','Yes, future intent should be discussed early so architecture and engineering can respond appropriately. Any later addition still needs project-specific structural and regulatory review.']
 ],
 nearby:[['Ramapuram','/house-construction-ramapuram-chennai'],['Porur','/house-construction-porur-chennai'],['Mangadu + Kundrathur','/house-construction-mangadu-kundrathur-chennai'],['West Chennai hub','/house-construction-west-chennai']]
};
export default function Page(){return <LocalClusterGuide data={data}/>;}
