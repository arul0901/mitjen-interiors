import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EDITORIAL_PROJECTS,
  EditorialProject,
  ProjectCategory,
} from '../../data/editorialProjectsData';
import { LayoutGrid, Grid3X3, Rows3, ArrowUp } from 'lucide-react';
import './EditorialWorkGrid.css';

type FilterCategory = 'All Projects' | ProjectCategory;
type GridMode = 'editorial' | 'three-col' | 'cinematic';

const CATEGORIES: FilterCategory[] = [
  'All Projects',
  'Residential',
  'Commercial',
  'Corporate',
];

interface EditorialWorkGridProps {
  initialCategory?: FilterCategory;
  initialGridMode?: GridMode;
}

export const EditorialWorkGrid: React.FC<EditorialWorkGridProps> = ({
  initialCategory = 'All Projects',
  initialGridMode = 'editorial',
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory);
  const [gridMode, setGridMode] = useState<GridMode>(initialGridMode);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isStickyVisible, setIsStickyVisible] = useState<boolean>(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const navigate = useNavigate();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Map<FilterCategory, HTMLButtonElement>>(new Map());

  // Scroll listener: Dock floating glass filter bar only after scrolling past the inline filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (navContainerRef.current) {
        const rect = navContainerRef.current.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 80);
      } else {
        setIsStickyVisible(window.scrollY > 220);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Handle grid mode change with smooth transition
  const handleGridModeChange = (mode: GridMode) => {
    if (mode === gridMode) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setGridMode(mode);
      setIsTransitioning(false);
    }, 150);
  };

  // Handle click on a project card to open dedicated details
  const handleProjectClick = (project: EditorialProject) => {
    navigate(`/projects/${project.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="editorial-work-section" aria-label="Mitjen Architecture & Interior Design Portfolio">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP EDITORIAL NAVIGATION & GRID TYPE SWITCHER              */}
      {/* ------------------------------------------------------------- */}
      <header className="editorial-nav-header">
        <div className="editorial-nav-inner">
          {/* Category Tabs */}
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

          {/* Top Grid Layout Switcher Controls: Minimal Icon-Only Mode */}
          <div className="editorial-grid-switcher" role="group" aria-label="Choose grid layout">
            <button
              type="button"
              className={`editorial-grid-mode-btn ${gridMode === 'editorial' ? 'is-active' : ''}`}
              onClick={() => handleGridModeChange('editorial')}
              title="Editorial Masonry Grid"
              aria-label="Editorial Masonry Grid"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              className={`editorial-grid-mode-btn ${gridMode === 'three-col' ? 'is-active' : ''}`}
              onClick={() => handleGridModeChange('three-col')}
              title="3-Column Architecture Grid"
              aria-label="3-Column Architecture Grid"
            >
              <Grid3X3 size={15} />
            </button>
            <button
              type="button"
              className={`editorial-grid-mode-btn ${gridMode === 'cinematic' ? 'is-active' : ''}`}
              onClick={() => handleGridModeChange('cinematic')}
              title="Cinematic Wide Grid"
              aria-label="Cinematic Wide Grid"
            >
              <Rows3 size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC PROJECT IMAGE GRID WITH STAGGERED FADE-UP          */}
      {/* 40ms stagger per card, seamless masonry & responsive modes     */}
      {/* ------------------------------------------------------------- */}
      <div className="editorial-grid-container">
        <div
          id="editorial-project-grid"
          key={`${activeCategory}-${gridMode}`}
          className={`editorial-project-grid mode-${gridMode} ${isTransitioning ? 'is-animating-out' : 'is-animating-in'}`}
          role="region"
          aria-live="polite"
        >
          {filteredProjects.map((project, index) => {
            return (
              <article
                key={project.id}
                className={`editorial-project-item item-aspect-${project.aspectRatio}`}
                style={{
                  animationDelay: `${Math.min(index * 40, 480)}ms`,
                }}
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

                  {/* Clean hover overlay: Reveals ONLY the project name */}
                  <div
                    className={`editorial-hover-overlay ${hoveredProjectId === project.id ? 'is-hovered' : ''}`}
                    aria-hidden="true"
                  >
                    <div className="editorial-title-container">
                      <h2 className="editorial-project-title-reveal">{project.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Mobile / Touch fallback caption */}
                <div className="editorial-mobile-caption" aria-hidden="true">
                  <span className="editorial-mobile-title">{project.title}</span>
                  <span className="editorial-mobile-category">{project.category}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. STICKY FLOATING GLASS FILTER DOCK (SCROLL-TRIGGERED)       */}
      {/* Compact glassmorphic pill bar (backdrop-filter: blur(16px))   */}
      {/* Docks smoothly when user scrolls down through the portfolio   */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`editorial-floating-dock ${isStickyVisible ? 'is-visible' : ''}`}
        aria-label="Floating Portfolio Navigation Dock"
        role="toolbar"
      >
        <div className="editorial-floating-dock-inner">
          {/* Floating Category Pills */}
          <div className="editorial-floating-categories">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`editorial-floating-cat-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={isActive}
                >
                  <span className="floating-cat-label">{cat === 'All Projects' ? 'All' : cat}</span>
                  <span className="floating-cat-count">({categoryCounts[cat]})</span>
                </button>
              );
            })}
          </div>

          <span className="editorial-floating-divider" aria-hidden="true" />

          {/* Quick Grid Mode Switcher */}
          <div className="editorial-floating-grid-modes" role="group" aria-label="Grid layout toggle">
            <button
              type="button"
              className={`editorial-floating-mode-btn ${gridMode === 'editorial' ? 'is-active' : ''}`}
              onClick={() => handleGridModeChange('editorial')}
              title="Editorial Masonry Grid"
              aria-label="Editorial Masonry Grid"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              className={`editorial-floating-mode-btn ${gridMode === 'three-col' ? 'is-active' : ''}`}
              onClick={() => handleGridModeChange('three-col')}
              title="3-Column Architecture Grid"
              aria-label="3-Column Architecture Grid"
            >
              <Grid3X3 size={15} />
            </button>
            <button
              type="button"
              className={`editorial-floating-mode-btn ${gridMode === 'cinematic' ? 'is-active' : ''}`}
              onClick={() => handleGridModeChange('cinematic')}
              title="Cinematic Wide Grid"
              aria-label="Cinematic Wide Grid"
            >
              <Rows3 size={15} />
            </button>
          </div>

          <span className="editorial-floating-divider" aria-hidden="true" />

          {/* Quick Back to Top Scroll */}
          <button
            type="button"
            className="editorial-floating-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Scroll to Top"
            aria-label="Scroll to top of portfolio"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </aside>
    </section>
  );
};

export default EditorialWorkGrid;
