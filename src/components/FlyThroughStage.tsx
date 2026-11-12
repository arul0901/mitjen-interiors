import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom, SMAA, Vignette } from "@react-three/postprocessing";
import { House } from "./House";
import { Lighting } from "./Lighting";
import { CameraRig } from "./CameraRig";
import { useScrollProgress } from "../hooks/useScrollProgress";
import {
  evaluateTimeOfDay,
  TimeOfDayState,
  TIME_OF_DAY_KEYFRAMES,
  ROOM_FALLBACK_STILLS,
} from "../data/houseRooms";

interface FlyThroughStageProps {
  className?: string;
}

export default function FlyThroughStage({ className = "" }: FlyThroughStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDayState>(TIME_OF_DAY_KEYFRAMES[0]);

  // Hook connecting GSAP ScrollTrigger pin to smooth damped progress
  const {
    smoothedProgressRef,
    updateProgress,
    isReducedMotion,
  } = useScrollProgress({
    triggerRef: pinSectionRef,
    pinDistanceDesktop: "+=400%",
    pinDistanceMobile: "+=300%",
  });

  // Check WebGL availability, mobile viewport, and low-end hardware
  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const cores = navigator.hardwareConcurrency || 8;
      const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
      setIsLowEnd(mobile || cores <= 4 || mem <= 4);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // IntersectionObserver + tab visibility check for pausing render loop
  useEffect(() => {
    const el = pinSectionRef.current;
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

  // Dynamic DPR setting
  const dpr = useMemo<[number, number]>(() => {
    if (isLowEnd) return [1, 1];
    if (isMobile) return [1, 1.25];
    return [1, 1.75];
  }, [isMobile, isLowEnd]);

  // Pause rendering when hidden or off-screen
  const frameloop = isInView && isTabVisible ? "always" : "never";

  // Callback from CameraRig each frame to update day-to-night lighting
  const handleProgressUpdate = (progress: number) => {
    const tod = evaluateTimeOfDay(progress);
    setCurrentTimeOfDay(tod);
  };

  // Determine fallback still index based on scroll progress (for non-WebGL)
  const currentFallbackStill = useMemo(() => {
    const p = smoothedProgressRef.current;
    if (p < 0.25) return ROOM_FALLBACK_STILLS[0];
    if (p < 0.55) return ROOM_FALLBACK_STILLS[1];
    if (p < 0.8) return ROOM_FALLBACK_STILLS[2];
    return ROOM_FALLBACK_STILLS[3];
  }, [smoothedProgressRef.current]);

  return (
    <section
      ref={pinSectionRef}
      className={`cs_flythrough_section relative overflow-hidden ${className}`}
      style={{
        position: "relative",
        width: "100%",
        padding: "16px 0",
        backgroundColor: "#ffffff",
      }}
      aria-label={"Bespoke Interior 3D Residence Experience"}
    >
      {/* 3D Fly-Through Hero Container */}
      <div
        ref={containerRef}
        className={"cs_flythrough_container"}
        style={{
          position: "relative",
          margin: "0 auto",
          width: "calc(100% - 32px)",
          maxWidth: "1400px",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          outline: "none",
          cursor: "default",
          touchAction: "pan-y",
        }}
      >
        {/* Responsive Aspect Ratio Box: 4/5 on mobile, 16/9 on md+, max-height 80vh */}
        <div
          className={"cs_flythrough_aspect_box"}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "min(72vh, 540px)" : "min(80vh, 760px)",
            minHeight: "360px",
            overflow: "hidden",
          }}
        >
          {/* Top Curved Architectural SVG Mask */}
          <div
            className={"cs_mask_top absolute top-0 left-0 right-0 pointer-events-none"}
            aria-hidden={"true"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: isMobile ? "80px" : "100px",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <svg
              viewBox={"0 0 1440 100"}
              preserveAspectRatio={"none"}
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <path
                d={"M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z"}
                fill={"#ffffff"}
              />
            </svg>
          </div>

          {/* Under-canvas Poster Still (Room 1 Living Room).
              Fades out over 600ms once the 3D scene is active. */}
          <img
            src={hasWebGL ? "/rooms/01-living.webp" : currentFallbackStill.src}
            alt={hasWebGL ? "Interior design preview" : currentFallbackStill.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: sceneReady && hasWebGL ? 0 : 1,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* 3D WebGL Canvas */}
          {hasWebGL && (
            <Canvas
              frameloop={frameloop}
              dpr={dpr}
              gl={{
                antialias: !isLowEnd,
                powerPreference: "high-performance",
                alpha: false,
                depth: true,
                stencil: false,
              }}
              camera={{
                fov: 46,
                near: 0.1,
                far: 60,
                position: [0.0, 1.5, 13.5],
              }}
              onCreated={() => {
                // Fade out poster when the scene graph has mounted
                setTimeout(() => setSceneReady(true), 250);
              }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
              role={"img"}
              aria-label={"Interactive 3D walkthrough of a bespoke residence"}
            >
              <Suspense fallback={null}>
                {/* Architectural Single-Storey House Model */}
                <House
                  lampIntensity={currentTimeOfDay.interiorLampIntensity}
                  emissiveIntensity={currentTimeOfDay.windowEmissiveIntensity}
                  poolGlowIntensity={currentTimeOfDay.poolGlowIntensity}
                />

                {/* Day-to-Night Dynamic Lighting Controller */}
                <Lighting timeOfDay={currentTimeOfDay} isLowEnd={isLowEnd} />

                {/* Spline Camera Rig */}
                <CameraRig
                  progressRef={smoothedProgressRef}
                  updateProgress={updateProgress}
                  onProgressUpdate={handleProgressUpdate}
                  isReducedMotion={isReducedMotion}
                />

                {/* Post-Processing Effects (Bloom, SMAA, Vignette)
                    Gated for high-performance desktop devices */}
                {!isLowEnd && (
                  <EffectComposer multisampling={0}>
                    <SMAA />
                    <Bloom
                      luminanceThreshold={0.88}
                      luminanceSmoothing={0.3}
                      intensity={0.4}
                      mipmapBlur
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.4} />
                  </EffectComposer>
                )}

                <Preload all />
              </Suspense>
            </Canvas>
          )}

          {/* Bottom Curved Architectural SVG Mask */}
          <div
            className={"cs_mask_bottom absolute bottom-0 left-0 right-0 pointer-events-none"}
            aria-hidden={"true"}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: isMobile ? "80px" : "100px",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <svg
              viewBox={"0 0 1440 100"}
              preserveAspectRatio={"none"}
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <path
                d={"M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z"}
                fill={"#ffffff"}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
