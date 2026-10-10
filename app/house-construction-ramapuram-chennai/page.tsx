import { pageMetadata } from '@/lib/seo';
import LocalAreaGuide, { type LocalAreaGuideData } from '@/components/LocalAreaGuide';

const path='/house-construction-ramapuram-chennai';
export const metadata=pageMetadata(
 'House Construction Company in Ramapuram, Chennai',
 'Bind Builds is based in Kurinji Nagar, Ramapuram. Explore architect-led house construction, packages, project planning, rebuilds, approvals and site coordination in Ramapuram.',
 path
);

const data:LocalAreaGuideData={
 path,
 locality:'Ramapuram',
 kicker:'RAMAPURAM / OUR CHENNAI BASE',
 heroTitle:'House construction in Ramapuram, Chennai.',
 introEyebrow:'Kurinji Nagar · Ramapuram · Chennai 600089',
 introLead:'Our base is here.',
 introAccent:'The project still begins with your exact plot.',
 intro:'Bind Builds is based in Kurinji Nagar, Ramapuram. For nearby residential projects, we connect the family brief with architecture, engineering coordination and construction scope while still checking the real street, plot, neighbours, parking, existing structure and approval route before pricing.',
 localNote:'Studio discussions are by appointment. The business address used across the website and local listings is No. B/28, 2nd Cross Street, Kurinji Nagar, Ramapuram, Chennai 600089.',
 checks:[
  ['01','Street + site access','Check turning space, unloading, storage and neighbour constraints before the construction sequence is fixed.'],
  ['02','Plot efficiency','Compact urban plots need room sizes, circulation, light, ventilation, setbacks and parking to be solved together.'],
  ['03','Existing house or clear plot','A rebuild requires a different first-stage scope from construction on a vacant plot. Keep demolition and utilities visible.'],
  ['04','Family use','Parents, two generations, rental floors, pets, work-from-home and future additions should enter the brief before structure and services are frozen.'],
  ['05','Approvals + records','Confirm the exact property information and applicable approval route before treating another nearby project as a direct precedent.'],
  ['06','Specification + change control','Compare written brands, allowances, exclusions and change rules so the project is not managed only through verbal site decisions.']
 ],
 scenarios:[
  ['New independent home','Start with the plot, family programme and budget direction, then coordinate design, engineering and execution.'],
  ['Old house rebuild','Separate demolition, neighbour protection, utilities and existing conditions from the cost of the new home.'],
  ['Rental / multi-family building','Plan access, parking, privacy, services and structural provision before each floor is treated as an isolated unit.']
 ],
 faqs:[
  ['Where is Bind Builds located in Ramapuram?','Bind Builds uses No. B/28, 2nd Cross Street, Kurinji Nagar, Ramapuram, Chennai 600089 as its public business address. Studio discussions are by appointment.'],
  ['Do you prioritise Ramapuram construction projects?','Yes. Ramapuram is our Chennai base and a priority enquiry area. We still confirm project fit from the actual site, scope, area, budget, timeline and current delivery capacity.'],
  ['Can I visit the office before appointing Bind Builds?','Yes, an office discussion can be arranged by appointment after the initial project conversation so the right people and project information are available.'],
  ['How much does house construction cost in Ramapuram?','Use our published package rates and calculator for early planning. The final project price comes from the confirmed area, design, structure, specification, site conditions, additions and exclusions.']
 ],
 nearby:[['Porur house construction','/house-construction-porur-chennai'],['Valasaravakkam house construction','/house-construction-valasaravakkam-chennai'],['Virugambakkam + West Chennai','/house-construction-west-chennai#virugambakkam'],['All Chennai service areas','/service-areas-chennai']]
};

export default function Page(){return <LocalAreaGuide data={data}/>;}
