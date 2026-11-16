import SectionEdge from "@/components/SectionEdge";
import { business } from "@/lib/content/business";

export default function WhySection() {
  const outcomes = [
    {
      title: "No dough prep",
      body: "No mixing, proving or balling before service. Pull tomorrow’s dough tonight and it’s ready when you are.",
    },
    {
      title: "Six ingredients",
      body: `${business.ingredients}. No preservatives, no soy, no milk products.`,
    },
    {
      title: `A ${business.factorySize} HACCP factory`,
      body: "Made in Warnervale on the Central Coast, with batch traceability on every carton.",
    },
    {
      title: "A person, not a portal",
      body: `Jeff and Rhys pick up the phone. Australian family-owned since ${business.foundedYear}.`,
    },
  ];

  return (
    <section id="why" className="theme-flour relative py-24">
      <SectionEdge />
      <div className="container-site reveal">
        <p className="eyebrow">Why kitchens switch</p>
        <h2 className="h-section mt-3">
          We don&rsquo;t cut corners.
          <br />
          We cut <em className="text-green">dough.</em>
        </h2>

        <div className="reveal-stagger mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <div key={o.title} className="border-t-2 border-ink pt-5">
              <h3 className="font-display text-2xl font-bold leading-tight">{o.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-warm/80">{o.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
