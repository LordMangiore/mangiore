'use client';

import { useEffect, useRef, useState } from 'react';

// A standalone dimension line that reports its own measured width. Used on the
// lane pages so the self-dimensioning language from the homepage carries
// through the whole site. Draws itself in via CSS (the .dim animation / native
// scroll-timeline); the label is the live, measured value.
export default function MeasureLine({ label = 'Content width' }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(Math.round(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="dim dim-scroll" ref={ref} aria-hidden="true">
      <span className="dim-label">
        {label}&nbsp;·&nbsp;<b>{width ?? '—'}</b>&nbsp;px
      </span>
    </div>
  );
}
