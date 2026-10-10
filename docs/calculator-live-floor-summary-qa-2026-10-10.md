# Calculator immediate floor-selection subtotal — 10 October 2026

## Reported issue

When selecting a floor count, the construction timeline updated immediately but the live subtotal appeared to update only following a further tap or page scroll, particularly noticeable on mobile.

## Diagnosis

The existing React calculation already derived the timeline and subtotal from the same current floor-count state. Instant DOM updates were observed in Chromium across five widths, so the reported delayed paint could not be reproduced there. The sticky mobile subtotal used a translucent `backdrop-filter` layer, which is a possible paint/compositing contributor in WebKit/iOS. This is a hypothesis, not a confirmed Safari root cause; a physical iPhone test is still recommended.

## Fix

- Keep pricing mathematics, package rates, additional items and estimate API unchanged.
- Add an immediately visible live **Planning subtotal** and **floor built-up area** beside the construction timeline within the Floor selection stage, so customers see both changes in the same viewport.
- Refresh subtotal outputs with value-dependent React element keys whenever the floor count or estimated total changes.
- Disable the blur compositing layer in the mobile sticky action bar and use a solid white background for reliable redraw.
- Use an accessible live region around the timeline and subtotal; retain the existing separate live estimate preview.

## Browser QA

Tested in headless Chromium at **320, 375, 430, 768 and 1440 CSS px**:

| Floors | Planning duration | Built-up area | Live subtotal, example Elevate |
| --- | --- | --- | --- |
| Ground | 6 months | 900 sq.ft | ₹23.84 lakh |
| G + 1 | 10 months | 1,800 sq.ft | ₹47.68 lakh |
| G + 2 | 14 months | 2,700 sq.ft | ₹71.52 lakh |
| G + 3 | 18 months | 3,600 sq.ft | ₹95.36 lakh |

A custom 1,000 + 1,200 sq.ft selection updated the displayed subtotal to ₹58.28 lakh. Values in the timeline card, mobile sticky total and preview agreed immediately after every click/change, with no extra tap or scrolling. At each viewport, the document had no horizontal overflow and no uncaught JavaScript errors. Screenshots were captured after setting custom areas.

## Test boundaries

These are browser automation results, **not physical Safari or Android-device testing**. Pricing remains illustrative; this display fix does not change estimate calculations or taxes/exclusions. Test the updated calculator on the reported device as the final visual repaint confirmation.
