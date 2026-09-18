import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Page } from '@/components/Site';
import FAQExplorer from '@/components/FAQExplorer';
import { faqs } from '@/lib/faqs';
export const metadata=pageMetadata("Chennai Home Construction FAQs","Understand the architect’s role, project visits, videos and proposal reviews, plus Chennai home construction costs, approvals and paid design.","/faq");
export default function FAQPage(){
 const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(faq=>({'@type':'Question',name:faq.question,acceptedAnswer:{'@type':'Answer',text:faq.answer}}))};
 return <Page kicker="CHENNAI CONSTRUCTION / FAQs" title="Before you build. Ask away."><section className="section faqSection"><div className="faqIntro"><p>Understand our role. Know what evidence to ask for. Review your proposal with confidence. Start with the question on your mind.</p><span className="smallPrint">General guidance. Plot-specific requirements and current rules need a professional review.</span></div><div className="relatedGuides"><Link href="/building-plan-approval-chennai">Building approvals: documents and next steps →</Link><Link href="/house-construction-chennai">House construction in Chennai →</Link></div><FAQExplorer /><div className="faqHelp"><h2>Still deciding after a site meeting?</h2><p>Tell us what you need to feel ready: a clearer scope, a budget discussion or relevant project evidence. We can discuss the next step in English or Tamil.</p><Link className="cta primary" href="/start-a-project">Discuss my next step ↗</Link></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} /></Page>;
}
