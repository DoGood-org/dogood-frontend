import { ReactElement } from 'react';
import { TaskCategoryEnum } from './createTask.type';

export type TaskOwnerValue =
  | { type: 'USER' }
  | { type: 'ORGANIZATION'; organizationId: string };

export interface HostUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface HostOrganization {
  id: string;
  name: string;
  avatar?: string;
}

export type TaskHost =
  | {
      type: 'USER';
      user: HostUser;
    }
  | {
      type: 'ORGANIZATION';
      organization: HostOrganization;
    };

export interface OrganizationFromBack {
  id: string;
  name: string;
  avatar?: string;
  createdAt?: string;
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
  locationName: string;
  organizationId: string;
  organization?: HostOrganization | null;
  isOrganization: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  requirements?: string;
  host?: TaskHost;
  relatedTasks?: ITask[];
  amount: number;
  currency?: 'USD' | 'EUR';
  joinedUsers?: { id: string; name: string }[];
}

export interface IExtendedITaskProps extends ITaskDetails {
  onToggleDescription?: () => void;
  isSelected?: boolean;
  isFavorite?: boolean;
  isHost?: boolean;
}
