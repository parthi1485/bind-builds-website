# Mobile width QA — 18 October 2026

Release verified: `246529f0641eb082a030b267c66dfa0d64067b0d` on https://www.bindbuilds.com.

## Method

Used the production application in same-origin Chromium iframes sized to exactly 320, 375, 430 and 768 CSS pixels, with 844px frame height. This verifies responsive media queries and browser interaction at narrow widths; it is not physical-device or iOS Safari emulation. Chromium's visible scrollbar left document client widths of 305, 360, 415 and 753px respectively. Document scroll width matched client width in every recorded check.

A temporary unlinked HTML harness enabled exact sizing in the available browser. It was removed with the fix release; its public URL returned 404 after deployment. The isolated preview required Vercel access unavailable to the current connection, so the checks used the public production application.

## Layout results

| Frame width | Home | Packages | Calculator | Project brief |
| --- | --- | --- | --- | --- |
| 320px | No page overflow | No page overflow | No page overflow | No page overflow |
| 375px | No page overflow | No page overflow | No page overflow | No page overflow |
| 430px | No page overflow | No page overflow | No page overflow | No page overflow |
| 768px | No page overflow | No page overflow | No page overflow | No page overflow |

Calculator measurements covered Site, Floors, Package and Extras steps. Home budget cards were also checked at each width. The package jump rail intentionally scrolls horizontally inside its own container.

## Interaction evidence

- Mobile menu opened at all four widths; Close measured 44px high. Opening made main content inert. Escape closed the menu and restored content interaction. Focus returned to the menu trigger after its animation-frame callback.
- At 320px, Shift+Tab wrapped from the first menu link to the phone link, and Tab wrapped back to the first link. All nine navigation links remained available.
- Package Expand all opened all ten categories; Collapse all closed them at every width. Expand controls measured 44px high.
- Home budget selection changed to Signature at every width. Keyboard slider input moved from 600 to 700 square feet and preserved `/cost-calculator?package=Signature&area=700` in the handoff.
- Calculator floor selection changed the displayed subtotal from ₹23.84 lakh to ₹47.68 lakh; both the duration card and sticky subtotal agreed at every width. Switching to Signature updated the subtotal to ₹57.58 lakh and retained that package in Extras.
- Tested calculator action buttons were 49–60px high on phone widths. Initial project brief inputs/selects were 52–54px high and stayed inside their container.
- No application console errors were observed in the tested browser flows. No sales lead was submitted.

## Issue fixed and rechecked

At 320px the fixed motion button intersected project-form labels and a select control. The motion control now renders inside the footer on project enquiry, calculator and contact pages.

After release, calculator and project brief were rechecked at all four widths: the control had static positioning inside `.footerBottom`, measured 44px high, intersected zero tested form fields/sticky action regions and introduced no document overflow. Its button still toggled the root motion state between `paused` and `running`.

Visual evidence: [320px footer placement](screenshots/mobile-320-footer-2026-10-18.jpg).

## Other validation and limits

- All 72 existing regression tests passed; the local production build passed, and the production deployment reached READY.
- The health endpoint confirmed the release commit and the temporary harness endpoint returned 404.
- Physical iPhone Safari/Android checks, browser chrome, safe areas, landscape and the on-screen keyboard remain separate manual checks. This audit does not claim those device-specific behaviors were tested.
