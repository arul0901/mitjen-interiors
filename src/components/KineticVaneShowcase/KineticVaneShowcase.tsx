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
    // NATURAL CONTINUOUS SCROLL-DRIVEN TIMELINE
    // Total duration: 2.2 units
    // Stage 1 (0.05 -> 0.90): Image 1 -> Image 2 via 180° rotation
    // Stage 1 Plateau (0.90 -> 1.15): Clean view of Image 2 (front face swaps to Image 3)
    // Stage 2 (1.15 -> 2.00): Image 2 -> Image 3 via 360° rotation
    // Stage 2 Plateau (2.00 -> 2.25): Clean view of Image 3 -> natural release to content
    // =========================================================================
    const tl = activeGsap.timeline({
      paused: true,
      defaults: { ease: 'power1.inOut' },
    });

    // --- TRANSITION 1: Image 1 -> Image 2 (0.05 -> 0.90) ---
    tl.to(
      blades,
      {
        rotateY: 180,
        duration: 0.55,
        stagger: {
          each: 0.015,
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
        opacity: 0.45,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.015,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      0.1
    );

    // --- MIDPOINT PLATEAU (1.0): Front faces facing away (at 180°) ---
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

    // --- TRANSITION 2: Image 2 -> Image 3 (1.15 -> 2.00) ---
    tl.to(
      blades,
      {
        rotateY: 360,
        duration: 0.55,
        stagger: {
          each: 0.015,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      1.15
    );

    // Specular lighting reflection on second transition
    tl.to(
      lights,
      {
        opacity: 0.45,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.015,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      1.2
    );

    // Resting buffer on Image 3 (2.00 -> 2.25)
    tl.to({}, { duration: 0.25 }, 2.0);

    // =========================================================================
    // PINNED SCROLLTRIGGER: Natural Continuous Scroll Scrub (Reveals by Scrolling)
    // No hijacking, no forced swipes, no snap locks.
    // =========================================================================
    const st = activeScrollTrigger.create({
      id: 'kinetic-vane-pin-trigger',
      trigger: container,
      start: 'top top',
      end: '+=200%',
      pin: viewport,
      scrub: 0.8, // Fluid responsive scrub that follows scroll naturally
      animation: tl,
      onUpdate: (self: { progress: number }) => {
        // Deterministic guard for bi-directional scrub:
        // Before midpoint, front faces are guaranteed to be Image 1
        // After midpoint, front faces are guaranteed to be Image 3
        if (self.progress < 0.46) {
          activeGsap.set(frontFaces, {
            backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
          });
        } else if (self.progress > 0.54) {
          activeGsap.set(frontFaces, {
            backgroundImage: `url("${KINETIC_PROJECTS[2].image}")`,
          });
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
