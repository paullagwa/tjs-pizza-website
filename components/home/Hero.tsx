import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, House } from "lucide-react";
import { business } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

export default function Hero() {
  const years = new Date().getFullYear() - business.foundedYear;

  return (
    <section className="px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-green">
          Wood fire ready · PFD Food Services · NSW Central Coast · National
          delivery
        </p>

        <h1 className="mx-auto mt-6 max-w-3xl text-center font-display text-4xl font-extrabold leading-[1.1] sm:text-6xl">
          The base behind{" "}
          <em className="text-green">Australia&rsquo;s best</em> pizza
          kitchens.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-warm/75">
          Hand-stretched dough balls. No preservatives. No shortcuts. For
          commercial kitchens, food trucks — and Friday nights at home.
        </p>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Who are you cooking for?
        </p>
        <div className="mx-auto mt-4 grid max-w-xl gap-4 sm:grid-cols-2">
          <Link
            href="/#contact"
            className="group rounded-lg border border-line bg-bg2 p-6 text-center transition-colors hover:border-green"
          >
            <ChefHat aria-hidden="true" className="mx-auto h-7 w-7 text-green" />
            <p className="mt-3 font-display text-xl font-bold">I run a venue</p>
            <p className="mt-1 text-sm text-warm/65">
              Restaurants, food trucks, pubs &amp; clubs
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
              Get in touch
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
          <Link
            href="/home-cooks"
            className="group rounded-lg border border-line bg-bg2 p-6 text-center transition-colors hover:border-green"
          >
            <House aria-hidden="true" className="mx-auto h-7 w-7 text-green" />
            <p className="mt-3 font-display text-xl font-bold">I cook at home</p>
            <p className="mt-1 text-sm text-warm/65">
              Recipes, tips &amp; where to buy
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green">
              Explore
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <Image
            src="/images/TJs-Pizza-Products-16-scaled.jpg"
            alt="A floured TJ's dough ball with fresh mozzarella, basil and olive oil"
            width={800}
            height={600}
            priority
            className="h-52 w-full rounded-lg object-cover"
          />
          <Image
            src="/images/TJs-Pizza-Products-1.jpg"
            alt="Pizza dough with a rolling pin, vine tomatoes and basil"
            width={800}
            height={600}
            priority
            className="h-52 w-full rounded-lg object-cover"
          />
          <Image
            src="/images/TJs-Pizza-Products-2.jpg"
            alt="A golden calzone made on TJ's dough, fresh out of the oven"
            width={800}
            height={600}
            priority
            className="h-52 w-full rounded-lg object-cover"
          />
        </div>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 rounded-lg border border-line bg-bg2 px-6 py-7 text-center sm:grid-cols-4">
          <div>
            <dt className="sr-only">Commercial customers</dt>
            <dd className="font-display text-3xl font-extrabold">{business.customerCount}</dd>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Commercial customers
            </dd>
          </div>
          <div>
            <dt className="sr-only">Years in business</dt>
            <dd className="font-display text-3xl font-extrabold">{years}yrs</dd>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Australian family owned
            </dd>
          </div>
          <div>
            <dt className="sr-only">Product ranges</dt>
            <dd className="font-display text-3xl font-extrabold">{productRanges.length}</dd>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Product ranges
            </dd>
          </div>
          <div>
            <dt className="sr-only">Freshness</dt>
            <dd className="font-display text-3xl font-extrabold">Fresh</dd>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Frozen at peak quality
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
