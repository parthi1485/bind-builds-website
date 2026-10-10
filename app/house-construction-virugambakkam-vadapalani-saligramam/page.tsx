import { pageMetadata } from '@/lib/seo';
import LocalClusterGuide,{type LocalClusterGuideData} from '@/components/LocalClusterGuide';
const path='/house-construction-virugambakkam-vadapalani-saligramam';
export const metadata=pageMetadata('House Construction Company in Virugambakkam, Vadapalani & Saligramam','Architect-led house construction in Virugambakkam, Vadapalani and Saligramam, Chennai for new homes and rebuilds with coordinated design, engineering and execution.',path);
const data:LocalClusterGuideData={
 path,areas:['Virugambakkam','Vadapalani','Saligramam'],kicker:'INNER WEST CHENNAI / HOUSE CONSTRUCTION',heroTitle:'House construction in Virugambakkam, Vadapalani & Saligramam.',
 introEyebrow:'Established urban plots · New homes + rebuilds',introLead:'Compact city sites need',introAccent:'careful coordination before execution.',
 intro:'Virugambakkam, Vadapalani and Saligramam are established Chennai neighbourhoods where adjoining buildings, street access, parking, demolition conditions and storage space can shape the project as strongly as the plot dimensions. Bind Builds connects the family brief, architecture, structure, services and execution plan before the scope is priced.',
 areaNotes:[
  ['Virugambakkam','Compact plots and adjoining homes make parking, privacy, light, ventilation, construction access and rebuild sequencing important early decisions.'],
  ['Vadapalani','For urban sites, material movement, working space, existing buildings and the relationship between residential use and busy surrounding streets deserve early planning.'],
  ['Saligramam','Plot efficiency, parking, neighbouring buildings, service shafts and internal circulation need to be solved together rather than one room at a time.']
 ],
 checks:[
  ['01','Access + working space','Understand unloading, debris movement, storage and safe working space before assuming a standard site sequence.'],
  ['02','Existing structure','Separate demolition, utilities, salvage and neighbour protection from the new construction scope where an old house exists.'],
  ['03','Parking + entry','Resolve vehicle movement, pedestrian entry and the ground-floor programme before upper-floor planning is locked.'],
  ['04','Neighbours + openings','Adjacent buildings affect privacy, daylight, ventilation and temporary protection during construction.'],
  ['05','Structure + services','Coordinate columns, stairs, plumbing shafts, electrical routes and water storage with the architecture before site compromises appear.'],
  ['06','Written scope','Compare measured area, brands, allowances, exclusions, external works and variation rules—not only a headline rate.']
 ],
 scenarios:[
  ['Compact independent home','Use every part of the plot carefully while preserving light, ventilation, circulation and parking.'],
  ['Demolition + rebuild','Plan the old building and the new home as one sequence while keeping costs and responsibilities separate.'],
  ['G+1 / G+2 family home','Coordinate multiple generations, privacy, stairs, services and future use from the first design stage.']
 ],
 faqs:[
  ['Does Bind Builds undertake construction in Virugambakkam, Vadapalani and Saligramam?','Yes, these are priority inner-West Chennai enquiry areas. We confirm fit from the exact plot, access, scope, approximate area, budget, timeline and current site-management capacity.'],
  ['Can you handle demolition and rebuild in these localities?','Yes, subject to project fit. Demolition, utility disconnection, neighbour protection and existing-condition risks are scoped separately from the new construction work.'],
  ['What is the construction cost per sq.ft here?','Our published package rates are starting base-construction references. The final proposal depends on confirmed area, structure, site access, external works, additions, exclusions and specification.'],
  ['Can you visit the site first?','We begin with a qualification conversation. When the project appears to fit our delivery model, we arrange the appropriate site or office meeting.']
 ],
 nearby:[['Valasaravakkam','/house-construction-valasaravakkam-chennai'],['Ramapuram','/house-construction-ramapuram-chennai'],['Porur','/house-construction-porur-chennai'],['West Chennai hub','/house-construction-west-chennai']]
};
export default function Page(){return <LocalClusterGuide data={data}/>;}
