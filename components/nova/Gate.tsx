'use client';

// A cheeky client-side gate. Not real security (the page is a static export,
// so harden later with Netlify Basic Auth or an edge function), just a velvet
// rope with attitude. The password lives in PASSWORD below; change it freely.

import { useEffect, useState } from 'react';
import styles from './nova.module.css';

const PASSWORD = 'sayless'; // the most powerful thing N.O.V.A. does, as one word
const KEY = 'nova-open';

const NOPES = [
  'Nope. N.O.V.A. logged the attempt, for the record.',
  'Still no. Trust is earned, not typed. (You know this.)',
  'Bold guess. Wrong, but bold.',
  'That is a no from the parliament of regions.',
  'Incorrect. N.O.V.A. is choosing silence over judgment. Barely.',
];

export default function Gate({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [tries, setTries] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(KEY) === '1') setOpen(true);
    setReady(true);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = (new FormData(e.currentTarget).get('pw') as string)?.trim().toLowerCase();
    if (val === PASSWORD) {
      sessionStorage.setItem(KEY, '1');
      setMsg('There it is. Come in.');
      setTimeout(() => setOpen(true), 500);
    } else {
      setMsg(NOPES[tries % NOPES.length]);
      setTries((t) => t + 1);
    }
  };

  if (!ready) return null;
  if (open) return <>{children}</>;

  return (
    <div className={styles.gate}>
      <div className={styles.gateCard}>
        <div className={styles.gateMark}>N.O.V.A.</div>
        <h1 className={styles.gateTitle}>N.O.V.A. has trust issues.</h1>
        <p className={styles.gateSub}>
          Fitting, really. It does not open up to just anyone, and it is not going to start now.
          Say the word.
        </p>
        <form className={styles.gateForm} onSubmit={submit}>
          <input className={styles.gateInput} name="pw" type="password" placeholder="the word" autoFocus aria-label="Password" />
          <button className={styles.gateBtn} type="submit">Earn it</button>
        </form>
        <div className={styles.gateMsg}>{msg}</div>
        <p className={styles.gateHint}>
          Hint: it is the most powerful thing N.O.V.A. does. One word.
        </p>
      </div>
    </div>
  );
}
