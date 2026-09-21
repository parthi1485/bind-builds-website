import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const updated='2026-09-21';
export default function sitemap():MetadataRoute.Sitemap{
 const pages=[
  ['',1],
  ['/about',.7],
  ['/packages',.9],
  ['/cost-calculator',.95],
  ['/construction-cost-chennai',.95],
  ['/house-construction-chennai',.95],
  ['/turnkey-house-construction-chennai',.9],
  ['/building-plan-approval-chennai',.9],
  ['/process',.8],
  ['/faq',.85],
  ['/contact',.7],
  ['/start-a-project',.8],
  ['/privacy',.3],
 ] as const;
 return pages.map(([path,priority])=>({url:site.url+path,lastModified:updated,changeFrequency:'monthly',priority}));
}
