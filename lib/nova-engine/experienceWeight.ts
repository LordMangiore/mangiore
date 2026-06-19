// The Experience Weight ("empathy equation").
//
//   burden   = problem novelty x acuteness
//   capacity = log10(age in days) x competence x resilience
//   ew       = burden / capacity
//
// Age is counted in literal days, log-scaled ("expanding time"): the same event
// is a larger share of fewer days, so it lands heavier on the young. log(days)
// is the accumulated reference frame (monotonic, compressing); resilience R is
// the separate, non-monotonic adversity term. Together they reproduce the
// U-shape: the very young and the frail-old both tend toward protect.
//
// Draft layer: the parameters are illustrative pending ratification.

import { EXPERIENCE_WEIGHT as C } from './config';
import type { ExperienceWeightInput, ExperienceWeightResult, Verdict } from './types';

const VERDICTS: Record<Verdict, { label: string; reason: string }> = {
  protect: {
    label: 'Protect / hold',
    reason: 'Heavier than they can carry right now. N.O.V.A. holds, softens, and does not push.',
  },
  steady: {
    label: 'Steady / reflect',
    reason: 'Real weight, within reach. N.O.V.A. stays close and reflects, no pressure.',
  },
  push: {
    label: 'Can push / challenge',
    reason: 'Well within their capacity. N.O.V.A. has earned room to challenge and press forward.',
  },
};

// Human-readable age from a day count.
export function formatAge(days: number): string {
  if (days < 60) return `${days} days`;
  if (days < 730) return `${Math.round(days / 30)} months`;
  return `${Math.round(days / C.daysPerYear)} yr`;
}

// Applicable experience over age: a log-normal hump. Rises in youth, peaks in
// midlife, declines gently into old age as accumulated experience dates.
export function experienceFactor(days: number): number {
  const x = Math.log(Math.max(1, days));
  const center = Math.log(C.humpPeakAgeYears * C.daysPerYear);
  const sigma = x <= center ? C.humpSigmaLeft : C.humpSigmaRight;
  const raw = C.humpPeak * Math.exp(-((x - center) ** 2) / (2 * sigma ** 2));
  return Math.max(C.humpFloor, raw);
}

// Position on a log spectrum: ew 0.001 -> 0%, ew 100 -> 100%, ew 1 -> 60%.
export function spectrumPosition(ew: number): number {
  const l = Math.log10(ew);
  return Math.max(0, Math.min(100, ((l + 3) / 5) * 100));
}

export function computeExperienceWeight(input: ExperienceWeightInput): ExperienceWeightResult {
  const days = Math.max(1, Math.round(input.ageDays));
  const ef = experienceFactor(days);
  const burden = input.problem * input.acuteness;
  const capacity = ef * input.competence * input.resilience;
  const ew = burden / capacity;

  const verdict: Verdict =
    ew >= C.thresholds.protect ? 'protect' : ew >= C.thresholds.steady ? 'steady' : 'push';

  return {
    days,
    experienceFactor: ef,
    burden,
    capacity,
    ew,
    verdict,
    label: VERDICTS[verdict].label,
    reason: VERDICTS[verdict].reason,
    position: spectrumPosition(ew),
  };
}

export function formatEw(ew: number): string {
  if (ew >= 1) return ew.toFixed(1);
  if (ew >= 0.1) return ew.toFixed(2);
  return ew.toFixed(3);
}
