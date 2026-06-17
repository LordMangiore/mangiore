'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

// Quiet scroll reveal. One small, orchestrated motion, and nothing if the
// visitor asked for reduced motion. The effect degrades to fully visible
// before JS runs, so content is never hidden from crawlers or no-JS readers.
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

    if (reduce || !('IntersectionObserver' in window)) {
      el.classList.add('in');
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
