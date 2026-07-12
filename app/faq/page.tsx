import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { faqs } from "@/lib/content/faq";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ — Wholesale Pizza Base Questions Answered",
  description:
    "Minimum orders, shelf life, vegan and gluten free options, national delivery, HACCP certification — answers to the questions commercial kitchens ask TJ's Pizza Products.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | TJ's Pizza Products",
    url: absoluteUrl("/faq"),
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <JsonLd data={faqSchema} />
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]}
        />
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
            FAQ
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Common <em className="text-green">questions</em>
          </h1>
          <p className="mt-4 text-warm/70">
            Everything commercial kitchens ask us about ordering, storage,
            dietary requirements and delivery. Can&rsquo;t find your answer?
            Call Jeff — he picks up.
          </p>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-line bg-bg2 open:border-green/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                  <h2 className="text-base">{faq.question}</h2>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-green transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-warm/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
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
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
