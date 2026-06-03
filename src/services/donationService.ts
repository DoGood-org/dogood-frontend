import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { DonationFormValues } from '@/types/donationType';

export const createCheckoutSession = async (
  data: DonationFormValues
): Promise<FetchResult<{ sessionId: string }>> => {
  return fetchFromApi<{ sessionId: string }>(
    '/donate/create-checkout-session',
    {
      method: 'POST',
      data,
    }
  );
};
