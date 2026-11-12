import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { TimeOfDayState } from "../data/houseRooms";

interface LightingProps {
  timeOfDay: TimeOfDayState;
  isLowEnd?: boolean;
}

export function Lighting({ timeOfDay, isLowEnd = false }: LightingProps) {
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  // Smooth frame interpolation to eliminate any micro-stutters
  useFrame(() => {
    if (sunLightRef.current) {
      sunLightRef.current.position.set(
        timeOfDay.sunPosition[0],
        timeOfDay.sunPosition[1],
        timeOfDay.sunPosition[2]
      );
      sunLightRef.current.color.set(timeOfDay.sunColor);
      sunLightRef.current.intensity = timeOfDay.sunIntensity;
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.set(timeOfDay.ambientColor);
      ambientLightRef.current.intensity = timeOfDay.ambientIntensity;
    }
  });

  const shadowMapSize = isLowEnd ? 1024 : 2048;

  return (
    <>
      {/* Directional Sun Light (Single primary shadow caster) */}
      <directionalLight
        ref={sunLightRef}
        castShadow={!isLowEnd}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0004}
      />

      {/* Global Ambient Light */}
      <ambientLight ref={ambientLightRef} />

      {/* Subtle Sky / Ground fill */}
      <hemisphereLight
        args={[timeOfDay.ambientColor, "#1c1813", timeOfDay.ambientIntensity * 0.4]}
      />

      {/* ─────────────────────────────────────────────────────────────
          WARM INTERIOR ACCENT LAMPS (Shadowless, low overhead)
          These fade in progressively as scroll approaches evening
          ───────────────────────────────────────────────────────────── */}
      {/* 1. Living Room Arc Lamp */}
      <pointLight
        position={[-1.8, 2.1, 12.7]}
        color={"#ffba66"}
        intensity={timeOfDay.interiorLampIntensity * 1.8}
        distance={7.0}
        decay={2}
      />

      {/* 2. Kitchen Island Pendants */}
      <pointLight
        position={[-2.4, 2.0, 3.2]}
        color={"#ffc988"}
        intensity={timeOfDay.interiorLampIntensity * 1.5}
        distance={6.0}
        decay={2}
      />

      {/* 3. Dining Area Chandelier */}
      <pointLight
        position={[2.4, 2.0, 3.2]}
        color={"#ffbe77"}
        intensity={timeOfDay.interiorLampIntensity * 1.5}
        distance={6.0}
        decay={2}
      />

      {/* 4. Bedroom Bedside Lamps */}
      <pointLight
        position={[2.8, 0.6, -6.05]}
        color={"#ffa955"}
        intensity={timeOfDay.interiorLampIntensity * 1.2}
        distance={4.5}
        decay={2}
      />
      <pointLight
        position={[2.8, 0.6, -3.15]}
        color={"#ffa955"}
        intensity={timeOfDay.interiorLampIntensity * 1.2}
        distance={4.5}
        decay={2}
      />

      {/* 5. Terrace Pool Edge Glow */}
      <pointLight
        position={[0, 0.1, -14.75]}
        color={"#38bdf8"}
        intensity={timeOfDay.poolGlowIntensity * 2.2}
        distance={9.0}
        decay={2}
      />

      {/* Poly Haven HDRI for realistic architectural reflections */}
      <Environment
        files={timeOfDay.hdriBlend > 0.5 ? "/hdri/dusk.hdr" : "/hdri/daylight.hdr"}
        environmentIntensity={Math.max(0.2, timeOfDay.ambientIntensity * 0.8)}
      />
    </>
  );
}
