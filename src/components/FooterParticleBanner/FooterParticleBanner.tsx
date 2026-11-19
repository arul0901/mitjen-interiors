import React, { useEffect, useRef, useCallback } from 'react';
import './FooterParticleBanner.css';

/**
 * FooterParticleBanner
 * -------------------------------------------------------------------
 * Full-width dot-matrix typography particle banner positioned above
 * the site footer on the About page, faithful to the United Carriers
 * reference animation.
 *
 * Key behaviours:
 *  - Particles fly in from random scattered positions when the section
 *    enters the viewport (IntersectionObserver → formation animation).
 *  - Cursor proximity disperses particles radially with spring physics.
 *  - Custom circular cursor ring replaces the system cursor over canvas.
 *  - ~84% crisp dots + ~16% miniature interior-design glyphs.
 *  - Text: "MITJEN INTERIORS" spanning ~90 % of canvas width.
 */

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  kind: 'dot' | 'interior';
  glyphIndex: number;
  scale: number;
  radius: number;
  /** 0 → fully scattered, 1 → at home position (lerp target for formation) */
  formed: number;
}

// ─── Sprite helpers ────────────────────────────────────────────────────────────

const SPRITE_SIZE = 20;

function createDotSprite(color: string, dpr: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 12 * dpr;
  c.height = 12 * dpr;
  const ctx = c.getContext('2d')!;
  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(6, 6, 2.6, 0, Math.PI * 2);
  ctx.fill();
  return c;
}

function createGlyphSprites(color: string, dpr: number): HTMLCanvasElement[] {
  const sprites: HTMLCanvasElement[] = [];

  for (let i = 0; i < 11; i++) {
    const c = document.createElement('canvas');
    c.width = SPRITE_SIZE * dpr;
    c.height = SPRITE_SIZE * dpr;
    const ctx = c.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.9;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = SPRITE_SIZE / 2;
    const cy = SPRITE_SIZE / 2;

    switch (i) {
      // 0: Armchair
      case 0: {
        ctx.fillRect(cx - 4.5, cy - 5, 9, 4);
        ctx.fillRect(cx - 5, cy - 1, 10, 2.4);
        ctx.beginPath();
        ctx.moveTo(cx - 3.5, cy + 1.4); ctx.lineTo(cx - 4.5, cy + 5.5);
        ctx.moveTo(cx + 3.5, cy + 1.4); ctx.lineTo(cx + 4.5, cy + 5.5);
        ctx.stroke();
        break;
      }
      // 1: Sofa
      case 1: {
        ctx.fillRect(cx - 7, cy - 4, 14, 4);
        ctx.strokeStyle = '#FAF8F5'; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy); ctx.stroke();
        ctx.strokeStyle = color; ctx.lineWidth = 0.9;
        ctx.fillRect(cx - 7.5, cy - 2.5, 1.8, 5);
        ctx.fillRect(cx + 5.7, cy - 2.5, 1.8, 5);
        ctx.fillRect(cx - 6.5, cy + 0.5, 13, 2);
        break;
      }
      // 2: Console table
      case 2: {
        ctx.fillRect(cx - 5.5, cy - 1.5, 11, 1.8);
        ctx.beginPath();
        ctx.moveTo(cx - 3.5, cy + 0.3); ctx.lineTo(cx - 5, cy + 5.5);
        ctx.moveTo(cx + 3.5, cy + 0.3); ctx.lineTo(cx + 5, cy + 5.5);
        ctx.stroke();
        break;
      }
      // 3: Pendant light
      case 3: {
        ctx.beginPath();
        ctx.moveTo(cx, cy - 6); ctx.lineTo(cx, cy - 1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 1); ctx.lineTo(cx - 4, cy + 3); ctx.lineTo(cx + 4, cy + 3);
        ctx.closePath(); ctx.fill();
        ctx.beginPath(); ctx.arc(cx, cy + 4.2, 1.0, 0, Math.PI * 2); ctx.fill();
        break;
      }
      // 4: Roman arch
      case 4: {
        ctx.beginPath();
        ctx.arc(cx, cy - 1, 4.8, Math.PI, 0, false);
        ctx.lineTo(cx + 4.8, cy + 6);
        ctx.lineTo(cx + 3.1, cy + 6);
        ctx.lineTo(cx + 3.1, cy - 1);
        ctx.arc(cx, cy - 1, 3.1, 0, Math.PI, true);
        ctx.lineTo(cx - 3.1, cy + 6);
        ctx.lineTo(cx - 4.8, cy + 6);
        ctx.closePath(); ctx.fill();
        break;
      }
      // 5: Fluted column
      case 5: {
        ctx.fillRect(cx - 5, cy - 5.5, 10, 1.6);
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy - 3.9); ctx.lineTo(cx - 3, cy + 3.9);
        ctx.moveTo(cx, cy - 3.9);    ctx.lineTo(cx, cy + 3.9);
        ctx.moveTo(cx + 3, cy - 3.9); ctx.lineTo(cx + 3, cy + 3.9);
        ctx.stroke();
        ctx.fillRect(cx - 5, cy + 3.9, 10, 1.6);
        break;
      }
      // 6: Door swing (blueprint)
      case 6: {
        ctx.fillRect(cx - 5.5, cy - 4.5, 1.8, 1.8);
        ctx.beginPath();
        ctx.moveTo(cx - 4.6, cy - 3.6); ctx.lineTo(cx - 4.6, cy + 5.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 4.6, cy - 3.6, 9, 0, Math.PI / 2, false);
        ctx.setLineDash([1.2, 1.2]); ctx.stroke(); ctx.setLineDash([]);
        break;
      }
      // 7: Staircase
      case 7: {
        ctx.beginPath();
        ctx.moveTo(cx - 5.5, cy + 5.5);
        ctx.lineTo(cx - 5.5, cy + 2.5); ctx.lineTo(cx - 1.8, cy + 2.5);
        ctx.lineTo(cx - 1.8, cy - 0.5); ctx.lineTo(cx + 1.8, cy - 0.5);
        ctx.lineTo(cx + 1.8, cy - 3.5); ctx.lineTo(cx + 5.5, cy - 3.5);
        ctx.lineTo(cx + 5.5, cy - 5.5);
        ctx.stroke();
        break;
      }
      // 8: Window frame
      case 8: {
        ctx.strokeRect(cx - 5, cy - 5, 10, 10);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5);
        ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy);
        ctx.stroke();
        break;
      }
      // 9: Vase
      case 9: {
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy - 5);
        ctx.lineTo(cx + 2, cy - 5);
        ctx.quadraticCurveTo(cx + 1, cy - 2, cx + 4, cy + 1);
        ctx.quadraticCurveTo(cx + 4, cy + 5, cx + 2, cy + 6);
        ctx.lineTo(cx - 2, cy + 6);
        ctx.quadraticCurveTo(cx - 4, cy + 5, cx - 4, cy + 1);
        ctx.quadraticCurveTo(cx - 1, cy - 2, cx - 2, cy - 5);
        ctx.closePath(); ctx.fill();
        break;
      }
      // 10: Blueprint crosshair
      case 10: {
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy); ctx.lineTo(cx + 5, cy);
        ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + 5);
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy + 2); ctx.lineTo(cx + 2, cy - 2);
        ctx.stroke();
        break;
      }
    }

    sprites.push(c);
  }

  return sprites;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export const FooterParticleBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const rafIdRef   = useRef<number | null>(null);

  const particlesRef   = useRef<Particle[]>([]);
  const dotSpriteRef   = useRef<HTMLCanvasElement | null>(null);
  const glyphSpritesRef = useRef<HTMLCanvasElement[]>([]);

  const mouseRef = useRef({
    x: -9999, y: -9999,
    targetX: -9999, targetY: -9999,
    isActive: false,
    radius: 92,
  });

  /** Whether particles have been commanded to form into letter shapes */
  const isFormedRef = useRef(false);

  // ─── Particle initialisation ────────────────────────────────────────────────
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect  = canvas.getBoundingClientRect();
    const width  = rect.width;
    const height = rect.height;
    if (width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.round(width  * dpr);
    canvas.height = Math.round(height * dpr);

    // Sprites
    dotSpriteRef.current    = createDotSprite('#151412', dpr);
    glyphSpritesRef.current = createGlyphSprites('#151412', dpr);

    // Offscreen canvas for text raster sampling
    const off = document.createElement('canvas');
    off.width  = canvas.width;
    off.height = canvas.height;
    const offCtx = off.getContext('2d');
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);

    // Calibrate font size so text spans ~90 % of the canvas width
    const isMobile = width < 640;
    const text     = isMobile ? 'MITJEN' : 'MITJEN INTERIORS';

    // Binary-search for the right font size
    let lo = 20, hi = Math.round(height * 0.95), bestSize = lo;
    for (let iter = 0; iter < 20; iter++) {
      const mid = Math.round((lo + hi) / 2);
      offCtx.font = `900 ${mid}px "Plus Jakarta Sans", "Montserrat", Arial, sans-serif`;
      if ('letterSpacing' in offCtx) {
        (offCtx as unknown as { letterSpacing: string }).letterSpacing =
          `${Math.round(mid * 0.045)}px`;
      }
      const measured = offCtx.measureText(text).width;
      if (measured <= width * 0.90) { bestSize = mid; lo = mid + 1; }
      else hi = mid - 1;
    }

    const fontSize = bestSize;
    offCtx.font = `900 ${fontSize}px "Plus Jakarta Sans", "Montserrat", Arial, sans-serif`;
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing =
        `${Math.round(fontSize * 0.045)}px`;
    }

    offCtx.fillStyle    = '#000000';
    offCtx.textAlign    = 'center';
    offCtx.textBaseline = 'middle';

    // Vertical centre — slightly above mid to give visual weight
    const textY = height * 0.52;
    offCtx.fillText(text, width / 2, textY);

    // Grid sampling — stride chosen to match reference dot density (~5-7 px)
    const stride = isMobile ? 4.5 : 5.5;
    const step   = Math.max(3, Math.round(stride * dpr));

    const imgData = offCtx.getImageData(0, 0, off.width, off.height);
    const data    = imgData.data;

    const formed = isFormedRef.current;
    const newParticles: Particle[] = [];

    for (let py = 0; py < off.height; py += step) {
      for (let px = 0; px < off.width; px += step) {
        const idx   = (py * off.width + px) * 4;
        const alpha = data[idx + 3];

        if (alpha > 110) {
          const ox = px / dpr;
          const oy = py / dpr;

          const isInterior = Math.random() < 0.16;

          // Initial position: if already formed → at origin; else scattered
          const scatterX = Math.random() * width;
          const scatterY = Math.random() * height;

          newParticles.push({
            x: formed ? ox : scatterX,
            y: formed ? oy : scatterY,
            originX: ox,
            originY: oy,
            vx: 0,
            vy: 0,
            kind: isInterior ? 'interior' : 'dot',
            glyphIndex: Math.floor(Math.random() * 11),
            scale: isMobile ? 0.30 : 0.36,
            radius: isMobile ? 1.25 : 1.5,
            formed: formed ? 1 : 0,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, []);

  // ─── RAF animation loop ─────────────────────────────────────────────────────
  useEffect(() => {
    initParticles();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const dpr    = Math.min(window.devicePixelRatio || 1, 2);
      const width  = canvas.width  / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth cursor lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

      const particles  = particlesRef.current;
      const dotSprite  = dotSpriteRef.current;
      const glyphs     = glyphSpritesRef.current;
      const repRadius  = mouse.radius;
      const repRadiusSq = repRadius * repRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // ── Cursor repulsion ──────────────────────────────────────────────
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < repRadiusSq && dSq > 0.01) {
            const dist  = Math.sqrt(dSq);
            const force = Math.pow(1 - dist / repRadius, 1.35) * 9.0;
            const ang   = Math.atan2(dy, dx);
            p.vx += Math.cos(ang) * force;
            p.vy += Math.sin(ang) * force;
          }
        }

        // ── Spring return physics ─────────────────────────────────────────
        const hx = p.originX - p.x;
        const hy = p.originY - p.y;
        p.vx += hx * 0.078;
        p.vy += hy * 0.078;
        p.vx *= 0.865;
        p.vy *= 0.865;
        p.x  += p.vx;
        p.y  += p.vy;

        // ── Draw ──────────────────────────────────────────────────────────
        if (p.kind === 'dot') {
          if (dotSprite) {
            const sz  = p.radius * 2;
            const dx2 = Math.round((p.x - p.radius) * dpr);
            const dy2 = Math.round((p.y - p.radius) * dpr);
            ctx.drawImage(dotSprite, dx2, dy2,
              Math.round(sz * dpr), Math.round(sz * dpr));
          } else {
            ctx.fillStyle = '#151412';
            ctx.beginPath();
            ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          const sprite = glyphs[p.glyphIndex];
          if (sprite) {
            const dw  = SPRITE_SIZE * p.scale;
            const dh  = SPRITE_SIZE * p.scale;
            const dx2 = Math.round((p.x - dw / 2) * dpr);
            const dy2 = Math.round((p.y - dh / 2) * dpr);
            ctx.drawImage(sprite, dx2, dy2,
              Math.round(dw * dpr), Math.round(dh * dpr));
          }
        }
      }

      // ── Custom cursor ring ────────────────────────────────────────────────
      if (mouse.isActive && mouse.x > 0 && mouse.x < width
                         && mouse.y > 0 && mouse.y < height) {
        const rx = mouse.x * dpr;
        const ry = mouse.y * dpr;
        ctx.save();
        ctx.strokeStyle = '#181715';
        ctx.lineWidth   = 1.2 * dpr;
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

  // ─── IntersectionObserver – trigger formation on viewport entry ─────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFormedRef.current) {
            isFormedRef.current = true;
            // Particles are already running; just let spring physics pull them home
            // (all particles already have originX/originY set; vx/vy will do the work)
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ─── Resize handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => initParticles(), 150);
    };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', onResize); };
  }, [initParticles]);

  // ─── Pointer handlers ───────────────────────────────────────────────────────
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
    mouseRef.current.x       = x;
    mouseRef.current.y       = y;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isActive = true;
  };

  const handlePointerLeave = () => {
    mouseRef.current.isActive = false;
    mouseRef.current.targetX  = -9999;
    mouseRef.current.targetY  = -9999;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!e.touches.length) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.targetX = e.touches[0].clientX - rect.left;
    mouseRef.current.targetY = e.touches[0].clientY - rect.top;
    mouseRef.current.isActive = true;
  };

  const handleTouchEnd = () => { mouseRef.current.isActive = false; };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="fpb-section"
      aria-label="Mitjen Interiors — Interactive Particle Typography Banner"
    >
      {/* Top rule */}
      <div className="fpb-rule-top" aria-hidden="true" />

      {/* Canvas stage */}
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
        {/* Accessible fallback */}
        <span className="fpb-sr-only">MITJEN INTERIORS</span>
      </div>

      {/* Bottom rule */}
      <div className="fpb-rule-bottom" aria-hidden="true" />
    </section>
  );
};

export default FooterParticleBanner;
