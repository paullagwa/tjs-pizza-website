import Link from "next/link";
import { business } from "@/lib/content/business";
import { testimonials } from "@/lib/content/testimonials";

export default function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="py-24">
      <div className="container-site reveal">
        <p className="eyebrow">Word from the pass</p>

        <figure className="mt-8 max-w-4xl">
          <blockquote className="relative font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold italic leading-[1.15] text-balance">
            <span aria-hidden="true" className="absolute -left-[0.55em] text-crust">
              &ldquo;
            </span>
            {featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 font-mono text-sm uppercase tracking-[0.14em] text-muted">
            {featured.name}
            {featured.venue && ` · ${featured.venue}`}
          </figcaption>
        </figure>

        {rest.map((t) => (
          <figure key={t.name} className="mt-12 max-w-2xl border-t border-line pt-8">
            <blockquote className="text-lg leading-relaxed text-warm/85">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {t.name}
              {t.venue && ` · ${t.venue}`}
            </figcaption>
          </figure>
        ))}

        <div className="mt-20 grid items-end gap-8 border-t border-line-strong pt-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Order through your distributor
            </p>
            <p className="mt-2 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-black leading-[1.05]">
              {business.distributors.join(" · ")}
            </p>
            <p className="mt-4 max-w-xl text-warm/75">
              Ask your rep for TJ&rsquo;s by order code, and they&rsquo;ll
              price it for you. Or order direct from our{" "}
              {business.address.locality} factory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products/frozen-dough-balls" className="btn-ghost btn-lg">
              Find your order code
            </Link>
            <Link href="/contact?intent=price" className="btn-ghost btn-lg">
              Order direct
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
