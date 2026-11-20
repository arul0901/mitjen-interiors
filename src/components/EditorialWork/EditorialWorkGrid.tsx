import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EDITORIAL_PROJECTS,
  EditorialProject,
  ProjectCategory,
} from '../../data/editorialProjectsData';
import './EditorialWorkGrid.css';

type FilterCategory = 'All Projects' | ProjectCategory;

const CATEGORIES: FilterCategory[] = [
  'All Projects',
  'Residential',
  'Commercial',
  'Corporate',
];

interface EditorialWorkGridProps {
  initialCategory?: FilterCategory;
}

export const EditorialWorkGrid: React.FC<EditorialWorkGridProps> = ({
  initialCategory = 'All Projects',
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const navigate = useNavigate();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Map<FilterCategory, HTMLButtonElement>>(new Map());

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') {
      return EDITORIAL_PROJECTS;
    }
    return EDITORIAL_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Compute count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      'All Projects': EDITORIAL_PROJECTS.length,
      Residential: EDITORIAL_PROJECTS.filter((p) => p.category === 'Residential').length,
      Commercial: EDITORIAL_PROJECTS.filter((p) => p.category === 'Commercial').length,
      Corporate: EDITORIAL_PROJECTS.filter((p) => p.category === 'Corporate').length,
    };
    return counts;
  }, []);

  // Update animated indicator line position
  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeCategory);
    const indicator = navIndicatorRef.current;
    const container = navContainerRef.current;

    if (activeButton && indicator && container) {
      const btnRect = activeButton.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      const left = btnRect.left - contRect.left + container.scrollLeft;
      const width = btnRect.width;

      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = '1';
    }
  }, [activeCategory]);

  // Handle category switch with smooth transition
  const handleCategoryChange = (category: FilterCategory) => {
    if (category === activeCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsTransitioning(false);
    }, 180);
  };

  // Handle click on a project card to open dedicated details
  const handleProjectClick = (project: EditorialProject) => {
    navigate(`/projects/${project.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="editorial-work-section" aria-label="Mitjen Architecture & Interior Design Portfolio">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP EDITORIAL CATEGORY NAVIGATION                          */}
      {/* Minimal, sophisticated typography navigation with active line */}
      {/* ------------------------------------------------------------- */}
      <header className="editorial-nav-header">
        <div className="editorial-nav-inner">
          <div className="editorial-category-nav-wrapper" ref={navContainerRef} role="tablist">
            <div className="editorial-category-nav">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    ref={(el) => {
                      if (el) buttonRefs.current.set(cat, el);
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="editorial-project-grid"
                    className={`editorial-nav-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    <span className="editorial-nav-label">{cat}</span>
                    <span className="editorial-nav-count">({categoryCounts[cat]})</span>
                  </button>
                );
              })}
              {/* Subtle sliding active line indicator */}
              <span className="editorial-nav-indicator" ref={navIndicatorRef} aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. EDITORIAL PROJECT IMAGE GRID                               */}
      {/* Asymmetric magazine-style rhythm with hover reveal of ONLY   */}
      {/* the project title.                                            */}
      {/* ------------------------------------------------------------- */}
      <div className="editorial-grid-container">
        <div
          id="editorial-project-grid"
          className={`editorial-project-grid ${isTransitioning ? 'is-animating-out' : 'is-animating-in'}`}
          role="region"
          aria-live="polite"
        >
          {filteredProjects.map((project, index) => {
            // Apply varied visual rhythm classes based on index & project specs
            const isWide = project.aspectRatio === 'wide' || project.aspectRatio === 'hero';
            const isTall = project.aspectRatio === 'portrait' || project.aspectRatio === 'tall';
            const isHero = project.aspectRatio === 'hero' || (index === 0 && activeCategory === 'All Projects');

            let spanClass = 'span-standard';
            if (isHero) spanClass = 'span-hero';
            else if (isWide) spanClass = 'span-wide';
            else if (isTall) spanClass = 'span-tall';

            return (
              <article
                key={project.id}
                className={`editorial-project-item ${spanClass}`}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => handleProjectClick(project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
              >
                <div className="editorial-image-wrapper">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="editorial-image"
                  />

                  {/* Clean, pure hover overlay: Reveals ONLY the project name */}
                  <div
                    className={`editorial-hover-overlay ${hoveredProjectId === project.id ? 'is-hovered' : ''}`}
                    aria-hidden="true"
                  >
                    <div className="editorial-title-container">
                      <h2 className="editorial-project-title-reveal">{project.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Mobile / Touch fallback caption (displays cleanly below the photograph without needing hover) */}
                <div className="editorial-mobile-caption" aria-hidden="true">
                  <span className="editorial-mobile-title">{project.title}</span>
                  <span className="editorial-mobile-category">{project.category}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EditorialWorkGrid;
