import { FilterOption } from '@/types';

export const getCategoryOptions = (
  t: (key: string) => string
): FilterOption[] => [
  {
    value: 'FOOD',
    label: t('food'),
  },
  {
    value: 'NATURE',
    label: t('nature'),
  },
  {
    value: 'ANIMAL',
    label: t('animal'),
  },
  {
    value: 'MEDICINE',
    label: t('medicine'),
  },
  {
    value: 'DONATION',
    label: t('donation'),
  },
];
