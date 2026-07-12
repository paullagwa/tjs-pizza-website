# Extraction notes — legacy TJ's site → lib/content/

Sources used, in priority order:

1. Legacy site `index.html` (base64-stripped copy), including JSON-LD and the hidden `.footer-seo` paragraph
2. Product sheet PDF — the file at `~/Documents/Personal/Desktop Archive/TJs_Pizza_Products_Description.pdf` is a **macOS alias, not a real PDF**; the real document is `~/Library/Mobile Documents/com~apple~CloudDocs/TJ's Pizza Products/TJs product sheet.pdf` (2 pages, dough balls only)
3. Old WordPress site, still live at tjspizzaproducts.com.au (home, /sizes-and-uses/, /dough-balls/, /our-story/, /our-team/, /faq/, /contact/)

## Conflicts found

1. **Dough ball size count.** Legacy spec table has **9 sizes (150g–1kg)**; the same page's JSON-LD says "8 sizes from 150g to 600g", the footer-seo paragraph says "150g to 600g", and the bespoke banner says "150g to 600g+". The card copy says "From 150g to 1kg". Kept the 9-row table (visible table wins). Ask Paul whether 1kg is a standard line item or special order.
2. **1kg carton quantity.** Legacy table: **12/ctn**. PDF: "15 per box at 1kg dough balls". Kept 12 (legacy priority). Confirm with Paul.
3. **Email split-brain.** `jeff@tjspizzaproducts.com.au` = contact section, footer, JSON-LD (primary public). `tjspizza@live.com.au` = all three team cards, DinoBite entry fallback, PDF, entire WordPress site (legacy inbox). Both kept in `business.ts`.
4. **Phone discrepancies.** PDF prints mobile **0416 355 322** — matches nobody (Rhys is 0416 071 022, Paul is 0411 635 322); likely a typo. PDF landline "(02) 4394 01768" has an extra digit vs the site's (02) 4394 0176. Site numbers used everywhere. WordPress adds **fax (02) 4392 0622** (captured).
5. **"22 years" hard-coded.** Hero ticker ("22 Years Strong"), story heading ("22 years of doing things right") and a pillar ("22+ years") bake in a 2024-era count. `foundedYear: 2002` stored as a number so the UI computes it.
6. **WordPress size list disagrees with legacy.** WP /sizes-and-uses/ lists bases in 2″, 6–8″, 8–9″ thick, **10″ ("our best seller!")**, 11–12″, slabs, squares — the legacy site claims Traditional is 6/8/9 inch only and never mentions 10″ or 2″ canape bases. Legacy kept; ask Paul what the current base line-up actually is.
7. **Garlic crust variants.** Legacy card: "herb, bacon, bruschetta and mushroom & fetta". WP: "herb, bacon and sweet chilli, bruschetta and mushroom and fetta" (adds sweet chilli). Legacy kept.
8. **"Lake Mummorah"** (legacy + WP) corrected to **Lake Munmorah** (real NSW locality) in `story.ts`, with a comment.

## Three ranges with no legacy product card

Cards for these were missing from the legacy products grid (blank slot in the HTML); they exist only in the contact-form dropdown, footer links, footer-seo and JSON-LD.

- **Traditional Par-Baked** — 6/8/9 inch and "3 weeks chilled / 12 months frozen" from JSON-LD + WP homepage copy. **Carton quantities not sourced** (specs use `—`).
- **Fresh Frozen Range** — **nothing beyond the name** anywhere (legacy dropdown/footer, WP homepage tile). Description in `products.ts` is a conservative placeholder; needs Paul's specs (sizes, cartons, what distinguishes it from Traditional).
- **Gluten Free Range** — 9″ and 11″, "dedicated, fully segregated HACCP-certified facility, no cross-contamination" — **sourced only from the legacy site's own JSON-LD/FAQ markup**, not from the PDF or WP. Carton quantities not sourced. The dedicated-facility claim should be confirmed with Paul before it goes on the new site.

The PDF, despite the filename, covers **only the dough ball range** (ingredients, thaw instructions, packaging) — no par-baked/fresh-frozen/GF specs.

## Image mapping confidence

- Gallery (8 images), story, factory banner, team (Jeff/Rhys), product cards, bespoke, HACCP badge: **exact** — recovered from pre-embed git commit `20ab20d` of `tjs-site/index.html`, which hotlinked the same slots/alts to WordPress filenames now in `/public/images/`.
- Hero photos 2 & 3 (legacy alts: "wood fire oven", "pepperoni"): base64-only in every commit. The two otherwise-unused rescued files are `IMG_4008.jpg` (a long par-baked pizza slab on a tray) and `IMG_6172.jpg` (a sliced ham & pineapple pizza) — **neither matches the legacy alt text**, so either the embedded hero photos were never rescued or the legacy alts were inaccurate. Mapped to these two files with honest alts and `// VERIFY mapping` comments in `gallery.ts`; swap in the real wood-fire/pepperoni shots if Paul has them.
- Paul Lagwa team photo and the DinoBite card image: base64-embedded, match no rescued file (likely newer uploads) — left `undefined`.

## Needs Paul's confirmation

- Dough ball line-up: is 1kg standard? 12 or 15 per carton? Are 220g/240g/250g all real SKUs (three near-identical sizes is unusual)?
- Traditional / Fresh Frozen / Gluten Free: sizes, carton quantities, and what "Fresh Frozen" actually is.
- Gluten free dedicated-facility claim (legal exposure if wrong).
- Current base sizes vs the old WP 2″–12″ + slabs list.
- Retail stockists for the home-cook section — the legacy hero promised "where to buy" but named none.
- Testimonials: replace "Marco P." / "Sarah M." with attributable venue-named quotes before launch (TODO in `testimonials.ts`).
- Street address "Doherty Close, Warnervale 2259" (PDF only — no street number given) — confirm before putting on the site/JSON-LD.
- DinoBite competition: still running? Prize values current?
