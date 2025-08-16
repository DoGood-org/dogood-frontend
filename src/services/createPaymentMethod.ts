import { Stripe, StripeElements } from '@stripe/stripe-js';
import { CardNumberElement } from '@stripe/react-stripe-js';
import { stripeService } from '@/services/stripeService';

export async function createCardPaymentMethod({
  stripe,
  elements,
  billingDetails,
}: {
  stripe: Stripe;
  elements: StripeElements;
  billingDetails: { name: string; address: { city: string; country: string } };
}): Promise<any> {
  const cardElement = elements.getElement(CardNumberElement);
  if (!cardElement) throw new Error('Card element not found');

  const customerId = await stripeService.getOrCreateCustomer();
  const { client_secret } = await stripeService.createSetupIntent();

  const { setupIntent, error } = await stripe.confirmCardSetup(client_secret, {
    payment_method: {
      card: cardElement,
      billing_details: billingDetails,
    },
  });
  if (error) throw new Error(error.message);

  const method = await stripeService.getPaymentMethod(
    setupIntent.payment_method as string
  );

  await stripeService.attachPaymentMethod({
    customerId,
    paymentMethodId: method.id,
  });

  return method;
}
