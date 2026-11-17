import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import { KINETIC_PROJECTS } from './kineticVaneData';
import './KineticVaneShowcase.css';

// Ensure GSAP ScrollTrigger plugin is registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_VANES = 20;

export const KineticVaneShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);
  const redStage1Ref = useRef<HTMLDivElement>(null);
  const redStage2Ref = useRef<HTMLDivElement>(null);

  // Metadata layer refs for each of the 3 projects
  const meta0Ref = useRef<HTMLDivElement>(null);
  const meta1Ref = useRef<HTMLDivElement>(null);
  const meta2Ref = useRef<HTMLDivElement>(null);

  // Blade, face, and lighting refs
  const bladeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Active project index (0, 1, or 2) driven smoothly by ScrollTrigger
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeIdxRef = useRef<number>(0);
  activeIdxRef.current = activeIdx;

  // ScrollTrigger instance ref
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Helper to split text into animated character spans
  const renderChars = (text: string) =>
    text.split('').map((ch, idx) => (
      <span key={idx} className="char">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  // Scroll navigation helper that coordinates with Lenis and window
  const scrollToTarget = (targetY: number) => {
    const win = window as any;
    if (win.lenisInstance && typeof win.lenisInstance.scrollTo === 'function') {
      win.lenisInstance.scrollTo(targetY, { duration: 1.1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Navigate to specific project phase (0, 1, or 2)
  const goToPhase = (phaseIdx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const progressMap = [0.02, 0.40, 0.80];
    const targetProgress = progressMap[Math.min(Math.max(phaseIdx, 0), 2)];
    const targetY = st.start + targetProgress * (st.end - st.start);
    scrollToTarget(targetY);
  };

  // Advance to next project or scroll down to full portfolio below
  const handleNext = () => {
    const curr = activeIdxRef.current;
    if (curr < 2) {
      goToPhase(curr + 1);
    } else {
      // All 3 spaces shown -> Scroll down into verified portfolio below
      const target = document.getElementById('livspace-portfolio-section');
      if (target) {
        const win = window as any;
        if (win.lenisInstance && typeof win.lenisInstance.scrollTo === 'function') {
          win.lenisInstance.scrollTo(target, { duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Go to previous project or scroll to top
  const handlePrev = () => {
    const curr = activeIdxRef.current;
    if (curr > 0) {
      goToPhase(curr - 1);
    } else {
      scrollToTarget(0);
    }
  };

  // Master GSAP ScrollTrigger Setup
  useEffect(() => {
    const container = containerRef.current;
    const viewport = stickyViewportRef.current;
    if (!container || !viewport) return;

    // Connect with unified window GSAP/ScrollTrigger if present
    const win = window as any;
    const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;
    const activeGsap = win.gsap || gsap;

    try {
      activeGsap.registerPlugin(activeScrollTrigger);
    } catch {}

    // Link Lenis to ScrollTrigger update
    if (win.lenisInstance && typeof win.lenisInstance.on === 'function') {
      win.lenisInstance.on('scroll', () => {
        activeScrollTrigger.update();
      });
    }

    const blades = bladeRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const frontFaces = frontFaceRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const lights = lightRefs.current.filter((el): el is HTMLDivElement => el !== null);

    const red1 = redStage1Ref.current;
    const red2 = redStage2Ref.current;
    const spot1 = red1?.querySelector('.kinetic-dark-spotlight');
    const spot2 = red2?.querySelector('.kinetic-dark-spotlight');
    const chars1 = red1?.querySelectorAll<HTMLElement>('.char') || [];
    const chars2 = red2?.querySelectorAll<HTMLElement>('.char') || [];

    const meta0 = meta0Ref.current;
    const meta1 = meta1Ref.current;
    const meta2 = meta2Ref.current;

    // Reset initial states
    activeGsap.set(blades, { rotateY: 0 });
    activeGsap.set(lights, { opacity: 0 });
    activeGsap.set([red1, red2], { autoAlpha: 0 });
    if (spot1) activeGsap.set(spot1, { opacity: 0, scale: 0.85 });
    if (spot2) activeGsap.set(spot2, { opacity: 0, scale: 0.85 });
    activeGsap.set(chars1, { yPercent: 120, opacity: 0 });
    activeGsap.set(chars2, { yPercent: 120, opacity: 0 });
    activeGsap.set(meta0, { autoAlpha: 1, y: 0 });
    activeGsap.set(meta1, { autoAlpha: 0, y: 30 });
    activeGsap.set(meta2, { autoAlpha: 0, y: 30 });

    // Set initial front face backgrounds to Project 01
    activeGsap.set(frontFaces, {
      backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
    });

    // Create the master Scrub Timeline
    const tl = activeGsap.timeline({
      paused: true,
      defaults: { ease: 'power2.inOut' },
    });

    // =========================================================================
    // DARK CINEMATIC INTERLUDE 01: Project 01 -> 02 (6-PHASE CHOREOGRAPHY)
    // Timeline unit: 0.00 -> 1.00
    // =========================================================================

    // Phase 01: Outgoing Project 01 metadata exits
    tl.to(
      meta0,
      {
        autoAlpha: 0,
        y: -30,
        duration: 0.22,
        ease: 'power2.in',
      },
      0.08
    );

    // Phase 02: Dark Architectural Environment emerges behind louvres
    tl.to(
      red1,
      {
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power1.inOut',
      },
      0.12
    );

    if (spot1) {
      tl.to(
        spot1,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.14
      );
    }

    // Phase 03: 3D Rotating Louvre Blades rotate 180° & Incoming Typography reveals
    tl.to(
      blades,
      {
        rotateY: 180,
        duration: 0.65,
        stagger: {
          each: 0.016,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      0.16
    );

    tl.to(
      lights,
      {
        opacity: 0.75,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.016,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      0.18
    );

    tl.to(
      chars1,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.012,
        duration: 0.28,
        ease: 'power3.out',
      },
      0.18
    );

    // Phase 04: Cinematic Typographic Moment (Controlled architectural hold)
    tl.to(
      chars1,
      {
        letterSpacing: '0.04em',
        duration: 0.2,
        ease: 'sine.inOut',
      },
      0.46
    );

    // Phase 05: Typography exits through upper mask & Dark Stage conceals
    tl.to(
      chars1,
      {
        yPercent: -120,
        opacity: 0,
        stagger: 0.008,
        duration: 0.2,
        ease: 'power3.in',
      },
      0.58
    );

    tl.to(
      red1,
      {
        autoAlpha: 0,
        duration: 0.24,
        ease: 'power1.inOut',
      },
      0.65
    );

    // Phase 06: Project 02 Image settles & Metadata arrives
    tl.to(
      meta1,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.72
    );

    // =========================================================================
    // MIDPOINT (1.00): PROJECT 02 FULLY VISIBLE & FRONT FACE SWAPPED
    // Front face is at 180° (facing away from camera), so we swap its background
    // to Project 03 completely invisibly!
    // =========================================================================
    tl.set(
      frontFaces,
      {
        backgroundImage: `url("${KINETIC_PROJECTS[2].image}")`,
      },
      1.0
    );

    // When scrolling backward past 0.99, restore Project 01 image
    tl.set(
      frontFaces,
      {
        backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
      },
      0.99
    );

    // =========================================================================
    // DARK CINEMATIC INTERLUDE 02: Project 02 -> 03 (6-PHASE CHOREOGRAPHY)
    // Timeline unit: 1.00 -> 2.00
    // =========================================================================

    // Phase 01: Project 02 metadata exits
    tl.to(
      meta1,
      {
        autoAlpha: 0,
        y: -30,
        duration: 0.22,
        ease: 'power2.in',
      },
      1.08
    );

    // Phase 02: Dark Architectural Environment emerges
    tl.to(
      red2,
      {
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power1.inOut',
      },
      1.12
    );

    if (spot2) {
      tl.to(
        spot2,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        1.14
      );
    }

    // Phase 03: Louvre Blades rotate from 180° to 360° & Incoming Typography reveals
    tl.to(
      blades,
      {
        rotateY: 360,
        duration: 0.65,
        stagger: {
          each: 0.016,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      1.16
    );

    tl.to(
      lights,
      {
        opacity: 0.75,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.016,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      1.18
    );

    tl.to(
      chars2,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.012,
        duration: 0.28,
        ease: 'power3.out',
      },
      1.18
    );

    // Phase 04: Cinematic Typographic Moment (Controlled architectural hold)
    tl.to(
      chars2,
      {
        letterSpacing: '0.04em',
        duration: 0.2,
        ease: 'sine.inOut',
      },
      1.46
    );

    // Phase 05: Typography exits & Dark Stage conceals
    tl.to(
      chars2,
      {
        yPercent: -120,
        opacity: 0,
        stagger: 0.008,
        duration: 0.2,
        ease: 'power3.in',
      },
      1.58
    );

    tl.to(
      red2,
      {
        autoAlpha: 0,
        duration: 0.24,
        ease: 'power1.inOut',
      },
      1.65
    );

    // Phase 06: Project 03 Image settles & Metadata arrives
    tl.to(
      meta2,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      },
      1.72
    );

    // 17. Generous resting buffer on Project 03 so it remains completely pinned and stable,
    // preventing any content or boxes from below from encroaching or coming upward into the showcase!
    tl.to({}, { duration: 0.85 }, 1.75);

    // Create the master Pinned ScrollTrigger
    const st = activeScrollTrigger.create({
      id: 'kinetic-vane-pin-trigger',
      trigger: container,
      start: 'top top',
      end: '+=300%',
      pin: viewport,
      scrub: 0.5,
      snap: {
        snapTo: [0.02, 0.40, 0.80],
        duration: { min: 0.2, max: 0.45 },
        ease: 'power1.inOut',
      },
      animation: tl,
      onUpdate: (self: { progress: number }) => {
        const p = self.progress;
        let idx = 0;
        if (p > 0.62) {
          idx = 2;
        } else if (p > 0.22) {
          idx = 1;
        }
        if (activeIdxRef.current !== idx) {
          setActiveIdx(idx);
          activeIdxRef.current = idx;
        }
      },
    });

    scrollTriggerRef.current = st;

    // Refresh after DOM layout calculation
    const timer = setTimeout(() => {
      activeScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      st.kill();
      tl.kill();
    };
  }, []);

  // Keyboard navigation support
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
  }, []);

  // Touch horizontal swipe listener for mobile (swiping left / right)
  useEffect(() => {
    const viewport = stickyViewportRef.current;
    if (!viewport) return;

    let touchX = 0;
    let touchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchX;
      const dy = e.changedTouches[0].clientY - touchY;
      // Only trigger on clear horizontal swipes
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        if (dx < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const isLastProject = activeIdx === 2;

  return (
    <div
      ref={containerRef}
      className="kinetic-showcase-container"
      aria-label="Kinetic Rotating Vane Showcase"
    >
      <div ref={stickyViewportRef} className="kinetic-sticky-viewport">
        {/* ==================================================================
            1. DARK CINEMATIC ARCHITECTURAL INTERLUDE (CHAPTER 01)
            ================================================================== */}
        <div ref={redStage1Ref} className="kinetic-dark-stage">
          <div className="kinetic-dark-spotlight" />
          <div className="kinetic-dark-grid-overlay" />
          <div className="kinetic-dark-center-editorial">
            <span className="kinetic-dark-eyebrow">
              {KINETIC_PROJECTS[0].transitionTitle.eyebrow}
            </span>
            <div className="kinetic-dark-title-mask">
              <h2 className="kinetic-typo-line">
                {renderChars(KINETIC_PROJECTS[0].transitionTitle.line1)}
              </h2>
            </div>
            <div className="kinetic-dark-title-mask">
              <h2 className="kinetic-typo-line italic-accent">
                {renderChars(KINETIC_PROJECTS[0].transitionTitle.line2)}
              </h2>
            </div>
            <p className="kinetic-dark-subtitle">
              {KINETIC_PROJECTS[0].transitionTitle.subtext}
            </p>
          </div>
          <div className="kinetic-dark-meta-tag top-left">
            {KINETIC_PROJECTS[0].transitionTitle.coord}
          </div>
          <div className="kinetic-dark-meta-tag bottom-right">
            AXIS-Y ROTATION // MECHANICAL LOUVRES
          </div>
        </div>

        {/* ==================================================================
            2. DARK CINEMATIC ARCHITECTURAL INTERLUDE (CHAPTER 02)
            ================================================================== */}
        <div ref={redStage2Ref} className="kinetic-dark-stage">
          <div className="kinetic-dark-spotlight" />
          <div className="kinetic-dark-grid-overlay" />
          <div className="kinetic-dark-center-editorial">
            <span className="kinetic-dark-eyebrow">
              {KINETIC_PROJECTS[1].transitionTitle.eyebrow}
            </span>
            <div className="kinetic-dark-title-mask">
              <h2 className="kinetic-typo-line">
                {renderChars(KINETIC_PROJECTS[1].transitionTitle.line1)}
              </h2>
            </div>
            <div className="kinetic-dark-title-mask">
              <h2 className="kinetic-typo-line italic-accent">
                {renderChars(KINETIC_PROJECTS[1].transitionTitle.line2)}
              </h2>
            </div>
            <p className="kinetic-dark-subtitle">
              {KINETIC_PROJECTS[1].transitionTitle.subtext}
            </p>
          </div>
          <div className="kinetic-dark-meta-tag top-left">
            {KINETIC_PROJECTS[1].transitionTitle.coord}
          </div>
          <div className="kinetic-dark-meta-tag bottom-right">
            AXIS-Y 360° // TERMINAL CONVERGENCE
          </div>
        </div>

        {/* ==================================================================
            3. 20-VANE 3D ROTATING LOUVRE MECHANISM
            ================================================================== */}
        <div className="kinetic-vanes-layer">
          {Array.from({ length: TOTAL_VANES }).map((_, i) => {
            const vaneWidthPercent = 100 / TOTAL_VANES;
            const vaneLeftPercent = i * vaneWidthPercent;

            return (
              <div
                key={i}
                className="kinetic-vane-unit"
                style={{
                  width: `${vaneWidthPercent}%`,
                  left: `${vaneLeftPercent}%`,
                }}
              >
                <div
                  ref={(el) => {
                    bladeRefs.current[i] = el;
                  }}
                  className="kinetic-vane-blade"
                >
                  {/* Front Face: Starts with Project 01, swaps to Project 03 at midpoint */}
                  <div className="vane-face front">
                    <div
                      ref={(el) => {
                        frontFaceRefs.current[i] = el;
                      }}
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
                        left: `-${i * (100 / TOTAL_VANES)}vw`,
                      }}
                    />
                  </div>

                  {/* Back Face: Project 02 */}
                  <div className="vane-face back">
                    <div
                      ref={(el) => {
                        backFaceRefs.current[i] = el;
                      }}
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${KINETIC_PROJECTS[1].image}")`,
                        left: `-${i * (100 / TOTAL_VANES)}vw`,
                      }}
                    />
                  </div>

                  {/* Specular Lighting Overlay */}
                  <div
                    ref={(el) => {
                      lightRefs.current[i] = el;
                    }}
                    className="vane-lighting-overlay"
                  />

                  {/* Architectural Bevel Edge */}
                  <div className="vane-edge-bevel" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================================
            4. THREE ARCHITECTURAL METADATA LAYERS (ONE PER PROJECT)
            ================================================================== */}

        {/* Project 01 Metadata */}
        <div ref={meta0Ref} className="kinetic-meta-layer meta-0">
          <div className="kinetic-top-row">
            <div className="kinetic-badge-pill">
              <span className="kinetic-badge-num">01 / 03</span>
              <span className="kinetic-badge-dot">•</span>
              <span>{KINETIC_PROJECTS[0].category}</span>
            </div>
            <div className="kinetic-status-pill">
              <Sparkles size={13} />
              <span>DELIVERED RESIDENCE</span>
            </div>
          </div>
          <div className="kinetic-bottom-row">
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                {KINETIC_PROJECTS[0].year} • {KINETIC_PROJECTS[0].area}
              </span>
              <h1 className="kinetic-project-title">{KINETIC_PROJECTS[0].title}</h1>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{KINETIC_PROJECTS[0].location}</span>
              </div>
              <p className="kinetic-project-desc">{KINETIC_PROJECTS[0].description}</p>
            </div>
            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{KINETIC_PROJECTS[0].scope}</span>
            </div>
          </div>
        </div>

        {/* Project 02 Metadata */}
        <div ref={meta1Ref} className="kinetic-meta-layer meta-1" style={{ opacity: 0 }}>
          <div className="kinetic-top-row">
            <div className="kinetic-badge-pill">
              <span className="kinetic-badge-num">02 / 03</span>
              <span className="kinetic-badge-dot">•</span>
              <span>{KINETIC_PROJECTS[1].category}</span>
            </div>
            <div className="kinetic-status-pill">
              <Sparkles size={13} />
              <span>DELIVERED RESIDENCE</span>
            </div>
          </div>
          <div className="kinetic-bottom-row">
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                {KINETIC_PROJECTS[1].year} • {KINETIC_PROJECTS[1].area}
              </span>
              <h1 className="kinetic-project-title">{KINETIC_PROJECTS[1].title}</h1>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{KINETIC_PROJECTS[1].location}</span>
              </div>
              <p className="kinetic-project-desc">{KINETIC_PROJECTS[1].description}</p>
            </div>
            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{KINETIC_PROJECTS[1].scope}</span>
            </div>
          </div>
        </div>

        {/* Project 03 Metadata */}
        <div ref={meta2Ref} className="kinetic-meta-layer meta-2" style={{ opacity: 0 }}>
          <div className="kinetic-top-row">
            <div className="kinetic-badge-pill">
              <span className="kinetic-badge-num">03 / 03</span>
              <span className="kinetic-badge-dot">•</span>
              <span>{KINETIC_PROJECTS[2].category}</span>
            </div>
            <div className="kinetic-status-pill">
              <Sparkles size={13} />
              <span>DELIVERED RESIDENCE</span>
            </div>
          </div>
          <div className="kinetic-bottom-row">
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                {KINETIC_PROJECTS[2].year} • {KINETIC_PROJECTS[2].area}
              </span>
              <h1 className="kinetic-project-title">{KINETIC_PROJECTS[2].title}</h1>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{KINETIC_PROJECTS[2].location}</span>
              </div>
              <p className="kinetic-project-desc">{KINETIC_PROJECTS[2].description}</p>
            </div>
            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{KINETIC_PROJECTS[2].scope}</span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            5. INTERACTIVE FLOATING CONTROLS & NAVIGATION STRIP
            ================================================================== */}
        <button
          type="button"
          onClick={handlePrev}
          className="kinetic-arrow-btn prev"
          aria-label="Previous Architectural Space"
          disabled={activeIdx === 0}
          style={{ opacity: activeIdx === 0 ? 0.35 : 1 }}
        >
          {activeIdx === 0 ? <ArrowUp size={22} /> : <ChevronLeft size={22} />}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="kinetic-arrow-btn next"
          aria-label={isLastProject ? 'Scroll Down to Full Portfolio' : 'Next Architectural Space'}
          title={isLastProject ? 'Scroll Down to Full Portfolio' : 'Next Architectural Space'}
        >
          {isLastProject ? <ArrowDown size={22} /> : <ChevronRight size={22} />}
        </button>

        {/* Persistent Bottom Floating Action Center */}
        <div className="kinetic-floating-action-center">
          {/* Status Hint */}
          <div className="kinetic-swipe-badge">
            {isLastProject ? (
              <>
                <ArrowDown size={14} className="kinetic-swipe-icon" />
                <span>ALL 3 SPACES REVEALED • SCROLL DOWN TO EXPLORE</span>
              </>
            ) : (
              <>
                <Layers size={14} className="kinetic-swipe-icon" />
                <span>SCROLL / DRAG TO ROTATE LOUVRES</span>
              </>
            )}
          </div>

          {/* Quick Chapter Switcher & Full Portfolio CTA */}
          <div className="kinetic-actions-row">
            {isLastProject && (
              <button
                type="button"
                onClick={handleNext}
                className="kinetic-explore-cta-pill"
                aria-label="Scroll down to authentic portfolio"
              >
                <span>View All 4 Projects</span>
                <ArrowDown size={13} />
              </button>
            )}

            <div className="kinetic-nav-strip">
              <button
                type="button"
                onClick={() => goToPhase(0)}
                className={`kinetic-nav-btn ${activeIdx === 0 ? 'active' : ''}`}
              >
                01 SALON
              </button>
              <button
                type="button"
                onClick={() => goToPhase(1)}
                className={`kinetic-nav-btn ${activeIdx === 1 ? 'active' : ''}`}
              >
                02 SUITE
              </button>
              <button
                type="button"
                onClick={() => goToPhase(2)}
                className={`kinetic-nav-btn ${activeIdx === 2 ? 'active' : ''}`}
              >
                03 MILLWORK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KineticVaneShowcase;
