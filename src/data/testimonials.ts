// PLACEHOLDER: replace with real client testimonials, real numbers and real projects before launch
// Brand: Bespoke Architecture Studio

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: '01',
    name: 'Ananya Deshmukh',
    role: 'Homeowner',
    location: 'Bangalore',
    quote: 'Bespoke Architecture Studio transformed our living space into a calm, daylight-drenched sanctuary. Every detail feels deliberate, warm, and natural.',
    avatar: '/images/people/01.webp',
    rating: 5
  },
  {
    id: '02',
    name: 'Vikramaditya Rao',
    role: 'Managing Director',
    company: 'Horizon Equity',
    location: 'Hyderabad',
    quote: 'The team balanced corporate precision with architectural warmth. Our executive floor has become our company’s strongest cultural asset.',
    avatar: '/images/people/02.webp',
    rating: 5
  },
  {
    id: '03',
    name: 'Dr. Radhika Menon',
    role: 'Art Collector & Private Owner',
    location: 'Coimbatore',
    quote: 'Their deep sensitivity to custom millwork, natural stone, and indirect lighting turned our penthouse into an understated architectural gallery.',
    avatar: '/images/people/03.webp',
    rating: 5
  },
  {
    id: '04',
    name: 'Karthik Subramanian',
    role: 'Founder & CEO',
    company: 'Stature Technologies',
    location: 'Chennai',
    quote: 'From concept sketches through handover, their execution was flawless. They listen with intention and deliver timeless craftsmanship.',
    avatar: '/images/people/04.webp',
    rating: 5
  },
  {
    id: '05',
    name: 'Meera Nambiar',
    role: 'Architectural Consultant',
    location: 'Kochi',
    quote: 'It is rare to find a studio with this standard of material restraint. Working with Bespoke Architecture Studio was an absolute pleasure.',
    avatar: '/images/people/05.webp',
    rating: 5
  }
];
