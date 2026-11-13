import React, { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

export interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  suffix = '',
  duration = 1400,
  className = '',
}) => {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.4, triggerOnce: true });
  const [displayValue, setDisplayValue] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(easedProgress * value);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
};

export default CountUp;
