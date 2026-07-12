import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { business } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";
import { absoluteUrl, organizationId } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return productRanges.map((p) => ({ slug: p.slug }));
}

function getProduct(slug: string) {
  return productRanges.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.name} — Wholesale`;
  const description = product.description.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/products/${product.slug}`),
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = productRanges.filter((p) => p.slug !== product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@id": organizationId },
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      eligibleCustomerType: "http://purl.org/goodrelations/v1#Business",
      seller: { "@id": organizationId },
    },
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <JsonLd data={productSchema} />
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Products", path: "/#products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]}
        />

        <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
            {product.tagline}
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-warm/75">
            {product.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {product.dietary.map((d) => (
              <li key={d} className="inline-flex items-center gap-1.5 text-sm text-warm/70">
                <Check aria-hidden="true" className="h-4 w-4 text-green" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              {product.specs.length > 0 ? (
                <div className="rounded-lg border border-line bg-bg2 p-6">
                  <h2 className="font-display text-xl font-bold">
                    Sizes &amp; carton quantities
                  </h2>
                  <table className="mt-4 w-full text-sm">
                    <thead>
                      <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        <th scope="col" className="py-2 pr-4 font-medium">Size</th>
                        <th scope="col" className="py-2 font-medium">Carton</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specs.map((row) => (
                        <tr key={row.size} className="border-b border-line/50">
                          <td className="py-2 pr-4 font-medium tabular-nums">{row.size}</td>
                          <td className="py-2 tabular-nums text-warm/70">{row.carton}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {product.shelfLife && (
                    <p className="mt-4 text-sm text-warm/65">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                        Shelf life:{" "}
                      </span>
                      {product.shelfLife}
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-lg border border-line bg-bg2 p-6">
                  <h2 className="font-display text-xl font-bold">
                    Sizes &amp; carton quantities
                  </h2>
                  <p className="mt-3 text-sm text-warm/70">
                    Contact us for current sizes, carton quantities and
                    pricing — Jeff will have numbers for you same-day.
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-lg border border-line bg-bg2 p-6">
                <h2 className="font-display text-xl font-bold">
                  Get wholesale pricing
                </h2>
                <p className="mt-2 text-sm text-warm/70">
                  Available through PFD Food Services nationally or direct
                  from our {business.address.locality} factory.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="tel:0402091718"
                    className="inline-flex items-center gap-2 rounded-md bg-green-deep px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    Call Jeff — 0402 091 718
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-warm hover:border-green"
                  >
                    Send an enquiry
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {product.image && (
              <Image
                src={product.image}
                alt={product.imageAlt ?? product.name}
                width={800}
                height={600}
                priority
                className="h-full max-h-[26rem] w-full rounded-lg object-cover"
              />
            )}
          </div>

          <nav aria-label="Other product ranges" className="mt-16">
            <h2 className="font-display text-2xl font-bold">
              Explore the rest of the range
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-bg2 px-5 py-4 transition-colors hover:border-green"
                  >
                    <span className="text-sm font-semibold">{p.name}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-green transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
