# Bind Builds — website UI/UX audit

Date: 18 October 2026 · Website: https://www.bindbuilds.com/

## Assessment

The visual identity is consistent: restrained blue, white space, large headings and a clear architect-led message. The core calculator and enquiry flow work in the tested scenarios. The main opportunity is to help visitors reach prices, evidence and the next decision faster. Long introductions and repeated statements often delay the useful content.

This is an expert review of the live interface and source, not a user research study or a formal accessibility certification. No conversion uplift or performance score is inferred.

## Coverage and evidence

- Retrieved all 35 sitemap pages: each returned HTTP 200, had one H1, no duplicate IDs and no image missing an alt attribute. This checks attribute presence, not whether every alternative text is ideal.
- Checked internal fragment links against the retrieved pages: no missing section targets. This does not validate every external government, social or messaging destination.
- Reviewed desktop screenshots of Home, Packages, Process, Why Bind, Approvals, Planning Report, FAQs, About, Contact, Service Areas, Porur and the Pallikaranai project template; inspected shared templates and interactive components in source.
- Reused the earlier exact-width Chromium checks of Home, Packages, Calculator and Project Brief at 320, 375, 430 and 768px. This audit added narrow-width inspection of the planning tools.
- Reviewed the supplied iPhone Safari recording: text/numeric keyboards, scrolling, native selectors and first keyboard dismissal showed no obvious breakage in the recorded steps. It did not cover final contact details, submission or the planning tools.
- Android checks are deferred at the owner's request. Real-device landscape, screen-reader testing, slow-network form delivery and completed enquiry/PDF delivery remain unverified.
- `/review` reaches Google's sign-in flow. That is an external service journey, not an on-site review form.

## Priority fixes implemented

Release commit: `0dcb72acd4926ba0d6721b8bd7e4cdb736c3d3de`.

| Finding | Evidence | Change |
| --- | --- | --- |
| Planning inputs too small | At 320px, report fields computed to 13px and document selects to 12px; approval worksheet fields were 13px | Raised text inputs and selects in these tools to 16px. Improves readability and addresses a focus-zoom risk; the updated tools still need a physical Safari recheck |
| Preview hidden behind header | Report preview stuck at 22px while the fixed desktop header ended at 74px | Moved its sticky offset to 96px plus safe-area inset |
| Enquiry Back loses focus | Returning from priorities to project details left focus on BODY and the heading above the viewport | Focus and scroll to the heading after every step transition, including Back and starting another enquiry |
| Planning interrupted by lead popup | Planning and approval routes were eligible for the timed sales popup | Excluded both task-focused routes |
| Floating control on planning tools | These tools retained the floating motion control despite extensive form content | Moved the control into the footer, consistent with the calculator and enquiry pages |
| Small guide section controls | Mobile guide jump links measured 38px high with 11px text | Increased to at least 44px high with 13px text |
| PDF gate can wait indefinitely | Lead-capture fetch had no client timeout or synchronous duplicate-submit guard | Added a 20-second timeout, in-flight guard and recovery wording that preserves entries |
| PDF contact handoff unclear at point of action | Gate only said to enter contact details | Explicitly explains that name, phone, email and estimate go to Bind Builds for follow-up before PDF preparation |

## Design priorities for the next pass

These are recommendations, not changes included in this release.

| Priority | Area | Observation | Recommended improvement |
| --- | --- | --- | --- |
| High | Packages | At the reviewed desktop viewport, the first screen contained two introductions but no prices | Put the three starting rates and a short “who it suits” line directly below the page title; retain expandable specifications underneath |
| High | Home / trust | The homepage has about 1,560 rendered main-content words and the proof section comes after several brand/process sections | Bring one credible project example forward, with actual role, stage and dated site/design imagery; keep the user's Projects redirect to Studio Bind |
| Medium | Approvals | About 2,980 rendered words; approximately 14,650px tall in the reviewed desktop state | Start with a short choice of “Understand the route”, “Prepare documents” and “Create a brief”; keep deeper explanations behind clear sections |
| Medium | Navigation | Nine main links plus the enquiry CTA compete for attention | Preserve the established order, but make research tools and decision pages easier to distinguish through hierarchy rather than adding links |
| Medium | Contact | Review and directions appear before some direct enquiry channels | Prioritise WhatsApp, call and enquiry; put directions and review actions after these |
| Medium | Footer | Explore and area-guide lists contain 27 links, including duplicate Projects entries | Reduce repetition and use clearly grouped mobile disclosures for the guide index |
| Medium | Project links | “Review project evidence” and case-study breadcrumb links now lead through the requested redirect to the Studio Bind homepage | Label external portfolio transitions explicitly so visitors understand which brand/site opens |
| Medium | Planning report | Supporting document notes remain dense and small even after editable fields are enlarged | Increase key explanatory copy to 14–16px and reduce repeated disclaimers while preserving material assumptions |
| Medium | Forms | Inputs persist within the current form steps, but no draft restoration is provided after leaving/reloading | Consider an explicit temporary draft feature, with clear storage behaviour and no automatic sharing |
| Low | Local pages | Consistent templates aid navigation, but many pages share a similar rhythm | Add authentic locality/project evidence where available; avoid manufacturing local claims or completed-work imagery |

## Interaction checks

- Quality-control stage tabs responded to End by selecting Pre-painting, retaining the tab/panel relationship.
- FAQ search showed a clear empty state; Clear filters restored all 39 answers.
- Prior package checks verified expand/collapse for all ten categories at each tested width.
- Prior calculator checks verified floor count, timeline and subtotal updates, package changes and the area/package handoff.
- Existing test suite: 72 passed. Production build and TypeScript checks passed.
- No real sales lead, message or review was submitted during the audit.

## Release verification

Vercel production deployment reached READY. Live checks confirmed:

- At 320px, approval worksheet fields and document selects computed to 16px; all nine guide jump controls measured 44px high.
- Planning report fields/selects computed to 16px at 320px. Both tools had document scroll width equal to client width (305px, after the Chromium scrollbar), and the motion control was in the footer.
- Enquiry Back returned focus to “What are you planning?”; heading top was 180px, below the 64px mobile header.
- The desktop report preview stuck at 96px, below the 74px fixed header, with no horizontal overflow.
- Calculator completed its four steps and opened the PDF gate with the new disclosure. Escape closed the gate and restored focus to the Download estimate PDF button.
- Timeout and duplicate-submit handling were reviewed in code and passed the build; an actual stalled production submission was not simulated.

Visual evidence: [Corrected report layout](screenshots/ui-audit-report-layout-2026-10-18.jpg).

## Recommended success measures

Use the existing funnel events to compare package-to-enquiry clicks, calculator completion, contact-step arrival and successful enquiries before and after a future hierarchy redesign. Evaluate qualified enquiries, not only raw form volume. Collect real device performance data before making speed claims.

## Route inventory

All sitemap routes below returned HTTP 200 with one H1.

| Route | Main-content word count (initial HTML) |
| --- | ---: |
| `/` | 1560 |
| `/about` | 381 |
| `/why-bind-builds` | 1145 |
| `/projects/sunguvarchathiram-multigenerational-home` | 591 |
| `/projects/pallikaranai-family-home` | 508 |
| `/projects/ccbm-commercial-complex` | 341 |
| `/packages` | 1324 |
| `/cost-calculator` | 371 |
| `/construction-cost-chennai` | 837 |
| `/construction-company-chennai` | 1106 |
| `/house-construction-chennai` | 865 |
| `/individual-house-construction-chennai` | 875 |
| `/turnkey-house-construction-chennai` | 761 |
| `/building-plan-approval-chennai` | 2980 |
| `/pre-construction-planning-report` | 796 |
| `/service-areas-chennai` | 824 |
| `/house-construction-west-chennai` | 1209 |
| `/house-construction-ramapuram-chennai` | 735 |
| `/house-construction-porur-chennai` | 722 |
| `/house-construction-valasaravakkam-chennai` | 697 |
| `/house-construction-poonamallee-chennai` | 735 |
| `/house-construction-virugambakkam-vadapalani-saligramam` | 790 |
| `/house-construction-mangadu-kundrathur-chennai` | 774 |
| `/house-construction-maduravoyal-vanagaram-kattupakkam` | 860 |
| `/house-construction-gerugambakkam-kolapakkam-chennai` | 762 |
| `/house-construction-anna-nagar-chennai` | 593 |
| `/house-construction-omr-ecr-chennai` | 564 |
| `/house-construction-coimbatore` | 861 |
| `/construction-cost-coimbatore` | 815 |
| `/demolition-rebuild-house-chennai` | 663 |
| `/process` | 1418 |
| `/faq` | 2402 |
| `/contact` | 277 |
| `/start-a-project` | 253 |
| `/privacy` | 278 |
