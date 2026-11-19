import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ArchitecturalParticleLogo.css';

/**
 * ArchitecturalParticleLogo
 * -------------------------------------------------------------------
 * Pure dot-matrix particle composition spelling "MITJEN INTERIORS"
 * and subtitle "ARCHITECTURE & INTERIOR DESIGN".
 *
 * 100% crisp dots — reduced by 20% for refined architectural scale.
 * Typography updated to architectural condensed display ("Bebas Neue" / "Manrope").
 */
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  isSubtitle: boolean;
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

  // Particles state (pure dots only)
  const particlesRef = useRef<Particle[]>([]);
  const charcoalDotSpriteRef = useRef<{ canvas: HTMLCanvasElement; size: number } | null>(null);
  const bronzeDotSpriteRef = useRef<{ canvas: HTMLCanvasElement; size: number } | null>(null);

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
    radius: 80,
  });

  const [, setIsHovered] = useState<boolean>(false);

  // Initialize particles from rendered text (Typography & 20% smaller dots)
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
    // Dot radius reduced by 20%: 2.0px on desktop (4.0px diameter), 1.5px on mobile (3.0px diameter)
    const titleDotRadius = isMobile ? 1.5 : 2.0;
    const subDotRadius = isMobile ? 1.05 : 1.3;

    // 1. Pre-render Dot sprites at exact DPR-scaled size
    charcoalDotSpriteRef.current = createDotSprite(titleDotRadius, '#151412', dpr);
    bronzeDotSpriteRef.current = createDotSprite(subDotRadius, '#B88E4B', dpr);

    // 2. Offscreen Canvas for Typographic Sampling
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);

    const titleText = isMobile ? 'MITJEN' : 'MITJEN INTERIORS';
    const titleFontSize = Math.max(38, Math.min(92, Math.round(width * (isMobile ? 0.13 : 0.082))));
    const subtitleFontSize = Math.max(10, Math.min(15, Math.round(titleFontSize * 0.17)));

    const centerX = width / 2;
    const centerY = height / 2;

    const titleY = centerY - titleFontSize * 0.12;
    const subtitleY = titleY + titleFontSize * 0.60;

    // Draw primary wordmark in offscreen buffer using Bebas Neue / architectural typography
    offCtx.fillStyle = '#000000';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.font = `400 ${titleFontSize}px "Bebas Neue", "Space Grotesk", "Manrope", sans-serif`;

    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing = `${Math.round(titleFontSize * (isMobile ? 0.16 : 0.12))}px`;
    }
    offCtx.fillText(titleText, centerX, titleY);

    // Grid stride calibrated to the 20% smaller dot size
    const sampleGrid = isMobile ? 4.0 : 5.0;
    const step = Math.max(3, Math.round(sampleGrid * dpr));

    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imageData.data;

    const newParticles: Particle[] = [];

    // 3. Primary Title: 100% Pure Crisp Dots
    for (let py = 0; py < offCanvas.height; py += step) {
      for (let px = 0; px < offCanvas.width; px += step) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = data[index + 3];

        if (alpha > 105) {
          const posX = px / dpr;
          const posY = py / dpr;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 0.5,
            y: posY + (Math.random() - 0.5) * 0.5,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            isSubtitle: false,
            radius: titleDotRadius,
          });
        }
      }
    }

    // 4. Subtitle: "ARCHITECTURE & INTERIOR DESIGN"
    offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    offCtx.font = `600 ${subtitleFontSize}px "Manrope", "DM Sans", sans-serif`;
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing = `${Math.round(subtitleFontSize * 0.38)}px`;
    }
    offCtx.fillText('ARCHITECTURE & INTERIOR DESIGN', centerX, subtitleY);

    const subImageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const subData = subImageData.data;
    const subStep = Math.max(3, Math.round((isMobile ? 3.4 : 3.8) * dpr));

    for (let py = 0; py < offCanvas.height; py += subStep) {
      for (let px = 0; px < offCanvas.width; px += subStep) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = subData[index + 3];

        if (alpha > 105) {
          const posX = px / dpr;
          const posY = py / dpr;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 0.4,
            y: posY + (Math.random() - 0.5) * 0.4,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            isSubtitle: true,
            radius: subDotRadius,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, []);

  // Animation Loop: Pure Dot Physics & 1:1 Sharp Rendering
  useEffect(() => {
    initParticles();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initParticles();
      });
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
      const charcoalDot = charcoalDotSpriteRef.current;
      const bronzeDot = bronzeDotSpriteRef.current;
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
            const force = Math.pow(1 - dist / radius, 1.35) * 9.0;
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
        const dotSprite = p.isSubtitle ? bronzeDot : charcoalDot;
        if (dotSprite) {
          const offset = dotSprite.size / 2;
          const drawX = Math.round((p.x - offset) * dpr);
          const drawY = Math.round((p.y - offset) * dpr);
          ctx.drawImage(dotSprite.canvas, drawX, drawY);
        } else {
          ctx.fillStyle = p.isSubtitle ? '#B88E4B' : '#151412';
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
        ctx.lineWidth = 1.3 * dpr;
        ctx.beginPath();
        ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#181715';
        ctx.beginPath();
        ctx.arc(ringX, ringY, 2.4 * dpr, 0, Math.PI * 2);
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

          <h2 className="arch-particle-sr-only">MITJEN INTERIORS — ARCHITECTURE &amp; INTERIOR DESIGN</h2>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalParticleLogo;
