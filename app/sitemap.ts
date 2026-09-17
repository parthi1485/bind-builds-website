import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/about','/projects','/packages','/cost-calculator','/process','/faq','/contact','/start-a-project','/privacy'].map(path=>({url:site.url+path,changeFrequency:'monthly',priority:path===''?1:path==='/faq'?.9:.7}));}
