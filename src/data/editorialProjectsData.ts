/**
 * Editorial Projects Data Layer
 * Inspired by the design language of Warp Architects (warparchitects.com/work).
 * Authentically mapped to project folders in public/images/projects/
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

export const EDITORIAL_PROJECTS: EditorialProject[] = [
  // ==========================================================================
  // RESIDENTIAL PROJECTS (7)
  // ==========================================================================
  {
    id: 'mitjen-racecourse-pu-paint',
    slug: 'mitjen-racecourse-pu-paint',
    number: '01',
    title: 'Racecourse Residence PU Paint',
    category: 'Residential',
    location: 'Racecourse Road, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '5,200 sq.ft',
    client: 'Private Residence',
    projectType: 'High-End Villa Architecture & Interiors',
    scope: 'Full Turnkey Architecture, Bespoke PU Joinery, Lighting & Millwork',
    turnaround: '75 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential1.jpeg',
    aspectRatio: 'wide',
    gridSpan: { colSpan: 2, rowSpan: 2 },
    quote: 'A masterclass in surface continuity, tactile Italian PU finishes, and luminous double-height spatial flow.',
    description:
      'Articulated for a distinguished private residence along Racecourse Road in Coimbatore, this home explores the intersection of monolithic architectural surfaces and hand-buffed Italian PU coatings. Every wall plane, fluted timber detail, and concealed storage volume is calibrated to create clean, uninterrupted sightlines that connect the formal salon to the private family sanctuaries.',
    highlights: [
      'Multi-layer Italian PU coatings applied in dust-free controlled spray booths',
      'Double-height living salon with integrated architectural acoustic ceiling planes',
      'Bespoke sculptural staircase featuring low-iron glass balustrades and integrated tread lighting',
      'Concealed European soft-close Blum hardware and magnetic touch latches',
      'Indirect architectural cove illumination calibrated to 2700K warm circadian rhythm',
    ],
    specifications: [
      { label: 'Project Name', value: 'Racecourse Residence PU Paint' },
      { label: 'Category', value: 'Residential Interior Architecture' },
      { label: 'Location', value: 'Racecourse Road, Coimbatore' },
      { label: 'Carpet Area', value: '5,200 sq.ft' },
      { label: 'Primary Finish', value: 'Hand-buffed Italian Polyurethane (PU) Matte & Satin' },
      { label: 'Joinery Carcass', value: 'Calibrated BWP Marine Grade Ply (10-Year Warranty)' },
      { label: 'Hardware', value: 'Blum Tandembox & Concealed Soft-Close Hinges' },
      { label: 'Lighting Concept', value: 'Recessed Magnetic Track & Concealed Architectural Coves' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential1.jpeg',
        caption: 'Formal living salon with fluted Italian PU wall panelling and balanced proportioning.',
        space: 'Formal Living Salon',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
        caption: 'Double-height grand living hall with acoustic false ceiling and expansive fenestrations.',
        space: 'Double-Height Living',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential3.jpeg',
        caption: 'Architectural circulation gallery with sculptural glass balustrades and integrated step lighting.',
        space: 'Vertical Circulation & Staircase',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
        caption: 'Open dining space connecting seamlessly to the formal lounge with warm cove lighting.',
        space: 'Dining & Formal Lounge',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential5.jpeg',
        caption: 'Master bedroom suite with tailored wardrobe joinery, neutral textures, and ambient sconces.',
        space: 'Master Bedroom Suite',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential6.jpeg',
        caption: 'Gourmet island kitchen featuring seamless quartz waterfall edges and handleless cabinetry.',
        space: 'Bespoke Island Kitchen',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential2.jpeg',
        caption: 'Central courtyard foyer with tailored spatial transitions and stone flooring.',
        space: 'Central Foyer & Drawing Hall',
        aspectRatio: 'landscape',
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
    year: '2023',
    area: '8,060 sq.ft',
    client: 'Sampath',
    projectType: '6-BHK Grand Luxury Villa',
    scope: 'Complete Villa Architecture, Sculptural Glass Staircase, Gourmet Kitchen & Terraces',
    turnaround: '75 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 2 },
    quote: 'Monumental double-height volumes, sculptural staircase transitions, and grand architectural grandeur.',
    description:
      'An 8,060 sq.ft grand residential villa engineered for Sampath at Nehru Nagar West, Kalapatti, Coimbatore. Designed around a towering double-height living pavilion, the architecture features a central floating staircase with cantilevered timber treads and structural glass balustrades, uniting all levels in an effortless architectural promenade.',
    highlights: [
      'Double-height grand living hall with acoustic gypsum planes and floor-to-ceiling fenestration',
      'Architectural staircase gallery with sculptural glass and integrated step illumination',
      'Gourmet bar and pantry with fluted bronze glass and ambient backlighting',
      'Upper-level entertainment pavilion opening out to landscaped terrace courtyards',
    ],
    specifications: [
      { label: 'Client / Villa', value: 'Sampath Villa' },
      { label: 'Address', value: 'Nehru Nagar West, Kalapatti, Coimbatore' },
      { label: 'Configuration', value: '6-BHK Grand Villa' },
      { label: 'Carpet Area', value: '8,060 sq.ft' },
      { label: 'Staircase', value: 'Cantilevered Teak Treads with 15mm Toughened Glass Balustrade' },
      { label: 'Kitchen', value: 'Italian Quartz Waterfall Island with Blum Servo-Drive' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential7.jpeg',
        caption: 'Double-height grand living salon with acoustic false ceiling.',
        space: 'Grand Living Salon',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential3.jpeg',
        caption: 'Sculptural staircase gallery with integrated tread lighting.',
        space: 'Staircase & Promenade',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential5.jpeg',
        caption: 'Master bedroom suite with tailored wardrobe joinery.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image14.jpg',
        caption: 'Dining and family lounge connected to outdoor courtyard.',
        space: 'Family Dining',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'prithvi-residence',
    slug: 'prithvi-residence',
    number: '03',
    title: 'Prithvi Residence',
    category: 'Residential',
    location: 'Royal Nesto, Neelambur, Coimbatore',
    city: 'Coimbatore',
    year: '2023',
    area: '3,520 sq.ft',
    client: 'Prithvi',
    projectType: '3-BHK Contemporary Residence',
    scope: 'Full Interior Architecture, Joinery, Modular Kitchen & Lighting',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Generous spatial flow, bespoke fluted joinery, and warm, balanced ambient illumination.',
    description:
      'Engineered for Prithvi at Royal Nesto, Neelambur, Coimbatore. This 3,520 sq.ft luxury apartment embraces an open-format floor plan that allows natural light to sweep across the formal salon into the dining and kitchen areas. Multi-layer Italian PU coatings on all custom cabinetry deliver enduring elegance without visual clutter.',
    highlights: [
      'Expansive open-plan living and dining circulation with acoustic false ceilings',
      'Custom fluted bed headboard with recessed warm sensor strip illumination',
      'High-gloss acrylic modular kitchen equipped with solid quartz countertops',
      'Walk-in dressing suite with tailored wardrobe joinery and soft-close European hardware',
    ],
    specifications: [
      { label: 'Client / Residence', value: 'Prithvi Residence' },
      { label: 'Address', value: 'Royal Nesto, Neelambur, Coimbatore' },
      { label: 'Configuration', value: '3-BHK Premium Apartment' },
      { label: 'Carpet Area', value: '3,520 sq.ft' },
      { label: 'Finishes', value: 'Italian PU Satin White & Natural Smoked Oak' },
      { label: 'Modular Joinery', value: 'BWP Marine Ply Carcass, Blum Tandembox Hardware' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential4.jpeg',
        caption: 'Dining & Formal Lounge with tailored credenza and ambient perimeter cove.',
        space: 'Dining Space',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image5.jpg',
        caption: 'Master bedroom suite with acoustic fluted backdrop and warm illumination.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image8.jpg',
        caption: 'Modular kitchen with seamless quartz island and soft-close Blum drawers.',
        space: 'Kitchen',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image15.jpg',
        caption: 'Walk-in wardrobe suite with tinted glass doors and sensor LED profiles.',
        space: 'Wardrobe Suite',
        aspectRatio: 'portrait',
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
    year: '2023',
    area: '6,020 sq.ft',
    client: 'Deepak',
    projectType: '4-BHK Individual Architecture',
    scope: 'Bespoke Contemporary Architecture, Millwork, Private Study & Master Suite',
    turnaround: '65 Days Turnkey',
    coverImage: '/images/projects/image4.jpg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Asymmetric architectural volumes, bespoke veneer millwork, and tailored spatial choreography.',
    description:
      'Crafted for Deepak at Saibaba Colony, Coimbatore. A 6,020 sq.ft individual home showcasing asymmetric architectural volumes, custom veneer and fluted wall panelling, a dedicated private study pod, and floor-to-ceiling dressing suites that articulate quiet luxury through material restraint.',
    highlights: [
      'Asymmetric living pavilion with floating media console and fluted wood backdrop',
      'Private study pod with concealed cable routing and sound-dampening acoustic panelling',
      'Floor-to-ceiling master dressing wardrobes with integrated soft-close Blum hardware',
      'Turnkey execution with zero post-contract cost deviations',
    ],
    specifications: [
      { label: 'Client / Home', value: 'Deepak Residence' },
      { label: 'Location', value: 'Saibaba Colony, Coimbatore' },
      { label: 'Configuration', value: '4-BHK Bespoke Residence' },
      { label: 'Carpet Area', value: '6,020 sq.ft' },
      { label: 'Woodwork', value: 'Natural Walnut Veneer with Polyurethane Matt Lacquer' },
      { label: 'Hardware', value: 'Blum Tip-On Mechanical & Blumotion Soft-Close' },
    ],
    gallery: [
      {
        url: '/images/projects/image4.jpg',
        caption: 'Primary living pavilion with floating console and acoustic fluted backdrop.',
        space: 'Living Pavilion',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/image10.jpg',
        caption: 'Dining room with bespoke credenza, chandelier accent, and courtyard vista.',
        space: 'Dining Room',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image13.jpg',
        caption: 'Private study pod and library with acoustic wall treatments.',
        space: 'Study Pod',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/image2.jpg',
        caption: 'Master suite and dressing hall with fabric-finish panel inserts.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'mr-mahesh-villa',
    slug: 'mr-mahesh-villa',
    number: '05',
    title: 'Mr. Mahesh Villa',
    category: 'Residential',
    location: 'KR Puram, Bangalore',
    city: 'Bangalore',
    year: '2023',
    area: '7,350 sq.ft',
    client: 'Mr. Mahesh – Pilot',
    projectType: '6-BHK Contemporary Villa',
    scope: 'Central Courtyard Architecture, Calacatta Slab Bathrooms, Island Kitchen & Suites',
    turnaround: '70 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential2.jpeg',
    aspectRatio: 'wide',
    gridSpan: { colSpan: 2, rowSpan: 1 },
    quote: 'Seamless courtyard transitions, Calacatta marble slab washrooms, and tailored spatial intimacy.',
    description:
      'Articulated for Mr. Mahesh – Pilot at Krishna Raja (KR) Puram, Bangalore. A 7,350 sq.ft luxury villa defined by central courtyard spatial flow, hand-finished Italian PU coatings, custom architectural joinery, and Calacatta marble slab washroom vanities that balance tropical natural ventilation with refined modern luxury.',
    highlights: [
      'Central courtyard spatial flow connecting living, dining, and outdoor terrace gardens',
      'Hand-buffed Italian PU coatings and Calacatta marble slab washroom vanities',
      'Custom fluted timber doors with concealed European magnetic locks',
      'Precision acoustic ceiling design with recessed indirect cove lighting',
    ],
    specifications: [
      { label: 'Client / Residence', value: 'Mr. Mahesh – Pilot' },
      { label: 'Location', value: 'KR Puram, Bangalore' },
      { label: 'Configuration', value: '6-BHK Contemporary Villa' },
      { label: 'Carpet Area', value: '7,350 sq.ft' },
      { label: 'Sanitary & Vanities', value: 'Bookmatched Calacatta Marble & Grohe Spa Fittings' },
      { label: 'Air Conditioning', value: 'Daikin VRV Ducted Inverter with Individual Room Zone Automation' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential2.jpeg',
        caption: 'Central courtyard and formal drawing hall with limestone floor inlays.',
        space: 'Central Drawing Hall',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Racecourse-PU-Paint/Residential6.jpeg',
        caption: 'Bespoke island kitchen with waterfall quartz counter and breakfast bar.',
        space: 'Island Kitchen',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/image1.jpg',
        caption: 'Formal salon and library nook with bespoke fluted panelling.',
        space: 'Library Nook',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image12.jpg',
        caption: 'Upper-level guest suite with integrated wardrobe cabinetry and ambient coves.',
        space: 'Guest Suite',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'serene-residence',
    slug: 'serene-residence',
    number: '06',
    title: 'Serene Minimalist Penthouse',
    category: 'Residential',
    location: 'Avinashi Road, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '4,400 sq.ft',
    client: 'Private Residence',
    projectType: 'Penthouse Interior Architecture',
    scope: 'Full Penthouse Refurbishment, Monolithic Lime Plaster, Bespoke Furniture & Lighting',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/projects/01-serene.webp',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Quiet luxury articulated through artisanal lime plaster, shadow reveal baseboards, and pure daylight.',
    description:
      'Perched high above Avinashi Road, this penthouse residence is an exercise in material restraint and quietude. Eliminating baseboards in favor of recessed architectural shadow gaps, every room flows into the next without visual interruption. Subtle variations in hand-troweled lime plaster catch shifting daylight throughout the day, creating an atmosphere of perpetual calm.',
    highlights: [
      'Artisanal hand-troweled lime plaster on all primary living and bedroom walls',
      'Concealed 15mm architectural shadow gap reveals at floor, ceiling, and door transitions',
      'Custom floating beds with integrated wireless nightstand charging and soft underglow',
      'Curved plaster archways framing courtyard and mountain vistas',
    ],
    specifications: [
      { label: 'Project Name', value: 'Serene Minimalist Penthouse' },
      { label: 'Category', value: 'Residential Penthouse Architecture' },
      { label: 'Location', value: 'Avinashi Road, Coimbatore' },
      { label: 'Carpet Area', value: '4,400 sq.ft' },
      { label: 'Wall Finishes', value: 'Natural Mineral Lime Plaster with Protective Matte Wax' },
      { label: 'Joinery', value: 'Wire-brushed Nordic Ash with Concealed J-pull Handles' },
    ],
    gallery: [
      {
        url: '/images/projects/01-serene.webp',
        caption: 'Primary living lounge showcasing seamless lime plaster surfaces and shadow reveals.',
        space: 'Living Lounge',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/image11.jpg',
        caption: 'Private dining sanctuary framed by curved plaster architectural transitions.',
        space: 'Dining Sanctuary',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/image17.jpg',
        caption: 'Master bedroom suite with floating ash bed and warm indirect cove illumination.',
        space: 'Master Suite',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'clay-house-sanctuary',
    slug: 'clay-house-sanctuary',
    number: '07',
    title: 'The Clay House Sanctuary',
    category: 'Residential',
    location: 'Perur Heritage Belt, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '5,800 sq.ft',
    client: 'Private Residence',
    projectType: 'Earthy Contemporary Villa',
    scope: 'Terracotta Architectural Screens, Exposed Brick Vaults & Bespoke Teak Joinery',
    turnaround: '80 Days Turnkey',
    coverImage: '/images/projects/05-clay-house.webp',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Earth-toned terracotta textures meet modern structural clarity and filtered tropical light.',
    description:
      'Located in the lush green foothills of Perur, The Clay House Sanctuary merges local artisanal terracotta masonry with crisp contemporary steel and glass volumes. Custom teak millwork and handmade clay tiles create an organic microclimate that stays naturally temperate year-round.',
    highlights: [
      'Handmade terracotta jali screens providing natural ventilation and soft patterned shadows',
      'Bespoke reclaimed Burma teak dining furniture crafted in-house by master joiners',
      'Cast-in-place polished terrazzo flooring with river pebble perimeter borders',
    ],
    specifications: [
      { label: 'Project Name', value: 'The Clay House Sanctuary' },
      { label: 'Location', value: 'Perur Heritage Belt, Coimbatore' },
      { label: 'Area', value: '5,800 sq.ft' },
      { label: 'Finishes', value: 'Terracotta, Exposed Brick & Reclaimed Teak' },
    ],
    gallery: [
      {
        url: '/images/projects/05-clay-house.webp',
        caption: 'Central courtyard pavilion with terracotta jali screens and filtered daylight.',
        space: 'Courtyard Pavilion',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/image7.jpg',
        caption: 'Upper terrace pavilion overlooking courtyard greenery.',
        space: 'Terrace Pavilion',
        aspectRatio: 'landscape',
      },
    ],
  },

  // ==========================================================================
  // COMMERCIAL PROJECTS (6)
  // ==========================================================================
  {
    id: 'mitjen-kr-pura-bangalore',
    slug: 'mitjen-kr-pura-bangalore',
    number: '08',
    title: 'KR Puram Commercial Studio',
    category: 'Commercial',
    location: 'KR Puram, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '8,400 sq.ft',
    client: 'Commercial Studio & Experience Center',
    projectType: 'Commercial Studio & Material Experience Center',
    scope: 'Architectural Planning, Retail Display Bays, Lighting Gallery & Client Lounge',
    turnaround: '80 Days Turnkey',
    coverImage: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial1.jpeg',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 2 },
    quote: 'An experiential retail and design pavilion celebrating material honesty and immersive spatial sequences.',
    description:
      'Located in Bangalore’s thriving KR Puram hub, this commercial experience center is organized as a curated architectural gallery. High ceilings with exposed technical tracks, polished terrazzo surfaces, and modular display cubes allow clients to interact with full-scale architectural mockups, material libraries, and tactile surface finishes in realistic lighting environments.',
    highlights: [
      'Modular display systems with integrated magnetic track spotlights',
      'Material consultation lab with daylight-calibrated color inspection fixtures',
      'Exposed structural waffle slab finished in architectural mineral wash',
      'Seamless micro-cement flooring with integrated brass transition inlays',
      'VIP client presentation pavilion with panoramic glass enclosure',
    ],
    specifications: [
      { label: 'Project Name', value: 'KR Puram Commercial Studio' },
      { label: 'Category', value: 'Commercial Experience Architecture' },
      { label: 'Location', value: 'KR Puram, Bangalore' },
      { label: 'Floor Area', value: '8,400 sq.ft' },
      { label: 'Flooring', value: 'Seamless Polished Micro-cement with Brass Inlays' },
      { label: 'Display Fixtures', value: 'Bespoke Powder-Coated Mild Steel & American White Oak' },
      { label: 'Glazing', value: '12mm Toughened Low-Iron Acoustic Glass' },
      { label: 'HVAC', value: 'Concealed VRV Ducted System with Linear Architectural Slot Diffusers' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial1.jpeg',
        caption: 'Main experience gallery showing full-scale interior mockups and display bays.',
        space: 'Experience Gallery',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial2.jpeg',
        caption: 'Atrium reception with sculptural counter and architectural light grid.',
        space: 'Entrance Atrium',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial3.jpeg',
        caption: 'Product showcase aisle featuring calibrated directional track spots.',
        space: 'Showcase Bay',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial4.jpeg',
        caption: 'Material curation library with vertical sample storage and tactile inspection table.',
        space: 'Material Library',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial5.jpeg',
        caption: 'Executive consultation lounge for bespoke residential commissions.',
        space: 'Consultation Suite',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial6.jpeg',
        caption: 'Architectural exterior threshold and street-facing glass showcase.',
        space: 'Exterior Threshold',
        aspectRatio: 'wide',
      },
    ],
  },
  {
    id: 'mitjen-commercial-display-atelier',
    slug: 'mitjen-commercial-display-atelier',
    number: '09',
    title: 'Commercial Display Atelier',
    category: 'Commercial',
    location: 'Indiranagar 100ft Road, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '5,600 sq.ft',
    client: 'Display Atelier',
    projectType: 'High-End Retail Display Suite',
    scope: 'Spatial Choreography, Fluted Partitions, Track Illumination & Custom Cabinetry',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial3.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Focused directional lighting, fluted glass divisions, and tactile surface presentation.',
    description:
      'Engineered along Bangalore’s premier retail corridor, this display atelier showcases bespoke architectural finishes and cabinetry systems. Focused directional spotlights highlight grain variations in veneer panels while fluted glass dividers provide visual privacy for consultation desks.',
    highlights: [
      'Precision track lighting with adjustable beam angles for spotlighting samples',
      'Custom fluted partitions separating display pods from client negotiation booths',
      'Engineered acoustic underlay ensuring silent foot traffic throughout the floor',
    ],
    specifications: [
      { label: 'Project Name', value: 'Commercial Display Atelier' },
      { label: 'Location', value: 'Indiranagar 100ft Road, Bangalore' },
      { label: 'Carpet Area', value: '5,600 sq.ft' },
      { label: 'Lighting', value: 'Dimmable CRI 95+ Museum Quality Spotlights' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial3.jpeg',
        caption: 'Display aisle with directional lighting and custom modular shelving.',
        space: 'Display Aisle',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial4.jpeg',
        caption: 'Material sample consultation island.',
        space: 'Consultation Island',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'architectural-material-gallery',
    slug: 'architectural-material-gallery',
    number: '10',
    title: 'Architectural Material Gallery',
    category: 'Commercial',
    location: 'Whitefield Main Road, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '6,800 sq.ft',
    client: 'Materials & Surface Collective',
    projectType: 'Architectural Sample Gallery & Showroom',
    scope: 'Material Curation Wall, Stone Display Racks & Client Lounge',
    turnaround: '65 Days Turnkey',
    coverImage: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial4.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'A library of surface textures: Italian marble slabs, engineered timber, and metallic leaf finishes.',
    description:
      'Conceived as an interactive resource library for architects and designers. Full-height vertical sliding racks hold full-scale slabs of marble, granite, and quartz, while horizontal trays feature exotic veneer leaves and PU paint color swatches under natural 5000K daylight simulation.',
    highlights: [
      'Motorized vertical slab display racks holding up to 2 tons of stone samples',
      'Daylight simulation lightboxes for authentic color accuracy matching',
      'Private bar and coffee lounge for evening architectural events',
    ],
    specifications: [
      { label: 'Project Name', value: 'Architectural Material Gallery' },
      { label: 'Location', value: 'Whitefield, Bangalore' },
      { label: 'Area', value: '6,800 sq.ft' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial4.jpeg',
        caption: 'Material curation archive and sample consultation table.',
        space: 'Material Archive',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial5.jpeg',
        caption: 'Executive consultation suite.',
        space: 'Consultation Suite',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'atelier-design-studio',
    slug: 'atelier-design-studio',
    number: '11',
    title: 'Atelier Studio & Design Gallery',
    category: 'Commercial',
    location: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '4,600 sq.ft',
    client: 'Atelier Design Group',
    projectType: 'Boutique Commercial Studio & Gallery',
    scope: 'Interior Architecture, Custom Display Fixtures, Lighting & Façade Glazing',
    turnaround: '55 Days Turnkey',
    coverImage: '/images/projects/06-atelier.webp',
    aspectRatio: 'wide',
    gridSpan: { colSpan: 2, rowSpan: 1 },
    quote: 'A sculptural retail canvas crafted with raw concrete textures, brushed brass accents, and minimalist joinery.',
    description:
      'Situated in Indiranagar, Bangalore, Atelier Studio & Design Gallery is conceived as a minimalist spatial backdrop for curated architecture, furniture, and lifestyle design. Monolithic micro-cement display plinths pair with warm American walnut shelves and custom architectural luminaires, allowing each featured object to breathe in balanced negative space.',
    highlights: [
      'Monolithic poured micro-cement display plinths with shadow reveals',
      'Bespoke architectural track system with framing projectors for pinpoint focal illumination',
      'Floor-to-ceiling acoustic pivot doors in raw black steel and fluted glass',
      'Sculptural sales counter fabricated from fluted travertine stone and brushed brass',
    ],
    specifications: [
      { label: 'Project Name', value: 'Atelier Studio & Design Gallery' },
      { label: 'Category', value: 'Boutique Commercial Architecture' },
      { label: 'Location', value: 'Indiranagar, Bangalore' },
      { label: 'Area', value: '4,600 sq.ft' },
      { label: 'Surfaces', value: 'Hand-applied Seamless Micro-cement & Roman Travertine' },
      { label: 'Metalwork', value: 'Solid Brushed Architectural Brass with Clear Oxide Protection' },
    ],
    gallery: [
      {
        url: '/images/projects/06-atelier.webp',
        caption: 'Central gallery floor with micro-cement plinths and minimalist shelving.',
        space: 'Main Gallery Floor',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial3.jpeg',
        caption: 'Product display aisle with precision directional framing projectors.',
        space: 'Exhibition Bay',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'urban-architecture-pavilion',
    slug: 'urban-architecture-pavilion',
    number: '12',
    title: 'Urban Architecture Pavilion',
    category: 'Commercial',
    location: 'Lavelle Road, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '7,100 sq.ft',
    client: 'Design Guild Bangalore',
    projectType: 'Architectural Exhibition Hall & Public Gallery',
    scope: 'Spatial Architecture, Kinetic Partitions, Lighting Design & Facade Integration',
    turnaround: '70 Days Turnkey',
    coverImage: '/images/projects/02-urban.webp',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'A dynamic cultural and architectural platform defined by modular spatial versatility and natural daylight.',
    description:
      'Situated on Lavelle Road in central Bangalore, the Urban Architecture Pavilion serves as an adaptive exhibition and lecture space for urban planning, design competitions, and architectural forums. Massive sliding timber screens allow the main volume to reconfigure instantly from a 200-seat amphitheater into three independent breakout studios.',
    highlights: [
      'Kinetic acoustic ceiling louvers that rotate to control acoustic reflection and daylight ingress',
      'Heavy-duty floor track system supporting 4-meter-tall acoustic timber partitions',
      'Integrated DMX-controlled theatrical and architectural museum lighting',
      'Direct outdoor terrace connection with water feature and amphitheater steps',
    ],
    specifications: [
      { label: 'Project Name', value: 'Urban Architecture Pavilion' },
      { label: 'Category', value: 'Commercial Exhibition Architecture' },
      { label: 'Location', value: 'Lavelle Road, Bangalore' },
      { label: 'Carpet Area', value: '7,100 sq.ft' },
      { label: 'Partitions', value: 'Kinetic Soundproof Timber Screens (STC 48)' },
    ],
    gallery: [
      {
        url: '/images/projects/02-urban.webp',
        caption: 'Main exhibition volume with acoustic timber louvers and flexible exhibition pods.',
        space: 'Exhibition Hall',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial1.jpeg',
        caption: 'Secondary gallery bay configured for architectural model presentation.',
        space: 'Model Gallery',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'metropolis-commercial-center',
    slug: 'metropolis-commercial-center',
    number: '13',
    title: 'Metropolis Design Center',
    category: 'Commercial',
    location: 'Koramangala, Bangalore',
    city: 'Bangalore',
    year: '2023',
    area: '6,200 sq.ft',
    client: 'Metropolis Retail',
    projectType: 'Lifestyle & Furnishing Showroom',
    scope: 'Facade Remodel, Mezzanine Gallery & Display Pods',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial2.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Double-height glass entrance atrium leading into warm timber mezzanine display galleries.',
    description:
      'A two-level retail environment in Koramangala designed to display premium home textiles, architectural hardware, and custom designer lighting. Slender black metal stairs link the terrazzo-tiled ground floor to a cantilevered mezzanine.',
    highlights: [
      'Floor-to-ceiling entrance glazing admitting generous northern daylight',
      'Sculptural reception desk in monolithic dark quartzite',
      'Custom linear pendant chandeliers designed exclusively for the showroom',
    ],
    specifications: [
      { label: 'Project Name', value: 'Metropolis Design Center' },
      { label: 'Location', value: 'Koramangala, Bangalore' },
      { label: 'Area', value: '6,200 sq.ft' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial2.jpeg',
        caption: 'Double-height entrance foyer and main showroom threshold.',
        space: 'Entrance Foyer',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-K.R.Pura-Bangalore/Commercial6.jpeg',
        caption: 'Exterior glass showcase facade.',
        space: 'Facade',
        aspectRatio: 'landscape',
      },
    ],
  },

  // ==========================================================================
  // CORPORATE PROJECTS (6)
  // ==========================================================================
  {
    id: 'mitjen-corporate',
    slug: 'mitjen-corporate',
    number: '14',
    title: 'Mitjen Corporate Headquarters',
    category: 'Corporate',
    location: 'Coimbatore, Tamil Nadu',
    city: 'Coimbatore',
    year: '2024',
    area: '12,500 sq.ft',
    client: 'Mitjen Group',
    projectType: 'Corporate Headquarters & Design Atelier',
    scope: 'Architectural Spatial Planning, Boardrooms, Executive Cabins & Acoustic Architecture',
    turnaround: '90 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Corporate/Corporate1.jpeg',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 2 },
    quote: 'An architectural workplace merging precision engineering, acoustic timber planes, and executive calm.',
    description:
      'The Mitjen Corporate Headquarters was designed as both a functioning command center and an architectural showcase of the studio’s material capabilities. The space balances open-format collaborative workstations with acoustic private executive suites, lined with natural oak panelling, fluted glass partitions, and calibrated glare-free architectural linear profiles.',
    highlights: [
      'Acoustic timber wall cladding with hidden service access doors',
      'Executive boardroom with integrated teleconference acoustics and magnetic smart glass',
      'Micro-perforated suspended ceiling panels with NRC rating of 0.85',
      'Bespoke reception desk in brushed architectural bronze and bookmatched Italian marble',
      'Ergonomic workstation pods with cable raceways concealed inside millwork',
    ],
    specifications: [
      { label: 'Project Name', value: 'Mitjen Corporate Headquarters' },
      { label: 'Category', value: 'Corporate Interior Architecture' },
      { label: 'Location', value: 'Coimbatore, Tamil Nadu' },
      { label: 'Scale', value: '12,500 sq.ft across 2 levels' },
      { label: 'Acoustics', value: 'Micro-perforated Oak Panelling (NRC 0.85)' },
      { label: 'Partitions', value: 'Acoustic Double-Glazed Fluted Glass with Black Anodized Aluminium' },
      { label: 'Workstations', value: 'Custom CNC Joinery with Antimicrobial Surfaces' },
      { label: 'Lighting', value: 'DALI-2 Tunable White Architectural Linear Systems' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Corporate/Corporate1.jpeg',
        caption: 'Main reception atrium featuring bookmatched stone and architectural bronze branding.',
        space: 'Reception Atrium',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate2.jpeg',
        caption: 'Open collaboration workspace with linear profile lighting and biophilic planters.',
        space: 'Collaborative Workstations',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate3.jpeg',
        caption: 'Executive boardroom featuring custom 18-seater walnut conference table and acoustic ceiling.',
        space: 'Executive Boardroom',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate4.jpeg',
        caption: 'Director’s executive suite with minimalist storage credentials and private lounge.',
        space: 'Director Suite',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate5.jpeg',
        caption: 'Informal breakout lounge engineered for creative cross-discipline workshops.',
        space: 'Breakout Lounge',
        aspectRatio: 'landscape',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate6.jpeg',
        caption: 'Architectural circulation gallery with indirect cove illumination and shadow reveal lines.',
        space: 'Central Gallery',
        aspectRatio: 'portrait',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate7.jpeg',
        caption: 'Private meeting pod with acoustic fabric backing and fluted soundproof glazing.',
        space: 'Meeting Pod',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'executive-boardroom-suite',
    slug: 'executive-boardroom-suite',
    number: '15',
    title: 'Executive Boardroom & Director Suite',
    category: 'Corporate',
    location: 'Avinashi Road, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '3,800 sq.ft',
    client: 'Mitjen Executive Wing',
    projectType: 'Executive Boardroom & Private Cabins',
    scope: 'Acoustic Wall Panels, Motorized AV System & High-Precision Millwork',
    turnaround: '45 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Corporate/Corporate3.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Understated executive gravitas articulated through walnut panelling, shadow gap detailing, and precision lighting.',
    description:
      'Dedicated to high-level strategic governance, this boardroom suite pairs acoustic smoked walnut timber cladding with seamless motorized conference presentation displays. Every microphone, power point, and cable duct is invisible, embedded flush into the central boardroom table.',
    highlights: [
      'Concealed magnetic service doors that disappear completely into the walnut panelling',
      'Dual-glazed switchable acoustic smart glass offering instant frosted privacy',
      'Automated scene-based lighting presets for video conferences, presentations, and debates',
    ],
    specifications: [
      { label: 'Project Name', value: 'Executive Boardroom & Director Suite' },
      { label: 'Location', value: 'Avinashi Road, Coimbatore' },
      { label: 'Area', value: '3,800 sq.ft' },
      { label: 'Acoustic Rating', value: 'STC 54 (Classroom & Boardroom Confidentiality)' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Corporate/Corporate3.jpeg',
        caption: 'Executive boardroom table with concealed cable routing and linear acoustic ceiling.',
        space: 'Executive Boardroom',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate4.jpeg',
        caption: 'Director cabin with tailored credenza and minimalist desk joinery.',
        space: 'Director Cabin',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'mitjen-workstation-center',
    slug: 'mitjen-workstation-center',
    number: '16',
    title: 'Mitjen Collab & Engineering Hub',
    category: 'Corporate',
    location: 'Race Course, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '7,400 sq.ft',
    client: 'Mitjen Tech Hub',
    projectType: 'High-Performance Workstation Floor',
    scope: 'Modular Workstation Layouts, Acoustic Screens & Cable Distribution',
    turnaround: '50 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Corporate/Corporate2.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Ergonomic precision, glare-free architectural linear task lighting, and collaborative agility.',
    description:
      'The engineering hub accommodates 60 architectural technicians and 3D rendering specialists in an open-format pod arrangement. Acoustic dividers clad in sound-absorbing fabric dampen keyboard and speech chatter while maintaining visual openness across the floor.',
    highlights: [
      'Modular 4-person workstation pods with integrated power raceways and wire trays',
      'Recessed linear LED troffers providing 500 lux uniform work surface illumination without glare',
      'Durable compact laminate tops resistant to scratches and heavy drawing tools',
    ],
    specifications: [
      { label: 'Project Name', value: 'Mitjen Collab & Engineering Hub' },
      { label: 'Location', value: 'Coimbatore, Tamil Nadu' },
      { label: 'Capacity', value: '60 Ergonomic Workstations' },
      { label: 'Lighting', value: '500 Lux Glare-Free (UGR < 19)' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Corporate/Corporate2.jpeg',
        caption: 'Open workstation pods with acoustic desk screens and integrated raceways.',
        space: 'Workstations',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate5.jpeg',
        caption: 'Creative breakout lounge adjacent to engineering pods.',
        space: 'Breakout Lounge',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'horizon-architectural-suite',
    slug: 'horizon-architectural-suite',
    number: '17',
    title: 'Horizon Architectural Suite',
    category: 'Corporate',
    location: 'Outer Ring Road, Bangalore',
    city: 'Bangalore',
    year: '2024',
    area: '9,800 sq.ft',
    client: 'Horizon Tech Corp',
    projectType: 'Technology Innovation Hub & Offices',
    scope: 'Agile Workplace Design, Acoustic Labs, Focus Pods & Executive Floor',
    turnaround: '65 Days Turnkey',
    coverImage: '/images/projects/04-horizon-office.webp',
    aspectRatio: 'wide',
    gridSpan: { colSpan: 2, rowSpan: 1 },
    quote: 'A serene corporate sanctuary balancing biophilic geometry, acoustic intimacy, and technical precision.',
    description:
      'Designed for an international technology firm on Bangalore’s Outer Ring Road, Horizon Architectural Suite reinterprets workplace ergonomics through the lens of architectural serenity. Acoustic baffle ceilings, warm European oak joinery, and glare-free 3000K indirect lighting create an environment optimized for deep creative focus and executive decision-making.',
    highlights: [
      'Custom acoustic ceiling baffles engineered to reduce ambient speech reverberation',
      'Private phone booths and 4-person sprint rooms with soundproof acoustic glass',
      'Executive boardroom with concealed cable management and motorized screen lifts',
      'Biophilic indoor garden pavilions integrated into central circulation spines',
    ],
    specifications: [
      { label: 'Project Name', value: 'Horizon Architectural Suite' },
      { label: 'Category', value: 'Corporate Technology Workplace' },
      { label: 'Location', value: 'Outer Ring Road, Bangalore' },
      { label: 'Carpet Area', value: '9,800 sq.ft' },
      { label: 'Acoustics', value: 'Ecophon Baffle Arrays (NRC 0.90)' },
      { label: 'Joinery', value: 'FSC-Certified Smoked White Oak with Natural Matte Wax Finish' },
    ],
    gallery: [
      {
        url: '/images/projects/04-horizon-office.webp',
        caption: 'Main executive work lounge with acoustic baffles and custom oak tables.',
        space: 'Executive Work Lounge',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate3.jpeg',
        caption: 'Horizon executive boardroom with integrated AV and fluted wood panelling.',
        space: 'Boardroom',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'oak-loft-offices',
    slug: 'oak-loft-offices',
    number: '18',
    title: 'Oak Loft Executive Offices',
    category: 'Corporate',
    location: 'R.S. Puram, Coimbatore',
    city: 'Coimbatore',
    year: '2024',
    area: '6,200 sq.ft',
    client: 'Apex Capital Advisors',
    projectType: 'Executive Advisory & Private Client Offices',
    scope: 'Turnkey Interior Architecture, Acoustic Partitions, Private Boardroom & Library',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/projects/03-oak-loft.webp',
    aspectRatio: 'portrait',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Timeless oak woodwork, tailored acoustic envelopes, and understated executive gravitas.',
    description:
      'Engineered for Apex Capital Advisors in R.S. Puram, Coimbatore. Oak Loft combines warm natural oak joinery with bronze metal highlights and acoustic felt wall panelling, providing an atmosphere of high confidential security, quiet focus, and understated prestige for private wealth consultations.',
    highlights: [
      'Full-height acoustic timber panelling with concealed acoustic insulation (STC 52)',
      'Custom 14-seater walnut conference table with wireless inductive charging concealed beneath veneer',
      'Private library lounge with integrated fireplace mantle and soft leather armchairs',
      'Circadian lighting system adjusting color temperature from 4000K daylight to 2700K evening warmth',
    ],
    specifications: [
      { label: 'Project Name', value: 'Oak Loft Executive Offices' },
      { label: 'Category', value: 'Corporate Financial Architecture' },
      { label: 'Location', value: 'R.S. Puram, Coimbatore' },
      { label: 'Area', value: '6,200 sq.ft' },
      { label: 'Acoustic Partitioning', value: 'Sound Transmission Class STC 52 Rated Panelling' },
      { label: 'Joinery Woods', value: 'Hand-selected European White Oak & American Walnut' },
    ],
    gallery: [
      {
        url: '/images/projects/03-oak-loft.webp',
        caption: 'Executive consultation room featuring natural oak millwork and concealed acoustic backings.',
        space: 'Advisory Suite',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate7.jpeg',
        caption: 'Private advisory pod with fluted glass privacy screens.',
        space: 'Private Pod',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'vanguard-financial-offices',
    slug: 'vanguard-financial-offices',
    number: '19',
    title: 'Vanguard Headquarters & Vault',
    category: 'Corporate',
    location: 'Trichy Road, Coimbatore',
    city: 'Coimbatore',
    year: '2023',
    area: '8,900 sq.ft',
    client: 'Vanguard Investments',
    projectType: 'Financial Headquarters & Client Suites',
    scope: 'Secure Client Wing, Private Vault Suites & Architectural Millwork',
    turnaround: '70 Days Turnkey',
    coverImage: '/images/projects/Mitjen-Corporate/Corporate7.jpeg',
    aspectRatio: 'landscape',
    gridSpan: { colSpan: 1, rowSpan: 1 },
    quote: 'Soundproof privacy pods, biometric architectural security, and timeless executive detailing.',
    description:
      'Engineered for a private investment consortium on Trichy Road, this corporate suite blends high security with warm, welcoming hospitality. Individual advisory pods are soundproofed to STC 55 with double-sealed acoustic doors and concealed mechanical locks.',
    highlights: [
      'Soundproof advisory pods tested to STC 55 acoustic ratings',
      'Concealed biometric fingerprint door access built flush into architectural wood panelling',
      'Tailored beverage bar in fluted bronze metal and Italian Arabescato marble',
    ],
    specifications: [
      { label: 'Project Name', value: 'Vanguard Headquarters & Vault' },
      { label: 'Location', value: 'Trichy Road, Coimbatore' },
      { label: 'Carpet Area', value: '8,900 sq.ft' },
    ],
    gallery: [
      {
        url: '/images/projects/Mitjen-Corporate/Corporate7.jpeg',
        caption: 'Private confidential consultation pod with fluted acoustic glass.',
        space: 'Consultation Pod',
        aspectRatio: 'wide',
      },
      {
        url: '/images/projects/Mitjen-Corporate/Corporate6.jpeg',
        caption: 'Corridor gallery with indirect cove illumination.',
        space: 'Gallery',
        aspectRatio: 'portrait',
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
