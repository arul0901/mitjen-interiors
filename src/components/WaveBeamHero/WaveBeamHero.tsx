import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './WaveBeamHero.css';

interface WaveBeamHeroProps {
  onExploreClick?: () => void;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface BeamPulse {
  waveIndex: number;
  t: number; // 0 to 1 along width
  speed: number;
  size: number;
  color: string;
}

export const WaveBeamHero: React.FC<WaveBeamHeroProps> = ({ onExploreClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const [mouseActive, setMouseActive] = useState<boolean>(false);

  // Smooth scroll to studio story
  const handleScrollToStory = useCallback(() => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const target = document.getElementById('studio-story');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  }, [onExploreClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Handle high DPI resizing
    const handleResize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Visibility observer to pause animation when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Track mouse & touch coordinates
    const updateTargetCoords = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = clientX - rect.left;
      mouseRef.current.targetY = clientY - rect.top;
      mouseRef.current.active = true;
      setMouseActive(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateTargetCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTargetCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
      setMouseActive(false);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchend', handleMouseLeave);

    // Initialize floating ambient embers/particles
    const particleCount = 45;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        radius: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0.2,
        speedX: (Math.random() - 0.3) * 0.3,
        speedY: -(Math.random() * 0.35 + 0.15),
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize traveling light pulses along waves
    const beamPulses: BeamPulse[] = [
      { waveIndex: 0, t: 0.1, speed: 0.0028, size: 4, color: '#FFFFFF' },
      { waveIndex: 1, t: 0.4, speed: 0.0035, size: 5, color: '#F8D886' },
      { waveIndex: 2, t: 0.7, speed: 0.0022, size: 4.5, color: '#E4B869' },
      { waveIndex: 3, t: 0.25, speed: 0.004, size: 3.5, color: '#FFFFFF' },
      { waveIndex: 4, t: 0.85, speed: 0.0025, size: 4, color: '#D4AF37' },
    ];

    // Wave beam configurations
    const waveConfigs = [
      {
        baseYRatio: 0.64,
        amplitude: 58,
        wavelength: 0.0024,
        speed: 0.0016,
        phase: 0,
        lineWidth: 2.2,
        colorStart: 'rgba(212, 175, 55, 0.0)',
        colorMid: 'rgba(248, 222, 148, 0.85)',
        colorEnd: 'rgba(212, 175, 55, 0.0)',
        glow: 22,
        glowColor: 'rgba(228, 184, 105, 0.65)',
      },
      {
        baseYRatio: 0.68,
        amplitude: 75,
        wavelength: 0.0019,
        speed: -0.0013,
        phase: 1.4,
        lineWidth: 1.8,
        colorStart: 'rgba(197, 160, 89, 0.0)',
        colorMid: 'rgba(228, 184, 105, 0.75)',
        colorEnd: 'rgba(197, 160, 89, 0.0)',
        glow: 18,
        glowColor: 'rgba(197, 160, 89, 0.55)',
      },
      {
        baseYRatio: 0.6,
        amplitude: 45,
        wavelength: 0.0032,
        speed: 0.0021,
        phase: 2.6,
        lineWidth: 2.8,
        colorStart: 'rgba(255, 248, 230, 0.0)',
        colorMid: 'rgba(255, 255, 255, 0.95)',
        colorEnd: 'rgba(255, 248, 230, 0.0)',
        glow: 26,
        glowColor: 'rgba(255, 245, 215, 0.85)',
      },
      {
        baseYRatio: 0.73,
        amplitude: 65,
        wavelength: 0.0015,
        speed: -0.001,
        phase: 3.8,
        lineWidth: 1.5,
        colorStart: 'rgba(180, 140, 70, 0.0)',
        colorMid: 'rgba(210, 170, 95, 0.6)',
        colorEnd: 'rgba(180, 140, 70, 0.0)',
        glow: 14,
        glowColor: 'rgba(180, 140, 70, 0.45)',
      },
      {
        baseYRatio: 0.56,
        amplitude: 38,
        wavelength: 0.0038,
        speed: 0.0018,
        phase: 4.9,
        lineWidth: 1.6,
        colorStart: 'rgba(240, 210, 140, 0.0)',
        colorMid: 'rgba(245, 225, 170, 0.7)',
        colorEnd: 'rgba(240, 210, 140, 0.0)',
        glow: 16,
        glowColor: 'rgba(240, 210, 140, 0.5)',
      },
      {
        baseYRatio: 0.78,
        amplitude: 85,
        wavelength: 0.0012,
        speed: -0.0008,
        phase: 0.7,
        lineWidth: 1.2,
        colorStart: 'rgba(150, 120, 60, 0.0)',
        colorMid: 'rgba(185, 145, 80, 0.45)',
        colorEnd: 'rgba(150, 120, 60, 0.0)',
        glow: 10,
        glowColor: 'rgba(150, 120, 60, 0.35)',
      },
    ];

    let time = 0;

    // Helper to evaluate Y coordinate on a wave
    const getWaveY = (x: number, config: (typeof waveConfigs)[0], curTime: number, mx: number, my: number) => {
      const baseY = height * config.baseYRatio;
      const angle = x * config.wavelength + curTime * config.speed + config.phase;
      // Secondary harmonic for fluid organic curves
      const harmonic = Math.sin(x * config.wavelength * 1.8 - curTime * config.speed * 0.7) * 0.28;
      let y = baseY + (Math.sin(angle) + harmonic) * config.amplitude;

      // Mouse deflection lens
      if (mx > -500 && my > -500) {
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 220;
        if (dist < radius) {
          const power = Math.cos((dist / radius) * (Math.PI / 2));
          // Gentle fluid repulsion / elevation
          y += (my < y ? 1 : -1) * power * 35;
        }
      }

      return y;
    };

    // Render loop
    const render = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      time += 1;

      // Smooth mouse coordinate interpolation (lerp)
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.09;
        mouse.y += (mouse.targetY - mouse.y) * 0.09;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      // 1. Clear with deep architectural luxury backdrop
      ctx.fillStyle = '#0E0F0D';
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient radial lighting behind waves
      const ambientGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.65,
        10,
        width * 0.5,
        height * 0.65,
        Math.max(width * 0.6, 400)
      );
      ambientGlow.addColorStop(0, 'rgba(197, 160, 89, 0.14)');
      ambientGlow.addColorStop(0.4, 'rgba(140, 110, 55, 0.07)');
      ambientGlow.addColorStop(1, 'rgba(14, 15, 13, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle dynamic mouse cursor ambient aura
      if (mouse.x > -500) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        cursorGlow.addColorStop(0, 'rgba(248, 222, 148, 0.16)');
        cursorGlow.addColorStop(0.5, 'rgba(197, 160, 89, 0.06)');
        cursorGlow.addColorStop(1, 'rgba(14, 15, 13, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw architectural grid lines (light, subtle, high-end)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      const gridStep = 80;
      for (let gx = 0; gx < width; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // 4. Render Wave Beams with glowing gradient ribbons
      ctx.save();
      waveConfigs.forEach((cfg) => {
        ctx.save();
        ctx.beginPath();

        const step = 8;
        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= width + step; x += step) {
          const y = getWaveY(x, cfg, time, mouse.x, mouse.y);
          points.push({ x, y });
        }

        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
        }

        // Linear gradient stroke across canvas width
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, cfg.colorStart);
        grad.addColorStop(0.18, cfg.colorMid);
        grad.addColorStop(0.82, cfg.colorMid);
        grad.addColorStop(1, cfg.colorEnd);

        ctx.strokeStyle = grad;
        ctx.lineWidth = cfg.lineWidth;
        ctx.shadowColor = cfg.glowColor;
        ctx.shadowBlur = cfg.glow;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
      });

      // 5. Render traveling light pulses (wave beams)
      beamPulses.forEach((pulse) => {
        pulse.t += pulse.speed;
        if (pulse.t > 1) pulse.t = 0;

        const cfg = waveConfigs[pulse.waveIndex % waveConfigs.length];
        const px = pulse.t * width;
        const py = getWaveY(px, cfg, time, mouse.x, mouse.y);

        // Core bright pulse point
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 18;
        ctx.fill();

        // Trailing luminous comet streak
        const trailLength = 48;
        const trailGrad = ctx.createLinearGradient(px - trailLength, py, px, py);
        trailGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        trailGrad.addColorStop(1, pulse.color);

        ctx.beginPath();
        ctx.moveTo(px - trailLength, py);
        ctx.lineTo(px, py);
        ctx.lineWidth = pulse.size * 0.9;
        ctx.strokeStyle = trailGrad;
        ctx.stroke();

        ctx.restore();
      });

      // 6. Render floating starlight embers / dust
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulsePhase += p.pulseSpeed;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 222, 148, ${Math.max(0.05, currentAlpha)})`;
        ctx.shadowColor = 'rgba(228, 184, 105, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchend', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="wave-beam-hero" ref={containerRef} aria-label="Mitjen Atelier Hero">
      {/* Interactive Light Wave Canvas */}
      <canvas ref={canvasRef} className="wave-beam-hero__canvas" aria-hidden="true" />

      {/* Subtle vignette and gradient blend for seamless transition */}
      <div className="wave-beam-hero__vignette" aria-hidden="true" />
      <div className="wave-beam-hero__bottom-blend" aria-hidden="true" />

      {/* Hero Content Stage */}
      <div className="wave-beam-hero__container">
        {/* Atelier Eyebrow Pill */}
        <div className="wave-beam-hero__badge-wrapper">
          <div className="wave-beam-hero__badge">
            <span className="wave-beam-hero__beacon" aria-hidden="true" />
            <span className="wave-beam-hero__badge-text">THE ARCHITECTURAL ATELIER // MITJEN</span>
          </div>

          <div className="wave-beam-hero__interactive-hint">
            <span className="wave-beam-hero__hint-icon">✦</span>
            <span>{mouseActive ? 'Wave Beam Active' : 'Wave Beam Interactive (Move / Touch)'}</span>
          </div>
        </div>

        {/* Master Heading */}
        <h1 className="wave-beam-hero__title">
          Sculpting Space Through <br />
          <span className="wave-beam-hero__title-accent">Light &amp; Materiality</span>
        </h1>

        {/* Subtitle / Architectural Editorial Manifesto */}
        <p className="wave-beam-hero__subtitle">
          At Mitjen, we balance visionary architectural design with uncompromising turnkey mastery.
          Every residence, penthouse, and commercial sanctuary is an intentional composition of spatial rhythm,
          calibrated natural illumination, and bespoke artisan joinery.
        </p>

        {/* Architectural Pillars / Highlights */}
        <div className="wave-beam-hero__pillars">
          <div className="wave-beam-hero__pillar-chip">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8L6 12L14 4" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>100% Turnkey Execution</span>
          </div>
          <div className="wave-beam-hero__pillar-chip">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8L6 12L14 4" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Photorealistic 3D Spatial Study</span>
          </div>
          <div className="wave-beam-hero__pillar-chip">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8L6 12L14 4" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Italian PU &amp; Marine Millwork</span>
          </div>
          <div className="wave-beam-hero__pillar-chip">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8L6 12L14 4" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>10-Year Built Warranty</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="wave-beam-hero__actions">
          <Link
            to="/contact"
            className="wave-beam-hero__btn-primary"
            aria-label="Inquire with Mitjen Studio"
          >
            <span>Inquire With Studio</span>
            <span className="wave-beam-hero__btn-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <button
            type="button"
            onClick={handleScrollToStory}
            className="wave-beam-hero__btn-secondary"
            aria-label="Explore our story"
          >
            <span>Discover Our Story</span>
            <span className="wave-beam-hero__btn-arrow-down" aria-hidden="true">↓</span>
          </button>
        </div>

        {/* Live Studio Metrics Strip */}
        <div className="wave-beam-hero__metrics-bar">
          <div className="wave-beam-hero__metric-cell">
            <span className="wave-beam-hero__metric-number">10+</span>
            <span className="wave-beam-hero__metric-label">Years of Atelier Practice</span>
          </div>
          <div className="wave-beam-hero__metric-divider" aria-hidden="true" />
          <div className="wave-beam-hero__metric-cell">
            <span className="wave-beam-hero__metric-number">120+</span>
            <span className="wave-beam-hero__metric-label">Curated Living Sanctuaries</span>
          </div>
          <div className="wave-beam-hero__metric-divider" aria-hidden="true" />
          <div className="wave-beam-hero__metric-cell">
            <span className="wave-beam-hero__metric-number">100%</span>
            <span className="wave-beam-hero__metric-label">In-House Bespoke Joinery</span>
          </div>
          <div className="wave-beam-hero__metric-divider" aria-hidden="true" />
          <div className="wave-beam-hero__metric-cell">
            <span className="wave-beam-hero__metric-number">3,500+</span>
            <span className="wave-beam-hero__metric-label">Avg. Sq.Ft Per Residence</span>
          </div>
        </div>

        {/* Clean Breadcrumb Navigation */}
        <nav className="wave-beam-hero__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="wave-beam-hero__breadcrumb-link">Home</Link>
          <span className="wave-beam-hero__breadcrumb-sep">/</span>
          <span className="wave-beam-hero__breadcrumb-current">About Us</span>
        </nav>
      </div>

      {/* Floating Scroll Cue */}
      <div className="wave-beam-hero__scroll-cue" onClick={handleScrollToStory} role="button" tabIndex={0}>
        <span className="wave-beam-hero__scroll-mouse">
          <span className="wave-beam-hero__scroll-wheel" />
        </span>
        <span className="wave-beam-hero__scroll-text">SCROLL TO DISCOVER</span>
      </div>
    </section>
  );
};

export default WaveBeamHero;
