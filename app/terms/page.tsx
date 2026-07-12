import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Website terms of use and competition terms for TJ's Pizza Products.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "13 July 2026";

export default function TermsPage() {
  const primaryEmail = business.emails.find((e) => e.primary)!;
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]}
        />
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="font-display text-4xl font-extrabold">Terms of Use</h1>
          <p className="mt-2 text-sm text-warm/65">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-warm/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                Using this website
              </h2>
              <p className="mt-3">
                This website is operated by {business.legalName}. Product
                information, sizes and carton quantities are indicative and may
                change — confirm current specifications and pricing with us
                before ordering. Nothing on this site is an offer capable of
                acceptance without our confirmation; wholesale supply is subject
                to our standard trading terms provided at account setup.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                Competition terms
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Open to Australian residents only.</li>
                <li>
                  Entries must be submitted by a parent or guardian aged 18 or
                  over. By entering, you confirm you are the child&rsquo;s parent
                  or legal guardian.
                </li>
                <li>
                  By submitting a photo you grant TJ&rsquo;s permission to
                  republish it on our social media channels with credit to the
                  first name provided. You can withdraw this permission at any
                  time (see our{" "}
                  <a href="/privacy" className="text-green underline">
                    Privacy Policy
                  </a>
                  ) and we will remove the photo.
                </li>
                <li>
                  Only submit photos you took yourself and have the right to
                  share.
                </li>
                <li>
                  Winners are chosen by the TJ&rsquo;s team on creativity;
                  judging decisions are final. Winners are notified by email.
                </li>
                <li>
                  Prizes are as described on the competition page, are not
                  transferable and cannot be exchanged for cash.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                Forno chat assistant
              </h2>
              <p className="mt-3">
                Forno is an AI assistant. Its answers are general guidance
                only — always follow the storage and preparation instructions on
                product packaging. For anything that matters, call us on{" "}
                {business.phones[0].display}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                Liability
              </h2>
              <p className="mt-3">
                To the extent permitted by law, including the Australian Consumer
                Law, we exclude liability for loss arising from reliance on
                website content. Nothing in these terms excludes rights that
                cannot be excluded under Australian law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">Contact</h2>
              <p className="mt-3">
                Questions about these terms:{" "}
                <a href={`mailto:${primaryEmail.address}`} className="text-green underline">
                  {primaryEmail.address}
                </a>{" "}
                or {business.phones[0].display}.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
