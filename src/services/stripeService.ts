import { fetcher } from '@/lib/fetcher';
import { stripeRequest } from '@/lib/stripeRequest';
import { CardData } from '@/types';
import { mockUser } from '@/data/mockUser';

export const stripeService = {
  attachPaymentMethod(params: {
    customerId: string;
    paymentMethodId: string;
  }): Promise<void> {
    return stripeRequest<void>(
      fetcher.post('/api/attach-payment-method', params),
      () => undefined
    );
  },

  detachPaymentMethod(paymentMethodId: string): Promise<void> {
    return stripeRequest<void>(
      fetcher.delete(`/api/payment-method/${paymentMethodId}`),
      () => undefined
    );
  },

  updatePaymentMethod(
    paymentMethodId: string,
    billingDetails: {
      name?: string;
      address?: { city?: string; country?: string };
    }
  ): Promise<CardData> {
    return stripeRequest<CardData>(
      fetcher.patch(`/api/payment-method/${paymentMethodId}`, {
        billing_details: billingDetails,
      })
    );
  },

  fetchUserCards(): Promise<CardData[]> {
    return stripeRequest<CardData[]>(fetcher.get('/api/user-payment-methods'));
  },

  getOrCreateCustomer(): Promise<string> {
    const user = mockUser; // замінити коли буде реальний бек
    return stripeRequest<string>(
      fetcher.post('/api/create-customer', {
        name: user.name,
        email: user.email,
      }),
      (data) => data.customerId as string
    );
  },

  getPaymentMethod(methodId: string): Promise<any> {
    return stripeRequest<any>(fetcher.get(`/api/payment-method/${methodId}`));
  },

  createSetupIntent(): Promise<{ client_secret: string }> {
    return stripeRequest<{ client_secret: string }>(
      fetcher.post('/api/setup-intent')
    );
  },
};
