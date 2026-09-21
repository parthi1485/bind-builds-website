'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution, trackEvent } from '@/lib/analytics';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-3JP7ZM2MXT';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    captureAttribution();
    trackEvent('page_view', {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID) return;
    const seen = new Set<number>();
    const thresholds = [25, 50, 75, 90];
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) return;
      const percent = Math.round(window.scrollY / height * 100);
      for (const threshold of thresholds) {
        if (percent >= threshold && !seen.has(threshold)) {
          seen.add(threshold);
          trackEvent('scroll_depth', { page_path: window.location.pathname, percent_scrolled: threshold });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const linkText = (anchor.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
      const region = anchor.closest('header,nav,section,footer,aside');
      const ctaLocation = region?.id || (region?.tagName || 'page').toLowerCase();
      const base = { page_path: window.location.pathname, link_text: linkText, cta_location: ctaLocation };

      if (href.startsWith('tel:')) trackEvent('call_click', base);
      else if (href.includes('wa.me')) trackEvent('whatsapp_click', base);
      else if (href.startsWith('/start-a-project')) trackEvent('project_cta_click', base);
      else if (href.startsWith('/cost-calculator')) trackEvent('calculator_cta_click', base);
      else {
        try {
          const url = new URL(anchor.href, window.location.href);
          if (url.origin !== window.location.origin) trackEvent('outbound_click', { ...base, link_domain: url.hostname.replace(/^www\./, '') });
        } catch {}
      }
      if (anchor.closest('#confidence-before-commit') || anchor.closest('.aboutTransparency') || anchor.closest('.enquiryConfidence')) {
        trackEvent('trust_evidence_click', { ...base, destination: href.slice(0, 180) });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!GA_ID) return null;

  return <>
    <Script src={'https://www.googletagmanager.com/gtag/js?id=' + GA_ID} strategy="afterInteractive" />
    <Script id="bind-builds-ga4" strategy="afterInteractive">{
      "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','" + GA_ID + "',{send_page_view:false});"
    }</Script>
  </>;
}
