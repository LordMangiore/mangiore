'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// The hero frames itself like a technical drawing: corner registration marks
// (CSS) and a dimension line whose label reports the real, measured width of
// the content column. On first load the number counts up to the measured
// value; after that it tracks resizes directly. The number is not decoration,
// it is the actual width, which is the whole point.
export default function HeroDimensions({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const counted = useRef(false);
  const raf = useRef<number | null>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const countUp = (target: number) => {
      const start = performance.now();
      const duration = 850;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * target));
        if (t < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w) return;
      const target = Math.round(w);
      if (!counted.current) {
        counted.current = true;
        if (reduce) setDisplay(target);
        else countUp(target);
      } else {
        if (raf.current) cancelAnimationFrame(raf.current);
        setDisplay(target);
      }
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="hero-frame" ref={frame}>
      {children}
      <div className="dim" aria-hidden="true">
        <span className="dim-label">
          Content&nbsp;width&nbsp;·&nbsp;<b>{display ?? '—'}</b>&nbsp;px
        </span>
      </div>
    </div>
  );
}
