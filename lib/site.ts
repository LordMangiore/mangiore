// Single source of truth for entity-level facts. Nothing here is decorative;
// it is the information an Apple verifier or a prospect uses to decide the
// company is real.

export const SITE = {
  name: 'Mangiore',
  legalName: 'Mangiore LLC',
  domain: 'mangiore.com',
  baseUrl: 'https://mangiore.com',
  email: 'hello@mangiore.com',
  location: 'Greater St. Louis, Missouri',
  // The principal is named and present.
  principal: 'Nicho Mangiore',
  tagline: 'Digital Product & Systems Studio',
  description:
    'Mangiore is a digital product and systems studio. We design, build, and run software to a product standard, and bring that same rigor to making established businesses modern. BetterCram is our flagship.',
  // Shared social card. Referenced explicitly on every page because a
  // page-level openGraph object replaces the file-convention image.
  ogImage: { url: '/og.png', width: 1200, height: 630 },
  flagship: {
    name: 'BetterCram',
    url: 'https://bettercram.com',
    domain: 'bettercram.com',
    category: 'AI-native learning',
    status: 'In production',
    platform: 'Web',
  },
} as const;
