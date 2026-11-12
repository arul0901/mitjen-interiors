import React, { useState, useRef, useCallback, useEffect } from "react";

export interface TransformationItem {
  id: string;
  room: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  beforeAlt: string;
  afterAlt: string;
}

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: "living-room",
    room: "Living Room",
    title: "Elegant spaces made for everyday living.",
    beforeImage: "/assets/mitijen/BF&AF/KitchenBF.jpeg",
    afterImage: "/assets/mitijen/BF&AF/KitchenAF.jpeg",
    thumbnail: "/assets/mitijen/BF&AF/KitchenAF.jpeg",
    beforeAlt: "Living room interior during renovation and structural planning",
    afterAlt: "Elegant living room made for everyday living with bespoke joinery and warm lighting",
  },
  {
    id: "modular-kitchen",
    room: "Modular Kitchen",
    title: "Smart layouts with a refined finish.",
    beforeImage: "/assets/mitijen/BF&AF/BFCupboard.jpeg",
    afterImage: "/assets/mitijen/BF&AF/AFCupboard.jpeg",
    thumbnail: "/assets/mitijen/BF&AF/BFCupboard.jpeg",
    beforeAlt: "Kitchen and cabinetry space under initial installation",
    afterAlt: "Modular kitchen with smart layouts and a refined architectural finish",
  },
  {
    id: "retail-showroom",
    room: "Retail Showroom",
    title: "Interiors designed to strengthen the customer experience.",
    beforeImage: "/assets/mitijen/BF&AF/Wood.jpeg",
    afterImage: "/assets/mitijen/BF&AF/AFWood.jpeg",
    thumbnail: "/assets/mitijen/BF&AF/AFWood.jpeg",
    beforeAlt: "Commercial retail venue space during rough-in build",
    afterAlt: "Retail showroom designed to strengthen the customer experience",
  },
  {
    id: "restaurant-cafe",
    room: "Restaurant & Cafe",
    title: "Inviting spaces designed around the brand.",
    beforeImage: "/assets/transformations/kitchen_before.jpg",
    afterImage: "/assets/transformations/kitchen_after.jpg",
    thumbnail: "/assets/transformations/kitchen_thumb.jpg",
    beforeAlt: "Dining hospitality space during structural refurbishment",
    afterAlt: "Inviting restaurant and cafe spaces designed around the brand",
  },
  {
    id: "reception-lounge",
    room: "Reception & Lounge",
    title: "An impressive welcome that reflects your brand.",
    beforeImage: "/assets/transformations/lounge_before.jpg",
    afterImage: "/assets/transformations/lounge_after.jpg",
    thumbnail: "/assets/transformations/lounge_thumb.jpg",
    beforeAlt: "Reception foyer during framework and services rough-in",
    afterAlt: "Reception and lounge with an impressive welcome reflecting the brand",
  },
  {
    id: "office-workspace",
    room: "Office Workspace",
    title: "Professional interiors built around the way your team works.",
    beforeImage: "/assets/transformations/bedroom_before.jpg",
    afterImage: "/assets/transformations/bedroom_after.jpg",
    thumbnail: "/assets/transformations/bedroom_thumb.jpg",
    beforeAlt: "Office floor under structural execution and cabling",
    afterAlt: "Professional office workspace built around the way your team works",
  },
];

interface BeforeAfterProps {
  className?: string;
  items?: TransformationItem[];
}

export default function BeforeAfterTransformation({
  className = "",
  items = TRANSFORMATIONS,
}: BeforeAfterProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0..100
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const currentItem = items[activeIndex] || items[0];

  // Update slider position based on clientX
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer was lost
    }
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(5, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(95, prev + 5));
    } else if (e.key === "Home") {
      setSliderPos(5);
    } else if (e.key === "End") {
      setSliderPos(95);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!trackRef.current) return;
    const activeEl = trackRef.current.children[activeIndex] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  const clipStyle = `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)`;

  return (
    <section className={`cs_ba_section ${className}`} aria-label={"Before and After Transformations"}>
      <div className={"container"}>
        {/* Header */}
        <div className={"cs_ba_header"}>
          <div className={"cs_ba_header_lead"}>
            <span className={"cs_ba_kicker"}>BEFORE & AFTER | THE TRANSFORMATION</span>
            <h2 className={"cs_ba_title"}>From Empty Spaces to Beautifully Finished Interiors.</h2>
          </div>
          <div className={"cs_ba_header_right"}>
            <p className={"cs_ba_intro"}>
              See how Mitjen Interiors transforms everyday raw shells through thoughtful architectural design,
              authentic materials, and meticulous execution.
            </p>
            <div className={"cs_ba_drag_hint"} aria-hidden={"true"}>
              <svg width={"16"} height={"16"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                <polyline points={"7 8 3 12 7 16"} />
                <polyline points={"17 8 21 12 17 16"} />
                <line x1={"3"} y1={"12"} x2={"21"} y2={"12"} />
              </svg>
              <span>Slide divider to compare</span>
            </div>
          </div>
        </div>

        {/* Comparison Stage Container */}
        <div className={"cs_ba_comparison_wrapper"}>
          <div
            ref={containerRef}
            className={`cs_ba_stage ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role={"region"}
            aria-label={"Interactive Before and After Image Comparison"}
          >
            {/* After Layer (Underneath, full view) */}
            <div className={"cs_ba_layer cs_ba_layer_after"}>
              <img
                src={currentItem.afterImage}
                alt={currentItem.afterAlt}
                className={"cs_ba_image"}
                loading={"eager"}
                decoding={"async"}
              />
            </div>

            {/* Before Layer (Top, clipped) */}
            <div
              className={"cs_ba_layer cs_ba_layer_before"}
              style={{
                clipPath: clipStyle,
                WebkitClipPath: clipStyle,
              }}
            >
              <img
                src={currentItem.beforeImage}
                alt={currentItem.beforeAlt}
                className={"cs_ba_image"}
                loading={"eager"}
                decoding={"async"}
              />
            </div>

            {/* Vertical Divider Line */}
            <div
              className={"cs_ba_divider_line"}
              style={{ left: `${sliderPos}%` }}
              aria-hidden={"true"}
            />

            {/* Interactive Draggable Handle */}
            <div
              className={"cs_ba_handle"}
              style={{ left: `${sliderPos}%` }}
              role={"slider"}
              tabIndex={0}
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={5}
              aria-valuemax={95}
              aria-label={"Comparison slider position"}
              onKeyDown={handleKeyDown}
            >
              <div className={"cs_ba_handle_disc"}>
                <svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} strokeLinejoin={"round"}>
                  <polyline points={"8 5 2 12 8 19"} />
                  <polyline points={"16 5 22 12 16 19"} />
                </svg>
              </div>
            </div>

            {/* Before Badge (Left) */}
            <div className={"cs_ba_badge cs_ba_badge_before"}>
              <span>BEFORE · ROUGH-IN</span>
            </div>

            {/* After Badge (Right) */}
            <div className={"cs_ba_badge cs_ba_badge_after"}>
              <span className={"cs_ba_badge_dot"} aria-hidden={"true"}></span>
              <span>AFTER · REFINED</span>
            </div>

            {/* Stage Title Overlay */}
            <div className={"cs_ba_stage_badge"}>
              <span className={"cs_ba_stage_room"}>{currentItem.room}</span>
              <span className={"cs_ba_stage_sep"}>/</span>
              <span className={"cs_ba_stage_title"}>{currentItem.title}</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Gallery */}
        <div className={"cs_ba_gallery_wrapper"}>
          <button
            type={"button"}
            className={"cs_ba_nav_btn cs_ba_nav_prev"}
            onClick={handlePrev}
            aria-label={"View previous transformation"}
          >
            <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"}>
              <polyline points={"15 18 9 12 15 6"} />
            </svg>
          </button>

          <div
            ref={trackRef}
            className={"cs_ba_thumbnails_track"}
            role={"tablist"}
            aria-label={"Transformation photo views"}
          >
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type={"button"}
                  role={"tab"}
                  aria-selected={isActive}
                  aria-label={`Select ${item.room} transformation`}
                  className={`cs_ba_thumb_item ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className={"cs_ba_thumb_media"}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={"cs_ba_thumb_img"}
                      loading={"lazy"}
                      decoding={"async"}
                    />
                    <span className={"cs_ba_thumb_index"}>0{idx + 1}</span>
                  </div>
                  <div className={"cs_ba_thumb_text"}>
                    <span className={"cs_ba_thumb_room"}>{item.room}</span>
                    <span className={"cs_ba_thumb_title"}>{item.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type={"button"}
            className={"cs_ba_nav_btn cs_ba_nav_next"}
            onClick={handleNext}
            aria-label={"View next transformation"}
          >
            <svg viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"}>
              <polyline points={"9 18 15 12 9 6"} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
