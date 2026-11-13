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
    eyebrow: "Arrival Gallery",
    from: 0.0,
    to: 0.17,
    title: "The Entrance Gallery",
    tagline: "Board-formed concrete meets seamless desert light.",
    side: "left",
  },
  {
    id: "living-pavilion",
    number: "02",
    eyebrow: "Living Pavilion",
    from: 0.14,
    to: 0.31,
    title: "The Living Pavilion",
    tagline: "Expansive glass proportions shaped around calm daylight.",
    side: "right",
  },
  {
    id: "living-lounge",
    number: "03",
    eyebrow: "Lounge & Salon",
    from: 0.28,
    to: 0.45,
    title: "The Living Lounge",
    tagline: "Warm European oak, tactile textiles, and quiet gatherings.",
    side: "left",
  },
  {
    id: "dining-room",
    number: "04",
    eyebrow: "Dining Salon",
    from: 0.42,
    to: 0.59,
    title: "The Dining Room",
    tagline: "Made for long tables, warm conversations, and longer evenings.",
    side: "right",
  },
  {
    id: "kitchen",
    number: "05",
    eyebrow: "Culinary Studio",
    from: 0.56,
    to: 0.73,
    title: "The Culinary Studio",
    tagline: "Cast concrete monoliths, tailored joinery, and quiet function.",
    side: "left",
  },
  {
    id: "primary-suite",
    number: "06",
    eyebrow: "Primary Suite",
    from: 0.70,
    to: 0.87,
    title: "The Primary Suite",
    tagline: "A peaceful private sanctuary opening to the morning garden.",
    side: "right",
  },
  {
    id: "bath",
    number: "07",
    eyebrow: "Stone Sanctuary",
    from: 0.84,
    to: 1.0,
    title: "The Bath",
    tagline: "Carved travertine, brushed metal, water, and stillness.",
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

