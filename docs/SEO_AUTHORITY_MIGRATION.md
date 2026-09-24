# SEO Authority Migration — bindconstructions.com → bindbuilds.com

Updated: 24 September 2026

## Why this exists

The legacy domain `bindconstructions.com` is still publicly indexed with Bind/Parthiban contact details and overlaps heavily with the new Bind Builds identity and package pricing. It also contains historical marketing claims that do not match the current evidence policy.

The canonical public construction domain is:

- https://www.bindbuilds.com

The design-practice domain remains:

- https://www.bindarchitects.com

## Code already prepared on bindbuilds.com

The Next.js project contains host-aware permanent redirects for the known legacy paths. These only become active if the legacy domain is pointed to this Vercel project or otherwise forwards requests to it.

Known mappings:

- `/` → `https://www.bindbuilds.com/`
- `/about` → `https://www.bindbuilds.com/about`
- `/packages` → `https://www.bindbuilds.com/packages`
- `/contact` → `https://www.bindbuilds.com/contact`
- `/portfolio` and `/projects` → `https://www.bindbuilds.com/project-evidence`
- `/design-packages` → `https://www.bindarchitects.com/`

Every public Bind Builds page also emits an absolute canonical URL on `www.bindbuilds.com`.

## Manual migration required at the legacy host/domain

1. Stop serving the old public site content.
2. Keep the old domain registered.
3. Point the old domain to a host that can issue permanent redirects, ideally this Vercel project.
4. Add both `bindconstructions.com` and `www.bindconstructions.com` to the redirecting host.
5. Verify both old-domain variants and the new domain in Google Search Console.
6. Test every known old URL and confirm it returns a single permanent redirect to the intended new URL.
7. Submit the old→new domain move in Search Console only after redirects are live.
8. Keep redirects running for at least 180 days; retaining the old domain for at least one year is preferable.
9. Monitor old-domain impressions, new-domain indexing, branded search queries and 404s during migration.

## Content policy

Do not restore unsupported claims from the legacy site. In particular, only publish project counts, awards, certifications, warranties, team size, reviews, completion claims or founding dates when they are documentable and current.

Bind Builds launched as the construction chapter in 2026. Studio Bind Architects began in 2019. Keep those histories distinct.
