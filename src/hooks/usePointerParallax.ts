import { useEffect, useRef, useState, useCallback } from "react";
import { Vector2 } from "three";

interface UsePointerParallaxOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  strengthDesktop?: number;
  strengthMobile?: number;
}

export function usePointerParallax({
  containerRef,
  strengthDesktop = 0.035,
  strengthMobile = 0.025,
}: UsePointerParallaxOptions) {
  // Current smoothed mouse vector (-1 to 1)
  const currentMouse = useRef(new Vector2(0, 0));
  const targetMouse = useRef(new Vector2(0, 0));
  const lastMoveTime = useRef(Date.now());
  const [hasGyro, setHasGyro] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobileRef = useRef(false);
  const reducedMotionRef = useRef(false);

  // Check prefers-reduced-motion and mobile
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;
    const updateMotion = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    motionQuery.addEventListener("change", updateMotion);

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768 || "ontouchstart" in window;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Request gyroscope permission on iOS if applicable
  const requestGyroPermission = useCallback(async () => {
    const DeviceOrientation = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    if (typeof DeviceOrientation?.requestPermission === "function") {
      try {
        const response = await DeviceOrientation.requestPermission();
        if (response === "granted") {
          setHasGyro(true);
        }
      } catch (err) {
        console.warn("DeviceOrientation permission error:", err);
      }
    }
  }, []);

  // Gyroscope orientation listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (reducedMotionRef.current) return;
      if (e.gamma !== null && e.beta !== null) {
        setHasGyro(true);
        lastMoveTime.current = Date.now();
        // Clamp gamma (-20 to 20 deg) and beta (-20 to 20 deg)
        const clampedGamma = Math.max(-20, Math.min(20, e.gamma));
        const clampedBeta = Math.max(-20, Math.min(20, e.beta - 45)); // assume holding phone at ~45deg
        targetMouse.current.set(clampedGamma / 20.0, clampedBeta / 20.0);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Pointer move handler on container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerMove = (e: PointerEvent) => {
      lastMoveTime.current = Date.now();
      setIsHovered(true);

      if (reducedMotionRef.current) {
        targetMouse.current.set(0, 0);
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.current.set(
        Math.max(-1, Math.min(1, x)),
        Math.max(-1, Math.min(1, y))
      );
    };

    const onPointerLeave = () => {
      setIsHovered(false);
      // Ease back to (0, 0)
      targetMouse.current.set(0, 0);
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [containerRef]);

  // Update loop per frame: lerp and Lissajous idle drift
  const update = useCallback((time: number) => {
    const isReduced = reducedMotionRef.current;
    const now = Date.now();
    const idleSeconds = (now - lastMoveTime.current) / 1000;

    if (isReduced) {
      currentMouse.current.set(0, 0);
      return currentMouse.current;
    }

    if (idleSeconds > 2.0 && !isHovered && !hasGyro) {
      // Blend into Lissajous drift: x = sin(t*0.25)*0.5, y = cos(t*0.2)*0.3
      const idleX = Math.sin(time * 0.25) * 0.5;
      const idleY = Math.cos(time * 0.2) * 0.3;
      targetMouse.current.lerp(new Vector2(idleX, idleY), 0.03);
    }

    // Lerp current towards target: current = lerp(current, target, 0.06)
    currentMouse.current.lerp(targetMouse.current, 0.06);

    return currentMouse.current;
  }, [isHovered, hasGyro]);

  const strength = isMobileRef.current ? Math.min(0.05, strengthMobile) : Math.min(0.05, strengthDesktop);

  return {
    currentMouse,
    targetMouse,
    update,
    strength,
    isHovered,
    hasGyro,
    requestGyroPermission,
  };
}
