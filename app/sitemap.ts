import type { MetadataRoute } from "next";
import { productRanges } from "@/lib/content/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${SITE_URL}/faq`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, priority: 0.9, changeFrequency: "yearly" },
    { url: `${SITE_URL}/home-cooks`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE_URL}/privacy`, priority: 0.2, changeFrequency: "yearly" },
    { url: `${SITE_URL}/terms`, priority: 0.2, changeFrequency: "yearly" },
  ];

  const productRoutes: MetadataRoute.Sitemap = productRanges.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    priority: p.flagship ? 0.9 : 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...productRoutes];
}
