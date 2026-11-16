import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { faqs } from "@/lib/content/faq";

/** Homepage shows the six buying questions; the full list lives on /faq. */
const HOME_QUESTIONS = [0, 5, 1, 8, 4, 9];

export default function FaqSection() {
  const items = HOME_QUESTIONS.map((i) => faqs[i]).filter(Boolean);

  return (
    <section id="faq" className="border-t border-line py-24">
      <div className="container-site reveal grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 className="h-section mt-3">What chefs ask before they switch</h2>
          <Link
            href="/faq"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-green underline hover:no-underline"
          >
            All questions
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-b border-line-strong">
          {items.map((faq) => (
            <details key={faq.question} className="faq group border-t border-line-strong">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-xl font-bold sm:text-2xl">{faq.question}</h3>
                <Plus
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-crust transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-warm/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
