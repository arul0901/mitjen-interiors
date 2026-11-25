/**
 * Image Credits & Stock Licensing:
 * 1. Living Pavilion (01-living.webp): Photo by R ARCHITECTURE on Unsplash
 *    URL: https://unsplash.com/photos/photo-1600210492486-724fe5c67fb0
 *    License: Unsplash Free License (Commercial use allowed, no attribution required)
 * 2. Culinary Studio (02-kitchen.webp): Photo by R ARCHITECTURE on Unsplash
 *    URL: https://unsplash.com/photos/photo-1600585154340-be6161a56a0c
 *    License: Unsplash Free License
 * 3. Master Sanctuary (03-bedroom.webp): Photo by Spacejoy on Unsplash
 *    URL: https://unsplash.com/photos/photo-1616594039964-ae9021a400a0
 *    License: Unsplash Free License
 * 4. Spa Retreat (04-bathroom.webp): Photo by Christian Mackie on Unsplash
 *    URL: https://unsplash.com/photos/photo-1584622650111-993a426fbf0a
 *    License: Unsplash Free License
 * 5. Dining Hall (05-dining.webp): Photo by Spacejoy on Unsplash
 *    URL: https://unsplash.com/photos/photo-1617806118233-18e1de247200
 *    License: Unsplash Free License
 * 6. Panoramic Terrace (06-terrace.webp): Photo by R ARCHITECTURE on Unsplash
 *    URL: https://unsplash.com/photos/photo-1600607687939-ce8a6c25118c
 *    License: Unsplash Free License
 */

export interface RoomData {
  id: string;
  title: string;
  image: string;
  depth: string;
  alt: string;
}

export interface ShowcaseSlide {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  mobileImage?: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  alt: string;
}

export const CINEMATIC_SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "entrance-gallery",
    number: "01",
    eyebrow: "Arrival Foyer",
    title: "The Entrance Foyer",
    description: "Woven cane cabinetry, a floating teak bench, and warm travertine wall textures crafted for an inviting first impression.",
    image: "/hero/poster.webp",
    objectPosition: "center center",
    mobileObjectPosition: "35% center",
    alt: "Entrance foyer with cane-front storage, floating wooden bench, and warm travertine wall",
  },
  {
    id: "heritage-threshold",
    number: "02",
    eyebrow: "Art & Partition",
    title: "The Heritage Threshold",
    description: "Custom relief artwork paired with fluted glass partitions, timber grid paneling, and recessed display niches.",
    image: "/hero/frames/f0036.webp",
    objectPosition: "center center",
    mobileObjectPosition: "50% 65%",
    alt: "Foyer transition featuring relief mural, fluted glass divider, and wooden wall niches",
  },
  {
    id: "living-room",
    number: "03",
    eyebrow: "Living Lounge",
    title: "The Living Room",
    description: "Seamless gypsum ceilings with magnetic track lighting, warm backlit timber paneling, and tailored plush seating.",
    image: "/images/projects/06-atelier.webp",
    objectPosition: "center center",
    mobileObjectPosition: "50% 75%",
    alt: "Modern living room with gypsum false ceiling, track lighting, and upholstered sofa",
  },
  {
    id: "dining-space",
    number: "04",
    eyebrow: "Dining Salon",
    title: "The Dining Space",
    description: "An Italian marble dining table beneath a rattan-inlay cove ceiling, complemented by a cane-front crockery console.",
    image: "/hero/frames/f0071.webp",
    objectPosition: "center center",
    mobileObjectPosition: "50% 65%",
    alt: "Marble-top dining table with upholstered chairs, pendant lights, and rattan cove ceiling",
  },
  {
    id: "modular-kitchen",
    number: "05",
    eyebrow: "Culinary Studio",
    title: "The Modular Kitchen",
    description: "Handleless matte laminates, fluted glass upper cabinets with concealed LED strips, and a marble breakfast counter.",
    image: "/images/projects/05-clay-house.webp",
    objectPosition: "center center",
    mobileObjectPosition: "50% 72%",
    alt: "Modular kitchen with matte cabinetry, fluted glass overhead units, and marble backsplash",
  },
  {
    id: "master-suite",
    number: "06",
    eyebrow: "Primary Suite",
    title: "The Master Suite",
    description: "Custom timber study joinery, textured wardrobe panels with fluted glass shelving, and soft layered window drapery.",
    image: "/hero/frames/f0176.webp",
    objectPosition: "center center",
    mobileObjectPosition: "60% 70%",
    alt: "Master bedroom suite with custom wooden study desk, textured wardrobe, and lounge chair",
  },
  {
    id: "vanity-lounge",
    number: "07",
    eyebrow: "Powder Sanctuary",
    title: "The Vanity & Lounge",
    description: "Fluted wall paneling with botanical wallpaper inlay, a backlit circular mirror, floating stone vanity, and cane seating.",
    image: "/hero/frames/f0240.webp",
    objectPosition: "center center",
    mobileObjectPosition: "72% 55%",
    alt: "Powder vanity and lounge area with fluted wall panels, circular mirror, and cane chairs",
  },
];



export interface WalkthroughRoom {
  id: string;
  number: string;
  eyebrow: string;
  from: number;
  to: number;
  title: string;
  tagline: string;
  side: "left" | "right";
}

export const WALKTHROUGH_ROOMS: WalkthroughRoom[] = [
  {
    id: "entrance-gallery",
    number: "01",
    eyebrow: "Arrival Foyer",
    from: 0.0,
    to: 0.17,
    title: "The Entrance Foyer",
    tagline: "Woven cane cabinetry, floating teak bench, and warm travertine walls.",
    side: "left",
  },
  {
    id: "heritage-threshold",
    number: "02",
    eyebrow: "Art & Partition",
    from: 0.14,
    to: 0.31,
    title: "The Heritage Threshold",
    tagline: "Custom relief artwork, fluted glass partitions, and recessed wooden niches.",
    side: "right",
  },
  {
    id: "living-room",
    number: "03",
    eyebrow: "Living Lounge",
    from: 0.28,
    to: 0.45,
    title: "The Living Room",
    tagline: "Seamless gypsum ceilings, magnetic track lights, and fluted timber accents.",
    side: "left",
  },
  {
    id: "dining-space",
    number: "04",
    eyebrow: "Dining Salon",
    from: 0.42,
    to: 0.59,
    title: "The Dining Space",
    tagline: "Italian marble dining, rattan-inlay cove ceiling, and warm pendant lighting.",
    side: "right",
  },
  {
    id: "modular-kitchen",
    number: "05",
    eyebrow: "Culinary Studio",
    from: 0.56,
    to: 0.73,
    title: "The Modular Kitchen",
    tagline: "Handleless matte laminates, fluted glass shutters, and a marble breakfast counter.",
    side: "left",
  },
  {
    id: "master-suite",
    number: "06",
    eyebrow: "Primary Suite",
    from: 0.70,
    to: 0.87,
    title: "The Master Suite",
    tagline: "Tailored study joinery, textured wardrobe panels, and soft layered drapery.",
    side: "right",
  },
  {
    id: "vanity-lounge",
    number: "07",
    eyebrow: "Powder Sanctuary",
    from: 0.84,
    to: 1.0,
    title: "The Vanity & Lounge",
    tagline: "Fluted wall paneling, backlit circular mirror, and a floating stone vanity.",
    side: "left",
  },
];

export const ROOMS: RoomData[] = [
  {
    id: "01-living",
    title: "Living Pavilion",
    image: "/rooms/01-living.webp",
    depth: "/rooms/01-living-depth.png",
    alt: "Minimal luxury living room interior with oak flooring and soft natural daylight",
  },
  {
    id: "02-kitchen",
    title: "Culinary Studio",
    image: "/rooms/02-kitchen.webp",
    depth: "/rooms/02-kitchen-depth.png",
    alt: "Contemporary open-concept kitchen with Mitjen cabinetry and island",
  },
  {
    id: "03-bedroom",
    title: "Master Sanctuary",
    image: "/rooms/03-bedroom.webp",
    depth: "/rooms/03-bedroom-depth.png",
    alt: "Minimalist master bedroom suite with neutral linens and natural lighting",
  },
  {
    id: "04-bathroom",
    title: "Spa Retreat",
    image: "/rooms/04-bathroom.webp",
    depth: "/rooms/04-bathroom-depth.png",
    alt: "Serene spa-inspired bathroom with freestanding stone soaking tub",
  },
  {
    id: "05-dining",
    title: "Dining Hall",
    image: "/rooms/05-dining.webp",
    depth: "/rooms/05-dining-depth.png",
    alt: "Architectural dining area with solid wood table and designer seating",
  },
  {
    id: "06-terrace",
    title: "Panoramic Terrace",
    image: "/rooms/06-terrace.webp",
    depth: "/rooms/06-terrace-depth.png",
    alt: "Covered architectural outdoor terrace overlooking natural landscaping",
  },
];

