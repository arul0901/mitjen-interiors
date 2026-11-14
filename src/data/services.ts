// Brand: Mitjen Interiors
// Craft Interior Studio, Coimbatore

export interface AboutFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: 'line' | 'heart';
  copy: string;
  linkText: string;
  href: string;
  secondaryLinkText?: string;
  secondaryHref?: string;
  accentLinkText?: string;
  accentHref?: string;
  highlights: string[];
  tags: string[];
}

export interface AboutSectionData {
  eyebrow: string;
  title: string;
  description: string;
  leftPicture: string;
  leftPictureAlt: string;
  leftPictureBadge: string;
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
  eyebrow: 'ABOUT MITJEN INTERIORS',
  title: 'Where Your Vision Meets Our Craftsmanship.',
  description:
    'We bring thoughtful design, creative ideas and skilled execution together to create spaces that look exceptional, work beautifully and feel uniquely yours.',
  leftPicture: '/assets/images/projects/image1.jpg',
  leftPictureAlt: 'Mitjen Interiors bespoke architectural living space',
  leftPictureBadge: '15+ YEARS OF EXPERIENCE · 2,000+ PROJECTS',
  features: [
    {
      id: 'space-planning',
      title: 'Space Planning & Functionality',
      subtitle: 'CREATIVITY IN EVERY DETAIL',
      icon: 'line',
      copy: 'A well-designed interior starts with understanding how a space needs to work. From layout to the finer details, every element makes your space more comfortable and practical.',
      linkText: 'EXPLORE SERVICES',
      href: '/services',
      secondaryLinkText: 'OUR STORY',
      secondaryHref: '/about',
      accentLinkText: 'CONNECT NOW →',
      accentHref: '/contact',
      highlights: [
        'Purpose-driven space planning',
        '2D and 3D design visualisation',
        'Custom furniture and tailored solutions'
      ],
      tags: ['Space Planning', '3D Visuals', 'Custom Furniture']
    },
    {
      id: 'precision-build',
      title: 'Precision Build & Execution',
      subtitle: 'CRAFTED WITH PRECISION',
      icon: 'heart',
      copy: "An interior's quality shows in its details. With custom furniture capabilities, CNC detailing and German machinery, we bring design concepts to life with precision.",
      linkText: 'DISCOVER OUR APPROACH',
      href: '/#approach',
      secondaryLinkText: 'EXPLORE PROJECTS',
      secondaryHref: '/portfolio',
      accentLinkText: 'CONNECT NOW →',
      accentHref: '/contact',
      highlights: [
        'Custom furniture solutions',
        'CNC detailing and precision machinery',
        'Turnkey interior execution'
      ],
      tags: ['German Machinery', 'CNC Detailing', 'Turnkey Execution']
    }
  ]
};

export const servicesData: ServiceItem[] = [
  {
    id: 'residential',
    title: 'Residential Interiors',
    titleLines: ['Residential', 'Interiors'],
    category: 'Private Living',
    description: 'Thoughtfully designed homes shaped around your lifestyle and everyday comfort.',
    copy: 'Thoughtfully designed homes shaped around your lifestyle and everyday comfort.',
    image: '/assets/images/projects/image18.jpg',
    alt: 'Thoughtfully designed residential homes shaped around your lifestyle and comfort',
    aspectRatio: '16/10',
    href: '/services/details',
    linkText: 'LEARN MORE →',
    features: ['Modular Kitchens', 'Custom Wardrobes', 'Living Spaces', 'Pooja Units']
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    titleLines: ['Commercial', 'Interiors'],
    category: 'Brand Experience',
    description: 'Commercial spaces that reflect your brand and elevate the customer experience.',
    copy: 'Commercial spaces that reflect your brand and elevate the customer experience.',
    image: '/assets/images/projects/image4.jpg',
    alt: 'Commercial spaces that reflect your brand and elevate customer experience',
    aspectRatio: '16/10',
    href: '/services/details',
    linkText: 'LEARN MORE →',
    features: ['Retail Boutiques', 'Experience Centers', 'Hospitality', 'Showrooms']
  },
  {
    id: 'corporate',
    title: 'Corporate Interiors',
    titleLines: ['Corporate', 'Interiors'],
    category: 'Workspaces',
    description: "Purposeful offices that balance functionality, professional aesthetics and your team's needs.",
    copy: "Purposeful offices that balance functionality, professional aesthetics and your team's needs.",
    image: '/assets/images/projects/image3.jpg',
    alt: "Purposeful corporate offices balancing functionality, aesthetics and team needs",
    aspectRatio: '16/10',
    href: '/services/details',
    linkText: 'LEARN MORE →',
    features: ['Executive Cabins', 'Conference Suites', 'Ergonomic Workstations', 'Acoustics']
  }
];
