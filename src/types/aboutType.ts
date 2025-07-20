import { images } from '@/assets/images/about/import';
import { RefObject } from 'react';

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
  isScroll?: boolean;
  buttonClass?: string;
  refClass?: string;
  headClass?: string;
}

export interface TabScrollProps {
  containerRef: RefObject<HTMLDivElement | null>;
  activeView: string;
  isTabletOrLarger: boolean;
  setRect: (rect: { left: number; width: number }) => void;
  // isEnabled: boolean;
}

export interface SwipeProps {
  ref: RefObject<HTMLDivElement | null>;
  onSwipeLeft: () => void;
  onSwipeRight?: () => void;
  isEnabled: boolean;
}
