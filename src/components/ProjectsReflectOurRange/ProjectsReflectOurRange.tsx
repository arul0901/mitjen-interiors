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
  image: string;
  slug: string;
  shortLabel: string;
}

const RANGE_PROJECTS: RangeProject[] = [
  {
    id: 'modular-kitchen',
    num: '01',
    title: 'MODULAR KITCHEN',
    subtitle: 'Precision in Every Detail',
    description:
      'A carefully crafted kitchen where storage, fittings and finishes come together with clean lines, accurate proportions and smooth functionality.',
    image: '/assets/mitijen/kitchen.jpeg',
    slug: '/projects',
    shortLabel: 'Kitchen',
  },
  {
    id: 'office-conference',
    num: '02',
    title: 'OFFICE & CONFERENCE HALL',
    subtitle: 'Designed for a Professional Standard',
    description:
      'A refined workplace environment with considered layouts, precise detailing and a finish that reflects the quality of the business.',
    image: '/assets/mitijen/commercial4.jpeg',
    slug: '/projects',
    shortLabel: 'Corporate',
  },
  {
    id: 'theatre-media',
    num: '03',
    title: 'THEATRE & MEDIA ROOM',
    subtitle: 'Built Around the Experience',
    description:
      'A detailed entertainment setting where layout, lighting, finishes and custom elements come together to create an immersive environment.',
    image: '/assets/mitijen/commercial2.jpeg',
    slug: '/projects',
    shortLabel: 'Theatre',
  },
  {
    id: 'bedroom',
    num: '04',
    title: 'BEDROOM',
    subtitle: 'Crafted for Everyday Comfort',
    description:
      'A refined personal setting combining tailored storage, balanced finishes and carefully executed details for a calm and complete interior.',
    image: '/assets/mitijen/bedroom.jpeg',
    slug: '/projects',
    shortLabel: 'Residential',
  },
];

export const ProjectsReflectOurRange: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(RANGE_PROJECTS[0].id);
  const activeIdRef = React.useRef<string>(activeId);
  activeIdRef.current = activeId;
  const rafRef = React.useRef<number | null>(null);

  const { openInquiry } = useInquiry();

  const handleCardHover = React.useCallback((id: string) => {
    if (activeIdRef.current === id) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setActiveId(id);
    });
  }, []);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleEnquire = (projectName: string) => {
    openInquiry();
  };

  const currentProject = RANGE_PROJECTS.find((p) => p.id === activeId) || RANGE_PROJECTS[0];

  return (
    <section
      className="renova-transformations"
      id="transformations"
      aria-label="A Glimpse Into Our Work"
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
                A GLIMPSE INTO OUR WORK
              </span>
              <h2 className="renova-trans-title">PROJECTS THAT REFLECT OUR RANGE.</h2>
            </div>
            <p className="renova-trans-subtitle">
              From personal interiors to professional environments, our portfolio brings together work shaped by different requirements, settings and ideas.
            </p>
          </div>

          <div
            className="renova-expand-accordion"
            role="tablist"
            aria-label="Projects Reflecting Our Range Showcase"
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
                  onClick={() => handleCardHover(proj.id)}
                  onMouseEnter={() => handleCardHover(proj.id)}
                  onFocus={() => handleCardHover(proj.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardHover(proj.id);
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                      e.preventDefault();
                      const next = RANGE_PROJECTS[(idx + 1) % RANGE_PROJECTS.length];
                      handleCardHover(next.id);
                      document.getElementById(`acc-panel-${next.id}`)?.focus();
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prev =
                        RANGE_PROJECTS[(idx - 1 + RANGE_PROJECTS.length) % RANGE_PROJECTS.length];
                      handleCardHover(prev.id);
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
                        <span>Explore Projects</span>
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
              A GLIMPSE INTO OUR WORK
            </span>
            <h2 className="renova-mob-title">PROJECTS THAT REFLECT OUR RANGE.</h2>
            <p className="renova-mob-subtitle">Tap a project to view it.</p>
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
