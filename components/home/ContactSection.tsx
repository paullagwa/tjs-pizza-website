"use client";

import { useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import SectionEdge from "@/components/SectionEdge";
import { business, JEFF, publicEmail, QLD } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

type Status = "idle" | "sending" | "success" | "error";
export type ContactIntent = "sample" | "price" | "bespoke";

const INTENTS: Array<{ id: ContactIntent; label: string }> = [
  { id: "sample", label: "Sample box" },
  { id: "price", label: "A price" },
  { id: "bespoke", label: "Custom recipe" },
];

const COPY: Record<
  ContactIntent,
  { title: string; intro: string; button: string; subject: string; messageLabel: string }
> = {
  sample: {
    title: "Get your sample box",
    intro:
      "Put TJ's up against your current supplier in your own oven. Tell us where you are and what you cook on, and Jeff will ring to confirm what goes in the box and when it ships.",
    button: "Send my sample box",
    subject: "Sample box request",
    messageLabel: "Anything we should know? (optional)",
  },
  price: {
    title: "Get a price",
    intro:
      "Tell us what you use and roughly how much. Jeff will sort a direct price, or point you to the order code for your distributor.",
    button: "Send it to Jeff",
    subject: "Pricing enquiry",
    messageLabel: "Sizes and rough weekly volume (optional)",
  },
  bespoke: {
    title: "Talk to us about your recipe",
    intro:
      "Tell us the style, weight and volume you have in mind. Rhys develops bespoke dough under a confidentiality agreement.",
    button: "Send it to Rhys",
    subject: "Bespoke recipe enquiry",
    messageLabel: "Style, weight and volume you have in mind",
  },
};

const label = "block font-mono text-xs uppercase tracking-[0.12em] text-muted";

export default function ContactSection({
  headingLevel = "h2",
  intent: initialIntent,
  product,
  size,
}: {
  headingLevel?: "h1" | "h2";
  intent?: ContactIntent;
  /** product slug to preselect in the range dropdown */
  product?: string;
  /** e.g. "270g" — carried over from the dough ball sizer */
  size?: string;
}) {
  const [intent, setIntent] = useState<ContactIntent>(initialIntent ?? "sample");
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const Heading = headingLevel;
  const copy = COPY[intent];
  const preselected = productRanges.find((p) => p.slug === product)?.name ?? "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          business: data.get("business"),
          phone: data.get("phone"),
          email: data.get("email"),
          product: data.get("product"),
          message: [
            `[${copy.subject}]`,
            data.get("suburb") && `Delivery suburb/postcode: ${data.get("suburb")}`,
            data.get("oven") && `Oven: ${data.get("oven")}`,
            data.get("message"),
          ]
            .filter(Boolean)
            .join("\n"),
          website: data.get("website"), // honeypot
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
      setStatus("success");
    } catch {
      setStatus("error");
    }
    statusRef.current?.focus();
  }

  return (
    <section id="contact" className="theme-flour relative py-24">
      <SectionEdge />
      <div className="container-site grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">NSW &amp; national · Ring Jeff. He&rsquo;ll pick up.</p>
          <a
            href={JEFF.href}
            className="mt-3 inline-flex min-h-11 items-center font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tight hover:text-green"
          >
            {JEFF.display}
          </a>
          <dl className="mt-8 grid gap-6 border-t border-line-strong pt-7">
            <div>
              <dt className={label}>Queensland · {QLD.name}, {QLD.role}</dt>
              <dd>
                <a href={QLD.href} className="inline-flex min-h-11 items-center font-display text-3xl font-bold hover:text-green">
                  {QLD.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Factory landline</dt>
              <dd>
                <a href="tel:+61243940176" className="inline-flex min-h-11 items-center text-lg font-semibold hover:text-green">
                  (02) 4394 0176
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Email</dt>
              <dd>
                <a href={`mailto:${publicEmail}`} className="inline-flex min-h-11 items-center break-all text-lg font-semibold hover:text-green">
                  {publicEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Factory</dt>
              <dd className="mt-2 text-lg font-semibold">{business.address.display}</dd>
            </div>
          </dl>
          <p className="mt-8 max-w-sm text-sm text-warm/75">
            Already buy through PFD Food Services, MOCO or Bidfood? Ask your
            rep for TJ&rsquo;s.
          </p>
        </div>

        <div
          data-contact-form
          className="order-1 border-t-4 border-ink bg-white/35 p-6 shadow-[0_30px_60px_-40px_rgba(27,22,13,0.5)] sm:p-9 lg:order-2"
        >
          <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
            {status === "success" && (
              <div className="py-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-deep">
                  <Check aria-hidden="true" className="h-7 w-7 text-white" />
                </span>
                <Heading className="h-page mt-6 text-[clamp(2rem,4vw,3rem)]">
                  Got it{firstName ? `, ${firstName}` : ""}.
                </Heading>
                <p className="lead mt-4 max-w-md text-warm/85">
                  Jeff will ring you from {JEFF.display} within one business
                  day. Save the number so you know it&rsquo;s him.
                </p>
              </div>
            )}
            {status === "error" && (
              <p className="mb-6 border-l-4 border-[#a3321a] bg-[#a3321a]/10 px-4 py-3 text-sm">
                That didn&rsquo;t send. Try again, or ring Jeff on{" "}
                <a href={JEFF.href} className="font-semibold underline">
                  {JEFF.display}
                </a>
                .
              </p>
            )}
          </div>

          {status !== "success" && (
            <form onSubmit={onSubmit} className="grid gap-7">
              <div>
                <p className="eyebrow">Order docket</p>
                <Heading className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-tight">
                  {copy.title}
                </Heading>
                <p className="mt-4 max-w-xl text-warm/80">{copy.intro}</p>
              </div>

              <fieldset>
                <legend className={label}>I&rsquo;m after</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INTENTS.map((i) => (
                    <label
                      key={i.id}
                      className="cursor-pointer rounded-full border border-line-strong px-4 py-2.5 text-sm font-semibold transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-flour has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green"
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={i.id}
                        checked={intent === i.id}
                        onChange={() => setIntent(i.id)}
                        className="sr-only"
                      />
                      {i.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={label}>
                    Your name <span aria-hidden="true">*</span>
                  </label>
                  <input id="cf-name" name="name" type="text" required autoComplete="name" className="docket-field" />
                </div>
                <div>
                  <label htmlFor="cf-business" className={label}>
                    Business name <span aria-hidden="true">*</span>
                  </label>
                  <input id="cf-business" name="business" type="text" required autoComplete="organization" className="docket-field" />
                </div>
                <div>
                  <label htmlFor="cf-phone" className={label}>
                    Mobile <span aria-hidden="true">*</span>
                  </label>
                  <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" aria-describedby="cf-phone-hint" className="docket-field" />
                  <p id="cf-phone-hint" className="mt-1.5 text-xs text-warm/70">
                    Jeff will call or text you back.
                  </p>
                </div>
                <div>
                  <label htmlFor="cf-email" className={label}>
                    Email (optional)
                  </label>
                  <input id="cf-email" name="email" type="email" autoComplete="email" className="docket-field" />
                </div>
                {intent === "sample" && (
                  <>
                    <div>
                      <label htmlFor="cf-suburb" className={label}>
                        Delivery suburb &amp; postcode <span aria-hidden="true">*</span>
                      </label>
                      <input id="cf-suburb" name="suburb" type="text" required autoComplete="address-level2" className="docket-field" />
                    </div>
                    <div>
                      <label htmlFor="cf-oven" className={label}>
                        What do you cook on?
                      </label>
                      <select id="cf-oven" name="oven" defaultValue="" className="docket-field">
                        <option value="">Choose an oven (optional)</option>
                        <option>Wood fire</option>
                        <option>Gas deck</option>
                        <option>Electric deck</option>
                        <option>Conveyor</option>
                        <option>Combi or other</option>
                      </select>
                    </div>
                  </>
                )}
                <div className="sm:col-span-2">
                  <label htmlFor="cf-product" className={label}>
                    Which range?
                  </label>
                  <select id="cf-product" name="product" defaultValue={preselected} className="docket-field">
                    <option value="">Choose a range (optional)</option>
                    {productRanges.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Full range">The full range</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cf-message" className={label}>
                    {copy.messageLabel}
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={3}
                    defaultValue={size ? `Size: ${size}` : ""}
                    className="docket-field resize-y"
                  />
                </div>
              </div>

              {/* Honeypot — hidden from real users, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="cf-website">Website</label>
                <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="btn-primary btn-lg w-full sm:w-auto sm:min-w-64"
                >
                  {status === "sending" && (
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  )}
                  {status === "sending" ? "Sending" : copy.button}
                </button>
                <p className="mt-3 text-sm text-warm/75">
                  No spam. No lock-in. A reply within one business day.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
