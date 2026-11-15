/**
 * Business facts for TJ's Pizza Products.
 *
 * Sources (priority order): legacy site index.html (incl. JSON-LD + hidden
 * .footer-seo paragraph), TJ's product sheet PDF, old WordPress site
 * (tjspizzaproducts.com.au, still live as of 2026-07).
 */

export type BusinessPhone = {
  label: string;
  /** display format, exactly as printed on the legacy site */
  display: string;
  /** tel: href value */
  href: string;
};

export type BusinessEmail = {
  label: string;
  address: string;
  /** true for the address shown in the public contact section */
  primary?: boolean;
};

export type Business = {
  name: string;
  legalName: string;
  tagline: string;
  phones: BusinessPhone[];
  emails: BusinessEmail[];
  fax?: string;
  address: {
    /** street address from the product sheet PDF — not shown on the legacy site itself */
    street: string;
    locality: string;
    region: string;
    postcode: string;
    country: string;
    /** the location line as the legacy site printed it */
    display: string;
  };
  geo: { latitude: number; longitude: number };
  /** number so the UI can compute "N years" instead of hard-coding it */
  foundedYear: number;
  customerCount: string;
  factorySize: string;
  certifications: string[];
  dietaryClaims: string[];
  ingredients: string;
  distribution: string;
  /** from the hidden .footer-seo paragraph on the legacy site */
  deliveryRegions: string[];
  customerTypes: string[];
  openingHours: {
    days: string[];
    opens: string;
    closes: string;
  };
  /** JSON-LD sameAs was empty on the legacy site — no social profiles found */
  socials: string[];
  website: string;
};

export const business: Business = {
  name: "TJ's Pizza Products",
  legalName: "TJ's Pizza Products Pty Ltd", // "Pizza Products PtyLtd" on the PDF letterhead
  tagline: 'Built from the base up', // nav logo sub-line on the legacy site
  phones: [
    { label: 'Jeff Knox (Director)', display: '0402 091 718', href: 'tel:+61402091718' },
    // Legacy site prints the landline as "(02) 43 94 01 76"; normalised display below.
    // NOTE: the product sheet PDF prints "(02) 4394 01768" (extra digit — likely a typo).
    { label: 'Landline', display: '(02) 4394 0176', href: 'tel:+61243940176' },
    { label: 'Rhys Wellfare (Managing Director)', display: '0416 071 022', href: 'tel:+61416071022' },
    { label: 'Paul Lagwa (QLD Sales Executive)', display: '0411 635 322', href: 'tel:+61411635322' },
  ],
  emails: [
    // The one public email, site-wide. This is the inbox proven to be monitored
    // (form delivery goes here too). jeff@tjspizzaproducts.com.au appeared on the
    // legacy site but is unconfirmed — switch `primary` once Jeff confirms it works.
    { label: 'Sales & general enquiries', address: 'tjspizza@live.com.au', primary: true },
    { label: 'Unconfirmed branded address', address: 'jeff@tjspizzaproducts.com.au' },
  ],
  fax: '(02) 4392 0622', // old WordPress site footer only
  address: {
    street: 'Doherty Close', // from the product sheet PDF ("Doherty Close, Warnervale, 2259 NSW")
    locality: 'Warnervale',
    region: 'NSW',
    postcode: '2259',
    country: 'Australia',
    display: 'Warnervale, NSW Central Coast, Australia',
  },
  geo: { latitude: -33.2167, longitude: 151.4833 },
  foundedYear: 2002,
  customerCount: '500+',
  factorySize: '2000m²',
  certifications: ['HACCP Food Safety Certified'],
  dietaryClaims: [
    'No added preservatives',
    'No artificial colours or flavours',
    'No soy',
    'No milk products',
    'Vegan friendly',
    'Vegetarian friendly',
  ],
  // Dough ball ingredients, from the product sheet PDF
  ingredients:
    '00 Australian Wheat Flour, Yeast, Sugar, Salt, Vegetable Oil, and Filtered Water',
  distribution: 'PFD Food Services nationally and direct from the Warnervale factory',
  deliveryRegions: [
    'Sydney',
    'Newcastle',
    'Hunter Valley',
    'Central Coast',
    'Wollongong',
    'Canberra',
    'Nationally',
  ],
  customerTypes: [
    'Commercial kitchens',
    'Restaurants',
    'Pizza trucks',
    'Food trucks',
    'Pubs',
    'Clubs',
    'Schools',
    'Canteens',
  ],
  // From the legacy site's LocalBusiness JSON-LD
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  socials: [],
  website: 'https://tjspizzaproducts.com.au',
};

/** Jeff's mobile — the site's primary call-to-action number. */
export const JEFF = business.phones[0];

/** The single public email address used everywhere on the site. */
export const publicEmail = business.emails.find((e) => e.primary)!.address;

/** "0402 091 718" / "(02) 4394 0176" -> "tel:+61402091718" */
export function telHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  return `tel:+61${digits.replace(/^0/, "")}`;
}
