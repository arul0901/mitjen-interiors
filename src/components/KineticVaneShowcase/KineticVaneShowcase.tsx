import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { KINETIC_PROJECTS } from './kineticVaneData';
import './KineticVaneShowcase.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export const KineticVaneShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);

  // Responsive vane count: 20 on desktop, 12 on mobile/tablet for silky 60/120fps performance
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const totalVanes = isMobile ? 12 : 20;

  // Active project index (0, 1, or 2)
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Vane blade and specular light refs
  const bladeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Handle responsive resize for mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Preload all 3 architectural project images
  useEffect(() => {
    KINETIC_PROJECTS.slice(0, 3).forEach((proj) => {
      const img = new Image();
      img.src = proj.image;
    });
  }, []);

  // Master GSAP ScrollTrigger Setup with 3D Triangular Prisms
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

    const blades = bladeRefs.current.slice(0, totalVanes).filter((el): el is HTMLDivElement => el !== null);
    const lights = lightRefs.current.slice(0, totalVanes).filter((el): el is HTMLDivElement => el !== null);

    // Initial state: blades face camera at 0° (Face 1 / Image 1)
    activeGsap.set(blades, { rotateY: 0 });
    activeGsap.set(lights, { opacity: 0 });

    // =========================================================================
    // 3D TRIANGULAR PRISM CONTINUOUS SCROLL TIMELINE
    // Total duration: 2.4 units
    //
    // - 0.00 -> 0.15: Intro buffer on Image 1
    // - 0.15 -> 0.85: Transition 1: Rotate 0° -> 120° (Reveals Image 2 on Face 2)
    // - 0.85 -> 1.25: Plateau buffer on Image 2
    // - 1.25 -> 1.95: Transition 2: Rotate 120° -> 240° (Reveals Image 3 on Face 3)
    // - 1.95 -> 2.40: Plateau buffer on Image 3 -> natural release to content
    // =========================================================================
    const tl = activeGsap.timeline({
      paused: true,
      defaults: { ease: 'power1.inOut' },
    });

    // --- TRANSITION 1: Image 1 -> Image 2 (0.15 -> 0.85) ---
    tl.to(
      blades,
      {
        rotateY: 120,
        duration: 0.65,
        stagger: {
          each: 0.016,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      0.15
    );

    // Specular lighting reflection on first rotation
    tl.to(
      lights,
      {
        opacity: 0.4,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.016,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      0.2
    );

    // Plateau for Image 2 (holding at 120°)
    tl.to({}, { duration: 0.35 }, 0.85);

    // --- TRANSITION 2: Image 2 -> Image 3 (1.25 -> 1.95) ---
    tl.to(
      blades,
      {
        rotateY: 240,
        duration: 0.65,
        stagger: {
          each: 0.016,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      1.25
    );

    // Specular lighting reflection on second rotation
    tl.to(
      lights,
      {
        opacity: 0.4,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.016,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      1.3
    );

    // Resting buffer on Image 3
    tl.to({}, { duration: 0.4 }, 1.95);

    // =========================================================================
    // PINNED SCROLLTRIGGER: Natural Continuous Scroll Scrub
    // Pinned for 160% scroll height so it feels responsive and unhurried
    // =========================================================================
    const st = activeScrollTrigger.create({
      id: 'kinetic-vane-pin-trigger',
      trigger: container,
      start: 'top top',
      end: '+=160%',
      pin: viewport,
      scrub: 0.7, // Smooth fluid scrub following user scroll
      animation: tl,
      onUpdate: (self: { progress: number }) => {
        // Update active project index for UI overlay
        if (self.progress < 0.38) {
          setActiveIdx(0);
        } else if (self.progress < 0.76) {
          setActiveIdx(1);
        } else {
          setActiveIdx(2);
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
  }, [totalVanes]);

  // Clickable indicator to jump directly to any of the 3 projects
  const handleJumpToProject = useCallback(
    (targetIndex: number) => {
      const st = scrollTriggerRef.current;
      if (!st) return;

      const totalDistance = st.end - st.start;
      // Target progress positions corresponding to plateau centers
      const targetProgress = targetIndex === 0 ? 0.05 : targetIndex === 1 ? 0.52 : 0.95;
      const targetY = st.start + totalDistance * targetProgress;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    },
    []
  );

  // Scroll down to the portfolio content below
  const handleScrollToContent = useCallback(() => {
    const st = scrollTriggerRef.current;
    const targetEl = document.getElementById('livspace-portfolio-section');
    const targetY = targetEl
      ? targetEl.getBoundingClientRect().top + window.scrollY
      : st
      ? st.end + 20
      : window.innerHeight * 1.5;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  const currentProject = KINETIC_PROJECTS[activeIdx] || KINETIC_PROJECTS[0];

  return (
    <div
      ref={containerRef}
      className="kinetic-showcase-container"
      aria-label="Kinetic Rotating Vane Showcase"
    >
      <div ref={stickyViewportRef} className="kinetic-sticky-viewport">
        {/* ==================================================================
            TRIANGULAR KINETIC ROTATING LOUVRE MECHANISM
            3 permanent faces per blade:
            - Face 1 (0°): Image 1 (Living Salon & Atrium)
            - Face 2 (-120°): Image 2 (Master Bedroom Suite)
            - Face 3 (-240°): Image 3 (Bespoke Millwork & Joinery)
            No runtime image swapping, no reverse-mirroring, zero Z-fighting!
            ================================================================== */}
        <div className="kinetic-vanes-layer">
          {Array.from({ length: totalVanes }).map((_, i) => {
            const vaneWidthPercent = 100 / totalVanes;
            const vaneLeftPercent = i * vaneWidthPercent;
            // 0.2887 is the apothem factor for an equilateral triangle: w / (2 * tan(60°))
            const apothemVw = (100 / totalVanes) * 0.2887;

            return (
              <div
                key={i}
                className="kinetic-vane-unit"
                style={{
                  width: `calc(${vaneWidthPercent}% + 0.5px)`,
                  left: `${vaneLeftPercent}%`,
                }}
              >
                <div
                  ref={(el) => {
                    bladeRefs.current[i] = el;
                  }}
                  className="kinetic-vane-blade"
                >
                  {/* FACE 1: Image 1 (0°) */}
                  <div
                    className="vane-face face-1"
                    style={{
                      transform: `rotateY(0deg) translateZ(${apothemVw}vw)`,
                    }}
                  >
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${KINETIC_PROJECTS[0].image}")`,
                        left: `-${i * (100 / totalVanes)}vw`,
                      }}
                    />
                  </div>

                  {/* FACE 2: Image 2 (-120°) — Rotates clockwise into view at 120° */}
                  <div
                    className="vane-face face-2"
                    style={{
                      transform: `rotateY(-120deg) translateZ(${apothemVw}vw)`,
                    }}
                  >
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${KINETIC_PROJECTS[1].image}")`,
                        left: `-${i * (100 / totalVanes)}vw`,
                      }}
                    />
                  </div>

                  {/* FACE 3: Image 3 (-240°) — Rotates clockwise into view at 240° */}
                  <div
                    className="vane-face face-3"
                    style={{
                      transform: `rotateY(-240deg) translateZ(${apothemVw}vw)`,
                    }}
                  >
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${KINETIC_PROJECTS[2].image}")`,
                        left: `-${i * (100 / totalVanes)}vw`,
                      }}
                    />
                  </div>

                  {/* Specular Lighting Overlay during rotation */}
                  <div
                    ref={(el) => {
                      lightRefs.current[i] = el;
                    }}
                    className="vane-lighting-overlay"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Vignette & Header Protection Gradient */}
        <div className="kinetic-vignette-overlay" aria-hidden="true" />
        <div className="kinetic-top-shade" aria-hidden="true" />

        {/* ==================================================================
            EDITORIAL ARCHITECTURAL UI OVERLAY
            Provides clear identity, project context, and interactive controls
            ================================================================== */}
        <div className="kinetic-editorial-overlay">
          {/* Top Left: Atelier Identity & Chapter Eyebrow */}
          <div className="kinetic-atelier-badge">
            <span className="kinetic-beacon" aria-hidden="true" />
            <span className="kinetic-badge-text">
              FEATURED RESIDENCE // CHAPTER {currentProject.number}
            </span>
          </div>

          {/* Bottom Left: Project Title, Subtitle, and Scope Details */}
          <div className="kinetic-project-card">
            <span className="kinetic-project-category">{currentProject.category}</span>
            <h2 className="kinetic-project-title">{currentProject.title}</h2>
            <p className="kinetic-project-subtitle">{currentProject.subtitle}</p>
            <div className="kinetic-project-meta">
              <span className="kinetic-meta-chip">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2C5.24 2 3 4.24 3 7C3 10.5 8 14 8 14C8 14 13 10.5 13 7C13 4.24 10.76 2 8 2Z" stroke="#C5A059" strokeWidth="1.5" />
                </svg>
                {currentProject.location}
              </span>
              <span className="kinetic-meta-chip">{currentProject.area}</span>
            </div>
          </div>

          {/* Bottom Right: Interactive Project Jump Navigation */}
          <div className="kinetic-nav-controls">
            <div className="kinetic-pills-bar">
              {KINETIC_PROJECTS.slice(0, 3).map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => handleJumpToProject(idx)}
                  className={`kinetic-pill-btn ${activeIdx === idx ? 'active' : ''}`}
                  aria-label={`View ${proj.title}`}
                >
                  <span className="kinetic-pill-num">{proj.number.slice(0, 2)}</span>
                  <span className="kinetic-pill-label">{proj.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Scroll/Down Prompt */}
            <button
              type="button"
              onClick={handleScrollToContent}
              className="kinetic-scroll-prompt"
              aria-label="Scroll down to browse full portfolio"
            >
              <span>Scroll to Explore</span>
              <span className="kinetic-scroll-icon" aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KineticVaneShowcase;
