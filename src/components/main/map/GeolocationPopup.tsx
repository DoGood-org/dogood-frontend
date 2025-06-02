'use client';
import { Button } from '@/components/ui/Button';
import { IGeolocationPopupProps } from '@/types/mapType';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

export const GeolocationPopup: FC<IGeolocationPopupProps> = ({
  requestGeolocation,
  declineGeolocation,
}) => {
  const t = useTranslations('map');

  return (
    <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-base font-semibold mb-4">{t('popupTitle')}</h3>
        <p className="mb-4">{t('popupDescription')}</p>
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={declineGeolocation}
            className="btn-expand-hover"
          >
            {t('noBtn')}
          </Button>
          <Button
            variant="primary"
            onClick={requestGeolocation}
            className="btn-expand-hover text-base"
          >
            {t('yesBtn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
