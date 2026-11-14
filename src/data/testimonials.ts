// Real Client Testimonials from Google Profile (Craft Interior Studio / Mitjen Interiors)
// Location: Coimbatore & Bangalore

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  location?: string;
  headline: string;
  quote: string;
  avatar: string;
  rating?: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: '01',
    name: 'Vijay S.',
    role: 'Villa Client',
    location: 'Race Course, Coimbatore',
    headline: 'Bespoke PU paint finish and flawless modular kitchen.',
    quote:
      'Mr. Saravana Kumar and the Mitjen team delivered extraordinary quality for our villa. The modular kitchen and PU finished wardrobes crafted with German machinery detailing are truly world-class.',
    avatar: '/images/people/01.webp',
    rating: 5
  },
  {
    id: '02',
    name: 'Dr. Rajesh',
    role: 'Apartment Client',
    location: 'KR Puram, Bangalore',
    headline: 'On-time turnkey handover with transparent guidance.',
    quote:
      'From 2D/3D design visualization to the final handover, every milestone was completed on schedule. Their custom furniture planning made our home look spacious, modern, and warm.',
    avatar: '/images/people/02.webp',
    rating: 5
  },
  {
    id: '03',
    name: 'Anand M.',
    role: 'Director, Operations',
    company: 'Tech Solutions',
    location: 'TIDEL Park, Coimbatore',
    headline: 'Functional workspace planned around how our team works.',
    quote:
      'Outstanding commercial execution for our office floor. They balanced aesthetic appeal with practical acoustics and functional ergonomics. Highly recommended for corporate spaces.',
    avatar: '/images/people/03.webp',
    rating: 5
  },
  {
    id: '04',
    name: 'Sangeetha K.',
    role: 'Homeowner',
    location: 'Ramanathapuram, Coimbatore',
    headline: '15+ years of experience clearly shines in the details.',
    quote:
      'The attention to detail in their CNC work and joinery was remarkable. V. Saravana Kumar personally oversaw every step, ensuring the final space matched our 3D renders perfectly.',
    avatar: '/images/people/04.webp',
    rating: 5
  },
  {
    id: '05',
    name: 'Bala M.',
    role: 'Residence Client',
    location: 'Saibaba Colony, Coimbatore',
    headline: 'True craftsmanship, honest pricing, and dedicated service.',
    quote:
      'Transparent communication, zero hidden costs, and top-tier execution. The entire team was professional, clean, and delivered a home our family truly loves.',
    avatar: '/images/people/05.webp',
    rating: 5
  }
];

export default testimonialsData;
