import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { business, JEFF } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

export default function Hero() {
  const years = new Date().getFullYear() - business.foundedYear;
  const sizes = productRanges.find((p) => p.flagship)?.specs ?? [];

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
    <section
      data-hero
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden"
    >
      {/* The Toss: dough in mid-air on black, dissolving into the page */}
      <div className="absolute inset-0 -z-10 lg:left-[32%]">
        <Image
          src="/images/TJs-Pizza-Products-11.jpg"
          alt="Pizza dough tossed in the air above a pair of hands, flour bursting off it"
          fill
          priority
          sizes="(min-width: 1024px) 68vw, 100vw"
          className="hero-settle object-cover object-[50%_40%] opacity-55 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60" />
      </div>

      <div className="container-site pb-10 pt-20">
        <p className="eyebrow hero-rise">
          Warnervale NSW · Since {business.foundedYear}
        </p>

        <h1 className="h-display hero-rise mt-6 max-w-[11ch] [animation-delay:90ms] lg:text-[clamp(4rem,6.6vw,6.75rem)]">
          Hand-stretched dough balls for{" "}
          <em className="text-green">Australia&rsquo;s pizza kitchens.</em>
        </h1>

        <p className="lead hero-rise mt-7 max-w-md text-warm/85 [animation-delay:180ms]">
          {sizes.length} sizes, six ingredients, no preservatives. Made on the
          Central Coast and delivered nationally, direct or through your
          distributor.
        </p>

        <div className="hero-rise mt-9 flex flex-wrap gap-3 [animation-delay:270ms]">
          <Link href="/contact?intent=sample" className="btn-primary btn-lg">
            Get a free sample box
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <a href={JEFF.href} className="btn-ghost btn-lg bg-bg/40 backdrop-blur-sm">
            <Phone aria-hidden="true" className="h-4 w-4" />
            Call Jeff {JEFF.display}
          </a>
        </div>
        <p className="hero-rise mt-4 text-sm text-warm/75 [animation-delay:330ms]">
          Cooking at home?{" "}
          <Link
            href="/home-cooks"
            className="inline-flex min-h-11 items-center font-semibold text-green underline hover:no-underline"
          >
            Start here
          </Link>
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line-strong pt-7 sm:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label} className="flex flex-col-reverse">
              <dt className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {p.label}
              </dt>
              <dd className="font-display text-4xl font-black tabular-nums lining-nums text-crust sm:text-5xl">
                {p.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
