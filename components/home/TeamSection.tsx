import Image from "next/image";
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
    <section id="team" className="border-y border-line bg-bg2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-green">
          The people
        </p>
        <h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">
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
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-bg3">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.imageAlt ?? member.name}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
                    className="object-cover object-[50%_30%] grayscale-[35%] sepia-[20%]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-full items-center justify-center"
                  >
                    <span className="flex h-32 w-32 items-center justify-center rounded-full border border-line-strong font-display text-5xl font-bold text-warm/80">
                      {initials(member.name)}
                    </span>
                  </div>
                )}
              </div>
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
