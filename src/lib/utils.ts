import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MedicineSvg from '@/components/icons/Medicine';
import NatureSvg from '@/components/icons/Nature';
import AnimalSvg from '@/components/icons/Animal';
import FoodSvg from '@/components/icons/Food';
import {
  MakeBetter,
  Discover,
  SignUp,
  Volunteers,
  Ngos,
  Community,
  School,
  Startup,
  Eco,
  Creator,
  Event,
  Project,
  Research,
  Aid,
  Tools,
  Education,
  Microgrants,
  SocialGrants,
  AnimalGrants,
  EcoGrants,
  TechnoGrants,
  YoungGrants,
  Check1,
  Check2,
  Check3,
  UserG,
  List,
  Frame,
  Clock,
  Bell,
  Pig,
} from '@/components/icons';

import { TranslationFunction } from '@/types/mapType';
import { IHowItWorksItem } from '@/types/howItWorksItem';
import { ICategoryItem, IDistanceItem } from '@/types/filter.type';
import { MenuCategoryData, MenuCategoryKey } from '@/types/support';
import { IGrantsItem } from '@/types/grantsType';

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
//---------------------------------utils for Profile Forms----------------------------------

export const getHowItWorks = (t: TranslationFunction): IHowItWorksItem[] => [
  { icon: SignUp, title: t('block1') },
  { icon: Discover, title: t('block2') },
  { icon: MakeBetter, title: t('block3') },
];

//---------------------------------utils for Support Page----------------------------------

export const menuCategories: MenuCategoryKey[] = [
  'general',
  'volunteer',
  'donor',
  'personInNeed',
  'business',
  'charitableOrg',
];

export const getAllCategoriesData = (
  t: any
): Record<MenuCategoryKey, MenuCategoryData> => {
  const allData: Partial<Record<MenuCategoryKey, MenuCategoryData>> = {};
  menuCategories.forEach((category) => {
    allData[category] = t.raw(`questions.${category}`);
  });
  return allData as Record<MenuCategoryKey, MenuCategoryData>;
};

export const getFilteredCategories = (
  appliedFilter: string,
  allCategoriesData: Record<MenuCategoryKey, MenuCategoryData>
): MenuCategoryData[] => {
  if (!appliedFilter) {
    return [];
  }
  const filteredCategories: MenuCategoryData[] = [];

  menuCategories.forEach((categoryKey) => {
    const categoryData = allCategoriesData[categoryKey];
    const filteredItems = categoryData.items.filter(
      (item) =>
        item.question.toLowerCase().includes(appliedFilter.toLowerCase()) ||
        item.answer.toLowerCase().includes(appliedFilter.toLowerCase())
    );

    if (filteredItems.length > 0) {
      filteredCategories.push({
        ...categoryData,
        items: filteredItems,
      });
    }
  });

  return filteredCategories;
};

//---------------------------------utils for Grants Page----------------------------------
export const createGrantsItems = (
  t: TranslationFunction,
  config: {
    baseKey: string;
    icons: React.ComponentType<React.SVGProps<SVGSVGElement>>[];
    titlePattern?: string;
    descriptionPattern?: string;
    useArrayFormat?: boolean;
    indexOffset?: number;
  }
): IGrantsItem[] => {
  const {
    baseKey,
    icons,
    titlePattern = 'cat{index}',
    descriptionPattern,
    useArrayFormat = false,
    indexOffset = 0,
  } = config;

  return icons.map((icon, index) => {
    const itemIndex = index + 1;
    const arrayIndex = index + indexOffset;

    const titleKey = titlePattern.replace('{index}', itemIndex.toString());

    let title: string;

    if (useArrayFormat) {
      title = t(`${baseKey}.${arrayIndex}.${titleKey}`) || '';
    } else {
      title = t(`${baseKey}.${titleKey}`) || '';
    }

    const baseItem: IGrantsItem = {
      icon,
      title,
    };

    if (descriptionPattern) {
      const descKey = descriptionPattern.replace(
        '{index}',
        itemIndex.toString()
      );

      let description: string;

      if (useArrayFormat) {
        description = t(`${baseKey}.${arrayIndex}.${descKey}`) || '';
      } else {
        description = t(`${baseKey}.${descKey}`) || '';
      }

      return {
        ...baseItem,
        description,
      };
    }
    return baseItem;
  });
};
export const getCategoriesGrants = (t: TranslationFunction): IGrantsItem[] =>
  createGrantsItems(t, {
    baseKey: 'forWho',
    icons: [Volunteers, Ngos, Community, School, Startup, Eco, Creator],
    titlePattern: 'cat{index}',
    useArrayFormat: false,
  });
export const getGoalsOfGrants = (t: TranslationFunction): IGrantsItem[] =>
  createGrantsItems(t, {
    baseKey: 'whatFinance',
    icons: [Event, Project, Research, Aid, Tools, Education],
    titlePattern: 'cat{index}',
    useArrayFormat: false,
  });
export const getTypesOfGrants = (t: TranslationFunction): IGrantsItem[] =>
  createGrantsItems(t, {
    baseKey: 'types',
    icons: [
      Microgrants,
      SocialGrants,
      AnimalGrants,
      EcoGrants,
      TechnoGrants,
      YoungGrants,
    ],
    titlePattern: 'type-{index}',
    descriptionPattern: 'desc-{index}',
    useArrayFormat: true,
    indexOffset: 0,
  });
export const getTransparencyAndTrustGrants = (
  t: TranslationFunction
): IGrantsItem[] =>
  createGrantsItems(t, {
    baseKey: 'transparency',
    icons: [Check1, Check2, Check3],
    titlePattern: 'type-{index}',
    descriptionPattern: 'desc-{index}',
    useArrayFormat: true,
    indexOffset: 0,
  });
export const getApplyingSteps = (t: TranslationFunction): IGrantsItem[] =>
  createGrantsItems(t, {
    baseKey: 'howToApply',
    icons: [UserG, List, Frame, Clock, Bell, Pig],
    titlePattern: 'step{index}',
    useArrayFormat: false,
  });
