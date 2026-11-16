import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The free-sample offer — built then deleted on the legacy site (orphaned CSS
 * survived). Reinstated per the audit: a trial carton is the highest-converting
 * mid-funnel CTA in wholesale food supply.
 */
export default function SampleCta() {
  return (
    <section className="border-y border-line bg-bg2 py-16">
      <div className="container-site text-center [&>*]:mx-auto">
        <h2 className="font-display text-3xl font-black sm:text-4xl">
          Try TJ&rsquo;s in <em className="text-green">your kitchen</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-warm/70">
          The dough ball sells itself once it&rsquo;s in your oven. Request a
          sample box and put it up against your current supplier — no
          commitment, no lock-in.
        </p>
        <Link
          href="/contact?intent=sample"
          className="btn-primary mt-7"
        >
          Get a free sample box
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
