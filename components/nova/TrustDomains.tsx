'use client';

// Block 2: earned directness. Trust is tracked per area of life, so N.O.V.A.
// can challenge you about training while staying gentle about grief. Keep or
// miss commitments and watch the tier, and the tones it unlocks, move, per
// domain. Computes from the shared engine (Trust gate, spec 01).

import { useState } from 'react';
import { tierForScore, tierName, canUse } from '@/lib/nova-engine';
import styles from './nova.module.css';

interface Dom { id: string; name: string; score: number; }

const START: Dom[] = [
  { id: 'health', name: 'Health & Body', score: 66 },
  { id: 'work', name: 'Work & Craft', score: 52 },
  { id: 'relationships', name: 'Relationships', score: 24 },
  { id: 'identity', name: 'Identity & Meaning', score: 80 },
];

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export default function TrustDomains() {
  const [doms, setDoms] = useState<Dom[]>(START);
  const nudge = (id: string, d: number) =>
    setDoms((prev) => prev.map((x) => (x.id === id ? { ...x, score: clamp(x.score + d) } : x)));

  return (
    <div className={styles.domainList}>
      {doms.map((dom) => {
        const tier = tierForScore(dom.score);
        const caps = [
          { label: 'Reflect', on: canUse('reflective', tier) },
          { label: 'Mirror', on: canUse('mirror', tier) },
          { label: 'Challenge', on: canUse('challenge', tier) },
          { label: 'Load-bearing', on: canUse('loadBearingRecognition', tier) },
        ];
        return (
          <div className={styles.domain} key={dom.id}>
            <div className={styles.domainHead}>
              <span className={styles.domainName}>{dom.name}</span>
              <span className={styles.domainTier}>
                {dom.score} &middot; Tier {tier} &middot; {tierName(tier)}
              </span>
            </div>
            <div className={styles.scoreTrack}>
              <div className={styles.scoreFill} style={{ width: `${dom.score}%` }} />
            </div>
            <div className={styles.caps}>
              {caps.map((c) => (
                <span key={c.label} className={`${styles.cap} ${c.on ? styles.capOn : styles.capOff}`}>
                  {c.label}
                </span>
              ))}
            </div>
            <div className={styles.btnRow}>
              <button className={styles.miniBtn} onClick={() => nudge(dom.id, 6)}>Kept it</button>
              <button className={styles.miniBtn} onClick={() => nudge(dom.id, -8)}>Missed it</button>
              <button className={styles.miniBtn} onClick={() => nudge(dom.id, 12)}>Recovered</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
