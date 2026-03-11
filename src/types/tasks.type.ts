import { ReactElement } from 'react';
import { TaskCategoryEnum } from './createTask.type';

export type TaskOwnerValue =
  | { type: 'USER' }
  | { type: 'ORGANIZATION'; organizationId: string };

export type TaskHost =
  | { type: 'USER'; userId?: number; name?: string; avatar?: string }
  | {
      type: 'ORGANIZATION';
      organizationId?: string;
      name?: string;
      avatar?: string;
    };

export interface OrganizationFromBack {
  id: string;
  name: string;
}

export interface ITask {
  title: string;
  subtitle: string;
  icon?: ReactElement;
  category: TaskCategoryEnum[];
  description: string;
  location?: { lat: number; lng: number } | null;
  distance: string;
  lat: number;
  lng: number;
  id: string;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CLOSED = 'CLOSED',
}

export interface ITaskDetails extends ITask {
  picture?: string | null;
  status: TaskStatus;
  locationName?: string;
  organization?: {
    id: string;
    name: string;
  } | null;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  requirements?: string;
  host?: TaskHost;
  isFavorite?: boolean;
  relatedTasks?: ITask[];
  amount?: number;
  currency?: 'USD' | 'EUR';
}

export interface IExtendedITaskProps extends ITaskDetails {
  isSelected?: boolean;
  isFavorite?: boolean;
  onToggleDescription?: () => void;
  isHost?: boolean;
}
