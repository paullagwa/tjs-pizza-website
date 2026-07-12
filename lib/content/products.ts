import type { ProductRange } from './types';

/**
 * All seven product ranges.
 *
 * The legacy site only rendered cards for four ranges (Frozen Dough Balls,
 * Garlic Butter & Cheese, Square Pizza Base, DinoBite). Traditional Par-Baked,
 * Fresh Frozen and Gluten Free existed only in the contact-form dropdown,
 * footer links, the hidden .footer-seo paragraph and the JSON-LD — specs for
 * those come from the JSON-LD and are flagged below. See extraction-notes.md.
 *
 * A carton value of '—' means the carton quantity could not be sourced.
 */

export const productRanges: ProductRange[] = [
  {
    slug: 'frozen-dough-balls',
    name: 'Frozen Dough Ball Range',
    tagline: "TJ's Signature Product",
    description:
      'The heart of what we do. Hand-stretched and frozen at peak freshness. ' +
      'From 150g to 1kg — whatever your kitchen requires, we have a size for you. ' +
      'Vegan friendly. Works in every oven — especially wood fire. ' +
      'Perfect for Neapolitan, NY, Roman and artisan pizza. Thaws in minutes. ' +
      'Available through PFD Food Services nationally and direct from our Warnervale factory.',
    // Carton quantities exactly as the legacy detail table.
    // CONFLICT: the product sheet PDF says "15 per box at 1kg" (legacy table says 12/ctn),
    // and the legacy JSON-LD/footer-seo describe "8 sizes from 150g to 600g" while this
    // table has 9 sizes up to 1kg. Legacy table takes priority — confirm with Paul.
    specs: [
      { size: '150g', carton: '80/ctn' },
      { size: '220g', carton: '60/ctn' },
      { size: '240g', carton: '60/ctn' },
      { size: '250g', carton: '60/ctn' },
      { size: '270g', carton: '50/ctn' },
      { size: '300g', carton: '50/ctn' },
      { size: '350g', carton: '40/ctn' },
      { size: '600g', carton: '20/ctn' },
      { size: '1kg', carton: '12/ctn' },
    ],
    shelfLife: '12 months frozen',
    dietary: [
      'Vegan friendly',
      'Vegetarian friendly',
      'No preservatives',
      'No soy',
      'No milk products',
    ],
    image: '/images/TJs-Pizza-Products-12.jpg',
    imageAlt: "Frozen pizza dough balls from TJ's Warnervale production line",
    flagship: true,
  },
  {
    slug: 'traditional-pizza-bases',
    name: 'Traditional Pizza Bases',
    tagline: 'Par-Baked',
    // No product card on the legacy site — description assembled from the legacy
    // JSON-LD, the hidden footer-seo paragraph and the old WordPress homepage.
    description:
      'Par-baked pizza bases in 6, 8 and 9 inch, supplied chilled or frozen. ' +
      'Keep in the cool room for up to 3 weeks or in the freezer for up to 12 months, ' +
      'and defrost in just a couple of minutes — ideal for busy service times. ' +
      'No added preservatives, colourings or flavours.',
    specs: [
      { size: '6 inch', carton: '—' },
      { size: '8 inch', carton: '—' },
      { size: '9 inch', carton: '—' },
    ],
    shelfLife: 'Up to 3 weeks chilled or 12 months frozen',
    dietary: ['No preservatives', 'No soy', 'No milk products'],
  },
  {
    slug: 'fresh-frozen',
    name: 'Fresh Frozen Range',
    tagline: 'Frozen at Peak Quality',
    // No card, no specs anywhere in the sources — name only (contact-form dropdown,
    // footer links, footer-seo, old WordPress homepage). Needs Paul's input.
    description:
      'Fresh frozen pizza bases, snap-frozen at peak quality for commercial kitchens. ' +
      'Contact us for current sizes and carton quantities.',
    specs: [],
    dietary: ['No preservatives', 'No soy', 'No milk products'],
  },
  {
    slug: 'gluten-free',
    name: 'Gluten Free Range',
    tagline: 'Dedicated Facility',
    // No product card on the legacy site — sourced from the legacy JSON-LD
    // (product entry + FAQ entry): "produced in a dedicated, fully segregated
    // HACCP-certified facility with no cross-contamination".
    description:
      'HACCP-certified gluten free pizza bases, produced in a dedicated, fully ' +
      'segregated facility with no cross-contamination. No soy, no milk. ' +
      'Available in 9 inch and 11 inch.',
    specs: [
      { size: '9 inch', carton: '—' },
      { size: '11 inch', carton: '—' },
    ],
    dietary: ['Gluten free', 'No cross-contamination', 'No soy', 'No milk products'],
  },
  {
    slug: 'garlic-butter-cheese',
    name: 'Garlic Butter & Cheese',
    tagline: 'Ready to Serve',
    description:
      'Pre-topped with rich garlic butter and cheese. Freezer to oven to plate. ' +
      'High-margin. Eliminates prep time. Also available as herb, bacon, bruschetta ' +
      'and mushroom & fetta variants.',
    specs: [],
    shelfLife: '12 months frozen',
    dietary: ['No preservatives'], // contains cheese — not vegan / not milk-free
    image: '/images/TJs-Pizza-Products-6.jpg',
    imageAlt: 'Garlic butter and cheese pizza base ready to serve',
  },
  {
    slug: 'square-pizza-base',
    name: 'Square Pizza Base',
    tagline: 'Versatile',
    description:
      'Cut to any shape. Ideal for pub-style pizza, canteen trays, or individual portions. ' +
      'Popular with schools, hospitals and club kitchens. Custom sizes up to half-metre on request.',
    specs: [],
    shelfLife: '12 months frozen',
    dietary: ['No preservatives', 'No soy', 'No milk products'],
    image: '/images/TJs-Pizza-Products-5.jpg',
    imageAlt: 'Square pizza bases for pubs, canteens and commercial kitchens',
  },
  {
    slug: 'dinobite-kids',
    name: 'DinoBite Kids Pizza Base',
    tagline: 'Kids Range',
    description:
      'Dinosaur-shaped par-baked pizza bases. Fun shapes, same clean ingredients as our ' +
      'full range. Perfect for school canteens, family dining and kids menus. ' +
      'No artificial colours or flavours.',
    specs: [{ size: '6" Dino shape', carton: '60/ctn' }],
    shelfLife: '12 months frozen',
    dietary: ['No artificial colours or flavours', 'No preservatives'],
    // Legacy card image was base64-embedded and does not match any rescued
    // WordPress file — likely a newer upload. Left undefined.
  },
];

/**
 * Bespoke / custom recipe offer — rendered as a full-width banner on the
 * legacy site rather than a product card.
 */
export const bespokeOffer = {
  tag: 'Exclusive',
  title: 'Your recipe. Our expertise.',
  description:
    "Every great pizza kitchen has a secret. We'll help you keep it. TJ's works " +
    'directly with chefs and operators to develop bespoke dough ball recipes — built ' +
    'to your exact specification, produced under strict confidentiality, and delivered ' +
    'consistently at scale.',
  points: [
    'Custom hydration, flour blend and fermentation profile',
    'Your flavour, your texture, your brand — nobody else’s',
    'Custom weights and sizes from 150g to 600g+',
    'Produced under full confidentiality agreement',
    'Consistent quality at commercial volumes',
  ],
  cta: 'Talk to us about your recipe',
};
