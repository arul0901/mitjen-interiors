// PLACEHOLDER: replace with real client testimonials, real numbers and real projects before launch
// Brand: Bespoke Architecture Studio

export interface AboutFeature {
  id: string;
  title: string;
  icon: 'line' | 'heart';
  copy: string;
  linkText: string;
  href: string;
  image: string;
  alt: string;
  badge?: string;
  highlights: string[];
  tags: string[];
}

export interface AboutSectionData {
  eyebrow: string;
  title: string;
  description: string;
  leadImage?: string;
  leadImageAlt?: string;
  stats?: Array<{ value: string; label: string }>;
  features: AboutFeature[];
}

export interface ServiceItem {
  id: string;
  title: string;
  titleLines: [string, string];
  category: string;
  description: string;
  copy: string;
  image: string;
  alt: string;
  aspectRatio: string;
  href: string;
  linkText: string;
  features?: string[];
}

export const aboutData: AboutSectionData = {
  eyebrow: 'ABOUT BESPOKE',
  title: 'Spaces that reflect who you are.',
  description:
    'Every detail matters. From concept to completion, we create interiors that are elegant, functional, and uniquely yours.',
  leadImage: '/images/projects/01-serene.webp',
  leadImageAlt: 'Architectural interior living space detail with natural lighting',
  stats: [
    { value: '15+', label: 'Years of Practice' },
    { value: '150+', label: 'Curated Works' },
    { value: '100%', label: 'Turnkey Delivery' }
  ],
  features: [
    {
      id: 'thoughtful-design',
      title: 'Thoughtful Design',
      icon: 'line',
      copy: 'Intentional layouts shaped around daily rituals, natural daylight, and quiet circulation. Every space is engineered for effortless living and intuitive flow.',
      linkText: 'LEARN MORE',
      href: '/services',
      image: '/images/concept/concept-1.webp',
      alt: 'Minimalist living room layout with warm oak finishes',
      badge: 'SPATIAL HARMONY',
      highlights: [
        'Custom millwork & tailored joinery',
        'Natural daylight & circulation studies',
        'Acoustic balance & calm zoning'
      ],
      tags: ['Spatial Planning', 'Bespoke Joinery']
    },
    {
      id: 'timeless-aesthetics',
      title: 'Timeless Aesthetics',
      icon: 'heart',
      copy: 'Designs that balance beauty and function for lasting impact. We curate tactile palettes of natural stone, warm oak, and textiles that patina with grace over decades.',
      linkText: 'LEARN MORE',
      href: '/services',
      image: '/images/concept/concept-2.webp',
      alt: 'Architectural materials, travertine stone and linen finishes',
      badge: 'TACTILE FINISHES',
      highlights: [
        'Tactile travertine & European oak',
        'Layered ambient architectural lighting',
        'Enduring proportions free of fast trends'
      ],
      tags: ['Natural Materials', 'Living Patina']
    }
  ]
};

export const servicesData: ServiceItem[] = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    titleLines: ['Residential', 'Interiors'],
    category: 'Private Living',
    description: 'Beautiful homes designed around your lifestyle.',
    copy: 'Beautiful homes designed around your lifestyle.',
    image: '/images/services/residential.webp',
    alt: 'Bespoke residential interior living space with warm neutral tones and soft daylight',
    aspectRatio: '16/10',
    href: '/portfolio',
    linkText: 'VIEW PROJECTS',
    features: ['Custom Millwork', 'Spatial Masterplanning', 'Lighting Atmosphere', 'Material Sourcing']
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    titleLines: ['Commercial', 'Interiors'],
    category: 'Brand Experience',
    description: 'Inspiring spaces that elevate brand and experience.',
    copy: 'Inspiring spaces that elevate brand and experience.',
    image: '/images/services/commercial.webp',
    alt: 'Contemporary commercial architecture and workspace environment',
    aspectRatio: '16/10',
    href: '/portfolio',
    linkText: 'VIEW PROJECTS',
    features: ['Acoustic Engineering', 'Workplace Strategy', 'Experiential Retail', 'Sustainable Fitouts']
  }
];
