// The four lanes. Each is a real, crawlable page with its own title,
// description, genuine copy, and a concrete "what's included" list.
// Copy follows the house voice: declarative, no filler, no em-dashes.

export type Lane = {
  slug: string;
  code: string; // mono index code, e.g. A1
  title: string; // short nav/heading title
  metaTitle: string; // <title>
  metaDescription: string;
  summary: string; // one line, used on the homepage lane grid
  lead: string; // opening statement on the lane page
  body: string[]; // body paragraphs
  included: { label: string; detail: string }[]; // what's included spec list
};

export const LANES: Lane[] = [
  {
    slug: 'product-design-and-build',
    code: 'A1',
    title: 'Product design & build',
    metaTitle: 'Product Design & Build | Mangiore',
    metaDescription:
      'Web, apps, and platforms taken from idea to shipped. Designed, engineered, and operated to a product standard by the studio that builds and runs its own software.',
    summary:
      'Web, apps, and platforms taken from idea to shipped. Designed, engineered, and run, not mocked up and handed off.',
    lead: 'We take products from idea to shipped, then keep them running. The same people design the interface, write the code, and own what happens after launch.',
    body: [
      'Most shops draw the picture and leave before the hard part. We build for the version of you that has to live with the result, because that is exactly the position we are in with our own product. Decisions get made by people who will be on the hook for them.',
      'A build is one continuous responsibility from the first sketch to the thing running in production. Design that ignores how it gets built produces drawings. Engineering that ignores how it feels produces machinery. We hold both at once, which is the only way either one comes out right.',
    ],
    included: [
      { label: 'Discovery', detail: 'Product definition, scope, and the shape of the thing before code' },
      { label: 'Design', detail: 'Interface and interaction design, design system, prototypes' },
      { label: 'Engineering', detail: 'Frontend and backend, built to a standard we would run ourselves' },
      { label: 'Operations', detail: 'Deployment, monitoring, and the work that keeps it alive after launch' },
    ],
  },
  {
    slug: 'systems-and-integrations',
    code: 'A2',
    title: 'Systems & integrations',
    metaTitle: 'Systems & Integrations | Mangiore',
    metaDescription:
      'CMS, CRM, ERP, and payments wired together so they actually behave. The integration work everything else quietly depends on, built and monitored to a product standard.',
    summary:
      'CMS, CRM, ERP, and payments wired together so they actually behave. The unglamorous work everything else depends on.',
    lead: 'We connect the systems a business already runs on so they behave as one. This is the plumbing nobody photographs and everything depends on.',
    body: [
      'A business accumulates tools. A CMS, a CRM, an ERP, a payment processor, a dozen point solutions, each correct on its own and none of them speaking the same language. The cost shows up as duplicate data, manual re-entry, and numbers that do not reconcile. We make them behave.',
      'Integration work is unforgiving because it fails quietly. A webhook that silently drops, a sync that runs backward, a total that is off by a rounding error nobody can find. We build these connections to be observable and correct, so when something does go wrong you find out before your customer does.',
    ],
    included: [
      { label: 'Architecture', detail: 'Integration design across the systems you already run' },
      { label: 'Plumbing', detail: 'APIs, webhooks, and event flows that are observable, not silent' },
      { label: 'Data', detail: 'Modeling, migration, and reconciliation so the numbers agree' },
      { label: 'Payments', detail: 'Billing and payment flows wired to behave under real load' },
    ],
  },
  {
    slug: 'digital-modernization',
    code: 'A3',
    title: 'Digital modernization',
    metaTitle: 'Digital Modernization | Mangiore',
    metaDescription:
      'For established businesses: found on search, fast on a phone, and built to convert. Modern without the agency theater, by a studio held to a product standard.',
    summary:
      'For established businesses: found on search, fast on a phone, built to convert. Modern, without the agency theater.',
    lead: 'We make established businesses genuinely modern. Found on search, fast on a phone, and built so the visit turns into a customer.',
    body: [
      'An established business usually has the hardest part already solved. It has customers, a reputation, and a thing people actually want. What it often has is a digital presence that undersells all of it: slow, hard to find, awkward on the device most people are holding when they look.',
      'Modern is not a coat of paint. It is the site loading instantly, ranking for what you sell, reading clearly on a phone, and making the next step obvious. We bring the same standard we hold our own product to, without the agency theater, the jargon, or the retainer that bills for motion instead of results.',
    ],
    included: [
      { label: 'Rebuild', detail: 'A site that is fast by construction and reads clearly on a phone' },
      { label: 'Findability', detail: 'Technical SEO and structure so you rank for what you sell' },
      { label: 'Conversion', detail: 'A clear path from visit to customer, measured honestly' },
      { label: 'Foundation', detail: 'Performance, accessibility, and analytics that hold up over time' },
    ],
  },
  {
    slug: 'fractional-product-ownership',
    code: 'A4',
    title: 'Fractional product ownership',
    metaTitle: 'Fractional Product Ownership | Mangiore',
    metaDescription:
      'Senior product direction for teams that need the judgment, not another full-time hire. Strategy, prioritization, and standards held by an operator who ships.',
    summary:
      'Senior product direction for teams that need the judgment, not another full-time hire to carry it.',
    lead: 'We provide senior product direction for teams that need the judgment, not another full-time hire to carry it.',
    body: [
      'Plenty of teams have engineers, a roadmap, and a backlog, and still ship the wrong thing. What is missing is the person who decides what right is, says no to the easy version, and holds the standard when a date is pushing the other way. That role does not always need to be full time. It always needs to be senior.',
      'We embed as the product owner you would hire if you could find one, at the level of involvement the work actually requires. We set direction, sharpen priorities, write the standard down, and stay accountable for the outcome. This is the same judgment we apply to our own product, rented by the part you need.',
    ],
    included: [
      { label: 'Direction', detail: 'Product strategy and a roadmap tied to outcomes, not output' },
      { label: 'Prioritization', detail: 'Hard calls on what ships, what waits, and what gets cut' },
      { label: 'Standards', detail: 'A written bar for quality the team can hold without you in the room' },
      { label: 'Accountability', detail: 'A senior owner on the hook for the result, at a fraction of a hire' },
    ],
  },
];

export function getLane(slug: string): Lane | undefined {
  return LANES.find((l) => l.slug === slug);
}

export function otherLanes(slug: string): Lane[] {
  return LANES.filter((l) => l.slug !== slug);
}
