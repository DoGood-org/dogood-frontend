import { fetchFromApi } from '@/lib/apiFetcher';
import { DonationFormValues } from '@/types/donationType';

export const createCheckoutSession = async (
  data: DonationFormValues
): Promise<{ sessionId: string }> => {
  return fetchFromApi<{ sessionId: string }>(
    '/donate/create-checkout-session',
    {
      method: 'POST',
      data,
      auth: true,
    }
  );
};
