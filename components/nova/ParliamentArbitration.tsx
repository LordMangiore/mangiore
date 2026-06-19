'use client';

// The parliament: regions bid on an event, the context sets exchange rates, and
// trust (the recursive scorekeeper) decides which bid counts. Watch a loud but
// distrusted region get overridden. Computes from the shared engine.

import { useMemo, useState } from 'react';
import { runArbitration, REGIONS, type Vec, type RegionId } from '@/lib/nova-engine';
import styles from './nova.module.css';

const EVENTS: { label: string; match: Vec; stakes: number }[] = [
  { label: 'A real danger', match: { threat: 9, reward: 2, deliberation: 4, identity: 2 }, stakes: 85 },
  { label: 'A tempting reward', match: { threat: 1, reward: 9, deliberation: 3, identity: 2 }, stakes: 30 },
  { label: 'Ambiguous, high stakes', match: { threat: 6, reward: 6, deliberation: 7, identity: 5 }, stakes: 75 },
  { label: 'Nothing much (control)', match: { threat: 1, reward: 1, deliberation: 1, identity: 1 }, stakes: 10 },
  { label: 'An identity challenge', match: { threat: 2, reward: 3, deliberation: 4, identity: 9 }, stakes: 55 },
];

const PEOPLE: { label: string; trust: Vec }[] = [
  { label: 'Balanced', trust: { threat: 60, reward: 60, deliberation: 60, identity: 60 } },
  { label: 'Anxious', trust: { threat: 90, reward: 40, deliberation: 50, identity: 50 } },
  { label: 'Impulsive', trust: { threat: 40, reward: 90, deliberation: 30, identity: 45 } },
  { label: 'Reflective', trust: { threat: 50, reward: 45, deliberation: 90, identity: 65 } },
  { label: 'Has learned to distrust its reward', trust: { threat: 60, reward: 15, deliberation: 75, identity: 60 } },
];

export default function ParliamentArbitration() {
  const [match, setMatch] = useState<Vec>(EVENTS[1].match);
  const [stakes, setStakes] = useState(EVENTS[1].stakes);
  const [trust, setTrust] = useState<Vec>(PEOPLE[2].trust);

  const r = useMemo(() => runArbitration({ match, trust, stakes }), [match, trust, stakes]);
  const maxRaw = Math.max(1, ...r.regions.map((x) => x.rawBid));

  return (
    <div className={styles.wrap}>
      <div className={styles.presetsLabel}>The event:</div>
      <div className={styles.presets} style={{ marginBottom: '0.8rem' }}>
        {EVENTS.map((e) => (
          <button key={e.label} className={styles.presetBtn} onClick={() => { setMatch(e.match); setStakes(e.stakes); }}>
            {e.label}
          </button>
        ))}
      </div>

      <div className={styles.domainList}>
        {r.regions.map((reg) => {
          const isWinner = r.decided && r.winner?.id === reg.id;
          return (
            <div key={reg.id} className={styles.domain} style={isWinner ? { borderColor: 'var(--pine-bright)' } : undefined}>
              <div className={styles.domainHead}>
                <span className={styles.domainName}>
                  {reg.name}
                  {isWinner && <span className={styles.winBadge}>wins</span>}
                </span>
                <span className={styles.domainTier}>{reg.action}</span>
              </div>
              <div className={styles.regionTrack}>
                <div className={styles.loud} style={{ width: `${(reg.rawBid / maxRaw) * 100}%` }} />
                <div className={styles.act} style={{ width: `${(reg.activation / maxRaw) * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.verdict} style={{ marginTop: '1rem' }}>
        <div className={styles.verdictLabel}>{r.decided ? `Decision: ${r.winner?.action}` : 'No decision'}</div>
        <div className={styles.verdictReason}>{r.note}</div>
      </div>

      <p className={styles.ageNote} style={{ marginTop: '1rem' }}>
        Light bar = how loud the region bid. Solid bar = how much it counts after trust. Stakes lift the safety axis.
      </p>
      <div className={styles.row}>
        <span className={styles.label}>Stakes</span>
        <input className={styles.range} type="range" min={0} max={100} step={1} value={stakes} onChange={(e) => setStakes(+e.target.value)} aria-label="Stakes" />
        <span className={styles.val} style={{ width: '2rem' }}>{stakes}</span>
      </div>
      {REGIONS.map((reg) => (
        <div className={styles.row} key={reg.id}>
          <span className={styles.label}>{reg.name} trust</span>
          <input
            className={styles.range}
            type="range"
            min={0}
            max={100}
            step={1}
            value={trust[reg.id]}
            onChange={(e) => setTrust((p) => ({ ...p, [reg.id]: +e.target.value } as Vec))}
            aria-label={`${reg.name} trust`}
          />
          <span className={styles.val} style={{ width: '2rem' }}>{trust[reg.id]}</span>
        </div>
      ))}

      <div className={styles.presetsLabel} style={{ marginTop: '0.8rem' }}>The person (a trust vector):</div>
      <div className={styles.presets}>
        {PEOPLE.map((p) => (
          <button key={p.label} className={styles.presetBtn} onClick={() => setTrust(p.trust)}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
