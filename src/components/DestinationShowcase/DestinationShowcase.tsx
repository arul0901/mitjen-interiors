import { useState, useCallback, useEffect } from 'react';
import { useReducedMotion, AnimatePresence, motion } from 'framer-motion';
import { destinations } from '../../data/destinations';
import type { ViewMode } from '../../types/destination';
import { useDestinationTheme } from '../../hooks/useDestinationTheme';
import { BentoGrid } from './BentoGrid';
import { ExpandedView } from './ExpandedView';
import './DestinationShowcase.css';

const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface DestinationShowcaseProps {
  className?: string;
}

export function DestinationShowcase({ className = '' }: DestinationShowcaseProps) {
  const [index, setIndex] = useState<number>(0);
  const [view, setView] = useState<ViewMode>('grid');

  const currentDestination = destinations[index] ?? destinations[0];
  const reducedMotion = Boolean(useReducedMotion());

  // Destination theme management & image preloading
  const { themeStyles } = useDestinationTheme({
    theme: currentDestination.theme,
    destinations,
    currentIndex: index,
  });

  // Navigation handlers with wrap-around
  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % destinations.length);
  }, []);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, []);

  const handleSelectDestination = useCallback((targetIndex: number) => {
    setIndex(targetIndex);
  }, []);

  const handleExpand = useCallback(() => {
    setView('expanded');
    const section = document.querySelector('.destination-showcase-section');
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < 60 || rect.top > 140) {
        const top = rect.top + window.scrollY - 82;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setView('grid');
    const section = document.querySelector('.destination-showcase-section');
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < 60 || rect.top > 140) {
        const top = rect.top + window.scrollY - 82;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, []);

  // Keyboard navigation: Left/Right arrows for carousel, Escape for expanded view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not capture if user is focusing an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && view === 'expanded') {
        handleCloseExpanded();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleCloseExpanded, view]);

  const activeHeroImage = currentDestination.tiles[0]?.image || '';

  return (
    <section
      className={`destination-showcase-section ${className}`}
      style={themeStyles}
      aria-label="Destination Showcase"
    >
      {/* Blurred Ambient Backdrop derived from active hero image */}
      <div className="destination-ambient-backdrop" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeHeroImage}
            src={activeHeroImage}
            alt=""
            className="destination-backdrop-blur"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.8, ease: CUBIC_EASE }}
          />
        </AnimatePresence>
        <div className="destination-backdrop-overlay" />
      </div>

      {/* Main Single Framed Card (~16:9) */}
      <div className="destination-frame-card">
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <BentoGrid
              key={`bento-${currentDestination.id}`}
              destination={currentDestination}
              onExpand={handleExpand}
              onPrev={handlePrev}
              onNext={handleNext}
              reducedMotion={reducedMotion}
            />
          ) : (
            <ExpandedView
              key={`expanded-${currentDestination.id}`}
              destination={currentDestination}
              allDestinations={destinations}
              currentIndex={index}
              onSelectDestination={handleSelectDestination}
              onClose={handleCloseExpanded}
              reducedMotion={reducedMotion}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default DestinationShowcase;
