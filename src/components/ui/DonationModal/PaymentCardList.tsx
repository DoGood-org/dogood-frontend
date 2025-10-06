'use client';

import { JSX, useEffect, useState } from 'react';
import {
  CardPreview,
  DonationForm,
  DonationModal,
  StripeProvider,
} from '@/components';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { SetPlus } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { stripeService } from '@/services/stripeService';
import { useMenuToggle } from '@/hooks/useMenuToggle';

const AddPaymentMethodButton = ({
  onClick,
  translationText,
}: {
  onClick: () => void;
  translationText: string;
}): JSX.Element => (
  <button
    className="text-teal-600 hover:text-teal-700 flex gap-1 justify-start items-center cursor-pointer font-medium mt-2" // Використовую колір схожий на кнопку "Donate" (teal/бірюзовий)
    onClick={onClick}
  >
    <SetPlus className="w-5 h-5" />
    {translationText}
  </button>
);

export const PaymentCardList = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [_editingId, setEditingId] = useState<string | null>(null);
  const t = useTranslations('settings');
  const [cardsFromDB, setCardsFromDB] = useState<any[]>([]);
  const { tempCards } = cardPreviewStore();

  const { isOpen: isModalOpen, closeMenu: closeModal } = useMenuToggle();

  const handleAddCard = (): void => {
    setOpen(true);
    setEditingId(null);
  };

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const data = await stripeService.fetchUserCards();
        setCardsFromDB(data);
      } catch (err) {
        console.error('Failed to fetch cards from DB', err);
      }
    }
    load();
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

  return (
    <div className="space-y-2">
      <ul className="flex flex-col gap-3 overflow-y-auto pr-2">
        {mergedCards.map((card) => (
          <CardPreview
            key={card.paymentMethodId}
            setEditingId={setEditingId}
            setOpen={setOpen}
            card={card}
            cardsFromDB={cardsFromDB}
            setCardsFromDB={setCardsFromDB}
          />
        ))}

        <li>
          <AddPaymentMethodButton
            onClick={handleAddCard}
            translationText={t('payment.addPaymentMethod')}
          />
        </li>
      </ul>

      {open && (
        <DonationModal isOpen={isModalOpen} onClose={closeModal}>
          <StripeProvider>
            <DonationForm onSuccess={closeModal} setIsSubmitting={() => {}} />
          </StripeProvider>
        </DonationModal>
      )}
    </div>
  );
};
