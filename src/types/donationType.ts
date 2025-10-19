import { CardData } from '@/types';

export type DonationData = CardData & {
  amount: number;
  currency: 'USD' | 'EUR';
  donationType: DonationType;
};

export interface DonationFormValues {
  fullName: string;
  city: string;
  country: string;
  amount: number;
  currency: 'USD' | 'EUR';
  donationType: DonationType;
}

export interface DonationFormProps {
  onSuccess: (data: CardData) => void;
  initialValues?: Partial<DonationFormValues>;
  setIsSubmitting: (value: boolean) => void;
}

export type DonationType = 'USER' | 'ORGANIZATION';
