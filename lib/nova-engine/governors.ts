// The protective governors (specs 04, 08).
//
// Emotional load (ELI) and a failing behavioral foundation (BBI) can only ever
// soften N.O.V.A., never sharpen it. Above threshold they suppress escalation
// regardless of how much trust has been earned. The system protecting the user
// from itself.

import { ELI, BBI } from './config';
import type { GovernorState } from './types';

export function eliGovernor(eli: number): GovernorState {
  if (eli >= ELI.containment) return 'containment';
  if (eli >= ELI.protectiveHold) return 'hold';
  if (eli >= ELI.softCap) return 'soft';
  return 'normal';
}

export function bbiGovernor(bbi: number): GovernorState {
  if (bbi <= BBI.containment) return 'containment';
  if (bbi <= BBI.supportMode) return 'support';
  if (bbi <= BBI.softCap) return 'soft';
  return 'normal';
}

const SEVERITY: Record<GovernorState, number> = {
  normal: 0,
  soft: 1,
  support: 2,
  hold: 3,
  containment: 4,
};

// The strictest governor wins. Returns what is suppressed and a plain verdict.
export function resolveGovernors(eli: number, bbi: number) {
  const e = eliGovernor(eli);
  const b = bbiGovernor(bbi);
  const strictest: GovernorState = SEVERITY[e] >= SEVERITY[b] ? e : b;

  const suppressChallenge = strictest !== 'normal'; // any non-normal stops challenge
  const suppressMirror = SEVERITY[strictest] >= SEVERITY.hold; // hold/support+/containment stop mirror too
  const forceRecovery = SEVERITY[strictest] >= SEVERITY.hold;

  const verdict =
    strictest === 'containment'
      ? 'Containment. Scoring frozen, presence held. N.O.V.A. just stays.'
      : strictest === 'hold' || strictest === 'support'
        ? 'Protective hold. Challenge and mirror suppressed, no matter the trust tier.'
        : strictest === 'soft'
          ? 'Soft cap. Escalation eased off, pacing slowed.'
          : 'Clear. Trust alone decides what is allowed.';

  return { eli: e, bbi: b, strictest, suppressChallenge, suppressMirror, forceRecovery, verdict };
}
