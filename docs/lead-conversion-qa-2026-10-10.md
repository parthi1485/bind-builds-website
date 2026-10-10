# Bind Builds — qualified enquiry, WhatsApp and form reliability audit

10 October 2026. Existing production Next.js site, no new repository, backend or paid services.

## High-impact fixes

1. **Accurate qualification:** The project stage initially presented `Land purchased` without the visitor selecting it. This inflated the sales readiness score. The field now begins empty with an explicit required choice. Intent and location were already required.
2. **Lower-friction WhatsApp:** Once visitors share location, stage and intent, the optional-priorities step offers a direct WhatsApp link containing the structured brief. Budget, timeline, selected package and built-up area are included when provided. Empty name/phone fields are omitted. The user reviews and sends the message through WhatsApp; the site does not falsely claim it was stored as a lead.
3. **Preferred contact channel:** The final form step allows no preference, WhatsApp, phone call or email. Email becomes required only when an email reply is selected. Preference is preserved in the existing text-based sales handoff rather than changing Apps Script/Sheet columns.
4. **Safer submissions:** Added a synchronous in-flight guard against duplicate posts and a 20-second browser request limit (backend still has its existing 15-second upstream timeout). On failure, preserve the brief and focus the error message with WhatsApp and email recovery buttons above the mobile sticky submit actions.
5. **Validation/spam:** Expose the already-supported honeypot as an invisible form input. Reject project enquiry or contact submissions with missing location, stage, or recognized intent, and reject malformed optional email. Keep Estimate PDF validation distinct and unchanged.
6. **Post-submission:** Replaced the misleading “Edit details” action (which would resubmit a previously saved lead) with “Start another enquiry” and a fresh empty form. The optional WhatsApp follow-up after a successful submit is tracked separately.
7. **Qualification-aware success state:** Early-stage enquiries see helpful calculator and cost-guide links rather than a push toward a sales call. Priority-ready enquiries receive a clear qualification-call next step.
8. **Analytics:** Track a non-identifying `project_brief_whatsapp_click` conversion with source, intent and scored priority; keep GA4 first-touch and form conversion tracking.

## Browser tests (mocked successful and failed APIs — no sales lead created)

Playwright Chromium: 320, 375, 430, 768, 1440 CSS px. All five passed successful form flow: empty/required initial stage; stage selection; budget/timeline and built-up area; contextual WhatsApp link; email preference requiring email; one lead request; correct source, stage, location and sales handoff; success state. No horizontal overflow or page JavaScript errors.

Mocked 502 API for both `/start-a-project` and `/contact` at 375px: visible accessible error placed before mobile actions; name and inputs preserved; WhatsApp recovery link contains the selected project location; one API request per submission.

API-negative contract tests against local Next.js server, without forwarding to Apps Script: missing project stage -> 400, missing recognized intent -> 400, Estimate PDF missing required email -> 400.

## Limits / next measurement

The team Google Sheet and email notification workflow were **not** exercised with a real lead, to avoid polluting the sales CRM. GA4 real-user traffic is currently too limited to claim an uplift in lead conversion rate. Monitor GA4 project CTA, stage completion, direct WhatsApp brief and successful project enquiry counts, then compare conversion rates after enough visitors. Test final handoff on iOS Safari physically.
