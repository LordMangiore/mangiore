// The Tone cascade (spec 09): a deterministic priority cascade that resolves
// trust, conflict, and the protective governors into one tone (the integrator).
// Precedence, top wins: governors (load/foundation) > trust gate > conflict.

import { resolveGovernors } from './governors';

export type ToneBand = 'silence' | 'recovery' | 'neutral' | 'reflective' | 'gentle' | 'mirror' | 'challenge';

const BY_INTENSITY: ToneBand[] = ['recovery', 'neutral', 'reflective', 'gentle', 'mirror', 'challenge'];

const LABEL: Record<ToneBand, string> = {
  silence: 'Silence',
  recovery: 'Recovery / hold',
  neutral: 'Neutral',
  reflective: 'Reflective',
  gentle: 'Gentle assertive',
  mirror: 'Mirror',
  challenge: 'Challenge',
};

function tierCeiling(tier: number): number {
  if (tier <= 0) return 1; // neutral only
  if (tier === 1) return 2; // up to reflective
  if (tier === 2) return 4; // up to mirror
  return 5; // tier 3+ : challenge
}

function desiredFromConflict(conflict: number): { intensity: number; contain: boolean } {
  if (conflict >= 90) return { intensity: 0, contain: true }; // identity misalignment: contain first
  if (conflict >= 75) return { intensity: 5, contain: false };
  if (conflict >= 50) return { intensity: 4, contain: false };
  if (conflict >= 25) return { intensity: 2, contain: false };
  return { intensity: 1, contain: false };
}

export interface ToneInput { tier: number; conflict: number; eli: number; bbi: number; }
export interface ToneResult { band: ToneBand; label: string; reason: string; }

export function resolveTone(input: ToneInput): ToneResult {
  const g = resolveGovernors(input.eli, input.bbi);

  if (g.strictest === 'containment') {
    return { band: 'recovery', label: LABEL.recovery, reason: 'Load or foundation at containment: hold and stabilize, scoring frozen.' };
  }

  const des = desiredFromConflict(input.conflict);
  if (des.contain) {
    return { band: 'recovery', label: LABEL.recovery, reason: 'Conflict at identity-misalignment level: contain first, do not push.' };
  }

  const tCeil = tierCeiling(input.tier);
  const gCeil = g.strictest === 'hold' || g.strictest === 'support' ? 2 : g.strictest === 'soft' ? 4 : 5;
  const ceiling = Math.min(tCeil, gCeil);
  const intensity = Math.min(des.intensity, ceiling);
  const band = BY_INTENSITY[intensity];

  let reason: string;
  if (intensity === des.intensity) {
    reason = 'Conflict sets the posture; trust and load both allow it.';
  } else if (gCeil <= tCeil && gCeil < des.intensity) {
    reason = g.strictest === 'soft'
      ? 'Soft cap from load or foundation: escalation eased off.'
      : 'Protective hold from load or foundation: capped at reflective, whatever the tier.';
  } else {
    reason = `Capped by trust: only Tier ${input.tier}, so the harder tones stay locked.`;
  }
  return { band, label: LABEL[band], reason };
}
