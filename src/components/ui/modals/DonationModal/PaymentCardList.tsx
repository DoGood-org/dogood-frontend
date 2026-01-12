'use client';

import { JSX, useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { useTranslations } from 'next-intl';
import { stripeService } from '@/services/stripeService';
import SvgPlus from '@/components/icons/Plus';
import { DonationCardPreview } from './DonationCardPreview';
import { PaymentMethodModal } from './PaymentMethodModal/PaymentMethodModal';
import { CardData } from '@/types';
import { Spinner } from '@/components/ui/Spinner';

export const PaymentCardList = (): JSX.Element => {
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

  return (
    <div className="space-y-2">
      {isLoading ? (
        <Spinner />
      ) : (
        <ScrollArea.Root className="h-[166px] w-full">
          <ScrollArea.Viewport className="h-full w-full pr-2">
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
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="scrollbar-vertical flex select-none touch-none p-0.5 
            bg-[#ffffff] shadow-inner
            data-[orientation=vertical]:w-2.5 
            data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb
              className="flex-1 bg-[#7A7A7A7A] rounded-[10px] relative 
              before:content-[''] before:absolute before:top-1/2 before:left-1/2 
              before:-translate-x-1/2 before:-translate-y-1/2 
              before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      )}

      <button
        className="text-btn hover:text-btn-hover flex gap-2 justify-center items-center 
        align-middle cursor-pointer"
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
