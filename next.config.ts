import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  // 301 map for every page URL on the old WordPress site (from its Yoast
  // page-sitemap, captured 2026-07). /faq and /contact keep their paths.
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-story", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/gallery", destination: "/about", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      // Unpublished until sizes and carton quantities are confirmed
      { source: "/products/fresh-frozen", destination: "/products", permanent: false },
      // Ranges TJ's no longer offers
      { source: "/products/gluten-free", destination: "/products", permanent: false },
      { source: "/products/traditional-pizza-bases", destination: "/products", permanent: false },
      { source: "/retail", destination: "/home-cooks", permanent: true },
      {
        source: "/sizes-and-uses",
        destination: "/products/frozen-dough-balls",
        permanent: true,
      },
      {
        source: "/dough-balls",
        destination: "/products/frozen-dough-balls",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
