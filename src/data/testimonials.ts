// PLACEHOLDER: replace with real client testimonials, real numbers and real projects before launch
// Brand: Bespoke Architecture Studio

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
    name: 'Dr. Radhika Menon',
    role: 'Private Residence Client',
    location: 'Coimbatore',
    headline: 'A sanctuary of natural daylight and oak.',
    quote:
      'Their sensitivity to custom millwork, natural stone, and indirect lighting turned our penthouse into an understated architectural gallery.',
    avatar: '/images/people/03.webp',
    rating: 5
  },
  {
    id: '02',
    name: 'Meera Nambiar',
    role: 'Private Client',
    location: 'Kochi',
    headline: 'Tactile materials that mature gracefully.',
    quote:
      'It is rare to find a studio with this standard of restraint. Every finish, shadow line, and joinery joint feels completely intentional.',
    avatar: '/images/people/05.webp',
    rating: 5
  },
  {
    id: '03',
    name: 'Ananya Mehta',
    role: 'Private Residence Client',
    location: 'Bangalore',
    headline: 'Personalized design. Exceptional experience.',
    quote:
      "From understanding your vision to delivering beyond expectations, our process is collaborative, transparent, and detail-driven. We don't just design spaces — we create stories.",
    avatar: '/images/people/01.webp',
    rating: 5
  },
  {
    id: '04',
    name: 'Vikramaditya Rao',
    role: 'Managing Director',
    company: 'Horizon Equity',
    location: 'Hyderabad',
    headline: 'Architectural precision with quiet luxury.',
    quote:
      'The team balanced corporate precision with refined material warmth. Our studio space has become our firm’s strongest cultural asset.',
    avatar: '/images/people/04.webp',
    rating: 5
  },
  {
    id: '05',
    name: 'Karthik Subramanian',
    role: 'Founder & CEO',
    company: 'Stature Technologies',
    location: 'Chennai',
    headline: 'Effortless collaboration from concept to completion.',
    quote:
      'From early spatial layouts through material handover, their execution was flawless. They listen with intention and deliver timeless proportions.',
    avatar: '/images/people/02.webp',
    rating: 5
  }
];

export default testimonialsData;

