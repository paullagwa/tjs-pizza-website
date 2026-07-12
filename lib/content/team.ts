import type { TeamMember } from './types';

/**
 * Team members exactly as on the legacy site (#team section).
 * Note: all three team cards used the legacy inbox tjspizza@live.com.au,
 * while the site's contact section used jeff@tjspizzaproducts.com.au.
 */
export const team: TeamMember[] = [
  {
    name: 'Jeff Knox',
    role: 'Director',
    bio:
      "Jeff is the commercial force behind TJ's. Need pricing, product info, or just " +
      'want to talk pizza — Jeff picks up the phone.',
    phone: '0402 091 718',
    email: 'tjspizza@live.com.au',
    image: '/images/a-1.jpg',
    imageAlt: "Jeff Knox, Director of TJ's Pizza Products",
  },
  {
    name: 'Rhys Wellfare',
    role: 'Managing Director',
    bio:
      "Rhys joined in 2006 and developed the hand-stretched dough ball that took TJ's " +
      'national. He oversees all production quality.',
    phone: '0416 071 022',
    email: 'tjspizza@live.com.au',
    image: '/images/Person.jpg',
    imageAlt: "Rhys Wellfare, Managing Director of TJ's Pizza Products",
  },
  {
    name: 'Paul Lagwa',
    role: 'QLD Sales Executive',
    bio:
      "Paul leads TJ's Queensland sales, working with restaurants, pizza trucks and " +
      'hospitality venues across QLD to find the right product for their kitchen.',
    phone: '0411 635 322',
    email: 'tjspizza@live.com.au',
    // Legacy photo was base64-embedded and does not match any rescued file — no image yet.
  },
];
