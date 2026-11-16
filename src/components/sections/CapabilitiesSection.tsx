import React, { useState } from 'react';
import { useInquiry } from '../../context/useInquiry';
import { 
  Cpu, 
  Layers, 
  Box, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import '../../styles/CapabilitiesSection.css';

interface CapabilityPillar {
  id: string;
  step: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  specs: string[];
  icon: React.ReactNode;
}

const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'cap-german-machinery',
    step: '01',
    shortLabel: 'German Machinery',
    title: 'Computerized German Machinery',
    subtitle: 'Industrial Homag Saws & Automatic Edge-Banders',
    description:
      'Computer-calibrated German beam saws and edge-banders produce joint tolerances down to 0.1mm. High-pressure polyurethane edge-sealing prevents moisture ingress, guaranteeing lifelong durability.',
    badge: '0.1 MM TOLERANCE',
    specs: ['Homag Industrial Plant', 'Polyurethane Moisture Seal', 'Zero-Gap Joinery Fit'],
    icon: <Cpu size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'cap-cnc-detailing',
    step: '02',
    shortLabel: 'CNC Detailing',
    title: 'Multi-Axis CNC Detailing',
    subtitle: 'Parametric Milling & Custom Architectural Millwork',
    description:
      'Multi-axis computer numerical control translates complex CAD designs into intricate fluted acoustic wall paneling, curved transitions, concealed handles, and bespoke architectural carvings.',
    badge: '5-AXIS PRECISION',
    specs: ['Parametric Fluted Surfaces', 'Custom Hardware Recesses', 'Zero-Splinter Milling'],
    icon: <Layers size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'cap-3d-visuals',
    step: '03',
    shortLabel: '3D BIM Prototyping',
    title: 'Photorealistic 3D & Digital Prototyping',
    subtitle: 'Ray-Traced Spatial Studies & Coordinated MEP',
    description:
      'Before a single sheet of wood is cut, spaces are built virtually with physics-based daylight studies, accurate material reflectance, and fully integrated ceiling and electrical schematics.',
    badge: '4K RAY-TRACED BIM',
    specs: ['Real-World Light Simulation', 'Accurate Material Mapping', 'Coordinated MEP Schematics'],
    icon: <Box size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    id: 'cap-turnkey-execution',
    step: '04',
    shortLabel: 'Dry-Fit Handover',
    title: 'Factory Pre-Assembly & Clean Site Handover',
    subtitle: 'Modular Dry-Fit Quality Check & Snag-Free Handover',
    description:
      'Modular carcasses and hardware are 100% dry-fitted and inspected inside our controlled manufacturing facility. This reduces on-site installation by 60% with zero on-site cutting dust.',
    badge: '100% FACTORY DRY-FIT',
    specs: ['Dust-Free Site Setup', 'Dedicated Architect Oversight', '50-Point Snagging Audit'],
    icon: <ShieldCheck size={18} strokeWidth={1.75} aria-hidden="true" />,
  },
];

export const CapabilitiesSection: React.FC = () => {
  const { openInquiry } = useInquiry();
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);

  const activePillar = CAPABILITY_PILLARS[activePillarIndex];

  const handlePrev = () => {
    setActivePillarIndex((prev) => (prev > 0 ? prev - 1 : CAPABILITY_PILLARS.length - 1));
  };

  const handleNext = () => {
    setActivePillarIndex((prev) => (prev < CAPABILITY_PILLARS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section 
      id="capabilities" 
      className="capabilities-section-root" 
      aria-label="Our Capabilities - Technology That Shapes Quality."
    >
      <div className="capabilities-container">
        {/* ====================================================================
            1. SECTION HEADER (Compact)
            ==================================================================== */}
        <header className="capabilities-header">
          <div className="capabilities-header-badge">
            <span className="capabilities-badge-dot" aria-hidden="true" />
            <span className="capabilities-eyebrow">OUR CAPABILITIES</span>
          </div>

          <h2 className="capabilities-main-heading">
            Technology That Shapes Quality.
          </h2>

          <div className="capabilities-accent-line" aria-hidden="true" />

          <p className="capabilities-subheading">
            Good interiors require more than creative ideas—they demand industrial rigor, micron-level precision and seamless site engineering. Our advanced manufacturing facility and digital workflow bridge bespoke architecture with flawless execution.
          </p>
        </header>

        {/* ====================================================================
            2. TWO-COLUMN ARCHITECTURAL SHOWCASE
            ==================================================================== */}
        <div className="capabilities-main-grid">
          {/* Left Column: Visual Canvas & Manufacturing Metrics */}
          <div className="capabilities-visual-col">
            <div className="capabilities-canvas-frame">
              <img
                src="/assets/images/projects/image9.jpg"
                alt="Mitjen manufacturing facility with precision German joinery machinery and architectural craftsmanship"
                className="capabilities-canvas-img"
                loading="lazy"
              />
              <div className="capabilities-canvas-overlay">
                <div className="capabilities-overlay-badge">
                  <Sparkles size={13} className="capabilities-sparkle-icon" aria-hidden="true" />
                  <span>IN-HOUSE ARCHITECTURAL ATELIER</span>
                </div>
                <h3 className="capabilities-overlay-title">
                  {activePillar.title}
                </h3>
                <p className="capabilities-overlay-desc">
                  {activePillar.subtitle}
                </p>
              </div>

              {/* Floating Pill Tag */}
              <div className="capabilities-floating-pill">
                <span className="capabilities-pill-label">PRECISION STANDARD</span>
                <span className="capabilities-pill-val">0.1 mm Calibrated</span>
              </div>
            </div>

            {/* Studio Technical Stats Strip (Compact 4-metric strip) */}
            <div className="capabilities-stats-strip">
              <div className="capabilities-stat-item">
                <span className="capabilities-stat-val">0.1 mm</span>
                <span className="capabilities-stat-label">Joinery Tolerance</span>
              </div>
              <div className="capabilities-stat-divider" aria-hidden="true" />
              <div className="capabilities-stat-item">
                <span className="capabilities-stat-val">100%</span>
                <span className="capabilities-stat-label">Factory Dry-Fit</span>
              </div>
              <div className="capabilities-stat-divider" aria-hidden="true" />
              <div className="capabilities-stat-item">
                <span className="capabilities-stat-val">15+</span>
                <span className="capabilities-stat-label">Years Mastery</span>
              </div>
              <div className="capabilities-stat-divider" aria-hidden="true" />
              <div className="capabilities-stat-item">
                <span className="capabilities-stat-val">2,000+</span>
                <span className="capabilities-stat-label">Commissions</span>
              </div>
            </div>

            {/* Quality Guarantee Callout */}
            <div className="capabilities-guarantee-box">
              <CheckCircle2 size={16} className="capabilities-guarantee-icon" aria-hidden="true" />
              <p className="capabilities-guarantee-text">
                All cabinetry, bespoke furniture and wall panels are pre-assembled in our facility, eliminating cutting dust and site delays for a smooth, move-in ready handover.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Capability Pillars (Compact & Accordion-optimized on mobile) */}
          <div className="capabilities-pillars-col">
            <div className="capabilities-pillars-heading-wrap">
              <span className="capabilities-pillars-eyebrow">ENGINEERING BENCHMARKS</span>
              <span className="capabilities-pillars-note">4 Precision Standards</span>
            </div>

            {/* Mobile Segmented Horizontal Track */}
            <div className="capabilities-mobile-pill-track" role="tablist" aria-label="Capabilities filter">
              {CAPABILITY_PILLARS.map((pillar, idx) => {
                const isActive = idx === activePillarIndex;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`capabilities-mobile-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActivePillarIndex(idx)}
                  >
                    <span>{pillar.step}</span>
                    <span>{pillar.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Pillars List / Accordion on Mobile */}
            <div className="capabilities-pillars-list" role="tablist" aria-label="Capabilities Pillars">
              {CAPABILITY_PILLARS.map((pillar, idx) => {
                const isActive = idx === activePillarIndex;
                return (
                  <article
                    key={pillar.id}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    className={`capability-pillar-card ${isActive ? 'is-active' : 'is-collapsed'}`}
                    onClick={() => setActivePillarIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePillarIndex(idx);
                      }
                    }}
                  >
                    <div className="capability-pillar-header">
                      <div className="capability-pillar-meta">
                        <span className="capability-pillar-step">{pillar.step}</span>
                        <span className="capability-pillar-icon">{pillar.icon}</span>
                        <h4 className="capability-pillar-title-inline">{pillar.title}</h4>
                      </div>
                      <div className="capability-pillar-header-right">
                        <span className="capability-pillar-badge">{pillar.badge}</span>
                        <ChevronDown size={16} className="capability-chevron-icon" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="capability-pillar-body-wrap">
                      <div className="capability-pillar-content">
                        <p className="capability-pillar-subtitle">{pillar.subtitle}</p>
                        <p className="capability-pillar-desc">{pillar.description}</p>
                      </div>

                      {/* Architectural Specifications Chips */}
                      <div className="capability-pillar-specs">
                        {pillar.specs.map((spec, sIdx) => (
                          <span key={sIdx} className="capability-spec-chip">
                            <span className="capability-spec-bullet" aria-hidden="true" />
                            <span>{spec}</span>
                          </span>
                        ))}
                      </div>

                      <div className="capability-pillar-footer">
                        <span className="capability-pillar-action">
                          <span>{isActive ? 'CURRENTLY INSPECTING' : 'VIEW SPECIFICATION'}</span>
                          <ArrowRight size={13} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Action Row */}
            <div className="capabilities-action-row">
              <button
                type="button"
                className="capabilities-cta-btn"
                onClick={() => openInquiry('Technical Capabilities & Manufacturing Briefing')}
              >
                <span>DISCUSS TECHNICAL SPECIFICATIONS</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
