import Link from 'next/link';

export type LocalityIntentItem={
 id:string;
 name:string;
 eyebrow?:string;
 copy:string;
 link?:string;
 linkLabel?:string;
};

export default function LocalityIntentGrid({items}:{items:LocalityIntentItem[]}){
 return <div className="localityIntentGrid">{items.map(item=>
  <article className="localityIntentCard" id={item.id} key={item.id}>
   {item.eyebrow&&<span className="productEyebrow">{item.eyebrow}</span>}
   <h3>{item.name}</h3>
   <p>{item.copy}</p>
   {item.link&&<Link href={item.link}>{item.linkLabel??'Discuss this location →'}</Link>}
  </article>
 )}</div>;
}
