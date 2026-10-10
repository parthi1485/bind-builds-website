# Main-thread performance follow-up — 10 October 2026

## Goal

Preserve the existing architect-led visual experience, improve asset efficiency and avoid regressions in the calculator and lead capture.

## Profiling and rejected experiment

Google Analytics (`gtag.js`) remains a large third-party contributor to the mobile main thread. The site already loads it with `lazyOnload` while queuing early events. It was deliberately **not disabled or further delayed** merely to raise a Lighthouse score, because that would risk losing brief visits and conversion attribution.

A proposed extraction of the SVG architecture illustration into a React Server Component reduced homepage script transfer by about 6 KB, but increased HTML transfer by about 5 KB and worsened local mobile LCP in the comparison. **That experiment was discarded and was not deployed.** The original interactive three-mode architectural hero remains in place.

## Shipped code change

- Pruned 68 retired CSS rules and partially pruned 3 multi-selector rules from `app/premium.css`.
- Removed 5,053 bytes of source CSS; local Lighthouse resource summary showed a reduction of 905 bytes in transferred CSS (48,817 B to 47,912 B).
- Kept currently used selectors, including the new quality-control stage tabs and enquiry confidence sections.
- Preserved all typography, layout, buttons, motion behavior, calculator rates and forms.

## Validation

- Local Node.js 22 `npm test` and Next.js production build passed (48 tests).
- Twenty-five before/after screenshots — Homepage, Packages, Calculator, Process and Project Evidence at 320px, 375px, 430px, 768px and 1440px — were **pixel-identical** in headless Chromium with reduced motion enabled.
- Local Lighthouse results varied: prior runs Home/Packages/Calculator 82/89/86, post-cleanup 75/81/87. These single-run score movements cannot establish an improvement or regression in real-world user experience. CSS transfer reduction is directly measurable.

## Next measurement gate

Inspect at least one week of real-user GA4 `web_vital` events (LCP, INP, CLS) together with attribution and enquiry conversion trends before modifying third-party analytics loading. If long tasks remain high, use repeated matched Lighthouse traces with an identified actionable script rather than optimization by score alone.
