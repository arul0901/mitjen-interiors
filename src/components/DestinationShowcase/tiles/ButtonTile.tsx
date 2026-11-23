import { memo } from 'react';
import { motion } from 'framer-motion';
import type { TileConfig } from '../../../types/destination';

export interface ButtonTileProps {
  tile: TileConfig;
  onClick: () => void;
  reducedMotion?: boolean;
}

export const ButtonTile = memo(function ButtonTile({
  tile,
  onClick,
  reducedMotion = false,
}: ButtonTileProps) {
  return (
    <div className="bento-tile bento-button-tile" style={{ gridArea: tile.gridArea }}>
      <motion.button
        type="button"
        className="bento-cta-btn"
        onClick={onClick}
        aria-label="Discover more activities and details for this destination"
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              }
        }
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <span className="bento-cta-text">{tile.title || 'DISCOVER MORE'}</span>
        <svg
          className="bento-cta-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
