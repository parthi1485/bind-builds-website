import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const updated='2026-09-23';
export default function sitemap():MetadataRoute.Sitemap{
 const pages=[
  ['',1],
  ['/about',.7],
  ['/project-evidence',.88],
  ['/packages',.9],
  ['/cost-calculator',.95],
  ['/construction-cost-chennai',.95],
  ['/construction-company-chennai',.97],
  ['/house-construction-chennai',.95],
  ['/turnkey-house-construction-chennai',.9],
  ['/building-plan-approval-chennai',.9],
  ['/service-areas-chennai',.85],
  ['/demolition-rebuild-house-chennai',.9],
  ['/process',.8],
  ['/faq',.85],
  ['/contact',.7],
  ['/start-a-project',.8],
  ['/privacy',.3],
 ] as const;
 return pages.map(([path,priority])=>({url:site.url+path,lastModified:updated,changeFrequency:'monthly',priority}));
}
