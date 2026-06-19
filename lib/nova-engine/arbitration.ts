// Recursive trust-arbitration: a parliament of regions bidding on an event,
// with no central referee. Each region's bid = how well the event matches its
// mandate, times the context exchange-rate (experience-weight: stakes lift the
// safety axis), times the trust the system has learned to place in that region.
// The last term is the recursive scorekeeper: a loud but distrusted region
// loses to a quieter, trusted one. The winner suppresses the rest. That
// suppression is the decision.

export type RegionId = 'threat' | 'reward' | 'deliberation' | 'identity';

export interface Region { id: RegionId; name: string; action: string; }

export const REGIONS: Region[] = [
  { id: 'threat', name: 'Threat', action: 'Get to safety' },
  { id: 'reward', name: 'Reward', action: 'Go for it' },
  { id: 'deliberation', name: 'Deliberation', action: 'Think it through' },
  { id: 'identity', name: 'Identity', action: 'Stay true to who you are' },
];

export type Vec = Record<RegionId, number>;

export interface ArbInput {
  match: Vec; // 0..10, how strongly the event hits each mandate
  trust: Vec; // 0..100, the person: learned reliability of each region
  stakes: number; // 0..100, context (lifts the safety exchange-rate)
}

export interface ArbRegionResult { id: RegionId; name: string; action: string; rawBid: number; activation: number; }
export interface ArbResult { regions: ArbRegionResult[]; winner: ArbRegionResult | null; decided: boolean; note: string; }

const NO_FIRE = 1.5; // below this, nothing crosses threshold (grounding control)

function exchangeRate(id: RegionId, stakes: number): number {
  if (id === 'threat') return 1 + (stakes / 100) * 2; // safety converts higher under stakes
  if (id === 'identity') return 1.2;
  return 1;
}

export function runArbitration(input: ArbInput): ArbResult {
  const regions: ArbRegionResult[] = REGIONS.map((r) => {
    const rate = exchangeRate(r.id, input.stakes);
    const rawBid = input.match[r.id] * rate; // loudness, before trust
    const activation = rawBid * (input.trust[r.id] / 100); // trust gates the bid
    return { id: r.id, name: r.name, action: r.action, rawBid, activation };
  });

  const winner = regions.reduce((a, b) => (b.activation > a.activation ? b : a));
  const decided = winner.activation >= NO_FIRE;
  const loudest = regions.reduce((a, b) => (b.rawBid > a.rawBid ? b : a));

  let note: string;
  if (!decided) {
    note = 'Nothing crosses threshold. A grounded mind stays quiet on a nothing-event.';
  } else if (loudest.id !== winner.id) {
    note = `${loudest.name} fired loudest, but it is distrusted, so ${winner.name} overrides it. That override is the difference between a mind enslaved to its loudest signal and one that can govern it.`;
  } else {
    note = `${winner.name} wins the bid. The decision: ${winner.action.toLowerCase()}.`;
  }

  return { regions, winner: decided ? winner : null, decided, note };
}
