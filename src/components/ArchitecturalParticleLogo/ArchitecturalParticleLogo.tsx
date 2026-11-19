import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ArchitecturalParticleLogo.css';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  glyphIndex: number;
  isSubtitle: boolean;
  scale: number;
  baseAlpha: number;
  angle: number;
}

// 10 Procedural Miniature Interior Architecture Glyphs (drawn into 24x24 sprite buffers)
const SPRITE_SIZE = 24;

function createGlyphSprites(color: string, dpr: number): HTMLCanvasElement[] {
  const glyphs: HTMLCanvasElement[] = [];

  for (let i = 0; i < 10; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = SPRITE_SIZE * dpr;
    canvas.height = SPRITE_SIZE * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    ctx.scale(dpr, dpr);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = SPRITE_SIZE / 2;
    const cy = SPRITE_SIZE / 2;

    switch (i) {
      // 0: Miniature Armchair Silhouette
      case 0: {
        ctx.beginPath();
        // Backrest
        ctx.roundRect ? ctx.roundRect(cx - 6, cy - 7, 12, 6, 2) : ctx.rect(cx - 6, cy - 7, 12, 6);
        ctx.fill();
        // Seat cushion
        ctx.fillRect(cx - 7, cy, 14, 3);
        // Tapered legs
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy + 3);
        ctx.lineTo(cx - 6, cy + 7);
        ctx.moveTo(cx + 5, cy + 3);
        ctx.lineTo(cx + 6, cy + 7);
        ctx.stroke();
        break;
      }

      // 1: Modular Sofa Silhouette
      case 1: {
        ctx.beginPath();
        // Sofa backrest with cushion divide
        ctx.fillRect(cx - 8, cy - 5, 16, 5);
        ctx.strokeStyle = '#FAF8F5';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 5);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        // Arms
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.1;
        ctx.fillRect(cx - 9, cy - 3, 2, 6);
        ctx.fillRect(cx + 7, cy - 3, 2, 6);
        // Seat plinth
        ctx.fillRect(cx - 7, cy + 1, 14, 3);
        break;
      }

      // 2: Pendant Lighting Fixture
      case 2: {
        // Ceiling suspension cord
        ctx.beginPath();
        ctx.moveTo(cx, cy - 8);
        ctx.lineTo(cx, cy - 2);
        ctx.stroke();
        // Conical / Bell lampshade
        ctx.beginPath();
        ctx.moveTo(cx, cy - 2);
        ctx.lineTo(cx - 5, cy + 3);
        ctx.lineTo(cx + 5, cy + 3);
        ctx.closePath();
        ctx.fill();
        // Tiny drop bulb
        ctx.beginPath();
        ctx.arc(cx, cy + 5, 1.2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }

      // 3: Architectural Roman Arch
      case 3: {
        ctx.beginPath();
        // Outer arch
        ctx.arc(cx, cy - 1, 6, Math.PI, 0, false);
        ctx.lineTo(cx + 6, cy + 7);
        ctx.lineTo(cx + 3.8, cy + 7);
        ctx.lineTo(cx + 3.8, cy - 1);
        ctx.arc(cx, cy - 1, 3.8, 0, Math.PI, true);
        ctx.lineTo(cx - 3.8, cy + 7);
        ctx.lineTo(cx - 6, cy + 7);
        ctx.closePath();
        ctx.fill();
        break;
      }

      // 4: Fluted Architectural Column
      case 4: {
        // Capital cornice
        ctx.fillRect(cx - 6, cy - 7, 12, 2);
        // Column shaft lines
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy - 5);
        ctx.lineTo(cx - 4, cy + 5);
        ctx.moveTo(cx, cy - 5);
        ctx.lineTo(cx, cy + 5);
        ctx.moveTo(cx + 4, cy - 5);
        ctx.lineTo(cx + 4, cy + 5);
        ctx.stroke();
        // Base plinth
        ctx.fillRect(cx - 6, cy + 5, 12, 2);
        break;
      }

      // 5: Blueprint Floor-Plan Door Swing Symbol
      case 5: {
        ctx.beginPath();
        // Wall jamb
        ctx.fillRect(cx - 7, cy - 6, 2, 2);
        // Door leaf (line)
        ctx.moveTo(cx - 6, cy - 5);
        ctx.lineTo(cx - 6, cy + 6);
        ctx.stroke();
        // 90 degree swing arc
        ctx.beginPath();
        ctx.arc(cx - 6, cy - 5, 11, 0, Math.PI / 2, false);
        ctx.setLineDash([1.5, 1.5]);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }

      // 6: Cantilevered Coffee / Console Table
      case 6: {
        // Table top slab
        ctx.fillRect(cx - 7, cy - 2, 14, 2.5);
        // Splayed tapered legs
        ctx.beginPath();
        ctx.moveTo(cx - 5, cy + 0.5);
        ctx.lineTo(cx - 7, cy + 7);
        ctx.moveTo(cx + 5, cy + 0.5);
        ctx.lineTo(cx + 7, cy + 7);
        ctx.stroke();
        break;
      }

      // 7: Minimalist Ceramic Vase / Amphora
      case 7: {
        ctx.beginPath();
        ctx.moveTo(cx - 2.5, cy - 6);
        ctx.lineTo(cx + 2.5, cy - 6);
        ctx.quadraticCurveTo(cx + 1.2, cy - 3, cx + 5, cy + 1);
        ctx.quadraticCurveTo(cx + 5, cy + 6, cx + 2.5, cy + 7);
        ctx.lineTo(cx - 2.5, cy + 7);
        ctx.quadraticCurveTo(cx - 5, cy + 6, cx - 5, cy + 1);
        ctx.quadraticCurveTo(cx - 1.2, cy - 3, cx - 2.5, cy - 6);
        ctx.closePath();
        ctx.fill();
        break;
      }

      // 8: Blueprint Crosshair & Dimension Tick
      case 8: {
        ctx.beginPath();
        // Dimension axes
        ctx.moveTo(cx - 6, cy);
        ctx.lineTo(cx + 6, cy);
        ctx.moveTo(cx, cy - 6);
        ctx.lineTo(cx, cy + 6);
        ctx.stroke();
        // 45 degree architectural tick mark
        ctx.beginPath();
        ctx.lineWidth = 1.4;
        ctx.moveTo(cx - 3, cy + 3);
        ctx.lineTo(cx + 3, cy - 3);
        ctx.stroke();
        break;
      }

      // 9: Modern Arc Floor Lamp
      case 9: {
        // Base plate
        ctx.fillRect(cx - 4, cy + 6, 8, 1.5);
        // Arching stem
        ctx.beginPath();
        ctx.moveTo(cx - 2, cy + 6);
        ctx.lineTo(cx - 2, cy - 1);
        ctx.quadraticCurveTo(cx - 2, cy - 7, cx + 4, cy - 7);
        ctx.lineTo(cx + 4, cy - 4);
        ctx.stroke();
        // Drum lamp shade
        ctx.fillRect(cx + 1, cy - 4, 6, 3);
        break;
      }
    }

    glyphs.push(canvas);
  }

  return glyphs;
}

export const ArchitecturalParticleLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Particles state
  const particlesRef = useRef<Particle[]>([]);
  const charcoalSpritesRef = useRef<HTMLCanvasElement[]>([]);
  const bronzeSpritesRef = useRef<HTMLCanvasElement[]>([]);

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

    // Pre-render glyph sprites if not created
    charcoalSpritesRef.current = createGlyphSprites('#181715', dpr);
    bronzeSpritesRef.current = createGlyphSprites('#B88E4B', dpr);

    // Offscreen Canvas for Text Sampling
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    offCtx.scale(dpr, dpr);

    // Responsive Typography Sizing
    // MITJEN Title: scaled dynamically to fit canvas nicely
    const titleFontSize = Math.max(38, Math.min(96, Math.round(width * 0.088)));
    const subtitleFontSize = Math.max(10, Math.min(18, Math.round(titleFontSize * 0.17)));

    const centerX = width / 2;
    const centerY = height / 2;

    // Vertical alignment: MITJEN at top half, Subtitle at bottom
    const titleY = centerY - titleFontSize * 0.08;
    const subtitleY = titleY + titleFontSize * 0.58;

    // Draw "MITJEN" in offscreen buffer
    offCtx.fillStyle = '#000000';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.font = `900 ${titleFontSize}px "Plus Jakarta Sans", "Montserrat", -apple-system, sans-serif`;
    
    // Add letter-spacing tracking for architectural look
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing = `${Math.round(titleFontSize * 0.14)}px`;
    }
    offCtx.fillText('MITJEN', centerX, titleY);

    // Sample MITJEN particles from pixels
    const sampleGrid = width < 600 ? 5.5 : 6.0; // grid step in CSS pixels
    const step = Math.max(3, Math.round(sampleGrid * dpr));
    
    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imageData.data;

    const newParticles: Particle[] = [];

    // 1. Collect Title Particles
    for (let py = 0; py < offCanvas.height; py += step) {
      for (let px = 0; px < offCanvas.width; px += step) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = data[index + 3];

        if (alpha > 120) {
          const posX = px / dpr;
          const posY = py / dpr;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 1.5,
            y: posY + (Math.random() - 0.5) * 1.5,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            glyphIndex: Math.floor(Math.random() * 10),
            isSubtitle: false,
            scale: width < 600 ? 0.32 : 0.38,
            baseAlpha: 0.88 + Math.random() * 0.12,
            angle: (Math.random() - 0.5) * 0.1,
          });
        }
      }
    }

    // 2. Clear offscreen canvas and draw "ARCHITECTURE & INTERIOR DESIGN"
    offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    offCtx.font = `700 ${subtitleFontSize}px "Plus Jakarta Sans", "Montserrat", sans-serif`;
    if ('letterSpacing' in offCtx) {
      (offCtx as unknown as { letterSpacing: string }).letterSpacing = `${Math.round(subtitleFontSize * 0.38)}px`;
    }
    offCtx.fillText('ARCHITECTURE & INTERIOR DESIGN', centerX, subtitleY);

    const subImageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const subData = subImageData.data;
    const subStep = Math.max(3, Math.round((width < 600 ? 4.5 : 5.0) * dpr));

    for (let py = 0; py < offCanvas.height; py += subStep) {
      for (let px = 0; px < offCanvas.width; px += subStep) {
        const index = (py * offCanvas.width + px) * 4;
        const alpha = subData[index + 3];

        if (alpha > 120) {
          const posX = px / dpr;
          const posY = py / dpr;

          newParticles.push({
            x: posX + (Math.random() - 0.5) * 1.2,
            y: posY + (Math.random() - 0.5) * 1.2,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            glyphIndex: Math.floor(Math.random() * 10),
            isSubtitle: true,
            scale: width < 600 ? 0.22 : 0.26,
            baseAlpha: 0.82 + Math.random() * 0.15,
            angle: (Math.random() - 0.5) * 0.08,
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, []);

  // Animation Loop: Repel & Return Physics + Canvas Draw
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
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

      const particles = particlesRef.current;
      const charcoalSprites = charcoalSpritesRef.current;
      const bronzeSprites = bronzeSpritesRef.current;
      const radius = mouse.radius;
      const radiusSq = radius * radius;

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Mouse Repulsion Force
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            // Non-linear repulsion curve matching reference video
            const force = Math.pow(1 - dist / radius, 1.4) * 8.5;
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

        // 3. Render Miniature Architectural Glyph Sprite
        const sprite = p.isSubtitle
          ? bronzeSprites[p.glyphIndex]
          : charcoalSprites[p.glyphIndex];

        if (sprite) {
          const drawW = SPRITE_SIZE * p.scale;
          const drawH = SPRITE_SIZE * p.scale;
          const drawX = Math.round((p.x - drawW / 2) * dpr);
          const drawY = Math.round((p.y - drawH / 2) * dpr);
          const targetW = Math.round(drawW * dpr);
          const targetH = Math.round(drawH * dpr);

          ctx.drawImage(sprite, drawX, drawY, targetW, targetH);
        }
      }

      // 4. Draw Interactive Architectural Cursor Ring (matching reference video)
      if (mouse.isActive && mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const ringX = mouse.x * dpr;
        const ringY = mouse.y * dpr;
        const ringRadius = 26 * dpr;

        // Outer crisp circle
        ctx.save();
        ctx.strokeStyle = '#181715';
        ctx.lineWidth = 1.3 * dpr;
        ctx.beginPath();
        ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Center dot
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

  // Pointer Move Event Listeners
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isActive = true;

    if (!mouseRef.current.isActive) {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    }
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

  // Touch Move Handler for Mobile Devices
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
      aria-label="Mitjen Architecture & Interior Design Interactive Wordmark"
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
            aria-label="Interactive typography of MITJEN ARCHITECTURE & INTERIOR DESIGN composed of miniature architectural silhouettes and interior design elements"
          />

          {/* Accessible Screen-Reader Text */}
          <h2 className="arch-particle-sr-only">MITJEN — ARCHITECTURE &amp; INTERIOR DESIGN</h2>
        </div>
      </div>
    </section>
  );
};

export default ArchitecturalParticleLogo;
