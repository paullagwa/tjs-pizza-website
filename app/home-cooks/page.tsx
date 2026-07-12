import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Flame, Thermometer, Trophy, Users } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompetitionEntryForm from "@/components/CompetitionEntryForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  competition,
  homeCookSteps,
  homeCookTips,
  pdfThawInstructions,
  recipes,
} from "@/lib/content/community";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home Cooks — Recipes, Tips & The DinoBite Challenge",
  description:
    "Cook restaurant-quality pizza at home on TJ's hand-stretched dough balls. Recipes, oven tips for home and wood-fire ovens, and the Great DinoBite Challenge for kids.",
  alternates: { canonical: "/home-cooks" },
  openGraph: {
    title: "Home Cooks | TJ's Pizza Products",
    url: absoluteUrl("/home-cooks"),
  },
};

export default function HomeCooksPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Home Cooks", path: "/home-cooks" },
          ]}
        />

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
            For home cooks
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Restaurant quality. <em className="text-green">Your kitchen.</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-warm/75">
            The same hand-stretched dough balls we supply to Australia&rsquo;s
            best pizza kitchens work just as well on a Friday night at home.
            Here&rsquo;s how to get the most out of them.
          </p>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeCookSteps.map((s) => (
              <li key={s.step} className="rounded-lg border border-line bg-bg2 p-6">
                <p className="font-display text-2xl font-extrabold text-green">
                  {s.step}
                </p>
                <h2 className="mt-2 font-display text-lg font-bold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-warm/70">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-lg border border-line bg-bg2 p-6">
            <h2 className="font-display text-xl font-bold">
              Best-practice thaw (from our product sheet)
            </h2>
            <ul className="mt-3 space-y-2">
              {pdfThawInstructions.map((line) => (
                <li key={line.slice(0, 20)} className="text-sm leading-relaxed text-warm/70">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-line bg-bg2 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Try these <em className="text-green">first</em>
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {recipes.map((r) => (
                <article key={r.title} className="rounded-lg border border-line bg-bg p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-green">
                    {r.tag}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-warm/70">
                    {r.description}
                  </p>
                  <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-warm/65">
                    <div className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden="true" className="h-3.5 w-3.5 text-green" />
                      <dt className="sr-only">Cook time</dt>
                      <dd>{r.time}</dd>
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <Thermometer aria-hidden="true" className="h-3.5 w-3.5 text-green" />
                      <dt className="sr-only">Oven temperature</dt>
                      <dd>{r.temp}</dd>
                    </div>
                    <div className="inline-flex items-center gap-1.5">
                      <Users aria-hidden="true" className="h-3.5 w-3.5 text-green" />
                      <dt className="sr-only">Serves</dt>
                      <dd>{r.serves}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {homeCookTips.map((t) => (
                <div key={t.title} className="rounded-lg border border-line bg-bg p-5">
                  <h3 className="inline-flex items-center gap-2 font-display text-base font-bold">
                    <Flame aria-hidden="true" className="h-4 w-4 text-green" />
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-warm/70">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="competition" className="px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-green">
                <Trophy aria-hidden="true" className="h-4 w-4" />
                {competition.tag}
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                {competition.name}
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-warm/75">
                {competition.blurb}
              </p>
              <dl className="mt-6 space-y-3">
                {competition.prizes.map((p) => (
                  <div
                    key={p.place}
                    className="flex items-center gap-4 rounded-lg border border-line bg-bg2 px-5 py-3.5"
                  >
                    <dt className="font-display text-xl font-extrabold text-green">
                      {p.place}
                    </dt>
                    <dd className="text-sm text-warm/80">{p.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm text-warm/65">
                Grab a{" "}
                <Link href="/products/dinobite-kids" className="text-green underline hover:no-underline">
                  DinoBite kids base
                </Link>{" "}
                to get started.
              </p>
            </div>
            <CompetitionEntryForm />
          </div>
        </section>

        <section className="border-t border-line bg-bg2 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Where to buy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-warm/70">
              TJ&rsquo;s products are supplied wholesale through PFD Food
              Services and direct from our Warnervale factory. Running a cafe,
              venue or canteen?{" "}
              <Link href="/contact" className="text-green underline hover:no-underline">
                Get in touch for wholesale pricing
              </Link>
              . Home cook? Ask your local pizzeria if they stock TJ&rsquo;s —
              or call Jeff on{" "}
              <a href="tel:0402091718" className="text-green underline hover:no-underline">
                0402 091 718
              </a>{" "}
              to find the closest place to buy.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
