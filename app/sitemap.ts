import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/about','/packages','/cost-calculator','/house-construction-chennai','/building-plan-approval-chennai','/process','/faq','/contact','/start-a-project','/privacy'].map(path=>({url:site.url+path,lastModified:path==='/faq'?'2026-09-18':['','/building-plan-approval-chennai','/house-construction-chennai','/faq','/packages'].includes(path)?'2026-09-17':undefined,changeFrequency:'monthly',priority:path===''?1:path==='/faq'?.9:.7}));}
