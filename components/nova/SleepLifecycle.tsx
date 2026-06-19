'use client';

// The showpiece: one goal, "sleep 8 hours", run through the whole system. Atlas
// tags each night, CIS / Trust / BBI move, the tone responds, and it ends on
// the proactive moment where N.O.V.A. speaks first. Tone is computed live from
// the shared engine at each step; the rest is a scripted run.

import { useState } from 'react';
import { resolveTone, tierForScore, tierName } from '@/lib/nova-engine';
import styles from './nova.module.css';

interface Step {
  title: string;
  narration: string;
  tag: string;
  cis: number;
  trust: number; // Health-domain trust score
  conflict: number;
  eli: number;
  bbi: number;
  message?: string;
}

const STEPS: Step[] = [
  { title: 'You set an anchor', narration: '"I want to sleep 8 hours." N.O.V.A. binds it as a Committed anchor in the Health domain.', tag: 'Anchor created — Sleep 8h @health', cis: 60, trust: 58, conflict: 10, eli: 25, bbi: 74 },
  { title: 'Night 1 — a good night', narration: 'About 7.9 hours. Atlas reads it from the watch and the quiet house, tags it, and throws the raw away.', tag: 'Behavior:AnchorCompletedUnderFriction [0.93] @health', cis: 66, trust: 62, conflict: 8, eli: 22, bbi: 78 },
  { title: 'Night 2 — a short one', narration: 'Five and a half hours, no comment. A miss, logged without judgment.', tag: 'Behavior:AnchorMissed [0.90] @health', cis: 58, trust: 60, conflict: 30, eli: 35, bbi: 70 },
  { title: 'Night 3 — it stacks', narration: 'Another short night, and this time an excuse. Friction stacks; the foundation dips.', tag: 'Pattern:DriftCycle [0.84] @health', cis: 48, trust: 57, conflict: 52, eli: 52, bbi: 58 },
  { title: 'The turn', narration: '"I have been dodging this. Lights out by eleven." A real, self-started recovery. Forgiven in the moment, not banked.', tag: 'Tone:ReflectionExpressed + RecoveryWithoutPrompt @health', cis: 62, trust: 66, conflict: 18, eli: 38, bbi: 64 },
  { title: 'The proactive moment', narration: 'Next morning: the phone leaves home, a missed night behind, a big day ahead. Health trust has reached Tier 3, load is clear. The signals converge, and for once N.O.V.A. speaks first.', tag: 'Context:CommuteStarted + AnchorMissed@health + HighStakesDay → initiate', cis: 62, trust: 66, conflict: 26, eli: 38, bbi: 66, message: 'Rough night before a big one. Want the short version of the plan, or just quiet to get there?' },
];

export default function SleepLifecycle() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  const tier = tierForScore(s.trust);
  const tone = resolveTone({ tier, conflict: s.conflict, eli: s.eli, bbi: s.bbi });

  return (
    <div className={styles.wrap}>
      <div className={styles.stepDots}>
        {STEPS.map((_, n) => (
          <div key={n} className={`${styles.stepDot} ${n <= i ? styles.stepDotOn : ''}`} />
        ))}
      </div>

      <div className={styles.domainName} style={{ fontSize: '1.05rem' }}>{s.title}</div>
      <p className={styles.verdictReason} style={{ margin: '0.4rem 0 0' }}>{s.narration}</p>

      <div className={styles.lifeTag}>{s.tag}</div>

      {s.message && <div className={styles.msg}>&ldquo;{s.message}&rdquo;</div>}

      <div className={styles.stats}>
        <div className={styles.stat}><div className={styles.statLabel}>Anchor CIS</div><div className={styles.statVal}>{s.cis}</div></div>
        <div className={styles.stat}><div className={styles.statLabel}>Health trust</div><div className={styles.statVal}>{s.trust}<span style={{ fontSize: '0.8rem', color: 'var(--steel)' }}> · T{tier}</span></div></div>
        <div className={styles.stat}><div className={styles.statLabel}>Foundation</div><div className={styles.statVal}>{s.bbi}</div></div>
      </div>

      <div className={styles.ageNote}>Tier {tier} ({tierName(tier)}). N.O.V.A.&rsquo;s tone here: <strong style={{ color: 'var(--pine)' }}>{tone.label}</strong> — {tone.reason}</div>

      <div className={styles.stepBtns}>
        <button className={styles.gateBtn} disabled={i >= STEPS.length - 1} style={i >= STEPS.length - 1 ? { opacity: 0.5 } : undefined} onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}>
          {i >= STEPS.length - 1 ? 'Fin' : 'Next night'}
        </button>
        <button className={styles.presetBtn} onClick={() => setI(0)}>Restart</button>
      </div>
    </div>
  );
}
