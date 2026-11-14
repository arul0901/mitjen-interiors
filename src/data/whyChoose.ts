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
    title: 'EXPERIENCE THAT MATTERS',
    subtitle:
      'With 15+ years of experience and 2,000+ projects, we bring practical knowledge and confidence to every new space, whatever its size or style.',
    tag: '15+ Yrs · 2,000+ Projects',
    iconType: 'expertise'
  },
  {
    id: '02',
    index: '02',
    title: 'DESIGNS THAT FEEL PERSONAL',
    subtitle:
      'Every project starts with listening to your preferences and requirements, so the finished space reflects the way you want to live or work.',
    tag: 'Tailored Solutions',
    iconType: 'design'
  },
  {
    id: '03',
    index: '03',
    title: 'ATTENTION TO EVERY DETAIL',
    subtitle:
      'From the overall layout to the finishing touches, we focus on the small details that bring an interior together and give it a refined finish.',
    tag: 'Refined Finishing',
    iconType: 'quality'
  },
  {
    id: '04',
    index: '04',
    title: 'CAREFUL PRODUCTION',
    subtitle:
      'Modern machinery and skilled production help turn approved designs into accurate, well-finished furniture and interior elements.',
    tag: 'German Tech & CNC',
    iconType: 'process'
  },
  {
    id: '05',
    index: '05',
    title: 'DESIGN TO EXECUTION',
    subtitle:
      'With turnkey execution options, we support your project from approved design through to completion, keeping every stage connected.',
    tag: 'Turnkey Support',
    iconType: 'communication'
  },
  {
    id: '06',
    index: '06',
    title: 'GUIDED BY EXPERIENCE',
    subtitle:
      'Led by V. Saravana Kumar, Mitjen Interiors combines design understanding with hands-on project knowledge to guide every project from start to finish.',
    tag: 'Studio Leadership',
    iconType: 'team'
  }
];

export default whyChooseData;
