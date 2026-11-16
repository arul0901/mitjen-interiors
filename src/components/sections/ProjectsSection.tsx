import React, { useState, useRef, TouchEvent } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import '../../styles/ProjectsSection.css';

interface ProjectItem {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  location: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

const PROJECTS_ITEMS: ProjectItem[] = [
  {
    id: 'vintage-finish',
    step: '01',
    title: 'VINTAGE FINISH INTERIOR, RACE COURSE, COIMBATORE',
    shortTitle: 'VINTAGE FINISH',
    location: 'Race Course, Coimbatore',
    category: 'PU PAINT WORK ↗',
    description:
      'A vintage-inspired look brought to life with carefully finished PU paint detailing.',
    image: '/images/Residential/Residential1.jpeg',
    imageAlt: 'Vintage Finish Interior, Race Course, Coimbatore',
    href: '/portfolio',
  },
  {
    id: 'kr-pura',
    step: '02',
    title: 'INTERIOR PROJECT, KR PURA, BANGALORE',
    shortTitle: 'KR PURA PROJECT',
    location: 'KR Pura, Bangalore',
    category: 'INTERIOR DESIGN ↗',
    description:
      'A well-planned interior featuring clean detailing and a cohesive design finish.',
    image: '/images/Residential/Residential2.jpeg',
    imageAlt: 'Interior Project, KR Pura, Bangalore',
    href: '/portfolio',
  },
  {
    id: 'tidal-park',
    step: '03',
    title: 'OFFICE INTERIOR, TIDAL PARK',
    shortTitle: 'TIDAL PARK OFFICE',
    location: 'Tidal Park, Coimbatore',
    category: 'INTERIOR DESIGN ↗',
    description:
      'A functional workspace planned around how teams work, with clean detailing and a polished finish.',
    image: '/images/Commercial/Commercial1.jpeg',
    imageAlt: 'Office Interior, Tidal Park',
    href: '/portfolio',
  },
  {
    id: 'corporate-site',
    step: '04',
    title: 'CORPORATE SITE INTERIOR',
    shortTitle: 'CORPORATE SITE',
    location: 'Corporate Workspace',
    category: 'WORKSPACE DESIGN ↗',
    description:
      'A professional workspace shaped around functional layouts and a considered interior finish.',
    image: '/images/Corporate/Corporate1.jpeg',
    imageAlt: 'Corporate Site Interior',
    href: '/portfolio',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalProjects = PROJECTS_ITEMS.length;
  const currentProject = PROJECTS_ITEMS[activeProjectIndex];

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45; // Minimum px to trigger swipe

    if (distance > minSwipeDistance) {
      // Swiped left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Prev
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section 
      id="projects" 
      className="projects-section-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      <div className="projects-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER
            ==================================================================== */}
        <header className="projects-header">
          <div className="projects-header-badge">
            <span className="projects-badge-dot" aria-hidden="true" />
            <span className="projects-eyebrow">OUR PROJECTS</span>
          </div>

          <h2 className="projects-main-heading">
            SPACES WE’RE PROUD TO HAVE BUILT.
          </h2>

          <div className="projects-gold-line" aria-hidden="true" />
        </header>

        {/* ====================================================================
            2. DESKTOP PROJECT SELECTOR TABS
            ==================================================================== */}
        <nav className="projects-timeline-nav" aria-label="Project selector">
          <div className="projects-timeline-track">
            <div 
              className="projects-timeline-progress-fill" 
              style={{ width: `${(activeProjectIndex / (totalProjects - 1)) * 100}%` }}
              aria-hidden="true"
            />
          </div>

          <div className="projects-timeline-nodes">
            {PROJECTS_ITEMS.map((item, index) => {
              const isActive = index === activeProjectIndex;
              const isPast = index < activeProjectIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveProjectIndex(index)}
                  className={`projects-timeline-node-btn ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                  aria-selected={isActive}
                  role="tab"
                  aria-label={`Project ${item.step}: ${item.title}`}
                >
                  <span className="projects-node-number">{item.step}</span>
                  <span className="projects-node-label">{item.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ====================================================================
            3. MOBILE STEPPER BAR (Touch Pills for Phone Screens)
            ==================================================================== */}
        <div className="projects-mobile-stepper-bar">
          <div className="projects-mobile-step-pills">
            {PROJECTS_ITEMS.map((item, index) => {
              const isActive = index === activeProjectIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveProjectIndex(index)}
                  className={`projects-mobile-pill ${isActive ? 'is-active' : ''}`}
                  aria-label={`Jump to Project ${item.step}`}
                >
                  <span className="projects-pill-num">{item.step}</span>
                  <span className="projects-pill-text">{item.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            4. CINEMATIC ARCHITECTURAL SHOWCASE STAGE (Touch Swipe Enabled)
            ==================================================================== */}
        <div 
          className="projects-stage-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="projects-stage-grid">
            {/* LEFT / VISUAL: Photographic Plate */}
            <div className="projects-stage-visual">
              <div className="projects-visual-frame">
                <img 
                  key={currentProject.image}
                  src={currentProject.image} 
                  alt={currentProject.imageAlt} 
                  className="projects-stage-image" 
                  loading="lazy" 
                />
                <div className="projects-visual-gradient" aria-hidden="true" />
                
                {/* Floating Category Pill */}
                <div className="projects-visual-category-floating">
                  <span className="projects-visual-category-pill">
                    {currentProject.category}
                  </span>
                </div>

                {/* Floating Architectural Badge */}
                <div className="projects-visual-badge">
                  <span className="projects-visual-phase-text">
                    PROJECT {currentProject.step} OF 0{totalProjects}
                  </span>
                </div>

                {/* Mobile Quick Tap Arrows Over Image */}
                <div className="projects-image-arrows">
                  <button 
                    type="button" 
                    onClick={handlePrev} 
                    className="projects-img-nav-btn"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="projects-img-nav-btn"
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT / EDITORIAL: Architectural Details */}
            <div className="projects-stage-editorial">
              {/* Subtle architectural watermark number */}
              <span className="projects-editorial-watermark" aria-hidden="true">
                {currentProject.step}
              </span>

              <div className="projects-editorial-content">
                <div className="projects-phase-eyebrow-row">
                  <div className="projects-location-chip">
                    <MapPin size={13} className="projects-location-icon" aria-hidden="true" />
                    <span>{currentProject.location}</span>
                  </div>
                  <span className="projects-step-indicator">
                    {activeProjectIndex + 1} / {totalProjects}
                  </span>
                </div>

                <h3 className="projects-editorial-title">
                  <a href={currentProject.href} aria-label={`${currentProject.title} project details`}>
                    {currentProject.title}
                  </a>
                </h3>

                <div className="projects-editorial-divider" aria-hidden="true" />

                <p className="projects-editorial-desc">
                  {currentProject.description}
                </p>

                {/* Action & Navigation Controls */}
                <div className="projects-editorial-footer">
                  <a 
                    href={currentProject.href} 
                    className="projects-editorial-cta" 
                    aria-label={`View ${currentProject.category} category projects`}
                  >
                    <span>{currentProject.category}</span>
                    <ArrowUpRight size={15} className="projects-cta-arrow" aria-hidden="true" />
                  </a>

                  {/* Stage Stepper Arrows */}
                  <div className="projects-desktop-nav-cluster">
                    <button 
                      type="button" 
                      onClick={handlePrev} 
                      className="projects-nav-arrow-btn"
                      aria-label="Previous project"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="projects-nav-counter">
                      {currentProject.step} <span className="projects-nav-slash">/</span> 0{totalProjects}
                    </span>
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="projects-nav-arrow-btn"
                      aria-label="Next project"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            5. DESKTOP INTERACTIVE DOCK (4 Quick-Select Project Plates)
            ==================================================================== */}
        <div className="projects-dock-grid" role="tablist" aria-label="Project Overview Plates">
          {PROJECTS_ITEMS.map((item, index) => {
            const isActive = index === activeProjectIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveProjectIndex(index)}
                className={`projects-dock-card ${isActive ? 'is-active' : ''}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`View ${item.title}`}
              >
                <div className="projects-dock-thumb">
                  <img src={item.image} alt="" aria-hidden="true" loading="lazy" />
                  <span className="projects-dock-num">{item.step}</span>
                </div>
                <div className="projects-dock-info">
                  <span className="projects-dock-tag">{item.category}</span>
                  <span className="projects-dock-title">{item.shortTitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ====================================================================
            6. MOBILE PAGINATION DOTS (Clear Visual Progress on Phones)
            ==================================================================== */}
        <div className="projects-mobile-dots" aria-hidden="true">
          {PROJECTS_ITEMS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveProjectIndex(index)}
              className={`projects-dot ${index === activeProjectIndex ? 'is-active' : ''}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
