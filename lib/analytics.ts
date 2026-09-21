export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type Attribution = {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  clickId?: string;
  landingPath: string;
};

const ATTRIBUTION_KEY = 'bindbuilds_first_touch_v1';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function safeHost(value: string) {
  try { return new URL(value).hostname.replace(/^www\./, ''); } catch { return ''; }
}

export function captureAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;

    const params = new URLSearchParams(window.location.search);
    const gclid = params.get('gclid') || '';
    const fbclid = params.get('fbclid') || '';
    const referrer = safeHost(document.referrer);
    const ownHost = window.location.hostname.replace(/^www\./, '');
    const externalReferrer = referrer && referrer !== ownHost ? referrer : '';

    const source = (params.get('utm_source') || (gclid ? 'google' : fbclid ? 'meta' : externalReferrer || 'direct')).slice(0, 100);
    const medium = (params.get('utm_medium') || ((gclid || fbclid) ? 'paid' : externalReferrer ? 'referral' : 'direct')).slice(0, 100);
    const attribution: Attribution = {
      source,
      medium,
      campaign: (params.get('utm_campaign') || '').slice(0, 120) || undefined,
      content: (params.get('utm_content') || '').slice(0, 120) || undefined,
      term: (params.get('utm_term') || '').slice(0, 120) || undefined,
      clickId: (gclid || fbclid).slice(0, 180) || undefined,
      landingPath: (window.location.pathname + window.location.search).slice(0, 500),
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return null;
  }
}

export function analyticsContext(): AnalyticsParams {
  const attribution = captureAttribution();
  if (!attribution) return {};
  return {
    first_source: attribution.source,
    first_medium: attribution.medium,
    first_campaign: attribution.campaign,
    first_content: attribution.content,
    first_term: attribution.term,
    first_landing_path: attribution.landingPath,
  };
}

export function attributedPageUrl() {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  const attribution = captureAttribution();
  if (!attribution) return url.toString();
  url.searchParams.set('bb_first_source', attribution.source);
  url.searchParams.set('bb_first_medium', attribution.medium);
  if (attribution.campaign) url.searchParams.set('bb_first_campaign', attribution.campaign);
  if (attribution.landingPath) url.searchParams.set('bb_landing', attribution.landingPath);
  return url.toString();
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;
  const payload = { ...analyticsContext(), ...params };
  if (window.gtag) {
    window.gtag('event', name, payload);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
}
