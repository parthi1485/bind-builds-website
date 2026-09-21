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
- `project_form_optional_skipped`
- `lead_intent_selected`
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
- `lead_intent`
- `site_stage`
- `area_provided`
- `lead_priority`
- `lead_score`
- `followup_mode`

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
- `trust_evidence_click`
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


## Stage 8 Batch 2 conversion changes

- Homepage hero keeps one primary action (project brief) and makes the budget action explicit: “Calculate my construction cost”.
- Homepage hero now states the expected friction up front: roughly two minutes, no commitment, English or Tamil.
- Estimate results surface the site-specific project CTA immediately after the total instead of burying it lower in the report.
- The estimate CTA carries package, area and estimate context into the project brief.
- Project enquiry step 2 is explicitly optional and can be skipped without abandoning the form.

Measure these changes with the existing CTA/funnel events before making the next major conversion-layout change.


## Stage 8 Batch 3 trust changes

- Added a homepage “Confidence before you commit” section focused on verifiable process rather than unsupported testimonials or completion claims.
- Explicitly separates Studio Bind Architects (design practice since 2019) from Bind Builds (construction chapter launched in 2026).
- Makes the distinction between design work, site coordination, ongoing construction and completed construction visible before enquiry.
- Surfaces written scope, specifications, exclusions, payment stages and project-specific documentation as trust evidence.
- Explains that project/site visits depend on relevance, owner permission, scheduling and safety; unavailable visits are not replaced with unrelated claims.
- Added an About-page assessment framework and a trust link beside the enquiry form.
- Added `trust_evidence_click` to measure whether visitors use these confidence-building resources.


## Stage 8 Batch 4 lead-quality changes

- Added one required intent field: ready to discuss, comparing proposals, planning for later, or just researching.
- The intent is stored with the lead inside the existing Requirements field and passed to GA4 without adding new Google Sheet columns.
- Project enquiry conversion events now include intent, site stage and whether an area was supplied.
- Visitors who select “Just researching” are shown the calculator and Chennai cost guide before contact details, but they are not blocked from enquiring.
- The dedicated Start a Project page now explains service-area context, what information is useful and that qualification happens before a site visit.
- The enquiry sidebar states the best use of the form and directs price-only research to the calculator.
- Successful enquiries now set the expectation that a qualification conversation happens before site meetings/proposal work.
- Added a Working with us FAQ explaining why projects are qualified before a site visit.

Review lead quality by `lead_intent`, `site_stage`, budget band and timeline before introducing harder filters or minimum-value gates.


## Stage 8 Batch 5 sales handoff

Website project enquiries are now classified into three internal follow-up buckets using readiness signals already supplied by the visitor:

- **Priority** — strong immediate intent, a more advanced site/project stage and/or near-term timing.
- **Develop** — credible project but timing, scope or decision readiness still needs qualification.
- **Nurture** — early research, plot not finalised or timing still exploratory.

The score is deterministic and does not reject enquiries. It is based only on the visitor's project intent, project stage, timeline, whether a budget band was selected, whether an area was supplied and whether a package was selected.

The existing Google Sheet schema is unchanged. The internal classification, score, recommended next action and signal summary are prepended to the existing **Requirements** value, which should also make the current email notification more useful without requiring an Apps Script migration.

GA4 `project_enquiry` now includes `lead_priority` and `lead_score`.

Suggested handling:
- Priority: call first and qualify site/scope/decision-makers before booking a site meeting.
- Develop: ask the clearest missing scope/timing question, then move to qualification.
- Nurture: send useful cost/process content and avoid heavy follow-up until intent changes.


## Stage 8 Batch 6 follow-up intelligence

The website now creates a concise internal follow-up plan for every submitted project enquiry using the existing Priority / Develop / Nurture classification.

The plan is stored in the existing **Requirements** field and therefore flows into the current Google Sheet and notification email without a schema change. It contains:
- recommended first channel;
- suggested response timing;
- qualification objective;
- the first missing-information question to ask;
- a personalised first WhatsApp draft using the visitor's name, project type and location;
- nurture content guidance for early-stage leads.

Follow-up patterns:
- **Priority:** call first; if unanswered, use the acknowledgement WhatsApp. Qualify before scheduling a site meeting.
- **Develop:** personalised WhatsApp first, ask one missing-information question, then call when the lead responds or timing becomes clearer.
- **Nurture:** resource-first response; avoid repeated sales calls and resume a stronger conversation when site, timing or intent changes.

The internal priority/score is never shown to the visitor.

A new `SALES_FOLLOWUP_PLAYBOOK.md` documents the call objectives and guardrails. GA4 `project_enquiry` also records `followup_mode` so lead handling can later be compared with conversion quality.
