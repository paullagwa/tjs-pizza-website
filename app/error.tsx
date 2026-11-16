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
    <main id="main" className="flex flex-1 items-center py-24">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">
          Something went wrong
        </p>
        <h1 className="h-section mt-3">
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
