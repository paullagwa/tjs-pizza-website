import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ProductsSection from "@/components/home/ProductsSection";
import SampleCta from "@/components/home/SampleCta";
import { productRanges } from "@/lib/content/products";
import { absoluteUrl, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Wholesale Pizza Bases & Dough Balls — The Range",
  description:
    "The full TJ's range: hand-stretched frozen dough balls in 17 sizes, gluten free recipe bases, garlic butter & cheese, square slabs and DinoBite kids bases.",
  path: "/products",
});

export default function ProductsPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TJ's Pizza Products range",
    itemListElement: productRanges.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: absoluteUrl(`/products/${p.slug}`),
    })),
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <JsonLd data={itemList} />
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]}
        />
        <ProductsSection headingLevel="h1" />
        <SampleCta />
      </main>
      <SiteFooter />
    </>
  );
}
