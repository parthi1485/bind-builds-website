# Combined Pre-Construction Preparation Report — 12 October 2026

## Business purpose

Give Chennai homeowners one place to prepare an informed first conversation with Bind Builds. The report links the existing project enquiry, plot planning explanation and six-group document checklist. It is not a paid approval service, construction estimate or definitive building-feasibility calculator.

## Implemented

- New dedicated route: `/pre-construction-planning-report`, with a premium, mobile-friendly worksheet and a live printable report.
- Project type, current stage, general locality, approximate construction budget, timeline, spatial requirements and priorities.
- Plot illustration reusing the same `calculatePlotPlanning` helper used by the existing approvals worksheet. No permitted FSI, height or setback values are inferred. Invalid/empty dimensions do not produce an area ratio.
- Six existing document groups with status Available / Need to obtain / Unsure / Not reviewed, and prioritized next steps (missing first, then unsure, then unreviewed). No ID numbers or documents are collected.
- A report preview with dimensions, example counted area, document status names, questions for the architect and explicit professional-verification disclaimers.
- Print / Save PDF using native browser print, copy complete text to clipboard, prepared WhatsApp draft, and a shortened voluntary enquiry-form handoff, limited to 1,800 characters to stay inside the existing notes limit.
- Links added to the approvals guide and construction calculator. Public sitemap and 36-route smoke test include the new page.
- Privacy-sensitive tracking only records action, whether a plot example is present, document-group review count and project type. User-entered locality, names, project text and dimensions are omitted from new analytics payloads.

## Validation

- Node 22 `npm test` — 72 passing tests; production Next.js build passed.
- Headless Chromium at 320px, 375px, 430px, 768px and 1440px. For all widths: initially no ratio; `30×40` ft with `750` sq.ft counted area per level at G+1 yielded ratio 1.25; document statuses updated the report; full clipboard text included missing documents and disclaimer; WhatsApp/enquiry draft preserved the scenario; invalid plot fields removed the ratio; the existing enquiry form received the short summary and general locality. No runtime errors or horizontal overflow.
- Browser print action was confirmed on mobile and desktop by stubbing `window.print`; one invocation per click.
- Generated an actual A4 print PDF in Chromium for a test scenario and inspected extracted text and page appearance. The tested report occupied one A4 page and included the plot example, document gap and questions. Longer user inputs can increase the number of printed pages.
- No actual lead request was submitted and no email or Google Sheet record was created during QA.

## Legal and operational boundaries

This report is general homeowner preparation information. It does not certify land title, permitted FSI, site feasibility, approval eligibility, authority fees, approval time, structural safety or final construction costs. Survey and current rules must be verified by a registered professional and the competent local authority. PDF printing opens the browser's print/save dialog; this is not a cloud-generated or digitally signed approval report.

Note: Sending the voluntary enquiry handoff puts the short, clearly labelled working brief in the destination URL. The user is told to avoid confidential property identifiers. The site-authored GA4 payloads do not include user-entered query parameters; a more privacy-preserving server-side or session-based handoff is a future enhancement.
