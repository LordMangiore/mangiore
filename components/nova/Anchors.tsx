'use client';

// Block 6: anchors and integrity (CIS). A commitment's integrity moves on an
// additive event model, and honesty is rewarded over excuse: an honest miss
// barely dents it, an excuse cuts deep. Computes from the shared engine.

import { useState } from 'react';
import { newAnchor, applyAnchorEvent, type AnchorEventKind, type AnchorStatus } from '@/lib/nova-engine';
import styles from './nova.module.css';

const BUTTONS: { kind: AnchorEventKind; label: string }[] = [
  { kind: 'completed', label: 'Completed' },
  { kind: 'honestMiss', label: 'Missed, owned it' },
  { kind: 'excuseMiss', label: 'Missed, excuse' },
  { kind: 'recovered', label: 'Came back unprompted' },
  { kind: 'violated', label: 'Broke it' },
];

const STATUS_NOTE: Record<AnchorStatus, string> = {
  Active: 'Held. On track.',
  Missed: 'Missed, in grace. No escalation yet.',
  Recovered: 'Recovered. Forgiven, not banked.',
  Violated: 'Violated. Trust takes the hit.',
};

export default function Anchors() {
  const [a, setA] = useState(newAnchor());

  return (
    <div className={styles.wrap}>
      <div className={styles.domain}>
        <div className={styles.domainHead}>
          <span className={styles.domainName}>Anchor: &ldquo;Train 4x a week&rdquo;</span>
          <span className={styles.domainTier}>Committed &middot; Health</span>
        </div>
        <div className={styles.scoreTrack}>
          <div className={styles.scoreFill} style={{ width: `${a.cis}%` }} />
        </div>
        <div className={styles.ageNote} style={{ marginTop: '0.5rem' }}>
          CIS {a.cis} &middot; {a.status}
          {a.lastDelta !== 0 && (
            <> &middot; {a.lastLabel}: {a.lastDelta > 0 ? '+' : ''}{a.lastDelta}</>
          )}
        </div>
        <div className={styles.verdictReason} style={{ margin: '0.4rem 0 0.8rem' }}>{STATUS_NOTE[a.status]}</div>
        <div className={styles.btnRow}>
          {BUTTONS.map((b) => (
            <button key={b.kind} className={styles.miniBtn} onClick={() => setA((prev) => applyAnchorEvent(prev, b.kind))}>
              {b.label}
            </button>
          ))}
          <button className={styles.miniBtn} onClick={() => setA(newAnchor())}>Reset</button>
        </div>
      </div>
      <p className={styles.presetsLabel} style={{ marginTop: '1rem' }}>
        Notice: &ldquo;Missed, owned it&rdquo; costs 3, &ldquo;Missed, excuse&rdquo; costs 12. Same outcome, different honesty.
      </p>
    </div>
  );
}
