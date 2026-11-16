import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ContactSection, {
  type ContactIntent,
} from "@/components/home/ContactSection";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact — Wholesale Pricing & Samples",
  description:
    "Talk to TJ's Pizza Products about wholesale pizza bases and dough balls. Call Jeff on 0402 091 718, email, or request a sample box — we respond within one business day.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; product?: string; size?: string }>;
}) {
  const { intent, product, size } = await searchParams;
  const safeIntent: ContactIntent | undefined =
    intent === "sample" || intent === "bespoke" || intent === "price"
      ? intent
      : product
        ? "price"
        : undefined;
  const safeSize = size && /^[\w .]{1,12}$/.test(size) ? size : undefined;

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <ContactSection
          headingLevel="h1"
          intent={safeIntent}
          product={product}
          size={safeSize}
        />
      </main>
      <SiteFooter />
    </>
  );
}
