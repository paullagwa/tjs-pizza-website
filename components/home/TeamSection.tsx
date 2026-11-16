import Photo from "@/components/Photo";
import { Mail, Phone } from "lucide-react";
import { publicEmail, telHref } from "@/lib/content/business";
import { team } from "@/lib/content/team";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function TeamSection() {
  return (
    <section id="team" className="border-y border-line bg-bg2 py-20">
      <div className="container-site reveal">
        <p className="eyebrow">
          The people
        </p>
        <h2 className="h-section mt-3">
          Real people who pick up the phone
        </h2>
        <p className="mt-4 max-w-xl text-warm/70">
          Family-owned means you deal with the people who make the dough, not
          a call centre.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col rounded-lg border border-line bg-bg p-6"
            >
              {member.image ? (
                <Photo
                  src={member.image}
                  alt={member.imageAlt ?? member.name}
                  ratio="4/5"
                  grade="dough"
                  position="50% 30%"
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
                  className="rounded-md"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/5] items-center justify-center rounded-md bg-bg3"
                >
                  <span className="flex h-32 w-32 items-center justify-center rounded-full border border-line-strong font-display text-5xl font-bold text-warm/80">
                    {initials(member.name)}
                  </span>
                </div>
              )}
              <h3 className="mt-5 font-display text-xl font-bold">{member.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-green">
                {member.role}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-warm/70">
                {member.bio}
              </p>
              <div className="mt-5 flex flex-col gap-2">
                {member.phone && (
                  <a href={telHref(member.phone)} className="btn-primary w-full">
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    {member.phone}
                  </a>
                )}
                <a href={`mailto:${publicEmail}`} className="btn-ghost w-full">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 truncate">{publicEmail}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
