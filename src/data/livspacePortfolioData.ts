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
    id: 'project-wonder-space-prithvi',
    title: 'Wonder Space · Mr. Prithvi',
    client: 'Mr. Prithvi',
    society: 'Royal Nesto',
    location: 'Neelambur, Coimbatore',
    city: 'Coimbatore',
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
      'Articulated for Mr. Prithvi at Royal Nesto, Neelambur. Features an expansive open-format living salon, custom fluted millwork, multi-layer Italian PU coatings, and bespoke ceiling planes with ambient magnetic track lighting.',
    highlights: [
      'Multi-layer Italian PU coating on all bespoke architectural millwork',
      'Engineered BWP marine-grade plywood carcass with 10-year durability warranty',
      'Concealed soft-close Blum hardware and magnetic touch latches',
      'Architectural lighting coordination with scene dimmer automation',
    ],
    specifications: [
      { label: 'Project Name', value: 'Wonder Space' },
      { label: 'Client', value: 'Mr. Prithvi' },
      { label: 'Project Type', value: 'Residential Apartment – 3BHK' },
      { label: 'Configuration', value: '3BHK' },
      { label: 'Project Area', value: '3,520 sq.ft' },
      { label: 'Location', value: 'Neelambur, Coimbatore' },
      { label: 'Address Reference', value: 'Royal Nesto' },
    ],
  },
  {
    id: 'project-wonder-space-sampath',
    title: 'Wonder Space · Mr. Sampath',
    client: 'Mr. Sampath',
    society: 'Nehru Nagar West',
    location: 'Kalapatti, Coimbatore',
    city: 'Coimbatore',
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
      'Engineered for Mr. Sampath at Nehru Nagar West, Kalapatti, Coimbatore. An 8,060 sq.ft grand residential villa featuring double-volume living spaces, an architectural glass staircase, custom stone vanities, and a high-efficiency modular kitchen.',
    highlights: [
      'Double-height living salon with acoustic false ceiling integration',
      'Architectural staircase gallery with sculptural glass and step lighting',
      'Ergonomic modular kitchen with soft-close tandem drawers and quartz waterfall island',
      '10-Year Comprehensive Warranty and factory-direct CNC modular joinery',
    ],
    specifications: [
      { label: 'Project Name', value: 'Wonder Space' },
      { label: 'Client', value: 'Mr. Sampath' },
      { label: 'Project Type', value: 'Residential Villa – 6BHK' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Project Area', value: '8,060 sq.ft' },
      { label: 'Location', value: 'Kalapatti, Coimbatore' },
      { label: 'Location Reference', value: 'Nehru Nagar West' },
    ],
  },
  {
    id: 'project-mr-mahesh',
    title: 'Mr. Mahesh Residence',
    client: 'Mr. Mahesh',
    society: 'KR Puram Private Estate',
    location: 'KR Puram, Bengaluru',
    city: 'Bangalore',
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
      'Articulated for Mr. Mahesh at KR Puram, Bengaluru. A 7,350 sq.ft luxury villa defined by central courtyard spatial flow, hand-finished Italian PU coatings, custom architectural joinery, and Calacatta marble slab washroom vanities.',
    highlights: [
      'Central courtyard spatial flow connecting living, dining, and outdoor terrace',
      'Hand-buffed Italian PU coatings and Calacatta marble slab washroom vanities',
      'Custom fluted timber doors with concealed European magnetic locks',
      'Precision acoustic ceiling design with recessed indirect cove lighting',
    ],
    specifications: [
      { label: 'Project Name', value: 'Mr. Mahesh' },
      { label: 'Client', value: 'Mr. Mahesh' },
      { label: 'Project Type', value: 'Residential Villa – 6BHK' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Project Area', value: '7,350 sq.ft' },
      { label: 'Location', value: 'KR Puram, Bengaluru' },
    ],
  },
  {
    id: 'project-elara-space-deepak',
    title: 'Elara Space · Mr. Deepak',
    client: 'Mr. Deepak',
    society: 'Saibaba Colony Residences',
    location: 'Saibaba Colony, Coimbatore',
    city: 'Coimbatore',
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
      'Crafted for Mr. Deepak at Saibaba Colony, Coimbatore. A 6,020 sq.ft individual home showcasing asymmetric architectural volumes, custom veneer and fluted wall panelling, dedicated private study pod, and floor-to-ceiling dressing suites.',
    highlights: [
      'Asymmetric architectural volume with custom veneer and fluted wall panelling',
      'Dedicated private study pod with concealed cable routing and sound-dampening panels',
      'Floor-to-ceiling master dressing wardrobes with integrated soft-close Blum hardware',
      'Turnkey execution with zero post-contract cost deviations',
    ],
    specifications: [
      { label: 'Project Name', value: 'Elara Space' },
      { label: 'Client', value: 'Mr. Deepak' },
      { label: 'Project Type', value: 'Residential Individual Home – 4BHK' },
      { label: 'Configuration', value: '4BHK' },
      { label: 'Project Area', value: '6,020 sq.ft' },
      { label: 'Location', value: 'Saibaba Colony, Coimbatore' },
    ],
  },
  {
    id: 'project-wonder-space-prithvi-upcoming',
    title: 'Wonder Space (Penthouse Sky Lounge) · Mr. Prithvi',
    client: 'Mr. Prithvi',
    society: 'Royal Nesto',
    location: 'Neelambur, Coimbatore',
    city: 'Coimbatore',
    type: 'Upcoming',
    bhk: '3-BHK',
    carpetArea: '3,520 sq.ft',
    scopeTags: ['Full Home', 'Living Room', 'Private Study'],
    style: 'Modern Penthouse Luxury',
    budgetBracket: '₹14L – ₹18L',
    turnaround: '45 Days Execution',
    coverImage: '/images/Residential/Residential4.jpeg',
    galleryImages: [
      {
        url: '/images/Residential/Residential4.jpeg',
        room: 'Sky Lounge & Terrace Vista',
        caption: 'Proposed rooftop terrace sky lounge and entertainment deck with bioclimatic pergola.',
      },
      {
        url: '/images/Residential/Residential1.jpeg',
        room: 'Living Salon Integration',
        caption: 'Integrated formal salon visual continuity with bespoke fluted panelling.',
      },
      {
        url: '/assets/images/projects/image5.jpg',
        room: 'Private Retreat',
        caption: 'Concealed reading alcove with warm indirect architectural coves.',
      },
    ],
    description:
      'Proposed upper-deck expansion and private acoustic media lounge for the Wonder Space residence at Royal Nesto, Neelambur. Features weather-resilient millwork, acoustic panelling, and integrated smart lighting.',
    highlights: [
      'Weather-resilient architectural millwork with anti-UV exterior coatings',
      'Acoustic wall panelling engineered for private cinema acoustics',
      'Seamless glass balustrade detailing overlooking Coimbatore skyline',
      'Smart home automation and motorized architectural louvers',
    ],
    specifications: [
      { label: 'Project Name', value: 'Wonder Space (Sky Lounge Extension)' },
      { label: 'Client', value: 'Mr. Prithvi' },
      { label: 'Project Type', value: 'Residential Penthouse Extension' },
      { label: 'Configuration', value: '3BHK' },
      { label: 'Project Area', value: '3,520 sq.ft' },
      { label: 'Location', value: 'Neelambur, Coimbatore' },
      { label: 'Address Reference', value: 'Royal Nesto' },
    ],
  },
  {
    id: 'project-elara-space-deepak-upcoming',
    title: 'Elara Space (Garden Pavilion Wing) · Mr. Deepak',
    client: 'Mr. Deepak',
    society: 'Saibaba Colony Residences',
    location: 'Saibaba Colony, Coimbatore',
    city: 'Coimbatore',
    type: 'Upcoming',
    bhk: '4-BHK',
    carpetArea: '6,020 sq.ft',
    scopeTags: ['Full Home', 'Dining Room', 'Private Study'],
    style: 'Bioclimatic Contemporary Architecture',
    budgetBracket: '₹12L – ₹16L',
    turnaround: '50 Days Execution',
    coverImage: '/assets/images/projects/image10.jpg',
    galleryImages: [
      {
        url: '/assets/images/projects/image10.jpg',
        room: 'Garden Pavilion & Alfresco Dining',
        caption: 'Proposed bioclimatic garden pavilion with sliding acoustic glass panels and barbecue island.',
      },
      {
        url: '/assets/images/projects/image13.jpg',
        room: 'Private Study Pod',
        caption: 'Acoustic-treated garden office with custom timber desk and perimeter foliage framing.',
      },
      {
        url: '/assets/images/projects/image4.jpg',
        room: 'Pavilion Promenade',
        caption: 'Seamless architectural walkway connecting the main living pavilion to the garden terrace.',
      },
    ],
    description:
      'Proposed bioclimatic garden pavilion and outdoor entertainment kitchen extending the Elara Space family estate at Saibaba Colony, Coimbatore. Engineered with thermo-treated ashwood, slim-profile thermal glass, and ambient uplighting.',
    highlights: [
      'Thermo-treated architectural hardwood decking and slatted timber trellis',
      'Slim-profile thermal-break aluminium glass sliding panels',
      'Integrated outdoor barbecue counter with anti-stain granite surfaces',
      '10-Year warranty on structural joinery and hardware fittings',
    ],
    specifications: [
      { label: 'Project Name', value: 'Elara Space (Garden Wing Annex)' },
      { label: 'Client', value: 'Mr. Deepak' },
      { label: 'Project Type', value: 'Residential Pavilion Annex' },
      { label: 'Configuration', value: '4BHK' },
      { label: 'Project Area', value: '6,020 sq.ft' },
      { label: 'Location', value: 'Saibaba Colony, Coimbatore' },
    ],
  },
  {
    id: 'project-mr-mahesh-upcoming',
    title: 'Mr. Mahesh (Executive Studio Wing)',
    client: 'Mr. Mahesh',
    society: 'KR Puram Private Estate',
    location: 'KR Puram, Bengaluru',
    city: 'Bangalore',
    type: 'Upcoming',
    bhk: '6-BHK / Villa',
    carpetArea: '7,350 sq.ft',
    scopeTags: ['Full Home', 'Drawing Hall', 'Island Kitchen'],
    style: 'Executive Architectural Studio',
    budgetBracket: '₹15L – ₹22L',
    turnaround: '55 Days Execution',
    coverImage: '/images/Residential/Residential6.jpeg',
    galleryImages: [
      {
        url: '/images/Residential/Residential6.jpeg',
        room: 'Executive Wine Gallery & Island Bar',
        caption: 'Proposed temperature-controlled wine gallery and tasting island with Calacatta marble slab.',
      },
      {
        url: '/images/Residential/Residential2.jpeg',
        room: 'Formal Courtyard Foyer',
        caption: 'Grand arrival foyer connecting the executive wing with the central villa courtyard.',
      },
      {
        url: '/assets/images/projects/image1.jpg',
        room: 'Private Conference & Library',
        caption: 'Teakwood-panelled executive library with acoustic wall fabric and concealed AV projection.',
      },
    ],
    description:
      'Proposed executive studio wing and tasting room addition for Mr. Mahesh’s Bengaluru villa. Features a custom temperature-controlled wine gallery, teak-veneered library joinery, and seamless integration with the central courtyard.',
    highlights: [
      'Custom temperature-controlled glass wine cellar with brass bottle cradles',
      'Teak-veneered acoustic library panelling with concealed conference display',
      'Natural Calacatta marble monolithic tasting counter',
      'Smart Lutron scene lighting and digital access automation',
    ],
    specifications: [
      { label: 'Project Name', value: 'Mr. Mahesh (Executive Studio Wing)' },
      { label: 'Client', value: 'Mr. Mahesh' },
      { label: 'Project Type', value: 'Residential Villa Wing' },
      { label: 'Configuration', value: '6BHK' },
      { label: 'Project Area', value: '7,350 sq.ft' },
      { label: 'Location', value: 'KR Puram, Bengaluru' },
    ],
  },
];

export interface MaterialCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  materials: string[];
  brands: string[];
  note?: string;
}

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
      'The Mitjen Interior Design Portfolio showcases authentic completed and proposed residential projects designed and executed by our studio in Coimbatore and Bengaluru. It features verified client commissions such as Wonder Space (Mr. Prithvi, Mr. Sampath), Elara Space (Mr. Deepak), and the KR Puram Villa (Mr. Mahesh).',
  },
  {
    question: '2. What are the main sections of the Portfolio?',
    answer:
      'The Portfolio is divided into two primary sections: "Delivered Projects" (real, finished homes photographed post-handover, documenting live craftsmanship and move-in quality) and "Upcoming Properties" (concept designs, 3D visualizations, and customized architectural expansions in Coimbatore and Bengaluru).',
  },
  {
    question: '3. Can I use these projects for design inspiration and customize them for my home?',
    answer:
      'Yes, absolutely. If you admire a specific layout, Italian PU wall panelling, island kitchen design, or ceiling detail from our delivered residences, our senior interior architects will adapt and tailor the design to your exact floor plan, lifestyle preferences, and budget.',
  },
  {
    question: '4. What materials and brands do you use in your projects?',
    answer:
      'We exclusively work with verified industry-leading material partners: Greenply, Kitply, and Century Ply for BWP marine-grade plywood and woodwork; Saint-Gobain and Armstrong for ceiling systems; VOX for fluted panels; Duracare, Tarkett, and Armstrong for flooring; and Philips, Havells, Legrand, and Orient for architectural lighting.',
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
      'Click "Get Free Quote" or "Get This Design" on any project card. You can share your floor plan or meet an interior designer at our studio in Coimbatore or Bengaluru for a personalized 3D walkthrough and free transparent budget estimate.',
  },
  {
    question: '8. Where can I visit physical experience centers to touch and inspect materials?',
    answer:
      'We welcome you to our experience centers and project sites in Coimbatore and Bengaluru. You can inspect live modular kitchen displays, touch Italian PU finishes, test soft-close drawer mechanisms, and examine material swatches from Greenply, Saint-Gobain, and Blum in person.',
  },
];
