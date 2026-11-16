import React, { useEffect, useRef } from 'react';
import '../../styles/AmbientArchitecturalLayer.css';

interface AmbientArchitecturalLayerProps {
  activeIndex: number;
}

interface FragmentConfig {
  id: string;
  className: string;
  depthClass: string;
  images: [string, string, string, string];
  labels: [string, string, string, string];
  altText: string;
}

// Curated architectural detail fragments mapped 1:1 to the 4 selected projects:
// Index 0: Vintage Finish Interior (Residential PU & Italian Craft)
// Index 1: Contemporary Residence (KR Pura Villa Millwork & Symmetry)
// Index 2: Agile Tech Workspace (Tidal Park Acoustic Craft & Benching)
// Index 3: Corporate Headquarters (Executive Cladding, Glass & Marble)
// Every plate features a completely unique architectural photograph with zero repeats.
const LEFT_FRAGMENTS: FragmentConfig[] = [
  {
    id: 'l1',
    className: 'ambient-frag-l1',
    depthClass: 'ambient-depth-foreground',
    images: [
      '/images/Residential/Residential3.jpeg',
      '/images/Residential/Residential7.jpeg',
      '/images/Commercial/Commercial2.jpeg',
      '/images/Corporate/Corporate2.jpeg',
    ],
    labels: [
      'FIG. 1.1 · PU JOINERY',
      'FIG. 2.1 · CEILING GRID',
      'FIG. 3.1 · ACOUSTIC BAFFLE',
      'FIG. 4.1 · TIMBER VENEER',
    ],
    altText: 'Architectural joinery detail',
  },
  {
    id: 'l2',
    className: 'ambient-frag-l2',
    depthClass: 'ambient-depth-background',
    images: [
      '/images/Residential/Residential4.jpeg',
      '/images/Residential/Residential4.jpeg',
      '/images/Commercial/Commercial3.jpeg',
      '/images/Corporate/Corporate3.jpeg',
    ],
    labels: [
      'FIG. 1.2 · TIMBER STRATA',
      'FIG. 2.2 · WALL STRATA',
      'FIG. 3.2 · GLAZED INTERFACE',
      'FIG. 4.2 · MINIMAL PROFILE',
    ],
    altText: 'Interior material strata',
  },
  {
    id: 'l3',
    className: 'ambient-frag-l3',
    depthClass: 'ambient-depth-mid',
    images: [
      '/images/Residential/Residential5.jpeg',
      '/images/Residential/Residential3.jpeg',
      '/images/Commercial/Commercial4.jpeg',
      '/images/Corporate/Corporate4.jpeg',
    ],
    labels: [
      'FIG. 1.3 · THRESHOLD',
      'FIG. 2.3 · FLUTED DETAIL',
      'FIG. 3.3 · LINEAR LIGHT',
      'FIG. 4.3 · MARBLE FACING',
    ],
    altText: 'Bespoke architectural transition',
  },
];

const RIGHT_FRAGMENTS: FragmentConfig[] = [
  {
    id: 'r1',
    className: 'ambient-frag-r1',
    depthClass: 'ambient-depth-background',
    images: [
      '/images/Residential/Residential7.jpeg',
      '/images/Residential/Residential5.jpeg',
      '/images/Commercial/Commercial5.jpeg',
      '/images/Corporate/Corporate5.jpeg',
    ],
    labels: [
      'FIG. 1.4 · LUMEN AXIS',
      'FIG. 2.4 · ARCH AXIS',
      'FIG. 3.4 · BOARDROOM',
      'FIG. 4.4 · CONFERENCE SUITE',
    ],
    altText: 'Architectural ambient lighting detail',
  },
  {
    id: 'r2',
    className: 'ambient-frag-r2',
    depthClass: 'ambient-depth-foreground',
    images: [
      '/images/Residential/Residential2.jpeg',
      '/images/Residential/Residential6.jpeg',
      '/images/Commercial/Commercial6.jpeg',
      '/images/Corporate/Corporate6.jpeg',
    ],
    labels: [
      'FIG. 1.5 · MILLED CONTOUR',
      'FIG. 2.5 · VANITY SUITE',
      'FIG. 3.5 · BREAKOUT SUITE',
      'FIG. 4.5 · ATRIUM PORTAL',
    ],
    altText: 'Bespoke contour geometry',
  },
  {
    id: 'r3',
    className: 'ambient-frag-r3',
    depthClass: 'ambient-depth-mid',
    images: [
      '/images/Residential/Residential6.jpeg',
      '/images/Residential/Residential1.jpeg',
      '/images/Commercial/Commercial1.jpeg',
      '/images/Corporate/Corporate7.jpeg',
    ],
    labels: [
      'FIG. 1.6 · STONE DETAIL',
      'FIG. 2.6 · JOINERY PLANE',
      'FIG. 3.6 · STRUCTURAL GRID',
      'FIG. 4.6 · EXECUTIVE SUITE',
    ],
    altText: 'Architectural elevation detail',
  },
];

export const AmbientArchitecturalLayer: React.FC<AmbientArchitecturalLayerProps> = ({
  activeIndex,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);

  // Subtle, high-performance mouse parallax (Desktop fine-pointer only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const hasFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1..+1 from screen center
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      // Restrained max 10px parallax delta
      targetX = normX * 10;
      targetY = normY * 10;
    };

    const animate = () => {
      // Smooth lerp damping (0.05 factor)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (layerRef.current) {
        layerRef.current.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`);
        layerRef.current.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`);
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="ambient-motion-layer"
      aria-hidden="true"
      role="presentation"
    >
      {/* ====================================================================
          LEFT SIDE AMBIENT COMPOSITION
          ==================================================================== */}
      <div className="ambient-wing ambient-wing-left">
        {/* Architectural vertical elevation datum ruler */}
        <div className="ambient-line-element ambient-datum-left">
          <span className="ambient-datum-tick">+3.60m</span>
          <span className="ambient-datum-tick">+2.40m</span>
          <span className="ambient-datum-tick">+1.20m</span>
          <span className="ambient-datum-tick">±0.00</span>
          <div className="ambient-datum-line" />
        </div>

        {LEFT_FRAGMENTS.map((frag) => (
          <div
            key={frag.id}
            className={`ambient-fragment ${frag.className} ${frag.depthClass}`}
          >
            <div className="ambient-fragment-parallax">
              <div className="ambient-fragment-frame">
                <span className="ambient-corner-mark ambient-corner-tl" />
                <span className="ambient-corner-mark ambient-corner-br" />

                <div className="ambient-fragment-media">
                  {frag.images.map((imgSrc, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgSrc}
                      alt={frag.altText}
                      loading="lazy"
                      decoding="async"
                      className={`ambient-fragment-img ${
                        imgIndex === activeIndex ? 'is-active' : ''
                      }`}
                    />
                  ))}
                  <div className="ambient-fragment-vignette" />
                </div>

                <div className="ambient-fragment-meta">
                  <span className="ambient-meta-title">
                    {frag.labels[activeIndex] || frag.labels[0]}
                  </span>
                  <span className="ambient-meta-code">PL.0{activeIndex + 1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================================
          RIGHT SIDE AMBIENT COMPOSITION
          ==================================================================== */}
      <div className="ambient-wing ambient-wing-right">
        {/* Subtle architectural drafting crosshair & coordinate */}
        <div className="ambient-line-element ambient-crosshair-right">
          <svg
            className="ambient-crosshair-svg"
            viewBox="0 0 96 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="21"
              x2="96"
              y2="21"
              stroke="#8B7355"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
            <line
              x1="48"
              y1="0"
              x2="48"
              y2="42"
              stroke="#8B7355"
              strokeWidth="0.75"
              strokeDasharray="3 3"
            />
            <circle cx="48" cy="21" r="3" stroke="#8B7355" strokeWidth="0.75" />
            <text
              x="55"
              y="16"
              fill="#8B7355"
              fontSize="6"
              fontFamily="monospace"
              letterSpacing="0.08em"
            >
              AXIS · 11°N
            </text>
          </svg>
        </div>

        {RIGHT_FRAGMENTS.map((frag) => (
          <div
            key={frag.id}
            className={`ambient-fragment ${frag.className} ${frag.depthClass}`}
          >
            <div className="ambient-fragment-parallax">
              <div className="ambient-fragment-frame">
                <span className="ambient-corner-mark ambient-corner-tl" />
                <span className="ambient-corner-mark ambient-corner-br" />

                <div className="ambient-fragment-media">
                  {frag.images.map((imgSrc, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imgSrc}
                      alt={frag.altText}
                      loading="lazy"
                      decoding="async"
                      className={`ambient-fragment-img ${
                        imgIndex === activeIndex ? 'is-active' : ''
                      }`}
                    />
                  ))}
                  <div className="ambient-fragment-vignette" />
                </div>

                <div className="ambient-fragment-meta">
                  <span className="ambient-meta-title">
                    {frag.labels[activeIndex] || frag.labels[0]}
                  </span>
                  <span className="ambient-meta-code">PL.0{activeIndex + 1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbientArchitecturalLayer;
