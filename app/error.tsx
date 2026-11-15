"use client";

import { useEffect } from "react";
import { JEFF } from "@/lib/content/business";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="flex flex-1 items-center px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
          That didn&rsquo;t come out of the oven right.
        </h1>
        <p className="mt-4 text-warm/75">
          The page hit a problem on our side. Try again, or ring Jeff and
          he&rsquo;ll sort you out directly.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <a href={JEFF.href} className="btn-ghost">
            Call Jeff {JEFF.display}
          </a>
        </div>
      </div>
    </main>
  );
}
