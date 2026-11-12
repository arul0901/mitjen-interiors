import React, { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

interface HouseProps {
  lampIntensity?: number;
  emissiveIntensity?: number;
  poolGlowIntensity?: number;
}

export function House({
  lampIntensity = 0.5,
  emissiveIntensity = 0.5,
  poolGlowIntensity = 0.5,
}: HouseProps) {
  // Shared architectural PBR materials
  const materials = useMemo(() => {
    return {
      // Crisp architectural white plaster
      wallWhite: new THREE.MeshStandardMaterial({
        color: "#fbfbfa",
        roughness: 0.85,
        metalness: 0.05,
      }),
      // Warm Scandinavian white oak floor
      floorOak: new THREE.MeshStandardMaterial({
        color: "#d4c3b0",
        roughness: 0.38,
        metalness: 0.05,
      }),
      // Outdoor weather-treated teak deck
      deckTeak: new THREE.MeshStandardMaterial({
        color: "#846243",
        roughness: 0.55,
        metalness: 0.02,
      }),
      // Pure white ceiling
      ceiling: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.9,
      }),
      // Matte architectural black steel for window mullions and fixtures
      blackSteel: new THREE.MeshStandardMaterial({
        color: "#1c1c1e",
        roughness: 0.35,
        metalness: 0.8,
      }),
      // Fluted accent oak
      flutedOak: new THREE.MeshStandardMaterial({
        color: "#a88c6e",
        roughness: 0.45,
        metalness: 0.05,
      }),
      // Bouclé / Linen sofa fabric
      fabricLinen: new THREE.MeshStandardMaterial({
        color: "#e8e5de",
        roughness: 0.9,
        metalness: 0.0,
      }),
      // Travertine stone for coffee table & pool coping
      travertine: new THREE.MeshStandardMaterial({
        color: "#dfd9ce",
        roughness: 0.45,
        metalness: 0.05,
      }),
      // Kitchen waterfall quartz
      quartzWhite: new THREE.MeshStandardMaterial({
        color: "#f5f5f4",
        roughness: 0.2,
        metalness: 0.1,
      }),
      // Architectural glass windows
      glass: new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.35,
        roughness: 0.05,
        transmission: 0.9,
        ior: 1.52,
      }),
      // Emissive window glow plane (dawn / dusk bloom)
      windowEmissive: new THREE.MeshBasicMaterial({
        color: "#fffaed",
        transparent: true,
        opacity: 0.4,
      }),
      // Warm interior lamp glowing orbs
      lampGlow: new THREE.MeshBasicMaterial({
        color: "#ffcc88",
      }),
      // Crystalline pool water
      water: new THREE.MeshStandardMaterial({
        color: "#1d6e8a",
        roughness: 0.08,
        metalness: 0.25,
        transparent: true,
        opacity: 0.85,
      }),
      // Pool underwater perimeter glow
      poolEmissive: new THREE.MeshBasicMaterial({
        color: "#38bdf8",
      }),
      // Dark slate fireplace interior
      charcoalSlate: new THREE.MeshStandardMaterial({
        color: "#18181b",
        roughness: 0.7,
      }),
      // Ceramic decor
      ceramicWhite: new THREE.MeshStandardMaterial({
        color: "#fafaf9",
        roughness: 0.25,
      }),
    };
  }, []);

  return (
    <group name={"ProceduralArchitecturalHouse"}>
      {/* ─────────────────────────────────────────────────────────────
          1. FLOORS & FOUNDATION
          ───────────────────────────────────────────────────────────── */}
      {/* Interior Oak Floor (Z: -8 to 15, X: -4.8 to 4.8) */}
      <mesh
        position={[0, -0.05, 3.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={materials.floorOak}
      >
        <planeGeometry args={[9.6, 23]} />
      </mesh>

      {/* Outdoor Teak Deck (Z: -8 to -18, X: -6 to 6) */}
      <mesh
        position={[0, -0.06, -13]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={materials.deckTeak}
      >
        <planeGeometry args={[12, 10]} />
      </mesh>

      {/* Infinity Pool Water (Z: -12 to -17.5, X: -4 to 4) */}
      <mesh
        position={[0, -0.12, -14.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.water}
      >
        <planeGeometry args={[8, 5.5]} />
      </mesh>
      {/* Pool Basin Coping Edge */}
      <mesh position={[0, -0.25, -14.75]} receiveShadow material={materials.travertine}>
        <boxGeometry args={[8.4, 0.3, 5.9]} />
      </mesh>
      {/* Pool Underwater Glow Ribbon */}
      <mesh
        position={[0, -0.22, -14.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={materials.poolEmissive}
        scale={[1, 1, 1]}
      >
        <ringGeometry args={[3.8, 3.95, 32]} />
      </mesh>

      {/* ─────────────────────────────────────────────────────────────
          2. CEILING & OVERHANGS (Ceiling Height 2.8m)
          ───────────────────────────────────────────────────────────── */}
      {/* Interior Main Ceiling */}
      <mesh
        position={[0, 2.85, 3.5]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
        material={materials.ceiling}
      >
        <planeGeometry args={[9.6, 23]} />
      </mesh>
      {/* Terrace Cantilevered Roof Slab (Y = 3.2m) */}
      <mesh position={[0, 3.2, -12.5]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[11.5, 0.3, 9]} />
      </mesh>

      {/* ─────────────────────────────────────────────────────────────
          3. PERIMETER & PARTITION WALLS (Wide Openings for Camera)
          ───────────────────────────────────────────────────────────── */}
      {/* Back Wall - Living Room (Z = 15) */}
      <mesh position={[0, 1.4, 15]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[9.6, 2.8, 0.3]} />
      </mesh>

      {/* Right Exterior Wall (X = 4.8, Z: -8 to 15) */}
      <mesh position={[4.8, 1.4, 3.5]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[0.3, 2.8, 23]} />
      </mesh>

      {/* Left Exterior Wall with Large Window Cutouts (X = -4.8) */}
      {/* Solid Sections */}
      <mesh position={[-4.8, 1.4, 13.5]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[0.3, 2.8, 3]} />
      </mesh>
      <mesh position={[-4.8, 1.4, 5.5]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[0.3, 2.8, 3]} />
      </mesh>
      <mesh position={[-4.8, 1.4, -2.5]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[0.3, 2.8, 3]} />
      </mesh>
      {/* Window mullions on left wall */}
      <mesh position={[-4.75, 1.4, 9.5]} material={materials.blackSteel}>
        <boxGeometry args={[0.08, 2.7, 0.08]} />
      </mesh>
      <mesh position={[-4.75, 1.4, 1.5]} material={materials.blackSteel}>
        <boxGeometry args={[0.08, 2.7, 0.08]} />
      </mesh>
      {/* Architectural Glass Panels (Left) */}
      <mesh position={[-4.78, 1.4, 9.5]} material={materials.glass}>
        <planeGeometry args={[5, 2.7]} />
      </mesh>
      <mesh position={[-4.78, 1.4, 1.5]} material={materials.glass}>
        <planeGeometry args={[5, 2.7]} />
      </mesh>

      {/* Partition 1: Between Living & Kitchen (Z = 7) */}
      {/* Left Wall Wing */}
      <mesh position={[-3.3, 1.4, 7]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[3.0, 2.8, 0.25]} />
      </mesh>
      {/* Right Wall Wing */}
      <mesh position={[3.3, 1.4, 7]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[3.0, 2.8, 0.25]} />
      </mesh>
      {/* Generous 3.6m Center Opening between X = -1.8 and +1.8 (Camera safely glides through) */}

      {/* Partition 2: Between Kitchen & Bedroom (Z = -0.8) */}
      {/* Left Wall Wing */}
      <mesh position={[-3.2, 1.4, -0.8]} receiveShadow material={materials.wallWhite}>
        <boxGeometry args={[3.2, 2.8, 0.25]} />
      </mesh>
      {/* Right Wall Wing with fluted oak accent */}
      <mesh position={[3.2, 1.4, -0.8]} receiveShadow material={materials.flutedOak}>
        <boxGeometry args={[3.2, 2.8, 0.25]} />
      </mesh>
      {/* Generous 3.2m Center Opening between X = -1.6 and +1.6 */}

      {/* Partition 3: Terrace Glass Sliders (Z = -8) */}
      <mesh position={[-3.6, 1.4, -8]} material={materials.wallWhite}>
        <boxGeometry args={[2.4, 2.8, 0.25]} />
      </mesh>
      <mesh position={[3.6, 1.4, -8]} material={materials.wallWhite}>
        <boxGeometry args={[2.4, 2.8, 0.25]} />
      </mesh>
      {/* Minimal black steel frame for open terrace slider */}
      <mesh position={[-2.4, 1.4, -8]} material={materials.blackSteel}>
        <boxGeometry args={[0.08, 2.8, 0.1]} />
      </mesh>
      <mesh position={[2.4, 1.4, -8]} material={materials.blackSteel}>
        <boxGeometry args={[0.08, 2.8, 0.1]} />
      </mesh>
      {/* Wide 4.8m open portal to terrace */}

      {/* ─────────────────────────────────────────────────────────────
          4. ROOM 1: LIVING ROOM FURNITURE & ACCENTS (Z: 8 to 14)
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, 10.5]}>
        {/* Wool Area Rug */}
        <mesh position={[0, 0.01, 0.5]} rotation={[-Math.PI / 2, 0, 0]} material={materials.fabricLinen}>
          <planeGeometry args={[4.8, 3.6]} />
        </mesh>

        {/* Minimalist 3-Seat Linen Sofa facing fireplace */}
        <group position={[-0.4, 0, 1.8]}>
          {/* Sofa Base */}
          <RoundedBox args={[3.2, 0.45, 1.05]} radius={0.06} smoothness={4} position={[0, 0.23, 0]} material={materials.fabricLinen} castShadow receiveShadow />
          {/* Backrest */}
          <RoundedBox args={[3.2, 0.45, 0.28]} radius={0.06} smoothness={4} position={[0, 0.65, 0.38]} material={materials.fabricLinen} castShadow />
          {/* Left / Right Armrests */}
          <RoundedBox args={[0.26, 0.35, 1.05]} radius={0.05} smoothness={4} position={[-1.47, 0.55, 0]} material={materials.fabricLinen} castShadow />
          <RoundedBox args={[0.26, 0.35, 1.05]} radius={0.05} smoothness={4} position={[1.47, 0.55, 0]} material={materials.fabricLinen} castShadow />
        </group>

        {/* Travertine Coffee Table */}
        <RoundedBox args={[1.6, 0.32, 0.85]} radius={0.04} smoothness={4} position={[-0.4, 0.16, 0.3]} material={materials.travertine} castShadow receiveShadow />
        {/* Ceramic bowl on table */}
        <mesh position={[-0.2, 0.34, 0.3]} material={materials.ceramicWhite}>
          <cylinderGeometry args={[0.15, 0.08, 0.06, 16]} />
        </mesh>

        {/* Fluted Oak Feature Wall with Inset Fireplace (Right Wall X = 4.65) */}
        <mesh position={[4.65, 1.4, 0]} material={materials.flutedOak}>
          <boxGeometry args={[0.1, 2.8, 4.5]} />
        </mesh>
        {/* Inset Linear Fireplace */}
        <mesh position={[4.6, 0.55, 0]} material={materials.charcoalSlate}>
          <boxGeometry args={[0.2, 0.4, 2.2]} />
        </mesh>

        {/* Architectural Floor Arc Lamp with Glowing Orb */}
        <group position={[-2.6, 0, 2.2]}>
          {/* Heavy Base */}
          <mesh position={[0, 0.03, 0]} material={materials.blackSteel}>
            <cylinderGeometry args={[0.22, 0.24, 0.06, 24]} />
          </mesh>
          {/* Slender Vertical Stem */}
          <mesh position={[0, 1.1, 0]} material={materials.blackSteel}>
            <cylinderGeometry args={[0.018, 0.018, 2.2, 16]} />
          </mesh>
          {/* Horizontal Arm */}
          <mesh position={[0.4, 2.2, 0]} rotation={[0, 0, -Math.PI / 2]} material={materials.blackSteel}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 16]} />
          </mesh>
          {/* Glowing Frosted Glass Orb */}
          <mesh position={[0.8, 2.1, 0]} material={materials.lampGlow}>
            <sphereGeometry args={[0.15, 24, 24]} />
          </mesh>
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          5. ROOM 2: KITCHEN & DINING (Z: 0 to 7)
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, 3.2]}>
        {/* Monolithic Waterfall Quartz Kitchen Island (Left Side X = -2.4) */}
        <group position={[-2.4, 0, 0]}>
          <RoundedBox args={[1.1, 0.92, 3.4]} radius={0.04} smoothness={4} position={[0, 0.46, 0]} material={materials.quartzWhite} castShadow receiveShadow />
          {/* Matte Black Gooseneck Faucet */}
          <mesh position={[0, 1.05, 0.4]} material={materials.blackSteel}>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
          </mesh>
          {/* 3 Minimalist Oak Barstools */}
          {[-1.0, 0.0, 1.0].map((offsetZ, i) => (
            <group key={`barstool-${i}`} position={[0.7, 0, offsetZ]}>
              {/* Seat */}
              <RoundedBox args={[0.38, 0.05, 0.38]} radius={0.02} smoothness={3} position={[0, 0.65, 0]} material={materials.flutedOak} />
              {/* Legs */}
              <mesh position={[0, 0.32, 0]} material={materials.blackSteel}>
                <cylinderGeometry args={[0.14, 0.18, 0.64, 8]} />
              </mesh>
            </group>
          ))}
          {/* Two Hanging Minimalist Brass/Black Pendant Lamps */}
          {[-0.8, 0.8].map((offsetZ, i) => (
            <group key={`pendant-${i}`} position={[0, 2.8, offsetZ]}>
              {/* Cord */}
              <mesh position={[0, -0.6, 0]} material={materials.blackSteel}>
                <cylinderGeometry args={[0.005, 0.005, 1.2, 8]} />
              </mesh>
              {/* Cylinder Shade with Glowing Base */}
              <mesh position={[0, -1.2, 0]} material={materials.blackSteel}>
                <cylinderGeometry args={[0.08, 0.08, 0.22, 16]} />
              </mesh>
              <mesh position={[0, -1.33, 0]} material={materials.lampGlow}>
                <sphereGeometry args={[0.07, 16, 16]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Minimalist Oak Dining Table & Chairs (Right Side X = 2.4) */}
        <group position={[2.4, 0, 0]}>
          {/* Dining Table */}
          <RoundedBox args={[1.2, 0.06, 2.4]} radius={0.02} smoothness={3} position={[0, 0.74, 0]} material={materials.flutedOak} castShadow receiveShadow />
          {/* Table Legs */}
          <mesh position={[-0.45, 0.35, -0.9]} material={materials.blackSteel}>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
          </mesh>
          <mesh position={[0.45, 0.35, -0.9]} material={materials.blackSteel}>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
          </mesh>
          <mesh position={[-0.45, 0.35, 0.9]} material={materials.blackSteel}>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
          </mesh>
          <mesh position={[0.45, 0.35, 0.9]} material={materials.blackSteel}>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
          </mesh>
          {/* 4 Dining Chairs */}
          {[-0.6, 0.6].map((offsetZ, i) => (
            <React.Fragment key={`chairs-${i}`}>
              <RoundedBox args={[0.44, 0.04, 0.44]} radius={0.02} smoothness={3} position={[-0.8, 0.45, offsetZ]} material={materials.fabricLinen} />
              <RoundedBox args={[0.44, 0.04, 0.44]} radius={0.02} smoothness={3} position={[0.8, 0.45, offsetZ]} material={materials.fabricLinen} />
            </React.Fragment>
          ))}
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          6. ROOM 3: MASTER BEDROOM (Z: -7.5 to -1)
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -4.6]}>
        {/* Platform Bed (Right side X = 2.0) */}
        <group position={[2.0, 0, 0]}>
          {/* Oak Base Platform */}
          <RoundedBox args={[2.3, 0.28, 2.3]} radius={0.04} smoothness={3} position={[0, 0.14, 0]} material={materials.flutedOak} castShadow receiveShadow />
          {/* Mattress & Crisp Linen Bedding */}
          <RoundedBox args={[2.0, 0.32, 2.1]} radius={0.06} smoothness={4} position={[0, 0.42, 0]} material={materials.fabricLinen} castShadow />
          {/* Headboard against right wall */}
          <RoundedBox args={[0.14, 1.1, 2.5]} radius={0.04} smoothness={3} position={[1.15, 0.75, 0]} material={materials.fabricLinen} castShadow />
          {/* Fluffy Pillows */}
          <RoundedBox args={[0.5, 0.16, 0.8]} radius={0.05} smoothness={4} position={[0.65, 0.62, -0.55]} material={materials.fabricLinen} />
          <RoundedBox args={[0.5, 0.16, 0.8]} radius={0.05} smoothness={4} position={[0.65, 0.62, 0.55]} material={materials.fabricLinen} />

          {/* Floating Nightstands & Table Lamps */}
          {[-1.45, 1.45].map((offsetZ, i) => (
            <group key={`nightstand-${i}`} position={[0.8, 0.35, offsetZ]}>
              <RoundedBox args={[0.45, 0.2, 0.45]} radius={0.02} smoothness={3} position={[0, 0, 0]} material={materials.flutedOak} />
              {/* Glowing Sphere Bedside Lamp */}
              <mesh position={[0, 0.22, 0]} material={materials.lampGlow}>
                <sphereGeometry args={[0.09, 16, 16]} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* ─────────────────────────────────────────────────────────────
          7. ROOM 4: COVERED TERRACE & INFINITY POOL DECK (Z: -17 to -8)
          ───────────────────────────────────────────────────────────── */}
      <group position={[0, 0, -11]}>
        {/* Minimalist Teak Sun Loungers */}
        {[-2.2, 2.2].map((offsetX, i) => (
          <group key={`lounger-${i}`} position={[offsetX, 0, 0.2]} rotation={[0, i === 0 ? 0.08 : -0.08, 0]}>
            <RoundedBox args={[0.75, 0.18, 2.0]} radius={0.03} smoothness={3} position={[0, 0.1, 0]} material={materials.flutedOak} castShadow />
            <RoundedBox args={[0.7, 0.08, 1.95]} radius={0.03} smoothness={3} position={[0, 0.22, 0]} material={materials.fabricLinen} />
          </group>
        ))}

        {/* Minimalist Architectural Planters */}
        <mesh position={[-4.8, 0.4, -2.5]} receiveShadow material={materials.wallWhite}>
          <boxGeometry args={[0.8, 0.8, 2.5]} />
        </mesh>
        <mesh position={[4.8, 0.4, -2.5]} receiveShadow material={materials.wallWhite}>
          <boxGeometry args={[0.8, 0.8, 2.5]} />
        </mesh>
      </group>
    </group>
  );
}
