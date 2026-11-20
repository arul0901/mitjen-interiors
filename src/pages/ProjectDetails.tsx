import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getEditorialProjectById,
  getProjectSiblings,
  EDITORIAL_PROJECTS,
  GalleryPhoto,
} from '../data/editorialProjectsData';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import './ProjectDetails.css';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find project by ID or fallback to the first project
  const project = id ? getEditorialProjectById(id) : EDITORIAL_PROJECTS[0];

  // If project not found, redirect to projects listing
  useEffect(() => {
    if (!project) {
      navigate('/projects', { replace: true });
    } else {
      document.title = `${project.title} — Mitjen Interior Architecture`;
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [project, navigate]);

  // Lightbox modal state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    currentIndex: number;
  }>({
    isOpen: false,
    currentIndex: 0,
  });

  const openLightbox = (index: number) => {
    setLightboxState({ isOpen: true, currentIndex: index });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxState.isOpen || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setLightboxState((prev) => ({
          ...prev,
          currentIndex: (prev.currentIndex + 1) % project.gallery.length,
        }));
      } else if (e.key === 'ArrowLeft') {
        setLightboxState((prev) => ({
          ...prev,
          currentIndex:
            (prev.currentIndex - 1 + project.gallery.length) % project.gallery.length,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, project, closeLightbox]);

  if (!project) return null;

  const { prev, next } = getProjectSiblings(project.id);

  return (
    <main className="editorial-details-page">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP BREADCRUMB & RETURN NAVIGATION                         */}
      {/* ------------------------------------------------------------- */}
      <nav className="editorial-details-top-bar" aria-label="Project Navigation">
        <div className="editorial-details-container">
          <Link to="/projects" className="editorial-back-link">
            <ArrowLeft size={16} strokeWidth={2} />
            <span>All Projects</span>
          </Link>
          <div className="editorial-top-category-indicator">
            <span>{project.category}</span>
            <span className="editorial-divider">/</span>
            <span>{project.city}</span>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------- */}
      {/* 2. PROJECT HERO TITLE & METADATA BANNER                       */}
      {/* ------------------------------------------------------------- */}
      <header className="editorial-hero-header">
        <div className="editorial-details-container">
          <div className="editorial-hero-meta-kicker">
            <span className="editorial-project-number">{project.number}</span>
            <span className="editorial-meta-separator">—</span>
            <span className="editorial-meta-tag">{project.category} Architecture</span>
            <span className="editorial-meta-separator">·</span>
            <span className="editorial-meta-tag">{project.location}</span>
          </div>

          <h1 className="editorial-hero-title">{project.title}</h1>

          <div className="editorial-key-metrics-grid">
            <div className="editorial-metric-item">
              <span className="editorial-metric-label">Location</span>
              <span className="editorial-metric-value">{project.location}</span>
            </div>
            <div className="editorial-metric-item">
              <span className="editorial-metric-label">Carpet Area</span>
              <span className="editorial-metric-value">{project.area}</span>
            </div>
            <div className="editorial-metric-item">
              <span className="editorial-metric-label">Year</span>
              <span className="editorial-metric-value">{project.year}</span>
            </div>
            <div className="editorial-metric-item">
              <span className="editorial-metric-label">Typology</span>
              <span className="editorial-metric-value">{project.projectType}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 3. IMMERSIVE HERO PHOTOGRAPH                                  */}
      {/* ------------------------------------------------------------- */}
      <section className="editorial-main-hero-image-section">
        <div className="editorial-hero-media-wrapper">
          <img
            src={project.coverImage}
            alt={project.title}
            className="editorial-hero-image"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. EDITORIAL NARRATIVE & SPECIFICATIONS                       */}
      {/* ------------------------------------------------------------- */}
      <section className="editorial-narrative-section">
        <div className="editorial-details-container">
          <div className="editorial-narrative-grid">
            {/* Left: Design Philosophy & Narrative */}
            <div className="editorial-narrative-content">
              <p className="editorial-lead-quote">
                &ldquo;{project.quote}&rdquo;
              </p>
              <div className="editorial-body-prose">
                <p>{project.description}</p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="editorial-highlights-block">
                  <h3 className="editorial-subheading">Design & Craftsmanship Highlights</h3>
                  <ul className="editorial-highlights-list">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="editorial-highlight-item">
                        <span className="editorial-highlight-bullet" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Architectural Specifications Table */}
            <aside className="editorial-specifications-aside" aria-label="Architectural Specifications">
              <div className="editorial-specs-card">
                <h3 className="editorial-specs-title">Architectural Specifications</h3>
                <dl className="editorial-specs-dl">
                  {project.specifications.map((spec, idx) => (
                    <div key={idx} className="editorial-spec-row">
                      <dt className="editorial-spec-dt">{spec.label}</dt>
                      <dd className="editorial-spec-dd">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. VISUALLY RICH MULTI-ANGLE IMAGE GALLERY                    */}
      {/* ------------------------------------------------------------- */}
      <section className="editorial-gallery-section" aria-label="Project Visual Gallery">
        <div className="editorial-details-container">
          <div className="editorial-gallery-header">
            <span className="editorial-gallery-kicker">Spatial Exploration</span>
            <h2 className="editorial-gallery-heading">Visual Documentation</h2>
          </div>

          <div className="editorial-gallery-grid">
            {project.gallery.map((photo: GalleryPhoto, idx: number) => {
              const isWide = photo.aspectRatio === 'wide';
              const isPortrait = photo.aspectRatio === 'portrait';

              let itemSpan = 'gallery-span-standard';
              if (isWide) itemSpan = 'gallery-span-wide';
              else if (isPortrait) itemSpan = 'gallery-span-portrait';

              return (
                <figure
                  key={idx}
                  className={`editorial-gallery-figure ${itemSpan}`}
                  onClick={() => openLightbox(idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Enlarge photo of ${photo.space}: ${photo.caption}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(idx);
                    }
                  }}
                >
                  <div className="editorial-gallery-image-box">
                    <img
                      src={photo.url}
                      alt={`${project.title} - ${photo.space}`}
                      loading="lazy"
                      className="editorial-gallery-img"
                    />
                    <div className="editorial-gallery-zoom-badge" aria-hidden="true">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                  <figcaption className="editorial-gallery-caption">
                    <span className="editorial-gallery-space">{photo.space}</span>
                    <span className="editorial-gallery-note">{photo.caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. PREVIOUS / NEXT PROJECT PAGINATION FOOTER                  */}
      {/* ------------------------------------------------------------- */}
      <footer className="editorial-pagination-footer" aria-label="Browse other projects">
        <div className="editorial-details-container">
          <div className="editorial-pagination-grid">
            {/* Previous Project */}
            <Link
              to={`/projects/${prev.slug}`}
              className="editorial-pagination-card prev-card"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="editorial-pagination-meta">
                <span className="editorial-pagination-dir">
                  <ArrowLeft size={16} /> Previous Project
                </span>
                <span className="editorial-pagination-title">{prev.title}</span>
                <span className="editorial-pagination-category">{prev.category}</span>
              </div>
              <div className="editorial-pagination-thumb-wrapper">
                <img
                  src={prev.coverImage}
                  alt={prev.title}
                  className="editorial-pagination-thumb"
                />
              </div>
            </Link>

            {/* Next Project */}
            <Link
              to={`/projects/${next.slug}`}
              className="editorial-pagination-card next-card"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="editorial-pagination-thumb-wrapper">
                <img
                  src={next.coverImage}
                  alt={next.title}
                  className="editorial-pagination-thumb"
                />
              </div>
              <div className="editorial-pagination-meta">
                <span className="editorial-pagination-dir">
                  Next Project <ArrowRight size={16} />
                </span>
                <span className="editorial-pagination-title">{next.title}</span>
                <span className="editorial-pagination-category">{next.category}</span>
              </div>
            </Link>
          </div>

          <div className="editorial-bottom-return">
            <Link to="/projects" className="editorial-return-btn">
              <span>Return to All Projects</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* ------------------------------------------------------------- */}
      {/* 7. LIGHTBOX MODAL                                             */}
      {/* ------------------------------------------------------------- */}
      {lightboxState.isOpen && (
        <div
          className="editorial-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution image lightbox"
          onClick={closeLightbox}
        >
          <button
            className="editorial-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <button
            className="editorial-lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxState((prev) => ({
                ...prev,
                currentIndex:
                  (prev.currentIndex - 1 + project.gallery.length) % project.gallery.length,
              }));
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="editorial-lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxState((prev) => ({
                ...prev,
                currentIndex: (prev.currentIndex + 1) % project.gallery.length,
              }));
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <div
            className="editorial-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.gallery[lightboxState.currentIndex].url}
              alt={project.gallery[lightboxState.currentIndex].space}
              className="editorial-lightbox-img"
            />
            <div className="editorial-lightbox-meta">
              <span className="editorial-lightbox-space">
                {project.gallery[lightboxState.currentIndex].space}
              </span>
              <p className="editorial-lightbox-caption">
                {project.gallery[lightboxState.currentIndex].caption}
              </p>
              <span className="editorial-lightbox-counter">
                {lightboxState.currentIndex + 1} / {project.gallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectDetails;
