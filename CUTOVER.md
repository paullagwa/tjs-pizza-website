# Go-Live Runbook — tjspizzaproducts.com.au → Next.js rebuild

The rebuild is complete and deploys from this repo. The old WordPress site
still serves the real domain. Going live is four small steps — **order
matters**. Total time ~20 minutes.

## Before you start (already done, verify only)

- [x] All 22 WordPress images rescued into `public/images/` and `tjs-site/images/`
- [x] 301 redirect map for every old WordPress page URL (`next.config.ts`)
- [x] Zero `wp-content` references in the app (`grep -ri "wp-content" app components lib public/llms.txt` → nothing)
- [x] Env vars exist in the Vercel project: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`

## Step 1 — Remove the staging noindex guard

In `app/layout.tsx`, delete this block from `metadata`:

```ts
  // STAGING GUARD — ...
  robots: { index: false, follow: false },
```

Commit + push. (Everything else — canonicals, JSON-LD, sitemap — already
points at `https://tjspizzaproducts.com.au` and needs no change.)

## Step 2 — Flip the Vercel root directory

Vercel Dashboard → `tjs-pizza-website` project → Settings → Build & Deployment
→ **Root Directory**: change `tjs-site` → *(empty / repo root)* → Save →
Deployments → Redeploy latest.

Verify on the vercel.app URL: new site renders, `/api/chat` replies (open
Forno and ask something), contact form sends (fill it once — a real email
arrives at tjspizza@live.com.au), `/sitemap.xml`, `/robots.txt`, `/llms.txt`
all resolve.

## Step 3 — Point the domain

Vercel → project → Settings → Domains → add `tjspizzaproducts.com.au` (+
`www`). Vercel shows the DNS records needed. In the domain's DNS (currently
behind Cloudflare on the WordPress host):

- `A` record for apex → `76.76.21.21` (or the records Vercel displays)
- `CNAME` for `www` → `cname.vercel-dns.com`
- If using Cloudflare: set these records to **DNS only** (grey cloud), not proxied

Wait for the domain to show "Valid Configuration" in Vercel (usually minutes).
SSL is automatic.

**Do NOT let anyone decommission the WordPress hosting before this point** —
and even after cutover, keep the WP hosting alive for a couple of weeks as a
fallback.

## Step 4 — Post-flip (same day)

1. Spot-check on the live domain: homepage, one product page, `/faq`,
   old URLs 301 (`curl -sI https://tjspizzaproducts.com.au/dough-balls` →
   `301` → `/products/frozen-dough-balls`)
2. Google Search Console: add/verify the domain property → submit
   `https://tjspizzaproducts.com.au/sitemap.xml`
3. Bing Webmaster Tools: same
4. Set up / claim the Google Business Profile, make NAP match the site
   footer exactly (Doherty Close, Warnervale NSW 2259, 0402 091 718), then
   add the GBP URL to `business.socials` in `lib/content/business.ts`
5. Test the DinoBite entry form end-to-end with a real photo

## Known follow-ups (not launch blockers)

- Carton quantities marked "—" (Traditional 6/8/9", GF 9/11") + all Fresh
  Frozen specs — get real numbers from Jeff/Rhys, update `lib/content/products.ts`
- Real photo of Rhys (currently the old site's placeholder `Person.jpg`)
- Replace half-anonymous testimonials with venue-named ones (see TODO in
  `lib/content/testimonials.ts`)
- Decide on branded emails (jeff@ / rhys@ / paul@) vs live.com.au inbox —
  form delivery goes to tjspizza@live.com.au today
- Have a lawyer glance over /privacy and /terms (drafted in-house)
- Content-Security-Policy header (needs Next.js nonce wiring — deferred)
- 9 vs 8 dough-ball sizes and 12/ctn vs 15/box at 1kg — legacy table was
  used; confirm with the factory (see lib/content/extraction-notes.md)
