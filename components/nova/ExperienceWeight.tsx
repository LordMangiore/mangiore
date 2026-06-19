'use client';

// Block 1: the Experience Weight ("empathy equation"). Age is counted in days
// on a log scale, so the control reaches a newborn and a centenarian alike.
// Same five inputs, same one ratio, opposite right answers. Computes from the
// shared engine.

import { useMemo, useState } from 'react';
import {
  computeExperienceWeight,
  formatAge,
  formatEw,
  EXPERIENCE_WEIGHT,
  type ExperienceWeightInput,
} from '@/lib/nova-engine';
import styles from './nova.module.css';

type Field = keyof ExperienceWeightInput;

const MIN_LOG = Math.log10(EXPERIENCE_WEIGHT.ageDaysMin);
const MAX_LOG = Math.log10(EXPERIENCE_WEIGHT.ageDaysMax);
const idxFromDays = (d: number) => Math.round(((Math.log10(d) - MIN_LOG) / (MAX_LOG - MIN_LOG)) * 1000);
const daysFromIdx = (i: number) => Math.round(10 ** (MIN_LOG + (i / 1000) * (MAX_LOG - MIN_LOG)));

const PRESETS: { label: string; v: ExperienceWeightInput }[] = [
  { label: 'Newborn, 3 weeks', v: { problem: 10, acuteness: 10, ageDays: 21, competence: 1, resilience: 2 } },
  { label: 'Toddler meltdown, 2', v: { problem: 8, acuteness: 9, ageDays: 730, competence: 2, resilience: 3 } },
  { label: 'New driver in the rain, 16', v: { problem: 8, acuteness: 8, ageDays: 5840, competence: 2, resilience: 4 } },
  { label: 'Expert driver, 70', v: { problem: 3, acuteness: 4, ageDays: 25550, competence: 9, resilience: 5 } },
  { label: 'Driving at 82, fading', v: { problem: 5, acuteness: 7, ageDays: 29930, competence: 7, resilience: 2 } },
  { label: 'First heartbreak, 19', v: { problem: 9, acuteness: 9, ageDays: 6935, competence: 2, resilience: 3 } },
  { label: 'Veteran founder, 48', v: { problem: 3, acuteness: 4, ageDays: 17520, competence: 9, resilience: 8 } },
];

export default function ExperienceWeight() {
  const [v, setV] = useState<ExperienceWeightInput>(PRESETS[2].v);
  const r = useMemo(() => computeExperienceWeight(v), [v]);
  const set = (key: Field, value: number) => setV((p) => ({ ...p, [key]: value }));

  const slider = (key: Field, label: string) => (
    <div className={styles.row} key={key}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.range}
        type="range"
        min={1}
        max={10}
        step={1}
        value={v[key]}
        onChange={(e) => set(key, Number(e.target.value))}
        aria-label={label}
      />
      <span className={styles.val}>{v[key]}</span>
    </div>
  );

  return (
    <div className={styles.wrap}>
      <p className={styles.formula}>
        EW = <strong>(Problem &times; Acuteness)</strong> &divide;{' '}
        <strong>(log&#8321;&#8320;(days) &times; Competence &times; Resilience)</strong>
      </p>
      <p className={styles.sub}>age in days, log-scaled: the same event is a bigger share of fewer days</p>

      <div className={styles.groups}>
        <div className={styles.group}>
          <div className={styles.groupTitle}>The weight on them</div>
          {slider('problem', 'Problem novelty')}
          {slider('acuteness', 'Acuteness now')}
        </div>
        <div className={styles.group}>
          <div className={styles.groupTitle}>What they can carry</div>
          <div className={styles.row}>
            <span className={styles.label}>Age</span>
            <input
              className={styles.range}
              type="range"
              min={0}
              max={1000}
              step={1}
              value={idxFromDays(v.ageDays)}
              onChange={(e) => set('ageDays', daysFromIdx(Number(e.target.value)))}
              aria-label="Age in days"
            />
            <span className={styles.val} style={{ width: 'auto', fontSize: '0.78rem' }}>{formatAge(r.days)}</span>
          </div>
          <div className={styles.ageNote}>
            = {r.days.toLocaleString()} days &rarr; log&#8321;&#8320; {r.experienceFactor.toFixed(2)}
          </div>
          {slider('competence', 'Competence')}
          {slider('resilience', 'Resilience')}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Burden</div>
          <div className={styles.statVal}>{r.burden}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Capacity</div>
          <div className={styles.statVal}>{r.capacity.toFixed(1)}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Experience Weight</div>
          <div className={styles.statVal}>{formatEw(r.ew)}</div>
        </div>
      </div>

      <div className={styles.bar} aria-hidden="true">
        <div className={styles.segPush} style={{ width: '46%' }} />
        <div className={styles.segSteady} style={{ width: '14%' }} />
        <div className={styles.segProtect} style={{ width: '40%' }} />
        <div className={styles.needle} style={{ left: `${r.position}%` }} />
      </div>
      <div className={styles.scale}>
        <span>Can push</span>
        <span>Steady</span>
        <span>Protect</span>
      </div>

      <div className={styles.verdict}>
        <div className={styles.verdictLabel}>{r.label}</div>
        <div className={styles.verdictReason}>{r.reason}</div>
      </div>

      <div className={styles.presetsLabel}>The same drive, the same loss, at every age:</div>
      <div className={styles.presets}>
        {PRESETS.map((p) => (
          <button key={p.label} className={styles.presetBtn} onClick={() => setV(p.v)}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
