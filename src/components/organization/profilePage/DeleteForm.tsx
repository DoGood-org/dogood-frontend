'use client';
import { Button } from '@/components/ui/Button';
import { ModalControls } from '@/types/userReviewsType';
import { useTranslations } from 'next-intl';
import React from 'react';

const DeleteForm: React.FC<ModalControls> = ({ isOpen, setIsOpen }) => {
  const handleDelOrg = (): void => {};
  const t = useTranslations('settings');
  return (
    <div className="bg-card rounded-xl py-6">
      <div className="px-6">
        <h2 className="text-h2-m mb-3">{t('titleDelModal')}</h2>
        <p className="mb-6">{t('descrDelModal')}</p>
      </div>
      <div className="flex justify-between px-4">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="px-6"
        >
          {t('cancelBtn')}
        </Button>
        <Button
          variant="primary"
          onClick={() => handleDelOrg()}
          className="px-6"
        >
          {t('deleteBtn')}
        </Button>
      </div>
    </div>
  );
};

export default DeleteForm;
