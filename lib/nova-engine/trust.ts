// Trust: score to tier, and the capability gate (spec 01).
// Per-domain in the full system; here are the pure helpers the blocks share.

import { TRUST } from './config';
import type { Capability } from './types';

export function tierForScore(score: number): number {
  const s = Math.max(0, Math.min(100, score));
  const band = TRUST.bands.find((b) => s >= b.min && s <= b.max);
  return band ? band.tier : 0;
}

export function tierName(tier: number): string {
  return TRUST.bands.find((b) => b.tier === tier)?.name ?? '';
}

// The one authoritative gate: is a capability unlocked at this tier?
export function canUse(capability: Capability, tier: number): boolean {
  return tier >= TRUST.gates[capability];
}
