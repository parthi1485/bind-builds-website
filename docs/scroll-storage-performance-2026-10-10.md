# Scroll storage performance — 10 October 2026

Eliminated the animation-frame scroll handler that repeatedly wrote the current scroll position into sessionStorage. Saves now occur only on internal navigation, Back/Forward and page exit. Existing history restoration and hash-section navigation remain intact. No lead, calculator or analytics logic was changed.

## Measured browser behavior

- Chrome test: fifty 35px scroll steps, 24ms apart at 375px mobile and 1440px desktop.
- Production baseline: 250 synchronous storage writes per run at each viewport.
- Revised local production build: 0 writes during scrolling at each viewport.
- Navigation tests at 320, 375, 430, 768 and 1440px: fresh route starts at top, Back returns to the previous 1100px position, Forward starts at the top, hash links work, no horizontal overflow or browser errors.
- 15 screenshots covering Home, Packages and Calculator across five widths were pixel-identical.
- 50 regression tests and the Next.js production build passed with Node.js 22.

This demonstrates fewer synchronous main-thread operations, not a measured improvement in real-user LCP or INP.
