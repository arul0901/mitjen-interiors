import React, { useState, useRef, useEffect, TouchEvent, MouseEvent } from 'react';
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

const PROJECTS_ITEMS: ProjectItem[] = [
  {
    id: 'vintage-finish',
    step: '01',
    numeral: '1',
    title: 'VINTAGE FINISH INTERIOR, RACE COURSE, COIMBATORE',
    location: 'Race Course, Coimbatore',
    category: 'PU PAINT WORK ↗',
    typeLabel: 'Residential Space',
    description:
      'A vintage-inspired look brought to life with carefully finished PU paint detailing.',
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
      'A well-planned interior featuring clean detailing and a cohesive design finish.',
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
      'A functional workspace planned around how teams work, with clean detailing and a polished finish.',
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
      'A professional workspace shaped around functional layouts and a considered interior finish.',
    image: '/images/Corporate/Corporate1.jpeg',
    imageAlt: 'Corporate Site Interior',
    href: '/portfolio',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const dragStartXRef = useRef<number | null>(null);
  const totalProjects = PROJECTS_ITEMS.length;

  const triggerNext = () => {
    if (exitDirection) return;
    setExitDirection('left');
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % totalProjects);
      setExitDirection(null);
      setDragOffset(0);
    }, 320);
  };

  const triggerPrev = () => {
    if (exitDirection) return;
    setExitDirection('right');
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
      setExitDirection(null);
      setDragOffset(0);
    }, 320);
  };

  const jumpToCard = (index: number) => {
    if (index === activeIndex || exitDirection) return;
    const direction = index > activeIndex ? 'left' : 'right';
    setExitDirection(direction);
    setTimeout(() => {
      setActiveIndex(index);
      setExitDirection(null);
      setDragOffset(0);
    }, 320);
  };

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: TouchEvent) => {
    dragStartXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (dragStartXRef.current === null) return;
    const diff = e.touches[0].clientX - dragStartXRef.current;
    // Bound the drag distance
    setDragOffset(Math.max(Math.min(diff, 140), -140));
  };

  const handleTouchEnd = () => {
    if (dragStartXRef.current === null) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      triggerNext();
    } else if (dragOffset > 50) {
      triggerPrev();
    } else {
      setDragOffset(0);
    }
    dragStartXRef.current = null;
  };

  // Mouse Drag Handlers (Desktop)
  const handleMouseDown = (e: MouseEvent) => {
    // Only drag on left click and not on interactive buttons/links
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    setDragOffset(Math.max(Math.min(diff, 140), -140));
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      triggerNext();
    } else if (dragOffset > 50) {
      triggerPrev();
    } else {
      setDragOffset(0);
    }
    dragStartXRef.current = null;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <section 
      id="projects" 
      className="deck-section-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      <div className="deck-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER
            ==================================================================== */}
        <header className="deck-header">
          <div className="deck-badge">
            <span className="deck-badge-dot" aria-hidden="true" />
            <span className="deck-eyebrow">OUR PROJECTS</span>
          </div>

          <h2 className="deck-main-heading">
            SPACES WE’RE PROUD TO HAVE BUILT.
          </h2>

          <div className="deck-gold-line" aria-hidden="true" />
          
          <p className="deck-subheading">
            Swipe or click through our deck of featured residential and corporate transformations.
          </p>
        </header>

        {/* ====================================================================
            2. THE INTERACTIVE STACKED CARD DECK STAGE
            Cards stack with depth, scale, and vertical offsets
            ==================================================================== */}
        <div 
          className="deck-stage-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Stacked Projects Card Deck"
        >
          {/* Top Stack Peak Labels (Clickable tabs behind active card) */}
          <div className="deck-top-tab-triggers" aria-label="Deck quick jump">
            {PROJECTS_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jumpToCard(index)}
                  className={`deck-tab-pill ${isActive ? 'is-active' : ''}`}
                  aria-label={`Jump to project ${item.step}: ${item.title}`}
                >
                  <span className="deck-tab-num">{item.step}</span>
                  <span className="deck-tab-name">{item.location.split(',')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* The Stack Container */}
          <div className="deck-cards-stack-container">
            {PROJECTS_ITEMS.map((item, index) => {
              // Calculate relative stack depth (0 is active card in front)
              const depth = (index - activeIndex + totalProjects) % totalProjects;
              const isFront = depth === 0;

              // Compute inline styles based on depth
              // Stacked cards peek above with vertical offset and slight downscale
              let translateY = -(depth * 14);
              let scale = 1 - depth * 0.035;
              let opacity = depth === 0 ? 1 : Math.max(0.7 - depth * 0.12, 0.4);
              let zIndex = 20 - depth;
              let transformString = `translate3d(0, ${translateY}px, 0) scale(${scale})`;

              // If dragging the front card
              if (isFront && isDragging && dragOffset !== 0) {
                const rotate = dragOffset * 0.04;
                transformString = `translate3d(${dragOffset}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`;
              } else if (isFront && exitDirection === 'left') {
                transformString = `translate3d(-115%, ${translateY}px, 0) rotate(-7deg) scale(0.94)`;
                opacity = 0;
              } else if (isFront && exitDirection === 'right') {
                transformString = `translate3d(115%, ${translateY}px, 0) rotate(7deg) scale(0.94)`;
                opacity = 0;
              }

              return (
                <article
                  key={item.id}
                  className={`deck-card ${isFront ? 'is-front' : 'is-stacked'} ${isFront && isDragging ? 'is-grabbing' : ''}`}
                  style={{
                    transform: transformString,
                    zIndex,
                    opacity,
                    pointerEvents: isFront ? 'auto' : 'auto',
                  }}
                  onClick={() => {
                    if (!isFront) jumpToCard(index);
                  }}
                  aria-hidden={!isFront}
                >
                  <div className="deck-card-inner">
                    {/* LEFT COLUMN: Editorial Typography & Project Details */}
                    <div className="deck-card-content">
                      {/* Big Monogram Numeral */}
                      <div className="deck-card-numeral-wrap">
                        <span className="deck-card-big-num">{item.numeral}</span>
                        <div className="deck-card-step-badge">
                          <span className="deck-badge-label">PROJECT {item.step} OF 0{totalProjects}</span>
                        </div>
                      </div>

                      <div className="deck-card-location-row">
                        <MapPin size={13} className="deck-loc-icon" aria-hidden="true" />
                        <span className="deck-loc-text">{item.location}</span>
                        <span className="deck-type-tag">{item.typeLabel}</span>
                      </div>

                      <h3 className="deck-card-title">
                        <a href={item.href} aria-label={`${item.title} project details`}>
                          {item.title}
                        </a>
                      </h3>

                      <p className="deck-card-desc">
                        {item.description}
                      </p>

                      <div className="deck-card-actions">
                        <a 
                          href={item.href} 
                          className="deck-card-cta-btn" 
                          aria-label={`View ${item.category} in portfolio`}
                        >
                          <span>{item.category}</span>
                          <span className="deck-cta-arrow" aria-hidden="true">
                            <ArrowUpRight size={14} />
                          </span>
                        </a>

                        <span className="deck-swipe-hint-pill">
                          <span>Swipe Card</span>
                        </span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Large Architectural Photography Plate */}
                    <div className="deck-card-visual">
                      <div className="deck-visual-frame">
                        <img 
                          src={item.image} 
                          alt={item.imageAlt} 
                          className="deck-visual-img" 
                          loading="lazy" 
                        />
                        <div className="deck-visual-gradient" aria-hidden="true" />

                        {/* Floating Pill on Photo */}
                        <div className="deck-visual-category-floating">
                          <span className="deck-visual-category-pill">{item.category}</span>
                        </div>

                        {/* Mobile Swipe Buttons Overlaid */}
                        <div className="deck-visual-mobile-arrows">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); triggerPrev(); }} 
                            className="deck-overlay-arrow-btn"
                            aria-label="Previous project in deck"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); triggerNext(); }} 
                            className="deck-overlay-arrow-btn"
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
            3. DECK CONTROLS & BOTTOM NAVIGATION BAR
            Prev / Next arrows, progress dots, and View Portfolio link
            ==================================================================== */}
        <div className="deck-controls-bottom-bar">
          {/* Left: View All Portfolio Link */}
          <div className="deck-bottom-left">
            <a 
              href="/portfolio" 
              className="deck-view-all-link"
              aria-label="Explore all projects in portfolio"
            >
              <Layers size={15} aria-hidden="true" />
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Center: Pagination Dots */}
          <div className="deck-dots-group" aria-label="Deck pagination">
            {PROJECTS_ITEMS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => jumpToCard(index)}
                className={`deck-dot ${index === activeIndex ? 'is-active' : ''}`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>

          {/* Right: Stepper Navigation Chevrons */}
          <div className="deck-stepper-cluster">
            <button 
              type="button" 
              onClick={triggerPrev} 
              className="deck-stepper-btn"
              aria-label="Previous card in deck"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="deck-counter-text">
              0{activeIndex + 1} <span className="deck-slash">/</span> 0{totalProjects}
            </span>

            <button 
              type="button" 
              onClick={triggerNext} 
              className="deck-stepper-btn"
              aria-label="Next card in deck"
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
