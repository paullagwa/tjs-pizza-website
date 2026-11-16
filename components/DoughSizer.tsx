"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SpecRow } from "@/lib/content/types";

function grams(size: string): number {
  const n = parseFloat(size);
  return /kg/i.test(size) ? n * 1000 : n;
}

/**
 * Pick a weight and the dough ball springs to true relative scale (radius
 * follows the cube root of weight, as a real ball of dough does). The plain
 * table stays on the page as the accessible / no-JS source.
 */
export default function DoughSizer({ specs }: { specs: SpecRow[] }) {
  const [active, setActive] = useState(() =>
    Math.max(0, specs.findIndex((s) => s.size === "270g")),
  );
  const row = specs[active];
  const w = grams(row.size);
  const heaviest = Math.max(...specs.map((s) => grams(s.size)));
  const r = 118 * Math.cbrt(w / heaviest);
  const perCarton = parseInt(row.carton ?? "", 10);
  const cartonKg = Number.isFinite(perCarton) ? (perCarton * w) / 1000 : null;

  return (
    <div>
      <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
        <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label={`A ${row.size} dough ball, drawn to scale against the other sizes`}>
          <defs>
            <radialGradient id="sizer-ball" cx="38%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#fffaf0" />
              <stop offset="55%" stopColor="#ecdfc4" />
              <stop offset="100%" stopColor="#c9b48c" />
            </radialGradient>
            <filter id="sizer-flour" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.6 1.1" />
              <feComposite in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
          {/* outline of the largest size, for scale */}
          <ellipse cx="160" cy={206 - 118 * 0.8} rx="118" ry={118 * 0.8} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 6" />
          <ellipse cx="160" cy="208" rx={r * 0.95} ry={r * 0.09 + 3} fill="#1b160d" opacity="0.18" />
          <g key={row.size} className="sizer-settle" style={{ transformOrigin: "160px 206px" }}>
            <ellipse cx="160" cy={206 - r * 0.8} rx={r} ry={r * 0.8} fill="url(#sizer-ball)" />
            <ellipse cx="160" cy={206 - r * 0.8} rx={r} ry={r * 0.8} fill="#fff" filter="url(#sizer-flour)" opacity="0.5" />
          </g>
        </svg>
      </div>

      <fieldset className="mt-4">
        <legend className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Pick a weight
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {specs.map((s, i) => (
            <label
              key={s.size}
              className="cursor-pointer rounded-full border border-line-strong px-4 py-2.5 text-sm font-semibold tabular-nums transition-colors has-[:checked]:border-green has-[:checked]:bg-green has-[:checked]:text-flour has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green"
            >
              <input
                type="radio"
                name="dough-size"
                value={s.size}
                checked={i === active}
                onChange={() => setActive(i)}
                className="sr-only"
              />
              {s.size}
            </label>
          ))}
        </div>
      </fieldset>

      <dl aria-live="polite" className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line-strong pt-5 sm:grid-cols-4">
        <div className="flex flex-col-reverse">
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">Per ball</dt>
          <dd className="font-display text-3xl font-black tabular-nums">{row.size}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">Balls per carton</dt>
          <dd className="font-display text-3xl font-black tabular-nums">{Number.isFinite(perCarton) ? perCarton : "Ask"}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">Dough per carton</dt>
          <dd className="font-display text-3xl font-black tabular-nums">{cartonKg ? `${cartonKg % 1 ? cartonKg.toFixed(1) : cartonKg}kg` : "Ask"}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            {row.codes?.PFD ? "PFD code" : row.codes?.Bidfood ? "Bidfood code" : row.codes?.MOCO ? "MOCO code" : "Order code"}
          </dt>
          <dd className="font-display text-3xl font-black tabular-nums">
            {row.codes?.PFD ?? row.codes?.Bidfood ?? row.codes?.MOCO ?? "Ask"}
          </dd>
        </div>
      </dl>

      <Link
        href={`/contact?product=frozen-dough-balls&size=${encodeURIComponent(row.size)}`}
        className="btn-primary mt-6"
      >
        Get a price on {row.size}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  );
}
