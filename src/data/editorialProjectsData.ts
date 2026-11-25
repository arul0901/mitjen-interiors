/**
 * Editorial Projects Data Layer
 * Authentically mapped to the 4 signature projects and their material & brand specifications.
 * Categories: 'Residential' | 'Commercial' | 'Corporate'
 */

export type ProjectCategory = 'Residential' | 'Commercial' | 'Corporate';

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
  space: string;
  aspectRatio?: 'landscape' | 'portrait' | 'wide' | 'square';
}

export interface EditorialProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: ProjectCategory;
  location: string;
  city: 'Coimbatore' | 'Bangalore';
  year: string;
  area: string;
  client?: string;
  projectType: string;
  scope: string;
  turnaround?: string;
  coverImage: string;
  aspectRatio: 'landscape' | 'portrait' | 'wide' | 'tall' | 'hero';
  gridSpan: {
    colSpan: number;
    rowSpan: number;
  };
  quote: string;
  description: string;
  highlights: string[];
  specifications: ProjectSpecification[];
  gallery: GalleryPhoto[];
}

const MATERIAL_SPECIFICATIONS: ProjectSpecification[] = [
  {
    label: 'Flooring',
    value: 'Wooden, Floor Carpet, Vinyl Flooring — Vinyl: Duracare, Armstrong | Wooden: Tarkett, Armstrong',
  },
  {
    label: 'Walls / Paint / Wallpaper',
    value: 'Wall Panel, Gypsum Panel, Aluminum Partition — Plywood: Green ply, Kit ply, Century ply | Gypsum: Saint Gobain, Armstrong',
  },
  {
    label: 'Ceiling',
    value: 'Vox, Gypsum, Metal, PVC Fluted Panel Ceiling — Saint Gobain, Armstrong',
  },
  {
    label: 'Furniture / Woodwork',
    value: 'Plywood, Laminate, High Glossy, Acrylic — Plywood: Green ply, Kit ply, Century ply | Laminate: IVAS, Kridha, Century, Advance',
  },
  {
    label: 'Lighting',
    value: 'Wall Mounted, Concealed, Spot, Hanging, LED Strip Light — Elite, Havells, Philips, Legrand & Orient',
  },
];

export const EDITORIAL_PROJECTS: EditorialProject[] = [
  {
    id: 'prithvi-residence',
    slug: 'prithvi-residence',
    number: '01',
    title: 'Prithvi Residence',
    category: 'Residential',
    location: 'Royal Nesto, Neelambur, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '3,520 sq.ft',
    client: 'Prithvi',
    projectType: 'Bespoke Residence — Royal Nesto',
    scope: 'Full Interior Architecture, Flooring, Wall Panelling, Ceilings, Woodwork & Lighting',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
    aspectRatio: 'wide',
    gridSpan: { colSpan: 2, rowSpan: 2 },
    quote: 'Generous spatial flow, bespoke laminated & acrylic joinery, and warm balanced architectural illumination.',
    description:
      'Engineered for Prithvi at Royal Nesto, Neelambur, Coimbatore. This residence embraces an open-format spatial plan uniting Tarkett & Armstrong wooden flooring, Green ply & Century ply custom cabinetry finished in IVAS and Kridha laminates, Saint Gobain gypsum & PVC fluted ceilings, and layered Philips & Havells lighting.',
    highlights: [
      'Flooring: Wooden, Floor Carpet & Vinyl finishes (Duracare, Tarkett, Armstrong)',
      'Walls & Partitions: Wall Panels, Saint Gobain Gypsum Panels & Aluminum Partitions',
      'Ceilings: Vox, Gypsum, Metal & PVC Fluted Panel Ceilings (Saint Gobain, Armstrong)',
      'Furniture & Woodwork: Green ply, Kit ply & Century ply with IVAS, Kridha, Century & Advance laminates',
      'Lighting: Wall Mounted, Concealed, Spot, Hanging & LED Strip Lights (Elite, Havells, Philips, Legrand, Orient)',
    ],
    specifications: [
      { label: 'Client / Residence', value: 'Prithvi' },
      { label: 'Location', value: 'Royal Nesto, Neelambur, Coimbatore' },
      ...MATERIAL_SPECIFICATIONS,
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
        caption: 'Dining & Formal Lounge with tailored cabinetry and ambient concealed LED strip lighting.',
        space: 'Dining Space',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/image5.jpg',
        caption: 'Master bedroom suite with custom wall panelling and warm spot illumination.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image8.jpg',
        caption: 'Modular kitchen in high-gloss & acrylic finishes with Green ply carcass.',
        space: 'Kitchen',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image15.jpg',
        caption: 'Walk-in wardrobe suite finished in IVAS & Century laminates with LED strip lighting.',
        space: 'Wardrobe Suite',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'sampath-villa',
    slug: 'sampath-villa',
    number: '02',
    title: 'Sampath Villa',
    category: 'Residential',
    location: 'Nehru Nagar West, Kalapatti, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '8,060 sq.ft',
    client: 'Sampath',
    projectType: 'Grand Luxury Villa — Kalapatti',
    scope: 'Complete Villa Interiors, Wooden & Vinyl Flooring, Fluted Ceilings & Bespoke Woodwork',
    turnaround: '75 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 2 },
    quote: 'Monumental double-height volumes, acoustic Saint Gobain ceilings, and precision branded millwork.',
    description:
      'An expansive luxury villa engineered for Sampath at Nehru Nagar West, Kalapatti, Coimbatore. Featuring Tarkett & Armstrong wooden flooring, Saint Gobain & Armstrong gypsum and PVC fluted panel ceilings, Green ply & Century ply bespoke furniture in high-gloss and acrylic finishes, and curated Elite, Philips & Legrand lighting.',
    highlights: [
      'Double-height living salon with Saint Gobain & Armstrong acoustic gypsum and PVC fluted ceilings',
      'Tarkett & Armstrong wooden flooring paired with Duracare vinyl and floor carpet zones',
      'Wall panels, gypsum partitions, and aluminum partition detailing across living levels',
      'Custom furniture crafted with Green ply, Kit ply, Century ply & IVAS / Advance laminates',
    ],
    specifications: [
      { label: 'Client / Residence', value: 'Sampath' },
      { label: 'Location', value: 'Nehru Nagar West, Kalapatti, Coimbatore' },
      ...MATERIAL_SPECIFICATIONS,
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
        caption: 'Double-height grand living salon with Saint Gobain gypsum & fluted ceiling.',
        space: 'Grand Living Salon',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential3.jpeg',
        caption: 'Architectural staircase gallery with concealed & wall-mounted lighting.',
        space: 'Staircase & Promenade',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential5.jpeg',
        caption: 'Master bedroom suite with tailored Century ply & acrylic wardrobe joinery.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image14.jpg',
        caption: 'Family dining and lounge with wooden flooring and hanging pendant accents.',
        space: 'Family Dining',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'mr-mahesh-villa',
    slug: 'mr-mahesh-villa',
    number: '03',
    title: 'Mr. Mahesh – Pilot',
    category: 'Residential',
    location: 'Krishna Raja (KR) Puram, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '7,350 sq.ft',
    client: 'Mr. Mahesh – Pilot',
    projectType: 'Contemporary Residence — KR Puram',
    scope: 'Turnkey Interior Execution, Wall & Ceiling Systems, Custom Woodwork & Lighting',
    turnaround: '70 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential2.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Seamless spatial transitions, precision laminated & acrylic woodwork, and layered architectural lighting.',
    description:
      'Articulated for Mr. Mahesh – Pilot at Krishna Raja (KR) Puram, Bangalore. Defined by clean spatial flow, Armstrong & Tarkett flooring, Saint Gobain wall & ceiling panels, Green ply & Kit ply furniture finished in Kridha, Century & Advance laminates, and integrated Philips, Havells & Legrand lighting.',
    highlights: [
      'Wooden, floor carpet, and Duracare / Armstrong vinyl flooring across private and formal zones',
      'Vox, gypsum, metal, and PVC fluted panel ceilings for refined acoustic comfort',
      'High-gloss & acrylic modular woodwork built on calibrated Green ply and Century ply',
      'Spot, hanging, concealed, and LED strip lighting from Philips, Havells, Elite & Orient',
    ],
    specifications: [
      { label: 'Client / Residence', value: 'Mr. Mahesh – Pilot' },
      { label: 'Location', value: 'Krishna Raja (KR) Puram, Bangalore' },
      ...MATERIAL_SPECIFICATIONS,
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential2.jpeg',
        caption: 'Formal drawing hall with wall panelling and recessed concealed lighting.',
        space: 'Central Drawing Hall',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential6.jpeg',
        caption: 'Bespoke island kitchen with high-gloss acrylic cabinetry.',
        space: 'Island Kitchen',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/image1.jpg',
        caption: 'Formal salon with fluted wall panels and hanging accent luminaires.',
        space: 'Formal Salon',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image12.jpg',
        caption: 'Guest suite featuring IVAS & Advance laminated wardrobe cabinetry.',
        space: 'Guest Suite',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'deepak-residence',
    slug: 'deepak-residence',
    number: '04',
    title: 'Deepak Residence',
    category: 'Residential',
    location: 'Saibaba Colony, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '6,020 sq.ft',
    client: 'Deepak',
    projectType: 'Individual Residence — Saibaba Colony',
    scope: 'Bespoke Interior Architecture, Woodwork, Ceilings, Flooring & Lighting Design',
    turnaround: '65 Days Turnkey',
    coverImage: '/images/projects/image4.jpg',
    aspectRatio: 'wide',
    gridSpan: { colSpan: 2, rowSpan: 1 },
    quote: 'Asymmetric architectural volumes, bespoke branded laminates, and tailored spatial choreography.',
    description:
      'Crafted for Deepak at Saibaba Colony, Coimbatore. This individual home pairs Tarkett & Armstrong wooden flooring with wall & gypsum panelling, Vox & Saint Gobain fluted ceilings, custom Kit ply & Century ply cabinetry in high-gloss and acrylic finishes, and Elite, Havells & Philips architectural lighting.',
    highlights: [
      'Living pavilion with wall panels, aluminum partitions, and Saint Gobain gypsum detailing',
      'Vox & PVC fluted panel ceiling treatments with concealed LED strip coves',
      'Custom furniture & wardrobes crafted using Green ply, Kit ply & Century ply with IVAS & Kridha laminates',
      'Complete lighting scheme combining Elite, Havells, Philips, Legrand & Orient fixtures',
    ],
    specifications: [
      { label: 'Client / Residence', value: 'Deepak' },
      { label: 'Location', value: 'Saibaba Colony, Coimbatore' },
      ...MATERIAL_SPECIFICATIONS,
    ],
    gallery: [
      {
        url: '/images/projects/image4.jpg',
        caption: 'Primary living pavilion with bespoke wall panelling and recessed spot lighting.',
        space: 'Living Pavilion',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/image10.jpg',
        caption: 'Dining room with wooden flooring, hanging luminaire, and custom credenza.',
        space: 'Dining Room',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image13.jpg',
        caption: 'Private study with acoustic gypsum ceiling and warm LED strip accents.',
        space: 'Study Room',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/image2.jpg',
        caption: 'Master suite and dressing hall with high-gloss & acrylic wardrobe finishes.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
    ],
  },
];

export function getEditorialProjectById(idOrSlug: string): EditorialProject | undefined {
  return EDITORIAL_PROJECTS.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );
}

export function getProjectSiblings(currentId: string): {
  prev: EditorialProject;
  next: EditorialProject;
} {
  const index = EDITORIAL_PROJECTS.findIndex(
    (p) => p.id === currentId || p.slug === currentId
  );
  const safeIndex = index === -1 ? 0 : index;
  const prevIndex = (safeIndex - 1 + EDITORIAL_PROJECTS.length) % EDITORIAL_PROJECTS.length;
  const nextIndex = (safeIndex + 1) % EDITORIAL_PROJECTS.length;

  return {
    prev: EDITORIAL_PROJECTS[prevIndex],
    next: EDITORIAL_PROJECTS[nextIndex],
  };
}
