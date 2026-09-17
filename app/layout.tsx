import './globals.css';
import type { Metadata } from 'next';
import Motion from '@/components/Motion';
import { site } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Architect-Led Home Construction in Chennai | Bind Builds', template: '%s | Bind Builds' },
  description: 'Plan and build your Chennai home with Bind Builds. Architect-led design, coordinated construction, clear specifications and one team from the first plan to handover.',
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'Bind Builds', title: 'Bind Builds — Thoughtfully planned. Precisely built.', description: 'Architect-led home construction in Chennai. Design first. Build with clarity.' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Motion />{children}</body></html>;
}
