'use client';

import { JSX, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { StyledCardForm } from './StyledCardForm';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { CardData } from '@/types';
import { cardPreviewStore } from '@/zustand/stores/cardPreviewStore';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
  editingCard?: CardData | null;
}

export const PaymentMethodModal = ({
  isOpen,
  onClose,
  wrapperClassName = '',
  editingCard = null,
}: PaymentMethodModalProps): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCard, updateCard } = cardPreviewStore();

  const handleSuccess = (card: CardData): void => {
    setIsSubmitting(false);
    if (editingCard?.paymentMethodId) {
      updateCard(editingCard.paymentMethodId, card);
    } else {
      addCard(card);
    }
    onClose();
  };

  const initialFormValues = editingCard
    ? {
        fullName: editingCard.fullName || '',
        country: editingCard.country || '',
        city: editingCard.city || '',
      }
    : undefined;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return (): void => document.removeEventListener('keydown', handleEsc);
  }, [isSubmitting, onClose]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => !isSubmitting && onClose()}
      wrapperClassName={cn(
        'relative max-w-[354px] md:max-w-[574px] lg:max-w-[994px] p-5 md:p-9',
        wrapperClassName
      )}
    >
      <ModalCloseButton
        onClick={() => !isSubmitting && onClose()}
        className="top-5
            right-5  md:top-9 md:right-9"
      />

      <StyledCardForm
        onSuccess={handleSuccess}
        setIsSubmitting={setIsSubmitting}
        initialValues={initialFormValues}
      />
    </ModalWrapper>
  );
};
