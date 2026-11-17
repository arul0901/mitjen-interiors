import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { KINETIC_PROJECTS } from './kineticVaneData';
import './KineticVaneShowcase.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const TOTAL_VANES = 20;

export const KineticVaneShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);

  // Vane blade, face, and specular lighting refs
  const bladeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const backFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Current stage: 0 = Image 1, 1 = Image 2, 2 = Image 3
  const stageRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Preload all 3 architectural project images to prevent flicker during transitions
  useEffect(() => {
    KINETIC_PROJECTS.slice(0, 3).forEach((proj) => {
      const img = new Image();
      img.src = proj.image;
    });
  }, []);

  // Master GSAP ScrollTrigger Setup
  useEffect(() => {
    const container = containerRef.current;
    const viewport = stickyViewportRef.current;
    if (!container || !viewport) return;

    const win = window as any;
    const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;
    const activeGsap = win.gsap || gsap;

    try {
      activeGsap.registerPlugin(activeScrollTrigger, ScrollToPlugin);
    } catch {}

    // Link global Lenis smooth scroll if present
    if (win.lenisInstance && typeof win.lenisInstance.on === 'function') {
      win.lenisInstance.on('scroll', () => {
        activeScrollTrigger.update();
      });
    }

    const blades = bladeRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const frontFaces = frontFaceRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const lights = lightRefs.current.filter((el): el is HTMLDivElement => el !== null);

    // Initial vane states: all face camera at 0° with Image 1
    activeGsap.set(blades, { rotateY: 0 });
    activeGsap.set(lights, { opacity: 0 });
    activeGsap.set(frontFaces, {
      backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
    });
    activeGsap.set(backFaceRefs.current.filter((el): el is HTMLDivElement => el !== null), {
      backgroundImage: `url("${KINETIC_PROJECTS[1].image}")`,
    });

    // =========================================================================
    // MASTER SCRUB TIMELINE
    // Total Duration: 2.0 units
    // Stage 1 (0.0 -> 1.0): Transition 1 (Image 1 -> Image 2 via 180° rotation)
    // Stage 2 (1.0 -> 2.0): Transition 2 (Image 2 -> Image 3 via 360° rotation)
    // =========================================================================
    const tl = activeGsap.timeline({
      paused: true,
      defaults: { ease: 'power2.inOut' },
    });

    // --- TRANSITION 1: Image 1 -> Image 2 (Timeline 0.0 -> 1.0) ---
    // Vanes rotate 180° in a smooth staggered sequence
    tl.to(
      blades,
      {
        rotateY: 180,
        duration: 0.85,
        stagger: {
          each: 0.02,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      0.05
    );

    // Subtle specular reflection as vanes catch directional lighting
    tl.to(
      lights,
      {
        opacity: 0.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.02,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      0.1
    );

    // --- MIDPOINT SWAP (Timeline 1.0): Front faces facing away (at 180°) ---
    // Swap front face image to Image 3 completely invisibly while facing away
    tl.set(
      frontFaces,
      {
        backgroundImage: `url("${KINETIC_PROJECTS[2].image}")`,
      },
      1.0
    );

    // When scrolling backwards past 0.99, restore Image 1
    tl.set(
      frontFaces,
      {
        backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
      },
      0.99
    );

    // --- TRANSITION 2: Image 2 -> Image 3 (Timeline 1.0 -> 2.0) ---
    // Vanes rotate from 180° to 360° revealing Image 3 on front faces
    tl.to(
      blades,
      {
        rotateY: 360,
        duration: 0.85,
        stagger: {
          each: 0.02,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      1.05
    );

    // Specular lighting reflection on second transition
    tl.to(
      lights,
      {
        opacity: 0.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.02,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      1.1
    );

    // Resting buffer on Image 3 (Timeline 2.0 -> 2.4)
    tl.to({}, { duration: 0.4 }, 2.0);

    // =========================================================================
    // PINNED SCROLLTRIGGER: Divided into exactly 3 logical stages
    // Stage 1 (0.00 -> 0.45): Image 1 -> Image 2
    // Stage 2 (0.45 -> 0.85): Image 2 -> Image 3
    // Stage 3 (0.85 -> 1.00): Pin release -> Natural scroll to website content
    // =========================================================================
    const st = activeScrollTrigger.create({
      id: 'kinetic-vane-pin-trigger',
      trigger: container,
      start: 'top top',
      end: '+=220%',
      pin: viewport,
      scrub: 0.5,
      snap: {
        snapTo: [0.0, 0.42, 0.85],
        duration: { min: 0.25, max: 0.5 },
        ease: 'power2.inOut',
      },
      animation: tl,
      onUpdate: (self: { progress: number }) => {
        const p = self.progress;
        if (p < 0.25) {
          stageRef.current = 0;
        } else if (p < 0.65) {
          stageRef.current = 1;
        } else {
          stageRef.current = 2;
        }
      },
    });

    scrollTriggerRef.current = st;

    // Helper to scroll to specific target position smoothly
    const scrollToY = (targetY: number, onDone?: () => void) => {
      if (win.lenisInstance && typeof win.lenisInstance.scrollTo === 'function') {
        win.lenisInstance.scrollTo(targetY, {
          duration: 0.75,
          onComplete: onDone,
        });
      } else {
        activeGsap.to(window, {
          scrollTo: { y: targetY, autoKill: false },
          duration: 0.75,
          ease: 'power2.inOut',
          onComplete: onDone,
        });
      }
    };

    // Stage progression controller (Stage 0 -> Stage 1 -> Stage 2)
    const goToStage = (targetStage: number) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      stageRef.current = targetStage;

      const progressMap = [0.0, 0.42, 0.85];
      const targetProgress = progressMap[targetStage];
      const targetY = st.start + targetProgress * (st.end - st.start);

      scrollToY(targetY, () => {
        isAnimatingRef.current = false;
      });
    };

    // Third interaction: Release showcase and scroll naturally into content below
    const exitToContent = () => {
      isAnimatingRef.current = true;
      const targetEl = document.getElementById('livspace-portfolio-section');
      const targetY = targetEl
        ? targetEl.getBoundingClientRect().top + window.scrollY
        : st.end + 20;

      scrollToY(targetY, () => {
        isAnimatingRef.current = false;
      });
    };

    // =========================================================================
    // INTENTIONAL SCROLL / SWIPE LISTENER (PREVENTS ACCIDENTAL SKIPPING)
    // Interaction 1: Image 1 -> Image 2
    // Interaction 2: Image 2 -> Image 3
    // Interaction 3: Exit showcase -> Website content
    // =========================================================================
    const onWheel = (e: WheelEvent) => {
      // If user has scrolled into the portfolio content below, allow full normal scrolling
      if (window.scrollY >= st.end + 10 && stageRef.current === 2) {
        return;
      }

      // If user is inside the pinned showcase:
      if (window.scrollY <= st.end + 10) {
        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        // Ignore micro-jitters
        if (Math.abs(e.deltaY) < 16) return;

        if (e.deltaY > 0) {
          // SCROLL DOWN
          if (stageRef.current === 0) {
            e.preventDefault();
            goToStage(1);
          } else if (stageRef.current === 1) {
            e.preventDefault();
            goToStage(2);
          } else if (stageRef.current === 2) {
            // Third interaction: Release showcase -> Website content
            e.preventDefault();
            exitToContent();
          }
        } else {
          // SCROLL UP
          if (stageRef.current === 2) {
            e.preventDefault();
            goToStage(1);
          } else if (stageRef.current === 1) {
            e.preventDefault();
            goToStage(0);
          }
        }
      }
    };

    // Touch Swipe Support for Mobile & Tablet
    let touchStartY = 0;
    let touchStartX = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (window.scrollY <= st.end && stageRef.current < 2) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (window.scrollY >= st.end + 50) return;
      if (isAnimatingRef.current) return;

      const dy = e.changedTouches[0].clientY - touchStartY;
      const dx = e.changedTouches[0].clientX - touchStartX;

      // Swipe UP on screen / Swipe LEFT = Advance forward
      if (dy < -35 || dx < -45) {
        if (stageRef.current === 0) {
          goToStage(1);
        } else if (stageRef.current === 1) {
          goToStage(2);
        } else if (stageRef.current === 2) {
          exitToContent();
        }
      }
      // Swipe DOWN on screen / Swipe RIGHT = Reverse backward
      else if (dy > 35 || dx > 45) {
        if (stageRef.current === 2) {
          goToStage(1);
        } else if (stageRef.current === 1) {
          goToStage(0);
        }
      }
    };

    // Keyboard Arrow navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY >= st.end + 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        if (stageRef.current === 0) {
          e.preventDefault();
          goToStage(1);
        } else if (stageRef.current === 1) {
          e.preventDefault();
          goToStage(2);
        } else if (stageRef.current === 2) {
          e.preventDefault();
          exitToContent();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        if (stageRef.current === 2) {
          e.preventDefault();
          goToStage(1);
        } else if (stageRef.current === 1) {
          e.preventDefault();
          goToStage(0);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    // Refresh after DOM layout calculation
    const timer = setTimeout(() => {
      activeScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="kinetic-showcase-container"
      aria-label="Kinetic Rotating Vane Showcase"
    >
      <div ref={stickyViewportRef} className="kinetic-sticky-viewport">
        {/* ==================================================================
            20-VANE 3D ROTATING LOUVRE MECHANISM (CLEAN ARCHITECTURAL BANNER)
            No text overlays, no titles, no buttons, no captions.
            Pure mechanical louvre transition between the 3 project images.
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
                  {/* Front Face: Starts with Image 1, swaps to Image 3 at midpoint */}
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

                  {/* Back Face: Image 2 */}
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
      </div>
    </div>
  );
};

export default KineticVaneShowcase;
