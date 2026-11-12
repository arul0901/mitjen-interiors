import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RoomPlane } from "./RoomPlane";
import { ROOMS } from "../data/rooms";
import { useRoomController } from "../hooks/useRoomController";
import { usePointerParallax } from "../hooks/usePointerParallax";

interface ParallaxRoomStageProps {
  autoplayInterval?: number;
  transitionDuration?: number;
  className?: string;
}

export default function ParallaxRoomStage({
  autoplayInterval = 6000,
  transitionDuration = 1.4,
  className = "",
}: ParallaxRoomStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Hook for room transitions, autoplay, and swipe physics
  const controller = useRoomController({
    containerRef,
    rooms: ROOMS,
    autoplayInterval,
    transitionDuration,
  });

  // Hook for pointer movement, idle drift, and mobile orientation
  const parallax = usePointerParallax({
    containerRef,
    strengthDesktop: 0.035,
    strengthMobile: 0.025,
  });

  // Check WebGL availability and screen size
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // IntersectionObserver + tab visibility check for pause rendering
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const frameloop = isInView && isTabVisible ? "always" : "never";
  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1.5] : [1, 2]), [isMobile]);

  return (
    <section
      className={`cs_parallax_hero_section relative py-4 overflow-hidden ${className}`}
      aria-label={"Bespoke Interior 3D Parallax Showcase"}
    >
      {/* Curved architectural mask - Top */}
      <div
        className={"cs_mask_top absolute top-0 left-0 right-0 h-[80px] sm:h-[100px] pointer-events-none z-10"}
        aria-hidden={"true"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <svg
          viewBox={"0 0 1440 100"}
          preserveAspectRatio={"none"}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path d={"M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z"} fill={"#ffffff"} />
        </svg>
      </div>

      {/* Main Parallax Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        role={"region"}
        aria-label={"Interactive 3D interior residence walkthrough. Drag horizontally or use arrow keys to change rooms."}
        onKeyDown={controller.handleKeyDown}
        className={"cs_parallax_stage_container"}
        style={{
          position: "relative",
          margin: "0 auto",
          width: "calc(100% - 32px)",
          maxWidth: "1400px",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          outline: "none",
          cursor: controller.isDragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        <div
          className={"cs_parallax_aspect_box"}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "min(70vh, 520px)" : "min(78vh, 760px)",
            minHeight: "360px",
            overflow: "hidden",
          }}
        >
          {/* Poster fallback (fades out after WebGL textures are ready) */}
          <img
            src={ROOMS[controller.currentIndex].image}
            alt={ROOMS[controller.currentIndex].alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: posterLoaded && hasWebGL ? 0 : 1,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* WebGL Parallax Stage */}
          {hasWebGL && (
            <Canvas
              orthographic
              frameloop={frameloop}
              dpr={dpr}
              gl={{
                antialias: false,
                powerPreference: "high-performance",
                alpha: false,
              }}
              camera={{ position: [0, 0, 1], zoom: 1 }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
              role={"img"}
              aria-label={"Interior design preview of a bespoke residence"}
            >
              <Suspense fallback={null}>
                <RoomPlane
                  rooms={controller.rooms}
                  currentIndex={controller.currentIndex}
                  targetIndex={controller.targetIndex}
                  progressRef={controller.progressRef}
                  parallaxUpdate={parallax.update}
                  strength={parallax.strength}
                  onLoadedFirstRoom={() => setPosterLoaded(true)}
                />
              </Suspense>
            </Canvas>
          )}

          {/* Gyroscope Enable Button on iOS / mobile */}
          {!parallax.hasGyro && isMobile && (
            <button
              type={"button"}
              onClick={parallax.requestGyroPermission}
              aria-label={"Enable motion parallax tilt"}
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                zIndex: 15,
                backgroundColor: "rgba(23, 23, 23, 0.75)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "30px",
                padding: "8px 14px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                backdropFilter: "blur(6px)",
                cursor: "pointer",
              }}
            >
              TILT PARALLAX ✦
            </button>
          )}
        </div>
      </div>

      {/* Curved architectural mask - Bottom */}
      <div
        className={"cs_mask_bottom absolute bottom-0 left-0 right-0 h-[80px] sm:h-[100px] pointer-events-none z-10"}
        aria-hidden={"true"}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <svg
          viewBox={"0 0 1440 100"}
          preserveAspectRatio={"none"}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path d={"M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z"} fill={"#ffffff"} />
        </svg>
      </div>

      {/* Room Indicator Under Container */}
      <div
        className={"cs_room_indicators"}
        role={"tablist"}
        aria-label={"Residence room selector"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
          padding: "4px 0",
        }}
      >
        {controller.rooms.map((room, idx) => {
          const isActive = idx === controller.currentIndex;
          return (
            <button
              key={room.id}
              type={"button"}
              role={"tab"}
              aria-selected={isActive}
              aria-label={`Switch to room ${idx + 1}: ${room.title}`}
              onClick={() => controller.goToRoom(idx)}
              style={{
                position: "relative",
                width: "36px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                padding: 0,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {/* Background thin track */}
              <span
                style={{
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#d4d4d4",
                  borderRadius: "1px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Active progress bar filling over 6s */}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${Math.min(100, Math.max(0, controller.indicatorProgress * 100))}%`,
                      backgroundColor: "#171717",
                      transition: controller.isDragging ? "none" : "width 0.1s linear",
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
