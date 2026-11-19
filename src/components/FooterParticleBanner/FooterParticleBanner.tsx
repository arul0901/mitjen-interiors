import React, { useEffect, useRef, useCallback } from 'react';
import './FooterParticleBanner.css';

/**
 * FooterParticleBanner
 * -------------------------------------------------------------------
 * Full-width dot-matrix typography particle banner positioned above
 * the site footer on the About page, faithful to the United Carriers
 * reference animation.
 *
 * 100% Crisp Dots — Absolutely NO interior objects or icons.
 *
 * Key behaviours:
 *  - Full-width edge-to-edge dot-matrix letterforms ("MITJEN INTERIORS").
 *  - Particles form smoothly on scroll into viewport.
 *  - Cursor proximity disperses dots radially with natural spring physics.
 *  - Custom circular cursor ring (circle + center dot) replaces system cursor.
 *  - High-performance antialiased canvas rendering.
 */

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
}

function createDotSprite(color: string, dpr: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 12 * dpr;
  c.height = 12 * dpr;
  const ctx = c.getContext('2d');
  if (!ctx) return c;

  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(6, 6, 2.5, 0, Math.PI * 2);
  ctx.fill();
  return c;
}

export const FooterParticleBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  const dotSpriteRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    isActive: false,
    radius: 96,
  });

  const isFormedRef = useRef(false);

  // ─── Particle initialisation (100% dots) ──────────────────────────────────
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Pre-render antialiased crisp dot sprite
    dotSpriteRef.current = createDotSprite('#151412', dpr);

    // Offscreen canvas for text raster sampling
    const off = document.createElement('canvas');
    off.width = canvas.width;
    off.height = canvas.height;
    const offCtx = off.getContext('2d');
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);

    const isMobile = width < 640;
    const text = isMobile ? 'MITJEN' : 'MITJEN INTERIORS';

    // Calibrate font size so text spans ~90-92% of the canvas width
    let lo = 20;
    let hi = Math.round(height * 0.95);
    let bestSize = lo;

    for (let iter = 0; iter < 20; iter++) {
      const mid = Math.round((lo + hi) / 2);
      offCtx.font = `900 ${mid}px "Plus Jakarta Sans", "Montserrat", Arial, sans-serif`;
      if ('letterSpacing' in offCtx) {
        (offCtx as unknown as { letterSpacing: string }).letterSpacing =
          `${Math.round(mid * 0.045)}px`;
      }
      const measured = offCtx.measureText(text).width;
      if (measured <= width * 0.92) {
        bestSize = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    const fontSize = bestSize;
    offCtx.font = `900 ${fontSize}px "Plus Jakarta Sans", "Montserrat", Arial, sans-serif`;
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing =
        `${Math.round(fontSize * 0.045)}px`;
    }

    offCtx.fillStyle = '#000000';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';

    const textY = height * 0.52;
    offCtx.fillText(text, width / 2, textY);

    // Grid sampling matching United Carriers dot-matrix density (~5-6 px stride)
    const stride = isMobile ? 4.6 : 5.4;
    const step = Math.max(3, Math.round(stride * dpr));

    const imgData = offCtx.getImageData(0, 0, off.width, off.height);
    const data = imgData.data;

    const formed = isFormedRef.current;
    const newParticles: Particle[] = [];

    for (let py = 0; py < off.height; py += step) {
      for (let px = 0; px < off.width; px += step) {
        const idx = (py * off.width + px) * 4;
        const alpha = data[idx + 3];

        if (alpha > 110) {
          const ox = px / dpr;
          const oy = py / dpr;

          // Initial position: formed at origin or scattered randomly
          const scatterX = Math.random() * width;
          const scatterY = Math.random() * height;

          newParticles.push({
            x: formed ? ox : scatterX,
            y: formed ? oy : scatterY,
            originX: ox,
            originY: oy,
            vx: 0,
            vy: 0,
            radius: isMobile ? 1.3 : 1.55,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, []);

  // ─── RAF animation loop (100% dots) ─────────────────────────────────────────
  useEffect(() => {
    initParticles();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

      const particles = particlesRef.current;
      const dotSprite = dotSpriteRef.current;
      const repRadius = mouse.radius;
      const repRadiusSq = repRadius * repRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor repulsion
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < repRadiusSq && dSq > 0.01) {
            const dist = Math.sqrt(dSq);
            const force = Math.pow(1 - dist / repRadius, 1.35) * 9.0;
            const ang = Math.atan2(dy, dx);
            p.vx += Math.cos(ang) * force;
            p.vy += Math.sin(ang) * force;
          }
        }

        // Home spring return
        const hx = p.originX - p.x;
        const hy = p.originY - p.y;
        p.vx += hx * 0.078;
        p.vy += hy * 0.078;
        p.vx *= 0.865;
        p.vy *= 0.865;
        p.x += p.vx;
        p.y += p.vy;

        // Render pure crisp dot
        if (dotSprite) {
          const sz = p.radius * 2;
          const dx2 = Math.round((p.x - p.radius) * dpr);
          const dy2 = Math.round((p.y - p.radius) * dpr);
          ctx.drawImage(
            dotSprite,
            dx2,
            dy2,
            Math.round(sz * dpr),
            Math.round(sz * dpr)
          );
        } else {
          ctx.fillStyle = '#151412';
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // In-canvas custom circular cursor ring (matching United Carriers reference)
      if (
        mouse.isActive &&
        mouse.x > 0 &&
        mouse.x < width &&
        mouse.y > 0 &&
        mouse.y < height
      ) {
        const rx = mouse.x * dpr;
        const ry = mouse.y * dpr;
        ctx.save();
        ctx.strokeStyle = '#181715';
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.arc(rx, ry, 28 * dpr, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#181715';
        ctx.beginPath();
        ctx.arc(rx, ry, 2.4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [initParticles]);

  // Viewport entry observer — trigger formation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFormedRef.current) {
            isFormedRef.current = true;
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Resize handler
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => initParticles(), 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [initParticles]);

  // Pointer movement handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.targetX = e.clientX - rect.left;
    mouseRef.current.targetY = e.clientY - rect.top;
    mouseRef.current.isActive = true;
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isActive = true;
  };

  const handlePointerLeave = () => {
    mouseRef.current.isActive = false;
    mouseRef.current.targetX = -9999;
    mouseRef.current.targetY = -9999;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!e.touches.length) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.targetX = e.touches[0].clientX - rect.left;
    mouseRef.current.targetY = e.touches[0].clientY - rect.top;
    mouseRef.current.isActive = true;
  };

  const handleTouchEnd = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <section
      ref={sectionRef}
      className="fpb-section"
      aria-label="Mitjen Interiors — Interactive Particle Typography Banner"
    >
      <div className="fpb-rule-top" aria-hidden="true" />

      <div className="fpb-canvas-wrap">
        <canvas
          ref={canvasRef}
          className="fpb-canvas"
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="img"
          aria-label="Particle dot-matrix typography: MITJEN INTERIORS"
        />
        <span className="fpb-sr-only">MITJEN INTERIORS</span>
      </div>

      <div className="fpb-rule-bottom" aria-hidden="true" />
    </section>
  );
};

export default FooterParticleBanner;
