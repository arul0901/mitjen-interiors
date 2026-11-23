import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Activity } from '../../types/destination';

const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface ActivityListProps {
  activities: readonly Activity[];
  activeId: string | null;
  onSelect: (activity: Activity) => void;
  onHover: (activity: Activity | null) => void;
  onBookExperience: () => void;
  onClose?: () => void;
  reducedMotion?: boolean;
}

export const ActivityList = memo(function ActivityList({
  activities,
  activeId,
  onSelect,
  onHover,
  onBookExperience,
  onClose,
  reducedMotion = false,
}: ActivityListProps) {
  return (
    <div className="expanded-activity-panel">
      <div className="expanded-activity-header">
        <span className="expanded-activity-kicker">Architectural Highlights</span>
        <h3 className="expanded-activity-heading">Key Spatial Features</h3>
      </div>

      <div className="expanded-activity-list" role="list">
        {activities.map((act, idx) => {
          const isSelected = activeId === act.id;
          return (
            <motion.button
              key={act.id}
              type="button"
              className={`activity-glass-btn ${isSelected ? 'is-active' : ''}`}
              onClick={() => onSelect(act)}
              onMouseEnter={() => onHover(act)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(act)}
              onBlur={() => onHover(null)}
              aria-label={`Select activity ${act.title}: ${act.subtitle}`}
              role="listitem"
              initial={reducedMotion ? false : { opacity: 0, x: 20 }}
              animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.05, duration: 0.35, ease: CUBIC_EASE }}
              whileHover={reducedMotion ? undefined : { x: 4 }}
            >
              <div className="activity-index-badge">{String(idx + 1).padStart(2, '0')}</div>
              <div className="activity-text-group">
                <span className="activity-title">{act.title}</span>
                <span className="activity-subtitle">{act.subtitle}</span>
              </div>
              <div className="activity-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        type="button"
        className="expanded-book-cta-btn"
        onClick={onBookExperience}
        aria-label="Book a design consultation"
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -2,
                boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
              }
        }
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <span>BOOK A DESIGN CONSULTATION</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </motion.button>

      {onClose && (
        <button
          type="button"
          className="expanded-bottom-return-btn"
          onClick={onClose}
          aria-label="Return to Overview Grid"
        >
          <span>← BACK TO OVERVIEW GRID</span>
        </button>
      )}
    </div>
  );
});
