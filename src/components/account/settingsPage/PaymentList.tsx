'use client';

import { JSX, useEffect, useState } from 'react';
import { AddCardModal, CardPreview } from '@/components';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { SetPlus } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { fetchUserCards } from '@/lib/api/stripeApi';

export const PaymentList = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const t = useTranslations('settings');
  const [cardsFromDB, setCardsFromDB] = useState<any[]>([]);
  const { tempCards } = cardPreviewStore();

  const handleAddCard = (): void => {
    setOpen(true);
    setEditingId(null);
  };

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const data = await fetchUserCards();
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
    <div className="space-y-4 bg-text-help p-8 rounded-xl">
      <h3 className="text-h3 text-white">{t('payment.title')}</h3>
      <ul className="flex flex-col md:flex-row gap-6 md:overflow-x-auto whitespace-nowrap custom-scrollbar payment-scrollbar pb-4">
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

        <li className="w-[225px] md:min-w-[227px] lg:min-w-[284px] h-[126px] bg-white rounded-xl cursor-pointer flex justify-center items-center">
          <button
            className="text-btn hover:text-btn-hover flex gap-2 justify-center align-middle cursor-pointer"
            onClick={handleAddCard}
          >
            <SetPlus />
            {t('payment.add')}
          </button>
        </li>
      </ul>

      {open && (
        <AddCardModal
          open={open}
          setOpen={setOpen}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
};
