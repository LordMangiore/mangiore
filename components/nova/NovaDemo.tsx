'use client';

import { useState } from 'react';
import BuildingBlocks from './BuildingBlocks';
import TheModel from './TheModel';
import styles from './nova.module.css';

export default function NovaDemo() {
  const [tab, setTab] = useState<'blocks' | 'model'>('blocks');
  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--gutter)' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <p style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>N.O.V.A.</p>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '64ch', marginTop: '0.4rem' }}>
          A behavior-based AI presence. It reads what you do, not what you say; earns the right to be
          direct one area of life at a time; protects you from itself when you are overwhelmed; keeps
          no word you ever said; and would rather stay quiet than be wrong.
        </p>
      </div>
      <div className={styles.tabs} role="tablist">
        <button role="tab" aria-selected={tab === 'blocks'} className={`${styles.tab} ${tab === 'blocks' ? styles.tabOn : ''}`} onClick={() => setTab('blocks')}>
          The building blocks
        </button>
        <button role="tab" aria-selected={tab === 'model'} className={`${styles.tab} ${tab === 'model' ? styles.tabOn : ''}`} onClick={() => setTab('model')}>
          The model
        </button>
      </div>
      {tab === 'blocks' ? <BuildingBlocks /> : <TheModel />}
    </main>
  );
}
