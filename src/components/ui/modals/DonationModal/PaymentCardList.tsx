'use client';

import { JSX, useEffect, useState } from 'react';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { useTranslations } from 'next-intl';
import { stripeService } from '@/services/stripeService';
import SvgPlus from '@/components/icons/Plus';
import { DonationCardPreview } from './DonationCardPreview';
import { PaymentMethodModal } from './PaymentMethodModal/PaymentMethodModal';
import { CardData } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { Scrollbox } from './Scrollbox';

interface PaymentCardListProps {
  scrollable?: boolean;
}

export const PaymentCardList = ({
  scrollable = true,
}: PaymentCardListProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const t = useTranslations('settings');
  const [cardsFromDB, setCardsFromDB] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { tempCards } = cardPreviewStore();

  const handleAddCard = (): void => {
    setOpen(true);
    setEditingId(null);
  };

  useEffect(() => {
    async function load(): Promise<void> {
      setIsLoading(true);
      try {
        const data = await stripeService.fetchUserCards();
        setCardsFromDB(data);
      } catch (err) {
        console.error('Failed to fetch cards from DB', err);
      } finally {
        setIsLoading(false);
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

  const editingCard = editingId
    ? mergedCards.find((c) => c.paymentMethodId === editingId) || null
    : null;

  const CardsList = (): JSX.Element => (
    <ul className="flex flex-col gap-3">
      {mergedCards.map((card) => (
        <DonationCardPreview
          key={card.paymentMethodId}
          setEditingId={setEditingId}
          setOpen={setOpen}
          card={card}
          cardsFromDB={cardsFromDB}
          setCardsFromDB={setCardsFromDB}
        />
      ))}
    </ul>
  );

  return (
    <div className="space-y-2">
      {isLoading ? (
        <Spinner />
      ) : scrollable ? (
        <Scrollbox className="h-[166px]" viewportClassName="pr-2">
          <CardsList />
        </Scrollbox>
      ) : (
        <CardsList />
      )}

      <button
        className="text-btn hover:text-btn-hover flex gap-2 justify-center items-center cursor-pointer"
        onClick={handleAddCard}
      >
        <SvgPlus className="w-3 h-3 fill-[#2C8C8C]" />
        {t('payment.add')}
      </button>

      {open && (
        <PaymentMethodModal
          wrapperClassName="upper-modal"
          isOpen={open}
          onClose={() => setOpen(false)}
          editingCard={editingCard}
        />
      )}
    </div>
  );
};
