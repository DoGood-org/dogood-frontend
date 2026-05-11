'use client';

import { JSX, useEffect, useState } from 'react';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { useTranslations } from 'next-intl';
import { stripeService as _stripeService } from '@/services/stripeService';
import SvgPlus from '@/components/icons/Plus';
import { DonationCardPreview } from './DonationCardPreview';
import { PaymentMethodModal } from './PaymentMethodModal/PaymentMethodModal';
import { CardData } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { useFormContext } from 'react-hook-form';
import { DonationFormValues } from '@/types/donationType';

export const PaymentCardList = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const tSettings = useTranslations('settings');
  const tCard = useTranslations('card');
  const [cardsFromDB, setCardsFromDB] = useState<CardData[]>([
    {
      paymentMethodId: 'pm_mock_1',
      brand: 'mastercard',
      last4: '0001',
      exp_month: 10,
      exp_year: 30,
      fullName: 'John Doe',
      city: '',
      country: 'US',
    },
    {
      paymentMethodId: 'pm_mock_2',
      brand: 'visa',
      last4: '4242',
      exp_month: 12,
      exp_year: 27,
      fullName: 'John Doe',
      city: '',
      country: 'US',
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const { tempCards } = cardPreviewStore();
  const { watch, setValue } = useFormContext<DonationFormValues>();
  const selectedPaymentMethodId = watch('selectedPaymentMethodId');

  const handleAddCard = (): void => {
    setOpen(true);
    setEditingId(null);
    setValue('selectedPaymentMethodId', '', { shouldDirty: true });
  };

  useEffect(() => {
    // TODO: remove mock and uncomment fetchUserCards when backend is ready
    setIsLoading(false);
    // async function load(): Promise<void> {
    //   setIsLoading(true);
    //   try {
    //     const data = await stripeService.fetchUserCards();
    //     setCardsFromDB(data);
    //   } catch (err) {
    //     console.error('Failed to fetch cards from DB', err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // load();
  }, [setCardsFromDB]);

  const mergedCards = [
    ...cardsFromDB,
    ...tempCards.filter(
      (tempCard) =>
        !cardsFromDB.some(
          (dbCard) => dbCard.paymentMethodId === tempCard.paymentMethodId
        )
    ),
  ];

  const editingCard = editingId
    ? mergedCards.find((c) => c.paymentMethodId === editingId) || null
    : null;

  const handleCardSelect = (paymentMethodId: string): void => {
    const nextValue =
      selectedPaymentMethodId === paymentMethodId ? '' : paymentMethodId;
    setValue('selectedPaymentMethodId', nextValue, { shouldDirty: true });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-base">{tCard('paymentMethod')}</h3>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-3">
          <button
            type="button"
            onClick={handleAddCard}
            className="border-2 border-dashed border-[#2C8C8C] rounded-lg p-3 w-full min-h-27.5 flex flex-col items-center justify-center gap-2 text-[#2C8C8C] hover:bg-[#2C8C8C]/5 transition-colors cursor-pointer"
          >
            <SvgPlus className="w-4 h-4 fill-[#2C8C8C]" />
            <span className="text-sm text-center">
              {tSettings('payment.add')}
            </span>
          </button>

          {mergedCards.map((card) => (
            <DonationCardPreview
              key={card.paymentMethodId}
              setEditingId={setEditingId}
              setOpen={setOpen}
              card={card}
              cardsFromDB={cardsFromDB}
              setCardsFromDB={setCardsFromDB}
              isSelected={selectedPaymentMethodId === card.paymentMethodId}
              onSelect={handleCardSelect}
              onDeleteSuccess={(cardId) => {
                if (selectedPaymentMethodId === cardId) {
                  setValue('selectedPaymentMethodId', '', {
                    shouldDirty: true,
                  });
                }
              }}
            />
          ))}
        </div>
      )}

      {open && (
        <StripeProviderLazy>
          <PaymentMethodModal
            wrapperClassName="upper-modal"
            isOpen={open}
            onClose={() => setOpen(false)}
            editingCard={editingCard}
          />
        </StripeProviderLazy>
      )}
    </div>
  );
};
