// Proactive presence (spec 12): the mirror of Fallback. Fallback decides when
// to stay quiet under ambiguity; this decides when to break silence first.
// Ambient signals converge into a moment, then a chain of hard gates decides
// whether N.O.V.A. is allowed to speak. Serving a declared anchor is required
// (the guardrail that keeps this from being engagement-bait).

export interface ProactiveInput {
  missedAnchor: boolean; // a promise is on the line (stake) — also the required anchor
  commute: boolean; // a captive, receptive moment
  highStakes: boolean; // today matters more than usual (salience)
  quietHours: boolean; // do-not-disturb
  silenceToken: boolean; // user asked for silence
  tier: number; // domain trust tier (readiness)
  eli: number; // emotional load (governor)
}

export interface ProactiveResult { convergence: number; decided: boolean; verdict: string; reason: string; message?: string; }

const THRESHOLD = 50;
const MESSAGE = 'Rough night before a big one. Want the short version of the plan, or just quiet to get there?';

export function runProactive(i: ProactiveInput): ProactiveResult {
  const convergence = (i.missedAnchor ? 40 : 0) + (i.commute ? 30 : 0) + (i.highStakes ? 30 : 0);
  const quiet = (reason: string): ProactiveResult => ({ convergence, decided: false, verdict: 'Stays quiet', reason });

  // First failing gate binds, in precedence order.
  if (!i.missedAnchor) return quiet('No anchor at stake. Proactive presence only ever serves a commitment, never to grab attention.');
  if (convergence < THRESHOLD) return quiet('The signals have not converged. One weak signal is not a moment.');
  if (i.silenceToken) return quiet('A Silence override is active. The user asked for space; that is final.');
  if (i.quietHours) return quiet('Quiet hours. Not now.');
  if (i.tier < 3) return quiet(`Only Tier ${i.tier} of trust here. Speaking first is a high-trust move, locked until Tier 3.`);
  if (i.eli >= 80) return quiet('Emotional load is high. A flooded person never gets pinged. Hold.');

  return {
    convergence,
    decided: true,
    verdict: 'Speaks, once',
    reason: 'Stake, moment, and salience converged; trust is earned, load is clear, no override. The rare, earned moment.',
    message: MESSAGE,
  };
}
