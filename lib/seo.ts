import type { Metadata } from 'next';
import { site } from './site';
const priorityAreaServed=[
 {'@type':'City',name:'Chennai'},
 ...['Valasaravakkam','Ramapuram','Virugambakkam','Porur','Vadapalani','Saligramam','Gerugambakkam','Mangadu','Kundrathur','Kolapakkam','Maduravoyal','Vanagaram','Kattupakkam','Poonamallee','Anna Nagar','Padi','Koyambedu','Old Mahabalipuram Road (OMR)','East Coast Road (ECR)'].map(name=>({'@type':'Place',name:name+', Chennai'})),
 {'@type':'City',name:'Coimbatore'},
];
export function pageMetadata(title:string,description:string,path:string):Metadata {
 const canonical=site.url+path;
 return {
  title:path==='/'?{absolute:title+' | '+site.name}:title,
  description,
  authors:[{name:site.name,url:site.url}],
  creator:site.name,
  publisher:site.name,
  alternates:{canonical},
  robots:{index:true,follow:true},
  openGraph:{type:'website',locale:'en_IN',siteName:site.name,title:title+' | '+site.name,description,url:canonical,images:[{url:'/opengraph-image',width:1200,height:630,alt:title+' | '+site.name}]},
  twitter:{card:'summary_large_image',title:title+' | '+site.name,description,images:['/opengraph-image']}
 };
}
export function breadcrumbSchema(name:string,path:string){return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:site.url},{'@type':'ListItem',position:2,name,item:site.url+path}]};}

export const serviceOfferCatalog={
 '@type':'OfferCatalog',
 name:'Bind Builds construction services',
 itemListElement:[
  { '@type':'Offer', itemOffered:{'@type':'Service',name:'Architect-led house construction',url:site.url+'/house-construction-chennai'}},
  { '@type':'Offer', itemOffered:{'@type':'Service',name:'Individual house construction',url:site.url+'/individual-house-construction-chennai'}},
  { '@type':'Offer', itemOffered:{'@type':'Service',name:'Turnkey house construction',url:site.url+'/turnkey-house-construction-chennai'}},
  { '@type':'Offer', itemOffered:{'@type':'Service',name:'Demolition and rebuild construction',url:site.url+'/demolition-rebuild-house-chennai'}},
  { '@type':'Offer', itemOffered:{'@type':'Service',name:'Construction planning and cost estimation',url:site.url+'/cost-calculator'}},
  { '@type':'Offer', itemOffered:{'@type':'Service',name:'Building plan approval planning',url:site.url+'/building-plan-approval-chennai'}}
 ]
};
const constructionTopics=['Architect-led construction','Residential construction','Independent house construction','Turnkey construction','Construction cost planning','Building plan approvals','Demolition and rebuild','Structural coordination','MEP coordination','Site execution','Quality control'];

export const organizationSchema={
 '@context':'https://schema.org',
 '@type':'Organization',
 '@id':site.url+'/#organization',
 name:site.name,
 alternateName:['Bind Builds Chennai','Studio Bind construction chapter'],
 url:site.url,
 foundingDate:'2026',
 slogan:'Plan • Build • Deliver',
 logo:{'@type':'ImageObject',url:site.url+'/bind-builds-logo.svg'},
 image:site.url+'/opengraph-image',
 description:'Architect-led construction from Chennai, connecting design, engineering and site execution for priority Chennai corridors and selected Coimbatore projects.',
 telephone:site.telephone,
 email:site.email,
 address:{'@type':'PostalAddress',...site.address},
 sameAs:[site.instagram],
 hasMap:site.maps,
 areaServed:priorityAreaServed,
 founder:{'@id':site.url+'/#founder'},
 contactPoint:{'@type':'ContactPoint',telephone:site.telephone,email:site.email,contactType:'project enquiries',areaServed:'IN',availableLanguage:['English','Tamil']},
 knowsAbout:constructionTopics,
 hasOfferCatalog:serviceOfferCatalog
};
export const localBusinessSchema={
 '@context':'https://schema.org',
 '@type':'GeneralContractor',
 '@id':site.url+'/#localbusiness',
 name:site.name,
 alternateName:'Bind Builds Chennai',
 url:site.url,
 foundingDate:'2026',
 slogan:'Plan • Build • Deliver',
 logo:site.url+'/bind-builds-logo.svg',
 image:site.url+'/opengraph-image',
 description:'Architect-led home construction company serving priority Chennai areas and selected Coimbatore residential projects.',
 telephone:site.telephone,
 email:site.email,
 priceRange:'₹₹₹',
 address:{'@type':'PostalAddress',...site.address},
 areaServed:priorityAreaServed,
 sameAs:[site.instagram],
 hasMap:site.maps,
 founder:{'@id':site.url+'/#founder'},
 parentOrganization:{'@id':site.url+'/#organization'},
 contactPoint:{'@type':'ContactPoint',telephone:site.telephone,email:site.email,contactType:'project enquiries',areaServed:'IN',availableLanguage:['English','Tamil']},
 knowsAbout:constructionTopics,
 hasOfferCatalog:serviceOfferCatalog
};

export const founderPersonSchema={'@context':'https://schema.org','@type':'Person','@id':site.url+'/#founder',name:'Parthiban Moorthy',jobTitle:'Founder & Principal Architect',url:site.url+'/about',worksFor:{'@id':site.url+'/#organization'},knowsAbout:['Architecture','Residential construction','Interior design','Project coordination','Chennai home construction']};
