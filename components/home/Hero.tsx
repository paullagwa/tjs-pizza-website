import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { business, JEFF } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

export default function Hero() {
  const years = new Date().getFullYear() - business.foundedYear;
  const doughBalls = productRanges.find((p) => p.flagship);
  const sizes = doughBalls?.specs ?? [];

  const proof = [
    { value: business.customerCount, label: "Kitchens supplied" },
    { value: String(years), label: "Years, one family" },
    { value: business.factorySize, label: "HACCP-certified factory" },
    {
      value: String(sizes.length),
      label: `Dough ball sizes, ${sizes[0]?.size} to ${sizes.at(-1)?.size}`,
    },
  ];

  return (
    <section className="px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
          Warnervale NSW · Since {business.foundedYear}
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-5xl font-black leading-[1.02] text-balance sm:text-7xl">
          Hand-stretched dough balls for{" "}
          <em className="font-bold text-green">Australia&rsquo;s pizza kitchens.</em>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-warm/80">
          Nine sizes, six ingredients, no preservatives. Made on the Central
          Coast and delivered nationally, direct or through PFD Food Services.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/contact?intent=sample"
            className="btn-primary"
          >
            Get a free sample box
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <a href={JEFF.href} className="btn-ghost">
            <Phone aria-hidden="true" className="h-4 w-4" />
            Call Jeff {JEFF.display}
          </a>
        </div>
        <p className="mt-5 text-sm text-warm/70">
          Cooking at home?{" "}
          <Link
            href="/home-cooks"
            className="inline-flex min-h-11 items-center font-semibold text-green underline hover:no-underline"
          >
            Start here
          </Link>
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-strong pt-8 sm:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label} className="flex flex-col-reverse">
              <dt className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {p.label}
              </dt>
              <dd className="font-display text-4xl font-black tabular-nums lining-nums">
                {p.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
