import { MarkerCategoryEnum } from '@/types/mapType';
import { ReactElement } from 'react';

export interface ITask {
  title: string;
  subtitle: string;
  icon?: ReactElement;
  category: MarkerCategoryEnum[];
  description: string;
  distance: string;
  lat: number;
  lng: number;
  id: string;
}

export interface IExtendedITaskProps extends ITask {
  isSelected?: boolean;
  onToggleDescription?: () => void;
}
