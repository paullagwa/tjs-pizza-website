"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";

const links = [
  { href: "/#products", label: "Products" },
  { href: "/#why", label: "Why TJ's" },
  { href: "/#story", label: "Our Story" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-extrabold text-green">
            TJ&rsquo;s
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            Pizza Products
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-warm/70 transition-colors hover:text-warm"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:0402091718"
            className="inline-flex items-center gap-2 rounded-md bg-green-deep px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">Call Jeff</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-warm md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg2 md:hidden"
        >
          <ul className="flex flex-col px-4 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3.5 text-base text-warm/85"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="tel:0402091718"
                className="mt-4 mb-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-green-deep px-4 py-3 font-semibold text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call Jeff — 0402 091 718
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
