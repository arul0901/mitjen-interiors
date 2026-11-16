import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { AmbientArchitecturalLayer } from './AmbientArchitecturalLayer';
import '../../styles/ProjectsSection.css';

interface ProjectItem {
  id: string;
  step: string;
  numeral: string;
  category: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'vintage-finish',
    step: '01',
    numeral: '01',
    category: 'RESIDENTIAL SPACE · PU CRAFT',
    title: 'Vintage Finish Interior',
    location: 'Race Course, Coimbatore',
    description:
      'A vintage-inspired residence articulated with hand-finished Italian PU coatings, custom architectural joinery, and tailored spatial transitions.',
    image: '/images/Residential/Residential1.jpeg',
    imageAlt: 'Vintage Finish Interior, Race Course, Coimbatore',
    href: '/portfolio',
  },
  {
    id: 'kr-pura',
    step: '02',
    numeral: '02',
    category: 'RESIDENTIAL VILLA · MILLWORK',
    title: 'Contemporary Residence',
    location: 'KR Pura, Bangalore',
    description:
      'Clean geometric symmetry meets warm architectural materiality, featuring precision wardrobe detailing, bespoke ceiling planes, and integrated ambient lighting.',
    image: '/images/Residential/Residential2.jpeg',
    imageAlt: 'Interior Project, KR Pura, Bangalore',
    href: '/portfolio',
  },
  {
    id: 'tidal-park',
    step: '03',
    numeral: '03',
    category: 'COMMERCIAL OFFICE · ACOUSTIC CRAFT',
    title: 'Agile Tech Workspace',
    location: 'Tidal Park, Coimbatore',
    description:
      'A high-performance modern workspace planned around agile team dynamics, acoustic zoning, ergonomic workstations, and refined corporate craft.',
    image: '/images/Commercial/Commercial1.jpeg',
    imageAlt: 'Office Interior, Tidal Park',
    href: '/portfolio',
  },
  {
    id: 'corporate-site',
    step: '04',
    numeral: '04',
    category: 'EXECUTIVE SITE · GLASS & TIMBER',
    title: 'Corporate Headquarters',
    location: 'Commercial District, Coimbatore',
    description:
      'A prestigious executive site balancing private client reception suites, high-spec meeting facilities, and understated luxury architectural finishes.',
    image: '/images/Corporate/Corporate1.jpeg',
    imageAlt: 'Corporate Site Interior',
    href: '/portfolio',
  },
];

interface DeckStackConfig {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

// Clean symmetrical vertical stack presets (mimicking the reference image deck)
const DESKTOP_PRESETS: DeckStackConfig[] = [
  // Position 0: Front active card in full focus
  { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 10 },
  // Position 1: Peek above with clean step
  { x: 0, y: -16, rotation: 0, scale: 0.96, opacity: 0.88, zIndex: 9 },
  // Position 2: Second step above
  { x: 0, y: -32, rotation: 0, scale: 0.92, opacity: 0.68, zIndex: 8 },
  // Position 3: Deepest step above
  { x: 0, y: -48, rotation: 0, scale: 0.88, opacity: 0.48, zIndex: 7 },
];

const MOBILE_PRESETS: DeckStackConfig[] = [
  { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 10 },
  { x: 0, y: -12, rotation: 0, scale: 0.96, opacity: 0.88, zIndex: 9 },
  { x: 0, y: -24, rotation: 0, scale: 0.92, opacity: 0.68, zIndex: 8 },
  { x: 0, y: -36, rotation: 0, scale: 0.88, opacity: 0.48, zIndex: 7 },
];

const getStackConfig = (position: number, isMobile: boolean): DeckStackConfig => {
  const presets = isMobile ? MOBILE_PRESETS : DESKTOP_PRESETS;
  return presets[position] || presets[presets.length - 1];
};

export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const totalProjects = PROJECTS_DATA.length;

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isAnimatingRef = useRef<boolean>(false);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gesture state using Pointer Events
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const gestureOrientationRef = useRef<'horizontal' | 'vertical' | null>(null);
  const currentDeltaXRef = useRef<number>(0);

  // Calculate relative position of a card in the circular stack
  // 0 = front card, 1 = behind front, 2 = behind 1, 3 = bottom of stack
  const getDeckPosition = useCallback(
    (cardIndex: number, currentActive: number) => {
      return (cardIndex - currentActive + totalProjects) % totalProjects;
    },
    [totalProjects]
  );

  // Apply static deck transforms without running into state locks
  const applyDeckStyles = useCallback(
    (active: number, immediate: boolean = false) => {
      const isMobile = window.innerWidth < 768;
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        const position = getDeckPosition(index, active);
        const cfg = getStackConfig(position, isMobile);

        if (immediate) {
          gsap.set(cardEl, {
            x: cfg.x,
            y: cfg.y,
            scale: cfg.scale,
            opacity: cfg.opacity,
            rotation: cfg.rotation,
            zIndex: cfg.zIndex,
          });
        } else {
          gsap.to(cardEl, {
            x: cfg.x,
            y: cfg.y,
            scale: cfg.scale,
            opacity: cfg.opacity,
            rotation: cfg.rotation,
            zIndex: cfg.zIndex,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    },
    [getDeckPosition]
  );

  // Initial mount layout and resize listener (NO gsap.killTweensOf in cleanup!)
  useEffect(() => {
    applyDeckStyles(activeIndex, true);

    const handleResize = () => {
      applyDeckStyles(activeIndex, true);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, [activeIndex, applyDeckStyles]);

  // Guaranteed lock release to ensure buttons and gestures NEVER freeze
  const releaseLock = useCallback(() => {
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  const acquireLock = useCallback(() => {
    isAnimatingRef.current = true;
    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
    // Guaranteed safety timeout: always unlocks after 450ms
    unlockTimeoutRef.current = setTimeout(releaseLock, 450);
  }, [releaseLock]);

  // ==========================================================================
  // CIRCULAR LEFT SWIPE (Next Project): 01 -> 02 -> 03 -> 04 -> 01 (Infinite)
  // Front card flies out left, Card 02 moves to front, Card 01 moves to back
  // ==========================================================================
  const triggerNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    acquireLock();

    const currentCard = cardRefs.current[activeIndex];
    const nextActive = (activeIndex + 1) % totalProjects;
    const isMobile = window.innerWidth < 768;

    if (currentCard) {
      // 1. Front card flies out to the left
      gsap.to(currentCard, {
        x: -window.innerWidth * 0.45,
        rotation: -4,
        opacity: 0,
        scale: 0.94,
        duration: 0.36,
        ease: 'power2.inOut',
        onComplete: () => {
          // Immediately position at the bottom of the stack (Position 3)
          const lastPosition = totalProjects - 1;
          const cfg = getStackConfig(lastPosition, isMobile);
          gsap.set(currentCard, {
            x: cfg.x,
            y: cfg.y,
            rotation: 0,
            scale: cfg.scale,
            zIndex: cfg.zIndex,
            opacity: 0,
          });

          // Fade into stack
          gsap.to(currentCard, {
            opacity: cfg.opacity,
            duration: 0.2,
            ease: 'power1.out',
          });

          setActiveIndex(nextActive);
          releaseLock();
        },
      });

      // 2. All remaining cards in the stack advance one position forward
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === activeIndex) return;
        const newPosition = getDeckPosition(index, nextActive);
        const cfg = getStackConfig(newPosition, isMobile);

        gsap.to(cardEl, {
          x: cfg.x,
          y: cfg.y,
          rotation: 0,
          scale: cfg.scale,
          opacity: cfg.opacity,
          zIndex: cfg.zIndex,
          duration: 0.38,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    } else {
      setActiveIndex(nextActive);
      releaseLock();
    }
  }, [activeIndex, acquireLock, releaseLock, getDeckPosition, totalProjects]);

  // ==========================================================================
  // CIRCULAR RIGHT SWIPE (Previous Project): 04 -> 01 -> 02 -> 03 (Infinite)
  // Last card comes to front, current front becomes second position
  // ==========================================================================
  const triggerPrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    acquireLock();

    const prevActive = (activeIndex - 1 + totalProjects) % totalProjects;
    const incomingCard = cardRefs.current[prevActive];
    const isMobile = window.innerWidth < 768;

    if (incomingCard) {
      // 1. Prepare incoming card offscreen to the left
      gsap.set(incomingCard, {
        x: -window.innerWidth * 0.45,
        y: 0,
        rotation: -4,
        scale: 0.96,
        opacity: 0,
        zIndex: 35,
      });

      // 2. Animate incoming card to front position
      gsap.to(incomingCard, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.38,
        ease: 'power2.out',
        onComplete: () => {
          setActiveIndex(prevActive);
          releaseLock();
        },
      });

      // 3. Existing cards step back by one position
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === prevActive) return;
        const newPosition = getDeckPosition(index, prevActive);
        const cfg = getStackConfig(newPosition, isMobile);

        gsap.to(cardEl, {
          x: cfg.x,
          y: cfg.y,
          rotation: 0,
          scale: cfg.scale,
          opacity: cfg.opacity,
          zIndex: cfg.zIndex,
          duration: 0.38,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    } else {
      setActiveIndex(prevActive);
      releaseLock();
    }
  }, [activeIndex, acquireLock, releaseLock, getDeckPosition, totalProjects]);

  // Jump to specific card (from ribbon tabs or pagination dots)
  const jumpToCard = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || isAnimatingRef.current) return;
      acquireLock();

      const isMobile = window.innerWidth < 768;
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        const position = getDeckPosition(index, targetIndex);
        const cfg = getStackConfig(position, isMobile);

        gsap.to(cardEl, {
          x: cfg.x,
          y: cfg.y,
          scale: cfg.scale,
          opacity: cfg.opacity,
          rotation: 0,
          zIndex: cfg.zIndex,
          duration: 0.38,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      setActiveIndex(targetIndex);
      setTimeout(releaseLock, 400);
    },
    [activeIndex, acquireLock, releaseLock, getDeckPosition]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        triggerPrev();
      } else if (e.key === 'ArrowRight') {
        triggerNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerNext, triggerPrev]);

  // ==========================================================================
  // POINTER EVENTS GESTURE HANDLERS (Desktop Drag + Mobile Touch Swipe)
  // Using setPointerCapture for unbreakable touch and mouse tracking
  // ==========================================================================
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isAnimatingRef.current) return;

    // Do not initiate drag if user clicked a link or button
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {
      // Fallback if setPointerCapture is unsupported
    }

    isPointerDownRef.current = true;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    gestureOrientationRef.current = null;
    currentDeltaXRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || isAnimatingRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    // Determine gesture direction on first significant movement
    if (gestureOrientationRef.current === null) {
      if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        // Vertical scroll: release pointer so native page scroll continues smoothly
        gestureOrientationRef.current = 'vertical';
        isPointerDownRef.current = false;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (_) {}
        return;
      } else if (Math.abs(deltaX) > 8) {
        gestureOrientationRef.current = 'horizontal';
      }
    }

    if (gestureOrientationRef.current !== 'horizontal') return;

    currentDeltaXRef.current = deltaX;
    const currentCard = cardRefs.current[activeIndex];
    if (currentCard) {
      // Subtle rotation and scale feedback while dragging
      const rotation = deltaX * 0.012;
      gsap.set(currentCard, {
        x: deltaX,
        rotation,
        scale: 1 - Math.abs(deltaX) * 0.0002,
      });

      // Subtle dynamic lift on the card immediately behind
      const nextActive = (activeIndex + 1) % totalProjects;
      const nextCard = cardRefs.current[nextActive];
      if (nextCard && deltaX < 0) {
        const progress = Math.min(Math.abs(deltaX) / 180, 1);
        const isMobile = window.innerWidth < 768;
        const baseCfg = getStackConfig(1, isMobile);
        gsap.set(nextCard, {
          y: baseCfg.y * (1 - progress),
          scale: baseCfg.scale + (1 - baseCfg.scale) * progress,
          opacity: baseCfg.opacity + (1 - baseCfg.opacity) * progress,
        });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (gestureOrientationRef.current !== 'horizontal') {
      currentDeltaXRef.current = 0;
      return;
    }

    const deltaX = currentDeltaXRef.current;
    const swipeThreshold = 45; // Effortless 45px swipe threshold

    if (deltaX < -swipeThreshold) {
      triggerNext();
    } else if (deltaX > swipeThreshold) {
      triggerPrev();
    } else {
      // Snap card back smoothly to original position
      const currentCard = cardRefs.current[activeIndex];
      if (currentCard) {
        gsap.to(currentCard, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      applyDeckStyles(activeIndex, false);
    }

    currentDeltaXRef.current = 0;
    gestureOrientationRef.current = null;
  };

  return (
    <section 
      id="projects" 
      className="photo-deck-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      {/* Ambient Architectural Motion Layer (Desktop Framing) */}
      <AmbientArchitecturalLayer activeIndex={activeIndex} />

      <div className="photo-deck-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER
            ==================================================================== */}
        <header className="photo-deck-header">
          <div className="photo-deck-badge">
            <span className="photo-deck-badge-dot" aria-hidden="true" />
            <span className="photo-deck-eyebrow">OUR SELECTED PROJECTS</span>
          </div>

          <h2 className="photo-deck-main-heading">
            SPACES WE’RE PROUD TO HAVE BUILT.
          </h2>

          <div className="photo-deck-gold-line" aria-hidden="true" />

          <p className="photo-deck-descriptor">
            A curated deck of architectural spaces documenting bespoke residential and corporate environments.
          </p>
        </header>

        {/* Quick Jump Ribbon */}
        <nav className="photo-deck-ribbon" aria-label="Deck quick tabs">
          {PROJECTS_DATA.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpToCard(index)}
                className={`photo-deck-ribbon-tab ${isActive ? 'is-active' : ''}`}
                aria-selected={isActive}
                role="tab"
                aria-label={`Jump to project ${item.step}: ${item.title}`}
              >
                <span className="photo-ribbon-num">{item.step}</span>
                <span className="photo-ribbon-name">{item.title}</span>
              </button>
            );
          })}
        </nav>

        {/* ====================================================================
            2. THE EDITORIAL PROJECT CARD DECK
            Continuously rotating stack: 01 -> 02 -> 03 -> 04 -> 01
            ==================================================================== */}
        <div 
          className="photo-deck-stage"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="region"
          aria-label="Architectural Project Deck - Swipe or drag to browse"
        >
          <div className="photo-deck-stack">
            {PROJECTS_DATA.map((item, index) => {
              const isFront = index === activeIndex;

              return (
                <article
                  key={item.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className={`photo-deck-card ${isFront ? 'is-front' : 'is-stacked'}`}
                  onClick={() => {
                    if (!isFront) jumpToCard(index);
                  }}
                  aria-hidden={!isFront}
                >
                  {/* Left Column: Project Editorial & Information */}
                  <div className="photo-card-info">
                    <div className="photo-card-info-top">
                      <div className="photo-card-numeral" aria-hidden="true">
                        {item.numeral}
                      </div>
                      
                      <div className="photo-card-tag-row">
                        <span className="photo-card-category">{item.category}</span>
                      </div>

                      <h3 className="photo-card-title">
                        <a href={item.href} aria-label={`${item.title} project details`}>
                          {item.title}
                        </a>
                      </h3>

                      <div className="photo-card-location">
                        <span className="photo-loc-pin" aria-hidden="true" />
                        <span>{item.location}</span>
                      </div>

                      <p className="photo-card-desc">
                        {item.description}
                      </p>
                    </div>

                    <div className="photo-card-info-bottom">
                      <a 
                        href={item.href} 
                        className="photo-card-cta"
                        aria-label={`Explore ${item.title}`}
                      >
                        <span>EXPLORE PROJECT</span>
                        <ArrowUpRight size={14} className="photo-cta-arrow" aria-hidden="true" />
                      </a>

                      <span className="photo-card-swipe-hint">
                        SWIPE TO ROTATE
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Architectural Photograph */}
                  <div className="photo-card-media">
                    <div className="photo-card-img-box">
                      <img 
                        src={item.image} 
                        alt={item.imageAlt} 
                        className="photo-card-img" 
                        loading="lazy" 
                      />
                      <div className="photo-card-overlay" aria-hidden="true" />

                      {/* Archival Edition Stamp */}
                      <div className="photo-card-stamp">
                        <span className="photo-stamp-label">PROJECT</span>
                        <span className="photo-stamp-sep">·</span>
                        <span className="photo-stamp-num">{item.step} / 0{totalProjects}</span>
                      </div>

                      {/* On-Card Chevrons for Effortless Click Switching */}
                      <div className="photo-touch-nav">
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); triggerPrev(); }} 
                          className="photo-touch-btn"
                          aria-label="Previous project"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); triggerNext(); }} 
                          className="photo-touch-btn"
                          aria-label="Next project"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            3. DECK FOOTER & STEPPER CONTROLS
            ==================================================================== */}
        <div className="photo-deck-footer">
          {/* Left: View Full Portfolio */}
          <div className="photo-deck-footer-left">
            <a 
              href="/portfolio" 
              className="photo-deck-portfolio-link"
              aria-label="Explore all projects in portfolio"
            >
              <Layers size={14} aria-hidden="true" />
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          </div>

          {/* Center: Pagination Dots */}
          <div className="photo-deck-dots" aria-label="Deck pagination">
            {PROJECTS_DATA.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => jumpToCard(index)}
                className={`photo-deck-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Jump to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Right: Stepper Chevrons & Minimal Counter (01 / 04) */}
          <div className="photo-deck-stepper">
            <button 
              type="button" 
              onClick={triggerPrev} 
              className="photo-deck-step-arrow"
              aria-label="Previous project"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="photo-deck-counter">
              0{activeIndex + 1} <span className="photo-deck-counter-slash">/</span> 0{totalProjects}
            </span>

            <button 
              type="button" 
              onClick={triggerNext} 
              className="photo-deck-step-arrow"
              aria-label="Next project"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
