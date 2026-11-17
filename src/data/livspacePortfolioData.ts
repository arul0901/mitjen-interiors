export interface PortfolioProject {
  id: string;
  title: string;
  society: string;
  location: string;
  city: 'Bangalore' | 'Coimbatore' | 'Chennai' | 'Hyderabad';
  type: 'Delivered' | 'Upcoming';
  bhk: '1-BHK' | '2-BHK' | '3-BHK' | '4-BHK / Villa';
  carpetArea: string;
  scopeTags: string[];
  style: string;
  budgetBracket: string;
  turnaround: string;
  coverImage: string;
  galleryImages: { url: string; room: string; caption: string }[];
  description: string;
  highlights: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'prestige-green-gables-2bhk',
    title: '2BHK Mid-Century Modern Apartment Design with L-Shaped Kitchen',
    society: 'Prestige Green Gables',
    location: 'Panathur, Bangalore',
    city: 'Bangalore',
    type: 'Delivered',
    bhk: '2-BHK',
    carpetArea: '1,180 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Kids Bedroom', 'Living Room'],
    style: 'Mid-Century Modern',
    budgetBracket: '₹8.5L – ₹10.5L',
    turnaround: '45 Days Move-In',
    coverImage: '/assets/images/projects/image1.jpg',
    galleryImages: [
      { url: '/assets/images/projects/image1.jpg', room: 'Living & Dining', caption: 'Warm teak wood fluted partition with integrated ambient strip lights.' },
      { url: '/assets/images/projects/image2.jpg', room: 'L-Shaped Kitchen', caption: 'High-gloss anti-scratch acrylic cabinetry with quartz countertop.' },
      { url: '/assets/images/projects/image3.jpg', room: 'Master Bedroom', caption: 'Full-height floor-to-ceiling wardrobe with fluted glass accents.' },
      { url: '/assets/images/projects/image4.jpg', room: 'Kids Bedroom', caption: 'Vibrant study desk with overhead modular storage lofts.' },
      { url: '/assets/compatto_lobby_clean.jpg', room: 'Foyer Area', caption: 'Bespoke entryway console with back-lit architectural mirror.' },
      { url: '/assets/compatto_dining_clean.jpg', room: 'Dining Zone', caption: 'Contemporary 6-seater dining table beneath geometric pendant lighting.' },
    ],
    description:
      'A warm mid-century modern aesthetic tailored for urban family living. Features an open-plan living-dining flow, an ergonomic L-shaped modular kitchen with Blum soft-close fittings, and customized storage solutions that maximize floor space.',
    highlights: [
      'German CNC-milled anti-scratch acrylic shutters',
      'Space-saving concealed hydraulic master bed',
      'Concealed ambient LED lighting in false ceiling',
      '10-Year Comprehensive Material Warranty',
    ],
  },
  {
    id: 'prestige-eden-park-2bhk',
    title: 'Contemporary 2BHK Apartment Design with L-Shaped Kitchen & Swing Wardrobe',
    society: 'Prestige Eden Park',
    location: 'Sarjapur Road, Bangalore',
    city: 'Bangalore',
    type: 'Delivered',
    bhk: '2-BHK',
    carpetArea: '1,050 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Swing Wardrobe', 'Pooja Room'],
    style: 'Contemporary Minimalist',
    budgetBracket: '₹7.5L – ₹9.2L',
    turnaround: '45 Days Move-In',
    coverImage: '/images/Residential/Residential2.jpeg',
    galleryImages: [
      { url: '/images/Residential/Residential2.jpeg', room: 'Master Bedroom', caption: 'Custom off-white swing door wardrobes with bespoke fluted fabric detailing.' },
      { url: '/images/Residential/Residential3.jpeg', room: 'Living Room', caption: 'Minimalist television unit with concealed cable management.' },
      { url: '/images/Residential/Residential7.jpeg', room: 'Modular Kitchen', caption: 'L-shaped contemporary kitchen in cashmere matte finish.' },
      { url: '/assets/images/projects/image5.jpg', room: 'Pooja Unit', caption: 'Laser-cut CNC jali partition with warm brass bell bells.' },
    ],
    description:
      'Engineered for clean visual serenity, this apartment combines soft neutral tones, custom swing wardrobes with fabric-glass panels, and a seamless L-shaped modular kitchen designed for efficient meal prep.',
    highlights: [
      'Moisture-resistant BWP marine plywood carcass',
      'Soft-closing swing doors with Hafele architectural hinges',
      'Quartz backsplash resistant to heat and stains',
      'Compact dedicated pooja nook with ambient backlight',
    ],
  },
  {
    id: 'prestige-eden-park-1bhk',
    title: '1BHK Modern Apartment Design in Bangalore with Light Blue Accents',
    society: 'Prestige Eden Park',
    location: 'Sarjapur Road, Bangalore',
    city: 'Bangalore',
    type: 'Upcoming',
    bhk: '1-BHK',
    carpetArea: '680 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Sliding Wardrobe', 'Space Saving'],
    style: 'Modern Scandinavian',
    budgetBracket: '₹4.5L – ₹5.8L',
    turnaround: '35 Days Delivery',
    coverImage: '/assets/images/projects/image6.jpg',
    galleryImages: [
      { url: '/assets/images/projects/image6.jpg', room: 'Living Studio', caption: 'Space-saving sofa-cum-bed with pastel blue feature wall.' },
      { url: '/assets/images/projects/image7.jpg', room: 'Parallel Kitchen', caption: 'Ultra-compact dual counter layout with overhead breakfast bar.' },
      { url: '/assets/images/projects/image8.jpg', room: 'Bedroom Nook', caption: 'Floor-to-ceiling mirror sliding wardrobe for visual depth.' },
    ],
    description:
      'A compact 1BHK transformation featuring space-multiplying Scandinavian design principles. Light blue pastel accents, multi-functional furniture, and mirror sliding wardrobes create an airy, expansive feel in 680 sq.ft.',
    highlights: [
      'Multi-functional breakfast counter doubling as work-from-home desk',
      'Sliding floor-to-ceiling mirrors expanding perceived room volume',
      'Anti-fingerprint matte laminates in powder blue & white',
      'Pre-planned conduit routing for smart home entertainment',
    ],
  },
  {
    id: 'prestige-meridian-park-3bhk',
    title: 'Contemporary 3BHK Apartment Design with a Sea-Themed Kids Room',
    society: 'Prestige Meridian Park',
    location: 'Ittangur, Sarjapur, Bangalore',
    city: 'Bangalore',
    type: 'Delivered',
    bhk: '3-BHK',
    carpetArea: '1,650 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Kids Bedroom', 'Balcony Garden'],
    style: 'Contemporary Luxury',
    budgetBracket: '₹12.5L – ₹15.5L',
    turnaround: '55 Days Delivery',
    coverImage: '/images/Residential/Residential1.jpeg',
    galleryImages: [
      { url: '/images/Residential/Residential1.jpeg', room: 'Living Salon', caption: 'Expansive formal salon with Italian PU panelling and cove lighting.' },
      { url: '/assets/compatto_lobby_clean.jpg', room: 'Foyer Gallery', caption: 'Double-volume architectural foyer with bronze accents.' },
      { url: '/assets/images/projects/image9.jpg', room: 'Island Kitchen', caption: 'Gourmet island counter with built-in microwave and induction hub.' },
      { url: '/assets/images/projects/image10.jpg', room: 'Kids Bedroom', caption: 'Whimsical sea-themed bunk bed with integrated study ladder.' },
      { url: '/assets/compatto_dining_clean.jpg', room: 'Dining Room', caption: 'Solid walnut 8-seater dining table with marble credenza.' },
    ],
    description:
      'A spacious 3BHK sanctuary designed for multi-generational living. Showcases an expansive Italian PU-paneled living room, a chef’s island kitchen, and a custom nautical sea-themed bedroom with modular play storage.',
    highlights: [
      'Bespoke nautical-themed kids bedroom with climbing ladder & storage steps',
      'Italian high-gloss PU coating on architectural millwork',
      'Independent breakfast island with waterfall quartz edges',
      'Smart dimmable lighting zones controlled via smartphone app',
    ],
  },
  {
    id: 'race-course-villa-4bhk',
    title: 'Vintage Finish Luxury Villa with Italian PU Craft & Fluted Millwork',
    society: 'Race Course Residences',
    location: 'Race Course, Coimbatore',
    city: 'Coimbatore',
    type: 'Delivered',
    bhk: '4-BHK / Villa',
    carpetArea: '2,800 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Master Bedroom', 'Walk-in Wardrobe', 'Pooja Room'],
    style: 'Vintage Classical & Contemporary',
    budgetBracket: '₹22L – ₹28L',
    turnaround: '75 Days Turnkey',
    coverImage: '/images/Residential/Residential4.jpeg',
    galleryImages: [
      { url: '/images/Residential/Residential4.jpeg', room: 'Master Dressing Suite', caption: 'Curved wardrobe joinery finished in hand-buffed Italian PU.' },
      { url: '/images/Residential/Residential5.jpeg', room: 'Living Hall', caption: 'Triple-height ceiling planes with concealed brass trims.' },
      { url: '/images/Residential/Residential6.jpeg', room: 'Designer Vanity', caption: 'Custom fluted timber vanity with natural Calacatta marble slab.' },
      { url: '/assets/compatto_hero_clean.jpg', room: 'Private Lounge', caption: 'Tranquil Japandi tea lounge with Akari ambient lanterns.' },
    ],
    description:
      'Bespoke architectural craft applied to a grand 4-BHK villa. Features hand-buffed Italian PU coatings, custom architectural joinery, walk-in closets with integrated LED sensor illumination, and Italian marble washroom vanities.',
    highlights: [
      'Hand-applied 7-coat Italian PU finish on all bespoke joinery',
      'Custom fluted solid timber doors with concealed European magnetic locks',
      'Master walk-in wardrobe with velvet-lined jewelry pullouts',
      'Automated climate and motorized blackout curtain integration',
    ],
  },
  {
    id: 'sobha-dream-acres-3bhk',
    title: 'Scandinavian Minimalist 3BHK with Breakfast Counter & Glass Study',
    society: 'Sobha Dream Acres',
    location: 'Panathur Main Road, Bangalore',
    city: 'Bangalore',
    type: 'Upcoming',
    bhk: '3-BHK',
    carpetArea: '1,420 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Living Room', 'Study Nook'],
    style: 'Scandinavian Minimalist',
    budgetBracket: '₹9.8L – ₹12.5L',
    turnaround: '45 Days Move-In',
    coverImage: '/assets/images/projects/image11.jpg',
    galleryImages: [
      { url: '/assets/images/projects/image11.jpg', room: 'Living Space', caption: 'Light oak wooden paneling with recessed warm spotlights.' },
      { url: '/assets/images/projects/image12.jpg', room: 'Modular Kitchen', caption: 'Handle-less acrylic matte kitchen with tandem pull-out pantries.' },
      { url: '/assets/images/projects/image13.jpg', room: 'Glass Partition Study', caption: 'Acoustic slimline aluminum fluted glass work-from-home pod.' },
      { url: '/assets/images/projects/image14.jpg', room: 'Master Bedroom', caption: 'Platform bed with floating bedside consoles and headboard upholstery.' },
    ],
    description:
      'Rooted in clean Scandinavian simplicity, this 3BHK home introduces an acoustic glass-partitioned study pod, warm light-oak laminate millwork, and an open breakfast counter connecting the kitchen and dining zones.',
    highlights: [
      'Slim-profile acoustic aluminum glass partition for home office',
      'Tandem box Blum soft-close drawers tested for 100,000 cycles',
      'Warm wood-grain laminates paired with matte champagne metal profiles',
      'Zero toxic VOC paint and eco-certified engineered boards',
    ],
  },
  {
    id: 'godrej-woodsman-3bhk',
    title: 'Luxury 3BHK Residence with Fluted Joinery & False Ceiling Layers',
    society: 'Godrej Woodsman Estate',
    location: 'Hebbal, Bellary Road, Bangalore',
    city: 'Bangalore',
    type: 'Delivered',
    bhk: '3-BHK',
    carpetArea: '1,890 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Living Room', 'Walk-in Wardrobe'],
    style: 'Modern Luxury',
    budgetBracket: '₹14L – ₹17.5L',
    turnaround: '50 Days Delivery',
    coverImage: '/images/Residential/Residential3.jpeg',
    galleryImages: [
      { url: '/images/Residential/Residential3.jpeg', room: 'Master Suite', caption: 'Floor-to-ceiling wardrobes with custom woven cane & fluted glass inserts.' },
      { url: '/images/Residential/Residential7.jpeg', room: 'Formal Living', caption: 'Seamless floating media credenza with Italian marble backdrop.' },
      { url: '/assets/compatto_dining_clean.jpg', room: 'Dining Alcove', caption: 'Curved archway alcove with customized accent dining fixture.' },
    ],
    description:
      'Refined urban luxury articulated in Hebbal. Featuring dual false ceiling coves, custom fluted wardrobes with woven cane details, and an open gourmet kitchen with integrated microwave and wine rack.',
    highlights: [
      'Dual-layered acoustic gypsum false ceiling with warm magnetic track lights',
      'Custom woven cane & fluted glass sliding wardrobe doors',
      'Concealed bar unit with mirrored shelves and push-to-open hardware',
      '10-Year warranty on all German-engineered modular units',
    ],
  },
  {
    id: 'brigade-utopia-2bhk',
    title: 'Modern Compact 2BHK with Smart Space-Saving Storage & Hydraulic Bed',
    society: 'Brigade Cornerstone Utopia',
    location: 'Varthur, Whitefield, Bangalore',
    city: 'Bangalore',
    type: 'Upcoming',
    bhk: '2-BHK',
    carpetArea: '980 sq.ft',
    scopeTags: ['Full Home', 'Kitchen', 'Master Bedroom', 'Space Saving'],
    style: 'Smart Functional Modern',
    budgetBracket: '₹6.8L – ₹8.4L',
    turnaround: '40 Days Move-In',
    coverImage: '/assets/images/projects/image15.jpg',
    galleryImages: [
      { url: '/assets/images/projects/image15.jpg', room: 'Master Bedroom', caption: 'Hydraulic lift-up storage bed with floor-to-ceiling wardrobe.' },
      { url: '/assets/images/projects/image16.jpg', room: 'Compact Kitchen', caption: 'Parallel modular kitchen with built-in spice pullouts and cutlery organizers.' },
      { url: '/assets/images/projects/image17.jpg', room: 'Living Area', caption: 'Foldable dining table integrated seamlessly into the living room wall unit.' },
    ],
    description:
      'Smart spatial engineering for young professionals. Featuring hydraulic storage beds, a fold-away dining table that tucks into the living wall, and high-efficiency kitchen pullouts that maximize every cubic inch.',
    highlights: [
      'Wall-mounted foldable dining table accommodating up to 4 diners',
      'Heavy-duty gas-lift hydraulic storage mechanism beneath king bed',
      'Overhead loft storage seamlessly matched to wall color',
      'Easy-clean scratch-resistant acrylic matte kitchen shutters',
    ],
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
    priceStarting: '₹3.5 Lakhs*',
    recommendedFor: 'Rental homes, 1BHK / 2BHK starters looking for functional, durable modular solutions.',
    features: [
      'Modular Kitchen with anti-scratch laminate & soft-close hinges',
      '2 Full-height hinged/sliding wardrobes in master & guest bedrooms',
      'Basic perimeter false ceiling with warm LED downlights',
      'Standard modular TV unit with concealed wire management',
      'Choice of 40+ curated color palettes & finishes',
    ],
    timeline: '35–45 Days Move-In Guarantee',
    warranty: '5-Year Material Warranty',
  },
  {
    id: 'premium',
    name: 'Premium / Full Home Interiors',
    badge: 'MOST POPULAR',
    priceStarting: '₹7.5 Lakhs*',
    recommendedFor: 'Homeowners wanting high-end aesthetics, customized joinery, and durable family luxury.',
    features: [
      'Full home interior covering Living, Kitchen, Dining & all Bedrooms',
      'Premium acrylic or PU matte modular kitchen with quartz countertop',
      'Master walk-in wardrobe with glass/cane detailing & sensor illumination',
      'Custom designer false ceiling with dual cove lighting layers',
      'Statement TV wall paneling with acoustic fluted slats',
      'Dedicated pooja unit with CNC laser-cut jali & brass hardware',
    ],
    timeline: '45 Days Move-In Guarantee',
    warranty: '10-Year Flat Warranty',
    isPopular: true,
  },
  {
    id: 'luxe',
    name: 'Luxe / Bespoke Architectural',
    badge: 'ARCHITECTURAL BESPOKE',
    priceStarting: '₹14 Lakhs*',
    recommendedFor: 'Villas, duplexes, and premium 3BHK/4BHK apartments demanding tailored craftsmanship.',
    features: [
      'End-to-end bespoke turnkey architectural execution',
      'Hand-buffed Italian PU coatings & natural wood veneer paneling',
      'Gourmet island kitchen with waterfall quartz edges & built-in appliances',
      'Custom fluted timber doors with concealed European magnetic locks',
      'Smart home automation (curtains, scene lighting, climate control)',
      'Luxury stone & natural Italian marble washroom vanities',
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
      'The Mitjen Interior Design Portfolio showcases both proposed and completed residential projects by our design studios. It highlights innovative space-saving layouts, latest European and contemporary trends, and personalized aesthetics tailored for urban apartments, villas, and penthouses.',
  },
  {
    question: '2. What are the main sections of the Portfolio?',
    answer:
      'The Portfolio is divided into two primary sections: "Delivered Projects" (real, finished homes photographed post-handover, documenting live craftsmanship and move-in quality) and "Upcoming Properties" (concept designs, 3D visualizations, and customized floor plans tailored for popular builder communities like Prestige, Sobha, Godrej, and Brigade).',
  },
  {
    question: '3. Can I use this portfolio for design inspiration and customize it for my home?',
    answer:
      'Absolutely! If you find a kitchen layout, bedroom wardrobe, TV unit, or color palette you love in our portfolio, our interior architects can adapt and scale it to your exact floor plan, lifestyle preferences, and budget.',
  },
  {
    question: '4. How do you ensure quality and what warranties are offered?',
    answer:
      'All our modular components are precision-cut using German CNC machinery with zero manual edge chipping. We exclusively use boiling-water-proof (BWP) marine-grade plywood and high-tensile hardware from Blum and Hafele. Every delivered project comes with our flat 10-Year Comprehensive Warranty and a 45-day move-in guarantee.',
  },
  {
    question: '5. Can I get a similar design within my specific budget?',
    answer:
      'Yes. During your initial design consultation, we map out exact material grades, finishes (Laminate, Acrylic, or Italian PU), and hardware tiers so you get the visual style you admire while keeping costs fully transparent with no hidden post-contract charges.',
  },
  {
    question: '6. What is the typical completion timeline?',
    answer:
      'We offer a 45-day move-in guarantee for modular solutions (kitchens, wardrobes, storage) upon design sign-off. Full turnkey home interiors with civil modifications, false ceilings, and painting are typically handed over in 60 to 75 days.',
  },
  {
    question: '7. How do I get started with a consultation?',
    answer:
      'Click "Get Free Quote" or "Get This Design" on any project card. You can share your floor plan or meet an interior designer at one of our design studios in Bangalore or Coimbatore for a personalized 3D walkthrough and free budget estimate.',
  },
  {
    question: '8. Where can I visit physical experience centers to touch and feel materials?',
    answer:
      'We welcome you to our experience centers located across Bangalore (Indiranagar, HSR Layout, Whitefield) and Coimbatore (Race Course). You can inspect live modular kitchen displays, touch Italian PU finishes, test soft-close drawer mechanisms, and explore 500+ material swatches in person.',
  },
];
