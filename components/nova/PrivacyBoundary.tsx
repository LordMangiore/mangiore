'use client';

// Block 4: the privacy boundary. Raw input is abstracted into one small tag at
// the edge and the raw is discarded. The reasoning engine only ever sees the
// tag, so there is nothing to leak (specs 00, 02).

import { useState } from 'react';
import styles from './nova.module.css';

interface Ex { raw: string; tag: string; }

const EXAMPLES: Ex[] = [
  { raw: 'Phone leaves home geofence, 7:10am, heading toward the office', tag: 'Context:CommuteStarted [0.93] @work' },
  { raw: '"ugh, I keep putting off the gym, I am useless"', tag: 'Emotion:ShameLoopDetected [0.82] @health' },
  { raw: '"slept maybe five hours again"', tag: 'Behavior:AnchorMissed [0.90] @health' },
  { raw: 'Smart door opens; no one home for 9 hours', tag: 'Context:HomeAbsent [0.88]' },
];

export default function PrivacyBoundary() {
  const [ex, setEx] = useState<Ex>(EXAMPLES[0]);
  const [typed, setTyped] = useState('');

  const current: Ex = typed.trim()
    ? { raw: `"${typed.trim()}"`, tag: 'Behavior:SignalReceived [0.88]' }
    : ex;

  return (
    <div className={styles.wrap}>
      <div className={styles.flow}>
        <div className={styles.rawBox}>{current.raw}</div>
        <div className={styles.arrow} aria-hidden="true">&rarr;</div>
        <div className={styles.tagBox}>
          <div className={styles.tag}>{current.tag}</div>
          <div className={styles.discard}>raw input discarded at the edge</div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          className={styles.gateInput}
          style={{ width: '100%' }}
          type="text"
          placeholder="Type anything. Watch it become a tag, then vanish."
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          aria-label="Type raw input to abstract"
        />
      </div>

      <div className={styles.presets} style={{ marginTop: '0.8rem' }}>
        {EXAMPLES.map((e) => (
          <button key={e.tag} className={styles.presetBtn} onClick={() => { setTyped(''); setEx(e); }}>
            {e.raw.length > 34 ? e.raw.slice(0, 32) + '...' : e.raw}
          </button>
        ))}
      </div>
    </div>
  );
}
