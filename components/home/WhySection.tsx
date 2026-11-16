import { Award, Handshake, Leaf, PiggyBank, Truck, Zap } from "lucide-react";
import SectionEdge from "@/components/SectionEdge";
import { business } from "@/lib/content/business";

export default function WhySection() {
  const years = new Date().getFullYear() - business.foundedYear;

  const pillars = [
    {
      icon: Leaf,
      title: "Clean Ingredients",
      body: "Zero preservatives, artificial colours, or flavours. No soy, no milk products. Real ingredients that make great pizza.",
    },
    {
      icon: Award,
      title: "HACCP Certified",
      body: `Our ${business.factorySize} Warnervale factory exceeds Australian food safety standards. Full batch traceability every time.`,
    },
    {
      icon: PiggyBank,
      title: "Cost Effective",
      body: `Low cost, high profit. Best price-to-quality dough ball in the market — backed by ${years}+ years of loyal kitchens.`,
    },
    {
      icon: Zap,
      title: "Service Ready",
      body: "Pull tomorrow’s dough tonight and it’s ready when you are. Par-baked bases defrost in minutes for the rush.",
    },
    {
      icon: Handshake,
      title: "Family Business",
      body: `100% Australian-owned since ${business.foundedYear}. Jeff and Rhys pick up the phone. Your account matters — not just your order.`,
    },
    {
      icon: Truck,
      title: "National Reach",
      body: "Central Coast NSW roots, national delivery through PFD Food Services and direct. Reliable cold chain nationwide.",
    },
  ];

  return (
    <section id="why" className="theme-flour relative py-24">
      <SectionEdge />
      <div className="container-site reveal">
        <p className="eyebrow">
          Why TJ&rsquo;s
        </p>
        <h2 className="h-section mt-3">
          We don&rsquo;t cut corners.
          <br />
          We cut <em className="text-green">dough</em>
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="border-t border-line-strong pt-5">
              <Icon aria-hidden="true" className="h-6 w-6 text-green" />
              <h3 className="mt-3 font-display text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
