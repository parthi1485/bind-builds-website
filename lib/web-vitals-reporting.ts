import type { AnalyticsParams } from './analytics';

type VitalName = 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB';
type VitalRating = 'good' | 'needs-improvement' | 'poor';

export type ReportedVital = {
  name: string;
  value: number;
  rating: VitalRating;
};

const supported = new Set<VitalName>(['LCP', 'INP', 'CLS', 'FCP', 'TTFB']);

/**
 * Use GA4-standard event name and value fields so rating buckets can be
 * reported without registering high-cardinality custom dimensions.
 * CLS is scaled to thousandths; other metrics are measured in milliseconds.
 */
export function prepareWebVitalEvent(metric: ReportedVital, path: string): {name: string; params: AnalyticsParams} | null {
  if (!supported.has(metric.name as VitalName) || !Number.isFinite(metric.value) || metric.value < 0) return null;
  if (!['good', 'needs-improvement', 'poor'].includes(metric.rating)) return null;

  const isCls = metric.name === 'CLS';
  const value = Math.round(metric.value * (isCls ? 1000 : 1));
  return {
    name: `web_vital_${metric.name.toLowerCase()}_${metric.rating.replace('-', '_')}`,
    params: {
      value,
      metric_name: metric.name,
      metric_value: value,
      metric_unit: isCls ? 'thousandths' : 'ms',
      page_path: path,
    },
  };
}
