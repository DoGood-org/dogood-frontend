'use client';

import { JSX, useEffect, useState } from 'react';
import { CardForm, CardPreview } from '@/components';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { CardData } from '@/types';
import Portal from '@/components/ui/portal/Portal';
import { SetPlus } from '@/components/icons';
import { useTranslations } from 'next-intl';
import Back from '@/components/icons/Back';

export const PaymentList = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('settings');

  const { tempCards, addCard, updateCard } = cardPreviewStore();

  // const handleSave = async (): Promise<void> => {
  //   // await api.saveCards(tempCards)
  //   // console.log('Saving cards:', tempCards);
  //   clearAll();
  //   setEditingId(null);
  // };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !isSubmitting) {
      setOpen(false);
    }
  };

  const editingCard = editingId
    ? tempCards.find((c) => c.paymentMethodId === editingId)
    : undefined;

  const initialValues = editingCard
    ? {
        fullName: editingCard.fullName,
        country: editingCard.country,
        city: editingCard.city,
      }
    : undefined;

  const handleSuccess = (card: CardData): void => {
    if (editingId) {
      updateCard(editingId, card);
    } else {
      addCard(card);
    }
    setEditingId(null);
    setOpen(false);
    setIsSubmitting(false);
  };

  const handleAddCard = (): void => {
    setOpen(true);
    setEditingId(null);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): false | void => {
      if (e.key === 'Escape' && !isSubmitting) setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return (): void => document.removeEventListener('keydown', handleEsc);
  }, [isSubmitting]);

  return (
    <div className="space-y-4 bg-text-help p-8 rounded-xl">
      <h3 className="text-h3 text-white">{t('payment.title')}</h3>
      <ul className="flex flex-col md:flex-row gap-6 md:overflow-x-auto whitespace-nowrap custom-scrollbar payment-scrollbar pb-4">
        <CardPreview setEditingId={setEditingId} setOpen={setOpen} />

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
        <Portal>
          <div
            id="modal-overlay"
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999"
          >
            <div className="bg-map-btn p-6 rounded-lg max-w-md w-full relative">
              <button
                onClick={() => !isSubmitting && setOpen(false)}
                className="text-current flex items-center pr-2 cursor-pointer group absolute t-6 r-6"
                aria-label="Back"
                type="button"
              >
                <Back className="w-5 h-5 text-bg-icon mr-2 group-hover:text-btn-hover group-active:text-btn-active" />
                <span className="text-base text-foreground group-hover:text-btn-hover group-active:text-btn-active">
                  {t('payment.back')}
                </span>
              </button>
              <h3 className="text-center mx-auto text-base mb-3">
                {t('payment.title')}
              </h3>
              <CardForm
                initialValues={initialValues}
                onSuccess={handleSuccess}
                setIsSubmitting={setIsSubmitting}
              />
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
