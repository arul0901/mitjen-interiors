/**
 * Architectural Project Showcase Data Layer
 * Strict adherence to verified client information and supplied photography.
 * Zero invented project descriptions, architectural features, or design styles.
 */

export interface ShowcaseImage {
  src: string;
  alt: string;
  caption: string;
  space?: string;
  isPortrait?: boolean;
}

export interface ShowcaseProject {
  id: string;
  number: string;
  name: string;
  client?: string;
  propertyType: string;
  configuration: string;
  areaSqFt: number;
  formattedArea: string;
  locationCity: string;
  locationLocality: string;
  addressReference?: string;
  layoutType: 'landscape-left' | 'landscape-right' | 'cinematic-full' | 'asymmetric';
  heroImage: ShowcaseImage;
  supportingImages: ShowcaseImage[];
  allImages: ShowcaseImage[];
  specifications: {
    label: string;
    value: string;
  }[];
}

export interface MaterialItem {
  name: string;
  details?: string;
}

export interface MaterialCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  materials: string[];
  brands: string[];
  note?: string;
}

export const ARCHITECTURAL_PROJECTS: ShowcaseProject[] = [
  {
    id: 'project-wonder-space-prithvi',
    number: '01',
    name: 'Wonder Space',
    client: 'Mr. Prithvi',
    propertyType: 'Residential Apartment',
    configuration: '3BHK',
    areaSqFt: 3520,
    formattedArea: '3,520 SQ.FT.',
    locationCity: 'Coimbatore',
    locationLocality: 'Neelambur',
    addressReference: 'Royal Nesto',
    layoutType: 'landscape-left',
    heroImage: {
      src: '/images/Residential/Residential1.jpeg',
      alt: 'Wonder Space residence for Mr. Prithvi at Royal Nesto, Neelambur, Coimbatore',
      caption: 'Main Living & Entrance Salon',
      space: 'Living Room',
    },
    supportingImages: [
      {
        src: '/images/Residential/Residential4.jpeg',
        alt: 'Wonder Space dining and lounge area',
        caption: 'Dining & Formal Lounge',
        space: 'Dining Area',
      },
      {
        src: '/assets/images/projects/image5.jpg',
        alt: 'Wonder Space bedroom with custom headboard and warm ambient illumination',
        caption: 'Master Suite & Custom Headboard',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image8.jpg',
        alt: 'Wonder Space modular kitchen and bespoke joinery detailing',
        caption: 'Kitchen & Concealed Lighting',
        space: 'Kitchen',
      },
    ],
    allImages: [
      {
        src: '/images/Residential/Residential1.jpeg',
        alt: 'Wonder Space residence for Mr. Prithvi at Royal Nesto, Neelambur, Coimbatore',
        caption: 'Main Living & Entrance Salon',
        space: 'Living Room',
      },
      {
        src: '/images/Residential/Residential4.jpeg',
        alt: 'Wonder Space dining and lounge area',
        caption: 'Dining & Formal Lounge',
        space: 'Dining Area',
      },
      {
        src: '/assets/images/projects/image5.jpg',
        alt: 'Wonder Space bedroom with custom headboard and warm ambient illumination',
        caption: 'Master Suite & Custom Headboard',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image8.jpg',
        alt: 'Wonder Space modular kitchen and bespoke joinery detailing',
        caption: 'Kitchen & Concealed Lighting',
        space: 'Kitchen',
      },
    ],
    specifications: [
      { label: 'Project Name', value: 'Wonder Space' },
      { label: 'Client', value: 'Mr. Prithvi' },
      { label: 'Project Type', value: 'Residential Apartment' },
      { label: 'Configuration', value: '3BHK' },
      { label: 'Location', value: 'Neelambur, Coimbatore' },
      { label: 'Address Reference', value: 'Royal Nesto' },
    ],
  },
  {
    id: 'project-wonder-space-sampath',
    number: '02',
    name: 'Wonder Space',
    client: 'Mr. Sampath',
    propertyType: 'Residential Villa',
    configuration: '6BHK',
    areaSqFt: 8060,
    formattedArea: '8,060 SQ.FT.',
    locationCity: 'Coimbatore',
    locationLocality: 'Kalapatti',
    addressReference: 'Nehru Nagar West',
    layoutType: 'landscape-right',
    heroImage: {
      src: '/images/Residential/Residential7.jpeg',
      alt: 'Wonder Space villa for Mr. Sampath at Nehru Nagar West, Kalapatti, Coimbatore',
      caption: 'Double-Height Living Salon',
      space: 'Grand Living Area',
    },
    supportingImages: [
      {
        src: '/images/Residential/Residential3.jpeg',
        alt: 'Wonder Space villa architectural staircase and vertical circulation',
        caption: 'Architectural Staircase & Gallery',
        space: 'Circulation & Staircase',
        isPortrait: true,
      },
      {
        src: '/images/Residential/Residential5.jpeg',
        alt: 'Wonder Space villa master bedroom suite with bespoke joinery',
        caption: 'Master Bedroom Suite',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image14.jpg',
        alt: 'Wonder Space villa open dining and family living space',
        caption: 'Dining & Open Family Living',
        space: 'Dining Space',
      },
    ],
    allImages: [
      {
        src: '/images/Residential/Residential7.jpeg',
        alt: 'Wonder Space villa for Mr. Sampath at Nehru Nagar West, Kalapatti, Coimbatore',
        caption: 'Double-Height Living Salon',
        space: 'Grand Living Area',
      },
      {
        src: '/images/Residential/Residential3.jpeg',
        alt: 'Wonder Space villa architectural staircase and vertical circulation',
        caption: 'Architectural Staircase & Gallery',
        space: 'Circulation & Staircase',
        isPortrait: true,
      },
      {
        src: '/images/Residential/Residential5.jpeg',
        alt: 'Wonder Space villa master bedroom suite with bespoke joinery',
        caption: 'Master Bedroom Suite',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image14.jpg',
        alt: 'Wonder Space villa open dining and family living space',
        caption: 'Dining & Open Family Living',
        space: 'Dining Space',
      },
    ],
    specifications: [
      { label: 'Project Name', value: 'Wonder Space' },
      { label: 'Client', value: 'Mr. Sampath' },
      { label: 'Project Type', value: 'Residential Villa' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Location', value: 'Kalapatti, Coimbatore' },
      { label: 'Location Reference', value: 'Nehru Nagar West' },
    ],
  },
  {
    id: 'project-mr-mahesh',
    number: '03',
    name: 'Mr. Mahesh',
    client: 'Mr. Mahesh',
    propertyType: 'Residential Villa',
    configuration: '6BHK',
    areaSqFt: 7350,
    formattedArea: '7,350 SQ.FT.',
    locationCity: 'Bengaluru',
    locationLocality: 'KR Puram',
    layoutType: 'cinematic-full',
    heroImage: {
      src: '/images/Residential/Residential2.jpeg',
      alt: 'Residential villa for Mr. Mahesh at KR Puram, Bengaluru',
      caption: 'Central Courtyard & Formal Drawing Hall',
      space: 'Central Drawing Hall',
    },
    supportingImages: [
      {
        src: '/images/Residential/Residential6.jpeg',
        alt: 'Kitchen and breakfast island for Mr. Mahesh villa',
        caption: 'Bespoke Island Kitchen',
        space: 'Kitchen',
        isPortrait: true,
      },
      {
        src: '/assets/images/projects/image1.jpg',
        alt: 'Formal drawing room with refined architectural millwork',
        caption: 'Formal Salon & Library Nook',
        space: 'Drawing Room',
      },
      {
        src: '/assets/images/projects/image12.jpg',
        alt: 'Upper-level guest suite and lounge',
        caption: 'Upper Guest Suite',
        space: 'Guest Bedroom',
      },
    ],
    allImages: [
      {
        src: '/images/Residential/Residential2.jpeg',
        alt: 'Residential villa for Mr. Mahesh at KR Puram, Bengaluru',
        caption: 'Central Courtyard & Formal Drawing Hall',
        space: 'Central Drawing Hall',
      },
      {
        src: '/images/Residential/Residential6.jpeg',
        alt: 'Kitchen and breakfast island for Mr. Mahesh villa',
        caption: 'Bespoke Island Kitchen',
        space: 'Kitchen',
        isPortrait: true,
      },
      {
        src: '/assets/images/projects/image1.jpg',
        alt: 'Formal drawing room with refined architectural millwork',
        caption: 'Formal Salon & Library Nook',
        space: 'Drawing Room',
      },
      {
        src: '/assets/images/projects/image12.jpg',
        alt: 'Upper-level guest suite and lounge',
        caption: 'Upper Guest Suite',
        space: 'Guest Bedroom',
      },
    ],
    specifications: [
      { label: 'Project Name', value: 'Mr. Mahesh' },
      { label: 'Client', value: 'Mr. Mahesh' },
      { label: 'Project Type', value: 'Residential Villa' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Location', value: 'KR Puram, Bengaluru' },
    ],
  },
  {
    id: 'project-elara-space-deepak',
    number: '04',
    name: 'Elara Space',
    client: 'Mr. Deepak',
    propertyType: 'Residential Individual Home',
    configuration: '4BHK',
    areaSqFt: 6020,
    formattedArea: '6,020 SQ.FT.',
    locationCity: 'Coimbatore',
    locationLocality: 'Saibaba Colony',
    layoutType: 'asymmetric',
    heroImage: {
      src: '/assets/images/projects/image4.jpg',
      alt: 'Elara Space individual home for Mr. Deepak at Saibaba Colony, Coimbatore',
      caption: 'Primary Living Pavilion & Bespoke Joinery',
      space: 'Living Pavilion',
    },
    supportingImages: [
      {
        src: '/assets/images/projects/image10.jpg',
        alt: 'Elara Space dining room and bespoke credenza',
        caption: 'Dining Room & Ambient Illumination',
        space: 'Dining Space',
      },
      {
        src: '/assets/images/projects/image13.jpg',
        alt: 'Elara Space private lounge and study',
        caption: 'Private Study & Lounge',
        space: 'Private Lounge',
      },
      {
        src: '/assets/images/projects/image2.jpg',
        alt: 'Elara Space bedroom suite with architectural millwork',
        caption: 'Master Suite & Dressing Hall',
        space: 'Master Suite',
        isPortrait: true,
      },
    ],
    allImages: [
      {
        src: '/assets/images/projects/image4.jpg',
        alt: 'Elara Space individual home for Mr. Deepak at Saibaba Colony, Coimbatore',
        caption: 'Primary Living Pavilion & Bespoke Joinery',
        space: 'Living Pavilion',
      },
      {
        src: '/assets/images/projects/image10.jpg',
        alt: 'Elara Space dining room and bespoke credenza',
        caption: 'Dining Room & Ambient Illumination',
        space: 'Dining Space',
      },
      {
        src: '/assets/images/projects/image13.jpg',
        alt: 'Elara Space private lounge and study',
        caption: 'Private Study & Lounge',
        space: 'Private Lounge',
      },
      {
        src: '/assets/images/projects/image2.jpg',
        alt: 'Elara Space bedroom suite with architectural millwork',
        caption: 'Master Suite & Dressing Hall',
        space: 'Master Suite',
        isPortrait: true,
      },
    ],
    specifications: [
      { label: 'Project Name', value: 'Elara Space' },
      { label: 'Client', value: 'Mr. Deepak' },
      { label: 'Project Type', value: 'Residential Individual Home' },
      { label: 'Configuration', value: '4BHK' },
      { label: 'Location', value: 'Saibaba Colony, Coimbatore' },
    ],
  },
];

export const MATERIAL_SPECIFICATIONS: MaterialCategory[] = [
  {
    id: 'mat-flooring',
    number: '01',
    title: 'Flooring',
    subtitle: 'Surface tactility, acoustics & structural durability',
    materials: ['Wooden flooring', 'Floor carpet', 'Vinyl flooring'],
    brands: ['Duracare', 'Armstrong', 'Tarkett'],
    note: 'Engineered hardwood, contract acoustic carpeting, and commercial-grade resilient vinyl systems.',
  },
  {
    id: 'mat-walls',
    number: '02',
    title: 'Walls & Partitions',
    subtitle: 'Spatial division, acoustic dampening & architectural envelope',
    materials: ['Wall panels', 'Gypsum panels', 'Aluminium partitions'],
    brands: ['Greenply', 'Kitply', 'Century Ply', 'Saint-Gobain', 'Armstrong'],
    note: 'Precision gypsum drywalls, architectural veneered panels, and slim-profile extruded aluminium frames.',
  },
  {
    id: 'mat-ceiling',
    number: '03',
    title: 'Ceiling',
    subtitle: 'Concealed services, acoustic planes & vertical rhythm',
    materials: ['VOX', 'Gypsum', 'Metal', 'PVC fluted panel ceilings'],
    brands: ['Saint-Gobain', 'Armstrong'],
    note: 'Seamless acoustic gypsum suspended ceilings, micro-perforated metal grids, and architectural fluted systems.',
  },
  {
    id: 'mat-furniture',
    number: '04',
    title: 'Furniture & Woodwork',
    subtitle: 'Custom cabinetry, tactile veneers & millwork precision',
    materials: ['Plywood', 'Laminate', 'High-gloss', 'Acrylic finishes'],
    brands: ['Greenply', 'Kitply', 'Century Ply', 'IVAS', 'Kridha', 'Advance'],
    note: 'Marine-grade calibrated ply, post-formed architectural laminates, high-gloss PU, and anti-fingerprint acrylics.',
  },
  {
    id: 'mat-lighting',
    number: '05',
    title: 'Lighting',
    subtitle: 'Sculptural layers, photometric warmth & architectural accent',
    materials: ['Wall-mounted', 'Concealed', 'Spot', 'Hanging', 'LED strip lighting'],
    brands: ['Elite', 'Havells', 'Philips', 'Legrand', 'Orient'],
    note: 'Architectural 2700K–3000K high-CRI recessed spots, diffuse indirect coves, and signature minimalist fixtures.',
  },
];
