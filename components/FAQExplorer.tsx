'use client';
import { useState } from 'react';
import { faqs } from '@/lib/faqs';
const categories = ['All questions', ...Array.from(new Set(faqs.map(faq => faq.category)))];
export default function FAQExplorer() {
 const [category,setCategory] = useState('All questions');
 const [query,setQuery] = useState('');
 const filtered = faqs.filter(faq => (category === 'All questions' || category === faq.category) && (faq.question + ' ' + faq.answer).toLowerCase().includes(query.trim().toLowerCase()));
 return <div className="faqExplorer">
  <div className="faqTools"><label htmlFor="faq-search">What would you like to know?</label><input id="faq-search" type="search" placeholder="Search cost, approvals, Vastu…" value={query} onChange={e=>setQuery(e.target.value)} /><div className="filterButtons" aria-label="Filter questions">{categories.map(item=><button type="button" key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div></div>
  <div className="faqResults"><p className="resultCount" role="status">{filtered.length} {filtered.length===1?'answer':'answers'}{category!=='All questions'?' · '+category:''}</p>{filtered.length ? filtered.map(faq=><details className="faqItem" key={faq.id} id={faq.id}><summary>{faq.question}<span aria-hidden="true">+</span></summary><div className="faqAnswer"><p>{faq.answer}</p>{faq.source && <a className="textLink" href={faq.source.url} target="_blank" rel="noopener noreferrer">{faq.source.label} ↗</a>}</div></details>) : <div className="emptyState"><h2>No matching questions.</h2><p>Try a broader term such as “cost” or “plan”.</p><button className="cta" type="button" onClick={()=>{setQuery('');setCategory('All questions')}}>Clear filters</button></div>}</div>
 </div>;
}
