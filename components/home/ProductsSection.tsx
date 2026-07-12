import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { productRanges, bespokeOffer } from "@/lib/content/products";
import type { ProductRange } from "@/lib/content/types";

function SpecTable({ product }: { product: ProductRange }) {
  if (product.specs.length === 0) return null;
  return (
    <table className="mt-4 w-full text-sm">
      <caption className="sr-only">
        {product.name} sizes and carton quantities
      </caption>
      <thead>
        <tr className="border-b border-line text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <th scope="col" className="py-1.5 pr-4 font-medium">Size</th>
          <th scope="col" className="py-1.5 font-medium">Carton</th>
        </tr>
      </thead>
      <tbody>
        {product.specs.map((row) => (
          <tr key={row.size} className="border-b border-line/50">
            <td className="py-1.5 pr-4 font-medium tabular-nums">{row.size}</td>
            <td className="py-1.5 tabular-nums text-warm/70">{row.carton}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProductCard({ product }: { product: ProductRange }) {
  return (
    <article
      className={`flex flex-col rounded-lg border border-line bg-bg2 p-6 ${
        product.flagship ? "border-green/60 md:col-span-2" : ""
      }`}
    >
      <div className={product.flagship ? "gap-8 md:grid md:grid-cols-2" : ""}>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
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
            <Image
              src={product.image}
              alt={product.imageAlt ?? product.name}
              width={640}
              height={480}
              className="mt-5 h-44 w-full rounded-md object-cover"
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
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green hover:underline"
          >
            {product.name} details
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
          Our range
        </p>
        <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          Built on the <em className="text-green">dough ball</em>
        </h2>
        <p className="mt-4 max-w-2xl text-warm/70">
          Our frozen dough ball range is the core of what we do — and why{" "}
          {`hundreds of commercial kitchens`} order every week. Seven ranges,
          one standard: clean ingredients, consistent results.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {productRanges.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <aside className="mt-10 rounded-lg border border-green/50 bg-bg2 p-7 md:p-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
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
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-green-deep px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {bespokeOffer.cta}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
