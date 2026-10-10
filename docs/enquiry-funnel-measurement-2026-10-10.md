# Bind Builds — qualified lead funnel measurement

**Audit date:** 10 October 2026  •  **GA4 property:** 555163311  •  **Production:** www.bindbuilds.com

## Real GA4 baseline (October 1–10, 2026)

The connected analytics property reported 142 `page_view` events, 51 `session_start`, 3 `project_form_step_view`, 1 `project_cta_click`, 8 `calculator_cta_click`, 2 `estimate_generated`, and **0 recorded `project_enquiry` events**. These are events, not unique visitors, leads or reliable conversion rates. The latest form changes only launched today and cannot be judged from this historical window.

## Instrumented journey

| Event | Meaning | Counting rules |
| --- | --- | --- |
| `project_cta_click` | Visitor clicked a link to project enquiry | Click event; not a lead |
| `project_form_step_view` | Form rendered a step | May repeat on Back/Forward, useful for UX diagnostics |
| `project_form_started` | First input/change on the form | Once per current enquiry, reset only when a new enquiry starts |
| `project_form_validation_blocked` | Browser refused progression because a required field was invalid | Once per field and stage per enquiry; records field identifier, never its value |
| `project_form_step_complete` | Visitor completed a stage | Existing step event; optional-step skip tracked separately |
| `project_form_contact_reached` | Visitor reached final contact stage | Once per enquiry, including skip of optional priorities |
| `project_form_submit_attempt` | Native validation passed and valid contact details were submitted to the API | Once for each actual attempt; retries are distinct attempts |
| `project_enquiry` | Backend/Google Apps Script returned success | **Confirmed submitted enquiry event**; still requires periodic verification that sheet/email delivery is working |
| `project_enquiry_error` | Backend confirmation failed or timed out | Does not count as successful submission |
| `project_brief_whatsapp_click` | Visitor opened a prefilled WhatsApp draft before completing the contact form | **Intent signal, not a verified sent message or recorded lead** |
| `project_enquiry_recovery_click` | Visitor used WhatsApp/email recovery after a failed submission | Intent signal only |
| `pdf_download_lead` | Estimate PDF lead form acknowledged success | Separate lead funnel from construction project enquiries |

**Funnel reading:** compare form starts → contact reached → server-confirmed enquiries, broken down by `form_source` (start-a-project vs contact). Also examine WhatsApp intent separately. Do not add WhatsApp clicks to confirmed form leads; one visitor may do both.

## Attribution hygiene

- Kept first-touch `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` as separate fields.
- An explicit `utm_source` without `utm_medium` becomes `unspecified`, **not** direct and not assumed to be paid advertising.
- GA4 page-view `page_path` and `page_location` deliberately omit the URL query string; first landing path also strips queries, including any values retained in legacy session storage.
- GA4 configuration initializes with the sanitized page location, to avoid implicitly copying a prefilled enquiry URL into custom analytics.
- No form name, telephone, email, free-text notes or full site location is deliberately included in new conversion events. The backend Google Sheet still receives the customer's project brief as explicitly submitted.
- Note: these protections cover site-authored GA4 event payloads, **not every possible enhanced-measurement or browser/referrer mechanism**. Any future user-supplied query parameters should also be reviewed before being introduced to URL links.

## QA without polluting real leads

- Local Node.js 22 regression suite: **59 passing tests**, plus successful production build.
- Browser tests: **320, 375, 430, 768, 1440 CSS px**. Used mocked successful API confirmations. All widths recorded one `project_form_started`, one `project_form_contact_reached` after navigating Back and Forward, one `project_form_submit_attempt`, and one `project_enquiry`. Validation-block events contained only whitelisted field names, no user-entered values. No browser errors or horizontal overflow.
- Failed API test at `/start-a-project` and `/contact`: recorded `project_form_submit_attempt` and `project_enquiry_error`, **no** `project_enquiry`. Form details and WhatsApp/email recovery remained available.
- WhatsApp test at 375 and 1440px: one specialized draft-intent event plus one generic WhatsApp click, and **zero confirmed `project_enquiry` events**.
- Google Analytics networking was blocked during local browser tests. All API successes/errors were intercepted and mocked. No artificial contact was sent to the live lead sheet.

## Next decision

Wait for a useful real-user sample after release. Report the number of starts, the number reaching contact, server-confirmed enquiries and WhatsApp draft intent by form source; review drop-off and validation fields. In GA4 Admin, mark the appropriate *confirmed* event as a key event if it is not already designated. Check with the owner before modifying analytics account settings. Conduct a supervised **real** Google Sheet/email delivery test when practical.
