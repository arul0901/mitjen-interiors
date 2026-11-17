import React, { useLayoutEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { KINETIC_PROJECTS } from './kineticVaneData';
import './KineticVaneShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_VANES = 20;

export const KineticVaneShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Red Stages
  const redStage1Ref = useRef<HTMLDivElement>(null);
  const redStage2Ref = useRef<HTMLDivElement>(null);

  // Vane Layers
  const vanesLayer1Ref = useRef<HTMLDivElement>(null);
  const vanesLayer2Ref = useRef<HTMLDivElement>(null);

  // Vane Blade Refs
  const vaneBlades1 = useRef<(HTMLDivElement | null)[]>([]);
  const vaneBlades2 = useRef<(HTMLDivElement | null)[]>([]);

  // Vane Lighting Overlay Refs
  const lightingOverlays1 = useRef<(HTMLDivElement | null)[]>([]);
  const lightingOverlays2 = useRef<(HTMLDivElement | null)[]>([]);

  // Metadata Layers
  const meta1Ref = useRef<HTMLDivElement>(null);
  const meta2Ref = useRef<HTMLDivElement>(null);
  const meta3Ref = useRef<HTMLDivElement>(null);

  // Active Project Index for navigation pills (0, 1, 2)
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  const vanes = useMemo(() => Array.from({ length: TOTAL_VANES }, (_, i) => i), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blades1 = vaneBlades1.current.filter((el): el is HTMLDivElement => el !== null);
      const blades2 = vaneBlades2.current.filter((el): el is HTMLDivElement => el !== null);
      const lights1 = lightingOverlays1.current.filter((el): el is HTMLDivElement => el !== null);
      const lights2 = lightingOverlays2.current.filter((el): el is HTMLDivElement => el !== null);

      const chars1 = redStage1Ref.current?.querySelectorAll<HTMLElement>('.char') || [];
      const chars2 = redStage2Ref.current?.querySelectorAll<HTMLElement>('.char') || [];

      // Initial States
      gsap.set(blades1, { rotateY: 0 });
      gsap.set(blades2, { rotateY: 0 });
      gsap.set(vanesLayer1Ref.current, { autoAlpha: 1 });
      gsap.set(vanesLayer2Ref.current, { autoAlpha: 0 });

      gsap.set(redStage1Ref.current, { autoAlpha: 0 });
      gsap.set(redStage2Ref.current, { autoAlpha: 0 });

      gsap.set(meta1Ref.current, { autoAlpha: 1, y: 0 });
      gsap.set(meta2Ref.current, { autoAlpha: 0, y: 20 });
      gsap.set(meta3Ref.current, { autoAlpha: 0, y: 20 });

      gsap.set(chars1, { yPercent: 120, opacity: 0 });
      gsap.set(chars2, { yPercent: 120, opacity: 0 });

      // Master Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.38) {
              setActiveProjectIdx(0);
            } else if (p < 0.76) {
              setActiveProjectIdx(1);
            } else {
              setActiveProjectIdx(2);
            }
          },
        },
      });

      // ======================================================================
      // STAGE 1: TRANSITION FROM PROJECT 01 -> PROJECT 02 (Timeline: 0 -> 48)
      // ======================================================================

      // 1. Outgoing Project 01 Metadata
      tl.to(
        meta1Ref.current,
        {
          autoAlpha: 0,
          y: -25,
          duration: 6,
          ease: 'power2.in',
        },
        8
      );

      // 2. Red Stage 1 Emergence
      tl.to(
        redStage1Ref.current,
        {
          autoAlpha: 1,
          duration: 10,
          ease: 'power1.inOut',
        },
        12
      );

      // 3. Vanes 1 Rotation (Center Outward Ripple)
      tl.to(
        blades1,
        {
          rotateY: 180,
          duration: 24,
          stagger: {
            each: 0.7,
            from: 'center',
            ease: 'power1.inOut',
          },
          ease: 'power2.inOut',
        },
        14
      );

      // Dynamic Shutter Lighting Overlay
      tl.to(
        lights1,
        {
          opacity: 0.65,
          duration: 12,
          yoyo: true,
          repeat: 1,
          stagger: {
            each: 0.7,
            from: 'center',
          },
          ease: 'sine.inOut',
        },
        14
      );

      // 4. Kinetic Typography 1 Reveal ("KINETIC ARCHITECTURE")
      tl.to(
        chars1,
        {
          yPercent: 0,
          opacity: 1,
          duration: 9,
          stagger: 0.3,
          ease: 'power3.out',
        },
        19
      );

      // 5. Typography 1 Exit
      tl.to(
        chars1,
        {
          yPercent: -120,
          opacity: 0,
          duration: 8,
          stagger: 0.2,
          ease: 'power3.in',
        },
        33
      );

      // 6. Red Stage 1 Concealment as Vanes close to 180deg
      tl.to(
        redStage1Ref.current,
        {
          autoAlpha: 0,
          duration: 8,
          ease: 'power1.inOut',
        },
        36
      );

      // 7. Incoming Project 02 Metadata Arrival
      tl.to(
        meta2Ref.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 7,
          ease: 'power2.out',
        },
        40
      );

      // ======================================================================
      // SEAMLESS VANE LAYER HANDOFF AT PROJECT 02 (Timeline: 48 -> 52)
      // ======================================================================
      tl.set(
        vanesLayer1Ref.current,
        {
          autoAlpha: 0,
        },
        49
      );
      tl.set(
        vanesLayer2Ref.current,
        {
          autoAlpha: 1,
        },
        49
      );

      // ======================================================================
      // STAGE 2: TRANSITION FROM PROJECT 02 -> PROJECT 03 (Timeline: 56 -> 100)
      // ======================================================================

      // 1. Outgoing Project 02 Metadata
      tl.to(
        meta2Ref.current,
        {
          autoAlpha: 0,
          y: -25,
          duration: 6,
          ease: 'power2.in',
        },
        58
      );

      // 2. Red Stage 2 Emergence
      tl.to(
        redStage2Ref.current,
        {
          autoAlpha: 1,
          duration: 10,
          ease: 'power1.inOut',
        },
        62
      );

      // 3. Vanes 2 Rotation (Directional Sweeping Wave from Left to Right)
      tl.to(
        blades2,
        {
          rotateY: 180,
          duration: 24,
          stagger: {
            each: 0.75,
            from: 'start',
            ease: 'power1.inOut',
          },
          ease: 'power2.inOut',
        },
        64
      );

      // Dynamic Shutter Lighting Overlay
      tl.to(
        lights2,
        {
          opacity: 0.65,
          duration: 12,
          yoyo: true,
          repeat: 1,
          stagger: {
            each: 0.75,
            from: 'start',
          },
          ease: 'sine.inOut',
        },
        64
      );

      // 4. Kinetic Typography 2 Reveal ("SPACES IN MOTION")
      tl.to(
        chars2,
        {
          yPercent: 0,
          opacity: 1,
          duration: 9,
          stagger: 0.35,
          ease: 'power3.out',
        },
        69
      );

      // 5. Typography 2 Exit
      tl.to(
        chars2,
        {
          yPercent: -120,
          opacity: 0,
          duration: 8,
          stagger: 0.25,
          ease: 'power3.in',
        },
        83
      );

      // 6. Red Stage 2 Concealment as Vanes close to 180deg
      tl.to(
        redStage2Ref.current,
        {
          autoAlpha: 0,
          duration: 8,
          ease: 'power1.inOut',
        },
        86
      );

      // 7. Incoming Project 03 Metadata Arrival
      tl.to(
        meta3Ref.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 7,
          ease: 'power2.out',
        },
        90
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const p1 = KINETIC_PROJECTS[0];
  const p2 = KINETIC_PROJECTS[1];
  const p3 = KINETIC_PROJECTS[2];

  // Helper to split text into animated character spans
  const renderChars = (text: string) =>
    text.split('').map((ch, idx) => (
      <span key={idx} className="char">
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <section ref={sectionRef} className="kinetic-showcase-section" aria-label="Kinetic Rotating Vane Showcase">
      <div ref={viewportRef} className="kinetic-viewport">
        {/* ==================================================================
            1. CINEMATIC VERMILION-RED TRANSITION ENVIRONMENT 1
            ================================================================== */}
        <div ref={redStage1Ref} className="kinetic-red-stage">
          <div className="kinetic-red-grid-overlay" />
          <div className="kinetic-red-crosshair tl" />
          <div className="kinetic-red-crosshair tr" />
          <div className="kinetic-red-crosshair bl" />
          <div className="kinetic-red-crosshair br" />

          <span className="kinetic-red-meta-tag top-left">SYS. REF // KINETIC-VANE-01</span>
          <span className="kinetic-red-meta-tag top-right">INDEX 01 &rarr; 02 // PRITHVI</span>
          <span className="kinetic-red-meta-tag bottom-left">{p1.transitionTitle.coord}</span>
          <span className="kinetic-red-meta-tag bottom-right">MITJEN ARCHITECTURAL EXHIBITION</span>

          <div className="kinetic-typo-container">
            <span className="kinetic-typo-eyebrow">{p1.transitionTitle.eyebrow}</span>
            <div className="kinetic-typo-line line-1">{renderChars(p1.transitionTitle.line1)}</div>
            <div className="kinetic-typo-line line-2">{renderChars(p1.transitionTitle.line2)}</div>
            <span className="kinetic-typo-sub">{p1.transitionTitle.subtext}</span>
          </div>
        </div>

        {/* ==================================================================
            2. CINEMATIC VERMILION-RED TRANSITION ENVIRONMENT 2
            ================================================================== */}
        <div ref={redStage2Ref} className="kinetic-red-stage">
          <div className="kinetic-red-grid-overlay" />
          <div className="kinetic-red-crosshair tl" />
          <div className="kinetic-red-crosshair tr" />
          <div className="kinetic-red-crosshair bl" />
          <div className="kinetic-red-crosshair br" />

          <span className="kinetic-red-meta-tag top-left">SYS. REF // KINETIC-VANE-02</span>
          <span className="kinetic-red-meta-tag top-right">INDEX 02 &rarr; 03 // ROYAL NESTO</span>
          <span className="kinetic-red-meta-tag bottom-left">{p2.transitionTitle.coord}</span>
          <span className="kinetic-red-meta-tag bottom-right">MITJEN ARCHITECTURAL EXHIBITION</span>

          <div className="kinetic-typo-container">
            <span className="kinetic-typo-eyebrow">{p2.transitionTitle.eyebrow}</span>
            <div className="kinetic-typo-line line-1">{renderChars(p2.transitionTitle.line1)}</div>
            <div className="kinetic-typo-line line-2">{renderChars(p2.transitionTitle.line2)}</div>
            <span className="kinetic-typo-sub">{p2.transitionTitle.subtext}</span>
          </div>
        </div>

        {/* ==================================================================
            3. VANE LAYER 1 (TRANSITION 1: PROJECT 01 -> PROJECT 02)
            ================================================================== */}
        <div ref={vanesLayer1Ref} className="kinetic-vanes-layer">
          {vanes.map((idx) => {
            const widthPercent = 100 / TOTAL_VANES;
            const leftPercent = idx * widthPercent;
            const offsetLeftPx = `calc(-1 * ${idx} * (100vw / ${TOTAL_VANES}))`;

            return (
              <div
                key={`vane-layer-1-${idx}`}
                className="kinetic-vane-unit"
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                }}
              >
                <div
                  ref={(el) => {
                    vaneBlades1.current[idx] = el;
                  }}
                  className="kinetic-vane-blade"
                >
                  {/* Front Face: Project 01 (Grand Salon) */}
                  <div className="vane-face front">
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${p1.image}")`,
                        left: offsetLeftPx,
                      }}
                    />
                    <div
                      ref={(el) => {
                        lightingOverlays1.current[idx] = el;
                      }}
                      className="vane-lighting-overlay"
                    />
                    <div className="vane-edge-bevel" />
                  </div>

                  {/* Back Face: Project 02 (Master Suite) */}
                  <div className="vane-face back">
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${p2.image}")`,
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
            4. VANE LAYER 2 (TRANSITION 2: PROJECT 02 -> PROJECT 03)
            ================================================================== */}
        <div ref={vanesLayer2Ref} className="kinetic-vanes-layer">
          {vanes.map((idx) => {
            const widthPercent = 100 / TOTAL_VANES;
            const leftPercent = idx * widthPercent;
            const offsetLeftPx = `calc(-1 * ${idx} * (100vw / ${TOTAL_VANES}))`;

            return (
              <div
                key={`vane-layer-2-${idx}`}
                className="kinetic-vane-unit"
                style={{
                  left: `${leftPercent}%`,
                  width: `${widthPercent}%`,
                }}
              >
                <div
                  ref={(el) => {
                    vaneBlades2.current[idx] = el;
                  }}
                  className="kinetic-vane-blade"
                >
                  {/* Front Face: Project 02 (Master Suite) */}
                  <div className="vane-face front">
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${p2.image}")`,
                        left: offsetLeftPx,
                      }}
                    />
                    <div
                      ref={(el) => {
                        lightingOverlays2.current[idx] = el;
                      }}
                      className="vane-lighting-overlay"
                    />
                    <div className="vane-edge-bevel" />
                  </div>

                  {/* Back Face: Project 03 (Bespoke Millwork) */}
                  <div className="vane-face back">
                    <div
                      className="vane-slice-img"
                      style={{
                        backgroundImage: `url("${p3.image}")`,
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
            5. FLOATING EDITORIAL METADATA & CONTROLS LAYER
            ================================================================== */}
        <div className="kinetic-meta-layer">
          {/* Top Bar */}
          <div className="kinetic-top-row">
            <div className="kinetic-badge-pill">
              <span className="kinetic-badge-num">{KINETIC_PROJECTS[activeProjectIdx].number}</span>
              <span className="kinetic-badge-dot">•</span>
              <span>{KINETIC_PROJECTS[activeProjectIdx].category}</span>
            </div>

            <div className="kinetic-status-pill">
              <Sparkles size={13} />
              <span>DELIVERED • ROYAL NESTO</span>
            </div>
          </div>

          {/* Project 01 Metadata */}
          <div
            ref={meta1Ref}
            className="kinetic-bottom-row"
            style={{ position: 'absolute', bottom: 'clamp(24px, 4vw, 44px)', left: 'clamp(24px, 4vw, 44px)', right: 'clamp(24px, 4vw, 44px)' }}
          >
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                <Layers size={13} />
                <span>{p1.category} • {p1.year}</span>
              </span>
              <h2 className="kinetic-project-title">{p1.title}</h2>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{p1.location} • {p1.area}</span>
              </div>
              <p className="kinetic-project-desc">{p1.description}</p>
            </div>

            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{p1.scope}</span>
              <div className="kinetic-scroll-hint">
                <div className="kinetic-scroll-line" />
                <span>SCROLL TO ROTATE VANES</span>
              </div>
            </div>
          </div>

          {/* Project 02 Metadata */}
          <div
            ref={meta2Ref}
            className="kinetic-bottom-row"
            style={{ position: 'absolute', bottom: 'clamp(24px, 4vw, 44px)', left: 'clamp(24px, 4vw, 44px)', right: 'clamp(24px, 4vw, 44px)' }}
          >
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                <Layers size={13} />
                <span>{p2.category} • {p2.year}</span>
              </span>
              <h2 className="kinetic-project-title">{p2.title}</h2>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{p2.location} • {p2.area}</span>
              </div>
              <p className="kinetic-project-desc">{p2.description}</p>
            </div>

            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{p2.scope}</span>
              <div className="kinetic-scroll-hint">
                <div className="kinetic-scroll-line" />
                <span>SCROLL TO ROTATE VANES</span>
              </div>
            </div>
          </div>

          {/* Project 03 Metadata */}
          <div
            ref={meta3Ref}
            className="kinetic-bottom-row"
            style={{ position: 'absolute', bottom: 'clamp(24px, 4vw, 44px)', left: 'clamp(24px, 4vw, 44px)', right: 'clamp(24px, 4vw, 44px)' }}
          >
            <div className="kinetic-project-details">
              <span className="kinetic-project-kicker">
                <Layers size={13} />
                <span>{p3.category} • {p3.year}</span>
              </span>
              <h2 className="kinetic-project-title">{p3.title}</h2>
              <div className="kinetic-project-location">
                <MapPin size={14} />
                <span>{p3.location} • {p3.area}</span>
              </div>
              <p className="kinetic-project-desc">{p3.description}</p>
            </div>

            <div className="kinetic-specs-box">
              <span className="kinetic-specs-tag">Architectural Scope</span>
              <span className="kinetic-specs-val">{p3.scope}</span>
              <div className="kinetic-scroll-hint">
                <div className="kinetic-scroll-line" />
                <span>SHOWCASE COMPLETE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KineticVaneShowcase;
