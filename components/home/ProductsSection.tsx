import Photo from "@/components/Photo";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { productRanges, bespokeOffer } from "@/lib/content/products";
import SpecTable from "@/components/SpecTable";
import type { ProductRange } from "@/lib/content/types";

function ProductCard({ product }: { product: ProductRange }) {
  return (
    <article
      className={`relative flex flex-col rounded-lg border border-line bg-bg2 p-6 transition-colors focus-within:border-green hover:border-green/70 ${
        product.flagship ? "border-green/60 md:col-span-2" : ""
      }`}
    >
      <div className={product.flagship ? "gap-8 md:grid md:grid-cols-2" : ""}>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-green">
            {product.tagline}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">{product.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-warm/70">
            {product.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
            {product.dietary.map((d) => (
              <li
                key={d}
                className="inline-flex items-center gap-1.5 text-xs text-warm/65"
              >
                <Check aria-hidden="true" className="h-3 w-3 text-green" />
                {d}
              </li>
            ))}
          </ul>
          {product.image && (
            <Photo
              src={product.image}
              alt={product.imageAlt ?? product.name}
              ratio="3/2"
              grade={product.slug === "square-pizza-base" ? "baked" : "dough"}
              vignette={product.slug === "square-pizza-base"}
              sizes="(min-width: 768px) 34rem, 92vw"
              className="mt-5 rounded-md"
            />
          )}
        </div>
        <div>
          <SpecTable product={product} />
          {product.shelfLife && (
            <p className="mt-3 text-xs text-warm/65">
              <span className="font-mono uppercase tracking-[0.14em] text-muted">
                Shelf life:{" "}
              </span>
              {product.shelfLife}
            </p>
          )}
          <Link
            href={`/products/${product.slug}`}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-green after:absolute after:inset-0 hover:underline"
          >
            See sizes &amp; specs<span className="sr-only">: {product.name}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section id="products" className="py-20">
      <div className="container-site reveal">
        <p className="eyebrow">
          Our range
        </p>
        <Heading className="h-section mt-3">
          Built on the dough ball
        </Heading>
        <p className="mt-4 max-w-2xl text-warm/70">
          Our frozen dough ball range is the core of what we do — and why 500+
          commercial kitchens order from us. One standard across every range:
          clean ingredients, consistent results.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {productRanges.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <aside className="mt-10 rounded-lg border border-green/50 bg-bg2 p-7 md:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-green">
            {bespokeOffer.tag}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {bespokeOffer.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-warm/70">
            {bespokeOffer.description}
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {bespokeOffer.points.map((pt) => (
              <li key={pt} className="inline-flex items-start gap-2 text-sm text-warm/70">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                {pt}
              </li>
            ))}
          </ul>
          <Link
            href="/contact?intent=bespoke"
            className="btn-primary mt-6"
          >
            {bespokeOffer.cta}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
