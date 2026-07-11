# TJ's Pizza Products — Website

Wholesale pizza bases & dough balls, Warnervale NSW. Built by All In Code.

## Two apps live in this repo (during the rebuild)

| Path | What | Status |
|------|------|--------|
| `tjs-site/` | Legacy single-file static site + serverless functions | **LIVE** — Vercel root directory points here |
| repo root (`app/`, `public/`) | Next.js 16 + Tailwind v4 rebuild | In progress — deploys after cutover |

**Deploying:** push to `main` → Vercel auto-deploys `tjs-site/` (root directory is set to `tjs-site` in Vercel project settings). At cutover, change the Vercel root directory to the repo root so the Next.js app deploys instead.

## Local dev (Next.js rebuild)

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint incl. jsx-a11y rules
npm run build
```

## Environment variables (Vercel)

- `ANTHROPIC_API_KEY` — Forno chat widget (`/api/chat`). Key has access to claude-haiku-4-5, claude-sonnet-5, claude-opus-4-8.
- `RESEND_API_KEY` — contact form (`/api/contact`) + DinoBite competition entries (`/api/submit`). Sending domain `tjspizzaproducts.com.au` is verified in Resend; monitored inbox is `tjspizza@live.com.au`.

## Design tokens

Defined in `app/globals.css`: near-black `#111008`, cream `#f5f0e8`, TJ's green `#4e8a47` (display only), deep green `#3d6e36` (buttons/surfaces with white text — WCAG AA). Fonts via `next/font`: Playfair Display (display), Plus Jakarta Sans (body), DM Mono (labels).

## Rebuild plan

7-phase plan from the July 2026 audit (41 findings). Phase 0 (image rescue, form fix, chat fix) and Phase 1 (this scaffold) are done. Next: Phase 2 wholesale homepage → API hardening → multi-page IA + SEO/GEO → a11y polish → DNS cutover.

**Cutover checklist lives in Phase 6 of the audit** — key items: remove the `robots: noindex` staging guard in `app/layout.tsx`, set canonical to `https://tjspizzaproducts.com.au`, zero `wp-content` references, 301 map from old WordPress URLs, flip the Vercel root directory.

## Source photos

`tjs-site/images/` and `public/images/` hold the 22 original photos rescued from the old WordPress site (it still serves the live domain until cutover — do not let it be decommissioned without checking these are safe).
