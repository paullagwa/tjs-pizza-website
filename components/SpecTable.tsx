import Link from "next/link";
import type { ProductRange } from "@/lib/content/types";

/**
 * Sizes for a range. The Carton column only renders when at least one row has
 * a confirmed quantity — otherwise sizes show as chips with a spec-sheet link,
 * so the page never prints a dash where a number should be.
 */
export default function SpecTable({ product }: { product: ProductRange }) {
  if (product.specs.length === 0) {
    return (
      <p className="mt-3 text-sm text-warm/70">
        Sizes and carton quantities are on the spec sheet.{" "}
        <SpecSheetLink slug={product.slug} />
      </p>
    );
  }

  const hasCartons = product.specs.some((row) => row.carton);
  if (!hasCartons) {
    return (
      <div className="mt-4">
        <ul className="flex flex-wrap gap-2" aria-label={`${product.name} sizes`}>
          {product.specs.map((row) => (
            <li
              key={row.size}
              className="rounded-full border border-line-strong px-3 py-1 text-sm font-medium tabular-nums"
            >
              {row.size}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-warm/70">
          Carton quantities are on the spec sheet.{" "}
          <SpecSheetLink slug={product.slug} />
        </p>
      </div>
    );
  }

  return (
    <table className="mt-4 w-full text-sm">
      <caption className="sr-only">
        {product.name} sizes and carton quantities
      </caption>
      <thead>
        <tr className="border-b border-line text-left font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <th scope="col" className="py-2 pr-4 font-medium">Size</th>
          <th scope="col" className="py-2 font-medium">Carton</th>
        </tr>
      </thead>
      <tbody>
        {product.specs.map((row) => (
          <tr key={row.size} className="border-b border-line/50">
            <td className="py-2 pr-4 font-medium tabular-nums">{row.size}</td>
            <td className="py-2 tabular-nums text-warm/70">{row.carton ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SpecSheetLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/contact?product=${slug}`}
      className="relative z-10 inline-flex min-h-11 items-center font-semibold text-green underline hover:no-underline"
    >
      Request the spec sheet
    </Link>
  );
}
