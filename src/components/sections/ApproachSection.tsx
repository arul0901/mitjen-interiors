import React, { useState, useRef, TouchEvent } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import '../../styles/ApproachSection.css';

interface ApproachItem {
  step: string;
  shortLabel: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  focus: string[];
}

const APPROACH_ITEMS: ApproachItem[] = [
  {
    step: '01',
    shortLabel: 'UNDERSTANDING',
    title: 'UNDERSTANDING YOUR NEEDS',
    description:
      'We begin by understanding your requirements, preferences and budget to establish the right direction for your project.',
    image: '/assets/images/projects/image1.jpg',
    imageAlt: 'Understanding Your Needs - Requirements, preferences and budget',
    href: '#',
    focus: ['Requirement Discovery', 'Budget & Timeline Alignment', 'Lifestyle & Spatial Needs'],
  },
  {
    step: '02',
    shortLabel: 'CONCEPT & MATERIALS',
    title: 'CONCEPT & MATERIALS',
    description:
      'Colours, materials and finishes come together to shape a design that reflects your preferences and project requirements.',
    image: '/assets/images/projects/image10.jpg',
    imageAlt: 'Concept & Materials - Colours, materials and finishes',
    href: '#',
    focus: ['Material Moodboards', 'Palette & Finish Selection', 'Detailed 3D Visualization'],
  },
  {
    step: '03',
    shortLabel: 'PRECISION PRODUCTION',
    title: 'PRECISION IN PRODUCTION',
    description:
      'From custom furniture to detailed components, we craft everything with care and attention to detail.',
    image: '/assets/images/projects/image4.jpg',
    imageAlt: 'Precision In Production - Custom furniture and precision components',
    href: '#',
    focus: ['German CNC Machinery', 'Custom Joinery & Millwork', 'Rigorous Quality Checks'],
  },
  {
    step: '04',
    shortLabel: 'EXECUTION & HANDOVER',
    title: 'PROJECT EXECUTION & HANDOVER',
    description:
      'We take the approved design through execution, working towards a finished space that reflects the agreed plan.',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
    imageAlt: 'Project Execution & Handover - Approved design through execution',
    href: '#',
    focus: ['Turnkey Site Supervision', 'Timeline Adherence', 'Final Snagging & Walkthrough'],
  },
];

export const ApproachSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSteps = APPROACH_ITEMS.length;
  const currentItem = APPROACH_ITEMS[activeStep];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % totalSteps);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + totalSteps) % totalSteps);
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
      id="approach" 
      className="approach-section-root" 
      aria-label="Our Approach - A Clear Process. A Better Space."
    >
      <div className="approach-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER
            ==================================================================== */}
        <header className="approach-header">
          <div className="approach-header-badge">
            <span className="approach-badge-dot" aria-hidden="true" />
            <span className="approach-eyebrow">OUR APPROACH</span>
          </div>

          <h2 className="approach-main-heading">
            A CLEAR PROCESS. A BETTER SPACE.
          </h2>

          <div className="approach-gold-line" aria-hidden="true" />
        </header>

        {/* ====================================================================
            2. DESKTOP & TABLET TIMELINE STEPPER
            ==================================================================== */}
        <nav className="approach-timeline-nav" aria-label="Process stages">
          <div className="approach-timeline-track">
            <div 
              className="approach-timeline-progress-fill" 
              style={{ width: `${(activeStep / (totalSteps - 1)) * 100}%` }}
              aria-hidden="true"
            />
          </div>

          <div className="approach-timeline-nodes">
            {APPROACH_ITEMS.map((item, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`approach-timeline-node-btn ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                  aria-selected={isActive}
                  role="tab"
                  aria-label={`Step ${item.step}: ${item.title}`}
                >
                  <span className="approach-node-number">{item.step}</span>
                  <span className="approach-node-label">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ====================================================================
            3. MOBILE STEPPER BAR (Touch Pills for Phone Screens)
            ==================================================================== */}
        <div className="approach-mobile-stepper-bar">
          <div className="approach-mobile-step-pills">
            {APPROACH_ITEMS.map((item, index) => {
              const isActive = index === activeStep;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`approach-mobile-pill ${isActive ? 'is-active' : ''}`}
                  aria-label={`Jump to Step ${item.step}`}
                >
                  <span className="approach-pill-num">{item.step}</span>
                  <span className="approach-pill-text">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            4. ARCHITECTURAL SHOWCASE STAGE (Touch Swipe Enabled)
            ==================================================================== */}
        <div 
          className="approach-stage-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="approach-stage-grid">
            {/* LEFT / VISUAL: Photographic Plate */}
            <div className="approach-stage-visual">
              <div className="approach-visual-frame">
                <img 
                  key={currentItem.image}
                  src={currentItem.image} 
                  alt={currentItem.imageAlt} 
                  className="approach-stage-image" 
                  loading="lazy" 
                />
                <div className="approach-visual-gradient" aria-hidden="true" />
                
                {/* Floating Architectural Badge */}
                <div className="approach-visual-badge">
                  <span className="approach-visual-phase-text">
                    PHASE {currentItem.step} OF 0{totalSteps}
                  </span>
                </div>

                {/* Mobile Quick Tap Arrows Over Image */}
                <div className="approach-image-arrows">
                  <button 
                    type="button" 
                    onClick={handlePrev} 
                    className="approach-img-nav-btn"
                    aria-label="Previous step"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="approach-img-nav-btn"
                    aria-label="Next step"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT / EDITORIAL: Architectural Details */}
            <div className="approach-stage-editorial">
              {/* Subtle architectural watermark number */}
              <span className="approach-editorial-watermark" aria-hidden="true">
                {currentItem.step}
              </span>

              <div className="approach-editorial-content">
                <div className="approach-phase-eyebrow-row">
                  <span className="approach-phase-badge">
                    STAGE {currentItem.step}
                  </span>
                  <span className="approach-step-indicator">
                    {activeStep + 1} / {totalSteps}
                  </span>
                </div>

                <h3 className="approach-editorial-title">
                  {currentItem.title}
                </h3>

                <div className="approach-editorial-divider" aria-hidden="true" />

                <p className="approach-editorial-desc">
                  {currentItem.description}
                </p>

                {/* Architectural Key Focus Points */}
                <div className="approach-focus-list">
                  {currentItem.focus.map((point) => (
                    <div key={point} className="approach-focus-item">
                      <CheckCircle2 size={15} className="approach-focus-icon" aria-hidden="true" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Action & Navigation Controls */}
                <div className="approach-editorial-footer">
                  <a 
                    href={currentItem.href} 
                    className="approach-editorial-cta" 
                    aria-label={`Discover more - ${currentItem.title}`}
                  >
                    <span>DISCOVER MORE</span>
                    <ArrowRight size={15} className="approach-cta-arrow" aria-hidden="true" />
                  </a>

                  {/* Stage Stepper Arrows */}
                  <div className="approach-desktop-nav-cluster">
                    <button 
                      type="button" 
                      onClick={handlePrev} 
                      className="approach-nav-arrow-btn"
                      aria-label="Previous process stage"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="approach-nav-counter">
                      {currentItem.step} <span className="approach-nav-slash">/</span> 0{totalSteps}
                    </span>
                    <button 
                      type="button" 
                      onClick={handleNext} 
                      className="approach-nav-arrow-btn"
                      aria-label="Next process stage"
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
            5. DESKTOP INTERACTIVE DOCK (4 Quick-Select Plates)
            ==================================================================== */}
        <div className="approach-dock-grid" role="tablist" aria-label="Process Overview Plates">
          {APPROACH_ITEMS.map((item, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`approach-dock-card ${isActive ? 'is-active' : ''}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`View ${item.title}`}
              >
                <div className="approach-dock-thumb">
                  <img src={item.image} alt="" aria-hidden="true" loading="lazy" />
                  <span className="approach-dock-num">{item.step}</span>
                </div>
                <div className="approach-dock-info">
                  <span className="approach-dock-tag">PHASE {item.step}</span>
                  <span className="approach-dock-title">{item.shortLabel}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ====================================================================
            6. MOBILE PAGINATION DOTS (Clear Visual Progress on Phones)
            ==================================================================== */}
        <div className="approach-mobile-dots" aria-hidden="true">
          {APPROACH_ITEMS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`approach-dot ${index === activeStep ? 'is-active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
