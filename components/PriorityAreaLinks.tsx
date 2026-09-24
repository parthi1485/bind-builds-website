import Link from 'next/link';

const groups=[
 {
  title:'Inner West Chennai',
  links:[
   ['Ramapuram','/house-construction-ramapuram-chennai'],
   ['Porur','/house-construction-porur-chennai'],
   ['Valasaravakkam','/house-construction-valasaravakkam-chennai'],
   ['Virugambakkam · Vadapalani · Saligramam','/house-construction-virugambakkam-vadapalani-saligramam'],
  ],
 },
 {
  title:'West growth belt',
  links:[
   ['Gerugambakkam · Kolapakkam','/house-construction-gerugambakkam-kolapakkam-chennai'],
   ['Mangadu · Kundrathur','/house-construction-mangadu-kundrathur-chennai'],
   ['Maduravoyal · Vanagaram · Kattupakkam','/house-construction-maduravoyal-vanagaram-kattupakkam'],
   ['Poonamallee','/house-construction-poonamallee-chennai'],
  ],
 },
 {
  title:'Central + South-East',
  links:[
   ['Anna Nagar · Padi · Koyambedu','/house-construction-anna-nagar-chennai'],
   ['OMR · ECR','/house-construction-omr-ecr-chennai'],
   ['All Chennai service areas','/service-areas-chennai'],
  ],
 },
 {
  title:'Coimbatore',
  links:[
   ['Selected Coimbatore residential projects','/house-construction-coimbatore'],
  ],
 },
] as const;

export default function PriorityAreaLinks(){
 return <div className="serviceAreaGrid priorityAreaLinkGrid" aria-label="Bind Builds priority construction service areas">
  {groups.map(group=><article key={group.title}>
   <h3>{group.title}</h3>
   <ul>{group.links.map(([label,href])=><li key={href}><Link href={href}>{label}<span aria-hidden="true">→</span></Link></li>)}</ul>
  </article>)}
 </div>;
}
