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
export const sectionImages = {
  hero: [
    {
      src: '/images/TJs-Pizza-Products-15-scaled.jpg',
      alt: "TJ's dough ball production facility at Warnervale on the NSW Central Coast",
    },
    {
      // VERIFY mapping — legacy hero slots 2 & 3 were base64-only in every commit
      // (legacy alts: "wood fire oven" / "pepperoni"), and the embedded photos do NOT
      // match these rescued files. IMG_4008/IMG_6172 are the only unused rescued
      // photos; alts below describe their actual content.
      src: '/images/IMG_4008.jpg',
      alt: "A long par-baked pizza slab fresh from TJ's kitchen",
    },
    {
      // VERIFY mapping — see note above.
      src: '/images/IMG_6172.jpg',
      alt: "A sliced ham and pineapple pizza made on a TJ's base",
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
  factoryBanner: {
    src: '/images/TJs-Pizza-Products-16-scaled.jpg',
    alt: "TJ's 2000m² production facility at Warnervale, NSW Central Coast",
  },
  haccpBadge: {
    src: '/images/haccp-aust-cert-black-1.jpg',
    alt: 'HACCP Australia food safety certification mark',
  },
  bespoke: {
    src: '/images/TJs-Pizza-Products-13.jpg',
    alt: "Custom dough development at TJ's factory",
  },
} satisfies Record<string, GalleryImage | GalleryImage[]>;
