'use client';

import { useEffect, useState } from 'react';

// A designer's easter egg: press G to overlay the column grid the site is laid
// out on. Off by default, ignores typing in fields, and is purely visual. It
// is the "we know what right is" claim made literally inspectable.
export default function GridOverlay() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'g') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.isContentEditable ||
          /^(input|textarea|select)$/i.test(t.tagName))
      )
        return;
      setOn((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!on) return null;

  return (
    <div className="gridoverlay" aria-hidden="true">
      <div className="wrap gridoverlay-cols">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
