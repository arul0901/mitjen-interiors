import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { cameraPositionSpline, cameraTargetSpline } from "../data/houseRooms";

interface CameraRigProps {
  progressRef: React.MutableRefObject<number>;
  updateProgress: (dt: number) => number;
  onProgressUpdate?: (progress: number) => void;
  isReducedMotion?: boolean;
}

export function CameraRig({
  updateProgress,
  onProgressUpdate,
  isReducedMotion = false,
}: CameraRigProps) {
  const { camera } = useThree();

  // Desktop invisible mouse parallax (up to +/-0.15m, lerp 0.05)
  const targetMouseOffset = useRef(new THREE.Vector2(0, 0));
  const currentMouseOffset = useRef(new THREE.Vector2(0, 0));
  const isTouchDeviceRef = useRef(false);

  // Reusable vectors to avoid per-frame garbage collection
  const currentPos = useRef(new THREE.Vector3());
  const currentTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    // Detect touch device
    isTouchDeviceRef.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDeviceRef.current || isReducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      // Clamped subtle offset (+/- 0.15m)
      targetMouseOffset.current.set(nx * 0.15, ny * 0.12);
    };

    const handlePointerLeave = () => {
      targetMouseOffset.current.set(0, 0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isReducedMotion]);

  useFrame(({ clock }, dt) => {
    // 1. Get eased, damped progress (0..1)
    const p = updateProgress(dt);
    onProgressUpdate?.(p);

    if (isReducedMotion) {
      // Static pristine view of living room
      camera.position.set(0.0, 1.50, 13.5);
      camera.lookAt(0.0, 1.42, 9.5);
      return;
    }

    // 2. Sample 3D Catmull-Rom splines
    cameraPositionSpline.getPointAt(p, currentPos.current);
    cameraTargetSpline.getPointAt(p, currentTarget.current);

    // 3. Subtle handheld life (natural ~0.01m sway)
    const t = clock.getElapsedTime();
    const swayX = Math.sin(t * 0.75) * 0.008 + Math.sin(t * 1.8) * 0.004;
    const swayY = Math.cos(t * 0.65) * 0.008 + Math.cos(t * 1.5) * 0.003;

    // 4. Subtle desktop mouse parallax (lerp 0.05)
    if (!isTouchDeviceRef.current) {
      currentMouseOffset.current.lerp(targetMouseOffset.current, 0.05);
    }

    // 5. Update camera position and lookAt
    camera.position.set(
      currentPos.current.x + swayX + currentMouseOffset.current.x,
      currentPos.current.y + swayY + currentMouseOffset.current.y,
      currentPos.current.z
    );

    camera.lookAt(
      currentTarget.current.x,
      currentTarget.current.y,
      currentTarget.current.z
    );
  });

  return null;
}
