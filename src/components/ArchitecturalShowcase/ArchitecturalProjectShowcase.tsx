import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ARCHITECTURAL_PROJECTS, 
  MATERIAL_SPECIFICATIONS, 
  ShowcaseProject, 
  ShowcaseImage 
} from '../../data/showcaseProjects';
import { useInquiry } from '../../context/useInquiry';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  MapPin, 
  Grid, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/ArchitecturalProjectShowcase.css';

export const ArchitecturalProjectShowcase: React.FC = () => {
  const { openInquiry } = useInquiry();
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Active image index for each project (project.id -> active image index)
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({
    'project-wonder-space-prithvi': 0,
    'project-wonder-space-sampath': 0,
    'project-mr-mahesh': 0,
    'project-elara-space-deepak': 0,
  });

  // Modal Lightbox state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    project: ShowcaseProject | null;
    currentIndex: number;
  }>({
    isOpen: false,
    project: null,
    currentIndex: 0,
  });

  // Open Lightbox for a specific project and image index
  const openLightbox = (project: ShowcaseProject, index: number) => {
    setLightboxState({
      isOpen: true,
      project,
      currentIndex: index,
    });
    document.body.style.overflow = 'hidden';
  };

  // Close Lightbox
  const closeLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxState.isOpen || !lightboxState.project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setLightboxState((prev) => {
          if (!prev.project) return prev;
          const nextIdx = (prev.currentIndex + 1) % prev.project.allImages.length;
          return { ...prev, currentIndex: nextIdx };
        });
      } else if (e.key === 'ArrowLeft') {
        setLightboxState((prev) => {
          if (!prev.project) return prev;
          const prevIdx = (prev.currentIndex - 1 + prev.project.allImages.length) % prev.project.allImages.length;
          return { ...prev, currentIndex: prevIdx };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, lightboxState.project, closeLightbox]);

  // Handle switching active preview image inside a project
  const handleSelectImage = (projectId: string, index: number) => {
    setActiveImageIndices((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Register ScrollTrigger if available
    const win = window as Window & { ScrollTrigger?: typeof ScrollTrigger; gsap?: typeof gsap };
    const activeGsap = win.gsap || gsap;
    const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;

    try {
      activeGsap.registerPlugin(activeScrollTrigger);
    } catch {}

    const ctx = activeGsap.context(() => {
      // Intro section subtle entrance
      activeGsap.from('.arch-showcase-intro-text', {
        scrollTrigger: {
          trigger: '.arch-showcase-intro',
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Individual project entrance animations
      const projectBlocks = rootRef.current?.querySelectorAll('.arch-showcase-item');
      projectBlocks?.forEach((block) => {
        activeGsap.from(block.querySelectorAll('.arch-showcase-fade-in'), {
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 28,
          opacity: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power2.out',
        });
      });

      // Subtle Parallax on large photographic canvases (desktop/tablet)
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        const parallaxImages = rootRef.current?.querySelectorAll<HTMLElement>(
          '.arch-main-canvas-img, .arch-cinematic-canvas-img, .arch-asym-dominant-img, .arch-intro-img'
        );
        parallaxImages?.forEach((img) => {
          activeGsap.fromTo(
            img,
            { yPercent: -4, scale: 1.04 },
            {
              yPercent: 4,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement || img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });
      }

      // Materials section entrance
      activeGsap.from('.arch-materials-card', {
        scrollTrigger: {
          trigger: '.arch-materials-section',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power2.out',
      });

      // Closing CTA Banner entrance
      activeGsap.from('.arch-cta-inner', {
        scrollTrigger: {
          trigger: '.arch-showcase-cta',
          start: 'top 85%',
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={rootRef}
      id="portfolio-showcase" 
      className="arch-showcase-root" 
      aria-label="Mitjen Selected Architectural Work"
    >
      {/* ====================================================================
          2. SECTION INTRODUCTION (Editorial Split Layout)
          ==================================================================== */}
      <div className="arch-showcase-intro-wrap">
        <div className="arch-showcase-container">
          <div className="arch-showcase-intro">
            {/* Left Column: Editorial Typography */}
            <div className="arch-showcase-intro-text">
              <span className="arch-eyebrow">OUR SELECTED WORK</span>
              <h2 className="arch-editorial-heading">
                Spaces Designed Around the Way You Live.
              </h2>
              <div className="arch-heading-rule" aria-hidden="true" />
              <p className="arch-editorial-desc">
                Every project is an individual expression of lifestyle, architecture and craftsmanship. Explore a selection of residential spaces where thoughtful planning, carefully selected materials and refined detailing come together.
              </p>
            </div>

            {/* Right Column: Architectural Atmosphere Imagery */}
            <div className="arch-showcase-intro-media">
              <div className="arch-intro-image-frame">
                <img 
                  src="/images/Residential/Residential3.jpeg" 
                  alt="Architectural interior detail of residential vertical circulation" 
                  className="arch-intro-img"
                  loading="lazy"
                />
                <div className="arch-intro-badge">
                  <span className="arch-intro-badge-num">04</span>
                  <span className="arch-intro-badge-label">Curated Commissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          3 & 4. INDIVIDUAL PROJECT SHOWCASES (Alternating Compositions)
          ==================================================================== */}
      <div className="arch-projects-stream">
        {ARCHITECTURAL_PROJECTS.map((project, projectIndex) => {
          const activeIndex = activeImageIndices[project.id] ?? 0;
          const currentImage = project.allImages[activeIndex] || project.heroImage;

          return (
            <article 
              key={project.id} 
              id={project.id}
              className={`arch-showcase-item arch-layout-${project.layoutType}`}
              aria-labelledby={`heading-${project.id}`}
            >
              <div className="arch-showcase-container">
                {/* Project Header Meta Strip */}
                <header className="arch-item-meta-strip arch-showcase-fade-in">
                  <div className="arch-item-num-wrap">
                    <span className="arch-item-num">{project.number}</span>
                    <span className="arch-item-separator">/</span>
                    <span className="arch-item-total">04</span>
                  </div>
                  <div className="arch-item-title-col">
                    <span className="arch-item-client-tag">
                      {project.client ? `Client: ${project.client}` : 'Private Commission'}
                    </span>
                    <h3 id={`heading-${project.id}`} className="arch-item-name">
                      {project.name}
                    </h3>
                  </div>
                  <div className="arch-item-loc-col">
                    <MapPin size={15} strokeWidth={1.8} className="arch-loc-icon" aria-hidden="true" />
                    <span>{project.locationLocality}, {project.locationCity}</span>
                  </div>
                </header>

                {/* -------------------------------------------------------------
                    LAYOUT VARIANT 01: Landscape Left, Details Right
                    ------------------------------------------------------------- */}
                {project.layoutType === 'landscape-left' && (
                  <div className="arch-split-grid arch-grid-left">
                    {/* Media Column */}
                    <div className="arch-media-col arch-showcase-fade-in">
                      <div 
                        className="arch-main-canvas-wrap" 
                        onClick={() => openLightbox(project, activeIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(project, activeIndex); }}
                        aria-label={`Open full-screen image viewer for ${project.name} - ${currentImage.caption}`}
                      >
                        <img 
                          src={currentImage.src} 
                          alt={currentImage.alt} 
                          className="arch-main-canvas-img"
                          loading="lazy"
                        />
                        <div className="arch-canvas-caption-bar">
                          <span className="arch-canvas-caption">{currentImage.caption}</span>
                          <span className="arch-canvas-zoom-hint">
                            <Maximize2 size={14} aria-hidden="true" />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>

                      {/* Secondary Thumbnail Bar */}
                      <div className="arch-gallery-strip" role="group" aria-label="Project photographs">
                        {project.allImages.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`arch-thumb-btn ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => handleSelectImage(project.id, i)}
                            aria-label={`View photo ${i + 1}: ${img.caption}`}
                          >
                            <img src={img.src} alt="" className="arch-thumb-img" loading="lazy" />
                            <span className="arch-thumb-label">{img.space || `View ${i + 1}`}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Details Column */}
                    <div className="arch-details-col arch-showcase-fade-in">
                      <div className="arch-area-callout">
                        <span className="arch-area-figure">{project.formattedArea}</span>
                        <p className="arch-area-tagline">
                          A thoughtfully planned {project.configuration.toLowerCase()} {project.propertyType.toLowerCase()} located in {project.locationLocality}.
                        </p>
                      </div>

                      <div className="arch-specs-card">
                        <h4 className="arch-specs-card-title">PROJECT SPECIFICATIONS</h4>
                        <dl className="arch-specs-table">
                          {project.specifications.map((spec, i) => (
                            <div key={i} className="arch-specs-row">
                              <dt className="arch-spec-key">{spec.label}</dt>
                              <dd className="arch-spec-val">{spec.value}</dd>
                            </div>
                          ))}
                          <div className="arch-specs-row">
                            <dt className="arch-spec-key">Project Area</dt>
                            <dd className="arch-spec-val">{project.formattedArea}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="arch-cta-wrap">
                        <button
                          type="button"
                          className="arch-consult-btn"
                          onClick={() => openInquiry(`Commission Inquiry: ${project.name} (${project.locationCity})`)}
                        >
                          <span>CONSULT FOR THIS LAYOUT</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    LAYOUT VARIANT 02: Details Left, Landscape Right
                    ------------------------------------------------------------- */}
                {project.layoutType === 'landscape-right' && (
                  <div className="arch-split-grid arch-grid-right">
                    {/* Details Column */}
                    <div className="arch-details-col arch-showcase-fade-in">
                      <div className="arch-area-callout">
                        <span className="arch-area-figure">{project.formattedArea}</span>
                        <p className="arch-area-tagline">
                          An expansive {project.configuration.toLowerCase()} {project.propertyType.toLowerCase()} characterized by double-height volumes and tailored spatial zoning.
                        </p>
                      </div>

                      <div className="arch-specs-card">
                        <h4 className="arch-specs-card-title">PROJECT SPECIFICATIONS</h4>
                        <dl className="arch-specs-table">
                          {project.specifications.map((spec, i) => (
                            <div key={i} className="arch-specs-row">
                              <dt className="arch-spec-key">{spec.label}</dt>
                              <dd className="arch-spec-val">{spec.value}</dd>
                            </div>
                          ))}
                          <div className="arch-specs-row">
                            <dt className="arch-spec-key">Project Area</dt>
                            <dd className="arch-spec-val">{project.formattedArea}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="arch-cta-wrap">
                        <button
                          type="button"
                          className="arch-consult-btn"
                          onClick={() => openInquiry(`Commission Inquiry: ${project.name} (${project.locationCity})`)}
                        >
                          <span>CONSULT FOR THIS LAYOUT</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Media Column */}
                    <div className="arch-media-col arch-showcase-fade-in">
                      <div 
                        className="arch-main-canvas-wrap"
                        onClick={() => openLightbox(project, activeIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(project, activeIndex); }}
                        aria-label={`Open full-screen image viewer for ${project.name} - ${currentImage.caption}`}
                      >
                        <img 
                          src={currentImage.src} 
                          alt={currentImage.alt} 
                          className="arch-main-canvas-img"
                          loading="lazy"
                        />
                        <div className="arch-canvas-caption-bar">
                          <span className="arch-canvas-caption">{currentImage.caption}</span>
                          <span className="arch-canvas-zoom-hint">
                            <Maximize2 size={14} aria-hidden="true" />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>

                      {/* Secondary Thumbnail Bar */}
                      <div className="arch-gallery-strip" role="group" aria-label="Project photographs">
                        {project.allImages.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`arch-thumb-btn ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => handleSelectImage(project.id, i)}
                            aria-label={`View photo ${i + 1}: ${img.caption}`}
                          >
                            <img src={img.src} alt="" className="arch-thumb-img" loading="lazy" />
                            <span className="arch-thumb-label">{img.space || `View ${i + 1}`}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    LAYOUT VARIANT 03: Full-Width Cinematic Photography
                    ------------------------------------------------------------- */}
                {project.layoutType === 'cinematic-full' && (
                  <div className="arch-cinematic-block arch-showcase-fade-in">
                    {/* Panoramic Canvas */}
                    <div 
                      className="arch-cinematic-canvas-wrap"
                      onClick={() => openLightbox(project, activeIndex)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(project, activeIndex); }}
                      aria-label={`Open full-screen image viewer for ${project.name} - ${currentImage.caption}`}
                    >
                      <img 
                        src={currentImage.src} 
                        alt={currentImage.alt} 
                        className="arch-cinematic-canvas-img"
                        loading="lazy"
                      />
                      <div className="arch-cinematic-overlay-bar">
                        <div className="arch-cinematic-caption-group">
                          <span className="arch-cinematic-caption-title">{project.name}</span>
                          <span className="arch-cinematic-caption-sub">{currentImage.caption}</span>
                        </div>
                        <span className="arch-canvas-zoom-hint">
                          <Maximize2 size={14} aria-hidden="true" />
                          <span>View Fullscreen</span>
                        </span>
                      </div>
                    </div>

                    {/* Integrated Architectural Specification Bar Below */}
                    <div className="arch-cinematic-spec-strip">
                      <div className="arch-cinematic-area-box">
                        <span className="arch-cinematic-area-num">{project.formattedArea}</span>
                        <span className="arch-cinematic-area-desc">Residential Villa Commission</span>
                      </div>

                      <div className="arch-cinematic-specs-grid">
                        <div className="arch-cinematic-spec-unit">
                          <span className="arch-spec-key">CONFIGURATION</span>
                          <span className="arch-spec-val">{project.configuration}</span>
                        </div>
                        <div className="arch-cinematic-spec-unit">
                          <span className="arch-spec-key">LOCATION</span>
                          <span className="arch-spec-val">{project.locationLocality}, {project.locationCity}</span>
                        </div>
                        <div className="arch-cinematic-spec-unit">
                          <span className="arch-spec-key">CLIENT</span>
                          <span className="arch-spec-val">{project.client}</span>
                        </div>
                        <div className="arch-cinematic-spec-unit">
                          <span className="arch-spec-key">PROPERTY TYPE</span>
                          <span className="arch-spec-val">{project.propertyType}</span>
                        </div>
                      </div>

                      <div className="arch-cinematic-cta-box">
                        <button
                          type="button"
                          className="arch-consult-btn-solid"
                          onClick={() => openInquiry(`Commission Inquiry: ${project.name} (${project.locationCity})`)}
                        >
                          <span>DISCUSS THIS SCALE</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {/* Secondary Gallery Carousel */}
                    <div className="arch-cinematic-thumbs-row">
                      {project.allImages.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`arch-cinematic-thumb-card ${i === activeIndex ? 'active' : ''}`}
                          onClick={() => handleSelectImage(project.id, i)}
                          aria-label={`View photo ${i + 1}: ${img.caption}`}
                        >
                          <img src={img.src} alt="" className="arch-cinematic-thumb-img" loading="lazy" />
                          <span className="arch-cinematic-thumb-text">{img.caption}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    LAYOUT VARIANT 04: Asymmetric Image Composition
                    ------------------------------------------------------------- */}
                {project.layoutType === 'asymmetric' && (
                  <div className="arch-asymmetric-composition arch-showcase-fade-in">
                    <div className="arch-asym-main-row">
                      {/* Dominant Photograph */}
                      <div 
                        className="arch-asym-dominant-frame"
                        onClick={() => openLightbox(project, 0)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(project, 0); }}
                        aria-label={`Open full-screen image viewer for ${project.name} - Primary Photograph`}
                      >
                        <img 
                          src={project.allImages[0].src} 
                          alt={project.allImages[0].alt} 
                          className="arch-asym-dominant-img"
                          loading="lazy"
                        />
                        <div className="arch-canvas-caption-bar">
                          <span className="arch-canvas-caption">{project.allImages[0].caption}</span>
                          <span className="arch-canvas-zoom-hint">
                            <Maximize2 size={14} aria-hidden="true" />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>

                      {/* Supporting Asymmetric Visual Column */}
                      <div className="arch-asym-supporting-col">
                        {project.allImages.slice(1, 3).map((subImg, subI) => (
                          <div 
                            key={subI} 
                            className="arch-asym-sub-frame"
                            onClick={() => openLightbox(project, subI + 1)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(project, subI + 1); }}
                            aria-label={`Expand photo: ${subImg.caption}`}
                          >
                            <img src={subImg.src} alt={subImg.alt} className="arch-asym-sub-img" loading="lazy" />
                            <span className="arch-asym-sub-caption">{subImg.caption}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integrated Specification Footprint */}
                    <div className="arch-asym-specs-footer">
                      <div className="arch-area-callout">
                        <span className="arch-area-figure">{project.formattedArea}</span>
                        <p className="arch-area-tagline">
                          An individually commissioned {project.configuration.toLowerCase()} residence nestled in {project.locationLocality}.
                        </p>
                      </div>

                      <div className="arch-specs-card">
                        <h4 className="arch-specs-card-title">ARCHITECTURAL SPECIFICATIONS</h4>
                        <dl className="arch-specs-table">
                          {project.specifications.map((spec, i) => (
                            <div key={i} className="arch-specs-row">
                              <dt className="arch-spec-key">{spec.label}</dt>
                              <dd className="arch-spec-val">{spec.value}</dd>
                            </div>
                          ))}
                          <div className="arch-specs-row">
                            <dt className="arch-spec-key">Project Area</dt>
                            <dd className="arch-spec-val">{project.formattedArea}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="arch-cta-wrap">
                        <button
                          type="button"
                          className="arch-consult-btn"
                          onClick={() => openInquiry(`Commission Inquiry: ${project.name} (${project.locationCity})`)}
                        >
                          <span>CONSULT FOR THIS LAYOUT</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* ====================================================================
          6. MATERIALS AND FINISHES SECTION (Editorial Material Catalogue)
          ==================================================================== */}
      <section className="arch-materials-section" aria-labelledby="materials-section-heading">
        <div className="arch-showcase-container">
          <header className="arch-materials-header arch-showcase-fade-in">
            <span className="arch-eyebrow">STUDIO MATERIAL SPECIFICATIONS</span>
            <h3 id="materials-section-heading" className="arch-editorial-heading">
              Materials. Craftsmanship. Detail.
            </h3>
            <p className="arch-materials-subtitle">
              A closer look at the materials and finishes that define the spaces.
            </p>
          </header>

          <div className="arch-materials-grid">
            {MATERIAL_SPECIFICATIONS.map((cat) => (
              <div key={cat.id} className="arch-materials-card">
                <div className="arch-mat-card-header">
                  <span className="arch-mat-num">{cat.number}</span>
                  <h4 className="arch-mat-title">{cat.title}</h4>
                </div>
                <p className="arch-mat-subtitle">{cat.subtitle}</p>

                <div className="arch-mat-block">
                  <span className="arch-mat-field-label">MATERIALS SPECIFIED</span>
                  <ul className="arch-mat-list">
                    {cat.materials.map((m, i) => (
                      <li key={i} className="arch-mat-item">{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="arch-mat-block">
                  <span className="arch-mat-field-label">PRIMARY BRAND PARTNERS</span>
                  <div className="arch-mat-brands-wrap">
                    {cat.brands.map((b, i) => (
                      <span key={i} className="arch-brand-pill">{b}</span>
                    ))}
                  </div>
                </div>

                {cat.note && (
                  <p className="arch-mat-note">{cat.note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="arch-materials-footnote arch-showcase-fade-in">
            <p>
              * Note: These represent verified material standards and trusted brand partners from the Mitjen studio portfolio. Individual material specifications and finishes are specifically curated for each residential commission.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CLOSING SECTION CTA
          ==================================================================== */}
      <section className="arch-showcase-cta" aria-labelledby="cta-heading">
        <div className="arch-showcase-container">
          <div className="arch-cta-inner arch-showcase-fade-in">
            <span className="arch-eyebrow">BEGIN YOUR COMMISSION</span>
            <h3 id="cta-heading" className="arch-cta-heading">
              Every Space Has a Story. Let's Create Yours.
            </h3>
            <p className="arch-cta-text">
              From the first concept to the final detail, let's create a space that reflects the way you live.
            </p>
            <div className="arch-cta-action">
              <button
                type="button"
                className="arch-cta-primary-btn"
                onClick={() => openInquiry('Selected Work — Editorial Showcase CTA')}
              >
                <span>DISCUSS YOUR PROJECT</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FULL-SCREEN IMAGE VIEWING LIGHTBOX MODAL
          ==================================================================== */}
      {lightboxState.isOpen && lightboxState.project && (
        <div 
          className="arch-lightbox-overlay" 
          role="dialog" 
          aria-modal="true" 
          aria-label={`Photo viewer: ${lightboxState.project.name}`}
        >
          <div className="arch-lightbox-backdrop" onClick={closeLightbox} aria-hidden="true" />
          
          <div className="arch-lightbox-dialog">
            {/* Top Bar: Title & Controls */}
            <div className="arch-lightbox-top-bar">
              <div className="arch-lightbox-meta">
                <span className="arch-lightbox-project-name">{lightboxState.project.name}</span>
                <span className="arch-lightbox-sep">•</span>
                <span className="arch-lightbox-counter">
                  {String(lightboxState.currentIndex + 1).padStart(2, '0')} / {String(lightboxState.project.allImages.length).padStart(2, '0')}
                </span>
              </div>
              
              <button 
                type="button" 
                className="arch-lightbox-close-btn" 
                onClick={closeLightbox}
                aria-label="Close image viewer"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Main Stage */}
            <div className="arch-lightbox-stage">
              <button
                type="button"
                className="arch-lightbox-nav-btn arch-nav-prev"
                onClick={() => {
                  setLightboxState((prev) => {
                    if (!prev.project) return prev;
                    const prevIdx = (prev.currentIndex - 1 + prev.project.allImages.length) % prev.project.allImages.length;
                    return { ...prev, currentIndex: prevIdx };
                  });
                }}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={28} aria-hidden="true" />
              </button>

              <div className="arch-lightbox-img-wrap">
                <img
                  src={lightboxState.project.allImages[lightboxState.currentIndex].src}
                  alt={lightboxState.project.allImages[lightboxState.currentIndex].alt}
                  className="arch-lightbox-img"
                />
              </div>

              <button
                type="button"
                className="arch-lightbox-nav-btn arch-nav-next"
                onClick={() => {
                  setLightboxState((prev) => {
                    if (!prev.project) return prev;
                    const nextIdx = (prev.currentIndex + 1) % prev.project.allImages.length;
                    return { ...prev, currentIndex: nextIdx };
                  });
                }}
                aria-label="Next photograph"
              >
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="arch-lightbox-bottom-bar">
              <p className="arch-lightbox-caption">
                {lightboxState.project.allImages[lightboxState.currentIndex].caption}
                {lightboxState.project.allImages[lightboxState.currentIndex].space && (
                  <span className="arch-lightbox-space-tag">
                    ({lightboxState.project.allImages[lightboxState.currentIndex].space})
                  </span>
                )}
              </p>
              <span className="arch-lightbox-hint">Use ← and → arrow keys to navigate • ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArchitecturalProjectShowcase;

