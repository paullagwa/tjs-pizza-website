import Link from "next/link";
import { DISTRIBUTORS, type ProductRange } from "@/lib/content/types";

/**
 * Sizes, carton quantities and order codes for a range. Columns only render
 * when the range has data for them, and a missing value says so in words —
 * the page never prints a bare dash where a number should be.
 */
export default function SpecTable({ product }: { product: ProductRange }) {
  if (product.specs.length === 0) {
    return (
      <p className="mt-3 text-sm text-warm/75">
        Sizes and carton quantities are on the spec sheet.{" "}
        <SpecSheetLink slug={product.slug} />
      </p>
    );
  }

  const hasCartons = product.specs.some((row) => row.carton);
  const hasSku = product.specs.some((row) => row.sku);
  const distributors = DISTRIBUTORS.filter((d) =>
    product.specs.some((row) => row.codes?.[d]),
  );

  if (!hasCartons && distributors.length === 0) {
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
        <p className="mt-3 text-sm text-warm/75">
          Carton quantities are on the spec sheet.{" "}
          <SpecSheetLink slug={product.slug} />
        </p>
      </div>
    );
  }

  const th = "py-2 pr-4 font-medium whitespace-nowrap";
  const td = "py-2 pr-4 tabular-nums whitespace-nowrap";
  const none = <span className="text-warm/50">on request</span>;

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">
          {product.name}: sizes, carton quantities and distributor order codes
        </caption>
        <thead>
          <tr className="border-b border-line-strong text-left font-mono text-xs uppercase tracking-[0.12em] text-muted">
            <th scope="col" className={th}>Size</th>
            <th scope="col" className={th}>Carton</th>
            {hasSku && <th scope="col" className={th}>TJ&rsquo;s code</th>}
            {distributors.map((d) => (
              <th key={d} scope="col" className={th}>{d} code</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {product.specs.map((row, i) => (
            <tr key={`${row.size}-${i}`} className="border-b border-line">
              <th scope="row" className={`${td} text-left font-semibold`}>{row.size}</th>
              <td className={`${td} text-warm/80`}>{row.carton ?? none}</td>
              {hasSku && <td className={`${td} font-mono text-warm/80`}>{row.sku ?? ""}</td>}
              {distributors.map((d) => (
                <td key={d} className={`${td} font-mono text-warm/80`}>
                  {row.codes?.[d] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {distributors.length > 0 && (
        <p className="mt-3 text-xs text-warm/70">
          Quote the code for your distributor when you order. Carton
          quantities are the same across distributors.
        </p>
      )}
    </div>
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
