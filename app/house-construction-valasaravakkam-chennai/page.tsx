import { pageMetadata } from '@/lib/seo';
import LocalAreaGuide, { type LocalAreaGuideData } from '@/components/LocalAreaGuide';

const path='/house-construction-valasaravakkam-chennai';
export const metadata=pageMetadata(
 'House Construction Company in Valasaravakkam, Chennai',
 'Architect-led house construction in Valasaravakkam, Chennai for new homes and rebuilds. Compare packages, scope, parking, site access, engineering and approvals.',
 path
);

const data:LocalAreaGuideData={
 path,
 locality:'Valasaravakkam',
 kicker:'VALASARAVAKKAM / HOUSE CONSTRUCTION',
 heroTitle:'House construction in Valasaravakkam, Chennai.',
 introEyebrow:'New homes · Rebuilds · Coordinated execution',
 introLead:'Established streets need',
 introAccent:'careful new-build decisions.',
 intro:'For Valasaravakkam residential plots, the existing street and neighbouring context can shape the project as much as the plot dimensions. Bind Builds reviews access, parking, adjoining buildings, demolition where relevant, light, ventilation, structure, services and the written construction scope before execution.',
 checks:[
  ['01','Existing street context','Neighbouring buildings, setbacks, trees, poles, parked vehicles and working space can influence how the site is organised.'],
  ['02','Parking + entry','Solve car movement, gate location, pedestrian entry and the ground-floor programme before the upper floors are planned.'],
  ['03','Rebuild conditions','If an old house exists, assess demolition, disconnections, salvage, temporary protection and debris movement as a separate workstream.'],
  ['04','Daylight + ventilation','Established adjacent buildings can affect openings and privacy, so room placement should respond to the actual edges of the plot.'],
  ['05','Structure + services','Coordinate column positions, stairs, shafts, plumbing lines and electrical planning with the architecture before they become site compromises.'],
  ['06','Scope clarity','A useful proposal should make the measured area, package specification, exclusions, external works and variation process visible.']
 ],
 scenarios:[
  ['Compact urban home','Use the plot efficiently without treating light, ventilation, parking and circulation as secondary decisions.'],
  ['Demolition + new home','Plan the old structure and the new construction as one sequence while keeping their costs and responsibilities separate.'],
  ['G+1 / G+2 family planning','Coordinate multiple generations, stairs, services and future flexibility from the beginning.']
 ],
 faqs:[
  ['Does Bind Builds undertake house construction in Valasaravakkam?','Yes. Valasaravakkam is a priority inner-West Chennai enquiry area. We qualify the exact site and scope before confirming the next step.'],
  ['Can you build on a small or tight Valasaravakkam plot?','Small plots can be discussed, but the design must respond to the actual dimensions, access, parking, adjoining buildings, setbacks and family requirements. We do not apply one standard plan to every site.'],
  ['Do you undertake demolition and rebuild in Valasaravakkam?','Yes, where the project fits. Demolition, temporary protection, utilities and existing-condition risks are scoped separately from the new construction rate.'],
  ['Can I compare package pricing online first?','Yes. Review the packages and use the calculator before submitting a project brief. The project-specific proposal then confirms the actual area and scope.']
 ],
 nearby:[['Ramapuram house construction','/house-construction-ramapuram-chennai'],['Porur house construction','/house-construction-porur-chennai'],['Virugambakkam + Saligramam','/house-construction-west-chennai#virugambakkam'],['All West Chennai service areas','/house-construction-west-chennai']]
};

export default function Page(){return <LocalAreaGuide data={data}/>;}
