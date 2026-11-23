import { memo } from 'react';
import { motion } from 'framer-motion';
import type { TileConfig } from '../../../types/destination';

const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface PhotoTileProps {
  tile: TileConfig;
  isHero?: boolean;
  isCuisine?: boolean;
  onClick?: () => void;
  reducedMotion?: boolean;
}

export const PhotoTile = memo(function PhotoTile({
  tile,
  isHero = false,
  isCuisine = false,
  onClick,
  reducedMotion = false,
}: PhotoTileProps) {
  const isInteractive = Boolean(onClick);

  return (
    <motion.button
      type="button"
      className={`bento-tile bento-photo-tile ${isHero ? 'bento-hero-tile' : ''} ${isCuisine ? 'bento-cuisine-tile' : ''}`}
      style={{ gridArea: tile.gridArea }}
      onClick={onClick}
      aria-label={isHero ? `Explore ${tile.title || 'destination'} in expanded view` : (tile.title || 'View photo')}
      tabIndex={isInteractive ? 0 : -1}
      whileHover={reducedMotion ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.4, ease: CUBIC_EASE }}
    >
      <div className="bento-photo-media-wrapper">
        {tile.image && (
          <motion.img
            src={tile.image}
            alt={tile.title || 'Destination photography'}
            loading={isHero ? 'eager' : 'lazy'}
            className="bento-photo-img"
            layoutId={isHero ? 'hero-tile-image' : undefined}
            whileHover={
              reducedMotion
                ? undefined
                : {
                    scale: 1.06,
                    filter: 'brightness(1.1)',
                  }
            }
            transition={{ duration: 0.6, ease: CUBIC_EASE }}
          />
        )}

        {isHero && (
          <div className="bento-hero-overlay">
            <h2 className="bento-hero-title">{tile.title}</h2>
            {tile.body && <p className="bento-hero-tagline">{tile.body}</p>}
          </div>
        )}

        {isCuisine && (
          <div className="bento-cuisine-overlay">
            <span className="bento-cuisine-badge">{tile.badge || 'Architectural Detail'}</span>
            <h4 className="bento-cuisine-title">{tile.title}</h4>
            {tile.body && <p className="bento-cuisine-desc">{tile.body}</p>}
          </div>
        )}

        {!isHero && !isCuisine && tile.title && (
          <div className="bento-photo-caption">
            <span className="bento-photo-label">{tile.title}</span>
          </div>
        )}
      </div>
    </motion.button>
  );
});
