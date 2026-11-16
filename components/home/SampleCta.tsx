import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JEFF } from "@/lib/content/business";

const steps = [
  { title: "Take a box", body: "Tell us where you are and what you cook on. We send samples to try." },
  { title: "Run a service", body: "Put it up against your current dough in your own oven, on a real night." },
  { title: "Get a price", body: "From your distributor by order code, or from Jeff if you buy direct. No lock-in." },
  { title: "First delivery", body: "Through PFD Food Services, MOCO or Bidfood, or direct from Warnervale." },
];

/** The loudest block on the page: the four-step switch, then the offer. */
export default function SampleCta() {
  return (
    <section id="sample" className="bg-green-deep text-white">
      <div className="container-site py-24 sm:py-28">
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.18em] text-white/75">
          Switching is easy
        </p>
        <h2 className="h-display mt-4 max-w-[14ch] lg:text-[clamp(3.5rem,6vw,6rem)]">
          Don&rsquo;t take our word for it. <em>Take a box.</em>
        </h2>

        <ol className="reveal-stagger mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-white/40 pt-5">
              <p className="font-display text-4xl font-bold italic text-white/60">{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/85">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Link
            href="/contact?intent=sample"
            className="btn-flour btn-lg"
          >
            Get a free sample box
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
          <p className="text-white/85">
            or ring Jeff on{" "}
            <a href={JEFF.href} className="inline-flex min-h-11 items-center font-display text-3xl font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              {JEFF.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
