'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// The hero frames itself like a technical drawing: corner registration marks
// (CSS) and a dimension line whose label reports the real, measured width of
// the content column. The number is not decoration. It updates as the column
// resizes, which is the whole point: the site is measured, not styled to look
// like it is.
export default function HeroDimensions({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(Math.round(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="hero-frame" ref={frame}>
      {children}
      <div className="dim" aria-hidden="true">
        <span className="dim-label">
          Content&nbsp;width&nbsp;·&nbsp;<b>{width ?? '—'}</b>&nbsp;px
        </span>
      </div>
    </div>
  );
}
