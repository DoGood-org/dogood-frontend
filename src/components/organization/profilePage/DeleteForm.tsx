'use client';
import { Button } from '@/components/ui/Button';
import { deleteOrgProfile } from '@/services/profileOrgService';
import { DeleteModalControls } from '@/types/userReviewsType';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const DeleteForm: React.FC<DeleteModalControls> = ({
  orgId,
  isOpen,
  setIsOpen,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations('settings');

  const handleDelOrg = async (orgId: string): Promise<void> => {
    setIsDeleting(true);

    const response = await deleteOrgProfile(orgId);
    if (response.ok) {
      toast.success(t('successDel'));
    } else {
      toast.error(t('errorDel'));
    }
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
        <Button
          variant="primary"
          onClick={() => handleDelOrg(orgId)}
          disabled={isDeleting}
          className="px-6"
        >
          {t('deleteBtn')}
        </Button>
      </div>
    </div>
  );
};
