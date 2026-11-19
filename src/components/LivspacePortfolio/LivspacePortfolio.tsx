import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
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
  PackageCheck,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Grid,
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
  const navigate = useNavigate();
  const { openInquiry } = useInquiry();
  const gridSectionRef = useRef<HTMLDivElement>(null);

  // Filter States
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeScope, setActiveScope] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State (Project Specific Materials & Photography)
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'materials' | 'gallery'>('materials');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [galleryViewMode, setGalleryViewMode] = useState<'stage' | 'grid'>('grid'); // Default to grid view
  const [imageLoaded, setImageLoaded] = useState<boolean>(true);

  const filmstripRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  // Preload all high-res photography of the selected project immediately upon opening
  useEffect(() => {
    if (selectedProject?.galleryImages) {
      selectedProject.galleryImages.forEach((img) => {
        const p = new Image();
        p.src = img.url;
      });
    }
  }, [selectedProject]);

  // Auto-scroll the filmstrip to ensure the active space thumbnail is always visible in view
  useEffect(() => {
    if (activeModalTab === 'gallery' && galleryViewMode === 'stage' && filmstripRef.current) {
      const activeThumb = filmstripRef.current.querySelector(
        '.liv-gallery-filmstrip-thumb.active'
      ) as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeImageIndex, activeModalTab, galleryViewMode]);

  // Touch Swipe Handlers for Mobile & Tablet Walkthrough
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartXRef.current;
    const dy = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }
  };

  // FAQ Accordion State (first item open by default)
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Prevent background scroll bleed & stop Lenis smooth scroller when modal is open
  useEffect(() => {
    if (!selectedProject) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar width to prevent horizontal page jitter
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Pause global Lenis smooth scroller so wheel events inside modal do not move the background
    const win = window as any;
    if (win.lenisInstance && typeof win.lenisInstance.stop === 'function') {
      win.lenisInstance.stop();
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;

      if (win.lenisInstance && typeof win.lenisInstance.start === 'function') {
        win.lenisInstance.start();
      }
    };
  }, [selectedProject]);

  // Global ESC key listener & keyboard navigation to exit or navigate modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      } else if (activeModalTab === 'gallery' && galleryViewMode === 'stage') {
        if (e.key === 'ArrowLeft') {
          setImageLoaded(false);
          setActiveImageIndex((prev) =>
            prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
          );
        } else if (e.key === 'ArrowRight') {
          setImageLoaded(false);
          setActiveImageIndex((prev) =>
            prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, activeModalTab, galleryViewMode]);

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

  // Open Materials Modal (Directly opens the project-specific materials breakdown)
  const handleOpenMaterials = (project: PortfolioProject) => {
    setSelectedProject(project);
    setActiveModalTab('materials');
    setGalleryViewMode('grid');
    setActiveImageIndex(0);
  };

  // Open Gallery directly in Grid View
  const handleOpenGalleryTab = (project: PortfolioProject) => {
    setSelectedProject(project);
    setActiveModalTab('gallery');
    setGalleryViewMode('grid');
    setActiveImageIndex(0);
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    setImageLoaded(false);
    setActiveImageIndex((prev) =>
      prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    setImageLoaded(false);
    setActiveImageIndex((prev) =>
      prev === selectedProject.galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="liv-port-root" id="livspace-portfolio-section">
      <div className="liv-port-container">
        {/* ==================================================================
            1. REFINED COMPACT HERO HEADER
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
                Meticulously crafted with verified materials: Tarkett &amp; Armstrong flooring, Saint-Gobain ceilings, Century &amp; Greenply woodwork, and Philips &amp; Havells lighting.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. UNIFIED COMPACT ARCHITECTURAL CONTROL BAR
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
            Featuring "View Materials" as requested by user.
            ================================================================== */}
        <section className="liv-projects-grid" aria-label="Portfolio Residences">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <article key={project.id} className="liv-arch-card">
                {/* Media Presentation — Compact 16:9 Letterbox */}
                <div
                  className="liv-card-media"
                  onClick={() => handleOpenMaterials(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View materials used in ${project.title}`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="liv-arch-img"
                    loading="lazy"
                  />
                  <div className="liv-card-media-overlay" />

                  {/* Top Badges */}
                  <span
                    className="liv-badge-photos"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGalleryTab(project);
                    }}
                    title="Click to view space photography"
                  >
                    <ImageIcon size={10} />
                    {project.galleryImages.length} Photos
                  </span>

                  <span className="liv-badge-status">
                    <CheckCircle2 size={10} />
                    {project.type.toUpperCase()}
                  </span>

                  {/* Hover indicator: "View Materials" */}
                  <div className="liv-media-hover-indicator">
                    <Layers size={12} />
                    <span>View Materials</span>
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

                  <h2 className="liv-arch-title" onClick={() => handleOpenMaterials(project)}>
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

                  {/* Compact Actions Row — "View Materials" prominent */}
                  <div className="liv-arch-actions">
                    <button
                      type="button"
                      onClick={() => handleOpenMaterials(project)}
                      className="liv-btn-view-materials"
                      aria-label={`View materials used in ${project.title}`}
                    >
                      <Layers size={12} />
                      <span>View Materials</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigate('/contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
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
            4. COMPACT CRAFTSMANSHIP & MATERIALS SECTION
            ================================================================== */}
        <section className="liv-materials-section" aria-labelledby="materials-section-title">
          <div className="liv-section-header">
            <span className="liv-port-eyebrow">• VERIFIED ATELIER SPECIFICATIONS</span>
            <h2 id="materials-section-title" className="liv-section-title">
              Materials Used &amp; Brand Partners
            </h2>
            <p className="liv-section-sub">
              Direct architectural grade specifications used across Prithvi, Sampath, Mr. Mahesh – Pilot, and Deepak residences.
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
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="liv-consult-cta"
          >
            <span>Book Design Consultation</span>
            <ArrowRight size={13} />
          </button>
        </section>

        {/* ==================================================================
            6. REFINED COMPACT FAQ SECTION
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
          7. ADVANCED PROJECT MATERIALS & MULTI-IMAGE GALLERY MODAL
          Rendered via React Portal directly into document.body to ensure
          it sits ABOVE all page headers, navbars & stacking contexts.
          ================================================================== */}
      {selectedProject &&
        createPortal(
          <div
            className="liv-lightbox-backdrop"
            onClick={handleCloseModal}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => {
              if (e.target === e.currentTarget) {
                e.preventDefault();
              }
            }}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={`liv-lightbox-dialog ${activeModalTab === 'gallery' && galleryViewMode === 'stage' ? 'stage-mode' : ''
                }`}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Modal Header Bar - Ultra-Compact */}
              <div className="liv-modal-header-deck">
                <div className="liv-modal-header-left">
                  <div className="liv-modal-title-row">
                    <h3 className="liv-modal-title">{selectedProject.title}</h3>
                    <span className="liv-modal-bhk-tag">{selectedProject.bhk}</span>
                  </div>
                  <div className="liv-modal-address-line">
                    <MapPin size={10} />
                    <span>
                      {selectedProject.society} · {selectedProject.location}, {selectedProject.city}
                    </span>
                  </div>
                </div>

                {/* Modal Right Actions: Tabs + Obvious Close Button */}
                <div className="liv-modal-header-actions">
                  <div className="liv-modal-tabs-group" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeModalTab === 'materials'}
                      onClick={() => setActiveModalTab('materials')}
                      className={`liv-modal-tab-btn ${activeModalTab === 'materials' ? 'active' : ''}`}
                    >
                      <Layers size={11} />
                      <span>Materials</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeModalTab === 'gallery'}
                      onClick={() => {
                        setActiveModalTab('gallery');
                        setGalleryViewMode('grid');
                      }}
                      className={`liv-modal-tab-btn ${activeModalTab === 'gallery' ? 'active' : ''}`}
                    >
                      <Grid size={11} />
                      <span>Photos ({selectedProject.galleryImages.length})</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="liv-header-close-btn"
                    title="Close (ESC)"
                    aria-label="Close Project Modal"
                  >
                    <X size={13} />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: PROJECT SPECIFIC MATERIALS USED */}
              {activeModalTab === 'materials' && (
                <div className="liv-modal-materials-body">
                  {/* Project Location & Identification Table */}
                  <div className="liv-modal-proj-identity">
                    <div className="liv-identity-cell">
                      <span className="liv-identity-label">Project / Space</span>
                      <span className="liv-identity-val">{selectedProject.title}</span>
                    </div>
                    <div className="liv-identity-cell">
                      <span className="liv-identity-label">City</span>
                      <span className="liv-identity-val">{selectedProject.city}</span>
                    </div>
                    <div className="liv-identity-cell">
                      <span className="liv-identity-label">Area / Locality</span>
                      <span className="liv-identity-val">{selectedProject.location}</span>
                    </div>
                    <div className="liv-identity-cell">
                      <span className="liv-identity-label">Full Address</span>
                      <span className="liv-identity-val">{selectedProject.fullAddress}</span>
                    </div>
                  </div>

                  {/* Main 5 Materials Used Breakdown */}
                  <div className="liv-modal-mat-section">
                    <div className="liv-modal-mat-sec-title-row">
                      <h4 className="liv-modal-mat-sec-title">Materials Used &amp; Brand Finishes</h4>
                      <span className="liv-modal-mat-sec-sub">Verified architectural specifications</span>
                    </div>

                    <div className="liv-modal-materials-grid">
                      {MATERIAL_SPECIFICATIONS.map((mat) => (
                        <div key={mat.id} className="liv-modal-mat-card">
                          <div className="liv-modal-mat-card-header">
                            <span className="liv-modal-mat-badge">{mat.number}</span>
                            <h5 className="liv-modal-mat-cat-title">{mat.title}</h5>
                          </div>

                          <div className="liv-modal-mat-content">
                            <div className="liv-modal-mat-field">
                              <span className="liv-modal-field-lbl">Materials:</span>
                              <div className="liv-modal-chips-wrap">
                                {mat.materials.map((m, mIdx) => (
                                  <span key={mIdx} className="liv-modal-chip mat">{m}</span>
                                ))}
                              </div>
                            </div>

                            <div className="liv-modal-mat-field">
                              <span className="liv-modal-field-lbl">Brand / Finish:</span>
                              <div className="liv-modal-chips-wrap">
                                {mat.brandFinishDetails.map((b, bIdx) => (
                                  <span key={bIdx} className="liv-modal-chip brand">{b}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Design Highlights of the Project */}
                  <div className="liv-modal-highlights-box">
                    <h5 className="liv-modal-highlights-title">Key Architectural Highlights:</h5>
                    <div className="liv-modal-highlights-grid">
                      {selectedProject.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="liv-modal-highlight-item">
                          <CheckCircle2 size={13} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Footer CTA */}
                  <div className="liv-modal-footer">
                    <button
                      type="button"
                      onClick={() => {
                        handleCloseModal();
                        navigate('/contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="liv-btn-inquire"
                    >
                      <span>Inquire About This Specification</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: ADVANCED MULTI-IMAGE PHOTOGRAPHY GALLERY */}
              {activeModalTab === 'gallery' && (
                <div className="liv-modal-gallery-body">
                  {galleryViewMode === 'stage' ? (
                    /* --- STAGE WALKTHROUGH VIEW --- */
                    <div className="liv-gallery-stage-view">
                      {/* Stage Screen with Constrained Height & Floating Nav Chevrons */}
                      <div
                        className="liv-gallery-stage-media"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                      >
                        {/* Atmospheric Ambient Glow behind image matching website palette */}
                        <div
                          className="liv-gallery-stage-ambient-bg"
                          style={{
                            backgroundImage: `url("${selectedProject.galleryImages[activeImageIndex]?.url || selectedProject.coverImage
                              }")`,
                          }}
                        />

                        {/* Framed Architectural Photo Display */}
                        <div className="liv-gallery-photo-mount">
                          <img
                            key={activeImageIndex}
                            src={selectedProject.galleryImages[activeImageIndex]?.url || selectedProject.coverImage}
                            alt={selectedProject.galleryImages[activeImageIndex]?.caption || selectedProject.title}
                            className={`liv-gallery-stage-img ${imageLoaded ? 'loaded' : ''}`}
                            onLoad={() => setImageLoaded(true)}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = selectedProject.coverImage;
                            }}
                          />

                          {/* Photo Counter Pill inside mount */}
                          <div className="liv-gallery-counter-badge">
                            <ImageIcon size={11} />
                            <span>
                              {activeImageIndex + 1} of {selectedProject.galleryImages.length}
                            </span>
                          </div>
                        </div>

                        {/* Left & Right Circular Nav Chevrons */}
                        {selectedProject.galleryImages.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={handlePrevImage}
                              className="liv-gallery-nav-btn prev"
                              aria-label="Previous photograph"
                              title="Previous (Left Arrow / Swipe Right)"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={handleNextImage}
                              className="liv-gallery-nav-btn next"
                              aria-label="Next photograph"
                              title="Next (Right Arrow / Swipe Left)"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Room Title, Architectural Description & Grid Switcher Bar */}
                      <div className="liv-gallery-caption-bar">
                        <div className="liv-gallery-caption-text">
                          <div className="liv-gallery-caption-header">
                            <h4 className="liv-gallery-room-title">
                              {selectedProject.galleryImages[activeImageIndex]?.room || 'Architectural Space'}
                            </h4>
                            <span className="liv-gallery-room-pill">
                              Verified Interior Space
                            </span>
                          </div>
                          <p className="liv-gallery-room-desc">
                            {selectedProject.galleryImages[activeImageIndex]?.caption || selectedProject.description}
                          </p>
                        </div>

                        <div className="liv-gallery-controls-right">
                          <button
                            type="button"
                            onClick={() => setGalleryViewMode('grid')}
                            className="liv-gallery-toggle-btn active"
                            title="View all spaces in grid layout"
                          >
                            <Grid size={13} />
                            <span>All Spaces Grid ({selectedProject.galleryImages.length})</span>
                          </button>
                        </div>
                      </div>

                      {/* Filmstrip / Thumbnail Dock (Always visible on screen) */}
                      <div ref={filmstripRef} className="liv-gallery-filmstrip">
                        {selectedProject.galleryImages.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (idx !== activeImageIndex) {
                                setImageLoaded(false);
                                setActiveImageIndex(idx);
                              }
                            }}
                            className={`liv-gallery-filmstrip-thumb ${idx === activeImageIndex ? 'active' : ''}`}
                            aria-label={`View photo ${idx + 1}: ${img.room}`}
                          >
                            <img src={img.url} alt={img.caption} loading="lazy" />
                            <div className="liv-filmstrip-overlay">
                              <span className="liv-filmstrip-room-label">{img.room}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* --- REFERENCE MOSAIC COLLAGE GRID (NO CONTENT BELOW IMAGES) --- */
                    <div className="liv-gallery-grid-view">
                      <div className="liv-gallery-grid-toolbar">
                        <div className="liv-grid-toolbar-left">
                          <span className="liv-gallery-grid-count">
                            {selectedProject.galleryImages.length} Verified Interior Spaces
                          </span>
                        </div>
                        <div className="liv-grid-toolbar-right">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveImageIndex(0);
                              setGalleryViewMode('stage');
                            }}
                            className="liv-gallery-toggle-btn"
                            title="Start cinematic walkthrough"
                          >
                            <ImageIcon size={12} />
                            <span>Walkthrough</span>
                          </button>
                        </div>
                      </div>

                      {/* Exact Asymmetric Collage Mosaic Grid — Zero Text Under Images */}
                      <div className="liv-gallery-mosaic-grid">
                        {selectedProject.galleryImages.map((img, idx) => (
                          <div
                            key={idx}
                            className={`liv-mosaic-item liv-mosaic-item-${idx + 1}`}
                            onClick={() => {
                              setActiveImageIndex(idx);
                              setGalleryViewMode('stage');
                            }}
                            role="button"
                            tabIndex={0}
                            title={`${img.room} — Click to inspect`}
                          >
                            <img
                              src={img.url}
                              alt={img.room}
                              className="liv-mosaic-img"
                              loading="lazy"
                            />
                            <div className="liv-mosaic-overlay">
                              <span className="liv-mosaic-room-pill">{img.room}</span>
                              <span className="liv-mosaic-inspect-icon">
                                <Eye size={13} />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Compact Exit Bar */}
                      <div className="liv-gallery-bottom-bar">
                        <span className="liv-gallery-esc-hint">Tip: Press ESC or click outside anywhere to close</span>
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="liv-gallery-close-pill"
                        >
                          <X size={12} />
                          <span>Close Screen</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default LivspacePortfolio;
