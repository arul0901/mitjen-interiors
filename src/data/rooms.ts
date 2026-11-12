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
    alt: "Contemporary open-concept kitchen with bespoke cabinetry and island",
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

