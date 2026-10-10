# Document readiness assistant — approval planning

10 October 2026 — Built directly into the existing Bind Builds approvals and site-readiness experience.

## Purpose

Clients already had a six-topic site-readiness checklist and an informational document list. This new assistant lets homeowners categorize the six document groups (ownership, revenue, survey, encumbrances, existing permissions, professional drawings) as **Available**, **Need to obtain**, **Unsure**, or **Not reviewed**, then receive a concise list of next preparation actions. It is explicitly **not** a statutory checklist, a review of authenticity or validity, an approval decision, or a permit application.

## Implementation

- Statuses and explanatory prompts live in `lib/approval-guide.ts`, with deterministic summary and priority (missing first, then unsure, then not reviewed). There are no invented jurisdiction-specific document requirements.
- Page-local React state; no login, persistence, upload, land-record numbers, credentials or personal ID documents requested.
- A quick progress counter and first three next steps, with a keyboard-accessible `Show all` control for longer checklists.
- Copy a text summary or voluntarily carry it into the existing site-review enquiry or WhatsApp draft. The user must explicitly send an enquiry or the WhatsApp message; clicking the worksheet does not create a lead.
- Contextual note for new-home, demolition/rebuild, multi-family and other proposals; the registered professional must confirm actual requirements.
- GA4 action events include only a document group ID, status and aggregate count. They do not include addresses, document numbers or uploaded material.
- The existing six wider planning topics and fields remain available, along with official portal links on the approvals page.

## QA

- Node.js 22 regression suite: 67 passing tests; Next.js production build passed.
- Playwright Chromium at 320, 375, 430, 768 and 1440 CSS px: statuses changed independently, the first next step correctly prioritized the missing survey group, `Show all` expanded five outstanding steps, and `Copy summary` included both available and missing categories.
- On the same five widths, the site-review link passed `Porur, Chennai` and a 1,204-character preparation brief, including its professional-review limitation, into the existing enquiry form. No backend lead submission was made.
- No uncaught browser errors or horizontal overflow at the tested widths. Five screenshots captured.

## Limitations

This is preparation education, not title due diligence, FSI/setback assessment, official eligibility determination, certificate verification or confirmation that all required records have been gathered. Official requirements and current revisions must be checked with a registered professional and the relevant authority. Physical iOS/Android QA is still recommended.
