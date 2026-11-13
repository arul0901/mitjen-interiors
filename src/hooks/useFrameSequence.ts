import { useEffect, useRef, useState, useCallback } from "react";

export interface FramesMeta {
  count: number;
  fps: number;
  width: number;
  height: number;
  duration?: number;
}

export interface UseFrameSequenceOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  progress: number;
}

export function useFrameSequence({
  canvasRef,
  enabled,
  progress,
}: UseFrameSequenceOptions) {
  const [meta, setMeta] = useState<FramesMeta | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const framesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);
  const isPreloadingRef = useRef<boolean>(false);

  // 1. Fetch frames.json metadata
  useEffect(() => {
    if (!enabled) return;
    let isCancelled = false;

    fetch("/hero/frames.json")
      .then((res) => {
        if (!res.ok) throw new Error("frames.json not found");
        return res.json();
      })
      .then((data: FramesMeta) => {
        if (!isCancelled) {
          setMeta(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load frames.json:", err);
      });

    return () => {
      isCancelled = true;
    };
  }, [enabled]);

  // 2. Priority Preloading Engine
  useEffect(() => {
    if (!enabled || !meta || meta.count <= 0 || isPreloadingRef.current) return;
    isPreloadingRef.current = true;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const count = meta.count;
    const cache = framesCacheRef.current;

    // Build priority queue
    const queue: number[] = [];
    const added = new Set<number>();

    const addIndex = (idx: number) => {
      if (idx >= 0 && idx < count && !added.has(idx)) {
        added.add(idx);
        queue.push(idx);
      }
    };

    // Priority 1: Key milestones (first, middle, last)
    addIndex(0);
    addIndex(Math.floor(count / 2));
    addIndex(count - 1);

    // Priority 2: Every 8th frame
    for (let i = 0; i < count; i += 8) addIndex(i);

    // Priority 3: Every 4th frame
    for (let i = 0; i < count; i += 4) addIndex(i);

    // Priority 4: All remaining frames
    for (let i = 0; i < count; i++) addIndex(i);

    let queueIndex = 0;
    const concurrency = 4;
    let activeLoads = 0;

    const loadNext = () => {
      if (controller.signal.aborted) return;

      while (activeLoads < concurrency && queueIndex < queue.length) {
        const frameIdx = queue[queueIndex++];
        if (cache.has(frameIdx)) continue;

        activeLoads++;
        const frameNum = String(frameIdx + 1).padStart(4, "0");
        const img = new Image();
        img.src = `/hero/frames/f${frameNum}.webp`;

        img.onload = () => {
          if (!controller.signal.aborted) {
            cache.set(frameIdx, img);
            activeLoads--;
            setLoadedCount(cache.size);
            loadNext();
          }
        };

        img.onerror = () => {
          activeLoads--;
          loadNext();
        };
      }
    };

    loadNext();

    return () => {
      controller.abort();
      isPreloadingRef.current = false;
    };
  }, [enabled, meta]);

  // 3. Render Canvas Frame with Cover-fit Math
  const drawFrame = useCallback(
    (targetProgress: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !meta || meta.count <= 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const count = meta.count;
      const targetIndex = Math.min(
        count - 1,
        Math.max(0, Math.floor(targetProgress * (count - 1)))
      );

      const cache = framesCacheRef.current;

      // Find target frame or nearest loaded frame
      let img: HTMLImageElement | undefined = cache.get(targetIndex);
      if (!img) {
        // Search outward for closest available frame
        for (let dist = 1; dist < count; dist++) {
          const prev = targetIndex - dist;
          const next = targetIndex + dist;
          if (prev >= 0 && cache.has(prev)) {
            img = cache.get(prev);
            break;
          }
          if (next < count && cache.has(next)) {
            img = cache.get(next);
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Ensure canvas dimensions match client size * DPR (capped at 1.5)
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      const targetW = Math.round(displayWidth * dpr);
      const targetH = Math.round(displayHeight * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      // Cover-fit math
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      const hRatio = targetW / srcW;
      const vRatio = targetH / srcH;
      const ratio = Math.max(hRatio, vRatio);

      const drawW = srcW * ratio;
      const drawH = srcH * ratio;
      const shiftX = (targetW - drawW) / 2;
      const shiftY = (targetH - drawH) / 2;

      ctx.drawImage(img, 0, 0, srcW, srcH, shiftX, shiftY, drawW, drawH);
    },
    [canvasRef, meta]
  );

  // Redraw when progress changes or frames load
  useEffect(() => {
    if (!enabled) return;
    drawFrame(progress);
  }, [enabled, progress, loadedCount, drawFrame]);

  // Handle window resize
  useEffect(() => {
    if (!enabled) return;
    const handleResize = () => drawFrame(progress);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [enabled, progress, drawFrame]);

  return {
    meta,
    loadedCount,
    isFullyLoaded: meta ? loadedCount >= meta.count : false,
  };
}

