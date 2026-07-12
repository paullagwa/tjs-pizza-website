import { business } from "@/lib/content/business";
import { storyIntro, timeline } from "@/lib/content/story";

export default function StorySection() {
  const years = new Date().getFullYear() - business.foundedYear;

  return (
    <section id="story" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
          Our story
        </p>
        <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
          {years} years of doing things <em className="text-green">right</em>
        </h2>
        <p className="mt-4 max-w-2xl text-warm/70">{storyIntro}</p>

        <ol className="mt-12 space-y-0">
          {timeline.map((entry, i) => (
            <li
              key={entry.period}
              className={`grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-8 ${
                i < timeline.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <p className="font-display text-2xl font-extrabold text-green">
                {entry.period}
              </p>
              <div>
                <h3 className="font-display text-xl font-bold">{entry.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-warm/70">
                  {entry.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
