import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../../styles/ApproachSection.css';

interface ApproachItem {
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

const APPROACH_ITEMS: ApproachItem[] = [
  {
    step: '01',
    title: 'UNDERSTANDING YOUR NEEDS',
    description:
      'We begin by understanding your requirements, preferences and budget to establish the right direction for your project.',
    image: '/assets/images/projects/image1.jpg',
    imageAlt: 'Understanding Your Needs - Requirements, preferences and budget',
    href: '#',
  },
  {
    step: '02',
    title: 'CONCEPT & MATERIALS',
    description:
      'Colours, materials and finishes come together to shape a design that reflects your preferences and project requirements.',
    image: '/assets/images/projects/image10.jpg',
    imageAlt: 'Concept & Materials - Colours, materials and finishes',
    href: '#',
  },
  {
    step: '03',
    title: 'PRECISION IN PRODUCTION',
    description:
      'From custom furniture to detailed components, we craft everything with care and attention to detail.',
    image: '/assets/images/projects/image4.jpg',
    imageAlt: 'Precision In Production - Custom furniture and precision components',
    href: '#',
  },
  {
    step: '04',
    title: 'PROJECT EXECUTION & HANDOVER',
    description:
      'We take the approved design through execution, working towards a finished space that reflects the agreed plan.',
    image: '/assets/images/projects/image3.jpg',
    imageAlt: 'Project Execution & Handover - Approved design through execution',
    href: '#',
  },
];

export const ApproachSection: React.FC = () => {
  return (
    <section 
      id="approach" 
      className="approach-section-root" 
      aria-label="Our Approach - A Clear Process. A Better Space."
    >
      <div className="approach-container">
        {/* ====================================================================
            1. SECTION HEADER
            ==================================================================== */}
        <header className="approach-header">
          <div className="approach-header-badge">
            <span className="approach-badge-dot" aria-hidden="true" />
            <span className="approach-eyebrow">OUR APPROACH</span>
          </div>

          <h2 className="approach-main-heading">
            A CLEAR PROCESS. A BETTER SPACE.
          </h2>

          <div className="approach-gold-line" aria-hidden="true" />
        </header>

        {/* ====================================================================
            2. FOUR-CARD ARCHITECTURAL METHODOLOGY GRID
            ==================================================================== */}
        <div className="approach-grid">
          {APPROACH_ITEMS.map((item) => (
            <article key={item.step} className="approach-card">
              <div className="approach-card-thumbnail">
                <img 
                  src={item.image} 
                  alt={item.imageAlt} 
                  className="approach-card-img" 
                  loading="lazy" 
                />
                <span className="approach-card-step-badge">{item.step}</span>
              </div>

              <div className="approach-card-info">
                <span className="approach-card-phase-tag">PHASE {item.step}</span>
                <h3 className="approach-card-title">
                  <a href={item.href} aria-label={`${item.title} service link`}>
                    {item.title}
                  </a>
                </h3>

                <p className="approach-card-desc">
                  {item.description}
                </p>

                <div className="approach-card-cta-wrap">
                  <a 
                    href={item.href} 
                    className="approach-discover-btn" 
                    aria-label={`Discover more - ${item.title}`}
                  >
                    <span>DISCOVER MORE</span>
                    <ArrowRight size={14} className="approach-btn-arrow" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
