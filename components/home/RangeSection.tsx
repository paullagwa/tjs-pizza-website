"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import { JEFF } from "@/lib/content/business";
import { productRanges, venueTypes } from "@/lib/content/products";

export default function RangeSection() {
  const [venue, setVenue] = useState<string | null>(null);

  return (
    <section id="products" className="py-24">
      <div className="container-site">
        <p className="eyebrow">The range</p>
        <h2 className="h-section mt-3">What are you making?</h2>

        <div role="group" aria-label="Filter the range by kitchen type" className="mt-8 flex flex-wrap gap-2">
          {venueTypes.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={venue === v}
              onClick={() => setVenue(venue === v ? null : v)}
              className="min-h-11 rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors aria-pressed:border-crust aria-pressed:bg-crust aria-pressed:text-ink"
            >
              {v}
            </button>
          ))}
        </div>

        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {productRanges.map((p) => {
            const dimmed = venue !== null && !p.bestFor?.includes(venue);
            return (
              <li
                key={p.slug}
                className={`surface-plate group relative flex w-[78%] shrink-0 snap-start flex-col transition-opacity duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-green sm:w-auto ${
                  dimmed ? "opacity-35" : ""
                }`}
              >
                <ProductVisual product={p} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 78vw" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-crust">
                    {p.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{p.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-warm/75">
                    {p.useCase}
                  </p>
                  {p.specs.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Sizes">
                      {p.specs.slice(0, 3).map((s) => (
                        <li key={s.size} className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-medium tabular-nums">
                          {s.size}
                        </li>
                      ))}
                      {p.specs.length > 3 && (
                        <li className="px-1 py-0.5 text-xs text-muted">
                          +{p.specs.length - 3} more
                        </li>
                      )}
                    </ul>
                  )}
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-semibold text-green outline-none after:absolute after:inset-0"
                  >
                    See sizes &amp; specs
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-warm/80">
          Not sure which?{" "}
          <a href={JEFF.href} className="inline-flex min-h-11 items-center font-semibold text-green underline hover:no-underline">
            Ring Jeff on {JEFF.display}
          </a>{" "}
          and tell him your menu.
        </p>
      </div>
    </section>
  );
}
