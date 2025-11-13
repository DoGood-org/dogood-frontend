'use client';
import React, { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import EditIcon from '@/components/icons/EditIcon';
import { PaymentSuccessModal } from '@/components/ui/modals/DonationModal/PaymentSuccessModal/PaymentSuccessModal';

interface EditButtonProps {
  onClick: () => void;
}

// interface EditButtonProps {
//   onClick?: () => void; // необовʼязково, ти можеш прибрати якщо не треба
// }

const EditButton = ({ onClick }: EditButtonProps): JSX.Element => {
  const t = useTranslations('tasks');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => {
    setIsOpen(true);
    onClick?.();
  };
  return (
    <>
      <Button
        variant="iconOnly"
        size="icon"
        onClick={handleClick}
        className="flex items-center gap-1 md:gap-3 cursor-pointe md:pl-10"
      >
        <EditIcon className="size-6" />
        <span className="text-base">{t('taskDetails.edit')}</span>
      </Button>
      <PaymentSuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditButton;
