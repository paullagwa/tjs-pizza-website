import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { bespokeOffer } from "@/lib/content/products";

export default function CustomDough() {
  return (
    <section id="custom-dough" className="relative isolate overflow-hidden py-28">
      <div className="photo-dough absolute inset-0 -z-10">
        <Image
          src="/images/TJs-Pizza-Products-8.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-scale-x-100 object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-bg via-bg/80 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>
      <div className="container-site reveal">
        <div className="ml-auto max-w-2xl">
          <p className="eyebrow">Custom dough, under confidentiality</p>
          <h2 className="h-section mt-3">
            Every great pizza kitchen has a secret. We&rsquo;ll help you keep it.
          </h2>
          <p className="lead mt-6 text-warm/85">
            Rhys works directly with chefs and operators to develop bespoke
            dough ball recipes, built to your specification and delivered
            consistently at scale.
          </p>
          <ul className="mt-7 grid gap-2.5">
            {bespokeOffer.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-warm/85">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-crust" />
                {pt}
              </li>
            ))}
          </ul>
          <Link href="/contact?intent=bespoke" className="btn-primary btn-lg mt-9">
            {bespokeOffer.cta}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
