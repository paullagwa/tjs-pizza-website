"use client";

import { useRef, useState } from "react";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { business, JEFF, publicEmail } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

type Status = "idle" | "sending" | "success" | "error";

export type ContactIntent = "sample" | "bespoke" | undefined;

const COPY = {
  sample: {
    eyebrow: "Sample box",
    title: "Get your sample box",
    intro:
      "Put TJ's up against your current supplier in your own oven. Tell us where you are and what you cook on, and Jeff will ring to confirm what goes in the box and when it ships.",
    formTitle: "Where should we send it?",
    button: "Send my sample box",
    subject: "Sample box request",
  },
  bespoke: {
    eyebrow: "Custom dough",
    title: "Talk to us about your recipe",
    intro:
      "Tell us the style, weight and volume you have in mind. Rhys develops bespoke dough under a confidentiality agreement.",
    formTitle: "Tell us about your dough",
    button: "Send it to Rhys",
    subject: "Bespoke recipe enquiry",
  },
  general: {
    eyebrow: "Get in touch",
    title: "Get a price or a sample box",
    intro:
      "Whether you need wholesale pricing, product specs, or just want to find out more — Jeff and Rhys are easy to deal with.",
    formTitle: "Send it to Jeff",
    button: "Send it to Jeff",
    subject: "",
  },
} as const;

export default function ContactSection({
  headingLevel = "h2",
  intent,
  product,
}: {
  headingLevel?: "h1" | "h2";
  intent?: ContactIntent;
  /** product slug to preselect in the range dropdown */
  product?: string;
}) {
  const Heading = headingLevel;
  const FormHeading = headingLevel === "h1" ? "h2" : "h3";
  const copy = COPY[intent ?? "general"];
  const preselected = productRanges.find((p) => p.slug === product)?.name ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
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
            copy.subject && `[${copy.subject}]`,
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
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      statusRef.current?.focus();
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-bg2 px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
            {copy.eyebrow}
          </p>
          <Heading className="mt-3 font-display text-4xl font-black sm:text-5xl">
            {copy.title}
          </Heading>
          <p className="mt-4 max-w-md text-warm/75">{copy.intro}</p>
          <p className="mt-3 text-sm text-warm/65">
            No minimum-order surprises — tell us about your kitchen and
            we&rsquo;ll quote delivery direct or through your PFD rep.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-1 h-4 w-4 text-green" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  Call Jeff directly
                </p>
                <a href={JEFF.href} className="mt-1 inline-flex min-h-11 items-center font-display text-3xl font-bold text-warm hover:text-green">
                  {JEFF.display}
                </a>
                <a href="tel:+61243940176" className="flex min-h-11 items-center text-warm/85 hover:text-warm">
                  (02) 4394 0176
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-1 h-4 w-4 text-green" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${publicEmail}`}
                  className="mt-1 flex min-h-11 items-center break-all text-warm/85 hover:text-warm"
                >
                  {publicEmail}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-4 w-4 text-green" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  Factory
                </p>
                <p className="mt-1 text-warm/85">{business.address.display}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-bg p-7">
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="outline-none"
          >
            {status === "success" && (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-deep">
                  <Check aria-hidden="true" className="h-6 w-6 text-white" />
                </span>
                <FormHeading className="mt-5 font-display text-2xl font-bold">
                  Thanks{firstName ? `, ${firstName}` : ""}!
                </FormHeading>
                <p className="mt-2 text-sm text-warm/70">
                  We&rsquo;ll be in touch within one business day. Need us
                  sooner? Call Jeff on 0402 091 718.
                </p>
              </div>
            )}
            {status === "error" && (
              <p className="mb-4 rounded-md border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200">
                Something went wrong sending your enquiry. Please try again, or
                call Jeff on{" "}
                <a href="tel:+61402091718" className="font-semibold underline">
                  0402 091 718
                </a>
                .
              </p>
            )}
          </div>

          {status !== "success" && (
            <form onSubmit={onSubmit} className="space-y-4">
              <FormHeading className="font-display text-xl font-bold">
                {copy.formTitle}
              </FormHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="mb-1.5 block text-sm text-warm/80">
                    Your name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm placeholder:text-muted focus:border-green"
                  />
                </div>
                <div>
                  <label htmlFor="cf-business" className="mb-1.5 block text-sm text-warm/80">
                    Business name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-business"
                    name="business"
                    type="text"
                    required
                    autoComplete="organization"
                    className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm placeholder:text-muted focus:border-green"
                  />
                </div>
                <div>
                  <label htmlFor="cf-phone" className="mb-1.5 block text-sm text-warm/80">
                    Mobile (Jeff will call or text you back) <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm placeholder:text-muted focus:border-green"
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="mb-1.5 block text-sm text-warm/80">
                    Email address
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm placeholder:text-muted focus:border-green"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cf-product" className="mb-1.5 block text-sm text-warm/80">
                  Which product interests you?
                </label>
                <select
                  id="cf-product"
                  name="product"
                  defaultValue={preselected}
                  className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm focus:border-green"
                >
                  <option value="">Select a range (optional)</option>
                  {productRanges.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                  <option value="Full range">Full range — send everything!</option>
                </select>
              </div>
              {intent === "sample" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cf-suburb" className="mb-1.5 block text-sm text-warm/80">
                      Delivery suburb &amp; postcode <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="cf-suburb"
                      name="suburb"
                      type="text"
                      required
                      autoComplete="address-level2"
                      className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm placeholder:text-muted focus:border-green"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-oven" className="mb-1.5 block text-sm text-warm/80">
                      What do you cook on?
                    </label>
                    <select
                      id="cf-oven"
                      name="oven"
                      defaultValue=""
                      className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm focus:border-green"
                    >
                      <option value="">Select an oven (optional)</option>
                      <option>Wood fire</option>
                      <option>Gas deck</option>
                      <option>Electric deck</option>
                      <option>Conveyor</option>
                      <option>Combi or other</option>
                    </select>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="cf-message" className="mb-1.5 block text-sm text-warm/80">
                  Tell us about your kitchen or operation (optional)
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={3}
                  className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm placeholder:text-muted focus:border-green"
                />
              </div>
              {/* Honeypot — hidden from real users, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="cf-website">Website</label>
                <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                aria-busy={status === "sending"}
                className="btn-primary w-full"
              >
                {status === "sending" ? "Sending…" : copy.button}
              </button>
              <p className="text-center text-xs text-warm/65">
                No spam. No lock-in. We&rsquo;ll respond within one business day.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
