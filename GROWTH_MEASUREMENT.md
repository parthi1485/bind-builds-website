# Bind Builds — Growth & Conversion Measurement

Stage 8 starts with measurement before design changes or SEO expansion.

## Primary business conversions

1. `project_enquiry` — completed project/contact enquiry.
2. `pdf_download_lead` — contact captured before estimate PDF download.

Keep these as the primary GA4 key events.

## Funnel events

### Project enquiry

- `project_cta_click`
- `project_form_step_view`
- `project_form_step_complete`
- `project_enquiry`
- `project_enquiry_error`

Useful dimensions:
- `form_source`
- `step_number`
- `step_name`
- `project_type`
- `budget_band`
- `timeline`
- `package_interest`

### Construction calculator

- `calculator_cta_click`
- `calculator_step_view`
- `calculator_started`
- `calculator_step_complete`
- `package_selected`
- `estimate_generated`
- `estimate_presented`
- `pdf_gate_open`
- `pdf_download_lead`
- `estimate_pdf_download`
- `pdf_download_lead_error`

Useful dimensions:
- `step_number`
- `step_name`
- `package_name`
- `floors`
- `calculated_area`
- `value`

## Engagement events

- `scroll_depth` at 25%, 50%, 75% and 90%.
- `call_click`
- `whatsapp_click`
- `outbound_click`
- CTA events include `cta_location`.

## First-touch attribution

The site stores non-PII campaign attribution for the current browser session:
- first source
- first medium
- first campaign
- first content
- first term
- first landing page

The same first-touch source/medium/campaign is appended to the Page URL saved with website leads using `bb_first_*` parameters. This preserves campaign context even when the visitor browses several pages before enquiring.

## Review cadence

Do not optimize from tiny samples. Review after enough activity exists to show a pattern.

Weekly:
- traffic by landing page/source
- project CTA → form start
- form step 1 → step 2 → step 3 → enquiry
- calculator start → generated estimate
- estimate → PDF gate → PDF lead
- WhatsApp/call clicks by landing page

Monthly:
- organic Search Console queries and pages
- lead quality by source/campaign
- package interest
- budget/timeline mix
- conversion rate by landing page

## Decision rule

Change one meaningful conversion variable at a time when possible. Keep the measurement names stable so before/after performance remains comparable.
