import { memo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { Destination, TileConfig } from '../../types/destination';
import { PhotoTile } from './tiles/PhotoTile';
import { TextTile } from './tiles/TextTile';
import { ButtonTile } from './tiles/ButtonTile';
import { NavTile } from './tiles/NavTile';

const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface BentoGridProps {
  destination: Destination;
  onExpand: () => void;
  onPrev: () => void;
  onNext: () => void;
  reducedMotion?: boolean;
}

export const BentoGrid = memo(function BentoGrid({
  destination,
  onExpand,
  onPrev,
  onNext,
  reducedMotion = false,
}: BentoGridProps) {
  // Stagger container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.97,
      transition: {
        duration: 0.35,
        ease: CUBIC_EASE,
      },
    },
  };

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.96,
      y: reducedMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: CUBIC_EASE,
      },
    },
  };

  const renderTile = (tile: TileConfig, index: number) => {
    switch (tile.kind) {
      case 'button':
        return (
          <ButtonTile
            key={tile.id}
            tile={tile}
            onClick={onExpand}
            reducedMotion={reducedMotion}
          />
        );
      case 'nav':
        return (
          <NavTile
            key={tile.id}
            tile={tile}
            onPrev={onPrev}
            onNext={onNext}
            reducedMotion={reducedMotion}
          />
        );
      case 'text': {
        const isIntro = tile.id.includes('intro') || tile.gridArea.startsWith('4 / 1');
        const isAccent = !isIntro;
        return (
          <TextTile
            key={tile.id}
            tile={tile}
            variant={isAccent ? 'accent' : 'intro'}
          />
        );
      }
      case 'photo':
      default: {
        const isHero = index === 0;
        const isCuisine = Boolean(
          tile.badge ||
          tile.id.includes('craft') ||
          tile.title?.toLowerCase().includes('cuisine')
        );
        return (
          <PhotoTile
            key={tile.id}
            tile={tile}
            isHero={isHero}
            isCuisine={isCuisine}
            onClick={onExpand}
            reducedMotion={reducedMotion}
          />
        );
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={destination.id}
        className="bento-grid-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {destination.tiles.map((tile, idx) => {
          const idSuffix = tile.id.replace(/^(res|com|corp)-/, '');
          return (
            <motion.div
              key={tile.id}
              className={`bento-tile-wrapper bento-tile-${tile.kind} bento-tile-${idSuffix}`}
              style={{ gridArea: tile.gridArea }}
              variants={tileVariants}
            >
              {renderTile(tile, idx)}
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
});
