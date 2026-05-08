'use client';

import { JSX, useCallback, useState } from 'react';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { DonationForm } from './DonationForm';
import { PaymentSuccessModal } from './PaymentSuccessModal/PaymentSuccessModal';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
  isUpperModal?: boolean;
  scrollable?: boolean;
}

export const DonationModal = ({
  isOpen,
  onClose,
  wrapperClassName = '',
  scrollable = false,
}: DonationModalProps): JSX.Element => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations('card');

  const handleDonationSuccess = useCallback((): void => {
    setIsPaymentSuccessful(true);
  }, []);

  const handleSuccessModalClose = useCallback((): void => {
    setIsPaymentSuccessful(false);
    onClose();
  }, [onClose]);

  const handleCloseOnSubmitting = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);
  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        onClose={handleCloseOnSubmitting}
        backdropClassName={cn(
          'bg-black/50 backdrop-blur-sm',
          scrollable && 'items-start overflow-y-auto pt-20 md:pt-24 pb-4'
        )}
        wrapperClassName={cn(
          'max-w-[354px] md:max-w-[574px] lg:max-w-[994px] p-5 md:p-9 ',
          wrapperClassName
        )}
        ignoreSelectors={['.upper-modal']}
      >
        <ModalCloseButton
          onClick={handleCloseOnSubmitting}
          className="top-5 right-5 md:top-9 md:right-9"
        />
        <h2 className="mb-3 text-base text-center">{t('title')}</h2>
        <DonationForm
          onSuccess={handleDonationSuccess}
          setIsSubmitting={setIsSubmitting}
        />
      </ModalWrapper>
      {isPaymentSuccessful && (
        <PaymentSuccessModal
          isOpen={isPaymentSuccessful}
          onClose={handleSuccessModalClose}
          wrapperClassName="upper-modal"
        />
      )}
    </>
  );
};
