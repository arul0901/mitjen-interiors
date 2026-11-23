import { useEffect, useMemo } from 'react';
import type { Destination, Theme } from '../types/destination';

interface UseDestinationThemeOptions {
  theme: Theme;
  destinations: readonly Destination[];
  currentIndex: number;
}

export function useDestinationTheme({
  theme,
  destinations,
  currentIndex,
}: UseDestinationThemeOptions) {
  // Preload images for the upcoming destination
  useEffect(() => {
    if (!destinations || destinations.length === 0) return;
    const nextIndex = (currentIndex + 1) % destinations.length;
    const nextDestination = destinations[nextIndex];

    if (!nextDestination) return;

    // Preload tile images
    nextDestination.tiles.forEach((tile) => {
      if (tile.image) {
        const img = new Image();
        img.src = tile.image;
      }
    });

    // Preload activity images
    nextDestination.activities.forEach((act) => {
      if (act.image) {
        const img = new Image();
        img.src = act.image;
      }
    });
  }, [currentIndex, destinations]);

  // Generate CSS custom properties dictionary
  const themeStyles = useMemo<React.CSSProperties>(() => {
    return {
      '--theme-bg': theme.bg,
      '--theme-surface': theme.surface,
      '--accent-from': theme.accentFrom,
      '--accent-to': theme.accentTo,
      '--theme-text': theme.text,
      '--theme-muted': theme.muted,
      transition: 'background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.6s ease',
    } as React.CSSProperties;
  }, [theme]);

  return { themeStyles };
}
