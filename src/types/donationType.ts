import { CardData } from '@/types';

export type DonationData = CardData & {
  amount: number;
  currency: 'USD' | 'EUR' | string;
};
