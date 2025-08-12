'use client';

import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { Dispatch, JSX, SetStateAction } from 'react';
import { Button, cardIcons } from '@/components';
import { useTranslations } from 'next-intl';
import { CardPreviewService } from '@/zustand/services/cardPreviewService';
import { CardData } from '@/types';

type CardPreviewProps = {
  setEditingId: (paymentMethodId: string) => void;
  setOpen: (arg0: boolean) => void;
  card: CardData;
  cardsFromDB: any[];
  setCardsFromDB: Dispatch<SetStateAction<any[]>>;
};

export const CardPreview = ({
  setEditingId,
  setOpen,
  card,
  cardsFromDB,
  setCardsFromDB,
}: CardPreviewProps): JSX.Element => {
  const { deleteCard } = cardPreviewStore();
  const t = useTranslations('card');

  const handleDelete = (cardId: string, isStripeCard: boolean): void => {
    if (confirm(`${t('confirmDelete')}`)) {
      CardPreviewService.delete(cardId, isStripeCard)
        .then(() => {
          console.log('Card deleted');
          setCardsFromDB((prev) =>
            prev.filter((card) => card.paymentMethodId !== cardId)
          );
          deleteCard(cardId);
        })
        .catch((err) => console.error(err));
    }
  };

  const Icon = cardIcons[card?.brand ?? ''] ?? cardIcons.default;
  const formattedExpiry = `${String(card.exp_month).padStart(2, '0')}/${String(card.exp_year).slice(-2)}`;
  const isStripeCard = cardsFromDB.some(
    (dbCard) => dbCard.paymentMethodId === card.paymentMethodId
  );

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
          className="text-black text-base hover:text-error p-0 h-6"
          type="button"
          onClick={() => handleDelete(card.paymentMethodId, isStripeCard)}
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
};
