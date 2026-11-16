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
// Index 0: Vintage Finish Interior (Residential Space · Race Course, Coimbatore)
// Index 1: Contemporary Residence (Residential Villa · KR Pura, Bangalore)
// Index 2: Agile Tech Workspace (Commercial Office · Tidal Park, Coimbatore)
// Index 3: Corporate Headquarters (Executive Site · Commercial District, Coimbatore)
// Every single label accurately describes the exact architectural space shown in the photograph.
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
      'BEDROOM WARDROBE',
      'LIVING SALON',
      'SHOWROOM GALLERY',
      'RECEPTION FOYER',
    ],
    altText: 'Architectural space detail',
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
      'DINING LOUNGE',
      'DINING LOUNGE',
      'CAFÉ & DINING',
      'EXECUTIVE CABIN',
    ],
    altText: 'Interior architectural space',
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
      'BEDROOM SUITE',
      'BEDROOM WARDROBE',
      'SALON & STUDIO',
      'CONFERENCE ROOM',
    ],
    altText: 'Bespoke architectural space',
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
      'LIVING SALON',
      'BEDROOM SUITE',
      'RECEPTION FOYER',
      'OPEN WORKSPACE',
    ],
    altText: 'Architectural interior space',
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
      'VILLA WARDROBE',
      'VANITY & MIRROR',
      'DISPLAY ARCHITECTURE',
      'COLLABORATION ZONE',
    ],
    altText: 'Bespoke interior architecture',
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
      'VANITY & MIRROR',
      'LIVING SALON',
      'RETAIL BOUTIQUE',
      'FOCUS POD',
    ],
    altText: 'Architectural space detail',
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
