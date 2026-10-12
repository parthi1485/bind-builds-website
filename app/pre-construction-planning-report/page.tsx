import './report.css';
import Link from 'next/link';
import { Page } from '@/components/Site';
import PreconstructionReport from '@/components/PreconstructionReport';
import { pageMetadata } from '@/lib/seo';

export const metadata=pageMetadata(
  'Free Pre-Construction Planning Report for Chennai Homeowners',
  'Create a preparation report for your Chennai home: project brief, illustrative plot area ratio, document checklist and questions for your architect. Copy or print it free.',
  '/pre-construction-planning-report'
);

export default function PreconstructionReportPage(){
 return <Page kicker="CHENNAI / PLANNING TOOL" title="Plan with clarity. Build with purpose.">
   <div className="preconBreadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/building-plan-approval-chennai">Building approvals</Link><span aria-hidden="true">/</span>Preparation report</div>
   <PreconstructionReport/>
 </Page>;
}
