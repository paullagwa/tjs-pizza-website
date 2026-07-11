export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
        Built from the base up
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-tight sm:text-6xl">
        The base behind{" "}
        <em className="text-green">Australia&rsquo;s best</em> pizza kitchens.
      </h1>
      <p className="mt-6 max-w-xl text-muted">
        Hand-stretched dough balls. No preservatives. No shortcuts. The new
        TJ&rsquo;s Pizza Products site is being rebuilt on this foundation —
        the full wholesale homepage lands in Phase 2.
      </p>
      <a
        href="tel:0402091718"
        className="mt-10 rounded-md bg-green-deep px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Call Jeff — 0402 091 718
      </a>
    </main>
  );
}
