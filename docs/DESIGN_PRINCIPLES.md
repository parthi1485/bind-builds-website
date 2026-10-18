# Bind Builds design principles

Use these rules when changing the website. Keep the existing architectural positioning, spacious composition, blue accents and brand identity.

## References and application

- [Figma: UI design principles](https://www.figma.com/resource-library/ui-design-principles/): establish a clear heading, explanation and next action; group related controls; keep keyboard navigation and text contrast usable.
- [Laws of UX](https://lawsofux.com/): use familiar interaction patterns, make controls easy to reach, limit competing decisions within each task and show immediate feedback. Treat the laws as design guidance, not proof of conversion gains.
- [Figma: types of logos](https://www.figma.com/resource-library/types-of-logos/): maintain the existing wordmark, its proportions and clear space. Use a legible size in the header, menu and footer. A new logo is a separate branding decision.
- [Typography and colour fundamentals](https://medium.com/design-bootcamp/ui-design-typography-and-colour-fundamentals-b3bdf091b096): assign reusable roles to type and colour, with clear distinctions between headings, body copy, supporting text, controls and decoration.

## Working rules

1. One prominent primary action per decision area. Keep important prices, exclusions and terms visible beside the decision.
2. Use at least 1rem for explanatory body copy, .875rem for controls and .8125rem for supporting notes. Captions can be .75rem. Do not shrink the interface to fit a phone.
3. Use the shared colour and type tokens. Aim for at least 4.5:1 contrast for normal text, 3:1 for qualifying large text and meaningful control boundaries. Check the actual background, including selected states.
4. Aim for 44px control targets, visible focus and plain labels. Pair colour changes with text, a check or another visible cue.
5. Keep the full navigation order, including Projects after Approvals. The mobile menu must contain its own close control, trap keyboard focus and restore focus after dismissal.
6. Respect reduced-motion settings. Motion must not gate content or delay feedback. Lead prompts must not interrupt another dialog or an active form field.
7. Check 320, 375, 430, 768 and desktop widths, keyboard operation, selected states and budget handoff before release. Distinguish verified results from testing limitations.

## This pass

Improves shared type roles, supporting text contrast, navigation target sizes, mobile dialog focus, package selection feedback and form-control boundaries. It retains the current page structure and pricing calculations.
