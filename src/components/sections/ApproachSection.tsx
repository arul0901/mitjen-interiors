import React, { useState } from 'react';
import { useInquiry } from '../../context/useInquiry';
import { ArrowRight, CheckCircle2, Sparkles, Compass, Layers, Wrench, KeyRound } from 'lucide-react';
import '../../styles/ApproachSection.css';

interface ApproachPhase {
  id: string;
  step: string;
  phaseTag: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
}

const APPROACH_PHASES: ApproachPhase[] = [
  {
    id: 'phase-discovery',
    step: '01',
    phaseTag: 'PHASE 01 • DISCOVERY & BRIEF',
    title: 'Understanding Your Needs',
    subtitle: 'Establishing the architectural vision and lifestyle parameters',
    description:
      'We begin by deeply understanding your daily living rituals, spatial priorities, aesthetic preferences and investment parameters to establish the right architectural direction for your project.',
    deliverables: [
      'Comprehensive spatial assessment & site survey',
      'Lifestyle, flow and functional zoning mapping',
      'Transparent budget allocation & timeline framework',
    ],
    image: '/assets/images/projects/image1.jpg',
    imageAlt: 'Interior designer reviewing spatial plans and architectural drawing room',
    icon: <Compass size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'phase-concept',
    step: '02',
    phaseTag: 'PHASE 02 • DESIGN & MATERIAL CURATION',
    title: 'Concept & Materials',
    subtitle: 'Harmonising form, tactile surfaces, joinery and light',
    description:
      'Colours, materials and tactile finishes come together with lighting design to shape a cohesive concept that balances timeless aesthetic warmth with practical durability.',
    deliverables: [
      '2D architectural plans & photorealistic 3D renders',
      'Tactile material boards & veneer/laminate curation',
      'Concealed lighting, ceiling & MEP schematics',
    ],
    image: '/assets/images/projects/image10.jpg',
    imageAlt: 'Curated architectural material palette, lighting and bespoke finishes',
    icon: <Layers size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'phase-production',
    step: '03',
    phaseTag: 'PHASE 03 • ADVANCED FABRICATION',
    title: 'Precision in Production',
    subtitle: 'Millimeter accuracy through computerized German machinery',
    description:
      'From custom furniture to detailed joinery components, our specialized German machinery and master craftsmen fabricate every element to exact tolerances before site delivery.',
    deliverables: [
      'High-precision CNC routing and edge-banding',
      'Marine-grade ply & premium hardware fabrication',
      'Rigorous factory pre-assembly & QA inspection',
    ],
    image: '/assets/images/projects/image4.jpg',
    imageAlt: 'Precision woodwork, custom cabinetry and architectural joinery',
    icon: <Wrench size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'phase-handover',
    step: '04',
    phaseTag: 'PHASE 04 • TURNKEY EXECUTION & HANDOVER',
    title: 'Project Execution & Handover',
    subtitle: 'Turnkey site coordination towards a pristine finished space',
    description:
      'We take the approved design through execution, managing trade supervision, MEP installation, detailing and final deep cleaning towards a flawless, move-in ready space.',
    deliverables: [
      'Dedicated on-site architectural project manager',
      'Multi-point snagging and quality audit check',
      'On-time delivery and complete as-built documentation',
    ],
    image: '/assets/images/projects/image3.jpg',
    imageAlt: 'Completed turnkey residential living salon ready for handover',
    icon: <KeyRound size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
];

export const ApproachSection: React.FC = () => {
  const { openInquiry } = useInquiry();
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

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
            A Clear Process. A Better Space.
          </h2>

          <div className="approach-gold-line" aria-hidden="true" />

          <p className="approach-subheading">
            From initial spatial brief to turnkey handover, every commission follows a disciplined architectural methodology designed around transparency, precision and craft.
          </p>
        </header>

        {/* ====================================================================
            2. STEP PROGRESSION TRACK (Desktop / Tablet Stepper)
            ==================================================================== */}
        <nav className="approach-nav-stepper" aria-label="Process stages">
          {APPROACH_PHASES.map((phase, idx) => {
            const isActive = idx === activePhaseIndex;
            return (
              <button
                key={phase.id}
                type="button"
                className={`approach-step-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActivePhaseIndex(idx)}
                aria-current={isActive ? 'step' : undefined}
              >
                <div className="approach-tab-top">
                  <span className="approach-tab-num">{phase.step}</span>
                  <span className="approach-tab-icon">{phase.icon}</span>
                </div>
                <span className="approach-tab-title">{phase.title}</span>
                <span className="approach-tab-indicator" aria-hidden="true" />
              </button>
            );
          })}
        </nav>

        {/* ====================================================================
            3. FEATURED ACTIVE PHASE SHOWCASE (Editorial Deep Dive)
            ==================================================================== */}
        <div className="approach-stage-spotlight" key={APPROACH_PHASES[activePhaseIndex].id}>
          <div className="approach-spotlight-grid">
            {/* Visual Canvas Column */}
            <div className="approach-spotlight-visual">
              <div className="approach-visual-frame">
                <img
                  src={APPROACH_PHASES[activePhaseIndex].image}
                  alt={APPROACH_PHASES[activePhaseIndex].imageAlt}
                  className="approach-visual-img"
                  loading="lazy"
                />
                <div className="approach-visual-overlay">
                  <span className="approach-visual-pill">
                    {APPROACH_PHASES[activePhaseIndex].step} / 04
                  </span>
                  <span className="approach-visual-tag">
                    {APPROACH_PHASES[activePhaseIndex].phaseTag}
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative & Deliverables Column */}
            <div className="approach-spotlight-content">
              <span className="approach-content-eyebrow">
                {APPROACH_PHASES[activePhaseIndex].phaseTag}
              </span>

              <h3 className="approach-content-title">
                {APPROACH_PHASES[activePhaseIndex].title}
              </h3>

              <p className="approach-content-subtitle">
                {APPROACH_PHASES[activePhaseIndex].subtitle}
              </p>

              <p className="approach-content-desc">
                {APPROACH_PHASES[activePhaseIndex].description}
              </p>

              <div className="approach-deliverables-block">
                <span className="approach-deliverables-heading">KEY ARCHITECTURAL DELIVERABLES</span>
                <ul className="approach-deliverables-list">
                  {APPROACH_PHASES[activePhaseIndex].deliverables.map((del, i) => (
                    <li key={i} className="approach-deliverable-item">
                      <CheckCircle2 size={16} className="approach-check-icon" aria-hidden="true" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="approach-action-row">
                <button
                  type="button"
                  className="approach-cta-btn"
                  onClick={() => openInquiry(`Process Consultation: ${APPROACH_PHASES[activePhaseIndex].title}`)}
                >
                  <span>CONSULT FOR THIS STAGE</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
                <div className="approach-stage-counter">
                  STAGE <strong>{APPROACH_PHASES[activePhaseIndex].step}</strong> OF <strong>04</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================
            4. FOUR-PHASE ARCHITECTURAL SUMMARY CARDS (Full Overview Grid)
            ==================================================================== */}
        <div className="approach-cards-grid">
          {APPROACH_PHASES.map((phase, idx) => {
            const isSelected = idx === activePhaseIndex;
            return (
              <article 
                key={phase.id} 
                className={`approach-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setActivePhaseIndex(idx)}
              >
                <div className="approach-card-canvas">
                  <img 
                    src={phase.image} 
                    alt={phase.imageAlt} 
                    className="approach-card-img" 
                    loading="lazy" 
                  />
                  <span className="approach-card-num">{phase.step}</span>
                </div>

                <div className="approach-card-body">
                  <span className="approach-card-tag">{phase.phaseTag.split('•')[1] || phase.phaseTag}</span>
                  <h4 className="approach-card-title">{phase.title}</h4>
                  <p className="approach-card-desc">{phase.description}</p>

                  <div className="approach-card-footer">
                    <span className="approach-card-action">
                      <span>{isSelected ? 'CURRENTLY VIEWING' : 'EXPLORE STAGE'}</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
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

export default ApproachSection;
