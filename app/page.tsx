import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProductsSection from "@/components/home/ProductsSection";
import WhySection from "@/components/home/WhySection";
import StorySection from "@/components/home/StorySection";
import TeamSection from "@/components/home/TeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SampleCta from "@/components/home/SampleCta";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <TrustBar />
        <ProductsSection />
        <WhySection />
        <StorySection />
        <TeamSection />
        <TestimonialsSection />
        <SampleCta />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
