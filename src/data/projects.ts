// PLACEHOLDER: replace with real client testimonials, real numbers and real projects before launch
// Brand: Bespoke Architecture Studio

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  image: string;
  href: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: '01',
    slug: '01-serene',
    title: 'Serene Sanctuary Residence',
    subtitle: 'Minimalist lakefront private estate',
    category: 'Residential',
    location: 'Coimbatore, Tamil Nadu',
    year: '2025',
    image: '/images/projects/01-serene.webp',
    href: '/portfolio/details'
  },
  {
    id: '02',
    slug: '02-urban',
    title: 'Urban Monolith Penthouse',
    subtitle: 'High-altitude travertine residence',
    category: 'Residential',
    location: 'Bangalore, Karnataka',
    year: '2025',
    image: '/images/projects/02-urban.webp',
    href: '/portfolio/details'
  },
  {
    id: '03',
    slug: '03-oak-loft',
    title: 'Oak & Linen Duplex',
    subtitle: 'Warm timber architectural conversion',
    category: 'Residential',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    image: '/images/projects/03-oak-loft.webp',
    href: '/portfolio/details'
  },
  {
    id: '04',
    slug: '04-horizon-office',
    title: 'Horizon Capital Headquarters',
    subtitle: 'Executive collaborative office studio',
    category: 'Commercial',
    location: 'Hyderabad, Telangana',
    year: '2024',
    image: '/images/projects/04-horizon-office.webp',
    href: '/portfolio/details'
  },
  {
    id: '05',
    slug: '05-clay-house',
    title: 'Clay & Terracotta Villa',
    subtitle: 'Earthy bioclimatic courtyard pavilion',
    category: 'Residential',
    location: 'Kochi, Kerala',
    year: '2024',
    image: '/images/projects/05-clay-house.webp',
    href: '/portfolio/details'
  },
  {
    id: '06',
    slug: '06-atelier',
    title: 'The Design Atelier & Gallery',
    subtitle: 'Sculptural creative workspace',
    category: 'Commercial',
    location: 'Coimbatore, Tamil Nadu',
    year: '2023',
    image: '/images/projects/06-atelier.webp',
    href: '/portfolio/details'
  }
];
