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
    id: 'prithvi-residence',
    num: '01',
    title: 'PRITHVI RESIDENCE',
    subtitle: 'Royal Nesto · Neelambur, Coimbatore',
    description:
      'A bespoke Coimbatore residence crafted with Green ply & Century ply woodwork, IVAS & Kridha laminates, Saint Gobain gypsum ceilings, and Philips & Havells architectural lighting.',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
    slug: '/projects/prithvi-residence',
    shortLabel: 'Prithvi',
  },
  {
    id: 'sampath-villa',
    num: '02',
    title: 'SAMPATH VILLA',
    subtitle: 'Nehru Nagar West · Kalapatti, Coimbatore',
    description:
      'A spacious Kalapatti residence combining Tarkett & Armstrong wooden flooring, Vox & PVC fluted ceilings, high-gloss acrylic joinery, and layered LED strip illumination.',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
    slug: '/projects/sampath-villa',
    shortLabel: 'Sampath',
  },
  {
    id: 'mr-mahesh-villa',
    num: '03',
    title: 'MR. MAHESH – PILOT',
    subtitle: 'Krishna Raja (KR) Puram · Bangalore',
    description:
      'A contemporary Bangalore residence executed with Duracare & Armstrong flooring, aluminum & gypsum partitions, Century & Advance laminates, and Legrand & Philips lighting.',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential2.jpeg',
    slug: '/projects/mr-mahesh-villa',
    shortLabel: 'Mahesh',
  },
  {
    id: 'deepak-residence',
    num: '04',
    title: 'DEEPAK RESIDENCE',
    subtitle: 'Saibaba Colony · Coimbatore',
    description:
      'A tailored Saibaba Colony home featuring Kit ply & Green ply custom cabinetry, high-gloss & acrylic surfaces, Saint Gobain acoustic ceilings, and concealed spot lighting.',
    image: '/images/projects/image4.jpg',
    slug: '/projects/deepak-residence',
    shortLabel: 'Deepak',
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
              Executed residences across Coimbatore and Bangalore—crafted with certified plywoods, branded laminates, acoustic ceilings, and layered architectural lighting.
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
