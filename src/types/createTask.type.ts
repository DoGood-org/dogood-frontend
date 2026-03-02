import { ReactNode } from 'react';
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
  isOrganization: boolean;
  organizationId: string | null;
};

export type CreateTaskDraft = Partial<BasicInfoFormValuesExtended>;
