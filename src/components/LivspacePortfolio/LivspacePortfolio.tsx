import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Eye,
  X,
  MapPin,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { useInquiry } from '../../context/useInquiry';
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_FAQS,
  MATERIAL_SPECIFICATIONS,
  PortfolioProject,
} from '../../data/livspacePortfolioData';
import './LivspacePortfolio.css';

export const LivspacePortfolio: React.FC = () => {
  const { openInquiry } = useInquiry();
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [activeFilter, setActiveFilter] = useState<string>('All');
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

  // Primary filter options: All, Coimbatore, Bangalore, Villas
  const filterTabs = [
    { id: 'All', label: 'All Residences', count: PORTFOLIO_PROJECTS.length },
    {
      id: 'Coimbatore',
      label: 'Coimbatore',
      count: PORTFOLIO_PROJECTS.filter((p) => p.city === 'Coimbatore').length,
    },
    {
      id: 'Bangalore',
      label: 'Bangalore',
      count: PORTFOLIO_PROJECTS.filter((p) => p.city === 'Bangalore').length,
    },
    {
      id: 'Villa',
      label: 'Villas',
      count: PORTFOLIO_PROJECTS.filter((p) => p.bhk.includes('Villa')).length,
    },
  ];

  // Scope tags for targeted interior space filtering
  const scopeOptions = [
    'All',
    'Living Room',
    'Dining Area',
    'Master Bedroom',
    'Kitchen',
    'Private Study',
  ];

  // Filtered Projects Computation (Strictly verified authentic residences)
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((p) => {
      // Primary category filter
      if (activeFilter === 'Coimbatore' && p.city !== 'Coimbatore') return false;
      if (activeFilter === 'Bangalore' && p.city !== 'Bangalore') return false;
      if (activeFilter === 'Villa' && !p.bhk.includes('Villa')) return false;

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
  }, [activeFilter, activeScope, searchQuery]);

  // Open Lightbox
  const handleOpenGallery = (project: PortfolioProject) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const handleCloseGallery = () => {
    setSelectedProject(null);
  };

  return (
    <div className="liv-port-root" id="livspace-portfolio-section">
      <div className="liv-port-container">
        {/* ==================================================================
            1. REFINED COMPACT HERO HEADER
            Clean architectural atelier introduction without bulky cards.
            ================================================================== */}
        <section className="liv-port-hero" aria-labelledby="portfolio-main-title">
          <div className="liv-port-hero-inner">
            <div className="liv-port-hero-content">
              <span className="liv-port-eyebrow">
                <Sparkles size={12} className="liv-eyebrow-icon" />
                CURATED RESIDENTIAL ATELIER
              </span>
              <h1 id="portfolio-main-title" className="liv-port-h1">
                Completed Residences &amp; Spaces
              </h1>
              <p className="liv-port-subtitle">
                Authentic turnkey client residences executed across Coimbatore and Bangalore.
                Meticulously crafted with tailored timber joinery, multi-layer Italian finishes, and bespoke lighting.
              </p>
            </div>

            {/* Compact Key Architectural Metrics */}
            <div className="liv-hero-metrics">
              <div className="liv-metric-item">
                <span className="liv-metric-val">4</span>
                <span className="liv-metric-lbl">Residences</span>
              </div>
              <div className="liv-metric-divider" />
              <div className="liv-metric-item">
                <span className="liv-metric-val">10-Yr</span>
                <span className="liv-metric-lbl">Warranty</span>
              </div>
              <div className="liv-metric-divider" />
              <div className="liv-metric-item">
                <span className="liv-metric-val">100%</span>
                <span className="liv-metric-lbl">Turnkey</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. UNIFIED COMPACT ARCHITECTURAL CONTROL BAR
            Streamlined into a single cohesive control deck (Pills + Search).
            ================================================================== */}
        <div ref={gridSectionRef} className="liv-control-bar">
          <div className="liv-control-main-row">
            {/* Primary Category Filter Tabs */}
            <div className="liv-tabs-group" role="tablist" aria-label="Filter residences by region or typology">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === tab.id}
                  className={`liv-tab-pill ${activeFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  <span>{tab.label}</span>
                  <span className="liv-tab-badge">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Compact Search Box */}
            <div className="liv-search-box">
              <Search size={13} className="liv-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search residence, locality, or space..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="liv-search-field"
                aria-label="Search residential portfolio"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="liv-search-clear"
                  aria-label="Clear search"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          </div>

          {/* Sub-row: Space tags & Live counter */}
          <div className="liv-control-sub-row">
            <div className="liv-scope-strip">
              <span className="liv-scope-strip-label">
                <SlidersHorizontal size={11} />
                Spaces:
              </span>
              {scopeOptions.map((scope) => (
                <button
                  key={scope}
                  type="button"
                  className={`liv-scope-tag ${activeScope === scope ? 'active' : ''}`}
                  onClick={() => setActiveScope(scope)}
                >
                  {scope}
                </button>
              ))}
            </div>

            <span className="liv-results-badge">
              {filteredProjects.length} of {PORTFOLIO_PROJECTS.length} Residences
            </span>
          </div>
        </div>

        {/* ==================================================================
            3. ULTRA-COMPACT ARCHITECTURAL PROJECTS GRID
            Compact height, 16:9 cinematic letterbox, sleek specs strip.
            ================================================================== */}
        <section className="liv-projects-grid" aria-label="Portfolio Residences">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article key={project.id} className="liv-arch-card">
                {/* Media Presentation — Compact 16:9 Letterbox */}
                <div
                  className="liv-card-media"
                  onClick={() => handleOpenGallery(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo gallery for ${project.title}`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="liv-arch-img"
                    loading="lazy"
                  />
                  <div className="liv-card-media-overlay" />

                  {/* Top Badges */}
                  <span className="liv-badge-photos">
                    <Layers size={10} />
                    {project.galleryImages.length} Photos
                  </span>

                  <span className="liv-badge-status">
                    <CheckCircle2 size={10} />
                    {project.type.toUpperCase()}
                  </span>

                  {/* Quick-view pill on hover */}
                  <div className="liv-media-hover-indicator">
                    <Eye size={13} />
                    <span>View Gallery</span>
                  </div>
                </div>

                {/* Compact Card Body */}
                <div className="liv-arch-body">
                  <div className="liv-arch-meta-header">
                    <span className="liv-arch-loc-tag">
                      <MapPin size={10} />
                      {project.city}
                    </span>
                    <span className="liv-meta-separator">•</span>
                    <span className="liv-arch-bhk-tag">{project.bhk}</span>
                  </div>

                  <h2 className="liv-arch-title" onClick={() => handleOpenGallery(project)}>
                    {project.title}
                  </h2>

                  <p className="liv-arch-address">
                    {project.society} · {project.location}
                  </p>

                  {/* Ultra-Compact Architectural Specs Bar (Single-Row, NO PRICING) */}
                  <div className="liv-arch-specs-row">
                    <div className="liv-spec-col">
                      <span className="liv-spec-kicker">Area</span>
                      <span className="liv-spec-data">{project.carpetArea}</span>
                    </div>

                    <div className="liv-spec-col">
                      <span className="liv-spec-kicker">Spaces</span>
                      <span className="liv-spec-data" title={project.scopeTags.join(', ')}>
                        {project.scopeTags.slice(0, 2).join(', ')}
                        {project.scopeTags.length > 2 ? ' +' : ''}
                      </span>
                    </div>

                    <div className="liv-spec-col">
                      <span className="liv-spec-kicker">Handover</span>
                      <span className="liv-spec-data">{project.turnaround}</span>
                    </div>
                  </div>

                  {/* Compact Actions Row */}
                  <div className="liv-arch-actions">
                    <button
                      type="button"
                      onClick={() => handleOpenGallery(project)}
                      className="liv-btn-view-gallery"
                      aria-label={`Open gallery for ${project.title}`}
                    >
                      <Eye size={12} />
                      <span>Photos ({project.galleryImages.length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openInquiry(`Architectural Consultation for ${project.title} (${project.society}, ${project.city})`)
                      }
                      className="liv-btn-inquire"
                      aria-label={`Inquire about ${project.title}`}
                    >
                      <span>Inquire</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="liv-no-results">
              <h3 className="liv-no-results-title">No residences match your current filters</h3>
              <p className="liv-no-results-desc">
                Try selecting a different space tag or clearing your search keywords.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('All');
                  setActiveScope('All');
                  setSearchQuery('');
                }}
                className="liv-btn-inquire"
                style={{ width: 'auto', margin: '0 auto' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ==================================================================
            4. COMPACT CRAFTSMANSHIP & VERIFIED MATERIALS SECTION
            ================================================================== */}
        <section className="liv-materials-section" aria-labelledby="materials-section-title">
          <div className="liv-section-header">
            <span className="liv-port-eyebrow">• CRAFTSMANSHIP &amp; MATERIALS</span>
            <h2 id="materials-section-title" className="liv-section-title">
              Materials. Precision. Detail.
            </h2>
            <p className="liv-section-sub">
              Industry-leading material partners and master carpentry standards defining our architectural spaces.
            </p>
          </div>

          <div className="liv-materials-grid">
            {MATERIAL_SPECIFICATIONS.map((mat) => (
              <div key={mat.id} className="liv-material-card">
                <div className="liv-mat-top">
                  <span className="liv-mat-num">{mat.number}</span>
                  <div>
                    <h3 className="liv-mat-title">{mat.title}</h3>
                    <p className="liv-mat-sub">{mat.subtitle}</p>
                  </div>
                </div>

                <div className="liv-mat-content">
                  <div className="liv-mat-row">
                    <span className="liv-mat-label">Materials:</span>
                    <div className="liv-mat-tags">
                      {mat.materials.map((m, idx) => (
                        <span key={idx} className="liv-mat-tag">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="liv-mat-row">
                    <span className="liv-mat-label">Brand / Finish:</span>
                    <div className="liv-mat-tags">
                      {mat.brandFinishDetails.map((b, idx) => (
                        <span key={idx} className="liv-mat-tag brand">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {mat.note && <p className="liv-mat-note">{mat.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            5. ARCHITECTURAL CONSULTATION BANNER (NO PRICING/QUOTES)
            ================================================================== */}
        <section className="liv-consult-banner" aria-label="Architectural Design Consultation">
          <div className="liv-consult-content">
            <span className="liv-port-eyebrow" style={{ color: 'var(--liv-gold)' }}>
              • PRIVATE ATELIER CONSULTATION
            </span>
            <h2 className="liv-consult-title">Ready to bring bespoke architecture to your residence?</h2>
            <p className="liv-consult-desc">
              Schedule a design session with our senior architects for floor plan analysis,
              tailored 3D visualizations, and complete turnkey execution planning.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openInquiry('Private Architectural Design Consultation')}
            className="liv-consult-cta"
          >
            <span>Book Design Consultation</span>
            <ArrowRight size={13} />
          </button>
        </section>

        {/* ==================================================================
            6. REFINED COMPACT FAQ SECTION (NO PRICING REFERENCES)
            ================================================================== */}
        <section className="liv-faq-section" aria-labelledby="faq-section-title">
          <div className="liv-section-header">
            <span className="liv-port-eyebrow">• ARCHITECTURAL FAQ</span>
            <h2 id="faq-section-title" className="liv-section-title">
              Frequently Asked Questions
            </h2>
            <p className="liv-section-sub">
              Key information about our delivered projects, craftsmanship standards, warranties, and design process.
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
                    <ChevronDown size={15} className="liv-faq-chevron" />
                  </button>

                  {isOpen && <div className="liv-faq-answer">{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ==================================================================
          7. HIGH-RESOLUTION INTERACTIVE LIGHTBOX MODAL
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
              <X size={16} />
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
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <img src={img.url} alt={img.caption} />
                </button>
              ))}
            </div>

            {/* Info Pane (NO PRICING) */}
            <div className="liv-lightbox-info-pane">
              <div className="liv-lightbox-header-row">
                <div>
                  <h3 className="liv-lightbox-title">{selectedProject.title}</h3>
                  <div className="liv-lightbox-sub">
                    {selectedProject.society} · {selectedProject.location} | {selectedProject.bhk} (
                    {selectedProject.carpetArea})
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    openInquiry(`Inquiry for ${selectedProject.title}`);
                    handleCloseGallery();
                  }}
                  className="liv-btn-inquire"
                  style={{ width: 'auto', padding: '8px 18px', alignSelf: 'flex-start' }}
                >
                  <span>Inquire Design</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <p className="liv-lightbox-desc">{selectedProject.description}</p>

              <div className="liv-lightbox-highlights-section">
                <h4 className="liv-lightbox-sec-heading">Key Design Highlights</h4>
                <div className="liv-lightbox-highlights">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="liv-highlight-point">
                      <CheckCircle2 size={12} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.specifications && selectedProject.specifications.length > 0 && (
                <div className="liv-lightbox-specs-section">
                  <h4 className="liv-lightbox-sec-heading">Architectural Specifications</h4>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivspacePortfolio;
