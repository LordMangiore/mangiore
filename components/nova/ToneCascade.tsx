'use client';

// Block 5: the Tone cascade, the integrator. Trust, conflict, and the
// protective governors resolve, in a fixed precedence, to exactly one tone,
// with the reason it fired. Computes from the shared engine.

import { useMemo, useState } from 'react';
import { resolveTone, tierName } from '@/lib/nova-engine';
import styles from './nova.module.css';

export default function ToneCascade() {
  const [tier, setTier] = useState(3);
  const [conflict, setConflict] = useState(60);
  const [eli, setEli] = useState(25);
  const [bbi, setBbi] = useState(82);

  const t = useMemo(() => resolveTone({ tier, conflict, eli, bbi }), [tier, conflict, eli, bbi]);

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.label}>Trust tier</span>
        <input className={styles.range} type="range" min={0} max={5} step={1} value={tier} onChange={(e) => setTier(+e.target.value)} aria-label="Trust tier" />
        <span className={styles.val}>{tier}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Conflict</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={conflict} onChange={(e) => setConflict(+e.target.value)} aria-label="Conflict score" />
        <span className={styles.val} style={{ width: '2rem' }}>{conflict}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Emotional load</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={eli} onChange={(e) => setEli(+e.target.value)} aria-label="Emotional load" />
        <span className={styles.val} style={{ width: '2rem' }}>{eli}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Foundation</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={bbi} onChange={(e) => setBbi(+e.target.value)} aria-label="Behavioral foundation" />
        <span className={styles.val} style={{ width: '2rem' }}>{bbi}</span>
      </div>
      <p className={styles.ageNote}>Tier {tier}, {tierName(tier)}. The cascade weighs governors first, then the trust gate, then conflict.</p>

      <div className={styles.verdict} style={{ marginTop: '1rem' }}>
        <div className={styles.verdictLabel}>{t.label}</div>
        <div className={styles.verdictReason}>{t.reason}</div>
      </div>

      <div className={styles.presetsLabel}>Try it:</div>
      <div className={styles.presets}>
        <button className={styles.presetBtn} onClick={() => { setTier(4); setConflict(80); setEli(20); setBbi(85); }}>High trust, high conflict</button>
        <button className={styles.presetBtn} onClick={() => { setTier(4); setConflict(80); setEli(85); setBbi(85); }}>Same, but overloaded</button>
        <button className={styles.presetBtn} onClick={() => { setTier(2); setConflict(80); setEli(20); setBbi(85); }}>Same conflict, low trust</button>
      </div>
    </div>
  );
}
