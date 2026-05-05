import { CardData } from '@/types';
import { InferType } from 'yup';
import { donationSchema } from '@/lib/validation/donationSchema';

export type DonationData = CardData & {
  amount: number;
  currency: 'USD' | 'EUR';
  donationType: DonationType;
};

export type DonationFormValues = InferType<typeof donationSchema>;

export interface DonationFormProps {
  onSuccess: (data: CardData) => void;
  initialValues?: Partial<DonationFormValues>;
  setIsSubmitting: (value: boolean) => void;
}

export type DonationType = 'USER' | 'ORGANIZATION' | 'PROJECT' | 'LINE';
