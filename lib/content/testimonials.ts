import type { Testimonial } from './types';

// TODO: replace with attributable venue-named testimonials before launch.
// "Marco P." and "Sarah M." have no verifiable venue; Tony Schlick and Steve
// Harris also appear on the old WordPress site (slightly different wording there).
export const testimonials: Testimonial[] = [
  {
    quote:
      'These are the best pizza bases for my mobile pizza truck. Everyone loves them — ' +
      'customers keep coming back just for the base.',
    name: 'Tony Schlick',
    venue: 'Mobile Pizza Truck Owner',
  },
  {
    quote:
      'Working with Rhys has been fantastic. Clear communication, great person to deal ' +
      'with. The product quality speaks for itself.',
    name: 'Steve Harris',
    venue: 'Restaurant Owner, NSW',
  },
  {
    quote:
      "We've tried every supplier. Nothing comes close for consistency. Same quality " +
      'every single delivery.',
    name: 'Marco P.',
    venue: 'Pizzeria Owner, Sydney',
  },
  {
    quote:
      'The gluten free range is the real deal. Our GF customers finally feel like ' +
      "they're getting a great pizza.",
    name: 'Sarah M.',
    venue: 'Cafe & Catering Manager',
  },
];
