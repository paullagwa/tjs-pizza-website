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
 * A spec row without `carton` means the quantity is not confirmed — the UI
 * hides the column and points to the spec sheet instead of printing a dash.
 * `draft: true` ranges are not published (see `productRanges` at the bottom).
 */

/** Kitchen types used by the homepage range filter. */
export const venueTypes = [
  'Wood-fire & Neapolitan',
  'Pub & club',
  'Food truck',
  'School & canteen',
];

const allProductRanges: ProductRange[] = [
  {
    slug: 'frozen-dough-balls',
    useCase: 'Raw, hand-stretched dough for Neapolitan, New York and Roman styles in any oven.',
    bestFor: ['Wood-fire & Neapolitan', 'Food truck', 'Pub & club'],
    name: 'Frozen Dough Ball Range',
    tagline: "TJ's Signature Product",
    description:
      'The heart of what we do. Hand-stretched and frozen at peak freshness. ' +
      'Seventeen sizes from 150g to 1kg — whatever your kitchen requires, we have a size for you. ' +
      'Vegan friendly. Works in every oven — especially wood fire. ' +
      'Perfect for Neapolitan, NY, Roman and artisan pizza. Pull tomorrow’s dough ' +
      'tonight: 24 hours in the cool room, an hour or two on the bench, and it ' +
      'stretches like you made it this morning. ' +
      'Order through PFD Food Services, MOCO or Bidfood, or direct from our Warnervale factory.',
    // Sizes, TJ's codes, carton quantities and distributor order codes come from
    // the TJ's CRM product table (paullagwa-tj-crm, migrations to 12 Nov 2026).
    // Carton quantities are the same across distributors. A row without `carton`
    // is a size TJ's makes whose carton quantity is not confirmed yet.
    specs: [
      { size: '150g', sku: 'Do150', carton: '80/ctn', codes: { PFD: '383561', Bidfood: '219091' } },
      { size: '160g', codes: { MOCO: '34609' } },
      { size: '180g', codes: { MOCO: '34913' } },
      { size: '200g' },
      { size: '220g', sku: 'Do220', carton: '60/ctn', codes: { PFD: '274076', MOCO: '31593', Bidfood: '184426' } },
      { size: '240g', sku: 'Do240', carton: '60/ctn', codes: { PFD: '384576' } },
      { size: '250g', sku: 'Do250', carton: '60/ctn', codes: { PFD: '273315', MOCO: '30906', Bidfood: '184015' } },
      { size: '270g', sku: 'Do270', carton: '50/ctn', codes: { PFD: '385906', MOCO: '31594', Bidfood: '184427' } },
      { size: '300g', sku: 'Do300', carton: '50/ctn', codes: { PFD: '380849', MOCO: '31346', Bidfood: '187190' } },
      { size: '320g', codes: { Bidfood: '220413' } },
      { size: '330g', codes: { MOCO: '31673', Bidfood: '207560' } },
      { size: '350g', sku: 'Do350', carton: '40/ctn', codes: { PFD: '274662' } },
      { size: '400g', codes: { Bidfood: '202135' } },
      { size: '480g', codes: { Bidfood: '220371' } },
      { size: '560g', codes: { MOCO: '34610' } },
      { size: '600g', sku: 'Do600', carton: '20/ctn', codes: { PFD: '279591' } },
      { size: '1kg', codes: { Bidfood: '147050' } },
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
    imageAlt: 'Floured hands stretching a ball of pizza dough',
    flagship: true,
    metaDescription:
      'Hand-stretched frozen pizza dough balls in 17 sizes from 150g to 1kg. Vegan friendly, no preservatives. Wholesale from the NSW Central Coast, nationally via PFD.',
  },
  // Traditional Par-Baked Bases removed 2026-11-16 — TJ's no longer offers them.
  {
    slug: 'fresh-frozen',
    name: 'Fresh Frozen Range',
    tagline: 'Par-Baked, Frozen',
    // No card, no specs anywhere in the sources — name only (contact-form dropdown,
    // footer links, footer-seo, old WordPress homepage). Needs Paul's input.
    description:
      'Fresh frozen pizza bases, snap-frozen at peak quality for commercial kitchens. ' +
      'Contact us for current sizes and carton quantities.',
    specs: [],
    dietary: ['No preservatives', 'No soy', 'No milk products'],
    // Unpublished until Jeff/Rhys supply sizes and carton quantities.
    draft: true,
  },
  // Gluten Free Range removed 2026-11-16 — TJ's does not make a gluten free product.
  {
    slug: 'garlic-butter-cheese',
    useCase: 'Pre-topped garlic bases. Freezer to oven to plate with no prep.',
    bestFor: ['Pub & club'],
    name: 'Garlic Butter & Cheese',
    tagline: 'Pre-Topped',
    description:
      'Pre-topped with rich garlic butter and cheese. Freezer to oven to plate. ' +
      'High-margin. Eliminates prep time. Also available as herb, bacon, bruschetta ' +
      'and mushroom & fetta variants.',
    specs: [],
    shelfLife: '12 months frozen',
    dietary: ['No preservatives'], // contains cheese — not vegan / not milk-free
    // No honest photo of this product yet (the legacy image was a stock seafood pizza).
  },
  {
    slug: 'square-pizza-base',
    useCase: 'Slabs cut to any shape for trays, canteens and pub-style pizza.',
    bestFor: ['School & canteen', 'Pub & club'],
    name: 'Square Pizza Base',
    tagline: 'Tray & Slab',
    description:
      'Cut to any shape. Ideal for pub-style pizza, canteen trays, or individual portions. ' +
      'Popular with schools, hospitals and club kitchens. Custom sizes up to half-metre on request.',
    specs: [],
    shelfLife: '12 months frozen',
    dietary: ['No preservatives', 'No soy', 'No milk products'],
    image: '/images/IMG_4008.jpg',
    imageAlt: "A custom half-metre TJ's pizza slab on its tray",
  },
  {
    slug: 'dinobite-kids',
    useCase: 'Dinosaur-shaped par-baked bases for kids menus and canteens.',
    bestFor: ['School & canteen'],
    name: 'DinoBite Kids Pizza Base',
    tagline: 'Kids Range',
    description:
      'Dinosaur-shaped par-baked pizza bases. Fun shapes, same clean ingredients as our ' +
      'full range. Perfect for school canteens, family dining and kids menus. ' +
      'No artificial colours or flavours.',
    specs: [
      {
        size: '6" Dino shape',
        carton: '60/ctn',
        codes: { PFD: '396209', MOCO: '37310', Bidfood: '195137' },
      },
    ],
    shelfLife: '12 months frozen',
    dietary: ['No artificial colours or flavours', 'No preservatives'],
    // Photos supplied by Paul, 16 Nov 2026. The main image is the single base
    // cut out of its bench background. The retail pack photo is not to be used.
    image: '/images/dinobite-base-cut.png',
    imageAlt: 'A dinosaur-shaped par-baked DinoBite pizza base',
    imageCutout: true,
    extraImages: [
      {
        src: '/images/dinobite-bases-stack.jpg',
        alt: 'Three dinosaur-shaped par-baked pizza bases fanned out on a bench',
      },
      {
        src: '/images/dinobite-base.jpg',
        alt: 'A single dinosaur-shaped par-baked pizza base',
      },
    ],
  },
];

/** Published ranges — everything the site renders, links or lists. */
export const productRanges: ProductRange[] = allProductRanges.filter((p) => !p.draft);

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
    'Custom weights and sizes from 150g to 1kg',
    'Produced under full confidentiality agreement',
    'Consistent quality at commercial volumes',
  ],
  cta: 'Talk to us about your recipe',
};
