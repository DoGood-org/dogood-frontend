import { MarkerCategoryEnum } from '@/types/mapType';

export const FILTER_CATEGORIES: readonly string[] = [
  MarkerCategoryEnum.Medicine,
  MarkerCategoryEnum.Nature,
  MarkerCategoryEnum.Animal,
  MarkerCategoryEnum.Food,
];

export const isFilterCategory = (value: string): boolean =>
  FILTER_CATEGORIES.includes(value);
