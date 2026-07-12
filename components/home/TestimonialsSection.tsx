import { Quote, Truck } from "lucide-react";
import { business } from "@/lib/content/business";
import { testimonials } from "@/lib/content/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
          Kitchens that trust us
        </p>
        <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          Word from the <em className="text-green">pass</em>
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-lg border border-line bg-bg2 p-6"
            >
              <Quote aria-hidden="true" className="h-5 w-5 text-green" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-warm/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                {t.venue && <span className="text-warm/65"> — {t.venue}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-lg border border-line bg-bg2 p-6 sm:flex-row sm:items-center">
          <div className="rounded-md bg-green-deep p-3">
            <Truck aria-hidden="true" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold">
              Distributed nationally by PFD Food Services
            </h3>
            <p className="mt-1 text-sm text-warm/70">
              Order TJ&rsquo;s through your PFD rep anywhere in Australia, or
              buy direct from our {business.address.locality} factory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
