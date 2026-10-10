# Plot planning worksheet — homeowner education and qualified enquiry handoff

**Release date:** 10 October 2026. Existing Bind Builds website, under `/building-plan-approval-chennai#plot-worksheet`.

## Need

The approval guide already linked the TN local-body lookup, CMDA land-use maps, land-record portals, FSI and setbacks explainer, checklist, indicative fee table and professional follow-up. The missing functionality was a safe, interactive explanation of how an **illustrative floor-area ratio** relates to a homeowner's rectangular plot and a hypothetical counted area across proposed levels.

## Implemented

- Users enter geometric frontage and depth in feet, select a sample ground-only / G+1 / G+2 / G+3 number of levels, and enter an assumed FSI-counted floor area per level.
- The page updates geometric plot area, aggregate *illustrative* counted floor area, and the illustrative ratio from arithmetic only. It explicitly does not determine permitted FSI, statutory counted area, exemptions, setbacks, site jurisdiction, approval eligibility or construction costs.
- Clear input validation: blank/invalid frontage, depth or counted area disables transfer actions. A hypothetical per-level figure exceeding plot area triggers a recheck warning, not a regulatory decision.
- Guide explains official matters to verify: survey, land use, access, local body, counted area/exemptions, setbacks, heights and permission route. Direct link to existing official Tamil Nadu planning portal.
- User-controlled handoff: copy the scenario locally, open a prepared WhatsApp draft or continue to the existing three-step enquiry form, with general locality and a clearly tagged *illustrative* note. No lead is submitted until the customer completes the form. Sensitive deeds and ID data are discouraged.
- Links added from the homepage education card and construction calculator for discovery, without creating a new project or modifying construction-package rates.
- Track privacy-conscious action events (enquiry click, WhatsApp draft open, copied scenario) with action, level count and a Boolean indicating presence of a locality. No site location or dimensions are transmitted through action-event parameters.

## Browser QA

Chromium headless at **320, 375, 430, 768 and 1440 CSS px**:

- Default `30 × 40 ft` plot, `750 sq.ft` assumed countable area per level, `G+1`: plot area `1,200 sq.ft`, illustrative counted area `1,500 sq.ft`, ratio `1.25`.
- Change to `G+2`: ratio `1.88` (exact fractional value `1.875`, rounded to 2 decimals), counted area `2,250 sq.ft`.
- `27.5 × 40 ft`, `550 sq.ft` per level, `G+1`: `1,100 sq.ft` plot, `1,100 sq.ft` counted example, ratio `1.00`.
- Empty depth disables both customer handoff actions, displays a clear validation note.
- Hypothetical counted area per floor larger than plot area shows a warning.
- WhatsApp and enquiry URLs carry labelled illustrative figures and locality; the existing enquiry form prefills locality. No lead API was called by the worksheet QA.
- No horizontal overflow or uncaught JavaScript errors observed at the five widths. Screenshots captured for all viewports.

## Important limitations

These figures must never be interpreted as legal permission, an approved FSI calculation, or a guaranteed buildable area. Legal FSI-counted areas vary by current scheme and exclusions. Actual site measurement must be confirmed by the survey and registered professional. Professional support, official fees, formal submissions and approval timing are separate. No automated jurisdiction lookup or unsupported fee calculation was added.

After deployment, verify the exact release SHA, all-35-route smoke test and new feature across widths on the production domain. Physical iPhone/Android testing remains advisable.

## Final integration checks

- Following “Discuss my site” opens the existing form with `location=Porur, Chennai` correctly populated after hydration; the optional priorities-stage textarea contains the illustrative ratio, dimensions, disclaimer and professional-verification questions. Verified at all five widths.
- The copied/forwarded worksheet assumptions are never silently substituted for the construction calculator’s *built-up area* input.
- Entry points exist in the homepage planning-guide card and construction calculator. Calculator → `#plot-worksheet` correctly scrolls to the worksheet at all five widths.
- In browser QA, action-event payloads did not contain the entered general locality or dimensional details. No real lead submissions were made.
