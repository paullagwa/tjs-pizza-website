"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Package, Phone } from "lucide-react";
import { JEFF } from "@/lib/content/business";

/**
 * Phone-only bar in the thumb zone: Call Jeff / Sample box / Ask Forno.
 * Appears once the hero has scrolled away and steps aside while the
 * enquiry form is on screen.
 */
export default function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const form = document.querySelector("[data-contact-form]");
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting));
      io.observe(hero);
      observers.push(io);
    } else {
      const onScroll = () => setPastHero(window.scrollY > 240);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      observers.push({ disconnect: () => window.removeEventListener("scroll", onScroll) } as IntersectionObserver);
    }
    if (form) {
      const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting));
      io.observe(form);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const shown = pastHero && !formVisible;

  return (
    <div
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-bg/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md transition-transform duration-300 md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
        <a href={JEFF.href} className="btn-primary px-3">
          <Phone aria-hidden="true" className="h-4 w-4" />
          Call Jeff
        </a>
        <Link href="/contact?intent=sample" className="btn-ghost px-3">
          <Package aria-hidden="true" className="h-4 w-4" />
          Sample box
        </Link>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("forno:toggle"))}
          className="btn-ghost px-3"
          aria-label="Ask Forno, our pizza assistant"
        >
          <Flame aria-hidden="true" className="h-5 w-5 text-ember" />
        </button>
      </div>
    </div>
  );
}
