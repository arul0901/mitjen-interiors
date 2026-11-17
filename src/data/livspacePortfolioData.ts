/**
 * Mitjen Interior Design Portfolio Data Layer
 * Strict adherence to authentic client project specifications, locations, and photography.
 * Zero mock data / zero invented builder developments.
 */

export interface PortfolioProject {
  id: string;
  title: string;
  client?: string;
  society: string;
  location: string;
  city: 'Coimbatore' | 'Bangalore';
  fullAddress: string;
  type: 'Delivered' | 'Upcoming';
  bhk: '3-BHK' | '4-BHK' | '6-BHK / Villa';
  carpetArea: string;
  scopeTags: string[];
  style: string;
  budgetBracket: string;
  turnaround: string;
  coverImage: string;
  galleryImages: { url: string; room: string; caption: string }[];
  description: string;
  highlights: string[];
  specifications: { label: string; value: string }[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-prithvi',
    title: 'Prithvi',
    client: 'Prithvi',
    society: 'Royal Nesto',
    location: 'Neelambur',
    city: 'Coimbatore',
    fullAddress: 'Royal Nesto, Neelambur, Coimbatore',
    type: 'Delivered',
    bhk: '3-BHK',
    carpetArea: '3,520 sq.ft',
    scopeTags: ['Full Home', 'Living Room', 'Dining Area', 'Master Bedroom', 'Kitchen'],
    style: 'Contemporary Architectural Luxury',
    budgetBracket: '₹18L – ₹24L',
    turnaround: '60 Days Turnkey',
    coverImage: '/images/Residential/Residential1.jpeg',
    galleryImages: [
      {
        url: '/images/Residential/Residential1.jpeg',
        room: 'Formal Living',
        caption: 'Triple-height living salon with hand-buffed Italian PU wall panelling & bespoke fluted joinery.',
      },
      {
        url: '/images/Residential/Residential4.jpeg',
        room: 'Dining & Formal Lounge',
        caption: 'Seamless open-plan dining space with warm ambient cove lighting and tailored timber credenza.',
      },
      {
        url: '/assets/images/projects/image5.jpg',
        room: 'Master Bedroom Suite',
        caption: 'Custom fluted headboard panelling with integrated warm sensor illumination and acoustic backing.',
      },
      {
        url: '/assets/images/projects/image8.jpg',
        room: 'Modular Kitchen',
        caption: 'High-gloss acrylic modular kitchen with quartz countertop and concealed handle profiles.',
      },
    ],
    description:
      'Articulated for Prithvi at Royal Nesto, Neelambur, Coimbatore. Features an expansive open-format living salon, custom fluted millwork, multi-layer Italian PU coatings, and bespoke ceiling planes with ambient magnetic track lighting.',
    highlights: [
      'Multi-layer Italian PU coating on all bespoke architectural millwork',
      'Engineered BWP marine-grade plywood carcass with 10-year durability warranty',
      'Concealed soft-close Blum hardware and magnetic touch latches',
      'Architectural lighting coordination with scene dimmer automation',
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
    title: 'Sampath',
    client: 'Sampath',
    society: 'Nehru Nagar West.',
    location: 'Kalapatti',
    city: 'Coimbatore',
    fullAddress: 'Nehru Nagar West., Kalapatti, Coimbatore',
    type: 'Delivered',
    bhk: '6-BHK / Villa',
    carpetArea: '8,060 sq.ft',
    scopeTags: ['Full Home', 'Living Room', 'Villa Staircase', 'Master Bedroom', 'Dining Area', 'Kitchen'],
    style: 'Grand Modern Villa Architecture',
    budgetBracket: '₹35L – ₹48L',
    turnaround: '75 Days Turnkey',
    coverImage: '/images/Residential/Residential7.jpeg',
    galleryImages: [
      {
        url: '/images/Residential/Residential7.jpeg',
        room: 'Double-Height Living Salon',
        caption: 'Double-height grand living hall with acoustic false ceiling and floor-to-ceiling fenestrations.',
      },
      {
        url: '/images/Residential/Residential3.jpeg',
        room: 'Architectural Staircase & Gallery',
        caption: 'Vertical circulation gallery with sculptural glass balustrades and integrated step illumination.',
      },
      {
        url: '/images/Residential/Residential5.jpeg',
        room: 'Master Bedroom Suite',
        caption: 'Expansive private suite with bespoke wardrobe joinery, dressing area, and soft neutral textures.',
      },
      {
        url: '/assets/images/projects/image14.jpg',
        room: 'Dining & Family Lounge',
        caption: 'Open family dining salon connected directly to the outdoor landscaped courtyard.',
      },
    ],
    description:
      'Engineered for Sampath at Nehru Nagar West, Kalapatti, Coimbatore. An 8,060 sq.ft grand residential villa featuring double-volume living spaces, an architectural glass staircase, custom stone vanities, and a high-efficiency modular kitchen.',
    highlights: [
      'Double-height living salon with acoustic false ceiling integration',
      'Architectural staircase gallery with sculptural glass and step lighting',
      'Ergonomic modular kitchen with soft-close tandem drawers and quartz waterfall island',
      '10-Year Comprehensive Warranty and factory-direct CNC modular joinery',
    ],
    specifications: [
      { label: 'Project / Space', value: 'Sampath' },
      { label: 'Client', value: 'Sampath' },
      { label: 'City', value: 'Coimbatore' },
      { label: 'Area / Locality', value: 'Kalapatti' },
      { label: 'Full Address', value: 'Nehru Nagar West.' },
      { label: 'Configuration', value: '6BHK / Villa' },
      { label: 'Project Area', value: '8,060 sq.ft' },
    ],
  },
  {
    id: 'project-mr-mahesh-pilot',
    title: 'Mr. Mahesh – Pilot',
    client: 'Mr. Mahesh – Pilot',
    society: 'Krishna Raja (KR) Puram',
    location: 'Bangalore',
    city: 'Bangalore',
    fullAddress: 'Krishna Raja (KR) Puram, Bangalore',
    type: 'Delivered',
    bhk: '6-BHK / Villa',
    carpetArea: '7,350 sq.ft',
    scopeTags: ['Full Home', 'Drawing Hall', 'Island Kitchen', 'Master Bedroom', 'Guest Suite'],
    style: 'Contemporary Luxury Villa',
    budgetBracket: '₹32L – ₹45L',
    turnaround: '70 Days Turnkey',
    coverImage: '/images/Residential/Residential2.jpeg',
    galleryImages: [
      {
        url: '/images/Residential/Residential2.jpeg',
        room: 'Central Courtyard & Formal Drawing Hall',
        caption: 'Expansive formal salon with tailored spatial transitions, recessed cove lighting, and stone flooring.',
      },
      {
        url: '/images/Residential/Residential6.jpeg',
        room: 'Bespoke Island Kitchen',
        caption: 'Gourmet island kitchen featuring quartz countertops, waterfall island edge, and tandem pull-out pantries.',
      },
      {
        url: '/assets/images/projects/image1.jpg',
        room: 'Formal Salon & Library Nook',
        caption: 'Warm architectural woodwork, fluted timber wall panelling, and integrated library display shelving.',
      },
      {
        url: '/assets/images/projects/image12.jpg',
        room: 'Upper Guest Suite',
        caption: 'Minimalist upper-level bedroom suite with tailored wardrobe joinery and soft neutral palette.',
      },
    ],
    description:
      'Articulated for Mr. Mahesh – Pilot at Krishna Raja (KR) Puram, Bangalore. A 7,350 sq.ft luxury villa defined by central courtyard spatial flow, hand-finished Italian PU coatings, custom architectural joinery, and Calacatta marble slab washroom vanities.',
    highlights: [
      'Central courtyard spatial flow connecting living, dining, and outdoor terrace',
      'Hand-buffed Italian PU coatings and Calacatta marble slab washroom vanities',
      'Custom fluted timber doors with concealed European magnetic locks',
      'Precision acoustic ceiling design with recessed indirect cove lighting',
    ],
    specifications: [
      { label: 'Project / Space', value: 'Mr. Mahesh – Pilot' },
      { label: 'Client', value: 'Mr. Mahesh – Pilot' },
      { label: 'City', value: 'Bangalore' },
      { label: 'Area / Locality', value: 'Bangalore' },
      { label: 'Full Address', value: 'Krishna Raja (KR) Puram' },
      { label: 'Configuration', value: '6BHK / Villa' },
      { label: 'Project Area', value: '7,350 sq.ft' },
    ],
  },
  {
    id: 'project-deepak',
    title: 'Deepak',
    client: 'Deepak',
    society: 'Saibaba Colony',
    location: 'Saibaba Colony',
    city: 'Coimbatore',
    fullAddress: 'Saibaba Colony, Coimbatore',
    type: 'Delivered',
    bhk: '4-BHK',
    carpetArea: '6,020 sq.ft',
    scopeTags: ['Full Home', 'Living Pavilion', 'Dining Room', 'Private Study', 'Master Suite'],
    style: 'Bespoke Contemporary Architecture',
    budgetBracket: '₹28L – ₹38L',
    turnaround: '65 Days Turnkey',
    coverImage: '/assets/images/projects/image4.jpg',
    galleryImages: [
      {
        url: '/assets/images/projects/image4.jpg',
        room: 'Primary Living Pavilion & Bespoke Joinery',
        caption: 'Contemporary living pavilion with custom floating media console, fluted wood backdrop, and acoustic ceiling planes.',
      },
      {
        url: '/assets/images/projects/image10.jpg',
        room: 'Dining Room & Ambient Illumination',
        caption: 'Sophisticated dining zone with tailored credenza, warm chandelier accent, and panoramic courtyard vista.',
      },
      {
        url: '/assets/images/projects/image13.jpg',
        room: 'Private Study & Lounge',
        caption: 'Acoustic-treated home workspace with custom bookshelf joinery and ergonomic storage.',
      },
      {
        url: '/assets/images/projects/image2.jpg',
        room: 'Master Suite & Dressing Hall',
        caption: 'Full-height custom wardrobes with fabric-finish panel inserts and warm sensor LED lights.',
      },
    ],
    description:
      'Crafted for Deepak at Saibaba Colony, Coimbatore. A 6,020 sq.ft individual home showcasing asymmetric architectural volumes, custom veneer and fluted wall panelling, dedicated private study pod, and floor-to-ceiling dressing suites.',
    highlights: [
      'Asymmetric architectural volume with custom veneer and fluted wall panelling',
      'Dedicated private study pod with concealed cable routing and sound-dampening panels',
      'Floor-to-ceiling master dressing wardrobes with integrated soft-close Blum hardware',
      'Turnkey execution with zero post-contract cost deviations',
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

export interface MaterialCategory {
  id: string;
  number: string;
  areaElement: string;
  title: string;
  subtitle: string;
  materials: string[];
  brandFinishDetails: string[];
  brands: string[];
  note?: string;
}

export const MATERIAL_SPECIFICATIONS: MaterialCategory[] = [
  {
    id: 'mat-flooring',
    number: '01',
    areaElement: 'Flooring',
    title: 'Flooring',
    subtitle: 'Surface tactility, acoustics & structural durability',
    materials: ['Wooden', 'Floor Carpet', 'Vinyl Flooring'],
    brandFinishDetails: [
      'Vinyl – Duracare, Armstrong',
      'Wooden – Tarkett, Armstrong',
    ],
    brands: ['Duracare', 'Armstrong', 'Tarkett'],
    note: 'Premium vinyl resilient flooring and engineered wooden planks.',
  },
  {
    id: 'mat-walls',
    number: '02',
    areaElement: 'Walls / Paint / Wallpaper',
    title: 'Walls / Paint / Wallpaper',
    subtitle: 'Spatial division, acoustic dampening & architectural envelope',
    materials: ['Wall Panel', 'Gypsum Panel', 'Aluminum Partition'],
    brandFinishDetails: [
      'Plywood – Green ply, Kit ply, Century ply',
      'Gypsum – Saint Gobain, Armstrong',
    ],
    brands: ['Greenply', 'Kitply', 'Century Ply', 'Saint-Gobain', 'Armstrong'],
    note: 'Precision gypsum drywalls, architectural veneered panels, and aluminium partitions.',
  },
  {
    id: 'mat-ceiling',
    number: '03',
    areaElement: 'Ceiling',
    title: 'Ceiling',
    subtitle: 'Concealed services, acoustic planes & vertical rhythm',
    materials: ['Vox', 'Gypsum', 'Metal', 'PVC Fluted Panel Ceiling'],
    brandFinishDetails: [
      'Saint Gobain, Armstrong',
    ],
    brands: ['Saint-Gobain', 'Armstrong', 'VOX'],
    note: 'Seamless acoustic gypsum suspended ceilings, metal grids, and PVC fluted panel ceiling systems.',
  },
  {
    id: 'mat-furniture',
    number: '04',
    areaElement: 'Furniture / Woodwork',
    title: 'Furniture / Woodwork',
    subtitle: 'Custom cabinetry, tactile veneers & millwork precision',
    materials: ['Plywood', 'Laminate', 'High Glossy', 'Acrylic'],
    brandFinishDetails: [
      'Plywood – Green ply, Kit ply, Century ply',
      'Laminate – IVAS, Kridha, Century, Advance',
    ],
    brands: ['Greenply', 'Kitply', 'Century Ply', 'IVAS', 'Kridha', 'Century', 'Advance'],
    note: 'BWP marine-grade plywood, acrylic shutters, high-gloss finishes, and post-formed laminates.',
  },
  {
    id: 'mat-lighting',
    number: '05',
    areaElement: 'Lighting',
    title: 'Lighting',
    subtitle: 'Sculptural layers, photometric warmth & architectural accent',
    materials: ['Wall Mounted', 'Concealed', 'Spot', 'Hanging', 'LED Strip Light'],
    brandFinishDetails: [
      'Elite, Havells, Philips, Legrand & Orient etc.',
    ],
    brands: ['Elite', 'Havells', 'Philips', 'Legrand', 'Orient'],
    note: 'High-CRI architectural lighting, concealed coves, profile LED strips, and decorative hanging fixtures.',
  },
];

export interface BudgetTier {
  id: string;
  name: string;
  badge: string;
  priceStarting: string;
  recommendedFor: string;
  features: string[];
  timeline: string;
  warranty: string;
  isPopular?: boolean;
}

export const BUDGET_TIERS: BudgetTier[] = [
  {
    id: 'essential',
    name: 'Essential / Value Interiors',
    badge: 'SMART VALUE',
    priceStarting: '₹4.5 Lakhs*',
    recommendedFor: 'Functional, durable modular execution for apartments and compact residential homes.',
    features: [
      'Modular Kitchen with scratch-resistant laminate & soft-close hinges',
      'Full-height hinged or sliding wardrobes in master & guest bedrooms',
      'Perimeter false ceiling (Saint-Gobain gypsum) with warm LED downlights',
      'Custom TV console unit with concealed cable management conduits',
      'Choice of 40+ curated anti-fingerprint textures & finishes',
    ],
    timeline: '35–45 Days Move-In Guarantee',
    warranty: '5-Year Comprehensive Warranty',
  },
  {
    id: 'premium',
    name: 'Premium / Full Home Interiors',
    badge: 'MOST POPULAR',
    priceStarting: '₹9.5 Lakhs*',
    recommendedFor: 'Complete residences demanding high-end aesthetics, customized fluted joinery, and durable luxury.',
    features: [
      'Full home interior covering Living, Kitchen, Dining & all Bedrooms',
      'Premium acrylic or PU matte modular kitchen with quartz countertop',
      'Master walk-in wardrobe with fabric/glass detailing & sensor illumination',
      'Custom designer false ceiling with dual cove lighting layers (VOX / Gypsum)',
      'Statement TV wall paneling with acoustic fluted slats (Greenply / Century Ply)',
      'Dedicated pooja sanctuary with laser-cut brass and teakwood jali',
    ],
    timeline: '45 Days Move-In Guarantee',
    warranty: '10-Year Flat Warranty',
    isPopular: true,
  },
  {
    id: 'luxe',
    name: 'Luxe / Bespoke Architectural',
    badge: 'ARCHITECTURAL BESPOKE',
    priceStarting: '₹18 Lakhs*',
    recommendedFor: 'Villas, duplexes, and luxury residential estates demanding tailored master craftsmanship.',
    features: [
      'End-to-end bespoke turnkey architectural execution',
      'Hand-buffed Italian PU coatings & natural wood veneer wall paneling',
      'Gourmet island kitchen with waterfall quartz edges & built-in tandem pantries',
      'Custom fluted timber doors with concealed European magnetic locks',
      'Architectural lighting coordination (Havells, Philips, Legrand scene control)',
      'Luxury stone & natural Italian Calacatta marble washroom vanities',
    ],
    timeline: '60–75 Days Turnkey Execution',
    warranty: '10-Year Warranty + Lifetime Support',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const PORTFOLIO_FAQS: FAQItem[] = [
  {
    question: '1. What is the Mitjen Interior Design Portfolio?',
    answer:
      'The Mitjen Interior Design Portfolio showcases authentic completed and proposed residential projects designed and executed by our studio in Coimbatore and Bangalore. It features verified client commissions such as Prithvi (Neelambur, Coimbatore), Sampath (Kalapatti, Coimbatore), Mr. Mahesh – Pilot (Krishna Raja Puram, Bangalore), and Deepak (Saibaba Colony, Coimbatore).',
  },
  {
    question: '2. What are the main sections of the Portfolio?',
    answer:
      'The Portfolio is divided into two primary sections: "Delivered Projects" (real, finished homes photographed post-handover, documenting live craftsmanship and move-in quality) and "Upcoming Properties" (concept designs, 3D visualizations, and customized architectural expansions in Coimbatore and Bangalore).',
  },
  {
    question: '3. Can I use these projects for design inspiration and customize them for my home?',
    answer:
      'Yes, absolutely. If you admire a specific layout, Italian PU wall panelling, island kitchen design, or ceiling detail from our delivered residences, our senior interior architects will adapt and tailor the design to your exact floor plan, lifestyle preferences, and budget.',
  },
  {
    question: '4. What materials and brands do you use in your projects?',
    answer:
      'We exclusively work with verified industry-leading material partners: Greenply, Kitply, and Century Ply for BWP marine-grade plywood and woodwork; Saint-Gobain and Armstrong for gypsum and ceiling systems; VOX for PVC fluted panels; Duracare, Tarkett, and Armstrong for wooden, floor carpet, and vinyl flooring; IVAS, Kridha, Century, and Advance for laminates; and Elite, Philips, Havells, Legrand, and Orient for architectural lighting.',
  },
  {
    question: '5. How do you ensure quality and what warranties are offered?',
    answer:
      'All modular components are precision-cut using German CNC machinery with zero manual edge chipping. We use boiling-water-proof (BWP) marine-grade plywood and high-tensile hardware from Blum and Hafele. Every delivered project comes with our flat 10-Year Comprehensive Warranty and a 45-day move-in guarantee.',
  },
  {
    question: '6. What is the typical completion timeline?',
    answer:
      'We offer a 45-day move-in guarantee for modular solutions (kitchens, wardrobes, storage) upon design sign-off. Full turnkey residential villas and apartments with civil modifications, false ceilings, and Italian PU coatings are typically handed over in 60 to 75 days.',
  },
  {
    question: '7. How do I get started with a consultation for my home?',
    answer:
      'Click "Get Free Quote" or "Get This Design" on any project card. You can share your floor plan or meet an interior designer at our studio in Coimbatore or Bangalore for a personalized 3D walkthrough and free transparent budget estimate.',
  },
  {
    question: '8. Where can I visit physical experience centers to touch and inspect materials?',
    answer:
      'We welcome you to our experience centers and project sites in Coimbatore and Bangalore. You can inspect live modular kitchen displays, touch Italian PU finishes, test soft-close drawer mechanisms, and examine material swatches from Greenply, Saint-Gobain, and Blum in person.',
  },
];
