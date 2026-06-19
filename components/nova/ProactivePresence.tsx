'use client';

// Block 7: proactive presence. Flip the ambient signals and watch the
// convergence gate decide whether N.O.V.A. speaks first, or stays quiet, and
// why. The thing that actually makes it different. Computes from the engine.

import { useMemo, useState } from 'react';
import { runProactive, type ProactiveInput } from '@/lib/nova-engine';
import styles from './nova.module.css';

type Flag = 'missedAnchor' | 'commute' | 'highStakes' | 'quietHours' | 'silenceToken';

const SIGNALS: { key: Flag; label: string; suppress?: boolean }[] = [
  { key: 'missedAnchor', label: 'A health anchor was missed' },
  { key: 'commute', label: 'Commute just started' },
  { key: 'highStakes', label: 'Big day on the calendar' },
  { key: 'quietHours', label: 'Quiet hours', suppress: true },
  { key: 'silenceToken', label: 'User set a Silence token', suppress: true },
];

export default function ProactivePresence() {
  const [f, setF] = useState<Record<Flag, boolean>>({ missedAnchor: true, commute: true, highStakes: true, quietHours: false, silenceToken: false });
  const [tier, setTier] = useState(3);
  const [eli, setEli] = useState(35);

  const input: ProactiveInput = { ...f, tier, eli };
  const r = useMemo(() => runProactive(input), [f, tier, eli]);

  return (
    <div className={styles.wrap}>
      <div className={styles.presetsLabel}>Ambient signals:</div>
      <div className={styles.presets} style={{ marginBottom: '1rem' }}>
        {SIGNALS.map((s) => (
          <button
            key={s.key}
            aria-pressed={f[s.key]}
            className={`${styles.toggle} ${s.suppress ? styles.toggleSuppress : ''} ${f[s.key] ? styles.toggleOn : ''}`}
            onClick={() => setF((p) => ({ ...p, [s.key]: !p[s.key] }))}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Health trust</span>
        <input className={styles.range} type="range" min={0} max={5} step={1} value={tier} onChange={(e) => setTier(+e.target.value)} aria-label="Health trust tier" />
        <span className={styles.val}>T{tier}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Emotional load</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={eli} onChange={(e) => setEli(+e.target.value)} aria-label="Emotional load" />
        <span className={styles.val} style={{ width: '2rem' }}>{eli}</span>
      </div>
      <div className={styles.ageNote}>Convergence {r.convergence} / 100 (stake 40 + moment 30 + salience 30). It needs 50 even to be a candidate, then every gate has to pass.</div>

      <div className={styles.verdict} style={{ marginTop: '1rem' }}>
        <div className={styles.verdictLabel} style={r.decided ? undefined : { color: 'var(--steel)' }}>{r.verdict}</div>
        <div className={styles.verdictReason}>{r.reason}</div>
        {r.message && <div className={styles.msg} style={{ marginTop: '0.7rem' }}>&ldquo;{r.message}&rdquo;</div>}
      </div>
    </div>
  );
}
