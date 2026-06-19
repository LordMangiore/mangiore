// N.O.V.A. engine, tunable constants.
//
// One place for every threshold, weight, and band. Values are seeded from the
// recommended defaults in the spec corpus (_Build/Open Decisions Checklist).
// They are calibration, not architecture: change them here and every block and
// the lifecycle showpiece move together, because everything computes from this
// one engine.
//
// Note: the Experience Weight scales are an illustrative draft (the equation is
// the deferred "experience weight" layer), label it as such in the UI.

export const TRUST = {
  // Trust Score 0..100 maps to Trust Tier 0..5 (spec 01).
  bands: [
    { tier: 0, min: 0, max: 19, name: 'Silent Observer' },
    { tier: 1, min: 20, max: 39, name: 'Reflective Support' },
    { tier: 2, min: 40, max: 59, name: 'Strategic Ally' },
    { tier: 3, min: 60, max: 74, name: 'Relational Challenger' },
    { tier: 4, min: 75, max: 89, name: 'Invisible Leadership' },
    { tier: 5, min: 90, max: 100, name: 'Covenant' },
  ],
  // Minimum tier that unlocks each capability (the one authoritative gate).
  gates: {
    reflective: 1,
    mirror: 2,
    challenge: 3,
    loadBearingRecognition: 3,
    escalation: 4,
    strategicSilence: 4,
    identityDialogue: 5,
  },
} as const;

// Emotional Load Index governor (spec 08). High load protects: it can only soften.
export const ELI = {
  softCap: 65,
  protectiveHold: 80,
  containment: 92,
} as const;

// Behavioral Baseline Index governor (spec 04). Low foundation protects.
export const BBI = {
  softCap: 59,
  supportMode: 39,
  containment: 19,
} as const;

// Commitment Integrity Score, additive event model (spec 05, Option A).
export const ANCHOR = {
  cisBase: 60,
  depthWeight: [0.5, 0.8, 1.0, 1.3], // Exploratory, Intentional, Committed, Identity-Bound
  cisDelta: {
    completion: 6,
    honestAck: 5,
    selfCorrection: 10,
    recovery: 12,
    miss: -8,
    excuse: -12,
    violation: -20,
  },
} as const;

// Conflict Score bands (spec 06).
export const CONFLICT = {
  bands: [
    { min: 0, max: 24, name: 'Aligned' },
    { min: 25, max: 49, name: 'Soft Drift' },
    { min: 50, max: 74, name: 'Ethical Strain' },
    { min: 75, max: 89, name: 'Active Betrayal' },
    { min: 90, max: 100, name: 'Identity Misalignment' },
  ],
} as const;

// Experience Weight, the "empathy equation" (draft layer). Inputs on a 1..10
// scale for the demo; burden / capacity yields the push/steady/protect verdict.
export const EXPERIENCE_WEIGHT = {
  sliderMin: 1,
  sliderMax: 10,
  ageDaysMin: 7, // a one-week-old
  ageDaysMax: 36500, // ~100 years
  daysPerYear: 365,
  // Experience is a hump over age, not an ever-rising log. Applicable
  // experience rises fast in youth, peaks in midlife, then declines gently in
  // old age as it dates (still wonderful and useful, just off-peak). A
  // log-normal curve over age in days: symmetric in perceived ("expanding")
  // time. This hump in the denominator is what makes empathy a U over age,
  // protected at both ends. Resilience R stays as individual variation.
  humpPeakAgeYears: 65, // where applicable experience peaks
  // Asymmetric (split-normal) in log-age: a gradual rise through youth, then a
  // steeper decline so that by ~100 experience has regressed a lot (back near a
  // mid-teen's level). Larger sigma = gentler.
  humpSigmaLeft: 1.4, // the rise, youth to peak
  humpSigmaRight: 0.38, // the decline, peak to 100
  humpPeak: 4.4, // peak experience value
  humpFloor: 0.3, // a newborn still has a sliver of capacity
  thresholds: { protect: 1.0, steady: 0.2 }, // ew >= protect, >= steady, else push
} as const;
