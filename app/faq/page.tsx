import type { Metadata } from 'next';
import Link from 'next/link';
import { Page } from '@/components/Site';
import FAQExplorer from '@/components/FAQExplorer';
import { faqs } from '@/lib/faqs';
export const metadata: Metadata = { title: 'Chennai Home Construction FAQs', description: 'Answers to Chennai construction questions about budgets, CMDA approvals, FSI, soil tests, waterproofing, Vastu, design fees and the Bind Builds process.', alternates:{canonical:'/faq'} };
export default function FAQPage(){
 const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(faq=>({'@type':'Question',name:faq.question,acceptedAnswer:{'@type':'Answer',text:faq.answer}}))};
 return <Page kicker="CHENNAI CONSTRUCTION / FAQs" title="Before you build. Ask away."><section className="section faqSection"><div className="faqIntro"><p>Practical answers for your first home, a rebuild or your next investment. Start with the question on your mind.</p><span className="smallPrint">General guidance. Plot-specific requirements and current rules need a professional review.</span></div><FAQExplorer /><div className="faqHelp"><h2>Something specific to your plot?</h2><p>Share your location and what you want to build. Let’s discuss the right next step.</p><Link className="cta primary" href="/start-a-project">Ask about your project ↗</Link></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}} /></Page>;
}
