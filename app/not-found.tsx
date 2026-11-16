import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { JEFF } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 py-20">
        <div className="container-site">
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="h-28 w-28 text-warm"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M60 60 L60 10 A50 50 0 1 0 103.3 35 Z" />
            <circle cx="42" cy="48" r="5" />
            <circle cx="50" cy="82" r="5" />
            <circle cx="78" cy="74" r="5" />
            <path d="M72 44 L92 9" strokeDasharray="3 6" />
          </svg>
          <p className="mt-8 eyebrow">
            404
          </p>
          <h1 className="h-page mt-3">
            That one&rsquo;s not on the menu.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-warm/75">
            The page you were after has moved or never existed. Here&rsquo;s
            what we do make.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productRanges.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex min-h-14 items-center justify-between gap-3 rounded-lg border border-line bg-bg2 px-5 py-4 text-sm font-semibold transition-colors hover:border-green"
                >
                  {p.name}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-green" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to the homepage
            </Link>
            <a href={JEFF.href} className="btn-ghost">
              <Phone aria-hidden="true" className="h-4 w-4" />
              Call Jeff {JEFF.display}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
