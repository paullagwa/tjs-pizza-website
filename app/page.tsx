import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/home/ContactSection";
import CustomDough from "@/components/home/CustomDough";
import FaqSection from "@/components/home/FaqSection";
import FlagshipPanel from "@/components/home/FlagshipPanel";
import GallerySection from "@/components/home/GallerySection";
import FounderTeaser from "@/components/home/FounderTeaser";
import Hero from "@/components/home/Hero";
import RangeSection from "@/components/home/RangeSection";
import SampleCta from "@/components/home/SampleCta";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhySection from "@/components/home/WhySection";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <FlagshipPanel />
        <RangeSection />
        <GallerySection />
        <WhySection />
        <TestimonialsSection />
        <SampleCta />
        <CustomDough />
        <FounderTeaser />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
