import { ReactNode } from 'react';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { HostUser, OrganizationFromBack } from './tasks.type';

export enum TaskCategoryEnum {
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  Medicine = 'medicine',
  Donation = 'donation',
}

export interface CreateTaskProp {
  organizations: OrganizationFromBack[];
  currentUser: HostUser | null;
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

export type CreateTaskDraft = Partial<BasicInfoFormValues>;
