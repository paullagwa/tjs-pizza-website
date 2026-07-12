import type { GalleryImage } from './types';

/**
 * Gallery ("Inside TJ's — See it for yourself") — 8 images.
 *
 * Mappings are exact: git commit 20ab20d of tjs-site/index.html (before images
 * were base64-embedded) hotlinked these same 8 gallery slots, in the same
 * order with the same alt text, to the WordPress files now rescued into
 * /public/images/. Alt text rewritten as honest one-liners (legacy alts were
 * partly keyword-stuffed or too terse).
 */
export const gallery: GalleryImage[] = [
  {
    // legacy alt: "TJ's Pizza Products wholesale pizza production NSW"
    src: '/images/TJs-Pizza-Products-4.jpg',
    alt: "Pizza base production underway at TJ's Warnervale factory",
  },
  {
    // legacy alt: "Par-baked pizza bases wholesale supplier NSW Australia"
    src: '/images/TJs-Pizza-Products-7.jpg',
    alt: "Par-baked pizza bases fresh off TJ's production line",
  },
  {
    // legacy alt: "TJ's dough"
    src: '/images/TJs-Pizza-Products-11.jpg',
    alt: "TJ's pizza dough during production",
  },
  {
    // legacy alt: "TJ's range"
    src: '/images/TJs-Pizza-Products-3.jpg',
    alt: "A selection from TJ's pizza base range",
  },
  {
    // legacy alt: "TJ's bases"
    src: '/images/TJs-Pizza-Products-9.jpg',
    alt: "Stacked TJ's pizza bases ready for dispatch",
  },
  {
    // legacy alt: "TJ's products"
    src: '/images/TJs-Pizza-Products-8.jpg',
    alt: "TJ's pizza products packaged for delivery",
  },
  {
    // legacy alt: "TJ's garlic base" (was still hotlinked on the live legacy site)
    src: '/images/TJs-Pizza-Products-6.jpg',
    alt: "TJ's garlic butter and cheese pizza base",
  },
  {
    // legacy alt: "TJ's pizza" (was still hotlinked on the live legacy site)
    src: '/images/TJs-Pizza-Products-5.jpg',
    alt: "A finished pizza made on a TJ's base",
  },
];

/**
 * Other legacy image placements (outside the gallery grid), mapped via the
 * same pre-embed commit — useful for the rebuild's hero/story/team sections.
 */
/**
 * Contents verified by eye (2026-07-13):
 * - TJs-Pizza-Products-15-scaled.jpg is the OLD MARKETING FLYER (poster with
 *   baked-in text and the legacy live.com.au email) — do not display on the site.
 * - TJs-Pizza-Products-16-scaled.jpg is a dough ball with mozzarella, basil
 *   and olive oil (used in the hero + og:image).
 * - IMG_4008.jpg is the half-metre pizza slab (used on the square-base page).
 * - IMG_6172.jpg is square-cut ham & pineapple slices.
 */
export const sectionImages = {
  hero: [
    {
      src: '/images/TJs-Pizza-Products-16-scaled.jpg',
      alt: "A floured TJ's dough ball with fresh mozzarella, basil and olive oil",
    },
    {
      src: '/images/TJs-Pizza-Products-1.jpg',
      alt: 'Pizza dough with a rolling pin, vine tomatoes and basil',
    },
    {
      src: '/images/TJs-Pizza-Products-2.jpg',
      alt: "A golden calzone made on TJ's dough, fresh out of the oven",
    },
  ],
  story: [
    {
      src: '/images/TJs-Pizza-Products-13.jpg',
      alt: "TJ's 2000m² HACCP-certified factory at Warnervale",
    },
    {
      src: '/images/TJs-Pizza-Products-13-oct.jpg',
      alt: "Wholesale pizza production inside TJ's factory",
    },
  ],
  haccpBadge: {
    src: '/images/haccp-aust-cert-black-1.jpg',
    alt: 'HACCP Australia food safety certification mark',
  },
  /** Real brand logo (navy/blue on white) — used for the JSON-LD Organization
      logo; the on-site header keeps the green wordmark treatment. */
  logo: { src: '/images/tjs-logo.jpg', alt: "TJ's Pizza Products logo" },
  /** Legacy marketing flyer — kept for reference only, not displayed. */
  legacyFlyer: {
    src: '/images/TJs-Pizza-Products-15-scaled.jpg',
    alt: "TJ's dough ball marketing flyer (legacy)",
  },
} satisfies Record<string, GalleryImage | GalleryImage[]>;
