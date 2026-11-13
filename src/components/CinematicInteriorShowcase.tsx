import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { CINEMATIC_SHOWCASE_SLIDES, ShowcaseSlide } from "../data/rooms";
import "../styles/CinematicInteriorShowcase.css";

interface CinematicInteriorShowcaseProps {
  slides?: ShowcaseSlide[];
  autoplayInterval?: number; // default 6500ms
  className?: string;
}

type AnimationStage = "IDLE" | "EXITING_TEXT" | "TRANSITIONING_IMAGE" | "ENTERING_TEXT";

export default function CinematicInteriorShowcase({
  slides = CINEMATIC_SHOWCASE_SLIDES,
  autoplayInterval = 6500,
  className = "",
}: CinematicInteriorShowcaseProps) {
  // Authoritative active slide state (0 .. slides.length - 1)
  const [activeSlide, setActiveSlide] = useState<number>(0);
  // Separate slide index for currently displayed text (guarantees text never appears before image completes)
  const [displayedTextSlide, setDisplayedTextSlide] = useState<number>(0);

  // Incoming background image state during crossfade
  const [incomingSlide, setIncomingSlide] = useState<number | null>(null);
  const [incomingOpacity, setIncomingOpacity] = useState<number>(0);

  // Text animation styles
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [textTranslateY, setTextTranslateY] = useState<number>(0);

  // Autoplay indicator progress (0 .. 1)
  const [indicatorProgress, setIndicatorProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Container refs & tracking
  const containerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<AnimationStage>("IDLE");
  const activeSlideRef = useRef<number>(0);
  activeSlideRef.current = activeSlide;

  // Timers and cancellation refs
  const transitionAbortRef = useRef<(() => void) | null>(null);
  const autoplayRafRef = useRef<number | null>(null);
  const autoplayStartTimeRef = useRef<number>(Date.now());
  const pausedProgressRef = useRef<number>(0);

  // Touch swipe refs
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchDeltaXRef = useRef<number>(0);

  // 1. Preload adjacent slide images to eliminate loading stalls
  useEffect(() => {
    if (typeof window === "undefined" || slides.length === 0) return;
    const nextIdx = (activeSlide + 1) % slides.length;
    const prevIdx = (activeSlide - 1 + slides.length) % slides.length;

    const imgNext = new Image();
    imgNext.src = slides[nextIdx].image;
    const imgPrev = new Image();
    imgPrev.src = slides[prevIdx].image;
  }, [activeSlide, slides]);

  // Synchronised transition execution engine
  const executeTransition = useCallback(
    (targetIndex: number) => {
      // Abort any ongoing animation cleanly
      if (transitionAbortRef.current) {
        transitionAbortRef.current();
        transitionAbortRef.current = null;
      }

      if (targetIndex === activeSlideRef.current) return;

      let isCancelled = false;
      const abort = () => {
        isCancelled = true;
      };
      transitionAbortRef.current = abort;

      // Reset autoplay progress
      setIndicatorProgress(0);
      pausedProgressRef.current = 0;

      // PHASE 1: Text Exit (280ms)
      stageRef.current = "EXITING_TEXT";
      setTextOpacity(0);
      setTextTranslateY(-12);

      const textExitTimer = setTimeout(() => {
        if (isCancelled) return;

        // PHASE 2: Background Image Crossfade (900ms)
        stageRef.current = "TRANSITIONING_IMAGE";
        setIncomingSlide(targetIndex);
        setIncomingOpacity(0);

        // Pre-create next image instance to ensure smooth paint
        const nextImg = new Image();
        nextImg.src = slides[targetIndex].image;

        // Force browser layout flush, then crossfade incoming layer
        requestAnimationFrame(() => {
          if (isCancelled) return;
          setIncomingOpacity(1);
        });

        // Image crossfade duration: 900ms
        const imageCrossfadeTimer = setTimeout(() => {
          if (isCancelled) return;

          // PHASE 3: Background crossfade is now 100% complete!
          // Promote incoming slide to active authoritative slide
          setActiveSlide(targetIndex);
          setDisplayedTextSlide(targetIndex);
          setIncomingSlide(null);
          setIncomingOpacity(0);

          // PHASE 4: Only now trigger text entrance (500ms, subtle rise)
          stageRef.current = "ENTERING_TEXT";
          setTextTranslateY(16);
          setTextOpacity(0);

          requestAnimationFrame(() => {
            if (isCancelled) return;
            setTextTranslateY(0);
            setTextOpacity(1);
          });

          const textEntranceTimer = setTimeout(() => {
            if (isCancelled) return;
            stageRef.current = "IDLE";
            autoplayStartTimeRef.current = Date.now();
            transitionAbortRef.current = null;
          }, 520);

          abortTimers.push(textEntranceTimer);
        }, 920);

        abortTimers.push(imageCrossfadeTimer);
      }, 300);

      const abortTimers = [textExitTimer];
      const prevAbort = abort;
      transitionAbortRef.current = () => {
        prevAbort();
        abortTimers.forEach(clearTimeout);
      };
    },
    [slides]
  );

  // Navigation commands
  const goToSlide = useCallback(
    (index: number) => {
      const sanitized = ((index % slides.length) + slides.length) % slides.length;
      executeTransition(sanitized);
    },
    [executeTransition, slides.length]
  );

  const nextSlide = useCallback(() => {
    goToSlide(activeSlideRef.current + 1);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(activeSlideRef.current - 1);
  }, [goToSlide]);

  // Autoplay ticker loop with pause support
  useEffect(() => {
    if (stageRef.current !== "IDLE" || isPaused) {
      if (autoplayRafRef.current) {
        cancelAnimationFrame(autoplayRafRef.current);
        autoplayRafRef.current = null;
      }
      return;
    }

    autoplayStartTimeRef.current = Date.now() - pausedProgressRef.current * autoplayInterval;

    const tick = () => {
      const elapsed = Date.now() - autoplayStartTimeRef.current;
      const progress = Math.min(1, elapsed / autoplayInterval);
      setIndicatorProgress(progress);

      if (progress >= 1) {
        nextSlide();
      } else {
        autoplayRafRef.current = requestAnimationFrame(tick);
      }
    };

    autoplayRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (autoplayRafRef.current) {
        cancelAnimationFrame(autoplayRafRef.current);
      }
    };
  }, [isPaused, activeSlide, autoplayInterval, nextSlide]);

  // Keyboard navigation (local + global window listener when not focusing form inputs)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [prevSlide, nextSlide]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      }
    },
    [prevSlide, nextSlide]
  );

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchDeltaXRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchDeltaXRef.current = touch.clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const threshold = 45; // 45px swipe threshold
    if (touchDeltaXRef.current < -threshold) {
      nextSlide();
    } else if (touchDeltaXRef.current > threshold) {
      prevSlide();
    }
  };

  // Active content reference
  const currentSlideData = slides[activeSlide] || slides[0];
  const displayedContent = slides[displayedTextSlide] || currentSlideData;
  const incomingSlideData = incomingSlide !== null ? slides[incomingSlide] : null;

  return (
    <section
      ref={containerRef}
      className={`cs-showcase-root ${className}`}
      role="region"
      aria-label="Cinematic Interior Architecture Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="cs-showcase-viewport">
        {/* ===================================================================
            BACKGROUND IMAGE LAYERS (Crossfade synchronisation)
            =================================================================== */}
        <div className="cs-showcase-bg-layer" aria-hidden="true">
          {/* Active authoritative slide background image */}
          <img
            key={`bg-active-${currentSlideData.id}`}
            src={currentSlideData.image}
            alt={currentSlideData.alt}
            className="cs-showcase-bg-img active"
            style={{ opacity: 1 }}
          />

          {/* Incoming slide background image during active crossfade */}
          {incomingSlideData && (
            <img
              key={`bg-incoming-${incomingSlideData.id}`}
              src={incomingSlideData.image}
              alt={incomingSlideData.alt}
              className="cs-showcase-bg-img incoming"
              style={{
                opacity: incomingOpacity,
                transition: "opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
          )}
        </div>

        {/* Ambient Overlays: Legibility Gradients & Subtle Film Grain */}
        <div className="cs-showcase-gradient-top" aria-hidden="true" />
        <div className="cs-showcase-gradient-bottom" aria-hidden="true" />
        <div className="cs-showcase-grain" aria-hidden="true" />

        {/* ===================================================================
            TEXT CONTENT OVERLAY (Synchronised with background crossfade)
            =================================================================== */}
        <div
          className="cs-showcase-content"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            transition:
              stageRef.current === "EXITING_TEXT"
                ? "opacity 0.28s ease-in, transform 0.28s ease-in"
                : stageRef.current === "ENTERING_TEXT"
                ? "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
          }}
        >
          {/* Eyebrow badge */}
          <div className="cs-showcase-eyebrow">
            <span className="cs-showcase-num">{displayedContent.number}</span>
            <span className="cs-showcase-sep" aria-hidden="true">/ 07</span>
            <span className="cs-showcase-dot" aria-hidden="true">•</span>
            <span className="cs-showcase-category">{displayedContent.eyebrow}</span>
          </div>

          {/* Slide Heading */}
          <h2 className="cs-showcase-title">{displayedContent.title}</h2>

          {/* Slide Supporting Description */}
          <p className="cs-showcase-description">{displayedContent.description}</p>
        </div>

        {/* ===================================================================
            BOTTOM NAVIGATION & INDICATORS
            =================================================================== */}
        <div className="cs-showcase-nav">
          {/* Arrow navigation buttons */}
          <div className="cs-showcase-arrows" aria-label="Slide navigation arrows">
            <button
              type="button"
              className="cs-showcase-arrow-btn"
              onClick={prevSlide}
              aria-label="Previous interior space"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="cs-showcase-arrow-btn"
              onClick={nextSlide}
              aria-label="Next interior space"
            >
              <svg viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* 7 Slide Indicators */}
          <div
            className="cs-showcase-indicators"
            role="tablist"
            aria-label="Residence spaces"
          >
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View space ${slide.number}: ${slide.title}`}
                  className={`cs-showcase-indicator-btn ${isActive ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}
                >
                  <span className="cs-showcase-indicator-label">
                    {slide.number} {slide.eyebrow}
                  </span>
                  <div className="cs-showcase-indicator-track">
                    {isActive && (
                      <div
                        className="cs-showcase-indicator-bar"
                        style={{
                          width: `${Math.min(100, Math.max(0, indicatorProgress * 100))}%`,
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
