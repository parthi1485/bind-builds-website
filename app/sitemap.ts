import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const updated='2026-09-25';
export default function sitemap():MetadataRoute.Sitemap{
 const pages=[
  ['',1],
  ['/about',.7],
  ['/project-evidence',.88],
  ['/projects/sunguvarchathiram-multigenerational-home',.86],
  ['/projects/pallikaranai-family-home',.86],
  ['/packages',.9],
  ['/cost-calculator',.95],
  ['/construction-cost-chennai',.95],
  ['/construction-company-chennai',.97],
  ['/house-construction-chennai',.95],
  ['/individual-house-construction-chennai',.93],
  ['/turnkey-house-construction-chennai',.9],
  ['/building-plan-approval-chennai',.9],
  ['/service-areas-chennai',.92],
  ['/house-construction-west-chennai',.9],
  ['/house-construction-ramapuram-chennai',.94],
  ['/house-construction-porur-chennai',.93],
  ['/house-construction-valasaravakkam-chennai',.92],
  ['/house-construction-poonamallee-chennai',.9],
  ['/house-construction-virugambakkam-vadapalani-saligramam',.88],
  ['/house-construction-mangadu-kundrathur-chennai',.88],
  ['/house-construction-maduravoyal-vanagaram-kattupakkam',.87],
  ['/house-construction-gerugambakkam-kolapakkam-chennai',.87],
  ['/house-construction-anna-nagar-chennai',.88],
  ['/house-construction-omr-ecr-chennai',.9],
  ['/house-construction-coimbatore',.9],
  ['/construction-cost-coimbatore',.9],
  ['/demolition-rebuild-house-chennai',.9],
  ['/process',.8],
  ['/faq',.85],
  ['/contact',.7],
  ['/start-a-project',.8],
  ['/privacy',.3],
 ] as const;
 return pages.map(([path,priority])=>({url:site.url+path,lastModified:updated,changeFrequency:'monthly',priority}));
}
