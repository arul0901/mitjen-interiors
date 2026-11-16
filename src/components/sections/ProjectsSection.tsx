import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
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
    numeral: '1',
    category: 'Residential Space · PU Craft',
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
    numeral: '2',
    category: 'Residential Villa · Millwork',
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
    numeral: '3',
    category: 'Commercial Office · Acoustic Craft',
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
    numeral: '4',
    category: 'Executive Site · Glass & Timber',
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

// Staggered photographic print placements (simulating a physical stack of photo proofs)
const STACK_PRESETS: DeckStackConfig[] = [
  // Position 0: Front active print sitting squarely in focus
  { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, zIndex: 30 },
  // Position 1: Peek to the right with gentle +2.5° paper tilt
  { x: 18, y: -16, rotation: 2.5, scale: 0.98, opacity: 0.94, zIndex: 29 },
  // Position 2: Peek to the left with gentle -2.2° paper tilt
  { x: -16, y: -30, rotation: -2.2, scale: 0.95, opacity: 0.86, zIndex: 28 },
  // Position 3: Deepest card peeking through with subtle +1.8° tilt
  { x: 10, y: -42, rotation: 1.8, scale: 0.92, opacity: 0.76, zIndex: 27 },
];

const getStackConfig = (position: number, isMobile: boolean): DeckStackConfig => {
  const mult = isMobile ? 0.55 : 1;
  const preset = STACK_PRESETS[position] || STACK_PRESETS[3];
  return {
    ...preset,
    x: preset.x * mult,
    y: preset.y * mult,
    rotation: preset.rotation * mult,
  };
};

export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const totalProjects = PROJECTS_DATA.length;

  const stackContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isAnimatingRef = useRef<boolean>(false);

  // Gesture state
  const isDraggingRef = useRef<boolean>(false);
  const startCoordRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isHorizontalGestureRef = useRef<boolean | null>(null);
  const currentDeltaXRef = useRef<number>(0);

  // Helper: Position in deck (0 = front, 1..total-1 = stacked behind)
  const getDeckPosition = useCallback(
    (cardIndex: number, currentActive: number) => {
      return (cardIndex - currentActive + totalProjects) % totalProjects;
    },
    [totalProjects]
  );

  // Render static stacked positions for all cards using GSAP
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
            pointerEvents: position === 0 ? 'auto' : 'auto',
          });
        } else {
          gsap.to(cardEl, {
            x: cfg.x,
            y: cfg.y,
            scale: cfg.scale,
            opacity: cfg.opacity,
            rotation: cfg.rotation,
            zIndex: cfg.zIndex,
            pointerEvents: position === 0 ? 'auto' : 'auto',
            duration: 0.44,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    },
    [getDeckPosition]
  );

  // Initial mount layout and resize observer
  useEffect(() => {
    applyDeckStyles(activeIndex, true);

    const handleResize = () => {
      applyDeckStyles(activeIndex, true);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.killTweensOf(cardRefs.current);
    };
  }, [activeIndex, applyDeckStyles]);

  // ==========================================================================
  // CIRCULAR LEFT SWIPE (Next Project):
  // 01 -> 02 -> 03 -> 04 -> 01 (Infinite Loop)
  // Front card (01) animates out left and moves to LAST position (04)
  // ==========================================================================
  const triggerNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const currentCard = cardRefs.current[activeIndex];
    const nextActive = (activeIndex + 1) % totalProjects;

    if (currentCard) {
      // 1. Front card flies out smoothly with subtle paper inertia
      gsap.to(currentCard, {
        x: -window.innerWidth * 0.52,
        rotation: -8,
        opacity: 0,
        scale: 0.94,
        duration: 0.38,
        ease: 'power2.inOut',
        onComplete: () => {
          // Immediately place at the back of the deck invisibly
          const lastPosition = totalProjects - 1;
          const isMobile = window.innerWidth < 768;
          const cfg = getStackConfig(lastPosition, isMobile);
          gsap.set(currentCard, {
            x: cfg.x,
            y: cfg.y,
            rotation: cfg.rotation,
            scale: cfg.scale,
            zIndex: cfg.zIndex,
            opacity: 0,
          });

          // Reveal gently at the back of stack
          gsap.to(currentCard, {
            opacity: cfg.opacity,
            duration: 0.22,
            ease: 'power1.out',
          });

          setActiveIndex(nextActive);
          isAnimatingRef.current = false;
        },
      });

      // 2. All remaining cards in the stack advance one position forward
      const isMobile = window.innerWidth < 768;
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === activeIndex) return;
        const newPosition = getDeckPosition(index, nextActive);
        const cfg = getStackConfig(newPosition, isMobile);

        gsap.to(cardEl, {
          x: cfg.x,
          y: cfg.y,
          rotation: cfg.rotation,
          scale: cfg.scale,
          opacity: cfg.opacity,
          zIndex: cfg.zIndex,
          duration: 0.44,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    } else {
      setActiveIndex(nextActive);
      isAnimatingRef.current = false;
    }
  }, [activeIndex, getDeckPosition, totalProjects]);

  // ==========================================================================
  // CIRCULAR RIGHT SWIPE (Previous Project):
  // Last card comes to front, current front becomes second position
  // ==========================================================================
  const triggerPrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const prevActive = (activeIndex - 1 + totalProjects) % totalProjects;
    const incomingCard = cardRefs.current[prevActive];

    if (incomingCard) {
      // 1. Prepare incoming card offscreen to the right
      gsap.set(incomingCard, {
        x: window.innerWidth * 0.52,
        y: 0,
        rotation: 8,
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
        duration: 0.44,
        ease: 'power3.out',
        onComplete: () => {
          setActiveIndex(prevActive);
          isAnimatingRef.current = false;
        },
      });

      // 3. Existing cards step back by one position
      const isMobile = window.innerWidth < 768;
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === prevActive) return;
        const newPosition = getDeckPosition(index, prevActive);
        const cfg = getStackConfig(newPosition, isMobile);

        gsap.to(cardEl, {
          x: cfg.x,
          y: cfg.y,
          rotation: cfg.rotation,
          scale: cfg.scale,
          opacity: cfg.opacity,
          zIndex: cfg.zIndex,
          duration: 0.44,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    } else {
      setActiveIndex(prevActive);
      isAnimatingRef.current = false;
    }
  }, [activeIndex, getDeckPosition, totalProjects]);

  // Direct card jump (when clicking visible deck tab or ribbon)
  const jumpToCard = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

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
          rotation: cfg.rotation,
          zIndex: cfg.zIndex,
          duration: 0.42,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });

      setActiveIndex(targetIndex);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 420);
    },
    [activeIndex, getDeckPosition]
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

  // Pointer & Touch Handlers (Guaranteed non-interference with vertical scroll)
  const handleStart = (clientX: number, clientY: number, target: EventTarget | null) => {
    if (isAnimatingRef.current) return;
    const elem = target as HTMLElement;
    if (elem.closest('a') || elem.closest('button')) return;

    isDraggingRef.current = true;
    startCoordRef.current = { x: clientX, y: clientY };
    isHorizontalGestureRef.current = null;
    currentDeltaXRef.current = 0;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || isAnimatingRef.current) return;

    const deltaX = clientX - startCoordRef.current.x;
    const deltaY = clientY - startCoordRef.current.y;

    // Detect gesture orientation if not yet decided
    if (isHorizontalGestureRef.current === null) {
      if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        // Vertical scroll: release gesture to allow natural page scrolling
        isHorizontalGestureRef.current = false;
        isDraggingRef.current = false;
        return;
      } else if (Math.abs(deltaX) > 8) {
        // Horizontal card swipe confirmed
        isHorizontalGestureRef.current = true;
      }
    }

    if (!isHorizontalGestureRef.current) return;

    currentDeltaXRef.current = deltaX;
    const currentCard = cardRefs.current[activeIndex];
    if (currentCard) {
      const rotation = deltaX * 0.025;
      gsap.set(currentCard, {
        x: deltaX,
        rotation,
        scale: 1 - Math.abs(deltaX) * 0.0003,
      });

      // Subtle dynamic lift on the card immediately behind
      const nextActive = (activeIndex + 1) % totalProjects;
      const nextCard = cardRefs.current[nextActive];
      if (nextCard && deltaX < 0) {
        const progress = Math.min(Math.abs(deltaX) / 180, 1);
        const isMobile = window.innerWidth < 768;
        const baseCfg = getStackConfig(1, isMobile);
        gsap.set(nextCard, {
          x: baseCfg.x * (1 - progress),
          y: baseCfg.y * (1 - progress),
          rotation: baseCfg.rotation * (1 - progress),
          scale: baseCfg.scale + (1 - baseCfg.scale) * progress,
          opacity: baseCfg.opacity + (1 - baseCfg.opacity) * progress,
        });
      }
    }
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (!isHorizontalGestureRef.current) {
      currentDeltaXRef.current = 0;
      return;
    }

    const deltaX = currentDeltaXRef.current;
    const swipeThreshold = 60; // Balanced threshold for mobile & desktop

    if (deltaX < -swipeThreshold) {
      triggerNext();
    } else if (deltaX > swipeThreshold) {
      triggerPrev();
    } else {
      // Snap back smoothly
      const currentCard = cardRefs.current[activeIndex];
      if (currentCard) {
        gsap.to(currentCard, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.35,
          ease: 'power3.out',
        });
      }
      applyDeckStyles(activeIndex, false);
    }

    currentDeltaXRef.current = 0;
    isHorizontalGestureRef.current = null;
  };

  return (
    <section 
      id="projects" 
      className="photo-deck-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
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
            A curated deck of physical architectural photographs documenting bespoke residential and corporate spaces.
          </p>
        </header>

        {/* ====================================================================
            2. THE PHYSICAL ARCHITECTURAL PHOTOGRAPH DECK
            Continuously rotating stack: 01 -> 02 -> 03 -> 04 -> 01
            ==================================================================== */}
        <div 
          className="photo-deck-stage"
          ref={stackContainerRef}
          onMouseDown={(e) => {
            if (e.button === 0) handleStart(e.clientX, e.clientY, e.target);
          }}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY, e.target)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleEnd}
          role="region"
          aria-label="Physical Architectural Photograph Deck"
        >
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
                  aria-label={`Jump to photograph ${item.step}: ${item.title}`}
                >
                  <span className="photo-ribbon-num">{item.step}</span>
                  <span className="photo-ribbon-name">{item.title.split(',')[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Staggered Photographic Prints Deck */}
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
                  <div className="photo-print-surface">
                    {/* Architectural Hero Photograph Window */}
                    <div className="photo-print-image-wrap">
                      <img 
                        src={item.image} 
                        alt={item.imageAlt} 
                        className="photo-print-image" 
                        loading="lazy" 
                      />
                      <div className="photo-print-grain" aria-hidden="true" />

                      {/* Translucent Archival Proof Stamp */}
                      <div className="photo-print-stamp">
                        <span className="photo-stamp-edition">PROOF · 0{totalProjects}</span>
                        <span className="photo-stamp-sep">/</span>
                        <span className="photo-stamp-num">PLATE {item.step}</span>
                      </div>

                      {/* Quick Touch Stepper Chevrons */}
                      <div className="photo-print-touch-nav">
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); triggerPrev(); }} 
                          className="photo-touch-arrow"
                          aria-label="Previous photograph"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); triggerNext(); }} 
                          className="photo-touch-arrow"
                          aria-label="Next photograph"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Fine-Art Bottom Margin: Minimal Integrated Caption */}
                    <div className="photo-print-margin">
                      <div className="photo-margin-left">
                        <span className="photo-margin-index">{item.step}</span>
                        <div className="photo-margin-text">
                          <h3 className="photo-margin-title">
                            <a href={item.href} aria-label={`${item.title} project details`}>
                              {item.title}
                            </a>
                          </h3>
                          <p className="photo-margin-meta">
                            <span>{item.location}</span>
                            <span className="photo-meta-dot">·</span>
                            <span>{item.category}</span>
                          </p>
                        </div>
                      </div>

                      <div className="photo-margin-right">
                        <a 
                          href={item.href} 
                          className="photo-margin-cta" 
                          aria-label={`View ${item.title}`}
                        >
                          <span>VIEW ARCHIVE</span>
                          <ArrowUpRight size={13} className="photo-cta-arrow" aria-hidden="true" />
                        </a>
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
              <ArrowUpRight size={13} aria-hidden="true" />
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
                aria-label={`Jump to photograph ${index + 1}`}
              />
            ))}
          </div>

          {/* Right: Stepper Chevrons & Minimal Counter (01 / 04) */}
          <div className="photo-deck-stepper">
            <button 
              type="button" 
              onClick={triggerPrev} 
              className="photo-deck-step-arrow"
              aria-label="Previous photograph"
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
              aria-label="Next photograph"
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
