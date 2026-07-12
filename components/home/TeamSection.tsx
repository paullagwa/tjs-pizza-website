import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { team } from "@/lib/content/team";

export default function TeamSection() {
  return (
    <section id="team" className="border-y border-line bg-bg2 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-green">
          The people
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-extrabold sm:text-5xl">
          Meet Jeff &amp; Rhys
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-warm/70">
          Family-owned means there&rsquo;s always a real person at the other
          end of the phone.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-lg border border-line bg-bg p-7 text-center"
            >
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.imageAlt ?? member.name}
                  width={240}
                  height={240}
                  className="mx-auto h-28 w-28 rounded-full border-2 border-green/50 object-cover"
                />
              )}
              <h3 className="mt-5 font-display text-xl font-bold">{member.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-green">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-warm/70">{member.bio}</p>
              <div className="mt-5 space-y-2 text-sm">
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-warm/80 hover:text-warm"
                  >
                    <Phone aria-hidden="true" className="h-3.5 w-3.5 text-green" />
                    {member.phone}
                  </a>
                )}
                <br />
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 break-all text-warm/80 hover:text-warm"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 text-green" />
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
