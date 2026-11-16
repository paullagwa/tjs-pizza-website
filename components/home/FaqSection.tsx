import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content/faq";

export default function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="container-read">
        <p className="text-center eyebrow">
          FAQ
        </p>
        <h2 className="h-section mt-3 text-center">
          Common questions
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-line bg-bg2 open:border-green/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-base">{faq.question}</h3>
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
      </div>
    </section>
  );
}
