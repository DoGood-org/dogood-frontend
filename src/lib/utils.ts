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
  IDistanceItem,
  TranslationFunction,
} from '@/types/mapType';
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

export const getDistancesList = (t: TranslationFunction): IDistanceItem[] => [
  { value: '1', title: t('1km') },
  { value: '3', title: t('3km') },
  { value: '5', title: t('5km') },
  { value: '10', title: t('10km') },
  { value: 'all', title: t('neutroBtn') },
];

export const getHowItWorks = (t: TranslationFunction): IHowItWorksItem[] => [
  { icon: NotePencil, title: t('block1') },
  { icon: Binoculars, title: t('block2') },
  { icon: HandHeart, title: t('block3') },
];
