export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type Attribution = {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
  clickId?: string;
  landingPath: string;
  referrer?: string;
};

const ATTRIBUTION_KEY = 'bindbuilds_first_touch_v1';
// Early page views and clicks can happen before the GA4 script initializes.
const pendingEvents: Array<{ name: string; params: AnalyticsParams }> = [];

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

    const utmSource = params.get('utm_source') || '';
    const source = (utmSource || (gclid ? 'google' : fbclid ? 'meta' : externalReferrer || 'direct')).slice(0, 100);
    // An explicit UTM source with no medium is not a direct visit; do not guess paid vs organic.
    const medium = (params.get('utm_medium') || ((gclid || fbclid) ? 'paid' : utmSource ? 'unspecified' : externalReferrer ? 'referral' : 'direct')).slice(0, 100);
    const attribution: Attribution = {
      source,
      medium,
      campaign: (params.get('utm_campaign') || '').slice(0, 120) || undefined,
      content: (params.get('utm_content') || '').slice(0, 120) || undefined,
      term: (params.get('utm_term') || '').slice(0, 120) || undefined,
      clickId: (gclid || fbclid).slice(0, 180) || undefined,
      // Never persist prefilled project notes or location query parameters in analytics.
      // UTM attribution is retained in the dedicated campaign fields above.
      landingPath: window.location.pathname.slice(0, 500),
      referrer: externalReferrer ? document.referrer.slice(0, 500) : undefined,
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
    first_landing_path: attribution.landingPath.split('?')[0],
  };
}

export function leadAttributionFields() {
  const attribution = captureAttribution();
  return {
    firstSource: attribution?.source || '',
    firstMedium: attribution?.medium || '',
    firstCampaign: attribution?.campaign || '',
    firstContent: attribution?.content || '',
    firstTerm: attribution?.term || '',
    firstLandingPath: attribution?.landingPath.split('?')[0] || '',
    referrer: attribution?.referrer || '',
  };
}

export function leadAttributionSummary() {
  const attribution = captureAttribution();
  if (!attribution) return '';
  return [
    `Attribution: ${attribution.source} / ${attribution.medium}`,
    attribution.campaign ? `campaign ${attribution.campaign}` : '',
    attribution.term ? `term ${attribution.term}` : '',
    attribution.landingPath ? `landing ${attribution.landingPath}` : '',
  ].filter(Boolean).join(' · ');
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
    if (pendingEvents.length) flushPendingEvents();
    window.gtag('event', name, payload);
    return;
  }
  // GTM-style dataLayer objects are not guaranteed to be processed by gtag.js.
  // Keep event order and replay using the actual gtag API after configuration.
  pendingEvents.push({ name, params: payload });
}

export function flushPendingEvents() {
  if (typeof window === 'undefined' || !window.gtag) return;
  for (const { name, params } of pendingEvents.splice(0)) {
    window.gtag('event', name, params);
  }
}
