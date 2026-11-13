export interface WhyChooseItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  tag: string;
  iconType: 'expertise' | 'design' | 'process' | 'quality' | 'communication' | 'team';
}

export const whyChooseData: WhyChooseItem[] = [
  {
    id: '01',
    index: '01',
    title: 'Trusted Expertise',
    subtitle:
      'Over a decade of architectural rigor, structural mastery, and multidisciplinary execution across complex private residences and commercial venues.',
    tag: 'Rigor & Mastery',
    iconType: 'expertise'
  },
  {
    id: '02',
    index: '02',
    title: 'Tailored Designs',
    subtitle:
      'Every space is an intimate reflection of your lifestyle and identity. Bespoke spatial layouts engineered around your daily rituals and vision.',
    tag: 'Custom Proportions',
    iconType: 'design'
  },
  {
    id: '03',
    index: '03',
    title: 'Seamless Process',
    subtitle:
      'From schematic architectural planning and 3D visualization through site coordination and final turnkey handover, we oversee every milestone.',
    tag: 'Turnkey Delivery',
    iconType: 'process'
  },
  {
    id: '04',
    index: '04',
    title: 'Lasting Quality',
    subtitle:
      'Honest, tactile materials sourced to mature gracefully over time. Natural timber, architectural stone, and precision joinery built to endure.',
    tag: 'Enduring Craft',
    iconType: 'quality'
  },
  {
    id: '05',
    index: '05',
    title: 'Clear Communication',
    subtitle:
      'Transparent budgeting, fixed timeline tracking, and direct principal architect involvement throughout every design iteration.',
    tag: 'Full Transparency',
    iconType: 'communication'
  },
  {
    id: '06',
    index: '06',
    title: 'Skilled Collective',
    subtitle:
      'A dedicated in-house studio collective comprising licensed architects, interior designers, spatial planners, and master craftsmen.',
    tag: 'In-House Studio',
    iconType: 'team'
  }
];

export default whyChooseData;
