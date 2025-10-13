import { CardData } from '@/types';

export type DonationData = CardData & {
  amount: number;
  currency: 'USD' | 'EUR';
};

export interface DonationFormValues {
  fullName: string;
  city: string;
  country: string;
  amount: number;
  currency: 'USD' | 'EUR';
}

export interface DonationFormProps {
  onSuccess: (data: CardData) => void;
  initialValues?: Partial<DonationData>;
  setIsSubmitting: (value: boolean) => void;
}
