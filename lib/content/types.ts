export type SpecRow = {
  /** e.g. "150g" or "6 inch" */
  size: string;
  /** e.g. "40 per carton" */
  carton: string;
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
  /** true for the hero range (Frozen Dough Balls) */
  flagship?: boolean;
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
