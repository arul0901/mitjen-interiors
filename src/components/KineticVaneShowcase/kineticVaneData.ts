export interface KineticProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  area: string;
  scope: string;
  description: string;
  image: string;
  transitionTitle: {
    eyebrow: string;
    line1: string;
    line2: string;
    subtext: string;
    coord: string;
  };
}

export const KINETIC_PROJECTS: KineticProject[] = [
  {
    id: 'kinetic-prithvi-salon',
    number: '01 / 03',
    title: 'Prithvi Residence',
    subtitle: 'The Grand Living Salon & Atrium',
    category: 'Residential Atrium & Architecture',
    location: 'Royal Nesto, Neelambur, Coimbatore',
    year: '2025',
    area: '3,520 sq.ft • 3-BHK Residence',
    scope: 'Triple-Height Salon • Italian PU Panelling • Fluted Millwork',
    description:
      'Articulated with multi-layer Italian PU wall panelling, custom fluted acoustic joinery, and ambient magnetic track illumination for an expansive spatial living experience.',
    image: '/images/mr-prithivi-images/Mr Prithvi - Neelambur_page-0002.jpg',
    transitionTitle: {
      eyebrow: '• DARK ARCHITECTURAL INTERLUDE // CHAPTER 01',
      line1: 'ARCHITECTURE',
      line2: 'IN MOTION',
      subtext: 'ROYAL NESTO RESIDENCE // ATRIUM SALON // COIMBATORE',
      coord: 'LAT: 11.0168° N, 76.9558° E // AXIS-Y ROTATION',
    },
  },
  {
    id: 'kinetic-prithvi-suite',
    number: '02 / 03',
    title: 'Royal Nesto Suite',
    subtitle: 'Fluted Timber & Acoustic Cove',
    category: 'Master Bedroom Suite & Private Lounge',
    location: 'Royal Nesto, Neelambur, Coimbatore',
    year: '2025',
    area: '860 sq.ft Master Bedroom Suite',
    scope: 'Acoustic Wall Backing • Warm Sensor Illumination • Custom Headboard',
    description:
      'Engineered with marine-grade acoustic timber backing, concealed warm sensor illumination, and tailored custom headboard architecture creating a serene private sanctuary.',
    image: '/images/mr-prithivi-images/Mr Prithvi - Neelambur_page-0010.jpg',
    transitionTitle: {
      eyebrow: '• DARK ARCHITECTURAL INTERLUDE // CHAPTER 02',
      line1: 'SPACES',
      line2: 'DEFINED',
      subtext: 'MASTER SUITE ARCHITECTURE // ACOUSTIC GRAPHITE & LIGHT',
      coord: 'AXIS-Y 180° // ROTATING SHUTTER MECHANISM',
    },
  },
  {
    id: 'kinetic-prithvi-millwork',
    number: '03 / 03',
    title: 'Bespoke Millwork',
    subtitle: 'Italian PU & Artisan Joinery',
    category: 'Culinary Architecture & Modular Millwork',
    location: 'Royal Nesto, Neelambur, Coimbatore',
    year: '2026',
    area: 'Full Turnkey Architectural Execution',
    scope: 'High-Gloss Acrylic • Solid Quartz Counters • Blum Hardware',
    description:
      'Crafted high-gloss acrylic cabinetry, solid quartz surfaces, and concealed Blum hardware harmonized with directional architectural cove lighting and precision acoustic partitions.',
    image: '/images/mr-prithivi-images/Mr Prithvi - Neelambur_page-0022.jpg',
    transitionTitle: {
      eyebrow: '• DARK ARCHITECTURAL INTERLUDE // CHAPTER 03',
      line1: 'BEYOND',
      line2: 'FORM',
      subtext: 'PRECISION MODULAR MILLWORK // 3,520 SQ.FT TURNKEY',
      coord: 'TERMINAL CONVERGENCE // DIRECTIONAL LIGHT ENGINE',
    },
  },
];
