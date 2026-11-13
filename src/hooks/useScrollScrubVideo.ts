import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface UseScrollScrubVideoOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  enabled?: boolean;
  smoothing?: number; // e.g. 6 (default), tuned up to 10 if laggy
  onProgress?: (progress: number) => void;
  onDurationChange?: (duration: number) => void;
  onJankDetected?: () => void;
}

export function useScrollScrubVideo({
  containerRef,
  videoRef,
  enabled = true,
  smoothing = 6,
  onProgress,
  onDurationChange,
  onJankDetected,
}: UseScrollScrubVideoOptions) {
  const [duration, setDuration] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const durationRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const currentRef = useRef<number>(0);
  const lastSetRef = useRef<number>(-1);
  const hasScrolledRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const idleStartTimeRef = useRef<number | null>(null);

  // Stall / dropped steps detection for jank
  const jankDropsRef = useRef<number[]>([]);

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  const onJankDetectedRef = useRef(onJankDetected);
  onJankDetectedRef.current = onJankDetected;

  // Keep durationRef in sync
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  // Handle video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const dur = video.duration;
      if (dur && !isNaN(dur) && isFinite(dur)) {
        setDuration(dur);
        durationRef.current = dur;
        setIsReady(true);
        onDurationChange?.(dur);
      }
    };

    const handleCanPlay = () => {
      if (video.duration) {
        setIsReady(true);
      }
    };

    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("canplay", handleCanPlay);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [videoRef, onDurationChange]);

  // Main GSAP ScrollTrigger + rAF lerp engine
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;
    const video = videoRef.current; // optional: if null, we are in canvas mode

    // Use unified global ScrollTrigger/GSAP instance to coordinate with Lenis & page
    const win = window as Window & {
      ScrollTrigger?: typeof ScrollTrigger;
      gsap?: typeof gsap;
      lenisInstance?: { on: (event: string, cb: () => void) => void; raf: (time: number) => void };
    };

    const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;
    const activeGsap = win.gsap || gsap;

    try {
      activeGsap.registerPlugin(activeScrollTrigger);
    } catch {}

    let triggerInstance: ScrollTrigger | null = null;
    let rafId: number | null = null;
    let lastTime = performance.now();

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const endDistance = isMobile ? "+=450%" : "+=600%";

    // Connect with Lenis if already present
    if (win.lenisInstance) {
      win.lenisInstance.on("scroll", () => {
        activeScrollTrigger.update();
      });
      activeGsap.ticker.add((time: number) => {
        win.lenisInstance?.raf(time * 1000);
      });
    }

    // Initialize ScrollTrigger
    triggerInstance = activeScrollTrigger.create({
      id: "hero-walkthrough",
      trigger: container,
      start: "top top",
      end: endDistance,
      pin: true,
      anticipatePin: 1,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        hasScrolledRef.current = true;
        onProgressRef.current?.(self.progress);
      },
    });

    const handlePageReady = () => {
      activeScrollTrigger.refresh();
    };
    window.addEventListener("mitjen:page-ready", handlePageReady);

    activeScrollTrigger.refresh();

    // Visibility Observer to pause when offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisibleRef.current = false;
      } else {
        isVisibleRef.current = true;
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Delta-time smoothing loop (rAF)
    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);

      if (!isVisibleRef.current || document.hidden) {
        lastTime = now;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1); // clamp delta-time
      lastTime = now;

      // Pre-scroll Idle Drift: drift progress from 0 to 0.015 over 8 seconds before first scroll
      if (!hasScrolledRef.current) {
        if (idleStartTimeRef.current === null) {
          idleStartTimeRef.current = now;
        }
        const elapsed = (now - idleStartTimeRef.current) / 1000;
        if (elapsed < 8) {
          const idleProgress = (elapsed / 8) * 0.015;
          progressRef.current = idleProgress;
          onProgressRef.current?.(idleProgress);
        } else {
          progressRef.current = 0.015;
        }
      }

      // If video element is present, scrub video.currentTime with smoothing exponential lerp
      if (video) {
        const dur = durationRef.current;
        if (!dur || dur <= 0) return;

        let targetTime = progressRef.current * dur;

        // Check buffered range so we hold at buffered edge instead of stalling
        try {
          if (video.buffered && video.buffered.length > 0) {
            let maxBuffered = 0;
            for (let i = 0; i < video.buffered.length; i++) {
              if (video.buffered.start(i) <= currentRef.current + 0.1) {
                maxBuffered = Math.max(maxBuffered, video.buffered.end(i));
              }
            }
            if (maxBuffered > 0 && targetTime > maxBuffered) {
              targetTime = maxBuffered;
            }
          }
        } catch {
          // Safe fallback if buffer check fails
        }

        // Smoothing exponential lerp: current += (target - current) * (1 - Math.exp(-smoothing * dt))
        const factor = 1 - Math.exp(-smoothing * dt);
        currentRef.current += (targetTime - currentRef.current) * factor;

        // Clamp between 0 and duration
        currentRef.current = Math.max(0, Math.min(dur, currentRef.current));

        // Apply to video only when |next - lastSet| > 1/60s (approx 0.0167s)
        const diff = Math.abs(currentRef.current - lastSetRef.current);
        if (diff > 1 / 60) {
          // Jank / stall detector: if seeking is currently busy while requests accumulate
          if (video.seeking) {
            jankDropsRef.current.push(now);
            jankDropsRef.current = jankDropsRef.current.filter((t) => now - t <= 1000);
            if (jankDropsRef.current.length > 3) {
              onJankDetectedRef.current?.();
            }
          }

          video.currentTime = currentRef.current;
          lastSetRef.current = currentRef.current;
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mitjen:page-ready", handlePageReady);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (triggerInstance) triggerInstance.kill();
    };
  }, [enabled, smoothing, containerRef]);

  return {
    duration,
    isReady,
  };
}
