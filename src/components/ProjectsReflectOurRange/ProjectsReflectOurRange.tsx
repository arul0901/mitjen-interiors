import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../../context/useInquiry';
import './ProjectsReflectOurRange.css';

interface RangeProject {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  expertiseHighlights: string[];
  image: string;
  slug: string;
  shortLabel: string;
}

const RANGE_PROJECTS: RangeProject[] = [
  {
    id: 'modular-kitchen',
    num: '01',
    title: 'MODULAR KITCHENS & MILLWORK',
    subtitle: 'German & Italian Precision Engineering',
    description:
      'Turnkey culinary workspaces engineered around ergonomic workflow zones, high-durability BWP marine-grade carcasses, anti-scratch quartz worktops, and multi-layer Italian PU coatings with zero-tolerance alignment.',
    expertiseHighlights: [
      'Multi-layer Italian PU coatings on bespoke cabinetry',
      'Concealed soft-close Blum tandem runners & hinges',
      'Engineered BWP marine-grade plywood (10-Yr Warranty)',
      'Integrated task lighting with hidden dimmer profiles',
    ],
    image: '/assets/mitijen/kitchen.jpeg',
    slug: '/services',
    shortLabel: 'Kitchen',
  },
  {
    id: 'corporate-workspaces',
    num: '02',
    title: 'CORPORATE & EXECUTIVE OFFICES',
    subtitle: 'High-Performance Acoustic Environments',
    description:
      'Corporate headquarters, boardrooms, and collaborative studios crafted with acoustic timber wall baffling, cable-free conference integration, circadian task illumination, and executive finishings.',
    expertiseHighlights: [
      'Acoustic wall baffling & speech privacy decoupling',
      'Discreet cable-free smart conference AV integration',
      'Ergonomic zoning for focused & collaborative work',
      'American Walnut & architectural bronze transitions',
    ],
    image: '/images/Corporate/Corporate1.jpeg',
    slug: '/services/corporate-interior-design',
    shortLabel: 'Corporate',
  },
  {
    id: 'theatre-media',
    num: '03',
    title: 'THEATRES & MEDIA ROOMS',
    subtitle: 'Immersive Acoustics & Calibrated Illumination',
    description:
      'Dedicated private screening environments engineered with calibrated multi-channel sound decoupling, acoustic suede wall wrap assemblies, stepped ambient cove lighting, and bespoke luxury seating.',
    expertiseHighlights: [
      'Acoustic fabric baffling & reverberation control',
      'Architectural stepped cove & scene dimmer automation',
      'Optimal sightline geometry & motorized recliner layout',
      'Concealed sub-bass decoupling & projector niche',
    ],
    image: '/assets/mitijen/commercial2.jpeg',
    slug: '/services/commercial-interior-design',
    shortLabel: 'Theatre',
  },
  {
    id: 'residential-bedroom',
    num: '04',
    title: 'RESIDENTIAL & BEDROOM SUITES',
    subtitle: 'Diurnal Spatial Planning & Restorative Sanctuary',
    description:
      'Serene private sanctuaries shaped by natural diurnal light, custom walk-in dressing cabinetry, hand-buffed fluted timber headboards, and circadian illumination for deep relaxation and living permanence.',
    expertiseHighlights: [
      'Tailored walk-in dressing suites with sensor LED lighting',
      'Hand-buffed fluted joinery with acoustic sound dampening',
      'Circadian lighting scenes for natural diurnal rhythm',
      'Multi-generational solid timber & honed stone craft',
    ],
    image: '/images/Residential/Residential5.jpeg',
    slug: '/services/residential-interior-design',
    shortLabel: 'Residential',
  },
];

export const ProjectsReflectOurRange: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(RANGE_PROJECTS[0].id);
  const { openInquiry } = useInquiry();

  const handleEnquire = (projectName: string) => {
    openInquiry();
  };

  const currentProject = RANGE_PROJECTS.find((p) => p.id === activeId) || RANGE_PROJECTS[0];

  return (
    <section
      className="renova-transformations"
      id="transformations"
      aria-label="A Glimpse Into Our Architectural Expertise"
    >
      <div className="renova-trans-container">
        {/* ==============================================================
            DESKTOP VIEW: HORIZONTAL EXPANDING ACCORDION
            ============================================================== */}
        <div className="renova-desktop-view">
          <div className="renova-trans-header">
            <div>
              <span className="renova-eyebrow-text">
                <span className="renova-eyebrow-bullet" />
                OUR ARCHITECTURAL EXPERTISE
              </span>
              <h2 className="renova-trans-title">PROJECTS THAT REFLECT OUR RANGE.</h2>
            </div>
            <p className="renova-trans-subtitle">
              From private residential sanctuaries to high-performance corporate environments and turnkey millwork, our multidisciplinary expertise transforms architectural vision into living permanence.
            </p>
          </div>

          <div
            className="renova-expand-accordion"
            role="tablist"
            aria-label="Architectural Expertise and Projects Showcase"
          >
            {RANGE_PROJECTS.map((proj, idx) => {
              const isActive = activeId === proj.id;
              return (
                <div
                  key={proj.id}
                  id={`acc-panel-${proj.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`acc-content-${proj.id}`}
                  tabIndex={0}
                  className={`renova-acc-card ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveId(proj.id)}
                  onMouseEnter={() => setActiveId(proj.id)}
                  onFocus={() => setActiveId(proj.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(proj.id);
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                      e.preventDefault();
                      const next = RANGE_PROJECTS[(idx + 1) % RANGE_PROJECTS.length];
                      setActiveId(next.id);
                      document.getElementById(`acc-panel-${next.id}`)?.focus();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prev =
                        RANGE_PROJECTS[(idx - 1 + RANGE_PROJECTS.length) % RANGE_PROJECTS.length];
                      setActiveId(prev.id);
                      document.getElementById(`acc-panel-${prev.id}`)?.focus();
                    }
                  }}
                >
                  <div className="renova-acc-accent-line" />
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="renova-acc-bg"
                    loading="lazy"
                  />
                  <div className="renova-acc-tint" />
                  <div className="renova-acc-vignette" />

                  {/* Collapsed State Bar (shown when not active) */}
                  <div className="renova-acc-collapsed-bar" aria-hidden={isActive}>
                    <span className="renova-acc-collapsed-num">{proj.num}</span>
                    <span className="renova-acc-collapsed-title">{proj.title}</span>
                    <span className="renova-acc-mobile-cue" aria-hidden="true">+</span>
                  </div>

                  {/* Expanded Content Details */}
                  <div
                    id={`acc-content-${proj.id}`}
                    className="renova-acc-content"
                    aria-hidden={!isActive}
                  >
                    <div className="renova-acc-kicker-wrap">
                      <span className="renova-acc-num">{proj.num}</span>
                      <span className="renova-acc-kicker-dot" />
                      <span className="renova-acc-kicker-tag">{proj.subtitle}</span>
                    </div>

                    <h3 className="renova-acc-heading">{proj.title}</h3>
                    <p className="renova-acc-desc">{proj.description}</p>

                    {/* Architectural Highlights / Expertise Chips */}
                    <div className="renova-acc-highlights">
                      {proj.expertiseHighlights.map((hl, hlIdx) => (
                        <span key={hlIdx} className="renova-acc-chip">
                          <span className="renova-acc-chip-icon">✓</span>
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>

                    <div className="renova-acc-actions">
                      <button
                        type="button"
                        className="renova-acc-enquire-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(proj.title);
                        }}
                      >
                        <span>ENQUIRE NOW</span>
                      </button>

                      <Link
                        to={proj.slug}
                        className="renova-acc-spec-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Explore Expertise</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="renova-trans-footer-cta">
            <Link to="/projects" className="renova-btn-outline">
              <span>EXPLORE ALL PROJECTS</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* ==============================================================
            MOBILE VIEW: FEATURED PREVIEW CARD + THUMBNAIL SELECTOR
            ============================================================== */}
        <div className="renova-mobile-view">
          <div className="renova-mob-header">
            <span className="renova-mob-eyebrow">
              <span className="renova-mob-bullet" />
              OUR ARCHITECTURAL EXPERTISE
            </span>
            <h2 className="renova-mob-title">PROJECTS THAT REFLECT OUR RANGE.</h2>
            <p className="renova-mob-subtitle">Tap a discipline to view our craftsmanship.</p>
          </div>

          <div className="renova-mob-featured-card">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="renova-mob-featured-img"
              key={currentProject.id}
              loading="lazy"
            />
            <div className="renova-mob-featured-vignette" />
          </div>

          <div className="renova-mob-info-row">
            <div className="renova-mob-info-text">
              <h3 className="renova-mob-project-title">{currentProject.title}</h3>
              <p className="renova-mob-project-desc">{currentProject.subtitle}</p>
            </div>
            <button
              type="button"
              className="renova-mob-enquire-btn"
              onClick={() => handleEnquire(currentProject.title)}
            >
              Enquire
            </button>
          </div>

          <p className="renova-mob-full-desc">{currentProject.description}</p>

          <div className="renova-mob-highlights">
            {currentProject.expertiseHighlights.map((hl, hlIdx) => (
              <div key={hlIdx} className="renova-mob-chip">
                <span className="renova-mob-chip-check">✓</span>
                <span>{hl}</span>
              </div>
            ))}
          </div>

          <div
            className="renova-mob-thumbnails-grid"
            role="tablist"
            aria-label="Select project category"
          >
            {RANGE_PROJECTS.map((proj) => {
              const isSelected = activeId === proj.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`renova-mob-thumb-btn ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveId(proj.id)}
                >
                  <div className="renova-mob-thumb-img-wrap">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="renova-mob-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="renova-mob-thumb-label">{proj.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <Link to="/projects" className="renova-mob-view-all-btn">
            View all 24 projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsReflectOurRange;
