'use client';

import { fetchUserCards } from '@/lib/api';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { JSX, useEffect, useState } from 'react';
import { cardIcons } from '@/components';
import { CardData } from '@/types';
import { useTranslations } from 'next-intl';

type CardPreviewProps = {
  setEditingId: (paymentMethodId: string) => void;
  setOpen: (arg0: boolean) => void;
};

export const CardPreview = ({
  setEditingId,
  setOpen,
}: CardPreviewProps): JSX.Element => {
  const [cardsFromDB, setCardsFromDB] = useState<any[]>([]);
  const { tempCards, deleteCard } = cardPreviewStore();
  const t = useTranslations('card');

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
  }, []);

  const mergedCards = [
    ...cardsFromDB,
    ...tempCards.filter(
      (tempCard) =>
        !cardsFromDB.some(
          (dbCard) => dbCard.paymentMethodId === tempCard.paymentMethodId
        )
    ),
  ];

  const deleteOnClick = (card: CardData): void => {
    if (confirm(`${t('confirmDelete')}`)) {
      deleteCard(card.paymentMethodId);
    }
  };

  return (
    <>
      {mergedCards.map((card) => {
        const Icon = cardIcons[card?.brand ?? ''] ?? cardIcons.default;
        const formattedExpiry = `${String(card.exp_month).padStart(2, '0')}/${String(card.exp_year).slice(-2)}`;
        return (
          <div
            key={card.paymentMethodId}
            className="border p-4 rounded-md bg-gray-50 text-sm mt-4"
          >
            <div className="flex gap-3">
              <Icon className="w-9 h-[26px] rounded-sm" />
              <div>
                <div className="flex gap-1">
                  <p className="capitalize">{card.brand}</p>
                  <span>****{card.last4}</span>
                </div>
                <p className="opacity-[0.5] mt-[6px]">
                  {t('cardPeriod')}: {formattedExpiry}
                </p>
              </div>
            </div>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => {
                  setEditingId(card.paymentMethodId);
                  setOpen(true);
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                {t('edit')}
              </button>
              <button
                onClick={() => deleteOnClick(card)}
                className="text-red-600 hover:underline text-sm"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
