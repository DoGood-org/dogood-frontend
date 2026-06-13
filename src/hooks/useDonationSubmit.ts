'use client';

import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useTranslations } from 'next-intl';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createCheckoutSession } from '@/services/donationService';
import { DonationFormValues } from '@/types/donationType';
import { CardData } from '@/types';
import { DonationCardErrors } from '@/components/ui/modals/DonationModal/DonationCardDetailsSection';

type UseDonationSubmitParams = {
  cardCompletion: { number: boolean; expiry: boolean; cvc: boolean };
  setCardErrors: React.Dispatch<React.SetStateAction<DonationCardErrors>>;
  onSuccess: (card: CardData) => void;
  setIsSubmitting: (value: boolean) => void;
};

export const useDonationSubmit = ({
  cardCompletion,
  setCardErrors,
  onSuccess,
  setIsSubmitting,
}: UseDonationSubmitParams): SubmitHandler<DonationFormValues> => {
  const t = useTranslations('card');
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit: SubmitHandler<DonationFormValues> = async (data) => {
    const selectedPaymentMethodId = data.selectedPaymentMethodId?.trim();
    const hasSelectedPaymentMethod = Boolean(selectedPaymentMethodId);

    if (!stripe || (!elements && !hasSelectedPaymentMethod)) {
      toast.error(t('checkout.paymentUnavailable'));
      return;
    }

    if (
      !hasSelectedPaymentMethod &&
      (!cardCompletion.number || !cardCompletion.expiry || !cardCompletion.cvc)
    ) {
      setCardErrors((prev) => ({
        number: cardCompletion.number
          ? prev.number
          : t('validation.cardNumberIncomplete'),
        expiry: cardCompletion.expiry
          ? prev.expiry
          : t('validation.cardExpiryIncomplete'),
        cvc: cardCompletion.cvc ? prev.cvc : t('validation.cardCvcIncomplete'),
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      let paymentMethodId = selectedPaymentMethodId || '';
      let paymentMethodCard: CardData['brand'] | null = null;
      let paymentMethodLast4 = '';
      let paymentMethodExpMonth = 0;
      let paymentMethodExpYear = 0;

      if (!hasSelectedPaymentMethod) {
        const cardElement = elements?.getElement(CardNumberElement);

        if (!cardElement) {
          toast.error(t('checkout.unexpectedError'));
          return;
        }

        const { paymentMethod, error: stripeError } =
          await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
              name: `${data.firstName} ${data.lastName}`.trim(),
              email: data.email,
              address: {
                line1: data.streetAddress || undefined,
                postal_code: data.postCode || undefined,
                country: data.country || undefined,
              },
            },
          });

        if (stripeError) {
          setCardErrors((prev) => ({
            ...prev,
            number: stripeError.message ?? t('checkout.unexpectedError'),
          }));
          return;
        }

        if (!paymentMethod?.card) {
          toast.error(t('checkout.unexpectedError'));
          return;
        }

        paymentMethodId = paymentMethod.id;
        paymentMethodCard = paymentMethod.card.brand ?? '';
        paymentMethodLast4 = paymentMethod.card.last4 ?? '';
        paymentMethodExpMonth = paymentMethod.card.exp_month ?? 0;
        paymentMethodExpYear = paymentMethod.card.exp_year ?? 0;
      }

      const response = await createCheckoutSession(data);

      if (!response.ok) {
        toast.error(t('checkout.errorCreateSession'));
        return;
      }

      if (!response.data?.sessionId) {
        toast.error(t('checkout.unexpectedError'));
        return;
      }

      onSuccess({
        paymentMethodId,
        brand: paymentMethodCard ?? '',
        last4: paymentMethodLast4,
        exp_month: paymentMethodExpMonth,
        exp_year: paymentMethodExpYear,
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        city: '',
        country: data.country || '',
      });

      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (err) {
      console.error('Unexpected error in checkout handler:', err);
      toast.error(t('checkout.unexpectedError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return onSubmit;
};
