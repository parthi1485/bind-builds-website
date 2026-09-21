'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-3JP7ZM2MXT';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    trackEvent('page_view', {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const linkText = (anchor.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
      const base = { page_path: window.location.pathname, link_text: linkText };

      if (href.startsWith('tel:')) trackEvent('call_click', base);
      else if (href.includes('wa.me')) trackEvent('whatsapp_click', base);
      else if (href.startsWith('/start-a-project')) trackEvent('project_cta_click', base);
      else if (href.startsWith('/cost-calculator')) trackEvent('calculator_cta_click', base);
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
