import { MarkerCategoryEnum } from '@/types/mapType';

export interface IPropsFilters {
  setIsSettingOpen: (isOpen: boolean) => void;
}
export interface IPropsFilterPanel {
  selectedCategories: string[];
  selectedDistances: string[];
  selectedCategoryButtons: React.ReactElement[];
  selectedDistanceButtons: React.ReactElement[];
}
export type IExtendedCategoryFilter = MarkerCategoryEnum | 'all' | null;
export type IDistanceFilter = '1' | '3' | '5' | '10' | '20' | '50' | null;
export interface IFilterStore {
  choosenCategories: IExtendedCategoryFilter[];
  distanceFilter: IDistanceFilter;
  searchQuery: string;
  sortBy: 'title' | 'distance';
}
export interface IDistanceItem {
  title: string;
  value: string;
}
export interface ICategoryItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  color: string;
}
