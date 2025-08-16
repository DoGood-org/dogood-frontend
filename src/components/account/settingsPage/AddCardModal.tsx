'use client';

import { JSX, useEffect, useState } from 'react';
import { CardForm, Modal } from '@/components';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { CardData } from '@/types';
import { useTranslations } from 'next-intl';

export type CardModalProps = {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  editingId: string | null;
  setEditingId: (arg0: string | null) => void;
};
export const AddCardModal = ({
  open,
  setOpen,
  editingId,
  setEditingId,
}: CardModalProps): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { tempCards, addCard, updateCard } = cardPreviewStore();
  const t = useTranslations('settings');

  // const handleSave = async (): Promise<void> => {
  //   // await api.saveCards(tempCards)
  //   // console.log('Saving cards:', tempCards);
  //   clearAll();
  //   setEditingId(null);
  // };

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): false | void => {
      if (e.key === 'Escape' && !isSubmitting) setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return (): void => document.removeEventListener('keydown', handleEsc);
  }, [isSubmitting, setOpen]);

  return (
    <>
      {open && (
        <Modal
          isOpen={open}
          onClose={() => !isSubmitting && setOpen(false)}
          wrapperClassName="w-full max-w-[353px] md:max-w-[648px] lg:max-w-[976px] lg:translate-x-16 bg-card"
          buttonClassName=""
        >
          <h3 className="text-center mx-auto text-base mb-3">
            {t('payment.title')}
          </h3>

          <CardForm
            initialValues={initialValues}
            onSuccess={handleSuccess}
            setIsSubmitting={setIsSubmitting}
          />
        </Modal>
      )}
    </>
  );
};
