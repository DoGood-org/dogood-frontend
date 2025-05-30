import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import {
  CategoryItem,
  DistanceItem,
  TranslationFunction,
} from '@/types/mapType';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getCategoryList = (t: TranslationFunction): CategoryItem[] => [
  { icon: MedicineSvg, title: t('medicineBtn') },
  { icon: NatureSvg, title: t('natureBtn') },
  { icon: AnimalSvg, title: t('animalBtn') },
  { icon: FoodSvg, title: t('foodBtn') },
];

export const getDistancesList = (t: TranslationFunction): DistanceItem[] => [
  { title: t('1km') },
  { title: t('3km') },
  { title: t('5km') },
  { title: t('10km') },
  { title: t('neutroBtn') },
];
