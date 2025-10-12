'use client';

import { JSX, useEffect, useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { DonationCardPreview } from '@/components';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { useTranslations } from 'next-intl';
import { stripeService } from '@/services/stripeService';
import { PaymentMethodModal } from '@/components';
import SvgPlus from '@/components/icons/Plus';

export const PaymentCardList = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [_editingId, setEditingId] = useState<string | null>(null);
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
          className="scrollbar-vertical flex select-none touch-none p-0.5 bg-[#E8E8E8]-100/50 
          transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 
          data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-[#7A7A7A] rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>

      <button
        className="text-btn hover:text-btn-hover flex gap-2 justify-center items-center 
        align-middle cursor-pointer"
        onClick={handleAddCard}
      >
        <SvgPlus className="w-3 h-3 fill-[#2C8C8C]" />
        {t('payment.add')}
      </button>

      {open && (
        <PaymentMethodModal isOpen={open} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};
