import { business } from "@/lib/content/business";
import { storyIntro, timeline } from "@/lib/content/story";

export default function StorySection() {
  const years = new Date().getFullYear() - business.foundedYear;

  return (
    <section id="story" className="py-20">
      <div className="container-site reveal">
        <p className="eyebrow">
          Our story
        </p>
        <h2 className="h-section mt-3">
          {years} years of doing things right
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
              <p className="font-display text-2xl font-black text-green">
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
