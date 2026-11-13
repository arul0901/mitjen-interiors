// PLACEHOLDER: replace with real client testimonials, real numbers and real projects before launch
// Brand: Bespoke Architecture Studio

export interface AboutFeature {
  id: string;
  title: string;
  icon: 'line' | 'heart';
  copy: string;
  linkText: string;
  href: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title: string;
  description: string;
  features: AboutFeature[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  aspectRatio: string;
  href: string;
  features: string[];
}

export const aboutData: AboutSectionData = {
  eyebrow: 'ABOUT BESPOKE',
  title: 'Spaces that reflect who you are.',
  description:
    'Every detail matters. From concept to completion, we create interiors that are elegant, functional, and uniquely yours.',
  features: [
    {
      id: 'thoughtful-design',
      title: 'Thoughtful Design',
      icon: 'line',
      copy: 'Intentional layouts that enhance the way you live.',
      linkText: 'LEARN MORE',
      href: '/services'
    },
    {
      id: 'timeless-aesthetics',
      title: 'Timeless Aesthetics',
      icon: 'heart',
      copy: 'Designs that balance beauty and function for lasting impact.',
      linkText: 'LEARN MORE',
      href: '/services'
    }
  ]
};

export const servicesData: ServiceItem[] = [
  {
    id: 'residential',
    title: 'Bespoke Residential Architecture',
    category: 'Private Living',
    description: 'Harmonious private sanctuaries and family villas shaped around natural daylight, quiet circulation, and tactile materiality.',
    image: '/images/services/residential.webp',
    aspectRatio: '16/10',
    href: '/services/residential-interior-design',
    features: ['Custom Millwork', 'Spatial Masterplanning', 'Lighting Atmosphere', 'Material Sourcing']
  },
  {
    id: 'commercial',
    title: 'Commercial & Workplace Environments',
    category: 'Brand Experience',
    description: 'Executive headquarters, flagship showrooms, and collaborative ateliers engineered to elevate culture and brand character.',
    image: '/images/services/commercial.webp',
    aspectRatio: '16/10',
    href: '/services/commercial-interior-design',
    features: ['Acoustic Engineering', 'Workplace Strategy', 'Experiential Retail', 'Sustainable Fitouts']
  }
];
