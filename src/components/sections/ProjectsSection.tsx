import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Layers } from 'lucide-react';
import '../../styles/ProjectsSection.css';

interface ProjectItem {
  id: string;
  step: string;
  numeral: string;
  title: string;
  location: string;
  category: string;
  typeLabel: string;
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
    title: 'VINTAGE FINISH INTERIOR, RACE COURSE, COIMBATORE',
    location: 'Race Course, Coimbatore',
    category: 'PU PAINT WORK ↗',
    typeLabel: 'Residential Space',
    description:
      'A vintage-inspired look brought to life with carefully finished PU paint detailing and bespoke custom millwork.',
    image: '/images/Residential/Residential1.jpeg',
    imageAlt: 'Vintage Finish Interior, Race Course, Coimbatore',
    href: '/portfolio',
  },
  {
    id: 'kr-pura',
    step: '02',
    numeral: '2',
    title: 'INTERIOR PROJECT, KR PURA, BANGALORE',
    location: 'KR Pura, Bangalore',
    category: 'INTERIOR DESIGN ↗',
    typeLabel: 'Residential Villa',
    description:
      'A well-planned interior featuring clean geometric detailing, warm material palettes, and a cohesive design finish.',
    image: '/images/Residential/Residential2.jpeg',
    imageAlt: 'Interior Project, KR Pura, Bangalore',
    href: '/portfolio',
  },
  {
    id: 'tidal-park',
    step: '03',
    numeral: '3',
    title: 'OFFICE INTERIOR, TIDAL PARK',
    location: 'Tidal Park, Coimbatore',
    category: 'INTERIOR DESIGN ↗',
    typeLabel: 'Commercial Office',
    description:
      'A functional modern workspace planned around agile team dynamics, acoustic comfort, and polished detailing.',
    image: '/images/Commercial/Commercial1.jpeg',
    imageAlt: 'Office Interior, Tidal Park',
    href: '/portfolio',
  },
  {
    id: 'corporate-site',
    step: '04',
    numeral: '4',
    title: 'CORPORATE SITE INTERIOR',
    location: 'Corporate Workspace',
    category: 'WORKSPACE DESIGN ↗',
    typeLabel: 'Corporate Headquarters',
    description:
      'A professional workspace shaped around functional layouts, integrated ambient lighting, and considered finishes.',
    image: '/images/Corporate/Corporate1.jpeg',
    imageAlt: 'Corporate Site Interior',
    href: '/portfolio',
  },
  {
    id: 'rs-puram',
    step: '05',
    numeral: '5',
    title: 'CONTEMPORARY RESIDENCE, RS PURAM, COIMBATORE',
    location: 'RS Puram, Coimbatore',
    category: 'RESIDENTIAL DESIGN ↗',
    typeLabel: 'Residential Living',
    description:
      'Expansive open-plan living articulated with bespoke natural timber panelling, minimal joinery, and tailored spatial zoning.',
    image: '/images/Residential/Residential3.jpeg',
    imageAlt: 'Contemporary Residence, RS Puram, Coimbatore',
    href: '/portfolio',
  },
  {
    id: 'executive-suite',
    step: '06',
    numeral: '6',
    title: 'EXECUTIVE SUITE & BOARDROOM',
    location: 'Tech Hub, Bengaluru',
    category: 'COMMERCIAL FIT-OUT ↗',
    typeLabel: 'Executive Boardroom',
    description:
      'A refined corporate boardroom combining precision acoustics, custom conference table craft, and concealed illumination.',
    image: '/images/Commercial/Commercial2.jpeg',
    imageAlt: 'Executive Suite & Boardroom, Bengaluru',
    href: '/portfolio',
  },
];

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
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        const position = getDeckPosition(index, active);
        const isFront = position === 0;

        // Controlled uniform offsets and scaling
        const offsetY = -position * 12;
        const scaleVal = Math.max(1 - position * 0.035, 0.82);
        const opacityVal = isFront ? 1 : Math.max(0.72 - position * 0.09, 0.28);
        const zIndexVal = 30 - position;

        if (immediate) {
          gsap.set(cardEl, {
            x: 0,
            y: offsetY,
            scale: scaleVal,
            opacity: opacityVal,
            rotation: 0,
            zIndex: zIndexVal,
            pointerEvents: isFront ? 'auto' : 'auto',
          });
        } else {
          gsap.to(cardEl, {
            x: 0,
            y: offsetY,
            scale: scaleVal,
            opacity: opacityVal,
            rotation: 0,
            zIndex: zIndexVal,
            pointerEvents: isFront ? 'auto' : 'auto',
            duration: 0.42,
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
  // 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 01 (Infinite Loop)
  // Front card (01) animates out left and moves to LAST position (06)
  // ==========================================================================
  const triggerNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const currentCard = cardRefs.current[activeIndex];
    const nextActive = (activeIndex + 1) % totalProjects;

    if (currentCard) {
      // 1. Front card flies out smoothly to the left with subtle tilt
      gsap.to(currentCard, {
        x: -window.innerWidth * 0.55,
        rotation: -6,
        opacity: 0,
        scale: 0.94,
        duration: 0.38,
        ease: 'power2.inOut',
        onComplete: () => {
          // Immediately place at the back of the deck invisibly
          const lastPosition = totalProjects - 1;
          gsap.set(currentCard, {
            x: 0,
            y: -lastPosition * 12,
            rotation: 0,
            scale: Math.max(1 - lastPosition * 0.035, 0.82),
            zIndex: 30 - lastPosition,
            opacity: 0,
          });

          // Reveal gently at the back of stack
          gsap.to(currentCard, {
            opacity: Math.max(0.72 - lastPosition * 0.09, 0.28),
            duration: 0.22,
            ease: 'power1.out',
          });

          setActiveIndex(nextActive);
          isAnimatingRef.current = false;
        },
      });

      // 2. All remaining cards in the stack advance one position forward
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === activeIndex) return;
        const newPosition = getDeckPosition(index, nextActive);
        const isNewFront = newPosition === 0;
        const offsetY = -newPosition * 12;
        const scaleVal = Math.max(1 - newPosition * 0.035, 0.82);
        const opacityVal = isNewFront ? 1 : Math.max(0.72 - newPosition * 0.09, 0.28);
        const zIndexVal = 30 - newPosition;

        gsap.to(cardEl, {
          x: 0,
          y: offsetY,
          rotation: 0,
          scale: scaleVal,
          opacity: opacityVal,
          zIndex: zIndexVal,
          duration: 0.4,
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
        x: window.innerWidth * 0.55,
        y: 0,
        rotation: 6,
        scale: 0.95,
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
        duration: 0.42,
        ease: 'power3.out',
        onComplete: () => {
          setActiveIndex(prevActive);
          isAnimatingRef.current = false;
        },
      });

      // 3. Existing cards step back by one position
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === prevActive) return;
        const newPosition = getDeckPosition(index, prevActive);
        const offsetY = -newPosition * 12;
        const scaleVal = Math.max(1 - newPosition * 0.035, 0.82);
        const opacityVal = Math.max(0.72 - newPosition * 0.09, 0.28);
        const zIndexVal = 30 - newPosition;

        gsap.to(cardEl, {
          x: 0,
          y: offsetY,
          rotation: 0,
          scale: scaleVal,
          opacity: opacityVal,
          zIndex: zIndexVal,
          duration: 0.42,
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

      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        const position = getDeckPosition(index, targetIndex);
        const isFront = position === 0;
        const offsetY = -position * 12;
        const scaleVal = Math.max(1 - position * 0.035, 0.82);
        const opacityVal = isFront ? 1 : Math.max(0.72 - position * 0.09, 0.28);
        const zIndexVal = 30 - position;

        gsap.to(cardEl, {
          x: 0,
          y: offsetY,
          scale: scaleVal,
          opacity: opacityVal,
          rotation: 0,
          zIndex: zIndexVal,
          duration: 0.4,
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
      const rotation = deltaX * 0.03;
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
        gsap.set(nextCard, {
          y: -11 + 11 * progress,
          scale: 0.97 + 0.03 * progress,
          opacity: 0.63 + 0.37 * progress,
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
    const swipeThreshold = 65; // Balanced threshold for mobile & desktop

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
      className="deck-compact-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      <div className="deck-compact-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER
            ==================================================================== */}
        <header className="deck-compact-header">
          <div className="deck-compact-badge">
            <span className="deck-compact-badge-dot" aria-hidden="true" />
            <span className="deck-compact-eyebrow">OUR SELECTED PROJECTS</span>
          </div>

          <h2 className="deck-compact-main-heading">
            SPACES WE’RE PROUD TO HAVE BUILT.
          </h2>

          <div className="deck-compact-gold-line" aria-hidden="true" />

          <p className="deck-compact-descriptor">
            A continuous circular showcase of residential and workspace transformations shaped by architectural precision.
          </p>
        </header>

        {/* ====================================================================
            2. THE COMPACT CIRCULAR CARD DECK
            Continuously rotating stack: 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 01
            ==================================================================== */}
        <div 
          className="deck-compact-stage"
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
          aria-label="Circular Project Card Deck"
        >
          {/* Quick Jump Ribbon */}
          <nav className="deck-compact-ribbon" aria-label="Deck quick tabs">
            {PROJECTS_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jumpToCard(index)}
                  className={`deck-compact-ribbon-tab ${isActive ? 'is-active' : ''}`}
                  aria-selected={isActive}
                  role="tab"
                  aria-label={`Jump to project ${item.step}: ${item.title}`}
                >
                  <span className="deck-ribbon-tab-num">{item.step}</span>
                  <span className="deck-ribbon-tab-name">{item.location.split(',')[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Cards Stack Stage */}
          <div className="deck-compact-stack">
            {PROJECTS_DATA.map((item, index) => {
              const isFront = index === activeIndex;

              return (
                <article
                  key={item.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className={`deck-compact-card ${isFront ? 'is-front' : 'is-stacked'}`}
                  onClick={() => {
                    if (!isFront) jumpToCard(index);
                  }}
                  aria-hidden={!isFront}
                >
                  <div className="deck-compact-card-inner">
                    {/* LEFT COLUMN: Compact Editorial Details */}
                    <div className="deck-compact-editorial">
                      <div className="deck-compact-editorial-top">
                        {/* Monogram Numeral & Portfolio Meta */}
                        <div className="deck-compact-meta-row">
                          <span className="deck-compact-big-num" aria-hidden="true">
                            {item.numeral}
                          </span>
                          <div className="deck-compact-type-badge">
                            <span className="deck-compact-phase-tag">PROJECT {item.step} / 0{totalProjects}</span>
                            <span className="deck-compact-sub-tag">{item.typeLabel}</span>
                          </div>
                        </div>

                        {/* Location Badge */}
                        <div className="deck-compact-loc-pill">
                          <MapPin size={12} className="deck-compact-pin-icon" aria-hidden="true" />
                          <span>{item.location}</span>
                        </div>

                        {/* Project Title */}
                        <h3 className="deck-compact-title">
                          <a href={item.href} aria-label={`${item.title} project details`}>
                            {item.title}
                          </a>
                        </h3>

                        <div className="deck-compact-gold-divider" aria-hidden="true" />

                        {/* Project Description */}
                        <p className="deck-compact-desc">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="deck-compact-action-row">
                        <a 
                          href={item.href} 
                          className="deck-compact-cta-btn" 
                          aria-label={`View ${item.title} in portfolio`}
                        >
                          <span>{item.category}</span>
                          <ArrowUpRight size={13} className="deck-compact-cta-icon" aria-hidden="true" />
                        </a>

                        <span className="deck-compact-swipe-hint">
                          <span>SWIPE TO ROTATE</span>
                        </span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Balanced Architectural Photography */}
                    <div className="deck-compact-visual">
                      <div className="deck-compact-photo-frame">
                        <img 
                          src={item.image} 
                          alt={item.imageAlt} 
                          className="deck-compact-photo" 
                          loading="lazy" 
                        />
                        <div className="deck-compact-veil" aria-hidden="true" />

                        {/* Floating Frosted Pill */}
                        <div className="deck-compact-floating-pill">
                          <span>{item.category}</span>
                        </div>

                        {/* Overlaid Mobile Quick Chevrons */}
                        <div className="deck-compact-touch-arrows">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); triggerPrev(); }} 
                            className="deck-compact-arrow-btn"
                            aria-label="Previous project in deck"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); triggerNext(); }} 
                            className="deck-compact-arrow-btn"
                            aria-label="Next project in deck"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
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
        <div className="deck-compact-footer">
          {/* Left: View Full Portfolio */}
          <div className="deck-compact-footer-left">
            <a 
              href="/portfolio" 
              className="deck-compact-portfolio-link"
              aria-label="Explore all projects in portfolio"
            >
              <Layers size={14} aria-hidden="true" />
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>

          {/* Center: Pagination Dots */}
          <div className="deck-compact-dots" aria-label="Deck pagination">
            {PROJECTS_DATA.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => jumpToCard(index)}
                className={`deck-compact-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Jump to project card ${index + 1}`}
              />
            ))}
          </div>

          {/* Right: Stepper Chevrons & Minimal Counter (01 / 06) */}
          <div className="deck-compact-stepper">
            <button 
              type="button" 
              onClick={triggerPrev} 
              className="deck-compact-step-arrow"
              aria-label="Previous project"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="deck-compact-counter">
              0{activeIndex + 1} <span className="deck-compact-counter-slash">/</span> 0{totalProjects}
            </span>

            <button 
              type="button" 
              onClick={triggerNext} 
              className="deck-compact-step-arrow"
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
