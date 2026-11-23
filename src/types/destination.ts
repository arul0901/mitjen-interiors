export type TileKind = 'photo' | 'text' | 'button' | 'nav';

export interface Theme {
  bg: string;
  surface: string;
  accentFrom: string;
  accentTo: string;
  text: string;
  muted: string;
}

export interface Activity {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface TileConfig {
  id: string;
  kind: TileKind;
  gridArea: string;
  image?: string;
  title?: string;
  body?: string;
  badge?: string;
  kicker?: string;
  tags?: readonly string[];
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  tagline: string;
  headline: string;
  intro: string;
  theme: Theme;
  tiles: TileConfig[];
  activities: Activity[];
  expandedTitle: string;
}

export type ViewMode = 'grid' | 'expanded';
