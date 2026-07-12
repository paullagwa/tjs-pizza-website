import type { TimelineEntry } from './types';

/**
 * The TJ's story timeline — service station (2002) to 2000m² factory.
 * Text verbatim from the legacy site timeline.
 *
 * Section intro on the legacy site: "From a two-customer pizza outlet in a
 * service station to a 2000m² HACCP-certified factory supplying kitchens
 * nationally." Heading was "22 years of doing things right." — compute the
 * year count from business.foundedYear (2002) instead of hard-coding 22.
 */
export const storyIntro =
  'From a two-customer pizza outlet in a service station to a 2000m² ' +
  'HACCP-certified factory supplying kitchens nationally.';

export const timeline: TimelineEntry[] = [
  {
    period: '2002',
    title: 'A service station, a dream',
    // Legacy site spells it "Lake Mummorah"; the actual NSW locality is Lake Munmorah.
    body:
      "TJ's started in a small pizza outlet at Lake Munmorah on the NSW Central Coast. " +
      'Two customers. Unlimited belief.',
  },
  {
    period: '2004',
    title: 'First expansion',
    body: "TJ's moved into a larger bakery at Wyoming. The demand was undeniable.",
  },
  {
    period: '2006',
    title: 'Rhys joins the family',
    body:
      "Rhys Wellfare brought passion and the hand-stretched dough ball that would take TJ's national.",
  },
  {
    period: '2010',
    title: 'The Warnervale factory',
    body:
      '2000m² of state-of-the-art machinery. The dough ball scaled from Central Coast ' +
      'favourite to national product.',
  },
  {
    period: '2015',
    title: 'Owning the future',
    body: 'Jeff and Rhys purchased the factory. Complete control over quality, output, and growth.',
  },
  {
    period: 'Today',
    title: 'Supplying kitchens nationwide',
    body:
      "Hundreds of restaurants, pizza trucks, pubs and clubs trust TJ's every single service.",
  },
];
