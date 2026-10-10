# Bind Builds — real-user Web Vitals measurement audit

Date: 10 October 2026. Production domain: https://www.bindbuilds.com.

## Current measurement situation

The connected GA4 property is **Bind Builds Website** (queried through the connected Windsor.ai Google Analytics 4 source). It reported the following from 1–10 October 2026, with 10 October partial:

- Desktop: 36 sessions, 125 page views, 21 active users within the range.
- Mobile: 17 sessions, 17 page views, 14 active users within the range.
- Total: 53 sessions and 142 page views. Some visits can be owner/developer QA sessions.
- Recent conversion-path events exist, including `calculator_cta_click`, `project_cta_click`, `calculator_step_view` and `form_start`. Event names are not evidence of completed qualified lead submissions.
- `web_vital` returned **no rows** in the queried GA4 data on 10 October. This may reflect the recent launch, ingestion delays, or measurement configuration; it is not evidence of satisfactory field performance.
- Vercel Analytics custom-event queries are unavailable to the connected project (HTTP 402 plan restriction). Vercel's page-view analytics query returned zero and must **not** be used as an estimate of website traffic when GA4 shows activity.

Seventeen mobile sessions are insufficient to use a 75th-percentile Core Web Vital as a statistically stable optimization gate. Avoid changing script loading solely to improve a single Lighthouse score or until real-user evidence accumulates.

## Improved instrumentation

Web Vitals are now exported through the existing GA4 event pipeline using standard reportable dimensions: the **event name** encodes metric and rating; **value** is a numeric GA4 event parameter.

Examples: `web_vital_lcp_good`, `web_vital_inp_needs_improvement`, `web_vital_cls_poor`.

- Events: LCP, INP, CLS, FCP, TTFB, with ratings `good`, `needs_improvement`, `poor`.
- Values: milliseconds for all but CLS. CLS is scaled to thousandths (e.g., 0.12 → 120), including `metric_unit` for disambiguation.
- A `page_path` parameter is retained. A custom dimension registration is still required if this parameter needs reporting within the GA4 UI; event-name and event-value reporting do not need a new dimension.
- Removed the high-cardinality metric ID from the GA event payload.
- No alteration to first-touch attribution, conversion events, form submissions or Google Analytics script loading.

Why buckets? Event counts by name provide an accessible good/needs-improvement/poor distribution through the standard event name dimension, even where custom dimensions have not been registered. Counts are **not** the exact 75th-percentile measurement; repeated browser metric updates can also affect counts. Use this for directional monitoring until sufficient sampled field data exists.

## Validation

- Existing Node.js 22 regression suite and Next.js production build passed.
- Browser checked at 375, 768 and 1440 CSS pixels. The new `web_vital_fcp_good` and `web_vital_ttfb_good` events appeared in the GA4 data layer with numeric `value`; page_view remained present, homepage visuals and calculator navigation worked, and no uncaught browser errors were detected.
- Future first-party visitor data should be reviewed by device category, page and dates. Consider registering `page_path` and the original `metric_name` as GA4 custom dimensions only if reports require those; never submit customer contact details in analytics events.

## Actionable follow-up

After sufficient GA4 events arrive, calculate total event counts by the `web_vital_` prefix, date and device category. If ≥25% of an adequately sized sample is `needs_improvement` or `poor`, investigate the affected page/template and correlate with repeated Lighthouse traces. Prioritize real-user LCP and INP over chasing one lab score. Verify whether tracked enquiry form completion counts correspond to delivered Google Sheets/email leads through a controlled end-to-end test, without creating fake customer enquiries.
