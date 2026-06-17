'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

// Reveal-on-scroll fallback. When the browser supports native scroll-driven
// animations (animation-timeline: view()), CSS handles the reveal with no
// per-frame JS and this component does nothing but render. Otherwise it falls
// back to an IntersectionObserver. Either way the element ends visible, and
// the hidden state only applies once html.js is set, so no-JS readers are safe.
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const nativeScroll =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('animation-timeline: view()');

    // Native scroll-timeline or reduced motion: nothing for JS to do.
    if (nativeScroll || reduce || !('IntersectionObserver' in window)) {
      if (reduce) el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
