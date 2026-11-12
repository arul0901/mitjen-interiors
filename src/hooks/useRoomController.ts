import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ROOMS, RoomData } from "../data/rooms";

interface UseRoomControllerOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  rooms?: RoomData[];
  autoplayInterval?: number; // 6000ms default
  transitionDuration?: number; // 1.4s default
}

export function useRoomController({
  containerRef,
  rooms = ROOMS,
  autoplayInterval = 6000,
  transitionDuration = 1.4,
}: UseRoomControllerOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [indicatorProgress, setIndicatorProgress] = useState(0); // 0 to 1 for progress bar

  // Uniform progress between room A and room B (0..1)
  const progressRef = useRef(0);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const dragLastXRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const isPointerDownRef = useRef(false);
  const autoplayStartTimeRef = useRef(Date.now());
  const reducedMotionRef = useRef(false);
  const isTransitioningRef = useRef(false);

  // Check reduced motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;
    const updateMotion = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener("change", updateMotion);
    return () => motionQuery.removeEventListener("change", updateMotion);
  }, []);

  // Animate transition from currentIndex to nextIdx
  const transitionTo = useCallback((nextIdx: number, duration = transitionDuration) => {
    if (nextIdx === currentIndex || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setTargetIndex(nextIdx);

    if (reducedMotionRef.current) {
      // Instant switch for reduced motion
      setCurrentIndex(nextIdx);
      setTargetIndex((nextIdx + 1) % rooms.length);
      progressRef.current = 0;
      isTransitioningRef.current = false;
      return;
    }

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    // Animate progressRef from 0 to 1
    progressRef.current = 0;
    const proxy = { p: 0 };
    tweenRef.current = gsap.to(proxy, {
      p: 1,
      duration,
      ease: "power3.inOut",
      onUpdate: () => {
        progressRef.current = proxy.p;
      },
      onComplete: () => {
        progressRef.current = 0;
        setCurrentIndex(nextIdx);
        setTargetIndex((nextIdx + 1) % rooms.length);
        isTransitioningRef.current = false;
        autoplayStartTimeRef.current = Date.now();
      },
    });
  }, [currentIndex, rooms.length, transitionDuration]);

  const nextRoom = useCallback(() => {
    const nextIdx = (currentIndex + 1) % rooms.length;
    transitionTo(nextIdx);
  }, [currentIndex, rooms.length, transitionTo]);

  const prevRoom = useCallback(() => {
    const prevIdx = (currentIndex - 1 + rooms.length) % rooms.length;
    transitionTo(prevIdx);
  }, [currentIndex, rooms.length, transitionTo]);

  const goToRoom = useCallback((idx: number) => {
    if (idx === currentIndex) return;
    transitionTo(idx);
  }, [currentIndex, transitionTo]);

  // Autoplay loop and indicator filling
  useEffect(() => {
    if (reducedMotionRef.current) return;

    let animId: number;
    const checkAutoplay = () => {
      if (!isDragging && !isTransitioningRef.current) {
        const elapsed = Date.now() - autoplayStartTimeRef.current;
        const p = Math.min(1, elapsed / autoplayInterval);
        setIndicatorProgress(p);

        if (elapsed >= autoplayInterval) {
          nextRoom();
        }
      }
      animId = requestAnimationFrame(checkAutoplay);
    };

    autoplayStartTimeRef.current = Date.now();
    animId = requestAnimationFrame(checkAutoplay);

    return () => {
      cancelAnimationFrame(animId);
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [currentIndex, isDragging, autoplayInterval, nextRoom]);

  // Drag & Swipe gesture handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      if (isTransitioningRef.current) return;
      isPointerDownRef.current = true;
      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      dragLastXRef.current = e.clientX;
      dragStartTimeRef.current = Date.now();
      dragVelocityRef.current = 0;
      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for older browsers
      }

      if (tweenRef.current) {
        tweenRef.current.pause();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;

      const deltaX = e.clientX - dragStartXRef.current;
      const now = Date.now();
      const dt = Math.max(1, now - dragStartTimeRef.current);
      dragVelocityRef.current = (e.clientX - dragLastXRef.current) / dt;
      dragLastXRef.current = e.clientX;

      const width = container.clientWidth || 800;
      // Dragging left (negative deltaX) moves toward next room
      // Dragging right (positive deltaX) moves toward previous room
      if (deltaX < 0) {
        // Next room
        const nextIdx = (currentIndex + 1) % rooms.length;
        setTargetIndex(nextIdx);
        progressRef.current = Math.min(1, Math.max(0, -deltaX / width));
      } else {
        // Previous room
        const prevIdx = (currentIndex - 1 + rooms.length) % rooms.length;
        setTargetIndex(prevIdx);
        progressRef.current = Math.min(1, Math.max(0, deltaX / width));
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      setIsDragging(false);

      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }

      const p = progressRef.current;
      const velocity = Math.abs(dragVelocityRef.current);

      // Inertia / snap threshold
      if (p > 0.4 || velocity > 0.4) {
        // Complete the transition
        isTransitioningRef.current = true;
        const proxy = { p };
        const remaining = Math.max(0.3, (1 - p) * 0.8);
        tweenRef.current = gsap.to(proxy, {
          p: 1,
          duration: remaining,
          ease: "power2.out",
          onUpdate: () => {
            progressRef.current = proxy.p;
          },
          onComplete: () => {
            progressRef.current = 0;
            setCurrentIndex(targetIndex);
            setTargetIndex((targetIndex + 1) % rooms.length);
            isTransitioningRef.current = false;
            autoplayStartTimeRef.current = Date.now();
          },
        });
      } else {
        // Snap back to current room
        const proxy = { p };
        tweenRef.current = gsap.to(proxy, {
          p: 0,
          duration: 0.4,
          ease: "power2.out",
          onUpdate: () => {
            progressRef.current = proxy.p;
          },
          onComplete: () => {
            progressRef.current = 0;
            autoplayStartTimeRef.current = Date.now();
          },
        });
      }

      // Resume autoplay after 3 seconds of idle release
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        autoplayStartTimeRef.current = Date.now();
      }, 3000);
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
    };
  }, [containerRef, currentIndex, rooms.length, targetIndex]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextRoom();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevRoom();
    }
  }, [nextRoom, prevRoom]);

  return {
    rooms,
    currentIndex,
    targetIndex,
    progressRef,
    indicatorProgress,
    isDragging,
    nextRoom,
    prevRoom,
    goToRoom,
    handleKeyDown,
  };
}
