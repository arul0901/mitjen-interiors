import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  MapPin,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  ArrowDown,
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

  // Synchronous ref for event listeners
  const currentIdxRef = useRef<number>(0);
  currentIdxRef.current = currentIdx;

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

  // Smooth scroll helper to advance to portfolio section below
  const scrollToPortfolio = useCallback(() => {
    const target = document.getElementById('livspace-portfolio-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Core Programmatic Transition Function
  const goToProject = useCallback(
    (targetIdx: number, direction: 'next' | 'prev' = 'next') => {
      if (isTransitioningRef.current || targetIdx === currentIdxRef.current) return;
      isTransitioningRef.current = true;
      setIsAnimating(true);

      const fromIdx = currentIdxRef.current;
      const typoIdx = direction === 'next' ? fromIdx : targetIdx;
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
          setCurrentIdx(targetIdx);
          currentIdxRef.current = targetIdx;
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
    []
  );

  const handleNext = useCallback(() => {
    const curr = currentIdxRef.current;
    if (curr < KINETIC_PROJECTS.length - 1) {
      // While swiping between projects, WAIT and rotate to next (do not go below!)
      goToProject(curr + 1, 'next');
    } else {
      // All images have been shown! Now scroll down to the portfolio below!
      scrollToPortfolio();
    }
  }, [goToProject, scrollToPortfolio]);

  const handlePrev = useCallback(() => {
    const curr = currentIdxRef.current;
    if (curr > 0) {
      goToProject(curr - 1, 'prev');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [goToProject]);

  // Touch & Swipe Event Tracking (Native Non-Passive Listener for Smooth Lock & Release)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let isTracking = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isTracking = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTracking || e.touches.length !== 1) return;
      const curr = currentIdxRef.current;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      // When all images have NOT yet been shown (Project 1 or 2):
      // LOCK scroll and WAIT! Do not let the page slip down below!
      if (curr < KINETIC_PROJECTS.length - 1) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          if (e.cancelable) {
            e.preventDefault();
          }
        }
      } else {
        // When all images HAVE been shown (Project 3):
        // Allow the user to scroll down smoothly to the portfolio below!
        // But if they are swiping downwards (finger moving down, dy > 15), lock and allow returning to Project 2
        if (dy > 15 && Math.abs(dy) > Math.abs(dx)) {
          if (e.cancelable) {
            e.preventDefault();
          }
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isTracking) return;
      isTracking = false;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const curr = currentIdxRef.current;

      // Detect deliberate swipe gesture (horizontal or vertical)
      if (absDx > 35 || absDy > 35) {
        // Swipe forward (swipe left or swipe up)
        if (dx < -35 || dy < -35) {
          if (curr < KINETIC_PROJECTS.length - 1) {
            handleNext();
          } else {
            // All images shown -> scroll down to the portfolio below!
            scrollToPortfolio();
          }
        }
        // Swipe backward (swipe right or swipe down)
        else if (dx > 35 || dy > 35) {
          if (curr > 0) {
            handlePrev();
          }
        }
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleNext, handlePrev, scrollToPortfolio]);

  // Mouse Drag Handlers (Desktop Swipe / Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - touchStartX.current;
    const deltaY = e.clientY - touchStartY.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX > 35 || absY > 35) {
      if (deltaX < -35 || deltaY < -35) {
        handleNext();
      } else if (deltaX > 35 || deltaY > 35) {
        handlePrev();
      }
    }
  };

  // Wheel & Trackpad Intercept: Locks and waits while swiping, scrolls down after all images shown
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleNativeWheel = (e: WheelEvent) => {
      const curr = currentIdxRef.current;

      // When on Project 0 or 1 and scrolling down:
      // PREVENT page scroll from going below! Wait and advance to next project!
      if (curr < KINETIC_PROJECTS.length - 1 && e.deltaY > 0) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastWheelTime.current > 750) {
          lastWheelTime.current = now;
          handleNext();
        }
      } else if (curr > 0 && e.deltaY < 0) {
        // When on Project 1 or 2 and scrolling up:
        // PREVENT page scroll from jumping away! Go back to previous project!
        e.preventDefault();
        const now = Date.now();
        if (now - lastWheelTime.current > 750) {
          lastWheelTime.current = now;
          handlePrev();
        }
      }
      // If curr === 2 (all images have been shown) and e.deltaY > 0:
      // Allow natural scroll down into the portfolio below!
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleNativeWheel);
    };
  }, [handleNext, handlePrev]);

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
  const isLastProject = currentIdx === KINETIC_PROJECTS.length - 1;

  return (
    <section
      ref={sectionRef}
      className={`kinetic-showcase-section ${isLastProject ? 'all-images-revealed' : 'swiping-locked'}`}
      aria-label="Kinetic Rotating Vane Showcase"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
            3. INTERACTIVE FLOATING ARROWS (PREV / NEXT OR SCROLL DOWN)
            ================================================================== */}
        <button
          type="button"
          onClick={handlePrev}
          className="kinetic-arrow-btn prev"
          aria-label="Previous Architectural Project"
          disabled={isAnimating || currentIdx === 0}
          style={{ opacity: currentIdx === 0 ? 0.35 : 1 }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="kinetic-arrow-btn next"
          aria-label={isLastProject ? 'Scroll down to portfolio' : 'Next Architectural Project'}
          disabled={isAnimating}
          title={isLastProject ? 'Explore Full Portfolio' : 'Next Space'}
        >
          {isLastProject ? <ArrowDown size={22} /> : <ChevronRight size={22} />}
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

            {/* Dynamic Swipe / Scroll Indicator */}
            <div className="kinetic-swipe-badge">
              {isLastProject ? (
                <>
                  <ArrowDown size={14} className="kinetic-swipe-icon" />
                  <span>ALL IMAGES SHOWN • SWIPE DOWN TO CONTINUE</span>
                </>
              ) : (
                <>
                  <MoveHorizontal size={14} className="kinetic-swipe-icon" />
                  <span>SWIPE TO REVEAL NEXT SPACE (WAIT)</span>
                </>
              )}
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

              {/* Action row on bottom right */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {isLastProject && (
                  <button
                    type="button"
                    onClick={scrollToPortfolio}
                    className="kinetic-explore-cta-pill"
                    aria-label="Scroll down to authentic portfolio"
                  >
                    <span>View All 4 Projects</span>
                    <ArrowDown size={13} />
                  </button>
                )}

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
      </div>
    </section>
  );
};

export default KineticVaneShowcase;
