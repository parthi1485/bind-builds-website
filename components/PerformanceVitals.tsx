'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackEvent } from '@/lib/analytics';
import { prepareWebVitalEvent } from '@/lib/web-vitals-reporting';

export default function PerformanceVitals() {
  useReportWebVitals(metric => {
    const report = prepareWebVitalEvent(metric, window.location.pathname);
    if (report) trackEvent(report.name, report.params);
  });
  return null;
}
