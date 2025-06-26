import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import NotePencil from '@/components/icons/NotePencil';
import Binoculars from '@/components/icons/Binoculars';
import HandHeart from '@/components/icons/HandHeart';

import {
  CategoryItem,
  DistanceItem,
  IconData,
  TranslationFunction,
} from '@/types/mapType';
import { iconMap } from '@/components';
import { IHowItWorksItem } from '@/types/howItWorksItem';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getCategoryList = (t: TranslationFunction): CategoryItem[] => [
  { icon: MedicineSvg, title: t('medicineBtn'), color: 'bg-medicine' },
  { icon: NatureSvg, title: t('natureBtn'), color: 'bg-nature' },
  { icon: AnimalSvg, title: t('animalBtn'), color: 'bg-animal' },
  { icon: FoodSvg, title: t('foodBtn'), color: 'bg-food' },
];

export const getDistancesList = (t: TranslationFunction): DistanceItem[] => [
  { title: t('1km') },
  { title: t('3km') },
  { title: t('5km') },
  { title: t('10km') },
  { title: t('neutroBtn') },
];

export const getCategoryIcon = (category: keyof typeof iconMap): IconData => {
  return iconMap[category];
};

export const getHowItWorks = (t: TranslationFunction): IHowItWorksItem[] => [
  { icon: NotePencil, title: t('block1') },
  { icon: Binoculars, title: t('block2') },
  { icon: HandHeart, title: t('block3') },
];
