import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/home/ContactSection";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Wholesale Pricing & Samples",
  description:
    "Talk to TJ's Pizza Products about wholesale pizza bases and dough balls. Call Jeff on 0402 091 718, email, or send an enquiry — we respond within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | TJ's Pizza Products",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
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
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
