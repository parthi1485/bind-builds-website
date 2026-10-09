# Responsive UI/UX and Motion QA — 10 October 2026

## Scope
Existing production website https://www.bindbuilds.com. Chromium/Playwright screenshot audit on Home, Packages and Cost Calculator at 320, 375, 430, 768, and 1440 CSS pixels; 900px viewport height. This is a browser screenshot audit, not testing on physical devices.

## Before
- At 768px the document measured 775px because the four-column footer contact grid exceeded the available width.
- Package specifications required scrolling through three long cards without quick package anchors or an expand-all control.
- The live calculator budget was below the form on small viewports, disconnected from the sticky step action.
- Route headings lacked consistent restrained entrance animation.

## Changes
- Added 3 concise package jump links with visible starting rates and anchors to the existing specification cards.
- Added independent per-package expand/collapse-all controls while preserving single-category toggles and their accessible expanded state.
- Introduced the current planning subtotal within the sticky calculator actions on mobile; package and floor edits update it, without changing the calculation engine.
- Improved calculator step labels for assistive technologies.
- Added lightweight page-heading and calculator-step entrance animations, respecting reduced-motion settings.
- Corrected the tablet footer to a two-column grid at 761–1023px.
- Preserved existing page-scroll code and the current brand direction.

## Screenshot-based Chromium observations
| CSS width | Home page overflow | Packages overflow | Calculator overflow | Script errors |
| --- | ---: | ---: | ---: | ---: |
| 320px | 0px | 0px | 0px | None observed |
| 375px | 0px | 0px | 0px | None observed |
| 430px | 0px | 0px | 0px | None observed |
| 768px | 0px | 0px | 0px | None observed |
| 1440px | 0px | 0px | 0px | None observed |

Screenshots were captured before and after changes during the audit in a headless Chromium environment; screenshots are not bundled with this source commit.

## Interaction verification
- Package expand all opened all 10 categories; collapse all left 0 expanded; a single category toggle opened exactly 1, at each of the five widths.
- Calculator advanced from site → floors → package; the selected package and live amount responded to controls, including a two-floor Signature scenario at narrow and desktop widths.
- Three package anchor links were present on each viewport.
- Mobile navigation opened and closed with Escape at 320, 375, 430 and 768px.
- 375px with forced prefers-reduced-motion: reduce disabled page-heading animation; root motion state was paused.
- No uncaught page-level script errors were detected in these tested flows.

## Remaining manual/device work
- Check iOS Safari visual viewport with on-screen keyboard, bottom browser chrome, text zoom, landscape, and safe-area overlays.
- Check Android Chrome, Firefox, and physical tablet landscape.
- Test payment-free estimate PDF and lead capture handoff using real but controlled contact details; this QA did not generate a sales lead.
- Measure Lighthouse/Core Web Vitals separately; screenshot-based layout checks are not speed scores.

## Release verification
GitHub Launch Readiness workflow runs regression tests, a production build and the 35-route live smoke test against the matching commit after each production-code push.
