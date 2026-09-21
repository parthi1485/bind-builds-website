# Bind Builds — Production Launch Status

**Production:** https://www.bindbuilds.com  
**Launch QA:** Active  
**Post-launch monitoring:** Active

## Current production gates

- 15 public routes return expected content.
- `robots.txt` and `sitemap.xml` are available.
- Sitemap contains all 15 public routes.
- Open Graph preview image is available.
- Unknown routes return HTTP 404.
- Lead API rejects unsupported GET requests.
- Baseline production security headers are enabled.
- Calculator and approval-fee regression tests run before production smoke checks.
- Next.js production build is checked on each push to `main`.
- Google Analytics conversion events and Search Console were manually verified during launch QA.

## Automated monitoring

`.github/workflows/launch-readiness.yml`
- Runs on every push to `main`.
- Runs regression tests.
- Builds the production application.
- Waits for the matching Vercel production commit.
- Runs the live production smoke test.

`.github/workflows/production-monitor.yml`
- Runs every day at **08:00 IST**.
- Checks the live production site independently of a deployment.
- Opens or updates a GitHub issue if monitoring fails.
- Automatically closes the incident issue after the site passes again.

## Manual checks retained

Automated monitoring intentionally does **not** create fake sales leads. Periodically verify:
- one real project enquiry reaches the Google Sheet/email workflow;
- one estimate PDF lead reaches the Google Sheet/email workflow;
- `project_enquiry` and `pdf_download_lead` continue appearing in GA4;
- Search Console indexing/coverage remains healthy.

## Change discipline

For production changes:
1. Push to `main`.
2. Wait for Vercel deployment.
3. Require the Launch Readiness workflow to pass.
4. If production monitoring opens an incident, review the failed workflow before making further changes.
