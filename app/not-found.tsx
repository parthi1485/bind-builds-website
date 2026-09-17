import Link from 'next/link';
import { Page } from '@/components/Site';
export default function NotFound(){return <Page kicker="PAGE NOT FOUND" title="Let’s get you back on plan."><section className="section"><p>This page could not be found.</p><Link className="cta primary" href="/">Return home ↗</Link></section></Page>;}
