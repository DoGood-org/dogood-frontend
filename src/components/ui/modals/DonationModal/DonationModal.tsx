'use client';

import { JSX, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { CloseIcon } from '@/components/icons';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { DonationForm } from './DonationForm';
import { PaymentSuccessModal } from './PaymentSuccessModal/PaymentSuccessModal';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrapperClassName?: string;
}

export const DonationModal = ({
  isOpen,
  onClose,
  wrapperClassName = '',
}: DonationModalProps): JSX.Element => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [_isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations('card');

  const handleDonationSuccess = useCallback((): void => {
    onClose();

    setIsPaymentSuccessful(true);
  }, [onClose]);

  const handleSuccessModalClose = useCallback((): void => {
    setIsPaymentSuccessful(false);
  }, []);
  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        wrapperClassName={cn(
          'max-w-[354px] md:max-w-[574px] lg:max-w-[994px] p-5 md:p-9',
          wrapperClassName
        )}
      >
        <motion.button
          className="absolute top-4 right-4 cursor-pointer text_tag hover:text-[#696969] z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <CloseIcon className="w-6 h-6" />
        </motion.button>
        <h2 className="text-base mb-3 text-center">{t('title')}</h2>
        <DonationForm
          onSuccess={handleDonationSuccess}
          setIsSubmitting={setIsSubmitting}
        />
      </ModalWrapper>
      <PaymentSuccessModal
        isOpen={isPaymentSuccessful}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};
