import { MarkerCategoryEnum } from '@/types/mapType';
import { TaskCategoryEnum } from '@/types/createTask.type';

export interface IPropsFilters {
  setIsSettingOpen: (isOpen: boolean) => void;
}
export interface IPropsFilterPanel {
  selectedCategories: string[];
  selectedDistances: string[];
  selectedCategoryButtons: React.ReactElement[];
  selectedDistanceButtons: React.ReactElement[];
}
export type IExtendedCategoryFilter =
  | MarkerCategoryEnum
  | TaskCategoryEnum
  | 'all'
  | null;
export type IDistanceFilter = '1' | '3' | '5' | '10' | '30' | 'all' | null;

export interface IDistanceItem {
  title: string;
  value: string;
}
export interface ICategoryItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  color: string;
}
