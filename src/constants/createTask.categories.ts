import { Animal, Donation, Food, Medicine, Nature } from '@/components/icons';
import { MarkerCategoryEnum } from '@/types';
import { ReactElement, SVGProps } from 'react';

export interface CategoryConfig {
  id: MarkerCategoryEnum;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  colorClass: string;
  withWhiteCircle?: boolean;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: MarkerCategoryEnum.Nature,
    label: 'Nature',
    icon: Nature,
    colorClass: 'bg-[#00c1ac]',
  },
  {
    id: MarkerCategoryEnum.Animal,
    label: 'Animal',
    icon: Animal,
    colorClass: 'bg-animal',
  },
  {
    id: MarkerCategoryEnum.Food,
    label: 'Food',
    icon: Food,
    colorClass: 'bg-food',
  },
  {
    id: MarkerCategoryEnum.Medicine,
    label: 'Medicine',
    icon: Medicine,
    colorClass: 'bg-medicine',
  },
  {
    id: MarkerCategoryEnum.Donation,
    label: 'Donation',
    icon: Donation,
    withWhiteCircle: true,
    colorClass: 'bg-[#01425c]',
  },
];
