import { ReactElement } from 'react';
import { TaskCategoryEnum } from './createTask.type';

export type TaskOwnerValue =
  | { type: 'USER' }
  | { type: 'ORGANIZATION'; organizationId: string };

export interface OrganizationFromBack {
  id: string;
  name: string;
  userRole: 'admin' | 'moderator' | 'member';
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

export enum TaskActionType {
  FUNDRAISING = 'FUNDRAISING',
  VOLUNTEERING = 'VOLUNTEERING',
}

export enum UserParticipationStatus {
  NONE = 'NONE',
  JOINED = 'JOINED',
  DONATED = 'DONATED',
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
  isOrganization?: boolean;
  organizationId?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  requirements?: string;
  actionType: TaskActionType;
  userParticipationStatus: UserParticipationStatus;
  host?: {
    id: string;
    name: string;
    type: 'USER' | 'ORGANIZATION';
    avatar?: string;
  };
  isFavorite?: boolean;
  relatedTasks?: ITask[];
  amount?: number;
  currency?: 'USD' | 'EUR';
}

export interface IExtendedITaskProps extends ITask {
  isSelected?: boolean;
  isFavorite?: boolean;
  onToggleDescription?: () => void;
  actionType: TaskActionType;
  userParticipationStatus: UserParticipationStatus;
  organizationId?: string | null;
  isHost?: boolean;
  status: TaskStatus;
  ownerType?: 'user' | 'organization';
}
