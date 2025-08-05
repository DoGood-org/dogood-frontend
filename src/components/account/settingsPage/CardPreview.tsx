'use client';

import { fetchUserCards } from '@/lib/api';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { JSX, useEffect, useState } from 'react';
import { Button, cardIcons } from '@/components';
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
          <li
            key={card.paymentMethodId}
            className="border p-3 rounded-lg bg-gray-50 text-base w-[225px] md:min-w-[268px] lg:min-w-[284px] flex flex-col justify-between"
          >
            <div className="flex gap-3 text-black">
              <div className="w-9 h-[26px] flex justify-center items-center">
                <Icon className="size-9 w-9 h-[26px] rounded-sm" />
              </div>
              <div>
                <div className="flex gap-1 text-black">
                  <p className="capitalize">{card.brand}</p>
                  <span>****{card.last4}</span>
                </div>
                <p className="opacity-[0.5] mt-[6px] text-wrap md:text-nowrap md:text-sm">
                  {t('cardPeriod')}: {formattedExpiry}
                </p>
              </div>
            </div>
            <div className="mt-2 flex justify-between gap-4">
              <Button
                variant="ghost"
                // size="xl"
                className="text-black text-base hover:text-error p-0 h-6"
                type="button"
                onClick={() => deleteOnClick(card)}
                // className="text-red-600 hover:underline text-sm"
              >
                {t('delete')}
              </Button>
              <Button
                variant="ghost"
                // size="xl"
                className="text-black text-base  hover:text-btn-hover p-0 h-6"
                type="button"
                onClick={() => {
                  setEditingId(card.paymentMethodId);
                  setOpen(true);
                }}
              >
                {t('edit')}
              </Button>
            </div>
          </li>
        );
      })}
    </>
  );
};
