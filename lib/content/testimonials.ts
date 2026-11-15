import type { Testimonial } from './types';

// Only quotes that also appear on the old WordPress site are published. Two
// unattributable quotes ("Marco P.", "Sarah M.") were removed in the design
// audit. TODO: get venue names and suburbs for these two, and add named venues.
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
];
