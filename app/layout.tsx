import './globals.css';
import './premium.css';
import './guides.css';
import type { Metadata } from 'next';
import Motion from '@/components/Motion';
import { site } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Architect-Led Home Construction in Chennai | Bind Builds', template: '%s | Bind Builds' },
  description: 'Plan and build your Chennai home with Bind Builds. Architect-led design, coordinated construction, clear specifications and one team from the first plan to handover.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: site.url, locale: 'en_IN', siteName: 'Bind Builds', title: 'Bind Builds — Your home. Thought through.', description: 'Architect-led home construction in Chennai. Design first. Build with clarity.' },
  twitter: { card: 'summary_large_image', title: 'Bind Builds — Your home. Thought through.', description: 'Architect-led home construction in Chennai. Design first. Build with clarity.', images: ['/opengraph-image'] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Motion />{children}</body></html>;
}
