import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutVaneBanner.css';

// Ensure ScrollTrigger is registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BannerSlide {
  id: string;
  num: string;
  kicker: string;
  title: string;
  desc: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

const ABOUT_SLIDES: BannerSlide[] = [
  {
    id: 'slide-atelier',
    num: '01',
    kicker: 'ARCHITECTURAL ATELIER // CRAFTED SANCTUARY',
    title: 'ABOUT MITJEN',
    desc: 'Pioneering bespoke architectural interiors, conscious spatial planning, and turnkey craftsmanship across luxury residential and corporate environments.',
    image: '/assets/mitijen/Banner1.jpg',
    ctaText: 'OUR EXPERTISE',
    ctaLink: '#about-mission',
  },
  {
    id: 'slide-craft',
    num: '02',
    kicker: 'UNCOMPROMISING PRECISION // BESPOKE MILLWORK',
    title: 'THE ARCHITECTURE OF LIVING',
    desc: 'Where visionary aesthetics meet artisanal joinery, authentic materials, and zero-tolerance engineering to create timeless spaces.',
    image: '/assets/mitijen/Banner2.jpg',
    ctaText: 'EXPLORE SOLUTIONS',
    ctaLink: '/services',
  },
];

export const AboutVaneBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);

  // Responsive vane count: 18 on desktop, 12 on mobile
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const totalVanes = isMobile ? 12 : 18;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const bladeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Responsive resize handler
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

  // Preload both banner images
  useEffect(() => {
    ABOUT_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // GSAP 180° Vane Scroll Scrub Setup
  useEffect(() => {
    const container = containerRef.current;
    const viewport = stickyViewportRef.current;
    if (!container || !viewport) return;

    const win = window as any;
    const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;
    const activeGsap = win.gsap || gsap;

    try {
      activeGsap.registerPlugin(activeScrollTrigger);
    } catch {}

    const blades = bladeRefs.current.slice(0, totalVanes).filter((el): el is HTMLDivElement => el !== null);
    const lights = lightRefs.current.slice(0, totalVanes).filter((el): el is HTMLDivElement => el !== null);

    // Initial orientation: blades face forward at 0° (Image 1)
    activeGsap.set(blades, { rotateY: 0 });
    activeGsap.set(lights, { opacity: 0 });

    // Timeline: 180° rotation revealing Image 2 on the back face
    const tl = activeGsap.timeline({
      paused: true,
      defaults: { ease: 'power1.inOut' },
    });

    // Rotation phase: 0° -> 180°
    tl.to(
      blades,
      {
        rotateY: 180,
        duration: 0.8,
        stagger: {
          each: 0.018,
          from: 'start',
          ease: 'power1.inOut',
        },
        ease: 'power2.inOut',
      },
      0.15
    );

    // Specular glint reflection peaking at 90° edge-on transition
    tl.to(
      lights,
      {
        opacity: 0.5,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.018,
          from: 'start',
        },
        ease: 'sine.inOut',
      },
      0.25
    );

    // Plateau buffer after rotation completes
    tl.to({}, { duration: 0.35 }, 0.95);

    // Pinned ScrollTrigger
    const st = activeScrollTrigger.create({
      id: 'about-vane-pin-trigger',
      trigger: container,
      start: 'top top',
      end: '+=120%',
      pin: viewport,
      scrub: 0.6,
      animation: tl,
      onUpdate: (self: { progress: number }) => {
        setScrollProgress(self.progress);
        if (self.progress < 0.5) {
          setActiveIdx(0);
        } else {
          setActiveIdx(1);
        }
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
      tl.kill();
    };
  }, [totalVanes]);

  const scrollToSlide = useCallback((targetIdx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const startPos = st.start;
    const distance = st.end - st.start;
    const targetScroll = targetIdx === 0 ? startPos + 5 : startPos + distance * 0.85;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  const handleScrollDown = useCallback(() => {
    const st = scrollTriggerRef.current;
    const targetY = st ? st.end + 10 : window.innerHeight * 1.5;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  const currentSlide = ABOUT_SLIDES[activeIdx];

  return (
    <div
      ref={containerRef}
      className="about-vane-container"
      aria-label="About Mitjen Kinetic Banner"
    >
      <div ref={stickyViewportRef} className="about-vane-viewport">
        {/* 3D Louvre Layer */}
        <div className="about-vane-layer">
          {Array.from({ length: totalVanes }).map((_, i) => {
            const vaneWidthPercent = 100 / totalVanes;
            const vaneLeftPercent = i * vaneWidthPercent;

            return (
              <div
                key={i}
                className="about-vane-unit"
                style={{
                  width: `calc(${vaneWidthPercent}% + 0.5px)`,
                  left: `${vaneLeftPercent}%`,
                }}
              >
                <div
                  ref={(el) => {
                    bladeRefs.current[i] = el;
                  }}
                  className="about-vane-blade"
                >
                  {/* FRONT FACE: Image 1 (0°) */}
                  <div className="about-vane-face face-front">
                    <div
                      className="about-vane-slice-img"
                      style={{
                        backgroundImage: `url("${ABOUT_SLIDES[0].image}")`,
                        left: `-${i * (100 / totalVanes)}vw`,
                      }}
                    />
                  </div>

                  {/* BACK FACE: Image 2 (180°) */}
                  <div className="about-vane-face face-back">
                    <div
                      className="about-vane-slice-img"
                      style={{
                        backgroundImage: `url("${ABOUT_SLIDES[1].image}")`,
                        left: `-${i * (100 / totalVanes)}vw`,
                      }}
                    />
                  </div>

                  {/* Specular Glint */}
                  <div
                    ref={(el) => {
                      lightRefs.current[i] = el;
                    }}
                    className="about-vane-lighting"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Dark Scrim */}
        <div className="about-vane-scrim" aria-hidden="true" />

        {/* Editorial Content Overlay */}
        <div className="about-vane-editorial">
          {/* Top Bar with Breadcrumbs */}
          <div className="about-vane-top-bar">
            <nav className="about-vane-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="about-vane-sep">/</span>
              <span className="about-vane-active-crumb">About Us</span>
            </nav>

            <div className="about-vane-badge">
              <span className="about-vane-badge-pulse" />
              <span>ATELIER PRACTICE // COIMBATORE</span>
            </div>
          </div>

          {/* Center Dynamic Content */}
          <div className="about-vane-center" key={currentSlide.id}>
            <div className="about-vane-kicker">{currentSlide.kicker}</div>
            <h1 className="about-vane-title">{currentSlide.title}</h1>
            <p className="about-vane-desc">{currentSlide.desc}</p>

            <div className="about-vane-actions">
              {currentSlide.ctaLink.startsWith('#') ? (
                <a
                  href={currentSlide.ctaLink}
                  className="about-vane-cta-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollDown();
                  }}
                >
                  <span>{currentSlide.ctaText}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              ) : (
                <Link to={currentSlide.ctaLink} className="about-vane-cta-btn">
                  <span>{currentSlide.ctaText}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}

              <button
                type="button"
                className="about-vane-scroll-hint"
                onClick={handleScrollDown}
              >
                <span>SCROLL TO EXPLORE</span>
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar: Indicators & Counter */}
          <div className="about-vane-bottom-bar">
            <div className="about-vane-indicators">
              {ABOUT_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`about-vane-tab ${activeIdx === idx ? 'is-active' : ''}`}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Jump to slide ${slide.num}: ${slide.title}`}
                >
                  <span className="about-vane-tab-num">{slide.num}</span>
                  <span>{idx === 0 ? 'ATELIER' : 'CRAFT'}</span>
                </button>
              ))}
            </div>

            <div className="about-vane-progress-track" aria-hidden="true">
              <div
                className="about-vane-progress-fill"
                style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
              />
            </div>

            <div className="about-vane-counter">
              <strong>{currentSlide.num}</strong> / 02
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVaneBanner;
