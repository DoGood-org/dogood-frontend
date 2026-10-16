'use client';

import { Button } from '@/components/ui/Button';
import { DeleteModalControls } from '@/types/userReviewsType';
import { useTranslations } from 'next-intl';
import React, { JSX, useState } from 'react';

export const DeleteReviewForm: React.FC<DeleteModalControls> = ({
  revId,
  isOpen,
  setIsOpen,
}): JSX.Element => {
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations('adminReviews');

  const handleDelRev = async (revId: string): Promise<void> => {
    setIsDeleting(true);
    console.log('Deleting review with ID:', revId);
    //Add logic for deleting review here
  };
  return (
    <div className="bg-card rounded-xl py-6">
      <div className="px-6">
        <h2 className="text-h2-m mb-3">{t('titleDelModal')}</h2>
        <p className="mb-6">{t('descrDelModal')}</p>
      </div>
      <div className="flex justify-between px-4 md:justify-center md:gap-3">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="px-6"
        >
          {t('cancelBtn')}
        </Button>
        {revId && (
          <Button
            variant="primary"
            onClick={() => handleDelRev(revId)}
            disabled={isDeleting}
            className="px-6"
          >
            {t('deleteBtn')}
          </Button>
        )}
      </div>
    </div>
  );
};
