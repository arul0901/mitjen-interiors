import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import './HomeEditorialShowcase.css';

interface MarqueeImageItem {
  id: string;
  slug: string;
  title: string;
  space: string;
  category: string;
  image: string;
  aspectRatio: 'landscape' | 'portrait' | 'wide';
}

const ROW_1_IMAGES: MarqueeImageItem[] = [
  {
    id: 'm1-1',
    slug: 'mitjen-racecourse-pu-paint',
    title: 'Racecourse Residence',
    space: 'Formal Living Salon',
    category: 'Residential',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential1.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm1-2',
    slug: 'mitjen-corporate',
    title: 'Mitjen Corporate HQ',
    space: 'Atrium Reception',
    category: 'Corporate',
    image: '/images/projects/Mitjen-Corporate/Corporate1.jpeg',
    aspectRatio: 'portrait',
  },
  {
    id: 'm1-3',
    slug: 'mitjen-kr-pura-bangalore',
    title: 'KR Puram Commercial Studio',
    space: 'Experience Center',
    category: 'Commercial',
    image: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial1.jpeg',
    aspectRatio: 'wide',
  },
  {
    id: 'm1-4',
    slug: 'sampath-villa',
    title: 'Sampath Villa',
    space: 'Double-Height Living',
    category: 'Residential',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm1-5',
    slug: 'horizon-architectural-suite',
    title: 'Horizon Architectural Suite',
    space: 'Executive Work Lounge',
    category: 'Corporate',
    image: '/images/projects/04-horizon-office.webp',
    aspectRatio: 'landscape',
  },
  {
    id: 'm1-6',
    slug: 'mitjen-racecourse-pu-paint',
    title: 'Racecourse Residence',
    space: 'Glass Balustrade Staircase',
    category: 'Residential',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential3.jpeg',
    aspectRatio: 'portrait',
  },
  {
    id: 'm1-7',
    slug: 'atelier-design-studio',
    title: 'Atelier Design Gallery',
    space: 'Boutique Gallery Floor',
    category: 'Commercial',
    image: '/images/projects/06-atelier.webp',
    aspectRatio: 'wide',
  },
  {
    id: 'm1-8',
    slug: 'deepak-residence',
    title: 'Deepak Residence',
    space: 'Living Pavilion',
    category: 'Residential',
    image: '/images/projects/image4.jpg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm1-9',
    slug: 'mitjen-corporate',
    title: 'Mitjen Corporate HQ',
    space: 'Executive Boardroom',
    category: 'Corporate',
    image: '/images/projects/Mitjen-Corporate/Corporate3.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm1-10',
    slug: 'serene-residence',
    title: 'Serene Penthouse',
    space: 'Minimalist Salon',
    category: 'Residential',
    image: '/images/projects/01-serene.webp',
    aspectRatio: 'wide',
  },
];

const ROW_2_IMAGES: MarqueeImageItem[] = [
  {
    id: 'm2-1',
    slug: 'mitjen-racecourse-pu-paint',
    title: 'Racecourse Residence',
    space: 'Dining & Formal Lounge',
    category: 'Residential',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm2-2',
    slug: 'mitjen-kr-pura-bangalore',
    title: 'KR Puram Commercial Studio',
    space: 'Entrance Atrium',
    category: 'Commercial',
    image: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial2.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm2-3',
    slug: 'mitjen-corporate',
    title: 'Mitjen Corporate HQ',
    space: 'Open Workstations',
    category: 'Corporate',
    image: '/images/projects/Mitjen-Corporate/Corporate2.jpeg',
    aspectRatio: 'wide',
  },
  {
    id: 'm2-4',
    slug: 'deepak-residence',
    title: 'Deepak Residence',
    space: 'Bespoke Dining Suite',
    category: 'Residential',
    image: '/images/projects/image10.jpg',
    aspectRatio: 'portrait',
  },
  {
    id: 'm2-5',
    slug: 'urban-architecture-pavilion',
    title: 'Urban Architecture Pavilion',
    space: 'Exhibition Hall',
    category: 'Commercial',
    image: '/images/projects/02-urban.webp',
    aspectRatio: 'landscape',
  },
  {
    id: 'm2-6',
    slug: 'mitjen-racecourse-pu-paint',
    title: 'Racecourse Residence',
    space: 'Master Bedroom Suite',
    category: 'Residential',
    image: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential5.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm2-7',
    slug: 'oak-loft-offices',
    title: 'Oak Loft Offices',
    space: 'Advisory Suite',
    category: 'Corporate',
    image: '/images/projects/03-oak-loft.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'm2-8',
    slug: 'mitjen-kr-pura-bangalore',
    title: 'KR Puram Commercial Studio',
    space: 'Material Archive',
    category: 'Commercial',
    image: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial4.jpeg',
    aspectRatio: 'landscape',
  },
  {
    id: 'm2-9',
    slug: 'sampath-villa',
    title: 'Sampath Villa',
    space: 'Courtyard Dining',
    category: 'Residential',
    image: '/images/projects/image14.jpg',
    aspectRatio: 'wide',
  },
  {
    id: 'm2-10',
    slug: 'mitjen-corporate',
    title: 'Mitjen Corporate HQ',
    space: 'Breakout Lounge',
    category: 'Corporate',
    image: '/images/projects/Mitjen-Corporate/Corporate5.jpeg',
    aspectRatio: 'landscape',
  },
];

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

const FEATURED_ITEMS: ShowcaseItem[] = [
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
    <section
      className="home-editorial-showcase-section"
      id="selected-works"
      aria-label="Design in Its Finest Details — Selected Portfolio"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER (Clean White Background & Dark Fonts)       */}
      {/* ------------------------------------------------------------- */}
      <div className="home-editorial-header-container">
        <div className="home-editorial-header-row">
          <div className="home-editorial-header-left">
            <span className="home-editorial-kicker">SELECTED PORTFOLIO</span>
            <h2 className="home-editorial-heading">Design in Its Finest Details</h2>
          </div>
          <div className="home-editorial-header-right">
            <p className="home-editorial-statement">
              Spaces sculpted with precision, material honesty, and architectural permanence.
              From bespoke private residences to state-of-the-art commercial hubs.
            </p>
            <Link to="/projects" className="home-editorial-header-link">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DUAL-ROW CONTINUOUS IMAGE SCROLLING MARQUEE (AS IN VIDEO)  */}
      {/* ------------------------------------------------------------- */}
      <div className="home-marquee-scroll-container" aria-label="Continuous Project Photography Scroll">
        {/* Row 1: Leftward Infinite Scroll */}
        <div className="home-marquee-track-row track-left">
          <div className="home-marquee-track">
            {ROW_1_IMAGES.concat(ROW_1_IMAGES).map((item, idx) => (
              <article
                key={`r1-${idx}`}
                className={`home-marquee-item aspect-${item.aspectRatio}`}
                onClick={() => navigate(`/projects/${item.slug}`)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <div className="home-marquee-media">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.space}`}
                    className="home-marquee-img"
                    loading="lazy"
                  />
                  <div className="home-marquee-overlay">
                    <span className="home-marquee-tag">{item.category}</span>
                    <h4 className="home-marquee-title">{item.title}</h4>
                    <span className="home-marquee-space">{item.space}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Infinite Scroll */}
        <div className="home-marquee-track-row track-right">
          <div className="home-marquee-track">
            {ROW_2_IMAGES.concat(ROW_2_IMAGES).map((item, idx) => (
              <article
                key={`r2-${idx}`}
                className={`home-marquee-item aspect-${item.aspectRatio}`}
                onClick={() => navigate(`/projects/${item.slug}`)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <div className="home-marquee-media">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.space}`}
                    className="home-marquee-img"
                    loading="lazy"
                  />
                  <div className="home-marquee-overlay">
                    <span className="home-marquee-tag">{item.category}</span>
                    <h4 className="home-marquee-title">{item.title}</h4>
                    <span className="home-marquee-space">{item.space}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FEATURED EDITORIAL HERO SPREADS                            */}
      {/* ------------------------------------------------------------- */}
      <div className="home-editorial-gallery-container">
        {/* Top Panoramic Hero: Racecourse Residence */}
        <article
          className="home-editorial-card panoramic-hero"
          onClick={() => navigate(`/projects/${FEATURED_ITEMS[0].slug}`)}
          role="button"
          tabIndex={0}
          aria-label={`View ${FEATURED_ITEMS[0].title}`}
        >
          <div className="home-editorial-media">
            <img
              src={FEATURED_ITEMS[0].image}
              alt={FEATURED_ITEMS[0].title}
              className="home-editorial-img"
              loading="lazy"
            />
            <div className="home-editorial-overlay">
              <div className="home-editorial-card-content">
                <span className="home-editorial-badge">
                  {FEATURED_ITEMS[0].number} / {FEATURED_ITEMS[0].category}
                </span>
                <h3 className="home-editorial-card-title">{FEATURED_ITEMS[0].title}</h3>
                <span className="home-editorial-card-loc">{FEATURED_ITEMS[0].location}</span>
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
            onClick={() => navigate(`/projects/${FEATURED_ITEMS[1].slug}`)}
            role="button"
            tabIndex={0}
            aria-label={`View ${FEATURED_ITEMS[1].title}`}
          >
            <div className="home-editorial-media">
              <img
                src={FEATURED_ITEMS[1].image}
                alt={FEATURED_ITEMS[1].title}
                className="home-editorial-img"
                loading="lazy"
              />
              <div className="home-editorial-overlay">
                <div className="home-editorial-card-content">
                  <span className="home-editorial-badge">
                    {FEATURED_ITEMS[1].number} / {FEATURED_ITEMS[1].category}
                  </span>
                  <h3 className="home-editorial-card-title">{FEATURED_ITEMS[1].title}</h3>
                  <span className="home-editorial-card-loc">{FEATURED_ITEMS[1].location}</span>
                </div>
                <div className="home-editorial-arrow-btn">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </article>

          <article
            className="home-editorial-card editorial-landscape"
            onClick={() => navigate(`/projects/${FEATURED_ITEMS[2].slug}`)}
            role="button"
            tabIndex={0}
            aria-label={`View ${FEATURED_ITEMS[2].title}`}
          >
            <div className="home-editorial-media">
              <img
                src={FEATURED_ITEMS[2].image}
                alt={FEATURED_ITEMS[2].title}
                className="home-editorial-img"
                loading="lazy"
              />
              <div className="home-editorial-overlay">
                <div className="home-editorial-card-content">
                  <span className="home-editorial-badge">
                    {FEATURED_ITEMS[2].number} / {FEATURED_ITEMS[2].category}
                  </span>
                  <h3 className="home-editorial-card-title">{FEATURED_ITEMS[2].title}</h3>
                  <span className="home-editorial-card-loc">{FEATURED_ITEMS[2].location}</span>
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
          onClick={() => navigate(`/projects/${FEATURED_ITEMS[3].slug}`)}
          role="button"
          tabIndex={0}
          aria-label={`View ${FEATURED_ITEMS[3].title}`}
        >
          <div className="home-editorial-media">
            <img
              src={FEATURED_ITEMS[3].image}
              alt={FEATURED_ITEMS[3].title}
              className="home-editorial-img"
              loading="lazy"
            />
            <div className="home-editorial-overlay">
              <div className="home-editorial-card-content">
                <span className="home-editorial-badge">
                  {FEATURED_ITEMS[3].number} / {FEATURED_ITEMS[3].category}
                </span>
                <h3 className="home-editorial-card-title">{FEATURED_ITEMS[3].title}</h3>
                <span className="home-editorial-card-loc">{FEATURED_ITEMS[3].location}</span>
              </div>
              <div className="home-editorial-arrow-btn">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. STUDIO PHILOSOPHY STRIP & WORK CTA                         */}
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
