'use client';

import { Dispatch, JSX, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { CardData } from '@/types';
import { cardPreviewService } from '@/services/cardPreviewService';
import { cardIcons } from '@/components/account/settingsPage/PaymentModal/CardIcons';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type DonationCardPreviewProps = {
  setEditingId: (paymentMethodId: string) => void;
  setOpen: (arg0: boolean) => void;
  card: CardData;
  cardsFromDB: any[];
  setCardsFromDB: Dispatch<SetStateAction<any[]>>;
  isSelected: boolean;
  onSelect: (paymentMethodId: string) => void;
  onDeleteSuccess: (paymentMethodId: string) => void;
};

export const DonationCardPreview = ({
  setEditingId,
  setOpen,
  card,
  cardsFromDB,
  setCardsFromDB,
  isSelected,
  onSelect,
  onDeleteSuccess,
}: DonationCardPreviewProps): JSX.Element => {
  const t = useTranslations('card');

  const handleDelete = async (
    cardId: string,
    isStripeCard: boolean
  ): Promise<void> => {
    if (!confirm(t('confirmDelete'))) return;
    try {
      await cardPreviewService.deleteRemote(cardId, isStripeCard);
      setCardsFromDB((prev) =>
        prev.filter((card) => card.paymentMethodId !== cardId)
      );
      onDeleteSuccess(cardId);
      console.log('Card deleted');
    } catch (err: any) {
      console.error(err?.message || err);
      alert(err?.message || 'Delete failed');
    }
  };

  const Icon = cardIcons[card?.brand ?? ''] ?? cardIcons.default;
  const formattedExpiry = `${String(card.exp_month).padStart(2, '0')}/${String(card.exp_year).slice(-2)}`;
  const isStripeCard = Array.isArray(cardsFromDB)
    ? cardsFromDB.some(
        (dbCard) => dbCard.paymentMethodId === card.paymentMethodId
      )
    : false;

  return (
    <li
      className={cn(
        'border-2 p-3 rounded-lg bg-[#FFFCFC] text-base w-full min-h-27.5 flex flex-col justify-between transition-all duration-200 hover:border-[#00C1AC] focus:border-[#00C1AC] focus:outline-none cursor-pointer',
        isSelected ? 'border-[#00C1AC]' : 'border-[#696969]'
      )}
      onClick={() => onSelect(card.paymentMethodId)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(card.paymentMethodId);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
    >
      <div className="flex gap-3 text-black">
        <div className="w-9 h-6.5 flex justify-center items-center">
          <Icon className="size-9 w-9 h-6.5 rounded-sm" />
        </div>
        <div>
          <div className="flex gap-1 text-black">
            <p className="capitalize">{card.brand}</p>
            <span>****{card.last4}</span>
          </div>
          <p className="opacity-[0.5] mt-1.5 text-wrap md:text-nowrap md:text-sm">
            {t('cardPeriod')}: {formattedExpiry}
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-between gap-4">
        <Button
          variant="ghost"
          className="text-black text-base hover:text-error p-0 h-6"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(card.paymentMethodId, isStripeCard);
          }}
        >
          {t('delete')}
        </Button>
        <Button
          variant="ghost"
          // size="xl"
          className="text-black text-base  hover:text-btn-hover p-0 h-6"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
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
