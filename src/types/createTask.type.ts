import { ReactNode } from 'react';

export const enum TaskCategoryEnum {
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
