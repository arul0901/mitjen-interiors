import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ARCHITECTURAL_PROJECTS } from '../../data/showcaseProjects';
import { MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/ArchitecturalProjectPreview.css';

export const ArchitecturalProjectPreview: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Subtle GSAP scroll reveal
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const win = window as Window & { ScrollTrigger?: typeof ScrollTrigger; gsap?: typeof gsap };
    const activeGsap = win.gsap || gsap;
    const activeScrollTrigger = win.ScrollTrigger || ScrollTrigger;

    try {
      activeGsap.registerPlugin(activeScrollTrigger);
    } catch {}

    const ctx = activeGsap.context(() => {
      activeGsap.from('.arch-preview-intro-text', {
        scrollTrigger: {
          trigger: '.arch-preview-intro',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
      });

      const cards = rootRef.current?.querySelectorAll('.arch-preview-card');
      cards?.forEach((card, index) => {
        activeGsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          delay: (index % 2) * 0.12,
          ease: 'power2.out',
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={rootRef}
      id="selected-work-preview" 
      className="arch-preview-root" 
      aria-label="Selected Projects Preview"
    >
      <div className="arch-preview-container">
        {/* ====================================================================
            2. SECTION INTRODUCTION (Editorial Split Layout)
            ==================================================================== */}
        <div className="arch-preview-intro-wrap">
          <div className="arch-preview-intro">
            {/* Left Column: Editorial Typography */}
            <div className="arch-preview-intro-text">
              <span className="arch-preview-eyebrow">OUR SELECTED WORK</span>
              <h2 className="arch-preview-heading">
                Spaces Designed Around the Way You Live.
              </h2>
              <div className="arch-preview-rule" aria-hidden="true" />
              <p className="arch-preview-desc">
                Every project is an individual expression of lifestyle, architecture and craftsmanship. Explore a selection of residential spaces where thoughtful planning, carefully selected materials and refined detailing come together.
              </p>
            </div>

            {/* Right Column: Architectural Atmosphere Detail */}
            <div className="arch-preview-intro-media">
              <div className="arch-preview-media-frame">
                <img 
                  src="/images/Residential/Residential3.jpeg" 
                  alt="Architectural interior detail of residential vertical circulation" 
                  className="arch-preview-intro-img"
                  loading="lazy"
                />
                <div className="arch-preview-badge">
                  <span className="arch-preview-badge-num">04</span>
                  <span className="arch-preview-badge-label">Curated Commissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            CURATED PROJECT PREVIEWS GRID (4 Verified Residences)
            ==================================================================== */}
        <div className="arch-preview-grid">
          {ARCHITECTURAL_PROJECTS.map((project) => (
            <article key={project.id} className="arch-preview-card">
              <Link 
                to={`/projects#${project.id}`} 
                className="arch-preview-card-link"
                aria-label={`View full project details for ${project.name} (${project.client || ''})`}
              >
                {/* Visual Canvas Frame */}
                <div className="arch-preview-canvas-wrap">
                  <img 
                    src={project.heroImage.src} 
                    alt={project.heroImage.alt} 
                    className="arch-preview-canvas-img"
                    loading="lazy"
                  />
                  <div className="arch-preview-canvas-overlay">
                    <span className="arch-preview-hover-tag">
                      <span>VIEW DETAILED SPECIFICATIONS</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </div>
                  <span className="arch-preview-num-badge">{project.number}</span>
                </div>

                {/* Project Brief Info */}
                <div className="arch-preview-info">
                  <div className="arch-preview-meta-row">
                    <span className="arch-preview-client">
                      {project.client ? `Client: ${project.client}` : 'Private Commission'}
                    </span>
                    <span className="arch-preview-loc">
                      <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
                      <span>{project.locationLocality}, {project.locationCity}</span>
                    </span>
                  </div>

                  <h3 className="arch-preview-title">{project.name}</h3>

                  <div className="arch-preview-specs-strip">
                    <div className="arch-preview-spec-item">
                      <span className="arch-spec-label">TYPE</span>
                      <span className="arch-spec-val">{project.propertyType}</span>
                    </div>
                    <div className="arch-preview-spec-item">
                      <span className="arch-spec-label">LAYOUT</span>
                      <span className="arch-spec-val">{project.configuration}</span>
                    </div>
                    <div className="arch-preview-spec-item arch-item-area">
                      <span className="arch-spec-label">AREA</span>
                      <span className="arch-spec-val arch-spec-area">{project.formattedArea}</span>
                    </div>
                  </div>

                  <div className="arch-preview-action-row">
                    <span className="arch-preview-action-text">EXPLORE FULL DETAILS & GALLERY</span>
                    <ArrowRight size={14} className="arch-preview-arrow" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* ====================================================================
            FOOTER ACTION: View Full Portfolio & Material Catalogue
            ==================================================================== */}
        <div className="arch-preview-footer-action">
          <div className="arch-preview-footer-content">
            <span className="arch-preview-footer-tag">COMPREHENSIVE ARCHITECTURAL DOCUMENTATION</span>
            <h4 className="arch-preview-footer-heading">
              Explore Complete Specifications, Multiview Galleries &amp; Materials
            </h4>
            <p className="arch-preview-footer-sub">
              Delve into our complete architectural specifications, room-by-room interior galleries, and the studio’s material craftsmanship catalogue.
            </p>
          </div>
          <Link to="/projects" className="arch-preview-view-all-btn">
            <span>VIEW ALL PROJECTS &amp; MATERIALS</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalProjectPreview;

