import React, { useState, useEffect, useRef, useCallback } from 'react';
import { testimonialsData, TestimonialItem } from '../../data/testimonials';
import Reveal from '../shared/Reveal';
import '../../styles/content-sections.css';

export const TestimonialsSection: React.FC = () => {
  // Start on index 2 (Ananya Mehta - center card)
  const [activeIndex, setActiveIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const total = testimonialsData.length;

  // Track responsive screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Pointer drag/swipe interaction (drag threshold: 40px)
  const isPointerDown = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const hasMoved = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDown.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    currentX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return;
    currentX.current = e.clientX;
    if (Math.abs(e.clientX - startX.current) > 10) {
      hasMoved.current = true;
    }
  };

  const handlePointerUp = () => {
    if (!isPointerDown.current) return;
    const diff = currentX.current - startX.current;
    if (Math.abs(diff) >= 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    isPointerDown.current = false;
  };

  const handlePointerCancel = () => {
    isPointerDown.current = false;
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const cardWidth = isMobile ? 160 : 220;
  const cardHeight = isMobile ? 220 : 300;
  const activeItem: TestimonialItem = testimonialsData[activeIndex];

  const handleCardClick = (index: number, isActive: boolean) => {
    // If user dragged more than 15px, don't trigger click action
    if (hasMoved.current && Math.abs(currentX.current - startX.current) >= 15) {
      return;
    }
    if (isActive) {
      // Clicking the active center image advances to next image
      handleNext();
    } else {
      // Clicking any side image brings it directly to center
      setActiveIndex(index);
    }
  };

  return (
    <section
      className="bespoke-section-wrapper bespoke-testimonials-section"
      aria-label="Voices from those we've designed for"
    >
      <div className="bespoke-container">
        <Reveal staggerIndex={0}>
          {/* Centered Heading: 2 lines */}
          <div className="bespoke-testimonials-header">
            <h2 className="bespoke-testimonials-title">
              <span>Voices from those</span>
              <span>we&apos;ve designed for.</span>
            </h2>
          </div>
        </Reveal>

        {/* Fanned Carousel Stage */}
        <Reveal staggerIndex={1}>
          <div
            className="bespoke-fanned-stage"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client Testimonials Carousel"
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="bespoke-fanned-track"
              style={{
                height: `${cardHeight + (isMobile ? 36 : 48)}px`,
              }}
            >
              {testimonialsData.map((item, index) => {
                // Circular shortest offset in [-2, 2]
                let offset = index - activeIndex;
                if (offset > 2) offset -= total;
                if (offset < -2) offset += total;

                const isVisible = Math.abs(offset) <= 2;
                const isActive = offset === 0;

                // Fanned Card Positioning Formulas
                const tx = offset * 0.62 * cardWidth;
                const ty = Math.abs(offset) * (isMobile ? 10 : 14);
                const rot = offset * 6;
                const sc = 1 - Math.abs(offset) * 0.12;
                const zIndex = 10 - Math.abs(offset);
                const opacity = isVisible ? 1 : 0;
                const brightness = isActive ? 1 : 0.92;

                return (
                  <div
                    key={item.id}
                    className={`bespoke-fanned-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleCardClick(index, isActive)}
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardHeight}px`,
                      transform: `translate3d(calc(-50% + ${tx}px), ${ty}px, 0) rotate(${rot}deg) scale(${sc})`,
                      zIndex,
                      opacity,
                      filter: `brightness(${brightness})`,
                      pointerEvents: isVisible ? 'auto' : 'none',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.name}, ${item.role}. Click to view.`}
                  >
                    {/* Clipped Card Media & Gradient */}
                    <div className="bespoke-fanned-card-inner">
                      {/* Portrait Photo */}
                      <img
                        src={item.avatar}
                        alt={`${item.name} portrait`}
                        className="bespoke-fanned-card-img"
                        loading="lazy"
                        draggable={false}
                      />

                      {/* Active Bottom Gradient with Name & Role */}
                      <div
                        className={`bespoke-fanned-card-gradient ${
                          isActive ? 'is-visible' : ''
                        }`}
                        aria-hidden={!isActive}
                      >
                        <h3 className="bespoke-fanned-name">{item.name}</h3>
                        <p className="bespoke-fanned-role">{item.role}</p>
                      </div>
                    </div>

                    {/* Circular White Quote Badge Overlapping Bottom Edge */}
                    {isActive && (
                      <div
                        className="bespoke-fanned-quote-badge"
                        aria-hidden="true"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{ transform: 'rotate(180deg)' }}
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Quote Headline & Supporting Paragraph (Cross-fades on change) */}
            <div className="bespoke-fanned-quote-box" aria-live="polite">
              <div
                key={activeItem.id}
                className="bespoke-fanned-text-anim"
              >
                <h3 className="bespoke-fanned-headline">
                  {activeItem.headline}
                </h3>
                <p className="bespoke-fanned-supporting">
                  {activeItem.quote}
                </p>
              </div>
            </div>

            {/* Clickable Dots matching total number of images */}
            <div
              className="bespoke-fanned-dots"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {testimonialsData.map((item, dotIdx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`bespoke-fanned-dot ${
                    dotIdx === activeIndex ? 'active' : ''
                  }`}
                  aria-label={`Go to testimonial ${dotIdx + 1}: ${item.name}`}
                  role="tab"
                  aria-selected={dotIdx === activeIndex}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
