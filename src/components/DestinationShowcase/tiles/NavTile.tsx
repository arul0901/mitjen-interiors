import { memo } from 'react';
import { motion } from 'framer-motion';
import type { TileConfig } from '../../../types/destination';

export interface NavTileProps {
  tile: TileConfig;
  onPrev: () => void;
  onNext: () => void;
  reducedMotion?: boolean;
}

export const NavTile = memo(function NavTile({
  tile,
  onPrev,
  onNext,
  reducedMotion = false,
}: NavTileProps) {
  return (
    <div className="bento-tile bento-nav-tile" style={{ gridArea: tile.gridArea }}>
      <motion.button
        type="button"
        className="bento-nav-ghost-btn bento-nav-prev"
        onClick={onPrev}
        aria-label="Previous destination (Keyboard: Left Arrow)"
        whileHover={reducedMotion ? undefined : { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
        whileTap={{ scale: 0.96 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>PREVIOUS</span>
      </motion.button>

      <div className="bento-nav-divider" aria-hidden="true" />

      <motion.button
        type="button"
        className="bento-nav-ghost-btn bento-nav-next"
        onClick={onNext}
        aria-label="Next destination (Keyboard: Right Arrow)"
        whileHover={reducedMotion ? undefined : { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
        whileTap={{ scale: 0.96 }}
      >
        <span>NEXT</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </motion.button>
    </div>
  );
});
