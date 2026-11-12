import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cubic bezier helper approximating cubic-bezier(0.16, 1.0, 0.3, 1.0)
 * Provides the signature smooth, architectural inertia matching the site menu.
 */
function cubicBezierEase(t: number): number {
  const p = Math.max(0, Math.min(1, t));
  // High-precision solve for cubic-bezier(0.16, 1.0, 0.3, 1.0)
  // Curve starts with decisive acceleration and eases seamlessly into the target.
  const t2 = p * p;
  const t3 = t2 * p;
  return -1.8 * t3 + 2.7 * t2 + 0.1 * p;
}

interface UseScrollProgressOptions {
  triggerRef: React.RefObject<HTMLElement | null>;
  pinDistanceDesktop?: string;
  pinDistanceMobile?: string;
}

export function useScrollProgress({
  triggerRef,
  pinDistanceDesktop = "+=400%",
  pinDistanceMobile = "+=300%",
}: UseScrollProgressOptions) {
  // Target progress directly from scroll (0..1)
  const targetProgressRef = useRef(0);
  // Smoothed progress after damp(current, target, lambda 4, dt)
  const smoothedProgressRef = useRef(0);
  // Idle creep before first scroll (up to 0.12)
  const idleProgressRef = useRef(0);
  const hasUserScrolledRef = useRef(false);
  const lastTimeRef = useRef(performance.now());

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [scrollTriggerActive, setScrollTriggerActive] = useState(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    if (motionQuery.matches) {
      return () => motionQuery.removeEventListener("change", handleMotionChange);
    }

    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const isMobile = window.innerWidth < 768;
    const endDistance = isMobile ? pinDistanceMobile : pinDistanceDesktop;

    // 2. Setup GSAP ScrollTrigger pin
    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: endDistance,
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
      scrub: 1.0,
      onUpdate: (self) => {
        hasUserScrolledRef.current = true;
        targetProgressRef.current = self.progress;
      },
    });

    setScrollTriggerActive(true);

    // Integrate with global Lenis smooth scroll if present
    const legacyWindow = window as Window & {
      lenisInstance?: { on: (event: string, callback: () => void) => void };
    };
    if (legacyWindow.lenisInstance) {
      legacyWindow.lenisInstance.on("scroll", ScrollTrigger.update);
    }

    // Refresh ScrollTrigger after DOM stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      motionQuery.removeEventListener("change", handleMotionChange);
      st.kill();
    };
  }, [triggerRef, pinDistanceDesktop, pinDistanceMobile]);

  // Frame update function to be called from useFrame in Canvas
  const updateProgress = (dt: number): number => {
    if (isReducedMotion) {
      smoothedProgressRef.current = 0;
      return 0;
    }

    let target = targetProgressRef.current;

    // Idle life: before the user scrolls, creep forward slowly up to 0.12
    if (!hasUserScrolledRef.current) {
      idleProgressRef.current = Math.min(0.12, idleProgressRef.current + 0.0006 * (dt / 0.016));
      target = idleProgressRef.current;
    }

    // Damping: smoothedProgress = damp(current, target, lambda 4, dt)
    const lambda = 4.0;
    smoothedProgressRef.current = THREE.MathUtils.damp(
      smoothedProgressRef.current,
      target,
      lambda,
      dt
    );

    // Clamp 0..1
    const clamped = Math.max(0, Math.min(1, smoothedProgressRef.current));
    // Apply menu cubic-bezier feel: cubic-bezier(0.16, 1, 0.3, 1)
    const eased = cubicBezierEase(clamped);
    return Math.max(0, Math.min(1, eased));
  };

  return {
    targetProgressRef,
    smoothedProgressRef,
    updateProgress,
    isReducedMotion,
    scrollTriggerActive,
  };
}
