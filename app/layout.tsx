import './globals.css';
import './premium.css';
import './assurance.css';
import './guides.css';
import type { Metadata, Viewport } from 'next';
import Motion from '@/components/Motion';
import PageScroll from '@/components/PageScroll';
import Analytics from '@/components/Analytics';
import { site } from '@/lib/site';
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#ffffff', colorScheme: 'light' };
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Architect-Led Home Construction in Chennai | Bind Builds', template: '%s | Bind Builds' },
  description: 'Plan and build your Chennai home with Bind Builds. Architect-led design, coordinated construction, clear specifications and one team from the first plan to handover.',
  openGraph: { type: 'website', url: site.url, locale: 'en_IN', siteName: 'Bind Builds', title: 'Bind Builds — Your home. Thought through.', description: 'Architect-led home construction in Chennai. Design first. Build with clarity.' },
  twitter: { card: 'summary_large_image', title: 'Bind Builds — Your home. Thought through.', description: 'Architect-led home construction in Chennai. Design first. Build with clarity.', images: ['/opengraph-image'] },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><PageScroll /><Motion /><Analytics />{children}</body></html>;
}
