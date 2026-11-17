import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Eye,
  X,
  Clock,
  ShieldCheck,
  Building2,
  MapPin,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useInquiry } from '../../context/useInquiry';
import {
  PORTFOLIO_PROJECTS,
  BUDGET_TIERS,
  PORTFOLIO_FAQS,
  MATERIAL_SPECIFICATIONS,
  PortfolioProject,
} from '../../data/livspacePortfolioData';
import './LivspacePortfolio.css';

export const LivspacePortfolio: React.FC = () => {
  const { openInquiry } = useInquiry();
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [activeCity, setActiveCity] = useState<string>('All');
  const [activeBhk, setActiveBhk] = useState<string>('All');
  const [activeScope, setActiveScope] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox Modal State
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // FAQ Accordion State (first item open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Scroll to grid helper
  const scrollToGrid = () => {
    gridSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Derived authentic cities, BHKs and scopes from verified projects
  const cities = ['All', 'Coimbatore', 'Bangalore'];
  const bhkOptions = ['All', '3-BHK', '4-BHK', '6-BHK / Villa'];
  const scopeOptions = ['All', 'Full Home', 'Living Room', 'Dining Area', 'Master Bedroom', 'Kitchen', 'Private Study', 'Villa Staircase'];

  // Filtered Projects Computation
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((p) => {
      // City match
      if (activeCity !== 'All' && p.city !== activeCity) return false;

      // BHK match
      if (activeBhk !== 'All' && p.bhk !== activeBhk) return false;

      // Scope match
      if (activeScope !== 'All') {
        const matchesScope = p.scopeTags.some(
          (s) => s.toLowerCase() === activeScope.toLowerCase()
        );
        if (!matchesScope) return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const haystack = `${p.title} ${p.society} ${p.location} ${p.fullAddress} ${p.style} ${p.scopeTags.join(' ')}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [activeCity, activeBhk, activeScope, searchQuery]);

  // Open Lightbox
  const handleOpenGallery = (project: PortfolioProject) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const handleCloseGallery = () => {
    setSelectedProject(null);
  };

  return (
    <div className="liv-port-root">
      <div className="liv-port-container">
        {/* ==================================================================
            1. HERO SECTION & PILLARS
            ================================================================== */}
        <section className="liv-port-hero" aria-labelledby="portfolio-main-title">
          {/* Breadcrumb navigation */}
          <nav className="liv-port-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Interior Design Portfolio</span>
          </nav>

          <div className="liv-port-hero-header">
            <span className="liv-port-eyebrow">• 4 COMPLETED RESIDENCES</span>
            <h1 id="portfolio-main-title" className="liv-port-h1">
              Mitjen Interior Design Portfolio
            </h1>
            <p className="liv-port-subtitle">
              Explore our 4 verified client residential projects across Coimbatore and Bangalore:
              Prithvi, Sampath, Mr. Mahesh – Pilot, and Deepak.
            </p>
          </div>

          {/* Quick Regional Pillars (Coimbatore vs Bangalore) */}
          <div className="liv-port-pillars-grid">
            {/* Pillar 1: Coimbatore Projects (3) */}
            <div
              className={`liv-pillar-card ${activeCity === 'Coimbatore' ? 'active' : ''}`}
              onClick={() => {
                setActiveCity(activeCity === 'Coimbatore' ? 'All' : 'Coimbatore');
                scrollToGrid();
              }}
              role="button"
              tabIndex={0}
              aria-label="Explore Coimbatore Projects"
            >
              <div>
                <div className="liv-pillar-header">
                  <h2 className="liv-pillar-title">Coimbatore Residences</h2>
                  <span className="liv-status-badge liv-status-completed">
                    <CheckCircle2 size={12} />
                    3 DELIVERED
                  </span>
                </div>
                <p className="liv-pillar-desc">
                  Completed luxury residences in Coimbatore: Prithvi (Neelambur · Royal Nesto),
                  Sampath (Kalapatti · Nehru Nagar West.), and Deepak (Saibaba Colony).
                </p>
              </div>
              <div className="liv-pillar-action">
                <span>View Coimbatore Homes (3)</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Pillar 2: Bangalore Projects (1) */}
            <div
              className={`liv-pillar-card ${activeCity === 'Bangalore' ? 'active' : ''}`}
              onClick={() => {
                setActiveCity(activeCity === 'Bangalore' ? 'All' : 'Bangalore');
                scrollToGrid();
              }}
              role="button"
              tabIndex={0}
              aria-label="Explore Bangalore Projects"
            >
              <div>
                <div className="liv-pillar-header">
                  <h2 className="liv-pillar-title">Bangalore Residence</h2>
                  <span className="liv-status-badge liv-status-completed">
                    <CheckCircle2 size={12} />
                    1 DELIVERED VILLA
                  </span>
                </div>
                <p className="liv-pillar-desc">
                  Grand 7,350 sq.ft luxury villa for Mr. Mahesh – Pilot located at Krishna Raja (KR) Puram,
                  Bangalore with central courtyard flow and island kitchen.
                </p>
              </div>
              <div className="liv-pillar-action">
                <span>View Bangalore Villa (1)</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. TOP CITIES PILL STRIP
            ================================================================== */}
        <div className="liv-port-cities-strip" role="region" aria-label="Filter by City">
          <span className="liv-cities-label">Top Cities:</span>
          {cities.map((city) => {
            const count =
              city === 'All'
                ? PORTFOLIO_PROJECTS.length
                : PORTFOLIO_PROJECTS.filter((p) => p.city === city).length;

            return (
              <button
                key={city}
                type="button"
                className={`liv-city-pill ${activeCity === city ? 'active' : ''}`}
                onClick={() => setActiveCity(city)}
              >
                <span>{city}</span>
                <span className="liv-city-count">({count})</span>
              </button>
            );
          })}
        </div>

        {/* ==================================================================
            3. FILTER CONTROLS BAR (STICKY / COMPREHENSIVE)
            ================================================================== */}
        <div ref={gridSectionRef} className="liv-filter-bar">
          {/* Top Row: BHK Tabs + Search Box */}
          <div className="liv-filter-row-top">
            <div className="liv-bhk-tabs" role="tablist" aria-label="BHK Configuration Tabs">
              {bhkOptions.map((bhk) => (
                <button
                  key={bhk}
                  type="button"
                  role="tab"
                  aria-selected={activeBhk === bhk}
                  className={`liv-bhk-tab-btn ${activeBhk === bhk ? 'active' : ''}`}
                  onClick={() => setActiveBhk(bhk)}
                >
                  {bhk}
                </button>
              ))}
            </div>

            <div className="liv-search-wrap">
              <Search size={15} className="liv-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by society, locality, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="liv-search-input"
                aria-label="Search interior projects"
              />
            </div>
          </div>

          {/* Bottom Row: Scope Chips + Results Counter */}
          <div className="liv-filter-row-bottom">
            <div className="liv-scope-chips">
              {scopeOptions.map((scope) => (
                <button
                  key={scope}
                  type="button"
                  className={`liv-scope-chip ${activeScope === scope ? 'active' : ''}`}
                  onClick={() => setActiveScope(scope)}
                >
                  {scope}
                </button>
              ))}
            </div>

            <span className="liv-results-count">
              Showing {filteredProjects.length} of {PORTFOLIO_PROJECTS.length} Homes
            </span>
          </div>
        </div>

        {/* ==================================================================
            4. PROJECTS SHOWCASE GRID (AUTHENTIC LIVSPACE CARDS)
            ================================================================== */}
        <section className="liv-projects-grid" aria-label="Portfolio Projects List">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article key={project.id} className="liv-project-card">
                {/* Media Wrap with Photo Count & Status */}
                <div
                  className="liv-card-media-wrap"
                  onClick={() => handleOpenGallery(project)}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="liv-card-img"
                    loading="lazy"
                  />

                  {/* Photo count badge */}
                  <span className="liv-card-badge-top-left">
                    <Layers size={11} />
                    {project.galleryImages.length} PHOTOS
                  </span>

                  {/* Status badge */}
                  <div className="liv-card-badge-top-right">
                    {project.type === 'Delivered' ? (
                      <span className="liv-status-badge liv-status-completed">
                        <CheckCircle2 size={11} />
                        COMPLETED
                      </span>
                    ) : (
                      <span className="liv-status-badge liv-status-upcoming">
                        <Sparkles size={11} />
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="liv-card-body">
                  {/* Category Kicker Badge */}
                  <div className="liv-card-kicker">
                    <span className="liv-kicker-city">{project.city}</span>
                    <span className="liv-kicker-dot">•</span>
                    <span className="liv-kicker-bhk">{project.bhk}</span>
                  </div>

                  {/* Project Title (Fixed clipping, elegant Cormorant serif) */}
                  <h3 className="liv-card-title" title={`${project.title} — ${project.society}`}>
                    {project.title}
                  </h3>

                  {/* Society & Locality Address */}
                  <div className="liv-card-society">
                    <MapPin size={13} className="liv-society-pin" aria-hidden="true" />
                    <span>
                      {project.society} · {project.location}
                    </span>
                  </div>

                  {/* Enhanced Architectural Specs Grid */}
                  <div className="liv-card-specs-grid">
                    <div className="liv-spec-item">
                      <span className="liv-spec-label">Scope</span>
                      <span className="liv-spec-value" title={project.scopeTags.join(', ')}>
                        {project.scopeTags.slice(0, 2).join(', ')}
                        {project.scopeTags.length > 2 ? ' +' : ''}
                      </span>
                    </div>

                    <div className="liv-spec-item">
                      <span className="liv-spec-label">BHK &amp; Area</span>
                      <span className="liv-spec-value">
                        {project.bhk} ({project.carpetArea})
                      </span>
                    </div>

                    <div className="liv-spec-item">
                      <span className="liv-spec-label">Timeline</span>
                      <span className="liv-spec-value">{project.turnaround}</span>
                    </div>

                    <div className="liv-spec-item">
                      <span className="liv-spec-label">Est. Budget</span>
                      <span className="liv-spec-value liv-spec-budget">{project.budgetBracket}</span>
                    </div>
                  </div>

                  {/* Action Button Row */}
                  <div className="liv-card-actions">
                    <button
                      type="button"
                      onClick={() =>
                        openInquiry(`Inquiry for Project: ${project.title} (${project.society}, ${project.city})`)
                      }
                      className="liv-btn-primary"
                    >
                      <span>Get This Design</span>
                      <ArrowRight size={13} className="liv-btn-arrow" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenGallery(project)}
                      className="liv-btn-secondary"
                      aria-label={`View photos of ${project.title}`}
                      title="View Photo Gallery"
                    >
                      <Eye size={15} />
                      <span className="liv-btn-photos-text">Photos</span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px 20px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px dashed var(--liv-border)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No homes match your exact filter</h3>
              <p style={{ color: 'var(--liv-ink-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Try adjusting your BHK configuration or clear the search criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCity('All');
                  setActiveBhk('All');
                  setActiveScope('All');
                  setSearchQuery('');
                }}
                className="liv-btn-primary"
                style={{ display: 'inline-flex', width: 'auto', padding: '8px 20px' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* ==================================================================
            4B. MATERIALS & CRAFTSMANSHIP SPECIFICATIONS
            ================================================================== */}
        <section className="liv-materials-section" aria-labelledby="materials-section-title">
          <div className="liv-budget-header">
            <span className="liv-port-eyebrow">• CRAFTSMANSHIP &amp; VERIFIED MATERIALS</span>
            <h2 id="materials-section-title" className="liv-budget-title">
              Materials. Craftsmanship. Detail.
            </h2>
            <p className="liv-budget-subtitle">
              A closer look at the verified architectural materials and industry-leading brand partners that define our residential spaces.
            </p>
          </div>

          <div className="liv-materials-grid">
            {MATERIAL_SPECIFICATIONS.map((mat) => (
              <div key={mat.id} className="liv-material-card">
                <span className="liv-mat-num">{mat.number}</span>
                <h3 className="liv-mat-title">{mat.title}</h3>
                <p className="liv-mat-sub">{mat.subtitle}</p>

                <div className="liv-mat-block">
                  <span className="liv-mat-label">Materials:</span>
                  <div className="liv-mat-chips">
                    {mat.materials.map((m, idx) => (
                      <span key={idx} className="liv-mat-chip">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="liv-mat-block">
                  <span className="liv-mat-label">Brand / Finish:</span>
                  <div className="liv-mat-chips">
                    {mat.brandFinishDetails.map((b, idx) => (
                      <span key={idx} className="liv-mat-chip brand">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {mat.note && <p className="liv-mat-note">{mat.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            5. DESIGNS FOR EVERY BUDGET SECTION
            ================================================================== */}
        <section className="liv-budget-section" aria-labelledby="budget-section-title">
          <div className="liv-budget-header">
            <span className="liv-port-eyebrow">• TRANSPARENT HOME INTERIOR PACKAGES</span>
            <h2 id="budget-section-title" className="liv-budget-title">
              Designs for Every Budget
            </h2>
            <p className="liv-budget-subtitle">
              Get your dream home today. Let our interior architects help you calculate exact square-foot
              costs with zero post-handover surprises.
            </p>
          </div>

          <div className="liv-budget-cards-grid">
            {BUDGET_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`liv-budget-card ${tier.isPopular ? 'popular' : ''}`}
              >
                {tier.isPopular && (
                  <span className="liv-budget-pill-popular">★ {tier.badge}</span>
                )}

                <h3 className="liv-budget-tier-name">{tier.name}</h3>
                <div className="liv-budget-price">{tier.priceStarting}</div>
                <p className="liv-budget-recom">{tier.recommendedFor}</p>

                <ul className="liv-budget-features-list">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="liv-budget-feature-item">
                      <CheckCircle2 size={15} className="liv-budget-feature-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="liv-budget-meta-badges">
                  <div className="liv-budget-badge-row">
                    <Clock size={14} />
                    <span>{tier.timeline}</span>
                  </div>
                  <div className="liv-budget-badge-row">
                    <ShieldCheck size={14} />
                    <span>{tier.warranty}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openInquiry(`Interested in ${tier.name} (${tier.priceStarting})`)}
                  className="liv-btn-primary"
                  style={{ width: '100%' }}
                >
                  <span>Select {tier.name.split('/')[0]}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            6. LEAD ESTIMATE BANNER
            ================================================================== */}
        <section className="liv-estimate-banner" aria-label="Design Consultation Banner">
          <div className="liv-estimate-content">
            <span className="liv-port-eyebrow" style={{ color: '#D4A75E' }}>
              • START YOUR INTERIOR JOURNEY
            </span>
            <h2 className="liv-estimate-h2">Want to design a home like this?</h2>
            <p className="liv-estimate-p">
              Book a consultation with our senior interior architects to get a customized 3D design concept,
              precise floor-plan space optimization, and an instant transparent quote.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openInquiry('Portfolio Free Quote Request')}
            className="liv-estimate-cta-btn"
          >
            <span>Get Free Estimate</span>
            <ArrowRight size={16} />
          </button>
        </section>

        {/* ==================================================================
            7. FAQ ACCORDION SECTION (AUTHENTIC LIVSPACE QUESTIONS)
            ================================================================== */}
        <section className="liv-faq-section" aria-labelledby="faq-section-title">
          <div className="liv-faq-header">
            <span className="liv-port-eyebrow">• EVERYTHING YOU NEED TO KNOW</span>
            <h2 id="faq-section-title" className="liv-faq-title">
              FAQ About Mitjen Portfolio
            </h2>
            <p className="liv-faq-subtitle">
              Common questions about our delivered projects, warranties, design process, and custom pricing.
            </p>
          </div>

          <div className="liv-faq-list">
            {PORTFOLIO_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div key={idx} className={`liv-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="liv-faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className="liv-faq-chevron" />
                  </button>

                  {isOpen && <div className="liv-faq-answer">{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ==================================================================
          8. INTERACTIVE GALLERY LIGHTBOX MODAL
          ================================================================== */}
      {selectedProject && (
        <div
          className="liv-lightbox-backdrop"
          onClick={handleCloseGallery}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="liv-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseGallery}
              className="liv-lightbox-close-btn"
              aria-label="Close Gallery Modal"
            >
              <X size={20} />
            </button>

            {/* Main Stage Media */}
            <div className="liv-lightbox-main-media">
              <img
                src={selectedProject.galleryImages[activeImageIndex]?.url || selectedProject.coverImage}
                alt={selectedProject.galleryImages[activeImageIndex]?.caption || selectedProject.title}
                className="liv-lightbox-main-img"
              />
              <span className="liv-lightbox-room-pill">
                {selectedProject.galleryImages[activeImageIndex]?.room || 'Project Space'} (
                {activeImageIndex + 1} of {selectedProject.galleryImages.length})
              </span>
            </div>

            {/* Thumbnails Row */}
            <div className="liv-lightbox-thumbs-row">
              {selectedProject.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`liv-lightbox-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                >
                  <img src={img.url} alt={img.caption} />
                </button>
              ))}
            </div>

            {/* Info Pane */}
            <div className="liv-lightbox-info-pane">
              <h3 className="liv-lightbox-title">{selectedProject.title}</h3>
              <div className="liv-lightbox-sub">
                {selectedProject.society} · {selectedProject.location} | {selectedProject.bhk} (
                {selectedProject.carpetArea})
              </div>
              <p className="liv-lightbox-desc">{selectedProject.description}</p>

              <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                Key Design Highlights
              </h4>
              <div className="liv-lightbox-highlights">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="liv-highlight-point">
                    <CheckCircle2 size={14} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {selectedProject.specifications && selectedProject.specifications.length > 0 && (
                <div className="liv-lightbox-specs-wrap">
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', color: 'var(--liv-ink)' }}>
                    Architectural Specifications
                  </h4>
                  <div className="liv-lightbox-specs-grid">
                    {selectedProject.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="liv-lightbox-spec-cell">
                        <span className="liv-spec-cell-label">{spec.label}</span>
                        <span className="liv-spec-cell-val">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="liv-lightbox-cta-bar">
                <button
                  type="button"
                  onClick={() => {
                    openInquiry(`Custom design for ${selectedProject.title}`);
                    handleCloseGallery();
                  }}
                  className="liv-btn-primary"
                  style={{ width: 'auto', padding: '10px 24px' }}
                >
                  <span>Get This Design for My Home</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivspacePortfolio;
