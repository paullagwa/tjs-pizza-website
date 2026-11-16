import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/lib/content/business";
import { timeline } from "@/lib/content/story";

export default function FounderTeaser() {
  const picks = ["2002", "2010", "Today"];
  const milestones = timeline.filter((t) => picks.includes(t.period));

  return (
    <section id="story" className="border-t border-line py-24">
      <div className="container-site reveal grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="h-section mt-3">
            Started in a servo. Now in {business.customerCount.replace("+", "")} kitchens.
          </h2>
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-green underline hover:no-underline"
          >
            Read the whole story
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ol className="reveal-stagger">
          {milestones.map((m) => (
            <li key={m.period} className="grid gap-x-8 gap-y-1 border-t border-line-strong py-7 sm:grid-cols-[9rem_1fr]">
              <p className="font-display text-5xl font-black italic leading-none text-crust">
                {m.period}
              </p>
              <div>
                <h3 className="font-display text-2xl font-bold">{m.title}</h3>
                <p className="mt-2 text-warm/75">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
