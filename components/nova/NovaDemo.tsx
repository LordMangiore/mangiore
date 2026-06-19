'use client';

import { useState } from 'react';
import BuildingBlocks from './BuildingBlocks';
import TheModel from './TheModel';
import styles from './nova.module.css';

export default function NovaDemo() {
  const [tab, setTab] = useState<'blocks' | 'model'>('blocks');
  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--gutter)' }}>
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
