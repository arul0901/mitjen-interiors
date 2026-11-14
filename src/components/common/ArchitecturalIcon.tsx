import React from 'react';

export type InteriorIconName =
  | 'spatial-flow'
  | 'layout'
  | 'kitchen'
  | 'bedroom'
  | 'wardrobe'
  | 'lighting'
  | 'materials'
  | 'scale'
  | 'execution'
  | 'storage'
  | 'sunlight'
  | 'budget'
  | 'durability'
  | 'electrical'
  | 'cohesion';

interface ArchitecturalIconProps {
  name: InteriorIconName | string;
  className?: string;
  size?: number;
}

export const ArchitecturalIcon: React.FC<ArchitecturalIconProps> = ({
  name,
  className = '',
  size = 20,
}) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.6',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    // Spatial layout & flow (floorplan architecture)
    case 'spatial-flow':
    case 'layout':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 10h9" />
          <path d="M12 3v9" />
          <path d="M8 10v11" />
          <path d="M12 15h9" />
        </svg>
      );

    // Modular kitchen (cabinetry & cooking range)
    case 'kitchen':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="11" x2="21" y2="11" />
          <circle cx="7.5" cy="8" r="1" fill="currentColor" />
          <circle cx="16.5" cy="8" r="1" fill="currentColor" />
          <line x1="8" y1="15" x2="16" y2="15" />
        </svg>
      );

    // Master bedroom (platform bed with headboard)
    case 'bedroom':
      return (
        <svg {...props}>
          <path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
          <path d="M3 15h18" />
          <path d="M7 9V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
          <line x1="7" y1="12" x2="10" y2="12" />
          <line x1="14" y1="12" x2="17" y2="12" />
        </svg>
      );

    // Wardrobe & storage (floor-to-ceiling doors with handles)
    case 'wardrobe':
      return (
        <svg {...props}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="9" y1="10" x2="9" y2="14" />
          <line x1="15" y1="10" x2="15" y2="14" />
        </svg>
      );

    // Architectural lighting & cove design
    case 'lighting':
      return (
        <svg {...props}>
          <line x1="12" y1="2" x2="12" y2="7" />
          <path d="M7.5 7h9l1.5 5H6z" />
          <line x1="8" y1="16" x2="6.5" y2="19" />
          <line x1="16" y1="16" x2="17.5" y2="19" />
          <line x1="12" y1="16" x2="12" y2="20" />
        </svg>
      );

    // Materials, stone & veneer palettes
    case 'materials':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="12" height="14" rx="2" />
          <path d="M7 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
          <line x1="6" y1="12" x2="12" y2="12" />
          <line x1="6" y1="16" x2="10" y2="16" />
        </svg>
      );

    // Scale, compact solutions & spatial drafting
    case 'scale':
      return (
        <svg {...props}>
          <path d="M21 3L3 21" />
          <line x1="7" y1="7" x2="9" y2="9" />
          <line x1="11" y1="11" x2="13" y2="13" />
          <line x1="15" y1="15" x2="17" y2="17" />
          <rect x="2" y="2" width="20" height="20" rx="3" />
        </svg>
      );

    // Turnkey execution & craftsmanship
    case 'execution':
      return (
        <svg {...props}>
          <path d="M14.5 3.5l6 6-9 9-6-1 1-6 9-9z" />
          <line x1="4" y1="20" x2="8" y2="16" />
          <line x1="13" y1="5" x2="19" y2="11" />
        </svg>
      );

    // Storage planning & anti-clutter joinery
    case 'storage':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <line x1="10" y1="7.5" x2="14" y2="7.5" />
          <line x1="10" y1="16.5" x2="14" y2="16.5" />
        </svg>
      );

    // Daylighting, sunlight angles & ventilation
    case 'sunlight':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      );

    // Transparent budgeting & BOQ specifications
    case 'budget':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
          <circle cx="15.5" cy="16.5" r="1.5" fill="currentColor" />
        </svg>
      );

    // Durability & termite proofing (architectural quality shield)
    case 'durability':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );

    // Electrical layout & plumbing positions
    case 'electrical':
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M6 9v4a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
          <line x1="18" y1="9" x2="18" y2="6" />
        </svg>
      );

    // Design cohesion & aesthetic harmony
    case 'cohesion':
      return (
        <svg {...props}>
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
          <path d="M12 7.5a6.5 6.5 0 0 0 0 9" />
        </svg>
      );

    default:
      // Fallback architectural icon (compass / angle)
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <polygon points="12 8 16 16 12 14 8 16 12 8" />
        </svg>
      );
  }
};

export default ArchitecturalIcon;

