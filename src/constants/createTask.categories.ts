import { Animal, Donation, Food, Medicine, Nature } from '@/components/icons';

export const CATEGORIES = [
  {
    id: 'nature',
    label: 'Nature',
    icon: Nature,
    colorClass: 'bg-[#00c1ac]',
  },
  {
    id: 'animal',
    label: 'Animal',
    icon: Animal,
    colorClass: 'bg-animal',
  },
  {
    id: 'food',
    label: 'Food',
    icon: Food,
    colorClass: 'bg-food',
  },
  {
    id: 'medicine',
    label: 'Medicine',
    icon: Medicine,
    colorClass: 'bg-medicine',
  },
  {
    id: 'donation',
    label: 'Donation',
    icon: Donation,
    withWhiteCircle: true,
    colorClass: 'bg-[#01425c]',
  },
];
