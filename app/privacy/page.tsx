import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { business } from "@/lib/content/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TJ's Pizza Products collects, uses and protects personal information — including competition entries involving children.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "13 July 2026";

export default function PrivacyPage() {
  const primaryEmail = business.emails.find((e) => e.primary)!;
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]}
        />
        <article className="prose-invert mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h1 className="font-display text-4xl font-extrabold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-warm/65">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-warm/80">
            <section>
              <h2 className="font-display text-2xl font-bold text-warm">Who we are</h2>
              <p className="mt-3">
                {business.legalName} (&ldquo;TJ&rsquo;s&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;) is a wholesale pizza base manufacturer at{" "}
                {business.address.street}, {business.address.locality}{" "}
                {business.address.region} {business.address.postcode}, Australia.
                This policy explains how we handle personal information collected
                through this website in accordance with the Australian Privacy
                Principles in the Privacy Act 1988 (Cth).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                What we collect
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong>Wholesale enquiries:</strong> your name, business name,
                  phone number, email address and any message you send us. We use
                  these solely to respond to your enquiry and set up supply.
                </li>
                <li>
                  <strong>Competition entries:</strong> the entering adult&rsquo;s
                  name and email address, the entrant child&rsquo;s first name and
                  age as provided by their parent or guardian, and a photo of the
                  pizza. See &ldquo;Children&rsquo;s information&rdquo; below.
                </li>
                <li>
                  <strong>Forno chat:</strong> messages you type to our pizza
                  assistant are processed by Anthropic&rsquo;s Claude API to
                  generate a reply. Don&rsquo;t include personal or sensitive
                  information in chat messages. Chat transcripts are stored only
                  in your own browser for the duration of your visit.
                </li>
              </ul>
              <p className="mt-3">
                This site does not use advertising cookies or cross-site
                tracking.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                Children&rsquo;s information
              </h2>
              <p className="mt-3">
                Our kids&rsquo; competitions are entered by a parent or guardian —
                never directly by a child. We only collect what the parent
                submits: the child&rsquo;s first name, age and the pizza photo.
                Photos may include the child if the parent chooses to submit one.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  We only use competition photos on our social media where the
                  submitting parent has agreed to this at entry.
                </li>
                <li>
                  A parent or guardian can withdraw consent at any time by
                  emailing{" "}
                  <a href={`mailto:${primaryEmail.address}`} className="text-green underline">
                    {primaryEmail.address}
                  </a>{" "}
                  — we will remove the photo from our channels and delete the
                  entry.
                </li>
                <li>
                  We never sell, license or share children&rsquo;s information
                  with third parties for marketing.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                How information is stored and shared
              </h2>
              <p className="mt-3">
                Form submissions are delivered to our business inbox via Resend
                (our email provider) and stored in our email system. Our website
                is hosted on Vercel. Chat messages are processed by Anthropic.
                These providers process data on our behalf and are not permitted
                to use it for their own purposes. We do not sell personal
                information to anyone.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-warm">
                Access, correction and deletion
              </h2>
              <p className="mt-3">
                Email{" "}
                <a href={`mailto:${primaryEmail.address}`} className="text-green underline">
                  {primaryEmail.address}
                </a>{" "}
                or call {business.phones[0].display} to access, correct or delete
                the personal information we hold about you. We respond within a
                reasonable period. If you have a privacy concern we can&rsquo;t
                resolve, you can contact the Office of the Australian Information
                Commissioner (oaic.gov.au).
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
