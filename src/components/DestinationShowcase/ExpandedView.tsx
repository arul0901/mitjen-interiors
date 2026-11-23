import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Destination, Activity } from '../../types/destination';
import { ActivityList } from './ActivityList';

const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface ExpandedViewProps {
  destination: Destination;
  allDestinations: readonly Destination[];
  currentIndex: number;
  onSelectDestination: (index: number) => void;
  onClose: () => void;
  reducedMotion?: boolean;
}

export const ExpandedView = memo(function ExpandedView({
  destination,
  allDestinations,
  currentIndex,
  onSelectDestination,
  onClose,
  reducedMotion = false,
}: ExpandedViewProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity>(destination.activities[0]);
  const [hoveredActivity, setHoveredActivity] = useState<Activity | null>(null);

  // Default to first activity when destination changes
  useEffect(() => {
    setSelectedActivity(destination.activities[0]);
    setHoveredActivity(null);
  }, [destination]);

  // Current background image to display (hovered activity > selected activity > destination hero)
  const activeImage = hoveredActivity?.image || selectedActivity?.image || destination.tiles[0]?.image || '';

  const activeActivityIndex = destination.activities.findIndex(
    (act) => act.id === (hoveredActivity?.id || selectedActivity?.id)
  );

  return (
    <motion.div
      className="destination-expanded-view"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.45, ease: CUBIC_EASE }}
    >
      {/* Background Media with Cross-fade */}
      <div className="expanded-backdrop-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={destination.expandedTitle}
            className="expanded-bg-img"
            layoutId="hero-tile-image"
            initial={reducedMotion ? false : { opacity: 0.85, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0.8 }}
            transition={{ duration: 0.55, ease: CUBIC_EASE }}
          />
        </AnimatePresence>
        <div className="expanded-gradient-scrim" />
      </div>

      {/* Close / Return Control */}
      <div className="expanded-top-bar">
        <button
          type="button"
          className="expanded-close-btn"
          onClick={onClose}
          aria-label="Return to destination overview grid (Esc)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span>BACK TO OVERVIEW</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="expanded-inner-grid">
        {/* Left Side: Destination Editorial Info */}
        <div className="expanded-left-content">
          <motion.span
            className="expanded-kicker"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {destination.city}, {destination.country}
          </motion.span>

          <motion.h2
            className="expanded-title"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            {destination.expandedTitle}
          </motion.h2>

          <motion.p
            className="expanded-tagline"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.5 }}
          >
            {destination.intro}
          </motion.p>

          {/* Destination Pagination Squares */}
          <div className="expanded-pagination" role="tablist" aria-label="Select destination">
            {allDestinations.map((dest, i) => (
              <button
                key={dest.id}
                type="button"
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`View ${dest.city}`}
                className={`pagination-square ${i === currentIndex ? 'is-active' : ''}`}
                onClick={() => onSelectDestination(i)}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Activity List Panel */}
        <div className="expanded-right-content">
          <ActivityList
            activities={destination.activities}
            activeId={selectedActivity.id}
            onSelect={(act) => setSelectedActivity(act)}
            onHover={(act) => setHoveredActivity(act)}
            onBookExperience={() => {
              const contactEl = document.getElementById('contact');
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            onClose={onClose}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>

      {/* 5-line vertical indicator on the right edge */}
      <div className="expanded-vertical-progress" aria-hidden="true">
        {destination.activities.map((act, idx) => (
          <div
            key={act.id}
            className={`progress-line-segment ${idx === activeActivityIndex ? 'is-active' : ''}`}
          />
        ))}
      </div>
    </motion.div>
  );
});
