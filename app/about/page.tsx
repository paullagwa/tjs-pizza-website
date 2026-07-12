import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StorySection from "@/components/home/StorySection";
import TeamSection from "@/components/home/TeamSection";
import TrustBar from "@/components/home/TrustBar";
import { business } from "@/lib/content/business";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About — Family-Owned Pizza Base Makers Since 2002",
  description:
    "TJ's Pizza Products is a family-owned wholesale pizza base manufacturer in Warnervale, NSW Central Coast. From a service-station pizza outlet in 2002 to a 2000m² HACCP-certified factory supplying kitchens nationally.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | TJ's Pizza Products",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
            About TJ&rsquo;s
          </p>
          {/* GEO pattern: open with the definitive one-sentence answer */}
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.15] sm:text-5xl">
            Australian family-owned pizza base makers.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-warm/75">
            TJ&rsquo;s Pizza Products is a wholesale pizza base and dough ball
            manufacturer in {business.address.locality} on the NSW Central
            Coast. Since {business.foundedYear} we&rsquo;ve supplied{" "}
            {business.customerTypes.slice(0, 4).join(", ").toLowerCase()} and
            more across{" "}
            {business.deliveryRegions.slice(0, -1).join(", ")} — and nationally
            through PFD Food Services. HACCP certified. No artificial
            preservatives, colours or flavours. No soy, no milk products.
            Vegan friendly.
          </p>
        </div>
        <StorySection />
        <TeamSection />
        <TrustBar />
      </main>
      <SiteFooter />
    </>
  );
}
