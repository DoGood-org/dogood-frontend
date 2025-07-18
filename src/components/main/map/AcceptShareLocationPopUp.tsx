'use client';
import { Button } from '@/components/ui/Button';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useTranslations } from 'next-intl';
import React, { JSX } from 'react';

export const AcceptShareLocationPopUp = (): JSX.Element => {
  const t = useTranslations('map');
  const { acceptLocationSharing, declineLocationSharing } = useMapStore();

  return (
    <div className="bg-background text-foreground p-4 rounded-lg shadow-lg max-w-md w-full mx-4">
      <h3 className="text-base font-semibold mb-4">{t('popupTitle')}</h3>
      <p className="mb-4">{t('popupDescription')}</p>
      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={declineLocationSharing}
          className="btn-expand-hover"
        >
          {t('noBtn')}
        </Button>
        <Button
          variant="primary"
          onClick={acceptLocationSharing}
          className="btn-expand-hover text-base"
        >
          {t('yesBtn')}
        </Button>
      </div>
    </div>
  );
};
