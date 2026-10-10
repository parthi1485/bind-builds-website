# Performance: navigation intent + verified legacy CSS cleanup

Date: 10 October 2026. Scope: existing Bind Builds Next.js production website.

## Bottleneck

Mobile Lighthouse identified Google Analytics and Next.js hydration/route prefetch as contributors to main-thread JavaScript work. The third-party GA script was retained so attribution and conversion measurement continue working.

## Improvements

- Navigation and above-fold homepage conversion links use `IntentLink`: disable eager viewport route prefetch, but prefetch on pointer hover, keyboard focus or touch start. Ordinary link navigation continues to work.
- Removed 137 CSS selectors for obsolete homepage/price and calculator layouts from `app/globals.css`; these class names are not used by the current interface. This saves 9,598 unminified CSS bytes; a local Lighthouse run measured approximately 1.8 KB less stylesheet transfer.
- No edits to the construction calculator rates, quote handling, lead submission or GA4 pipeline.

## Verification

- Before: Homepage had 6 RSC fetches at 390px and 22 at 1440px during initial browsing (including Next.js prefetch). After: two homepage-only RSC fetches at both widths. After the link was hovered, the calculator route was prefetched and click navigation worked.
- Mobile initial script requests dropped from 12 to 9; desktop from 16 to 9 in the corresponding browser runs. Network conditions and caches affect absolute bytes.
- Screenshot comparisons: 25 paired screenshots (Home, Packages, Calculator, Process, Project Evidence at 320, 375, 430, 768, 1440 CSS px). Every paired screenshot was pixel-identical after the CSS cleanup, including reduced-motion state.
- Local Node 22 production build and regression suite passed. After deployment, CI and live smoke verification must be run against the exact released SHA.
- Local Lighthouse is variable. Compared across two local runs after navigation optimization, the CSS-only edit reduced stylesheet transfer from ~50.7 KB to ~48.8 KB; scores were Home 84 → 82, Packages 83 → 89, Calculator 87 → 86. Do not interpret these single-run score movements as statistically significant.

## Remaining opportunities

Measure real-user INP and LCP via existing GA4 Core Web Vitals events. Further third-party script reductions require an analytics measurement plan; avoid delaying GA4 simply to inflate Lighthouse scores. Conduct physical iOS/Android interaction testing in addition to headless Chromium.
