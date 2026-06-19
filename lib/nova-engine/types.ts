// Shared types for the N.O.V.A. engine.

import { TRUST } from './config';

export type Capability = keyof typeof TRUST.gates;

export type Verdict = 'push' | 'steady' | 'protect';

export interface ExperienceWeightInput {
  problem: number; // novelty of the challenge to them, 1..10
  acuteness: number; // how fresh and acute right now, 1..10
  ageDays: number; // age in literal days; enters the equation as log10(days)
  competence: number; // how equipped for this kind of problem, 1..10
  resilience: number; // general adversity-handling capacity (non-monotonic over a life), 1..10
}

export interface ExperienceWeightResult {
  days: number; // age in days
  experienceFactor: number; // log10(days)
  burden: number; // problem * acuteness
  capacity: number; // experienceFactor * competence * resilience
  ew: number; // burden / capacity
  verdict: Verdict;
  label: string;
  reason: string;
  position: number; // 0..100, needle position on the push..protect spectrum
}

export type GovernorState = 'normal' | 'soft' | 'hold' | 'support' | 'containment';
