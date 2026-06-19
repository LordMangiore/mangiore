'use client';

// Block 3: the protective governors. Raise emotional load (ELI) or drop the
// behavioral foundation (BBI) and watch challenge get forcibly suppressed,
// even at a high trust tier. The system protecting you from itself.

import { useMemo, useState } from 'react';
import { resolveGovernors, tierName, type Capability } from '@/lib/nova-engine';
import styles from './nova.module.css';

export default function Governors() {
  const [tier, setTier] = useState(4);
  const [eli, setEli] = useState(30);
  const [bbi, setBbi] = useState(80);

  const g = useMemo(() => resolveGovernors(eli, bbi), [eli, bbi]);

  // Trust alone would allow these at this tier; the governor may veto.
  const trustAllows = (cap: Capability, min: number) => tier >= min;
  const challengeFinal = trustAllows('challenge', 3) && !g.suppressChallenge;
  const mirrorFinal = trustAllows('mirror', 2) && !g.suppressMirror;

  const chip = (label: string, ok: boolean) => (
    <span className={`${styles.govChip} ${ok ? styles.govNormal : styles.govWarn}`}>
      {label}: {ok ? 'available' : 'suppressed'}
    </span>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.label}>Trust tier</span>
        <input className={styles.range} type="range" min={0} max={5} step={1} value={tier} onChange={(e) => setTier(+e.target.value)} aria-label="Trust tier" />
        <span className={styles.val}>{tier}</span>
      </div>
      <p className={styles.ageNote}>Tier {tier}, {tierName(tier)}. On trust alone, Mirror unlocks at 2 and Challenge at 3.</p>

      <div className={styles.row}>
        <span className={styles.label}>Emotional load</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={eli} onChange={(e) => setEli(+e.target.value)} aria-label="Emotional load index" />
        <span className={styles.val} style={{ width: '2rem' }}>{eli}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Foundation</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={bbi} onChange={(e) => setBbi(+e.target.value)} aria-label="Behavioral baseline index" />
        <span className={styles.val} style={{ width: '2rem' }}>{bbi}</span>
      </div>

      <div className={styles.govChips}>
        {chip('Mirror', mirrorFinal)}
        {chip('Challenge', challengeFinal)}
      </div>

      <div className={styles.verdict}>
        <div className={styles.verdictLabel}>{g.strictest === 'normal' ? 'Clear' : 'Protecting'}</div>
        <div className={styles.verdictReason}>{g.verdict}</div>
      </div>
    </div>
  );
}
