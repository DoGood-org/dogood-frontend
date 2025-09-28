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

export enum TaskActionType {
  FUNDRAISING = 'FUNDRAISING',
  VOLUNTEERING = 'VOLUNTEERING',
}

export enum UserParticipationStatus {
  NONE = 'NONE',
  JOINED = 'JOINED',
  DONATED = 'DONATED',
}

export interface IExtendedITaskProps extends ITask {
  isSelected?: boolean;
  onToggleDescription?: () => void;
}

export type TaskStatus =
  | 'PENDING'
  | 'CREATED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CLOSED';

export interface ITaskDetails extends ITask {
  picture?: string;
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
  donationGoal?: number;
  currentDonation?: number;
}

export interface IExtendedITaskProps extends ITask {
  isSelected?: boolean;
  onToggleDescription?: () => void;
  actionType: TaskActionType;
  userParticipationStatus: UserParticipationStatus;
}
