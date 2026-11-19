import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ArchitecturalParticleLogo.css';

/**
 * Particle Type:
 * - 'dot': Authentic crisp circular particle forming the primary dot-matrix typography (preserving 100% of the baseline particle system).
 * - 'interior': Miniature interior design / architectural element coexisting alongside the dots (~15-18% natural distribution).
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
  isSubtitle: boolean;
  scale: number;
  baseAlpha: number;
  radius: number;
}

const SPRITE_SIZE = 24;

/**
 * 11 Miniature Interior Design & Architectural Glyphs (Drawn into 24x24 sprite buffers)
 * Engineered within tiny, delicate silhouettes matching the visual footprint of the adjacent dots.
 */
function createInteriorGlyphSprites(color: string, dpr: number): HTMLCanvasElement[] {
  const glyphs: HTMLCanvasElement[] = [];

  for (let i = 0; i < 11; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = SPRITE_SIZE * dpr;
    canvas.height = SPRITE_SIZE * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.scale(dpr, dpr);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.0;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = SPRITE_SIZE / 2;
    const cy = SPRITE_SIZE / 2;

    switch (i) {
      // 0: Miniature Bauhaus / Scandinavian Armchair
      case 0: {
        // Curved backrest
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(cx - 5.5, cy - 6, 11, 5, 1.5) : ctx.rect(cx - 5.5, cy - 6, 11, 5);
        ctx.fill();
        // Horizontal seat cushion
        ctx.fillRect(cx - 6, cy, 12, 2.8);
        // Tapered legs
        ctx.beginPath();
        ctx.moveTo(cx - 4.5, cy + 2.8);
        ctx.lineTo(cx - 5.5, cy + 6.5);
        ctx.moveTo(cx + 4.5, cy + 2.8);
        ctx.lineTo(cx + 5.5, cy + 6.5);
        ctx.stroke();
        break;
      }

      // 1: Modular Sofa Silhouette (2-seater)
      case 1: {
        // Low-profile backrest with fine cushion divide
        ctx.fillRect(cx - 7.5, cy - 4.5, 15, 4.5);
        ctx.strokeStyle = '#FAF8F5';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 4.5);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        // Arms
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.0;
        ctx.fillRect(cx - 8.5, cy - 2.8, 2, 5.5);
        ctx.fillRect(cx + 6.5, cy - 2.8, 2, 5.5);
        // Plinth base
        ctx.fillRect(cx - 7, cy + 0.8, 14, 2.5);
        break;
      }

      // 2: Minimalist Console / Coffee Table
      case 2: {
        // Tabletop slab
        ctx.fillRect(cx - 6.5, cy - 1.8, 13, 2.2);
        // Splayed tapered hairpin legs
        ctx.beginPath();
        ctx.moveTo(cx - 4.5, cy + 0.4);
        ctx.lineTo(cx - 6, cy + 6.5);
        ctx.moveTo(cx + 4.5, cy + 0.4);
        ctx.lineTo(cx + 6, cy + 6.5);
        ctx.stroke();
        break;
      }

      // 3: Pendant Lighting Fixture
      case 3: {
        // Fine ceiling suspension cord
        ctx.beginPath();
        ctx.moveTo(cx, cy - 7);
        ctx.lineTo(cx, cy - 1.5);
        ctx.stroke();
        // Conical / Bell lampshade
        ctx.beginPath();
        ctx.moveTo(cx, cy - 1.5);
        ctx.lineTo(cx - 4.5, cy + 3);
        ctx.lineTo(cx + 4.5, cy + 3);
        ctx.closePath();
        ctx.fill();
        // Drop radiant bulb dot
        ctx.beginPath();
        ctx.arc(cx, cy + 4.8, 1.1, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      // 4: Architectural Roman Arch Outline
      case 4: {
        ctx.beginPath();
        // Outer arch
        ctx.arc(cx, cy - 1, 5.5, Math.PI, 0, false);
        ctx.lineTo(cx + 5.5, cy + 6.5);
        ctx.lineTo(cx + 3.6, cy + 6.5);
        ctx.lineTo(cx + 3.6, cy - 1);
        ctx.arc(cx, cy - 1, 3.6, 0, Math.PI, true);
        ctx.lineTo(cx - 3.6, cy + 6.5);
        ctx.lineTo(cx - 5.5, cy + 6.5);
        ctx.closePath();
        ctx.fill();
        break;
      }

      // 5: Fluted Architectural Column
      case 5: {
        // Capital cornice
        ctx.fillRect(cx - 5.5, cy - 6.5, 11, 1.8);
        // Fluted vertical shaft
        ctx.beginPath();
        ctx.moveTo(cx - 3.5, cy - 4.7);
        ctx.lineTo(cx - 3.5, cy + 4.7);
        ctx.moveTo(cx, cy - 4.7);
        ctx.lineTo(cx, cy + 4.7);
        ctx.moveTo(cx + 3.5, cy - 4.7);
        ctx.lineTo(cx + 3.5, cy + 4.7);
        ctx.stroke();
        // Base plinth
        ctx.fillRect(cx - 5.5, cy + 4.7, 11, 1.8);
        break;
      }

      // 6: Blueprint Floor-Plan Door Swing Symbol
      case 6: {
        ctx.beginPath();
        // Jamb point
        ctx.fillRect(cx - 6, cy - 5, 2, 2);
        // Open door leaf line
        ctx.moveTo(cx - 5, cy - 4);
        ctx.lineTo(cx - 5, cy + 6);
        ctx.stroke();
        // 90-degree swing arc
        ctx.beginPath();
        ctx.arc(cx - 5, cy - 4, 10, 0, Math.PI / 2, false);
        ctx.setLineDash([1.5, 1.5]);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }

      // 7: Architectural Staircase Profile
      case 7: {
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy + 6);
        ctx.lineTo(cx - 6, cy + 3);
        ctx.lineTo(cx - 2, cy + 3);
        ctx.lineTo(cx - 2, cy);
        ctx.lineTo(cx + 2, cy);
        ctx.lineTo(cx + 2, cy - 3);
        ctx.lineTo(cx + 6, cy - 3);
        ctx.lineTo(cx + 6, cy - 6);
        ctx.stroke();
        break;
      }

      // 8: Minimalist Casement Window Frame
      case 8: {
        // Outer frame
        ctx.strokeRect(cx - 5.5, cy - 5.5, 11, 11);
        // Cross mullions
        ctx.beginPath();
        ctx.moveTo(cx, cy - 5.5);
        ctx.lineTo(cx, cy + 5.5);
        ctx.moveTo(cx - 5.5, cy);
        ctx.lineTo(cx + 5.5, cy);
        ctx.stroke();
        break;
      }

      // 9: Sculptural Ceramic Amphora / Vase
      case 9: {
        ctx.beginPath();
        ctx.moveTo(cx - 2.2, cy - 5.5);
        ctx.lineTo(cx + 2.2, cy - 5.5);
        ctx.quadraticCurveTo(cx + 1.0, cy - 2.5, cx + 4.5, cy + 1);
        ctx.quadraticCurveTo(cx + 4.5, cy + 5.5, cx + 2.2, cy + 6.5);
        ctx.lineTo(cx - 2.2, cy + 6.5);
        ctx.quadraticCurveTo(cx - 4.5, cy + 5.5, cx - 4.5, cy + 1);
        ctx.quadraticCurveTo(cx - 1.0, cy - 2.5, cx - 2.2, cy - 5.5);
        ctx.closePath();
        ctx.fill();
        break;
      }

      // 10: Blueprint Crosshair & Dimension Tick
      case 10: {
        ctx.beginPath();
        // Dimension axes
        ctx.moveTo(cx - 5.5, cy);
        ctx.lineTo(cx + 5.5, cy);
        ctx.moveTo(cx, cy - 5.5);
        ctx.lineTo(cx, cy + 5.5);
        ctx.stroke();
        // 45-degree architectural slash
        ctx.beginPath();
        ctx.lineWidth = 1.3;
        ctx.moveTo(cx - 2.5, cy + 2.5);
        ctx.lineTo(cx + 2.5, cy - 2.5);
        ctx.stroke();
        break;
      }
    }

    glyphs.push(canvas);
  }

  return glyphs;
}

/**
 * Pre-rendered Crisp Dot Sprite (High-DPR antialiased circular particle)
 */
function createDotSprite(color: string, dpr: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 12 * dpr;
  canvas.height = 12 * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(6, 6, 2.5, 0, Math.PI * 2);
  ctx.fill();
  return canvas;
}

export const ArchitecturalParticleLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Particles state
  const particlesRef = useRef<Particle[]>([]);
  const charcoalGlyphSpritesRef = useRef<HTMLCanvasElement[]>([]);
  const bronzeGlyphSpritesRef = useRef<HTMLCanvasElement[]>([]);
  const charcoalDotSpriteRef = useRef<HTMLCanvasElement | null>(null);
  const bronzeDotSpriteRef = useRef<HTMLCanvasElement | null>(null);

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
    radius: 76,
  });

  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Initialize particles from rendered text
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

    // 1. Pre-render Dot and Glyph sprites
    charcoalDotSpriteRef.current = createDotSprite('#151412', dpr);
    bronzeDotSpriteRef.current = createDotSprite('#B88E4B', dpr);
    charcoalGlyphSpritesRef.current = createInteriorGlyphSprites('#151412', dpr);
    bronzeGlyphSpritesRef.current = createInteriorGlyphSprites('#B88E4B', dpr);

    // 2. Offscreen Canvas for Typographic Sampling
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);

    // Sizing calibrated to fill wide banner layout like unitedcarriers.com
    // Primary: "MITJEN INTERIORS" (or "MITJEN" on very narrow screens)
    const isMobile = width < 680;
    const titleText = isMobile ? 'MITJEN' : 'MITJEN INTERIORS';
    const titleFontSize = Math.max(34, Math.min(84, Math.round(width * (isMobile ? 0.12 : 0.076))));
    const subtitleFontSize = Math.max(9, Math.min(16, Math.round(titleFontSize * 0.18)));

    const centerX = width / 2;
    const centerY = height / 2;

    const titleY = centerY - titleFontSize * 0.12;
    const subtitleY = titleY + titleFontSize * 0.62;

    // Draw primary wordmark in offscreen buffer
    offCtx.fillStyle = '#000000';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.font = `900 ${titleFontSize}px "Plus Jakarta Sans", "Montserrat", "Arial", sans-serif`;

    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing = `${Math.round(titleFontSize * (isMobile ? 0.14 : 0.08))}px`;
    }
    offCtx.fillText(titleText, centerX, titleY);

    // Sample grid stride (exact match to reference video dot-matrix density)
    const sampleGrid = isMobile ? 4.8 : 5.4;
    const step = Math.max(3, Math.round(sampleGrid * dpr));

    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imageData.data;

    const newParticles: Particle[] = [];

    // 3. Collect Primary Particles (Preserving the dots + adding interior elements alongside)
    for (let py = 0; py < offCanvas.height; py += step) {
      for (let px = 0; px < offCanvas.width; px += step) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = data[index + 3];

        if (alpha > 120) {
          const posX = px / dpr;
          const posY = py / dpr;

          // Coexistence ratio: ~82% are authentic crisp dots, ~18% are interior design elements
          const isInterior = Math.random() < 0.18;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 1.0,
            y: posY + (Math.random() - 0.5) * 1.0,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            kind: isInterior ? 'interior' : 'dot',
            glyphIndex: Math.floor(Math.random() * 11),
            isSubtitle: false,
            scale: isMobile ? 0.32 : 0.38,
            baseAlpha: 0.88 + Math.random() * 0.12,
            radius: isMobile ? 1.3 : 1.55,
          });
        }
      }
    }

    // 4. Subtitle: "ARCHITECTURE & INTERIOR DESIGN"
    offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    offCtx.font = `700 ${subtitleFontSize}px "Plus Jakarta Sans", "Montserrat", sans-serif`;
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing = `${Math.round(subtitleFontSize * 0.34)}px`;
    }
    offCtx.fillText('ARCHITECTURE & INTERIOR DESIGN', centerX, subtitleY);

    const subImageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const subData = subImageData.data;
    const subStep = Math.max(3, Math.round((isMobile ? 4.0 : 4.6) * dpr));

    for (let py = 0; py < offCanvas.height; py += subStep) {
      for (let px = 0; px < offCanvas.width; px += subStep) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = subData[index + 3];

        if (alpha > 120) {
          const posX = px / dpr;
          const posY = py / dpr;

          // For subtitle: mostly delicate dots with occasional blueprint accent
          const isInterior = Math.random() < 0.14;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 0.8,
            y: posY + (Math.random() - 0.5) * 0.8,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            kind: isInterior ? 'interior' : 'dot',
            glyphIndex: Math.floor(Math.random() * 11),
            isSubtitle: true,
            scale: isMobile ? 0.22 : 0.26,
            baseAlpha: 0.84 + Math.random() * 0.14,
            radius: isMobile ? 1.1 : 1.3,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, []);

  // Animation Loop: Unified Physics & Rendering for Dots and Interior Elements
  useEffect(() => {
    initParticles();

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
      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.24;
      mouse.y += (mouse.targetY - mouse.y) * 0.24;

      const particles = particlesRef.current;
      const charcoalGlyphSprites = charcoalGlyphSpritesRef.current;
      const bronzeGlyphSprites = bronzeGlyphSpritesRef.current;
      const charcoalDot = charcoalDotSpriteRef.current;
      const bronzeDot = bronzeDotSpriteRef.current;
      const radius = mouse.radius;
      const radiusSq = radius * radius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Mouse Repulsion Force (participates uniformly across all particles)
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            // Non-linear repulsion curve matching reference video
            const force = Math.pow(1 - dist / radius, 1.35) * 8.6;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // 2. Home Return Spring Physics (snappy, elastic, damped)
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.082;
        p.vy += homeDy * 0.082;

        // Velocity damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        // Position integration
        p.x += p.vx;
        p.y += p.vy;

        // 3. Render Particle (either original Dot or miniature Interior Element)
        if (p.kind === 'dot') {
          // Render authentic crisp dot
          const dotSprite = p.isSubtitle ? bronzeDot : charcoalDot;
          if (dotSprite) {
            const drawSize = p.radius * 2;
            const drawX = Math.round((p.x - p.radius) * dpr);
            const drawY = Math.round((p.y - p.radius) * dpr);
            const targetW = Math.round(drawSize * dpr);
            const targetH = Math.round(drawSize * dpr);
            ctx.drawImage(dotSprite, drawX, drawY, targetW, targetH);
          } else {
            ctx.fillStyle = p.isSubtitle ? '#B88E4B' : '#151412';
            ctx.beginPath();
            ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Render miniature interior architecture element alongside the dots
          const glyphSprite = p.isSubtitle
            ? bronzeGlyphSprites[p.glyphIndex]
            : charcoalGlyphSprites[p.glyphIndex];

          if (glyphSprite) {
            const drawW = SPRITE_SIZE * p.scale;
            const drawH = SPRITE_SIZE * p.scale;
            const drawX = Math.round((p.x - drawW / 2) * dpr);
            const drawY = Math.round((p.y - drawH / 2) * dpr);
            const targetW = Math.round(drawW * dpr);
            const targetH = Math.round(drawH * dpr);
            ctx.drawImage(glyphSprite, drawX, drawY, targetW, targetH);
          }
        }
      }

      // 4. Draw Interactive Architectural Cursor Ring (exact match to unitedcarriers reference)
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

  // Touch Movement Handlers for Mobile Devices
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
            <span>Hover or Glide Cursor to Disperse Elements</span>
          </div>
        </div>

        {/* Interactive Canvas Stage */}
        <div className="arch-particle-canvas-wrapper">
          {/* Architectural Registration Marks */}
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
            aria-label="Interactive particle typography of MITJEN INTERIORS composed of original dot-matrix particles alongside miniature interior design and architectural elements"
          />

          {/* Accessible Screen-Reader Text */}
          <h2 className="arch-particle-sr-only">MITJEN INTERIORS — ARCHITECTURE &amp; INTERIOR DESIGN</h2>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalParticleLogo;

