# Navigation scroll restoration QA — 10 October 2026

## User-facing issue

Earlier page transitions forced a return to the very top even when navigating Back to a long page (e.g. Packages after exploring the Calculator). Deleting the scroll manager and relying only on the browser gave inconsistent restoration: only one of five responsive widths returned to its saved position in local Chromium testing. New pages also sometimes opened partway down.

## Implementation

The `components/PageScroll.tsx` route-scroll manager now:

- Stores a lightweight `route path + query -> scrollY` value in `sessionStorage`, per browser tab (no user/customer information).
- Sets history restoration to manual while the component is mounted to avoid the browser and app router competing.
- Saves the current position on scroll, internal navigation, history PopState, and page exit.
- On Back/Forward, restores the previously saved page position after the app router renders the target page.
- On new route navigation, opens at the header (top = 0). Repeated same-page links without anchors also scroll to top.
- Leaves hash anchors, external navigation, modified-click, and new-tab behavior alone.
- Uses native `scrollTo({behavior:'instant'})` for accessibility and to avoid accidental animated jumps.

## Browser tests

Headless Chromium at **320, 375, 430, 768, 1440 CSS px**:

- Started on `/packages`, scrolled to `1100px`, navigated to `/cost-calculator` using the mobile or desktop navigation. New route was at `0px`.
- Used browser Back: `/packages` restored to `1100px` at all 5 widths.
- Used Forward: `/cost-calculator` displayed from the top, no browser errors.
- Clicked `#signature` internal package anchor: URL updated and page scrolled to its target.
- Zero horizontal overflow at tested widths.
- 15 before/after screenshots (Home, Packages, Calculator × 5 widths) were pixel-identical at initial render under reduced-motion settings.

Node.js 22 unit/regression tests and Next.js production build passed locally before deployment. The release must pass the matching GitHub Actions build and production smoke suite before it is marked live.

## Boundaries

This is a behavioral navigation fix, **not** a demonstrated Lighthouse speed improvement. Session-scoped scrolling stores only route and position in the visitor's own browser; no new analytics data is transmitted or collected.
