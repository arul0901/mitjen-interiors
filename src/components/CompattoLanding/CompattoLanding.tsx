import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInquiry } from '../../context/useInquiry';
import './CompattoLanding.css';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Consultation & Spatial Discovery',
    description:
      'We begin with an in-depth exploration of your project goals, architectural specifications, and aesthetic vision to establish the optimal turnkey roadmap and budget clarity.',
    image: '/assets/images/projects/image1.jpg',
    imageAlt: 'Consultation and Spatial Discovery',
  },
  {
    step: 2,
    title: 'Concept Design & 3D Visualization',
    description:
      'Our design studio translates your functional requirements into detailed 3D layouts, material palettes, lighting planes, and bespoke joinery schematics.',
    image: '/assets/images/projects/image2.jpg',
    imageAlt: 'Concept Design and 3D Visualization',
  },
  {
    step: 3,
    title: 'Material Sourcing & Custom Millwork',
    description:
      'Direct access to 150+ certified suppliers and precision German CNC machinery ensures uncompromised quality, structural integrity, and bespoke finishes.',
    image: '/assets/images/projects/image3.jpg',
    imageAlt: 'Material Sourcing and Custom Millwork',
  },
  {
    step: 4,
    title: 'Delivery & White-Glove Installation',
    description:
      'Our dedicated project managers oversee every milestone of logistics, structural fitting, and interior finishing with zero disruption and absolute schedule adherence.',
    image: '/assets/images/projects/image4.jpg',
    imageAlt: 'Delivery and White-Glove Installation',
  },
  {
    step: 5,
    title: 'After-Sales Support and Maintenance',
    description:
      'Our commitment to your satisfaction extends beyond the final installation. We conduct a thorough final walkthrough to ensure your satisfaction, and also offer comprehensive after-sales support for warranty claims, maintenance, and care instructions.',
    image: '/assets/compatto_lobby_clean.jpg',
    imageAlt: 'After-Sales Support and Maintenance in luxury space',
  },
];

// Clean Zen Garden Spiral Icon matching the reference design
const ZenSpiralIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 8C15.163 8 8 15.163 8 24C8 32.837 15.163 40 24 40C32.837 40 40 32.837 40 24C40 17.5 35 13 29.5 13C23.5 13 19 17.5 19 23.5C19 28.5 23 32 27.5 32C31 32 33.5 29.5 33.5 26.5"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M14 19C16 14.5 20 11.5 25 11"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M34 31C31 35 26 36.5 21 35"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
  </svg>
);

export const CompattoLanding: React.FC = () => {
  // Default to step 5 as shown in the user's reference mockup
  const [activeStepIndex, setActiveStepIndex] = useState(4);
  const { openInquiry } = useInquiry();

  const activeStep = PROCESS_STEPS[activeStepIndex];

  const handlePrevStep = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : PROCESS_STEPS.length - 1));
  };

  const handleNextStep = () => {
    setActiveStepIndex((prev) => (prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="compatto-root">
      <div className="compatto-viewport-frame">
        {/* ==================================================================
            1. NAVIGATION HEADER
            ================================================================== */}
        <header className="compatto-header" role="banner">
          <Link to="/" className="compatto-logo" aria-label="Compatto Homepage">
            <span>compatto</span>
            <span className="compatto-logo-dot" aria-hidden="true"></span>
          </Link>

          <nav className="compatto-nav-menu" aria-label="Main Navigation">
            <a href="#who-we-are" className="compatto-nav-link">
              Who we are
            </a>
            <a href="#process" className="compatto-nav-link">
              The challenges
            </a>
            <a href="#process" className="compatto-nav-link">
              Our process
            </a>
            <a href="#why-choose-us" className="compatto-nav-link">
              Why choose us
            </a>
            <Link to="/projects" className="compatto-nav-link">
              Projects
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => openInquiry('Compatto Furnishing Consultation')}
            className="compatto-contact-btn"
            aria-label="Contact us"
          >
            Contact us
          </button>
        </header>

        {/* ==================================================================
            2. HERO BANNER
            ================================================================== */}
        <section className="compatto-hero-banner" aria-label="Hero Introduction">
          <img
            src="/assets/compatto_hero_clean.jpg"
            alt="Warm Japandi living room interior with Akari paper globe lanterns and modern wooden lounge chair"
            className="compatto-hero-bg-img"
            loading="eager"
            fetchPriority="high"
          />

          <div className="compatto-hero-overlay">
            <div className="compatto-hero-content-split">
              {/* Left Headline */}
              <div className="compatto-hero-title-box">
                <h1 className="compatto-hero-h1">
                  Bringing Simplicity In The Furnishing Market
                </h1>
              </div>

              {/* Right Description & Action */}
              <div className="compatto-hero-cta-box">
                <p className="compatto-hero-desc">
                  Compatto simplifies the complex process of furnishing all-inclusive, boutique &amp; high-end hotels, and luxury residences in Greece &amp; Cyprus.
                </p>
                <button
                  type="button"
                  onClick={() => openInquiry('Start Your Furnishing Journey')}
                  className="compatto-hero-btn"
                  aria-label="Start Your Furnishing Journey"
                >
                  <span>Start Your Furnishing Journey</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. SECTION 2: WHO WE ARE
            ================================================================== */}
        <section id="who-we-are" className="compatto-who-section" aria-labelledby="who-we-are-title">
          <div className="compatto-who-grid">
            {/* Card 1: Taupe Stats Card */}
            <div className="compatto-who-card-taupe">
              <div className="compatto-taupe-header">
                <span className="compatto-taupe-eyebrow">Our commitment to excellence</span>
                <ZenSpiralIcon size={30} className="compatto-taupe-icon" />
              </div>

              <div className="compatto-taupe-stats-row">
                <div className="compatto-taupe-stat-item">
                  <span className="compatto-stat-number">150+</span>
                  <span className="compatto-stat-label">Furniture Suppliers</span>
                </div>
                <div className="compatto-taupe-stat-item">
                  <span className="compatto-stat-number">15+</span>
                  <span className="compatto-stat-label">Years of Industry<br />Experience</span>
                </div>
              </div>
            </div>

            {/* Card 2: Cream Narrative Card */}
            <div className="compatto-who-card-cream">
              <h2 id="who-we-are-title" className="compatto-section-h2">
                Who We Are
              </h2>
              <p className="compatto-who-paragraph">
                At Compatto, we understand the challenges of creating exceptional spaces that blend elegance, quality, and functionality.
              </p>
              <p className="compatto-who-paragraph">
                As Greece&apos;s premier furniture solutions provider, we&apos;ve made it our mission to simplify the furnishing process, ensuring that every project is executed flawlessly from initial consultation to final installation.
              </p>
            </div>

            {/* Card 3: Arched Collaboration Photo Card */}
            <div className="compatto-who-card-photo">
              <div className="compatto-arch-photo-frame">
                <img
                  src="/assets/compatto_collab_clean.jpg"
                  alt="Architects and interior designers collaborating over floor plans, blueprints, and material finishes on wooden table"
                  className="compatto-arch-photo-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. SECTION 3: HOW WE SIMPLIFY YOUR FURNISHING EXPERIENCE
            ================================================================== */}
        <section id="process" className="compatto-process-section" aria-labelledby="simplify-experience-title">
          <div className="compatto-process-heading-wrap">
            <h2 id="simplify-experience-title" className="compatto-process-title">
              How We Simplify Your Furnishing Experience
            </h2>
          </div>

          <div className="compatto-deck-stage">
            {/* Layered back cards peeking behind for authentic stacked depth */}
            <div className="compatto-deck-layer-3" aria-hidden="true"></div>
            <div className="compatto-deck-layer-2" aria-hidden="true"></div>

            {/* Active Card */}
            <div className="compatto-active-card">
              {/* Left Column: Number, Title, Description, and Step Pills */}
              <div className="compatto-card-text-side">
                <span className="compatto-card-big-num">{activeStep.step}</span>
                <h3 className="compatto-card-h3">{activeStep.title}</h3>
                <p className="compatto-card-desc">{activeStep.description}</p>

                <div className="compatto-step-nav-bar">
                  <div className="compatto-step-pills" role="tablist" aria-label="Process Steps">
                    {PROCESS_STEPS.map((step, idx) => (
                      <button
                        key={step.step}
                        type="button"
                        role="tab"
                        aria-selected={idx === activeStepIndex}
                        aria-label={`Step ${step.step}: ${step.title}`}
                        className={`compatto-step-pill-btn ${idx === activeStepIndex ? 'active' : ''}`}
                        onClick={() => setActiveStepIndex(idx)}
                      >
                        {step.step}
                      </button>
                    ))}
                  </div>

                  <div className="compatto-deck-arrows">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="compatto-deck-arrow-btn"
                      aria-label="Previous step"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="compatto-deck-arrow-btn"
                      aria-label="Next step"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Photography */}
              <div className="compatto-card-photo-side">
                <img
                  src={activeStep.image}
                  alt={activeStep.imageAlt}
                  className="compatto-card-photo-img"
                  key={activeStep.step}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. SECTION 4: WHY CHOOSE COMPATTO (BENTO GRID)
            ================================================================== */}
        <section id="why-choose-us" className="compatto-why-section" aria-labelledby="why-choose-title">
          <h2 id="why-choose-title" className="compatto-why-title">
            Why Choose Compatto
          </h2>

          <div className="compatto-why-bento">
            {/* Card 1: End-to-End Solutions */}
            <div className="compatto-why-card-endtoend">
              <div>
                <h3 className="compatto-bento-h4">End-to-End Solutions</h3>
                <p className="compatto-bento-p">
                  We manage every aspect of your furnishing project, saving you time and resources.
                </p>
              </div>
              <div className="compatto-bento-icon-bottom">
                <ZenSpiralIcon size={24} />
              </div>
            </div>

            {/* Card 2: After-Sales Support */}
            <div className="compatto-why-card-aftersales">
              <h3 className="compatto-bento-h4">After-Sales Support</h3>
              <p className="compatto-bento-p">
                We are committed to providing ongoing support &amp; after-sales service to address any future needs or concerns.
              </p>
            </div>

            {/* Card 3: Tall Bronze Card (Spans 2 rows) */}
            <div className="compatto-why-card-tall-dark">
              <div className="compatto-tall-block">
                <h3 className="compatto-tall-h4">No Variety Restrictions</h3>
                <p className="compatto-tall-p">
                  We partner with top vendor networks and suppliers, providing the broadest selection of furniture solutions to suit your needs and preferences.
                </p>
              </div>

              <div className="compatto-tall-divider" aria-hidden="true"></div>

              <div className="compatto-tall-block">
                <h3 className="compatto-tall-h4">Bespoke Furniture</h3>
                <p className="compatto-tall-p">
                  We specialize in sourcing custom-made furniture pieces that perfectly match your unique vision and requirements.
                </p>
              </div>
            </div>

            {/* Card 4: Wide Dining Room Photo Card (Spans col 1-2) */}
            <div className="compatto-why-card-dining">
              <img
                src="/assets/compatto_dining_clean.jpg"
                alt="Contemporary solid wood dining table and designer chairs in front of illuminated archway wall"
                className="compatto-dining-bg-img"
                loading="lazy"
              />
              <div className="compatto-dining-overlay">
                <h3 className="compatto-dining-h4">Superior Quality</h3>
                <p className="compatto-dining-p">
                  Our partnerships with the best suppliers give us access to top-notch materials, craftsmanship, and quality control processes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompattoLanding;
