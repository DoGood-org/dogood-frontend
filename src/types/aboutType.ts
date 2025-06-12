import { images } from '@/assets/images/about/import';

export interface AboutSectionProps {
  view: string;
  title: string;
  description: string[];
  img: Array<keyof typeof images>;
}

export interface AboutTabsProps {
  views: { view: string }[];
  activeView: string;
  onChange: (view: string) => void;
}
