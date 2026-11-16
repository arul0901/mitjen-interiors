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
      'A well-planned interior featuring clean detailing, warm material palettes, and a cohesive design finish.',
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
      'A functional workspace planned around how teams work, with clean acoustic detailing and a polished finish.',
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
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const currentDeltaXRef = useRef<number>(0);

  // Helper to calculate depth relative to active card
  const getDepth = useCallback(
    (index: number, active: number) => {
      return (index - active + totalProjects) % totalProjects;
    },
    [totalProjects]
  );

  // Position cards in their stacked deck layout using GSAP
  const renderDeckLayout = useCallback(
    (active: number, immediate: boolean = false) => {
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;
        const depth = getDepth(index, active);
        const isFront = depth === 0;

        // Depth calculations: cards stacked above with stepped vertical offsets and scaling
        const offsetY = -depth * 15;
        const scaleVal = Math.max(1 - depth * 0.035, 0.82);
        const opacityVal = isFront ? 1 : Math.max(0.78 - depth * 0.1, 0.35);
        const zIndexVal = 30 - depth;

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
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      });
    },
    [getDepth]
  );

  // Initialize deck layout on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      renderDeckLayout(activeIndex, true);
    }, stackContainerRef);

    return () => ctx.revert();
  }, [activeIndex, renderDeckLayout]);

  // Transition to next card in deck (swiping left)
  const triggerNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const currentCard = cardRefs.current[activeIndex];
    const nextIndex = (activeIndex + 1) % totalProjects;

    if (currentCard) {
      // Animate current card sliding out to the left with natural slight rotation
      gsap.to(currentCard, {
        x: -window.innerWidth * 0.65,
        rotation: -9,
        opacity: 0,
        scale: 0.94,
        duration: 0.42,
        ease: 'power2.inOut',
        onComplete: () => {
          setActiveIndex(nextIndex);
          isAnimatingRef.current = false;
        },
      });

      // Animate remaining cards stepping forward smoothly
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === activeIndex) return;
        const newDepth = getDepth(index, nextIndex);
        const offsetY = -newDepth * 15;
        const scaleVal = Math.max(1 - newDepth * 0.035, 0.82);
        const opacityVal = newDepth === 0 ? 1 : Math.max(0.78 - newDepth * 0.1, 0.35);
        const zIndexVal = 30 - newDepth;

        gsap.to(cardEl, {
          y: offsetY,
          scale: scaleVal,
          opacity: opacityVal,
          zIndex: zIndexVal,
          duration: 0.46,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    } else {
      setActiveIndex(nextIndex);
      isAnimatingRef.current = false;
    }
  }, [activeIndex, getDepth, totalProjects]);

  // Transition to previous card in deck (swiping right)
  const triggerPrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const prevIndex = (activeIndex - 1 + totalProjects) % totalProjects;
    const prevCard = cardRefs.current[prevIndex];

    if (prevCard) {
      // Bring the previous card from offscreen right into the front position
      gsap.set(prevCard, {
        x: window.innerWidth * 0.65,
        rotation: 9,
        opacity: 0,
        scale: 0.95,
        zIndex: 35,
      });

      gsap.to(prevCard, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'power3.out',
        onComplete: () => {
          setActiveIndex(prevIndex);
          isAnimatingRef.current = false;
        },
      });

      // Animate current and other cards stepping back in stack
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl || index === prevIndex) return;
        const newDepth = getDepth(index, prevIndex);
        const offsetY = -newDepth * 15;
        const scaleVal = Math.max(1 - newDepth * 0.035, 0.82);
        const opacityVal = Math.max(0.78 - newDepth * 0.1, 0.35);
        const zIndexVal = 30 - newDepth;

        gsap.to(cardEl, {
          y: offsetY,
          scale: scaleVal,
          opacity: opacityVal,
          zIndex: zIndexVal,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    } else {
      setActiveIndex(prevIndex);
      isAnimatingRef.current = false;
    }
  }, [activeIndex, getDepth, totalProjects]);

  // Jump directly to a card when clicking a stacked deck tab
  const jumpToCard = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex || isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const currentCard = cardRefs.current[activeIndex];
      const targetCard = cardRefs.current[targetIndex];

      if (currentCard && targetCard) {
        // Slide out active card
        gsap.to(currentCard, {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            setActiveIndex(targetIndex);
            isAnimatingRef.current = false;
          },
        });
      } else {
        setActiveIndex(targetIndex);
        isAnimatingRef.current = false;
      }
    },
    [activeIndex]
  );

  // Keyboard navigation for accessibility
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

  // Pointer / Drag event handlers (Supports Mouse & Touch gestures seamlessly)
  const handlePointerDown = (clientX: number, target: EventTarget | null) => {
    if (isAnimatingRef.current) return;
    const elem = target as HTMLElement;
    // Don't drag when clicking links or buttons
    if (elem.closest('a') || elem.closest('button')) return;

    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    currentDeltaXRef.current = 0;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current || isAnimatingRef.current) return;
    const deltaX = clientX - dragStartXRef.current;
    currentDeltaXRef.current = deltaX;

    const currentCard = cardRefs.current[activeIndex];
    if (currentCard) {
      // Dynamic resistance, translation and tilt rotation
      const rotation = deltaX * 0.035;
      gsap.set(currentCard, {
        x: deltaX,
        rotation,
        scale: 1 - Math.abs(deltaX) * 0.0003,
      });

      // Subtle dynamic response on the card immediately behind
      const nextCard = cardRefs.current[(activeIndex + 1) % totalProjects];
      if (nextCard) {
        const progress = Math.min(Math.abs(deltaX) / 220, 1);
        gsap.set(nextCard, {
          y: -15 + 15 * progress,
          scale: 0.965 + 0.035 * progress,
          opacity: 0.78 + 0.22 * progress,
        });
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaX = currentDeltaXRef.current;
    const swipeThreshold = 75; // Minimum px to trigger card transition

    if (deltaX < -swipeThreshold) {
      triggerNext();
    } else if (deltaX > swipeThreshold) {
      triggerPrev();
    } else {
      // Snap back smoothly if threshold not crossed
      const currentCard = cardRefs.current[activeIndex];
      if (currentCard) {
        gsap.to(currentCard, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.38,
          ease: 'power3.out',
        });
      }
      renderDeckLayout(activeIndex, false);
    }

    currentDeltaXRef.current = 0;
  };

  return (
    <section 
      id="projects" 
      className="deck-showcase-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      <div className="deck-showcase-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER
            ==================================================================== */}
        <header className="deck-showcase-header">
          <div className="deck-showcase-badge">
            <span className="deck-showcase-badge-dot" aria-hidden="true" />
            <span className="deck-showcase-eyebrow">OUR SELECTED PROJECTS</span>
          </div>

          <h2 className="deck-showcase-main-heading">
            SPACES WE’RE PROUD TO HAVE BUILT.
          </h2>

          <div className="deck-showcase-gold-line" aria-hidden="true" />

          <p className="deck-showcase-descriptor">
            Explore a tactile deck of residences and workspaces shaped around lifestyle, architectural precision, and enduring craftsmanship.
          </p>
        </header>

        {/* ====================================================================
            2. THE INTERACTIVE VERTICALLY STACKED CARD DECK
            Physical card deck with smooth GSAP animations & touch swipe
            ==================================================================== */}
        <div 
          className="deck-stage-area"
          ref={stackContainerRef}
          onMouseDown={(e) => {
            if (e.button === 0) handlePointerDown(e.clientX, e.target);
          }}
          onMouseMove={(e) => handlePointerMove(e.clientX)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, e.target)}
          onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
          onTouchEnd={handlePointerUp}
          role="region"
          aria-label="Interactive Project Card Deck"
        >
          {/* Top Stack Navigation Pills (Direct Tab Jumping) */}
          <nav className="deck-top-ribbon" aria-label="Deck quick jump tabs">
            {PROJECTS_DATA.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jumpToCard(index)}
                  className={`deck-ribbon-tab ${isActive ? 'is-active' : ''}`}
                  aria-selected={isActive}
                  role="tab"
                  aria-label={`Jump to project ${item.step}: ${item.title}`}
                >
                  <span className="deck-ribbon-num">{item.step}</span>
                  <span className="deck-ribbon-name">{item.location.split(',')[0]}</span>
                </button>
              );
            })}
          </nav>

          {/* Cards Stack Stage */}
          <div className="deck-cards-stack">
            {PROJECTS_DATA.map((item, index) => {
              const isFront = index === activeIndex;
              const depth = getDepth(index, activeIndex);

              return (
                <article
                  key={item.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className={`deck-card-plate ${isFront ? 'is-front' : 'is-stacked'}`}
                  onClick={() => {
                    if (!isFront) jumpToCard(index);
                  }}
                  aria-hidden={!isFront}
                >
                  <div className="deck-card-plate-inner">
                    {/* LEFT COLUMN: Editorial Typography & Architectural Specifications */}
                    <div className="deck-card-editorial">
                      {/* Big Monogram Numeral */}
                      <div className="deck-numeral-header">
                        <span className="deck-numeral-digit" aria-hidden="true">
                          {item.numeral}
                        </span>
                        <div className="deck-phase-meta">
                          <span className="deck-meta-phase">PORTFOLIO {item.step} / 0{totalProjects}</span>
                          <span className="deck-meta-type">{item.typeLabel}</span>
                        </div>
                      </div>

                      {/* Location Row */}
                      <div className="deck-location-row">
                        <MapPin size={13} className="deck-pin-icon" aria-hidden="true" />
                        <span className="deck-location-label">{item.location}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="deck-project-title">
                        <a href={item.href} aria-label={`${item.title} project details`}>
                          {item.title}
                        </a>
                      </h3>

                      <div className="deck-editorial-gold-divider" aria-hidden="true" />

                      {/* Verbatim Description */}
                      <p className="deck-project-desc">
                        {item.description}
                      </p>

                      {/* Action CTA & Drag Hint */}
                      <div className="deck-editorial-bottom-action">
                        <a 
                          href={item.href} 
                          className="deck-action-btn" 
                          aria-label={`View ${item.title} in portfolio`}
                        >
                          <span>{item.category}</span>
                          <ArrowUpRight size={14} className="deck-action-arrow" aria-hidden="true" />
                        </a>

                        <div className="deck-drag-indicator-pill" aria-hidden="true">
                          <span className="deck-drag-dot" />
                          <span>DRAG TO FLICK</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Large Architectural Photography */}
                    <div className="deck-card-photo-panel">
                      <div className="deck-photo-viewport">
                        <img 
                          src={item.image} 
                          alt={item.imageAlt} 
                          className="deck-photo-asset" 
                          loading="lazy" 
                        />
                        <div className="deck-photo-gradient-veil" aria-hidden="true" />

                        {/* Floating Frosted Glass Category Pill */}
                        <div className="deck-floating-category-tag">
                          <span className="deck-glass-pill">{item.category}</span>
                        </div>

                        {/* Image Overlaid Touch Arrows */}
                        <div className="deck-photo-touch-controls">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); triggerPrev(); }} 
                            className="deck-touch-arrow"
                            aria-label="Previous project in deck"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); triggerNext(); }} 
                            className="deck-touch-arrow"
                            aria-label="Next project in deck"
                          >
                            <ChevronRight size={18} />
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
            3. DECK FOOTER NAVIGATION & COUNTER BAR
            ==================================================================== */}
        <div className="deck-footer-bar">
          {/* Left: View All Portfolio Link */}
          <div className="deck-footer-left">
            <a 
              href="/portfolio" 
              className="deck-portfolio-link"
              aria-label="Explore all projects in portfolio"
            >
              <Layers size={15} aria-hidden="true" />
              <span>VIEW FULL PORTFOLIO</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Center: Interactive Pagination Dots */}
          <div className="deck-footer-dots" aria-label="Deck card selector">
            {PROJECTS_DATA.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => jumpToCard(index)}
                className={`deck-footer-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Jump to project card ${index + 1}`}
              />
            ))}
          </div>

          {/* Right: Stepper Controls & Counter (01 / 06) */}
          <div className="deck-footer-stepper">
            <button 
              type="button" 
              onClick={triggerPrev} 
              className="deck-stepper-btn"
              aria-label="Previous project in deck"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="deck-stepper-counter">
              0{activeIndex + 1} <span className="deck-counter-slash">/</span> 0{totalProjects}
            </span>

            <button 
              type="button" 
              onClick={triggerNext} 
              className="deck-stepper-btn"
              aria-label="Next project in deck"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
