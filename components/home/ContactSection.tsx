"use client";

import { useRef, useState } from "react";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const primaryEmail = business.emails.find((e) => e.primary)!;

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
          message: data.get("message"),
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
            Get in touch
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Let&rsquo;s talk <em className="text-green">pizza</em>
          </h2>
          <p className="mt-4 max-w-md text-warm/70">
            Whether you need wholesale pricing, product specs, or just want to
            find out more — Jeff and Rhys are easy to deal with.
          </p>
          <p className="mt-3 text-sm text-warm/65">
            No minimum-order surprises — tell us about your kitchen and
            we&rsquo;ll quote delivery direct or through your PFD rep.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-1 h-4 w-4 text-green" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Call Jeff directly
                </p>
                <a href="tel:0402091718" className="mt-1 block text-warm/85 hover:text-warm">
                  0402 091 718
                </a>
                <a href="tel:0243940176" className="block text-warm/85 hover:text-warm">
                  (02) 4394 0176
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-1 h-4 w-4 text-green" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${primaryEmail.address}`}
                  className="mt-1 block break-all text-warm/85 hover:text-warm"
                >
                  {primaryEmail.address}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-4 w-4 text-green" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
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
                <h3 className="mt-5 font-display text-2xl font-bold">
                  Thanks{firstName ? `, ${firstName}` : ""}!
                </h3>
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
                <a href="tel:0402091718" className="font-semibold underline">
                  0402 091 718
                </a>
                .
              </p>
            )}
          </div>

          {status !== "success" && (
            <form onSubmit={onSubmit} className="space-y-4">
              <h3 className="font-display text-xl font-bold">Get in touch</h3>
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
                    Phone number <span aria-hidden="true">*</span>
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
                  defaultValue=""
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
                className="w-full rounded-md bg-green-deep px-6 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "sending" ? "Sending..." : "Send Request →"}
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
