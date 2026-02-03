import { Animal, Donation, Food, Medicine, Nature } from '@/components/icons';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { ReactElement, SVGProps } from 'react';

export interface CategoryConfig {
  id: TaskCategoryEnum;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  colorClass: string;
  withWhiteCircle?: boolean;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: TaskCategoryEnum.Nature,
    label: 'Nature',
    icon: Nature,
    colorClass: 'bg-[#00c1ac]',
  },
  {
    id: TaskCategoryEnum.Animal,
    label: 'Animal',
    icon: Animal,
    colorClass: 'bg-animal',
  },
  {
    id: TaskCategoryEnum.Food,
    label: 'Food',
    icon: Food,
    colorClass: 'bg-food',
  },
  {
    id: TaskCategoryEnum.Medicine,
    label: 'Medicine',
    icon: Medicine,
    colorClass: 'bg-medicine',
  },
  {
    id: TaskCategoryEnum.Donation,
    label: 'Donation',
    icon: Donation,
    withWhiteCircle: true,
    colorClass: 'bg-[#01425c]',
  },
] as const;
