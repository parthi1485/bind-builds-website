'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

let pendingEnquiry: string | undefined;

export function takeEnquiryPrefill() {
  const query = pendingEnquiry ?? window.bindEnquiryQuery ?? window.location.search;
  pendingEnquiry = undefined;
  delete window.bindEnquiryQuery;
  return new URLSearchParams(query);
}

declare global {
  interface Window { bindEnquiryQuery?: string }
}

type ActionProps = { className?: string; children: ReactNode; onClick?: () => void };

export function EnquiryAction({ query, className, children, onClick }: ActionProps & { query: URLSearchParams }) {
  const router = useRouter();
  return <button type="button" className={className} onClick={() => {
    pendingEnquiry = query.toString();
    onClick?.();
    trackEvent('project_cta_click', { page_path: window.location.pathname });
    router.push('/start-a-project');
  }}>{children}</button>;
}

export function DraftAction({ url, className, children, onClick }: ActionProps & { url: string }) {
  return <button type="button" className={className} onClick={() => {
    onClick?.();
    if (url.startsWith('mailto:')) {
      window.location.assign(url);
    } else {
      trackEvent('whatsapp_click', { page_path: window.location.pathname });
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }}>{children}</button>;
}
