import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import DoughSizer from "@/components/DoughSizer";
import Photo from "@/components/Photo";
import SectionEdge from "@/components/SectionEdge";
import SpecTable from "@/components/SpecTable";
import { productRanges } from "@/lib/content/products";

export default function FlagshipPanel() {
  const product = productRanges.find((p) => p.flagship);
  if (!product) return null;

  return (
    <section id="dough-balls" className="theme-flour relative py-24">
      <SectionEdge />
      <div className="container-site reveal">
        <p className="eyebrow">{product.tagline}</p>
        <h2 className="h-section mt-3 max-w-3xl">
          {product.specs.length} sizes. One dough. No surprises.
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Photo
              src="/images/TJs-Pizza-Products-10.jpg"
              alt="Rows of floured pizza dough balls resting on a wooden board"
              ratio="3/2"
              grade="baked"
              sizes="(min-width: 1024px) 34rem, 92vw"
              className="rounded-md"
            />
            <p className="lead mt-8 text-warm/85">
              Hand-stretched, then frozen at peak. Pull tomorrow&rsquo;s dough
              tonight: 24 hours in the cool room, an hour or two on the bench,
              and it stretches like you made it this morning.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {product.dietary.map((d) => (
                <li key={d} className="inline-flex items-center gap-2 text-sm text-warm/80">
                  <Check aria-hidden="true" className="h-4 w-4 text-green" />
                  {d}
                </li>
              ))}
              <li className="inline-flex items-center gap-2 text-sm text-warm/80">
                <Check aria-hidden="true" className="h-4 w-4 text-green" />
                {product.shelfLife}
              </li>
            </ul>
            <Link
              href={`/products/${product.slug}`}
              className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-green underline hover:no-underline"
            >
              Full dough ball specs
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <DoughSizer specs={product.specs} />
            <details className="mt-6 border-t border-line pt-4">
              <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-warm/80">
                All sizes, carton quantities and order codes
              </summary>
              <SpecTable product={product} />
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
