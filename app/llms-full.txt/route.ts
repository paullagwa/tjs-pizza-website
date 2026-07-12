import { business } from "@/lib/content/business";
import {
  competition,
  homeCookSteps,
  homeCookTips,
  recipes,
} from "@/lib/content/community";
import { faqs } from "@/lib/content/faq";
import { bespokeOffer, productRanges } from "@/lib/content/products";
import { storyIntro, timeline } from "@/lib/content/story";
import { team } from "@/lib/content/team";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Full-content markdown dump for AI crawlers (/llms-full.txt).
 * Generated from the same data files that render the site, so it can never
 * drift from the pages.
 */
function render(): string {
  const primaryEmail = business.emails.find((e) => e.primary)!;
  const years = new Date().getFullYear() - business.foundedYear;

  const products = productRanges
    .map((p) => {
      const specs =
        p.specs.length > 0
          ? `\nSizes: ${p.specs.map((s) => `${s.size} (${s.carton})`).join(", ")}.`
          : "";
      const shelf = p.shelfLife ? `\nShelf life: ${p.shelfLife}.` : "";
      return `### ${p.name} (${p.tagline})\n\n${p.description}${specs}${shelf}\nDietary: ${p.dietary.join(", ")}.\nURL: ${SITE_URL}/products/${p.slug}`;
    })
    .join("\n\n");

  return `# TJ's Pizza Products — Full Site Content

${business.name} is a wholesale pizza base and dough ball manufacturer at ${business.address.street}, ${business.address.locality} ${business.address.region} ${business.address.postcode}, Australia. Founded ${business.foundedYear} (${years} years in business). ${business.customerCount} commercial customers. ${business.factorySize} HACCP-certified factory. Distribution: ${business.distribution}. Delivery regions: ${business.deliveryRegions.join(", ")}. Customer types: ${business.customerTypes.join(", ")}.

Certifications: ${business.certifications.join(", ")}.
Dietary standards across the range: ${business.dietaryClaims.join(", ")}.
Dough ball ingredients: ${business.ingredients}.
Contact: Jeff Knox ${business.phones[0].display}, ${primaryEmail.address}. Hours: ${business.openingHours.days[0]}–${business.openingHours.days.at(-1)} ${business.openingHours.opens}–${business.openingHours.closes}.

## Product ranges

${products}

### Bespoke dough development

${bespokeOffer.description}
${bespokeOffer.points.map((p) => `- ${p}`).join("\n")}

## Our story

${storyIntro}

${timeline.map((t) => `- ${t.period} — ${t.title}: ${t.body}`).join("\n")}

## Team

${team.map((m) => `- ${m.name}, ${m.role}: ${m.bio} Phone: ${m.phone ?? "via office"}.`).join("\n")}

## FAQ

${faqs.map((f) => `**Q: ${f.question}**\nA: ${f.answer}`).join("\n\n")}

## For home cooks

${homeCookSteps.map((s) => `${s.step}. ${s.title}: ${s.body}`).join("\n")}

Tips: ${homeCookTips.map((t) => `${t.title} — ${t.body}`).join(" ")}

Recipes: ${recipes.map((r) => `${r.title} (${r.tag}): ${r.description} ${r.time} at ${r.temp}, ${r.serves}.`).join(" ")}

## ${competition.name}

${competition.blurb}
Prizes: ${competition.prizes.map((p) => `${p.place}: ${p.detail}`).join("; ")}.
${competition.consentNote}
`;
}

export function GET() {
  return new Response(render(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
