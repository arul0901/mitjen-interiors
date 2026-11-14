import React, { useEffect, useRef, useState, useMemo } from "react";
import { WALKTHROUGH_ROOMS, WalkthroughRoom } from "../data/rooms";
import { useScrollScrubVideo } from "../hooks/useScrollScrubVideo";
import { useFrameSequence } from "../hooks/useFrameSequence";
import "../styles/VideoWalkthroughHero.css";
import CinematicInteriorShowcase from "./CinematicInteriorShowcase";

export { CinematicInteriorShowcase };

export function ScrollWalkthroughVideoHero() {
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

  // Compute transform & opacity for room titles with continuous, gap-free cross-fading
  const getRoomStyle = (room: WalkthroughRoom, index: number) => {
    const { from, to } = room;
    const isFirst = index === 0;
    const isLast = index === WALKTHROUGH_ROOMS.length - 1;

    // Cross-fade blend window (progress fraction)
    const blend = 0.035;
    const enterStart = from;
    const enterEnd = isFirst ? 0 : from + blend;
    const leaveStart = isLast ? 1.0 : to - blend;
    const leaveEnd = to;

    if (progress < enterStart) {
      return { opacity: 0, transform: "translateY(18px)", filter: "blur(5px)", pointerEvents: "none" as const };
    }

    // Entering phase
    if (progress < enterEnd) {
      const t = (progress - enterStart) / (enterEnd - enterStart);
      const eased = t * t * (3 - 2 * t);
      return {
        opacity: eased,
        transform: `translateY(${(1 - eased) * 18}px)`,
        filter: `blur(${(1 - eased) * 4}px)`,
        pointerEvents: "none" as const,
      };
    }

    // Fully active phase
    if (progress <= leaveStart) {
      return { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)", pointerEvents: "auto" as const };
    }

    // Leaving phase
    if (progress <= leaveEnd) {
      const t = (progress - leaveStart) / (leaveEnd - leaveStart);
      const eased = t * t * (3 - 2 * t);
      return {
        opacity: Math.max(0, 1 - eased),
        transform: `translateY(${-eased * 18}px)`,
        filter: `blur(${eased * 4}px)`,
        pointerEvents: "none" as const,
      };
    }

    // Beyond range
    return { opacity: 0, transform: "translateY(-18px)", filter: "blur(5px)", pointerEvents: "none" as const };
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
              <span className="hero-walkthrough-reduced-badge">{r.number} • {r.eyebrow}</span>
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
  // Standard Scroll-Scrubbed View (Full Rectangle Banner)
  // =========================================================================
  return (
    <section
      ref={containerRef}
      className="hero-walkthrough-section"
      role="region"
      aria-label="Walkthrough of a bespoke residence"
    >
      <div className="hero-walkthrough-viewport">
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

        {/* Ambient Overlays: Top & Bottom Legibility Gradients & Film Grain */}
        <div className="hero-walkthrough-gradient-top" aria-hidden="true" />
        <div className="hero-walkthrough-grain" aria-hidden="true" />
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

        {/* Room Titles Overlay - Continuous content across every single frame */}
        {WALKTHROUGH_ROOMS.map((room, index) => {
          const style = getRoomStyle(room, index);
          if (style.opacity <= 0) return null;
          return (
            <div
              key={room.id}
              className={`hero-walkthrough-room side-${room.side}`}
              style={{
                opacity: style.opacity,
                transform: style.transform,
                filter: style.filter,
                pointerEvents: style.pointerEvents,
              }}
            >
              <div className="hero-walkthrough-eyebrow">
                <span className="hero-walkthrough-num">{room.number}</span>
                <span className="hero-walkthrough-sep" aria-hidden="true">/ 07</span>
                <span className="hero-walkthrough-dot" aria-hidden="true">•</span>
                <span className="hero-walkthrough-category">{room.eyebrow}</span>
              </div>
              <h2 className="hero-walkthrough-title">{room.title}</h2>
              <p className="hero-walkthrough-tagline">{room.tagline}</p>
            </div>
          );
        })}

        {/* Discreet Spatial Progress Rail */}
        <div className="hero-walkthrough-rail" aria-hidden="true">
          <div className="hero-walkthrough-rail-track">
            <div
              className="hero-walkthrough-rail-bar"
              style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>
          <span className="hero-walkthrough-rail-label">
            {String(Math.min(7, Math.max(1, Math.floor(progress * 7) + 1))).padStart(2, '0')} / 07
          </span>
        </div>
      </div>
    </section>
  );
}

export default ScrollWalkthroughVideoHero;
