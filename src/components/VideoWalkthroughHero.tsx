import React, { useEffect, useRef, useState, useMemo } from "react";
import { WALKTHROUGH_ROOMS, WalkthroughRoom } from "../data/rooms";
import { useScrollScrubVideo } from "../hooks/useScrollScrubVideo";
import { useFrameSequence } from "../hooks/useFrameSequence";
import "../styles/VideoWalkthroughHero.css";

export default function VideoWalkthroughHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [useCanvasMode, setUseCanvasMode] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [hasScrolledPastHint, setHasScrolledPastHint] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // 1. Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 2. Mobile detection & Canvas mode evaluation (iOS Safari, saveData, slow 3G/2G)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(checkMobile);

    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));

    // Network connection status
    const navConn = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const isSlowConnection =
      navConn &&
      (navConn.saveData ||
        (navConn.effectiveType && navConn.effectiveType !== "4g"));

    if (isIOS || isSlowConnection) {
      setUseCanvasMode(true);
    }
  }, []);

  // 3. Fallback timer: if video fails to report metadata within 6s, switch to canvas
  useEffect(() => {
    if (useCanvasMode || isReducedMotion) return;
    const timer = setTimeout(() => {
      const vid = videoRef.current;
      if (!vid || vid.readyState < 1 || !vid.duration) {
        console.warn("Video metadata timeout (6s) — activating canvas frame mode.");
        setUseCanvasMode(true);
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [useCanvasMode, isReducedMotion]);

  // 4. Hook: Video Scrubbing
  const { duration } = useScrollScrubVideo({
    containerRef,
    videoRef,
    enabled: !isReducedMotion,
    smoothing: 6,
    onProgress: (p) => {
      setProgress(p);
      if (p > 0.04) {
        setHasScrolledPastHint(true);
      }
    },
    onJankDetected: () => {
      console.warn("Jank detected (>3 dropped steps/sec) — switching to canvas mode.");
      setUseCanvasMode(true);
    },
  });

  // 5. Hook: Canvas Frame Sequence
  useFrameSequence({
    canvasRef,
    enabled: !isReducedMotion && useCanvasMode,
    progress,
  });

  // Scroll to enter hint opacity (fades out as user scrolls 0 -> 0.04)
  const hintOpacity = useMemo(() => {
    if (progress > 0.04) return 0;
    return Math.max(0, 1 - progress / 0.04);
  }, [progress]);

  // Compute transform & opacity for room titles
  const getRoomStyle = (room: WalkthroughRoom) => {
    const { from, to, id } = room;
    const range = to - from;
    const enterEnd = from + range * 0.25;
    const leaveStart = to - range * 0.2;

    if (progress < from) {
      return { opacity: 0, transform: "translateY(24px)", filter: "blur(6px)" };
    }

    // Entering phase
    if (progress >= from && progress < enterEnd) {
      const t = (progress - from) / (range * 0.25);
      const eased = t * t * (3 - 2 * t); // smoothstep
      const y = (1 - eased) * 24;
      const blur = (1 - eased) * 6;
      return {
        opacity: eased,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
      };
    }

    // Fully active phase
    if (progress >= enterEnd && (id === "bath" || progress <= leaveStart)) {
      return { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
    }

    // Leaving phase (The Bath holds to the end)
    if (id === "bath") {
      return { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" };
    }

    if (progress > leaveStart && progress <= to) {
      const t = (progress - leaveStart) / (range * 0.2);
      const eased = t * t * (3 - 2 * t);
      const y = -eased * 24;
      const blur = eased * 6;
      return {
        opacity: Math.max(0, 1 - eased),
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
      };
    }

    // Beyond range
    return { opacity: 0, transform: "translateY(-24px)", filter: "blur(6px)" };
  };

  // =========================================================================
  // Reduced Motion View (Accessible Static Experience)
  // =========================================================================
  if (isReducedMotion) {
    const sampleStills = [
      "/hero/frames/f0001.webp",
      "/hero/frames/f0048.webp",
      "/hero/frames/f0096.webp",
      "/hero/frames/f0144.webp",
      "/hero/frames/f0192.webp",
      "/hero/frames/f0240.webp",
    ];

    return (
      <section
        className="hero-walkthrough-reduced"
        role="region"
        aria-label="Walkthrough of a bespoke residence"
      >
        <div className="hero-walkthrough-reduced-hero">
          <img
            src="/hero/poster.webp"
            alt="Cinematic architectural residence interior walkthrough"
            fetchPriority="high"
          />
        </div>

        <div className="hero-walkthrough-reduced-grid">
          {WALKTHROUGH_ROOMS.map((r) => (
            <div key={r.id} className="hero-walkthrough-reduced-item">
              <h3>{r.title}</h3>
              <p>{r.tagline}</p>
            </div>
          ))}
        </div>

        <div className="hero-walkthrough-reduced-stills" aria-label="Walkthrough room stills">
          {sampleStills.map((src, i) => (
            <img key={i} src={src} alt={`Residence room milestone ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>
    );
  }

  // =========================================================================
  // Standard Scroll-Scrubbed View
  // =========================================================================
  return (
    <section
      ref={containerRef}
      className="hero-walkthrough-section"
      role="region"
      aria-label="Walkthrough of a bespoke residence"
    >
      <div className="hero-walkthrough-viewport">
        {/* Curved Top Mask (White SVG) */}
        <div className="hero-walkthrough-mask hero-walkthrough-mask-top" aria-hidden="true">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Media Layer: Video OR Canvas */}
        {useCanvasMode ? (
          <canvas
            ref={canvasRef}
            className="hero-walkthrough-canvas"
            aria-hidden="true"
          />
        ) : (
          <video
            ref={videoRef}
            className="hero-walkthrough-media"
            muted
            playsInline
            preload="auto"
            poster="/hero/poster.webp"
            aria-hidden="true"
          >
            <source src="/hero/walkthrough.webm" type="video/webm" />
            <source
              src={isMobile ? "/hero/walkthrough-mobile.mp4" : "/hero/walkthrough.mp4"}
              type="video/mp4"
            />
          </video>
        )}

        {/* Subtle Film Grain (Static SVG, 4% opacity) */}
        <div className="hero-walkthrough-grain" aria-hidden="true" />

        {/* Bottom Legibility Gradient (35% height) */}
        <div className="hero-walkthrough-gradient" aria-hidden="true" />

        {/* Intro Hint: "Scroll to enter" (visible 0 - 0.04) */}
        {hintOpacity > 0 && (
          <div
            className="hero-walkthrough-hint"
            style={{ opacity: hintOpacity }}
            aria-hidden="true"
          >
            Scroll to enter
          </div>
        )}

        {/* Room Titles Overlay */}
        {WALKTHROUGH_ROOMS.map((room) => {
          const style = getRoomStyle(room);
          return (
            <div
              key={room.id}
              className={`hero-walkthrough-room side-${room.side}`}
              style={{
                opacity: style.opacity,
                transform: style.transform,
                filter: style.filter,
              }}
            >
              <h2 className="hero-walkthrough-title">{room.title}</h2>
              <p className="hero-walkthrough-tagline">{room.tagline}</p>
            </div>
          );
        })}

        {/* Curved Bottom Mask (White SVG) */}
        <div className="hero-walkthrough-mask hero-walkthrough-mask-bottom" aria-hidden="true">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
