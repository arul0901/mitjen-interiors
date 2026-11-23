import { memo } from 'react';
import type { TileConfig } from '../../../types/destination';

export interface TextTileProps {
  tile: TileConfig;
  variant?: 'intro' | 'accent';
}

export const TextTile = memo(function TextTile({ tile, variant = 'intro' }: TextTileProps) {
  const isAccent = variant === 'accent';
  const isExplore = tile.id.includes('explore');

  return (
    <div
      className={`bento-tile bento-text-tile ${isAccent ? 'bento-text-accent' : 'bento-text-intro'} ${isExplore ? 'bento-tile-explore' : ''}`}
      style={{ gridArea: tile.gridArea }}
    >
      {isAccent ? (
        <div className="bento-accent-content">
          <div className="bento-accent-header">
            <span className="bento-accent-dot" />
            <span className="bento-accent-title">{tile.title}</span>
          </div>
          {tile.body && <p className="bento-accent-desc">{tile.body}</p>}
          {tile.tags && tile.tags.length > 0 && (
            <div className="bento-accent-tags">
              {tile.tags.map((tag) => (
                <span key={tag} className="bento-accent-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bento-intro-content">
          <h3 className="bento-intro-headline">{tile.title}</h3>
          {tile.body && <p className="bento-intro-desc">{tile.body}</p>}
        </div>
      )}
    </div>
  );
});
