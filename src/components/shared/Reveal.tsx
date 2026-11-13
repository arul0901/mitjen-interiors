import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

export interface RevealProps {
  children: React.ReactNode;
  staggerIndex?: number;
  className?: string;
  threshold?: number;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  staggerIndex = 0,
  className = '',
  threshold = 0.15,
  as: Component = 'div',
}) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold, triggerOnce: true });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    }
  }, []);

  const delayMs = staggerIndex * 80;

  const style: React.CSSProperties = prefersReducedMotion
    ? {
        opacity: 1,
        transform: 'none',
        transition: 'none',
      }
    : {
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: isInView ? 'auto' : 'opacity, transform',
      };

  return (
    <Component ref={ref} style={style} className={className}>
      {children}
    </Component>
  );
};

export default Reveal;
