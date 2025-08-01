import { Stripe, StripeElements } from '@stripe/stripe-js';
import {
  attachPaymentMethod,
  createSetupIntent,
  getOrCreateCustomer,
  getPaymentMethod,
} from '../api';

export async function createCardPaymentMethod({
  stripe,
  elements,
  billingDetails,
}: {
  stripe: Stripe;
  elements: StripeElements;
  billingDetails: {
    name: string;
    address: { city: string; country: string };
  };
}): Promise<any> {
  const cardElement = elements.getElement('cardNumber');
  if (!cardElement) throw new Error('Card element not found');

  // 1. Отримуємо customerId з API
  const customerId = await getOrCreateCustomer();

  // 2. Створюємо SetupIntent
  const { client_secret } = await createSetupIntent();
  const { setupIntent, error } = await stripe.confirmCardSetup(client_secret, {
    payment_method: {
      card: cardElement,
      billing_details: billingDetails,
    },
  });

  if (error) throw new Error(error.message);

  // 3. Отримуємо деталі платіжного методу
  const method = await getPaymentMethod(setupIntent.payment_method as string);

  // 4. Прив’язуємо метод до кастомера
  await attachPaymentMethod({
    customerId,
    paymentMethodId: method.id,
  });
  // await fetch('/api/attach-payment-method', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     customerId,
  //     paymentMethodId: method.id,
  //   }),
  // });

  // 5. Зберігаємо картку в zustand
  // if (method?.card) {
  //   CardPreviewService.storeCardWithAutoClear({
  //     paymentMethodId: method.id,
  //     brand: method.card.brand ?? '',
  //     last4: method.card.last4 ?? '',
  //     exp_month: method.card.exp_month ?? 0,
  //     exp_year: method.card.exp_year ?? 0,
  //     fullName: billingDetails.name,
  //     city: billingDetails.address.city,
  //     country: billingDetails.address.country,
  //   });
  // }

  return method;
}
