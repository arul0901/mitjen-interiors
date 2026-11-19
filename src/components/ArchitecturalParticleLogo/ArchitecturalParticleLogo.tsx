import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ArchitecturalParticleLogo.css';

/**
 * ArchitecturalParticleLogo
 * -------------------------------------------------------------------
 * Pure dot-matrix particle composition spelling "MITJEN INTERIORS".
 *
 * Design updates:
 *   - Subtitle REMOVED completely for clean, focused majesty.
 *   - Font size substantially INCREASED to span the canvas prominently.
 *   - Dot size REDUCED to delicate, fine micro-particles (radius 1.25px / dia 2.5px)
 *     with high-density sampling for razor-sharp serif definition.
 *   - Stylish and aesthetic architectural serif typography:
 *     "Cinzel", "Cormorant Garamond", "Playfair Display", Georgia, serif.
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

/**
 * Pre-rendered Crisp Dot Sprite at exact physical size (High-DPR antialiased circular particle)
 */
function createDotSprite(radius: number, color: string, dpr: number): { canvas: HTMLCanvasElement; size: number } {
  const size = Math.ceil(radius * 2 + 2);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return { canvas, size };

  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
  ctx.fill();
  return { canvas, size };
}

export const ArchitecturalParticleLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Particles state (pure dots only, no subtitle)
  const particlesRef = useRef<Particle[]>([]);
  const dotSpriteRef = useRef<{ canvas: HTMLCanvasElement; size: number } | null>(null);

  // Mouse / Pointer State
  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    isActive: boolean;
    radius: number;
  }>({
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    isActive: false,
    radius: 88,
  });

  const [, setIsHovered] = useState<boolean>(false);

  // Initialize particles from rendered text (Grand, Stylish & Aesthetic Typography)
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

    const isMobile = width < 680;
    // Delicate, fine micro-dots: 1.25px radius on desktop (2.5px dia), 1.0px on mobile (2.0px dia)
    const dotRadius = isMobile ? 1.0 : 1.25;

    // 1. Pre-render Dot sprite at exact DPR size
    dotSpriteRef.current = createDotSprite(dotRadius, '#161513', dpr);

    // 2. Offscreen Canvas for Typographic Sampling
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);

    const titleText = isMobile ? 'MITJEN' : 'MITJEN INTERIORS';

    // Stylish & aesthetic architectural typography
    const fontStack = '"Cinzel", "Cormorant Garamond", "Playfair Display", Georgia, serif';
    const letterSpacingRatio = isMobile ? 0.12 : 0.09;

    // Binary search for grand, prominent font size filling ~90% of canvas width
    let lo = 28;
    let hi = Math.round(height * 0.75);
    let bestSize = lo;

    for (let iter = 0; iter < 20; iter++) {
      const mid = Math.round((lo + hi) / 2);
      offCtx.font = `600 ${mid}px ${fontStack}`;
      if ('letterSpacing' in offCtx) {
        (offCtx as unknown as { letterSpacing: string }).letterSpacing =
          `${Math.round(mid * letterSpacingRatio)}px`;
      }
      const measured = offCtx.measureText(titleText).width;
      if (measured <= width * 0.90) {
        bestSize = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    const titleFontSize = bestSize;
    offCtx.font = `600 ${titleFontSize}px ${fontStack}`;
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing =
        `${Math.round(titleFontSize * letterSpacingRatio)}px`;
    }

    const centerX = width / 2;
    // Perfectly vertically centered in canvas (no subtitle below)
    const centerY = height * 0.52;

    offCtx.fillStyle = '#000000';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText(titleText, centerX, centerY);

    // High-density sampling stride for razor-sharp serif fidelity (3.2px desktop / 2.5px mobile)
    const stride = isMobile ? 2.5 : 3.2;
    const step = Math.max(2, Math.round(stride * dpr));

    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imageData.data;

    const newParticles: Particle[] = [];

    for (let py = 0; py < offCanvas.height; py += step) {
      for (let px = 0; px < offCanvas.width; px += step) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = data[index + 3];

        // Low threshold so fine serifs, brackets, and tapers are captured
        if (alpha > 75) {
          const posX = px / dpr;
          const posY = py / dpr;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 0.3,
            y: posY + (Math.random() - 0.5) * 0.3,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            radius: dotRadius,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, []);

  // Animation Loop: Pure Dot Physics & 1:1 Sharp Rendering
  useEffect(() => {
    initParticles();

    if (document.fonts) {
      Promise.all([
        document.fonts.load('600 80px "Cinzel"').catch(() => {}),
        document.fonts.load('700 80px "Cormorant Garamond"').catch(() => {}),
      ]).then(() => {
        initParticles();
      });

      if (document.fonts.ready) {
        document.fonts.ready.then(() => {
          initParticles();
        });
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.24;
      mouse.y += (mouse.targetY - mouse.y) * 0.24;

      const particles = particlesRef.current;
      const spriteInfo = dotSpriteRef.current;
      const radius = mouse.radius;
      const radiusSq = radius * radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Mouse Repulsion Force
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow(1 - dist / radius, 1.35) * 9.2;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // 2. Home Return Spring Physics
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.082;
        p.vy += homeDy * 0.082;

        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // 3. Render 1:1 Pixel-Accurate Crisp Dots
        if (spriteInfo) {
          const offset = spriteInfo.size / 2;
          const drawX = Math.round((p.x - offset) * dpr);
          const drawY = Math.round((p.y - offset) * dpr);
          ctx.drawImage(spriteInfo.canvas, drawX, drawY);
        } else {
          ctx.fillStyle = '#161513';
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw Interactive Architectural Cursor Ring
      if (mouse.isActive && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const ringX = mouse.x * dpr;
        const ringY = mouse.y * dpr;
        const ringRadius = 26 * dpr;

        ctx.save();
        ctx.strokeStyle = '#181715';
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#181715';
        ctx.beginPath();
        ctx.arc(ringX, ringY, 2.2 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [initParticles]);

  // Window resize handler with debounce
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        initParticles();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles]);

  // Pointer Movement Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isActive = true;
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isActive = true;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    mouseRef.current.isActive = false;
    mouseRef.current.targetX = -9999;
    mouseRef.current.targetY = -9999;
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isActive = true;
  };

  const handleTouchEnd = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <section
      className="arch-particle-banner-section"
      aria-label="Mitjen Interiors Architecture & Design Interactive Particle Composition"
      ref={containerRef}
    >
      <div className="arch-particle-container">
        {/* Editorial Subheader Meta */}
        <div className="arch-particle-header-meta">
          <div className="arch-particle-badge">
            <span className="arch-particle-badge-dot" />
            <span>ARCHITECTURAL ATELIER · PARTICLE COMPOSITION</span>
          </div>
          <div className="arch-particle-hint">
            <span>Hover or Glide Cursor to Disperse Dots</span>
          </div>
        </div>

        {/* Interactive Canvas Stage */}
        <div className="arch-particle-canvas-wrapper">
          <span className="arch-particle-registration arch-particle-reg-tl" aria-hidden="true" />
          <span className="arch-particle-registration arch-particle-reg-tr" aria-hidden="true" />
          <span className="arch-particle-registration arch-particle-reg-bl" aria-hidden="true" />
          <span className="arch-particle-registration arch-particle-reg-br" aria-hidden="true" />

          <canvas
            ref={canvasRef}
            className="arch-particle-canvas"
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="img"
            aria-label="Interactive particle typography of MITJEN INTERIORS composed of 100% crisp dot-matrix particles"
          />

          <h2 className="arch-particle-sr-only">MITJEN INTERIORS</h2>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalParticleLogo;
