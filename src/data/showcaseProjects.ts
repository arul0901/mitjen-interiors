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
    id: 'project-prithvi',
    number: '01',
    name: 'Prithvi',
    client: 'Prithvi',
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
      alt: 'Prithvi residence at Royal Nesto, Neelambur, Coimbatore',
      caption: 'Main Living & Entrance Salon',
      space: 'Living Room',
    },
    supportingImages: [
      {
        src: '/images/Residential/Residential4.jpeg',
        alt: 'Prithvi dining and lounge area',
        caption: 'Dining & Formal Lounge',
        space: 'Dining Area',
      },
      {
        src: '/assets/images/projects/image5.jpg',
        alt: 'Prithvi bedroom with custom headboard and warm ambient illumination',
        caption: 'Master Suite & Custom Headboard',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image8.jpg',
        alt: 'Prithvi modular kitchen and bespoke joinery detailing',
        caption: 'Kitchen & Concealed Lighting',
        space: 'Kitchen',
      },
    ],
    allImages: [
      {
        src: '/images/Residential/Residential1.jpeg',
        alt: 'Prithvi residence at Royal Nesto, Neelambur, Coimbatore',
        caption: 'Main Living & Entrance Salon',
        space: 'Living Room',
      },
      {
        src: '/images/Residential/Residential4.jpeg',
        alt: 'Prithvi dining and lounge area',
        caption: 'Dining & Formal Lounge',
        space: 'Dining Area',
      },
      {
        src: '/assets/images/projects/image5.jpg',
        alt: 'Prithvi bedroom with custom headboard and warm ambient illumination',
        caption: 'Master Suite & Custom Headboard',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image8.jpg',
        alt: 'Prithvi modular kitchen and bespoke joinery detailing',
        caption: 'Kitchen & Concealed Lighting',
        space: 'Kitchen',
      },
    ],
    specifications: [
      { label: 'Project / Space', value: 'Prithvi' },
      { label: 'Client', value: 'Prithvi' },
      { label: 'City', value: 'Coimbatore' },
      { label: 'Area / Locality', value: 'Neelambur' },
      { label: 'Full Address', value: 'Royal Nesto' },
      { label: 'Configuration', value: '3BHK' },
      { label: 'Project Area', value: '3,520 sq.ft' },
    ],
  },
  {
    id: 'project-sampath',
    number: '02',
    name: 'Sampath',
    client: 'Sampath',
    propertyType: 'Residential Villa',
    configuration: '6BHK',
    areaSqFt: 8060,
    formattedArea: '8,060 SQ.FT.',
    locationCity: 'Coimbatore',
    locationLocality: 'Kalapatti',
    addressReference: 'Nehru Nagar West.',
    layoutType: 'landscape-right',
    heroImage: {
      src: '/images/Residential/Residential7.jpeg',
      alt: 'Sampath villa at Nehru Nagar West., Kalapatti, Coimbatore',
      caption: 'Double-Height Living Salon',
      space: 'Grand Living Area',
    },
    supportingImages: [
      {
        src: '/images/Residential/Residential3.jpeg',
        alt: 'Sampath villa architectural staircase and vertical circulation',
        caption: 'Architectural Staircase & Gallery',
        space: 'Circulation & Staircase',
        isPortrait: true,
      },
      {
        src: '/images/Residential/Residential5.jpeg',
        alt: 'Sampath villa master bedroom suite with bespoke joinery',
        caption: 'Master Bedroom Suite',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image14.jpg',
        alt: 'Sampath villa open dining and family living space',
        caption: 'Dining & Open Family Living',
        space: 'Dining Space',
      },
    ],
    allImages: [
      {
        src: '/images/Residential/Residential7.jpeg',
        alt: 'Sampath villa at Nehru Nagar West., Kalapatti, Coimbatore',
        caption: 'Double-Height Living Salon',
        space: 'Grand Living Area',
      },
      {
        src: '/images/Residential/Residential3.jpeg',
        alt: 'Sampath villa architectural staircase and vertical circulation',
        caption: 'Architectural Staircase & Gallery',
        space: 'Circulation & Staircase',
        isPortrait: true,
      },
      {
        src: '/images/Residential/Residential5.jpeg',
        alt: 'Sampath villa master bedroom suite with bespoke joinery',
        caption: 'Master Bedroom Suite',
        space: 'Master Bedroom',
      },
      {
        src: '/assets/images/projects/image14.jpg',
        alt: 'Sampath villa open dining and family living space',
        caption: 'Dining & Open Family Living',
        space: 'Dining Space',
      },
    ],
    specifications: [
      { label: 'Project / Space', value: 'Sampath' },
      { label: 'Client', value: 'Sampath' },
      { label: 'City', value: 'Coimbatore' },
      { label: 'Area / Locality', value: 'Kalapatti' },
      { label: 'Full Address', value: 'Nehru Nagar West.' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Project Area', value: '8,060 sq.ft' },
    ],
  },
  {
    id: 'project-mr-mahesh-pilot',
    number: '03',
    name: 'Mr. Mahesh – Pilot',
    client: 'Mr. Mahesh – Pilot',
    propertyType: 'Residential Villa',
    configuration: '6BHK',
    areaSqFt: 7350,
    formattedArea: '7,350 SQ.FT.',
    locationCity: 'Bangalore',
    locationLocality: 'Bangalore',
    addressReference: 'Krishna Raja (KR) Puram',
    layoutType: 'cinematic-full',
    heroImage: {
      src: '/images/Residential/Residential2.jpeg',
      alt: 'Residential villa for Mr. Mahesh – Pilot at Krishna Raja (KR) Puram, Bangalore',
      caption: 'Central Courtyard & Formal Drawing Hall',
      space: 'Central Drawing Hall',
    },
    supportingImages: [
      {
        src: '/images/Residential/Residential6.jpeg',
        alt: 'Kitchen and breakfast island for Mr. Mahesh – Pilot villa',
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
        alt: 'Residential villa for Mr. Mahesh – Pilot at Krishna Raja (KR) Puram, Bangalore',
        caption: 'Central Courtyard & Formal Drawing Hall',
        space: 'Central Drawing Hall',
      },
      {
        src: '/images/Residential/Residential6.jpeg',
        alt: 'Kitchen and breakfast island for Mr. Mahesh – Pilot villa',
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
      { label: 'Project / Space', value: 'Mr. Mahesh – Pilot' },
      { label: 'Client', value: 'Mr. Mahesh – Pilot' },
      { label: 'City', value: 'Bangalore' },
      { label: 'Area / Locality', value: 'Bangalore' },
      { label: 'Full Address', value: 'Krishna Raja (KR) Puram' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Project Area', value: '7,350 sq.ft' },
    ],
  },
  {
    id: 'project-deepak',
    number: '04',
    name: 'Deepak',
    client: 'Deepak',
    propertyType: 'Residential Individual Home',
    configuration: '4BHK',
    areaSqFt: 6020,
    formattedArea: '6,020 SQ.FT.',
    locationCity: 'Coimbatore',
    locationLocality: 'Saibaba Colony',
    addressReference: 'Saibaba Colony',
    layoutType: 'asymmetric',
    heroImage: {
      src: '/assets/images/projects/image4.jpg',
      alt: 'Deepak individual home at Saibaba Colony, Coimbatore',
      caption: 'Primary Living Pavilion & Bespoke Joinery',
      space: 'Living Pavilion',
    },
    supportingImages: [
      {
        src: '/assets/images/projects/image10.jpg',
        alt: 'Deepak dining room and bespoke credenza',
        caption: 'Dining Room & Ambient Illumination',
        space: 'Dining Space',
      },
      {
        src: '/assets/images/projects/image13.jpg',
        alt: 'Deepak private lounge and study',
        caption: 'Private Study & Lounge',
        space: 'Private Lounge',
      },
      {
        src: '/assets/images/projects/image2.jpg',
        alt: 'Deepak bedroom suite with architectural millwork',
        caption: 'Master Suite & Dressing Hall',
        space: 'Master Suite',
        isPortrait: true,
      },
    ],
    allImages: [
      {
        src: '/assets/images/projects/image4.jpg',
        alt: 'Deepak individual home at Saibaba Colony, Coimbatore',
        caption: 'Primary Living Pavilion & Bespoke Joinery',
        space: 'Living Pavilion',
      },
      {
        src: '/assets/images/projects/image10.jpg',
        alt: 'Deepak dining room and bespoke credenza',
        caption: 'Dining Room & Ambient Illumination',
        space: 'Dining Space',
      },
      {
        src: '/assets/images/projects/image13.jpg',
        alt: 'Deepak private lounge and study',
        caption: 'Private Study & Lounge',
        space: 'Private Lounge',
      },
      {
        src: '/assets/images/projects/image2.jpg',
        alt: 'Deepak bedroom suite with architectural millwork',
        caption: 'Master Suite & Dressing Hall',
        space: 'Master Suite',
        isPortrait: true,
      },
    ],
    specifications: [
      { label: 'Project / Space', value: 'Deepak' },
      { label: 'Client', value: 'Deepak' },
      { label: 'City', value: 'Coimbatore' },
      { label: 'Area / Locality', value: 'Saibaba Colony' },
      { label: 'Full Address', value: 'Saibaba Colony, Coimbatore' },
      { label: 'Configuration', value: '4BHK' },
      { label: 'Project Area', value: '6,020 sq.ft' },
    ],
  },
];

export const MATERIAL_SPECIFICATIONS: MaterialCategory[] = [
  {
    id: 'mat-flooring',
    number: '01',
    title: 'Flooring',
    subtitle: 'Surface tactility, acoustics & structural durability',
    materials: ['Wooden', 'Floor Carpet', 'Vinyl Flooring'],
    brands: ['Vinyl – Duracare, Armstrong', 'Wooden – Tarkett, Armstrong'],
    note: 'Premium vinyl resilient flooring and engineered wooden planks.',
  },
  {
    id: 'mat-walls',
    number: '02',
    title: 'Walls / Paint / Wallpaper',
    subtitle: 'Spatial division, acoustic dampening & architectural envelope',
    materials: ['Wall Panel', 'Gypsum Panel', 'Aluminum Partition'],
    brands: ['Plywood – Green ply, Kit ply, Century ply', 'Gypsum – Saint Gobain, Armstrong'],
    note: 'Precision gypsum drywalls, architectural veneered panels, and aluminium partitions.',
  },
  {
    id: 'mat-ceiling',
    number: '03',
    title: 'Ceiling',
    subtitle: 'Concealed services, acoustic planes & vertical rhythm',
    materials: ['Vox', 'Gypsum', 'Metal', 'PVC Fluted Panel Ceiling'],
    brands: ['Saint Gobain, Armstrong'],
    note: 'Seamless acoustic gypsum suspended ceilings, micro-perforated metal grids, and PVC fluted panel systems.',
  },
  {
    id: 'mat-furniture',
    number: '04',
    title: 'Furniture / Woodwork',
    subtitle: 'Custom cabinetry, tactile veneers & millwork precision',
    materials: ['Plywood', 'Laminate', 'High Glossy', 'Acrylic'],
    brands: ['Plywood – Green ply, Kit ply, Century ply', 'Laminate – IVAS, Kridha, Century, Advance'],
    note: 'Marine-grade calibrated ply, post-formed architectural laminates, high-gloss PU, and anti-fingerprint acrylics.',
  },
  {
    id: 'mat-lighting',
    number: '05',
    title: 'Lighting',
    subtitle: 'Sculptural layers, photometric warmth & architectural accent',
    materials: ['Wall Mounted', 'Concealed', 'Spot', 'Hanging', 'LED Strip Light'],
    brands: ['Elite', 'Havells', 'Philips', 'Legrand & Orient etc.'],
    note: 'Architectural recessed spots, concealed coves, profile LED strips, and decorative hanging fixtures.',
  },
];

