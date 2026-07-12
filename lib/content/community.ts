/**
 * Community section content: DinoBite competition, recipe teasers, and the
 * home-cook guide. All copy from the legacy site (#community and #homecook).
 */

export type CompetitionPrize = {
  place: string;
  detail: string;
};

export type Competition = {
  name: string;
  tag: string;
  blurb: string;
  prizes: CompetitionPrize[];
  /** fields collected by the legacy entry form */
  entryFields: string[];
  photoRequirements: string;
  consentNote: string;
  /** fallback inbox the legacy form told users to email on error */
  entriesEmail: string;
  successMessage: string;
};

export const competition: Competition = {
  name: 'The Great DinoBite Challenge',
  tag: 'Current Competition',
  blurb:
    'Make a pizza on our DinoBite dinosaur base, get the kids to go wild with the ' +
    'toppings, snap a photo and submit it. Our team will judge every entry — the most ' +
    'creative pizza wins a prize pack for the whole family.',
  prizes: [
    { place: '1st', detail: "TJ's Family Prize Pack + $100 voucher" },
    { place: '2nd', detail: "TJ's Dough Ball Bundle" },
    { place: '3rd', detail: "TJ's Product Hamper" },
  ],
  entryFields: [
    'Your name',
    "Child's name & age",
    'Email address',
    'Pizza photo',
    'Tell us about your pizza creation (optional)',
  ],
  photoRequirements: 'JPG, PNG or HEIC · Max 10MB',
  consentNote:
    "By entering you agree to TJ's using your photo on social media. Competition open " +
    'to Australian residents.',
  entriesEmail: 'tjspizza@live.com.au',
  successMessage:
    "Thanks for entering the DinoBite Challenge! We'll be in touch if you're a winner.",
};

export type RecipeTeaser = {
  tag: string;
  title: string;
  description: string;
  time: string;
  temp: string;
  serves: string;
};

export const recipes: RecipeTeaser[] = [
  {
    tag: 'Classic',
    title: 'Margherita',
    description:
      'San Marzano tomatoes, fresh fior di latte, basil. The one that started it all. ' +
      'Perfect in any oven.',
    time: '15 min',
    temp: '280°C',
    serves: 'Serves 2',
  },
  {
    tag: 'Wood Fire',
    title: 'Prosciutto & Rocket',
    description:
      'White base, fresh mozzarella, prosciutto crudo added post-bake with rocket and ' +
      'lemon. Restaurant quality at home.',
    time: '10 min',
    temp: '400°C+',
    serves: 'Serves 2',
  },
  {
    tag: 'Kids',
    title: 'DinoBite Pizza',
    description:
      'Let the kids go wild on our dinosaur shaped base. Tomato, cheese, and whatever ' +
      "toppings they choose — it's their pizza.",
    time: '12 min',
    temp: '220°C',
    serves: 'Serves 1 kid',
  },
];

export type HomeCookStep = {
  step: string;
  title: string;
  body: string;
};

/** "Restaurant quality. Your kitchen." — 4-step guide from the legacy #homecook section */
export const homeCookSteps: HomeCookStep[] = [
  {
    step: '01',
    title: 'Take it from the freezer',
    body:
      'Pull a dough ball out the morning of, or defrost on the bench for 2–3 hours ' +
      'before cooking.',
  },
  {
    step: '02',
    title: 'Stretch it out',
    body:
      'Press from the centre outward with your fingertips. Lift and let gravity do the ' +
      'stretching.',
  },
  {
    step: '03',
    title: 'Top it your way',
    body:
      "Sauce, cheese, whatever's in the fridge. Less is more — 3 or 4 toppings let the " +
      'base shine.',
  },
  {
    step: '04',
    title: 'Crank the oven',
    body: '250–280°C on a baking stone, 8–12 minutes. Wood fire: 60–90 secs at 400°C+.',
  },
];

export type HomeCookTip = {
  title: string;
  body: string;
};

export const homeCookTips: HomeCookTip[] = [
  {
    title: 'Home oven',
    body: '250–280°C, baking stone or heavy tray, bottom shelf. 8–12 minutes.',
  },
  {
    title: 'Wood fire oven',
    body: '400°C+. 60–90 seconds. Rotate once halfway. Our dough balls were made for this.',
  },
  {
    title: 'Kids pizza night',
    body: 'Use our 6" base or DinoBite shape. Kids top their own — dinner and activity sorted.',
  },
  {
    title: 'Ask Forno',
    body: 'Our AI pizza expert knows every tip, trick and topping combo.',
  },
];

/**
 * Where to buy for home cooks.
 * NOTE: the legacy hero CTA promised "Recipes, tips & where to buy" but the page
 * never named any retail stockists — dough balls are sold wholesale via PFD Food
 * Services and direct from the Warnervale factory. Confirm retail stockists with
 * Paul before publishing a where-to-buy section.
 */
export const whereToBuy = {
  wholesale: 'PFD Food Services nationally and direct from the Warnervale factory',
  retailStockists: [] as string[],
};

/**
 * From the product sheet PDF — home thaw/proof instructions (more detailed than
 * the legacy site's "defrost on the bench for 2–3 hours" quick guide).
 */
export const pdfThawInstructions = [
  'Thaw: Place dough balls directly from the freezer into your desired storage ' +
    'container. Allow to thaw in the refrigerator for at least 24 hours. For even ' +
    'better results, a longer proving time in the fridge will enhance flavour and ' +
    'texture, resulting in a light, airy, authentic Italian-style crust.',
  'Proof: After thawing, let rest at room temperature for 1–2 hours before shaping.',
  'Shape & Cook: Stretch to your desired size, top, and cook using your preferred method.',
];
