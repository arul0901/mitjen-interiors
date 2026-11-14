import React, { useRef, useState, useEffect, useCallback } from "react";

export interface PanoramaItem {
  id: string;
  name: string;
  category: string;
  image: string;
  location: string;
  description: string;
}

export const PANORAMA_ITEMS: PanoramaItem[] = [
  {
    id: "credenza",
    name: "Living Credenza & Shoji Room",
    category: "Interior Architecture",
    image: "/assets/mitijen/panaroma/panaroma1.png",
    location: "Private Residence Salon, Coimbatore",
    description:
      "Handcrafted solid walnut credenza and floating display shelving paired with Japanese-inspired fluted architectural screens and natural morning daylight.",
  },
  {
    id: "vanity",
    name: "Stone & Timber Vanity Suite",
    category: "Custom Bath Architecture",
    image: "/assets/mitijen/panaroma/panaroma2.png",
    location: "Master Suite En-Suite",
    description:
      "Floating honed marble cantilevered vanity counter set against floor-to-ceiling vein-matched slabs and concealed warm bronze ambient reveals.",
  },
  {
    id: "wardrobe",
    name: "Full Architectural Wardrobe Gallery",
    category: "Millwork & Joinery",
    image: "/assets/mitijen/panaroma/panaroma3.png",
    location: "Dressing Suite Gallery",
    description:
      "Full-height floor-to-ceiling custom architectural wardrobe with integrated illumination, fluted smoked glass, and tailored saddle leather pulls.",
  },
];

interface PanoramaViewerProps {
  className?: string;
  items?: PanoramaItem[];
}

export default function PanoramaViewer({
  className = "",
  items = PANORAMA_ITEMS,
}: PanoramaViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoTour, setIsAutoTour] = useState(true);
  const [zoom, setZoom] = useState(1.0); // 0.75 to 1.5
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Rotation offsets
  const panXRef = useRef(0);
  const panYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);
  const autoPanSpeedRef = useRef(0.25); // px per frame
  const animFrameIdRef = useRef<number | null>(null);

  const currentItem = items[activeIndex] || items[0];

  // Load active panorama image
  useEffect(() => {
    const img = new Image();
    img.src = currentItem.image;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
    };
  }, [currentItem.image]);

  // Main rendering loop for 360 panoramic canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;
    const w = canvas.width;
    const h = canvas.height;

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Clean architectural loading placeholder
      ctx.fillStyle = "#151614";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Calibrating 360° Architectural Space...", w / 2, h / 2);
      return;
    }

    // Auto-tour continuous gentle pan
    if (isAutoTour && !isDraggingRef.current) {
      panXRef.current += autoPanSpeedRef.current;
    }

    // Wrap around 360 degrees horizontally
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const effectivePanX = ((panXRef.current % imgW) + imgW) % imgW;

    // Viewport calculations with zoom
    const visibleW = (imgW / 3) / zoom;
    const visibleH = imgH / zoom;
    const startY = Math.max(0, Math.min(imgH - visibleH, (imgH - visibleH) / 2 + panYRef.current));

    ctx.clearRect(0, 0, w, h);

    // Draw wrapped panoramic slices
    let sx = effectivePanX;
    let availableInImage = imgW - sx;

    if (availableInImage >= visibleW) {
      ctx.drawImage(img, sx, startY, visibleW, visibleH, 0, 0, w, h);
    } else {
      // First slice (end of image)
      const firstSliceSourceW = availableInImage;
      const firstSliceDestW = (firstSliceSourceW / visibleW) * w;
      ctx.drawImage(img, sx, startY, firstSliceSourceW, visibleH, 0, 0, firstSliceDestW, h);

      // Second slice (wrap to beginning of image)
      const secondSliceSourceW = visibleW - firstSliceSourceW;
      const secondSliceDestW = w - firstSliceDestW;
      ctx.drawImage(img, 0, startY, secondSliceSourceW, visibleH, firstSliceDestW, 0, secondSliceDestW, h);
    }

    // Subtle architectural ambient gradient vignette
    const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0.35)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, [isAutoTour, zoom]);

  // RequestAnimationFrame loop
  useEffect(() => {
    let active = true;
    const loop = () => {
      if (!active) return;
      renderCanvas();
      animFrameIdRef.current = requestAnimationFrame(loop);
    };
    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [renderCanvas]);

  // Handle canvas resize
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasRef.current.width = rect.width * dpr;
      canvasRef.current.height = rect.height * dpr;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isFullscreen]);

  // Pointer interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseXRef.current;
    const dy = e.clientY - lastMouseYRef.current;
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;

    panXRef.current -= dx * 1.5;
    panYRef.current -= dy * 0.8;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Zoom wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => Math.max(0.75, Math.min(1.5, prev - e.deltaY * 0.001)));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => { });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => { });
      setIsFullscreen(false);
    }
  };

  return (
    <section className={`cs_pano_section ${className}`} aria-label={"360 Panoramic Interior Atelier"}>
      <div className={"container"}>
        {/* Section Heading */}
        <div className={"cs_pano_header"}>
          <div className={"cs_pano_header_lead"}>
            <span className={"cs_pano_kicker"}>IMMERSIVE ATELIER · 360° PERSPECTIVE</span>
            <h2 className={"cs_pano_title"}>Explore Our Spaces in Panoramic Detail.</h2>
          </div>
          <div className={"cs_pano_header_right"}>
            <p className={"cs_pano_intro"}>
              Step inside Mitjen’s Mitjen architectural interiors. Drag in any direction to explore custom millwork,
              vein-matched stone surfaces, and natural daylight volumes.
            </p>
            <div className={"cs_pano_badges"}>
              <button
                type={"button"}
                onClick={() => setIsAutoTour((prev) => !prev)}
                className={`cs_pano_tour_btn ${isAutoTour ? "is-active" : ""}`}
              >
                <span className={"cs_pano_dot"} />
                {isAutoTour ? "PAUSE TOUR" : "AUTO TOUR"}
              </button>
            </div>
          </div>
        </div>

        {/* 360 Stage Container */}
        <div
          ref={containerRef}
          className={"cs_pano_stage_wrapper"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          <canvas ref={canvasRef} className={"cs_pano_canvas"} />

          {/* Top HUD Hint */}
          <div className={"cs_pano_hud_top"} aria-hidden={"true"}>
            <div className={"cs_pano_hint"}>
              <svg width={"16"} height={"16"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"}>
                <circle cx={"12"} cy={"12"} r={"10"} />
                <path d={"M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"} />
                <path d={"M12 8v8M8 12h8"} />
              </svg>
              <span>Drag 360° to explore · Scroll to zoom</span>
            </div>

            {/* Quick Controls */}
            <div className={"cs_pano_controls"}>
              <button
                type={"button"}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((prev) => Math.min(1.5, prev + 0.15));
                }}
                className={"cs_pano_ctrl_btn"}
                title={"Zoom in"}
                aria-label={"Zoom in"}
              >
                +
              </button>
              <button
                type={"button"}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((prev) => Math.max(0.75, prev - 0.15));
                }}
                className={"cs_pano_ctrl_btn"}
                title={"Zoom out"}
                aria-label={"Zoom out"}
              >
                −
              </button>
              <button
                type={"button"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className={"cs_pano_ctrl_btn"}
                title={"Toggle fullscreen"}
                aria-label={"Toggle fullscreen"}
              >
                ⛶
              </button>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className={"cs_pano_summary_bar"}>
            <div className={"cs_pano_summary_left"}>
              <span className={"cs_pano_summary_category"}>{currentItem.category}</span>
              <h3 className={"cs_pano_summary_title"}>{currentItem.name}</h3>
              <p className={"cs_pano_summary_loc"}>{currentItem.location}</p>
            </div>
            <div className={"cs_pano_summary_right"}>
              <p className={"cs_pano_summary_desc"}>{currentItem.description}</p>
            </div>
          </div>
        </div>

        {/* Room Selector Tabs */}
        <div className={"cs_pano_tabs_wrapper"}>
          <div className={"cs_pano_tabs_track"} role={"tablist"} aria-label={"Panorama rooms"}>
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type={"button"}
                  role={"tab"}
                  aria-selected={isActive}
                  className={`cs_pano_tab_btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className={"cs_pano_tab_num"}>0{idx + 1}</span>
                  <div className={"cs_pano_tab_text"}>
                    <span className={"cs_pano_tab_name"}>{item.name}</span>
                    <span className={"cs_pano_tab_cat"}>{item.category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

