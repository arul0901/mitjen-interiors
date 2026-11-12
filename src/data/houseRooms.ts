import * as THREE from "three";

/**
 * Camera spline waypoints and LookAt target points.
 * 1 unit = 1 meter. Ceiling height 2.8m. Camera height ~1.5m.
 */
export const CAMERA_PATH_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0.0, 1.50, 13.5),   // 0: Living room start
  new THREE.Vector3(0.2, 1.50, 10.5),   // 1: Living room seating showcase
  new THREE.Vector3(0.1, 1.52, 6.2),    // 2: Passing seamlessly into Kitchen
  new THREE.Vector3(0.35, 1.52, 2.5),   // 3: Kitchen & dining area showcase
  new THREE.Vector3(-0.1, 1.50, -1.8),  // 4: Corridor into master suite
  new THREE.Vector3(-0.35, 1.50, -5.2), // 5: Bedroom suite showcase
  new THREE.Vector3(0.0, 1.54, -8.8),   // 6: Stepping out through glass terrace doors
  new THREE.Vector3(0.15, 1.55, -12.2), // 7: Terrace teak deck by infinity pool edge
];

export const CAMERA_LOOKAT_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0.0, 1.42, 9.5),
  new THREE.Vector3(-0.4, 1.40, 6.0),
  new THREE.Vector3(0.2, 1.45, 1.5),
  new THREE.Vector3(-0.7, 1.42, -1.5),
  new THREE.Vector3(0.0, 1.45, -5.0),
  new THREE.Vector3(0.7, 1.38, -8.5),
  new THREE.Vector3(0.1, 1.48, -13.5),
  new THREE.Vector3(0.0, 1.50, -22.0),
];

/**
 * Pre-constructed Catmull-Rom 3D splines for camera motion.
 */
export const cameraPositionSpline = new THREE.CatmullRomCurve3(CAMERA_PATH_POINTS, false, "centripetal");
export const cameraTargetSpline = new THREE.CatmullRomCurve3(CAMERA_LOOKAT_POINTS, false, "centripetal");

/**
 * Time of Day Keyframes:
 * 0.00 = Morning (soft warm light from east/left)
 * 0.33 = Midday (crisp neutral daylight, bright ambient)
 * 0.66 = Golden hour (low warm angled sunlight, lamps start glowing)
 * 1.00 = Dusk / Blue hour (deep twilight sky, warm interior lighting, glowing pool)
 */
export interface TimeOfDayState {
  progress: number;
  sunPosition: [number, number, number];
  sunColor: string;
  sunIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
  interiorLampIntensity: number;
  windowEmissiveIntensity: number;
  poolGlowIntensity: number;
  hdriBlend: number; // 0 = daylight.hdr, 1 = dusk.hdr
}

export const TIME_OF_DAY_KEYFRAMES: TimeOfDayState[] = [
  {
    progress: 0.0, // Morning
    sunPosition: [-12, 8, 14],
    sunColor: "#fff4e6",
    sunIntensity: 2.2,
    ambientColor: "#e6f0fa",
    ambientIntensity: 0.6,
    interiorLampIntensity: 0.2,
    windowEmissiveIntensity: 0.4,
    poolGlowIntensity: 0.3,
    hdriBlend: 0.0,
  },
  {
    progress: 0.33, // Midday
    sunPosition: [-5, 16, 4],
    sunColor: "#ffffff",
    sunIntensity: 2.6,
    ambientColor: "#f0f5fc",
    ambientIntensity: 0.8,
    interiorLampIntensity: 0.1,
    windowEmissiveIntensity: 0.6,
    poolGlowIntensity: 0.4,
    hdriBlend: 0.0,
  },
  {
    progress: 0.66, // Golden hour
    sunPosition: [-16, 4, -8],
    sunColor: "#ff9d5c",
    sunIntensity: 2.0,
    ambientColor: "#ffd8b8",
    ambientIntensity: 0.5,
    interiorLampIntensity: 1.2,
    windowEmissiveIntensity: 0.7,
    poolGlowIntensity: 0.8,
    hdriBlend: 0.5,
  },
  {
    progress: 1.0, // Dusk / Blue hour
    sunPosition: [-20, 0.5, -16],
    sunColor: "#ff5e36",
    sunIntensity: 0.5,
    ambientColor: "#1a243b",
    ambientIntensity: 0.35,
    interiorLampIntensity: 2.4,
    windowEmissiveIntensity: 0.9,
    poolGlowIntensity: 1.6,
    hdriBlend: 1.0,
  },
];

/**
 * Smoothly interpolates lighting parameters based on current scroll progress (0..1).
 */
export function evaluateTimeOfDay(progress: number): TimeOfDayState {
  const p = Math.max(0, Math.min(1, progress));

  // Find surrounding keyframes
  let i = 0;
  while (i < TIME_OF_DAY_KEYFRAMES.length - 2 && TIME_OF_DAY_KEYFRAMES[i + 1].progress < p) {
    i++;
  }

  const k1 = TIME_OF_DAY_KEYFRAMES[i];
  const k2 = TIME_OF_DAY_KEYFRAMES[i + 1];
  const t = (p - k1.progress) / (k2.progress - k1.progress);
  // Smoothstep interpolation for soft non-linear blending
  const smoothT = t * t * (3 - 2 * t);

  const colSun1 = new THREE.Color(k1.sunColor);
  const colSun2 = new THREE.Color(k2.sunColor);
  const blendedSunColor = colSun1.lerp(colSun2, smoothT).getHexString();

  const colAmb1 = new THREE.Color(k1.ambientColor);
  const colAmb2 = new THREE.Color(k2.ambientColor);
  const blendedAmbColor = colAmb1.lerp(colAmb2, smoothT).getHexString();

  return {
    progress: p,
    sunPosition: [
      THREE.MathUtils.lerp(k1.sunPosition[0], k2.sunPosition[0], smoothT),
      THREE.MathUtils.lerp(k1.sunPosition[1], k2.sunPosition[1], smoothT),
      THREE.MathUtils.lerp(k1.sunPosition[2], k2.sunPosition[2], smoothT),
    ],
    sunColor: `#${blendedSunColor}`,
    sunIntensity: THREE.MathUtils.lerp(k1.sunIntensity, k2.sunIntensity, smoothT),
    ambientColor: `#${blendedAmbColor}`,
    ambientIntensity: THREE.MathUtils.lerp(k1.ambientIntensity, k2.ambientIntensity, smoothT),
    interiorLampIntensity: THREE.MathUtils.lerp(k1.interiorLampIntensity, k2.interiorLampIntensity, smoothT),
    windowEmissiveIntensity: THREE.MathUtils.lerp(k1.windowEmissiveIntensity, k2.windowEmissiveIntensity, smoothT),
    poolGlowIntensity: THREE.MathUtils.lerp(k1.poolGlowIntensity, k2.poolGlowIntensity, smoothT),
    hdriBlend: THREE.MathUtils.lerp(k1.hdriBlend, k2.hdriBlend, smoothT),
  };
}

/**
 * 4 Still fallback images for users with WebGL disabled / failure.
 */
export const ROOM_FALLBACK_STILLS = [
  { progress: 0.0, src: "/rooms/01-living.webp", alt: "Living room interior view" },
  { progress: 0.33, src: "/rooms/02-kitchen.webp", alt: "Kitchen and dining area view" },
  { progress: 0.66, src: "/rooms/03-bedroom.webp", alt: "Master bedroom suite view" },
  { progress: 1.0, src: "/rooms/06-terrace.webp", alt: "Outdoor covered terrace and pool deck" },
];
