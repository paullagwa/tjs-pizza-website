import Link from "next/link";
import { business } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const primaryEmail = business.emails.find((e) => e.primary)!;

  return (
    <footer className="border-t border-line bg-bg2">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl font-extrabold text-green">
              TJ&rsquo;s
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Pizza Products
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm/65">
              Wholesale pizza bases and dough balls made on the NSW Central
              Coast. 100% Australian family-owned since {business.foundedYear}.
              HACCP certified. No preservatives.
            </p>
          </div>

          <nav aria-label="Products">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Products
            </h2>
            <ul className="mt-4 space-y-2.5">
              {productRanges.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm text-warm/65 transition-colors hover:text-warm"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/#story" className="text-sm text-warm/65 hover:text-warm">Our Story</Link></li>
              <li><Link href="/#team" className="text-sm text-warm/65 hover:text-warm">Our Team</Link></li>
              <li><Link href="/home-cooks" className="text-sm text-warm/65 hover:text-warm">Home Cooks</Link></li>
              <li><Link href="/#faq" className="text-sm text-warm/65 hover:text-warm">FAQ</Link></li>
              <li><Link href="/#contact" className="text-sm text-warm/65 hover:text-warm">Contact</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="tel:0402091718" className="text-warm/65 hover:text-warm">
                  0402 091 718 (Jeff)
                </a>
              </li>
              <li>
                <a href="tel:0243940176" className="text-warm/65 hover:text-warm">
                  (02) 4394 0176
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${primaryEmail.address}`}
                  className="break-all text-warm/65 hover:text-warm"
                >
                  {primaryEmail.address}
                </a>
              </li>
              <li className="text-warm/65">{business.address.display}</li>
            </ul>
          </div>
        </div>

        {/* Entity paragraph — was hidden at 0.08 alpha on the legacy site;
            surfaced here at readable contrast per the audit. */}
        <p className="mt-12 border-t border-line pt-8 text-sm leading-relaxed text-warm/65">
          TJ&rsquo;s Pizza Products is a wholesale pizza base and dough ball
          supplier located in {business.address.locality} on the NSW Central
          Coast, Australia. We supply{" "}
          {business.customerTypes.slice(0, -1).join(", ").toLowerCase()} and{" "}
          {business.customerTypes.at(-1)!.toLowerCase()} across{" "}
          {business.deliveryRegions.slice(0, -1).join(", ")} — and nationally
          through {`PFD Food Services`}. Our range covers frozen dough balls,
          traditional par-baked bases, fresh frozen bases, gluten free bases,
          garlic butter &amp; cheese bases, square bases and DinoBite kids
          bases. HACCP food safety certified. No artificial preservatives,
          colours or flavours. No soy. No milk products. Vegan friendly.
          Australian owned and made since {business.foundedYear}.
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-warm/65 sm:flex-row sm:items-center">
          <p>© {year} TJ&rsquo;s Pizza Products. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-warm">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-warm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
