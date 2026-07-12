import { business } from "@/lib/content/business";
import { productRanges } from "@/lib/content/products";

/**
 * Canonical production origin. The vercel.app deployment stays noindex until
 * DNS cutover (see the staging guard in app/layout.tsx), so baking the
 * production origin into canonicals/schema is safe and flips cleanly.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tjspizzaproducts.com.au";

export const SITE_NAME = business.name;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

const primaryEmail = business.emails.find((e) => e.primary)!;

/** E.164 for schema — display formats stay AU-local on the page */
const PHONE_E164 = "+61402091718";

export const organizationId = `${SITE_URL}/#organization`;
export const localBusinessId = `${SITE_URL}/#localbusiness`;
export const websiteId = `${SITE_URL}/#website`;

/** Site-wide @graph: Organization + LocalBusiness + WebSite */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: business.name,
        legalName: business.legalName,
        url: SITE_URL,
        email: primaryEmail.address,
        telephone: PHONE_E164,
        foundingDate: String(business.foundedYear),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/tjs-logo.jpg"),
        },
        sameAs: business.socials,
      },
      {
        "@type": "FoodEstablishment",
        "@id": localBusinessId,
        name: business.name,
        parentOrganization: { "@id": organizationId },
        url: SITE_URL,
        email: primaryEmail.address,
        telephone: PHONE_E164,
        image: absoluteUrl("/images/TJs-Pizza-Products-16-scaled.jpg"),
        servesCuisine: "Pizza",
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.locality,
          addressRegion: business.address.region,
          postalCode: business.address.postcode,
          addressCountry: "AU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: business.openingHours.days,
            opens: business.openingHours.opens,
            closes: business.openingHours.closes,
          },
        ],
        areaServed: business.deliveryRegions.map((r) => ({
          "@type": "Place",
          name: r,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Wholesale pizza bases and dough balls",
          itemListElement: productRanges.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: p.name,
              url: absoluteUrl(`/products/${p.slug}`),
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: business.name,
        publisher: { "@id": organizationId },
        inLanguage: "en-AU",
      },
    ],
  };
}

export function breadcrumbGraph(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
