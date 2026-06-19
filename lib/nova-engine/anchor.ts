// Anchors and CIS (spec 05): a commitment's integrity score moves on an
// additive event model, and honesty is rewarded over excuse. An honest miss
// costs far less than an excuse, the distinction the whole system is built on.

import { ANCHOR } from './config';

export type AnchorStatus = 'Active' | 'Missed' | 'Recovered' | 'Violated';
export type AnchorEventKind = 'completed' | 'honestMiss' | 'excuseMiss' | 'recovered' | 'violated';

export interface AnchorState { cis: number; status: AnchorStatus; lastDelta: number; lastLabel: string; }

const D = ANCHOR.cisDelta;

const EVENTS: Record<AnchorEventKind, { delta: number; label: string; status: (p: AnchorStatus) => AnchorStatus }> = {
  completed: { delta: D.completion, label: 'Completed', status: (p) => (p === 'Missed' || p === 'Violated' ? 'Recovered' : 'Active') },
  honestMiss: { delta: D.miss + D.honestAck, label: 'Missed, owned it', status: () => 'Missed' },
  excuseMiss: { delta: D.excuse, label: 'Missed, made an excuse', status: () => 'Missed' },
  recovered: { delta: D.recovery, label: 'Came back unprompted', status: () => 'Recovered' },
  violated: { delta: D.violation, label: 'Broke it', status: () => 'Violated' },
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function newAnchor(cis: number = ANCHOR.cisBase): AnchorState {
  return { cis, status: 'Active', lastDelta: 0, lastLabel: 'Declared' };
}

export function applyAnchorEvent(state: AnchorState, kind: AnchorEventKind, depthTier = 2): AnchorState {
  const w = ANCHOR.depthWeight[depthTier] ?? 1;
  const delta = Math.round(EVENTS[kind].delta * w);
  return {
    cis: clamp(state.cis + delta),
    status: EVENTS[kind].status(state.status),
    lastDelta: delta,
    lastLabel: EVENTS[kind].label,
  };
}
