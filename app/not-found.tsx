'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SITE } from '@/lib/site';
import styles from './not-found.module.css';

export default function NotFound() {
  const g = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = g.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `translate(${(x * 16).toFixed(1)}px, ${(y * 12).toFixed(1)}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero">
      <div className="wrap">
        <p className="eyebrow">Error 404 &mdash; off the map</p>

        <div className={styles.bignum} aria-hidden="true">
          4<span className={styles.accent}>0</span>4
        </div>

        <svg className={styles.viz} viewBox="0 0 600 120" role="img" aria-label="A measured path with a single point drifted off the line.">
          <line className={styles.line} x1="20" y1="86" x2="580" y2="86" stroke="var(--rule)" strokeWidth="1.5" />
          {[20, 100, 180, 260, 340, 420, 500, 580].map((x) => (
            <line key={x} x1={x} y1="86" x2={x} y2="92" stroke="var(--rule)" strokeWidth="1" />
          ))}
          <circle cx="300" cy="86" r="3.5" fill="var(--steel)" opacity="0.5" />
          <text className={styles.label} x="300" y="108" textAnchor="middle">expected here</text>

          <g ref={g} className={styles.parallax}>
            <g className={styles.drift}>
              <line x1="452" y1="86" x2="452" y2="40" stroke="var(--pine-bright)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="452" cy="34" r="6" fill="var(--pine)" />
              <text className={styles.label} x="466" y="31" style={{ fill: 'var(--pine)' }}>this page</text>
              <text className={styles.label} x="466" y="45">anchor: not found</text>
            </g>
          </g>
        </svg>

        <h1 className="lane-title" style={{ maxWidth: '20ch' }}>
          This one drifted off the path.
        </h1>
        <p className="lane-lead">
          We build things that don&apos;t fall over, so consider this the single path we never built.
          The link is wrong, or the page moved on. Everything that still exists is one click away.
        </p>

        <div className="actions">
          <Link className="btn btn-solid" href="/">
            Back to {SITE.name}
          </Link>
        </div>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className={styles.labLink} href="/lab/">
            &hellip; or slip into the lab &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
