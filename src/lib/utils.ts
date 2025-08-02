import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import { MakeBetter, Discover, SignUp } from '@/components/icons';

import { TranslationFunction } from '@/types/mapType';
import { IHowItWorksItem } from '@/types/howItWorksItem';
import { ICategoryItem, IDistanceItem } from '@/types/filter.type';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getCategoryList = (t: TranslationFunction): ICategoryItem[] => [
  { icon: MedicineSvg, title: t('medicineBtn'), color: 'bg-medicine' },
  { icon: NatureSvg, title: t('natureBtn'), color: 'bg-nature' },
  { icon: AnimalSvg, title: t('animalBtn'), color: 'bg-animal' },
  { icon: FoodSvg, title: t('foodBtn'), color: 'bg-food' },
];

export const getDistancesList = (t: TranslationFunction): IDistanceItem[] => [
  { value: '1', title: t('1km') },
  { value: '3', title: t('3km') },
  { value: '5', title: t('5km') },
  { value: '10', title: t('10km') },
  { value: '20', title: t('20km') },
  { value: '50', title: t('50km') },
  { value: 'all', title: t('neutroBtn') },
];

export const getHowItWorks = (t: TranslationFunction): IHowItWorksItem[] => [
  { icon: SignUp, title: t('block1') },
  { icon: Discover, title: t('block2') },
  { icon: MakeBetter, title: t('block3') },
];
