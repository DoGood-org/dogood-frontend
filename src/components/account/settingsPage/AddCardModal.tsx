'use client';

import { JSX, useEffect, useState } from 'react';
import { CardForm, CardPreview, StripeProvider } from '@/components';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';
import { CardData } from '@/types';

export const AddCardModal = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { tempCards, addCard, updateCard, clearAll } = cardPreviewStore();

  const handleSave = async (): Promise<void> => {
    // await api.saveCards(tempCards)
    // console.log('Saving cards:', tempCards);
    clearAll();
    setEditingId(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !isSubmitting) {
      setOpen(false);
    }
  };

  const editingCard = editingId
    ? tempCards.find((c) => c.paymentMethodId === editingId)
    : undefined;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): false | void => {
      if (e.key === 'Escape' && !isSubmitting) setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return (): void => document.removeEventListener('keydown', handleEsc);
  }, [isSubmitting]);

  return (
    <section>
      <StripeProvider>
        <button
          onClick={() => {
            setOpen(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Card
        </button>

        {open && (
          <div
            id="modal-overlay"
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-999"
          >
            <div className="bg-[#CFCFCF] p-6 rounded-lg max-w-md w-full relative">
              <button
                onClick={() => !isSubmitting && setOpen(false)}
                className="absolute top-2 right-2"
              >
                ×
              </button>

              <CardForm
                initialValues={
                  editingCard
                    ? {
                        fullName: editingCard.fullName,
                        country: editingCard.country,
                        city: editingCard.city,
                      }
                    : undefined
                }
                onSuccess={(card: CardData): void => {
                  if (editingId) {
                    updateCard(editingId, card);
                  } else {
                    addCard(card);
                  }
                  setEditingId(null);
                  setOpen(false);
                  setIsSubmitting(false);
                }}
                setIsSubmitting={setIsSubmitting}
              />
            </div>
          </div>
        )}
        <CardPreview setEditingId={setEditingId} setOpen={setOpen} />

        <button onClick={handleSave} className="btn-secondary mt-4">
          Save All
        </button>
      </StripeProvider>
    </section>
  );
};
