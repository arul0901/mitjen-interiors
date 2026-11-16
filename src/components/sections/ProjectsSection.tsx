import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import '../../styles/ProjectsSection.css';

interface ProjectItem {
  id: string;
  step: string;
  title: string;
  location: string;
  category: string;
  filterType: 'all' | 'residential' | 'commercial' | 'corporate';
  typeLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

const PROJECTS_ITEMS: ProjectItem[] = [
  {
    id: 'vintage-finish',
    step: '01',
    title: 'VINTAGE FINISH INTERIOR, RACE COURSE, COIMBATORE',
    location: 'Race Course, Coimbatore',
    category: 'PU PAINT WORK ↗',
    filterType: 'residential',
    typeLabel: 'Residential',
    description:
      'A vintage-inspired look brought to life with carefully finished PU paint detailing.',
    image: '/images/Residential/Residential1.jpeg',
    imageAlt: 'Vintage Finish Interior, Race Course, Coimbatore',
    href: '/portfolio',
  },
  {
    id: 'kr-pura',
    step: '02',
    title: 'INTERIOR PROJECT, KR PURA, BANGALORE',
    location: 'KR Pura, Bangalore',
    category: 'INTERIOR DESIGN ↗',
    filterType: 'residential',
    typeLabel: 'Residential',
    description:
      'A well-planned interior featuring clean detailing and a cohesive design finish.',
    image: '/images/Residential/Residential2.jpeg',
    imageAlt: 'Interior Project, KR Pura, Bangalore',
    href: '/portfolio',
  },
  {
    id: 'tidal-park',
    step: '03',
    title: 'OFFICE INTERIOR, TIDAL PARK',
    location: 'Tidal Park, Coimbatore',
    category: 'INTERIOR DESIGN ↗',
    filterType: 'commercial',
    typeLabel: 'Commercial',
    description:
      'A functional workspace planned around how teams work, with clean detailing and a polished finish.',
    image: '/images/Commercial/Commercial1.jpeg',
    imageAlt: 'Office Interior, Tidal Park',
    href: '/portfolio',
  },
  {
    id: 'corporate-site',
    step: '04',
    title: 'CORPORATE SITE INTERIOR',
    location: 'Corporate Workspace',
    category: 'WORKSPACE DESIGN ↗',
    filterType: 'corporate',
    typeLabel: 'Corporate',
    description:
      'A professional workspace shaped around functional layouts and a considered interior finish.',
    image: '/images/Corporate/Corporate1.jpeg',
    imageAlt: 'Corporate Site Interior',
    href: '/portfolio',
  },
];

type FilterCategory = 'all' | 'residential' | 'commercial' | 'corporate';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const filteredProjects = selectedFilter === 'all' 
    ? PROJECTS_ITEMS 
    : PROJECTS_ITEMS.filter((item) => item.filterType === selectedFilter);

  const handleScrollPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 360;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 360;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveSlideIndex(Math.min(Math.max(index, 0), filteredProjects.length - 1));
    }
  };

  return (
    <section 
      id="projects" 
      className="projects-filmstrip-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      <div className="projects-filmstrip-container">
        {/* ====================================================================
            1. SECTION EDITORIAL HEADER & ACTION BAR
            ==================================================================== */}
        <div className="projects-filmstrip-header-row">
          <div className="projects-filmstrip-title-group">
            <div className="projects-filmstrip-badge">
              <span className="projects-filmstrip-dot" aria-hidden="true" />
              <span className="projects-filmstrip-eyebrow">OUR PROJECTS</span>
            </div>

            <h2 className="projects-filmstrip-heading">
              SPACES WE’RE PROUD TO HAVE BUILT.
            </h2>
          </div>

          {/* Desktop Right Controls: View All + Slider Chevrons */}
          <div className="projects-filmstrip-controls-group">
            <a 
              href="/portfolio" 
              className="projects-view-all-link"
              aria-label="View all projects in portfolio"
            >
              <span>VIEW PORTFOLIO</span>
              <ArrowUpRight size={14} className="projects-view-all-arrow" aria-hidden="true" />
            </a>

            <div className="projects-slider-arrows-wrap" aria-label="Carousel navigation">
              <button 
                type="button" 
                onClick={handleScrollPrev} 
                className="projects-slider-arrow-btn"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                onClick={handleScrollNext} 
                className="projects-slider-arrow-btn"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. CATEGORY FILTER PILLS (Touch-scrollable on mobile)
            ==================================================================== */}
        <div className="projects-filter-bar" role="tablist" aria-label="Project categories">
          <button
            type="button"
            role="tab"
            aria-selected={selectedFilter === 'all'}
            onClick={() => setSelectedFilter('all')}
            className={`projects-filter-btn ${selectedFilter === 'all' ? 'is-active' : ''}`}
          >
            <span>ALL SPACES</span>
            <span className="projects-filter-count">{PROJECTS_ITEMS.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedFilter === 'residential'}
            onClick={() => setSelectedFilter('residential')}
            className={`projects-filter-btn ${selectedFilter === 'residential' ? 'is-active' : ''}`}
          >
            <span>RESIDENTIAL</span>
            <span className="projects-filter-count">2</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedFilter === 'commercial'}
            onClick={() => setSelectedFilter('commercial')}
            className={`projects-filter-btn ${selectedFilter === 'commercial' ? 'is-active' : ''}`}
          >
            <span>COMMERCIAL</span>
            <span className="projects-filter-count">1</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedFilter === 'corporate'}
            onClick={() => setSelectedFilter('corporate')}
            className={`projects-filter-btn ${selectedFilter === 'corporate' ? 'is-active' : ''}`}
          >
            <span>CORPORATE</span>
            <span className="projects-filter-count">1</span>
          </button>
        </div>

        {/* ====================================================================
            3. HORIZONTAL ARCHITECTURAL FILMSTRIP CAROUSEL
            Touch-snap scroll on mobile, smooth track on desktop
            ==================================================================== */}
        <div 
          className="projects-filmstrip-track" 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Selected Projects Carousel"
        >
          {filteredProjects.map((item) => (
            <article key={item.id} className="project-folio-card">
              {/* Photo Canvas */}
              <a 
                href={item.href} 
                className="project-folio-canvas"
                aria-label={`View ${item.title} details`}
              >
                <img 
                  src={item.image} 
                  alt={item.imageAlt} 
                  className="project-folio-img" 
                  loading="lazy" 
                />
                <div className="project-folio-canvas-overlay" aria-hidden="true" />
                
                {/* Floating Category Pill */}
                <div className="project-folio-category-floating">
                  <span className="project-folio-category-pill">{item.category}</span>
                </div>

                {/* Floating Index Badge */}
                <span className="project-folio-index-badge">{item.step}</span>
              </a>

              {/* Editorial Content */}
              <div className="project-folio-body">
                <div className="project-folio-meta-row">
                  <div className="project-folio-location">
                    <MapPin size={12} className="project-folio-loc-icon" aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>
                  <span className="project-folio-type-tag">{item.typeLabel}</span>
                </div>

                <h3 className="project-folio-title">
                  <a href={item.href} aria-label={`${item.title} project details`}>
                    {item.title}
                  </a>
                </h3>

                <p className="project-folio-desc">
                  {item.description}
                </p>

                <div className="project-folio-footer">
                  <a 
                    href={item.href} 
                    className="project-folio-cta-link" 
                    aria-label={`Explore ${item.title}`}
                  >
                    <span>EXPLORE SPACE</span>
                    <span className="project-folio-cta-icon" aria-hidden="true">
                      <ArrowUpRight size={13} />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ====================================================================
            4. MOBILE PROGRESS & NAVIGATION BAR
            ==================================================================== */}
        <div className="projects-mobile-bottom-bar">
          <div className="projects-mobile-dots" aria-hidden="true">
            {filteredProjects.map((_, index) => (
              <span 
                key={index} 
                className={`projects-mobile-dot ${index === activeSlideIndex ? 'is-active' : ''}`} 
              />
            ))}
          </div>

          <a 
            href="/portfolio" 
            className="projects-mobile-view-all"
            aria-label="View all projects in portfolio"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
