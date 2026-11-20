import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import './HomeEditorialShowcase.css';

interface ShowcaseItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  location: string;
  image: string;
  spanType: 'panoramic-hero' | 'editorial-portrait' | 'editorial-landscape' | 'full-monument';
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'mitjen-racecourse-pu-paint',
    slug: 'mitjen-racecourse-pu-paint',
    number: '01',
    title: 'Racecourse Residence PU Paint',
    category: 'Residential Architecture',
    location: 'Racecourse Road, Coimbatore',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential1.jpeg',
    spanType: 'panoramic-hero',
  },
  {
    id: 'mitjen-corporate',
    slug: 'mitjen-corporate',
    number: '02',
    title: 'Mitjen Corporate Headquarters',
    category: 'Corporate Architecture',
    location: 'Coimbatore, Tamil Nadu',
    image: '/images/projects/Mitjen-Corporate/Corporate1.jpeg',
    spanType: 'editorial-portrait',
  },
  {
    id: 'mitjen-kr-pura-bangalore',
    slug: 'mitjen-kr-pura-bangalore',
    number: '03',
    title: 'KR Puram Commercial Studio',
    category: 'Commercial Architecture',
    location: 'KR Puram, Bangalore',
    image: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial1.jpeg',
    spanType: 'editorial-landscape',
  },
  {
    id: 'sampath-villa',
    slug: 'sampath-villa',
    number: '04',
    title: 'Sampath Villa',
    category: 'Residential Architecture',
    location: 'Kalapatti, Coimbatore',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
    spanType: 'full-monument',
  },
];

export const HomeEditorialShowcase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="home-editorial-showcase-section" aria-label="Selected Architectural Works">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="home-editorial-header-container">
        <div className="home-editorial-header-row">
          <div className="home-editorial-header-left">
            <span className="home-editorial-kicker">SELECTED PORTFOLIO</span>
            <h2 className="home-editorial-heading">
              SPACES SCULPTED WITH PRECISION, MATERIAL HONESTY, AND ARCHITECTURAL PERMANENCE.
            </h2>
          </div>
          <div className="home-editorial-header-right">
            <p className="home-editorial-statement">
              From monumental double-height residences to high-performance corporate command centers,
              we design and build spaces that merge bespoke joinery with spatial clarity.
            </p>
            <Link to="/projects" className="home-editorial-header-link">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. LARGE-SCALE EDITORIAL IMAGE GALLERY                        */}
      {/* ------------------------------------------------------------- */}
      <div className="home-editorial-gallery-container">
        {/* Top Panoramic Hero: Racecourse Residence */}
        <article
          className="home-editorial-card panoramic-hero"
          onClick={() => navigate(`/projects/${SHOWCASE_ITEMS[0].slug}`)}
          role="button"
          tabIndex={0}
          aria-label={`View ${SHOWCASE_ITEMS[0].title}`}
        >
          <div className="home-editorial-media">
            <img
              src={SHOWCASE_ITEMS[0].image}
              alt={SHOWCASE_ITEMS[0].title}
              className="home-editorial-img"
              loading="eager"
            />
            <div className="home-editorial-overlay">
              <div className="home-editorial-card-content">
                <span className="home-editorial-badge">
                  {SHOWCASE_ITEMS[0].number} / {SHOWCASE_ITEMS[0].category}
                </span>
                <h3 className="home-editorial-card-title">{SHOWCASE_ITEMS[0].title}</h3>
                <span className="home-editorial-card-loc">{SHOWCASE_ITEMS[0].location}</span>
              </div>
              <div className="home-editorial-arrow-btn">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </article>

        {/* Asymmetric Split: Corporate HQ & Commercial Studio */}
        <div className="home-editorial-split-row">
          <article
            className="home-editorial-card editorial-portrait"
            onClick={() => navigate(`/projects/${SHOWCASE_ITEMS[1].slug}`)}
            role="button"
            tabIndex={0}
            aria-label={`View ${SHOWCASE_ITEMS[1].title}`}
          >
            <div className="home-editorial-media">
              <img
                src={SHOWCASE_ITEMS[1].image}
                alt={SHOWCASE_ITEMS[1].title}
                className="home-editorial-img"
                loading="lazy"
              />
              <div className="home-editorial-overlay">
                <div className="home-editorial-card-content">
                  <span className="home-editorial-badge">
                    {SHOWCASE_ITEMS[1].number} / {SHOWCASE_ITEMS[1].category}
                  </span>
                  <h3 className="home-editorial-card-title">{SHOWCASE_ITEMS[1].title}</h3>
                  <span className="home-editorial-card-loc">{SHOWCASE_ITEMS[1].location}</span>
                </div>
                <div className="home-editorial-arrow-btn">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </article>

          <article
            className="home-editorial-card editorial-landscape"
            onClick={() => navigate(`/projects/${SHOWCASE_ITEMS[2].slug}`)}
            role="button"
            tabIndex={0}
            aria-label={`View ${SHOWCASE_ITEMS[2].title}`}
          >
            <div className="home-editorial-media">
              <img
                src={SHOWCASE_ITEMS[2].image}
                alt={SHOWCASE_ITEMS[2].title}
                className="home-editorial-img"
                loading="lazy"
              />
              <div className="home-editorial-overlay">
                <div className="home-editorial-card-content">
                  <span className="home-editorial-badge">
                    {SHOWCASE_ITEMS[2].number} / {SHOWCASE_ITEMS[2].category}
                  </span>
                  <h3 className="home-editorial-card-title">{SHOWCASE_ITEMS[2].title}</h3>
                  <span className="home-editorial-card-loc">{SHOWCASE_ITEMS[2].location}</span>
                </div>
                <div className="home-editorial-arrow-btn">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Monumental Villa Showcase: Sampath Villa */}
        <article
          className="home-editorial-card full-monument"
          onClick={() => navigate(`/projects/${SHOWCASE_ITEMS[3].slug}`)}
          role="button"
          tabIndex={0}
          aria-label={`View ${SHOWCASE_ITEMS[3].title}`}
        >
          <div className="home-editorial-media">
            <img
              src={SHOWCASE_ITEMS[3].image}
              alt={SHOWCASE_ITEMS[3].title}
              className="home-editorial-img"
              loading="lazy"
            />
            <div className="home-editorial-overlay">
              <div className="home-editorial-card-content">
                <span className="home-editorial-badge">
                  {SHOWCASE_ITEMS[3].number} / {SHOWCASE_ITEMS[3].category}
                </span>
                <h3 className="home-editorial-card-title">{SHOWCASE_ITEMS[3].title}</h3>
                <span className="home-editorial-card-loc">{SHOWCASE_ITEMS[3].location}</span>
              </div>
              <div className="home-editorial-arrow-btn">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. STUDIO PHILOSOPHY STRIP & WORK CTA                         */}
      {/* ------------------------------------------------------------- */}
      <div className="home-editorial-footer-container">
        <div className="home-editorial-footer-box">
          <p className="home-editorial-footer-quote">
            &ldquo;We view architecture not as decorative embellishment, but as the rigorous
            orchestration of space, proportion, light, and enduring materiality.&rdquo;
          </p>
          <Link to="/projects" className="home-editorial-footer-btn">
            <span>Explore Complete Work Portfolio</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeEditorialShowcase;
