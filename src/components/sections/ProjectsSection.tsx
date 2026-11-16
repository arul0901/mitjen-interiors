import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import '../../styles/ProjectsSection.css';

interface ProjectItem {
  id: string;
  step: string;
  title: string;
  category: string;
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
    category: 'PU PAINT WORK ↗',
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
    category: 'INTERIOR DESIGN ↗',
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
    category: 'INTERIOR DESIGN ↗',
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
    category: 'WORKSPACE DESIGN ↗',
    description:
      'A professional workspace shaped around functional layouts and a considered interior finish.',
    image: '/images/Corporate/Corporate1.jpeg',
    imageAlt: 'Corporate Site Interior',
    href: '/portfolio',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>('kr-pura');

  return (
    <section 
      id="projects" 
      className="projects-section-root" 
      aria-label="Our Projects - Spaces We’re Proud to Have Built."
    >
      <div className="projects-container">
        {/* ====================================================================
            1. SECTION HEADER
            ==================================================================== */}
        <header className="projects-header">
          <div className="projects-header-badge">
            <span className="projects-badge-dot" aria-hidden="true" />
            <span className="projects-eyebrow">OUR PROJECTS</span>
          </div>

          <h2 className="projects-main-heading">
            SPACES WE’RE PROUD TO HAVE BUILT.
          </h2>

          <div className="projects-gold-line" aria-hidden="true" />
        </header>

        {/* ====================================================================
            2. ARCHITECTURAL EXPANDABLE PROJECT SHOWCASE (Interactive & Clean)
            ==================================================================== */}
        <div className="projects-accordion-track" role="region" aria-label="Selected Projects Gallery">
          {PROJECTS_ITEMS.map((item) => {
            const isActive = item.id === activeProjectId;
            return (
              <article 
                key={item.id}
                className={`project-arch-card ${isActive ? 'is-expanded' : ''}`}
                onClick={() => setActiveProjectId(item.id)}
                onMouseEnter={() => setActiveProjectId(item.id)}
              >
                {/* Visual Canvas */}
                <div className="project-arch-canvas">
                  <img 
                    src={item.image} 
                    alt={item.imageAlt} 
                    className="project-arch-img" 
                    loading="lazy" 
                  />
                  <div className="project-arch-canvas-overlay" />
                  
                  {/* Category Pill Over Image */}
                  <div className="project-arch-category-floating">
                    <span className="project-arch-category-pill">{item.category}</span>
                  </div>

                  <span className="project-arch-num-badge">{item.step}</span>
                </div>

                {/* Content Panel */}
                <div className="project-arch-body">
                  <div className="project-arch-header-row">
                    <h3 className="project-arch-title">
                      <a href={item.href} aria-label={`${item.title} project details`}>
                        {item.title}
                      </a>
                    </h3>
                  </div>

                  <hr className="project-arch-divider" aria-hidden="true" />

                  <p className="project-arch-desc">
                    {item.description}
                  </p>

                  <div className="project-arch-footer">
                    <a 
                      href={item.href} 
                      className="project-arch-cta-btn" 
                      aria-label={`View ${item.category} category projects`}
                    >
                      <span>{item.category}</span>
                      <span className="project-arch-btn-icon" aria-hidden="true">
                        <ArrowUpRight size={13} />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

