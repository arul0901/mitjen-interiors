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
    slug: 'prithvi-royal-nesto',
    title: 'Prithvi',
    subtitle: 'Royal Nesto, Neelambur · 3BHK Apartment (3,520 sq.ft)',
    category: 'Residential',
    location: 'Neelambur, Coimbatore',
    year: '2025',
    image: '/images/Residential/Residential1.jpeg',
    href: '/projects'
  },
  {
    id: '02',
    slug: 'sampath-nehru-nagar',
    title: 'Sampath',
    subtitle: 'Nehru Nagar West. · 6BHK Villa (8,060 sq.ft)',
    category: 'Residential',
    location: 'Kalapatti, Coimbatore',
    year: '2025',
    image: '/images/Residential/Residential7.jpeg',
    href: '/projects'
  },
  {
    id: '03',
    slug: 'mr-mahesh-pilot-kr-puram',
    title: 'Mr. Mahesh – Pilot',
    subtitle: 'Krishna Raja (KR) Puram · 6BHK Villa (7,350 sq.ft)',
    category: 'Residential',
    location: 'Bangalore, Karnataka',
    year: '2024',
    image: '/images/Residential/Residential2.jpeg',
    href: '/projects'
  },
  {
    id: '04',
    slug: 'deepak-saibaba-colony',
    title: 'Deepak',
    subtitle: 'Saibaba Colony · 4BHK Individual Home (6,020 sq.ft)',
    category: 'Residential',
    location: 'Saibaba Colony, Coimbatore',
    year: '2024',
    image: '/assets/images/projects/image4.jpg',
    href: '/projects'
  }
];

