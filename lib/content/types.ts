/** Distributors that carry TJ's — order codes are per distributor. */
export const DISTRIBUTORS = ['PFD', 'MOCO', 'Bidfood'] as const;
export type Distributor = (typeof DISTRIBUTORS)[number];

export type SpecRow = {
  /** e.g. "150g" or "6 inch" */
  size: string;
  /** e.g. "40/ctn" — omit when the quantity is not confirmed */
  carton?: string;
  /** TJ's own product code, e.g. "Do270" */
  sku?: string;
  /** distributor order codes, keyed by distributor name */
  codes?: Partial<Record<Distributor, string>>;
  /** optional extra column, e.g. suggested pizza size */
  note?: string;
};

export type ProductRange = {
  slug: string;
  name: string;
  /** one-line hook shown on cards */
  tagline: string;
  /** 2-4 sentence buyer-facing description */
  description: string;
  specs: SpecRow[];
  /** e.g. "12 months frozen" */
  shelfLife?: string;
  dietary: string[];
  /** path under /public, e.g. "/images/dough-balls.jpg" */
  image?: string;
  imageAlt?: string;
  /** CSS object-position for the main image when cropped */
  imagePosition?: string;
  /** true = show the photo in full colour (packaging), not graded */
  imageFullColour?: boolean;
  /** further photos shown on the product page */
  extraImages?: Array<{ src: string; alt: string }>;
  /** true for the hero range (Frozen Dough Balls) */
  flagship?: boolean;
  /** one-line 'what it is for', shown on range plates */
  useCase?: string;
  /** kitchen types this range suits — values from `venueTypes` */
  bestFor?: string[];
  /** hand-written meta description (falls back to the description) */
  metaDescription?: string;
  /** true = not published anywhere (no page, nav, sitemap, form option) */
  draft?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type TimelineEntry = {
  /** e.g. "2002" or "Today" */
  period: string;
  title: string;
  body: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  phone?: string;
  email: string;
  image?: string;
  imageAlt?: string;
};

export type Testimonial = {
  quote: string;
  /** attribution exactly as the legacy site had it */
  name: string;
  venue?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};
