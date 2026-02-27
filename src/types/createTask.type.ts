import { ReactNode } from 'react';
import {
  TaskActionType,
  TaskHost,
  UserParticipationStatus,
} from './tasks.type';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';

export enum TaskCategoryEnum {
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  Medicine = 'medicine',
  Donation = 'donation',
}

export type UploadResultInfo = {
  secure_url?: string;
  public_id?: string;
};

export type StepLayoutProps = {
  children: ReactNode;
  showBack?: boolean;
  className?: string;
  title?: string;
};

export type BasicInfoFormValuesExtended = BasicInfoFormValues & {
  actionType?: TaskActionType;
  userParticipationStatus?: UserParticipationStatus;
  host?: TaskHost;
  joinedUsers?: { id: string; name: string }[];
};

export type CreateTaskDraft = Partial<BasicInfoFormValuesExtended>;
