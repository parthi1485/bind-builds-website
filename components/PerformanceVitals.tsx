'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackEvent } from '@/lib/analytics';

export default function PerformanceVitals() {
  useReportWebVitals(metric => {
    if (!['LCP', 'INP', 'CLS', 'FCP', 'TTFB'].includes(metric.name)) return;
    const isShift = metric.name === 'CLS';
    trackEvent('web_vital', {
      metric_name: metric.name,
      metric_id: metric.id,
      metric_value: Math.round(metric.value * (isShift ? 1000 : 1)),
      metric_unit: isShift ? 'thousandths' : 'ms',
      page_path: window.location.pathname,
    });
  });
  return null;
}
