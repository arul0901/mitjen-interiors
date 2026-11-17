import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  MapPin,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from 'lucide-react';
import { KINETIC_PROJECTS } from './kineticVaneData';
import './KineticVaneShowcase.css';

const TOTAL_VANES = 20;

export const KineticVaneShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const redStageRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  // Refs for 20 vane blades and lighting overlays
  const bladeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);

  // State
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [nextIdx, setNextIdx] = useState<number>(1);
  const [activeTypoIdx, setActiveTypoIdx] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Swipe & Drag Tracking Refs
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const lastWheelTime = useRef<number>(0);
  const isTransitioningRef = useRef<boolean>(false);

  const vanes = useMemo(() => Array.from({ length: TOTAL_VANES }, (_, i) => i), []);

  const currentProject = KINETIC_PROJECTS[currentIdx];
  const nextProject = KINETIC_PROJECTS[nextIdx];

  // Helper to split text into animated character spans
  const renderChars = (text: string) =>
    text.split('').map((ch, idx) => (
      <span key={idx} className="char">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  // Core Programmatic Transition Function
  const goToProject = useCallback(
    (targetIdx: number, direction: 'next' | 'prev' = 'next') => {
      if (isTransitioningRef.current || targetIdx === currentIdx) return;
      isTransitioningRef.current = true;
      setIsAnimating(true);

      // Choose which typography to display in the vermilion-red environment
      const typoIdx = direction === 'next' ? currentIdx : targetIdx;
      setActiveTypoIdx(typoIdx);
      setNextIdx(targetIdx);

      const blades = bladeRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const lights = lightRefs.current.filter((el): el is HTMLDivElement => el !== null);
      const redStage = redStageRef.current;
      const chars = redStage?.querySelectorAll<HTMLElement>('.char') || [];
      const meta = metaRef.current;

      const targetRotation = direction === 'next' ? 180 : -180;
      const staggerOrigin = direction === 'next' ? 'start' : 'end';

      // Master Kinetic Transition Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Update current state to target project
          setCurrentIdx(targetIdx);
          setNextIdx((targetIdx + 1) % KINETIC_PROJECTS.length);

          // Silently reset blade rotation to 0deg (since Front Face now displays the new project image)
          gsap.set(blades, { rotateY: 0 });
          gsap.set(lights, { opacity: 0 });
          gsap.set(redStage, { autoAlpha: 0 });

          isTransitioningRef.current = false;
          setIsAnimating(false);
        },
      });

      // Phase 01: Outgoing Project metadata exits
      tl.to(
        meta,
        {
          autoAlpha: 0,
          y: direction === 'next' ? -20 : 20,
          duration: 0.35,
          ease: 'power2.in',
        },
        0
      );

      // Phase 02: Vermilion-Red Environment emerges behind the louvres
      tl.to(
        redStage,
        {
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power1.inOut',
        },
        0.08
      );

      // Phase 03: 3D Rotating Vanes swing open
      tl.to(
        blades,
        {
          rotateY: targetRotation,
          duration: 1.35,
          stagger: {
            each: 0.024,
            from: staggerOrigin,
            ease: 'power1.inOut',
          },
          ease: 'power2.inOut',
        },
        0.12
      );

      // Dynamic Shutter Lighting Overlay
      tl.to(
        lights,
        {
          opacity: 0.7,
          duration: 0.65,
          yoyo: true,
          repeat: 1,
          stagger: {
            each: 0.024,
            from: staggerOrigin,
          },
          ease: 'sine.inOut',
        },
        0.12
      );

      // Phase 04: Oversized Typography reveals from hidden clip-paths
      tl.fromTo(
        chars,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.018,
          duration: 0.45,
          ease: 'power3.out',
        },
        0.3
      );

      // Phase 05: Typography exits through upper mask as shutters close
      tl.to(
        chars,
        {
          yPercent: -120,
          opacity: 0,
          stagger: 0.012,
          duration: 0.38,
          ease: 'power3.in',
        },
        0.82
      );

      // Phase 06: Red Environment conceals as incoming project image settles
      tl.to(
        redStage,
        {
          autoAlpha: 0,
          duration: 0.45,
          ease: 'power1.inOut',
        },
        0.92
      );

      // Phase 07: Incoming Project metadata arrives
      tl.fromTo(
        meta,
        {
          autoAlpha: 0,
          y: direction === 'next' ? 20 : -20,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        1.1
      );
    },
    [currentIdx]
  );

  const handleNext = useCallback(() => {
    const next = (currentIdx + 1) % KINETIC_PROJECTS.length;
    goToProject(next, 'next');
  }, [currentIdx, goToProject]);

  const handlePrev = useCallback(() => {
    const prev = (currentIdx - 1 + KINETIC_PROJECTS.length) % KINETIC_PROJECTS.length;
    goToProject(prev, 'prev');
  }, [currentIdx, goToProject]);

  // Touch Swipe Handlers (Mobile & Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNext(); // Swiped left -> Next
      } else {
        handlePrev(); // Swiped right -> Previous
      }
    } else if (Math.abs(deltaY) > 45) {
      // Vertical swipe fallback on touch
      if (deltaY < 0) {
        handleNext(); // Swiped up -> Next
      } else {
        handlePrev(); // Swiped down -> Previous
      }
    }
  };

  // Mouse Drag Handlers (Desktop Swipe / Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Trackpad / Wheel Swipe Handler
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 750) return; // Debounce wheel gestures

    const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(dominantDelta) > 25) {
      lastWheelTime.current = now;
      if (dominantDelta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const activeTypo = KINETIC_PROJECTS[activeTypoIdx].transitionTitle;

  return (
    <section
      ref={sectionRef}
      className="kinetic-showcase-section"
      aria-label="Kinetic Rotating Vane Showcase"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div className="kinetic-viewport">
        {/* ==================================================================
            1. CINEMATIC VERMILION-RED TRANSITION ENVIRONMENT
            ================================================================== */}
        <div ref={redStageRef} className="kinetic-red-stage">
          <div className="kinetic-red-grid-overlay" />
          <div className="kinetic-red-crosshair tl" />
          <div className="kinetic-red-crosshair tr" />
          <div className="kinetic-red-crosshair bl" />
          <div className="kinetic-red-crosshair br" />

          <span className="kinetic-red-meta-tag top-left">SYS. REF // KINETIC-VANE-SHUTTER</span>
          <span className="kinetic-red-meta-tag top-right">
            INDEX {KINETIC_PROJECTS[currentIdx].number} &rarr; {KINETIC_PROJECTS[nextIdx].number}
          </span>
          <span className="kinetic-red-meta-tag bottom-left">{activeTypo.coord}</span>
          <span className="kinetic-red-meta-tag bottom-right">MITJEN ARCHITECTURAL EXHIBITION</span>

          <div className="kinetic-typo-container">
            <span className="kinetic-typo-eyebrow">{activeTypo.eyebrow}</span>
            <div className="kinetic-typo-line line-1">{renderChars(activeTypo.line1)}</div>
            <div className="kinetic-typo-line line-2">{renderChars(activeTypo.line2)}</div>
            <span className="kinetic-typo-sub">{activeTypo.subtext}</span>
          </div>
        </div>

        {/* ==================================================================
            2. KINETIC ROTATING VANE LOUVRE MECHANISM
            ================================================================== */}
        <div className="kinetic-vanes-layer">
          {vanes.map((idx) => {
            const widthPercent = 100 / TOTAL_VANES;
            const leftPercent = idx * widthPercent;
            const offsetLeftPx = `calc(-1 * ${idx} * (100vw / ${TOTAL_VANES}))`;

            return (
              <div
                key={`vane-${idx}`}
                className="kinetic-vane-unit"
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                }}
              >
                <div
                  ref={(el) => {
                    bladeRefs.current[idx] = el;
                  }}
                  className="kinetic-vane-blade"
                >
                  {/* Front Face: Current Active Project Image */}
                  <div className="vane-face front">
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${currentProject.image}")`,
                        left: offsetLeftPx,
                      }}
                    />
                    <div
                      ref={(el) => {
                        lightRefs.current[idx] = el;
                      }}
                      className="vane-lighting-overlay"
                    />
                    <div className="vane-edge-bevel" />
                  </div>

                  {/* Back Face: Target Incoming Project Image (Unmirrored via scaleX(-1)) */}
                  <div className="vane-face back">
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${nextProject.image}")`,
                        left: offsetLeftPx,
                      }}
                    />
                    <div className="vane-lighting-overlay" />
                    <div className="vane-edge-bevel" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================================
            3. INTERACTIVE FLOATING ARROWS (PREV / NEXT)
            ================================================================== */}
        <button
          type="button"
          onClick={handlePrev}
          className="kinetic-arrow-btn prev"
          aria-label="Previous Architectural Project"
          disabled={isAnimating}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="kinetic-arrow-btn next"
          aria-label="Next Architectural Project"
          disabled={isAnimating}
        >
          <ChevronRight size={22} />
        </button>

        {/* ==================================================================
            4. FLOATING EDITORIAL METADATA & CONTROL BAR
            ================================================================== */}
        <div ref={metaRef} className="kinetic-meta-layer">
          {/* Top Bar */}
          <div className="kinetic-top-row">
            <div className="kinetic-badge-pill">
              <span className="kinetic-badge-num">{currentProject.number}</span>
              <span className="kinetic-badge-dot">•</span>
              <span>{currentProject.category}</span>
            </div>

            {/* Swipe Guide Pill */}
            <div className="kinetic-swipe-badge">
              <MoveHorizontal size={14} className="kinetic-swipe-icon" />
              <span>SWIPE OR DRAG TO ROTATE</span>
            </div>

            <div className="kinetic-status-pill">
              <Sparkles size={13} />
              <span>DELIVERED • ROYAL NESTO</span>
            </div>
          </div>

          {/* Bottom Editorial Details */}
          <div className="kinetic-bottom-row">
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                <Layers size={13} />
                <span>{currentProject.category} • {currentProject.year}</span>
              </span>
              <h2 className="kinetic-project-title">{currentProject.title}</h2>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{currentProject.location} • {currentProject.area}</span>
              </div>
              <p className="kinetic-project-desc">{currentProject.description}</p>
            </div>

            {/* Right Scope Box & Interactive Chapter Pills */}
            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{currentProject.scope}</span>

              {/* Chapter Navigation Tabs */}
              <div className="kinetic-nav-strip">
                {KINETIC_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => goToProject(idx, idx > currentIdx ? 'next' : 'prev')}
                    className={`kinetic-nav-btn ${idx === currentIdx ? 'active' : ''}`}
                    disabled={isAnimating}
                  >
                    {idx === 0 ? '01 SALON' : idx === 1 ? '02 SUITE' : '03 MILLWORK'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KineticVaneShowcase;
