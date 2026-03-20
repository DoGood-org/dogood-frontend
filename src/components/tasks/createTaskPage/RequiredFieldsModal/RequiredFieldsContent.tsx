'use client';

import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

interface FieldsMessageProps {
  onClose: () => void;
}

export const RequiredFieldsContent = ({
  onClose,
}: FieldsMessageProps): JSX.Element => {
  const t = useTranslations('tasks.createTask.validation');

  return (
    <section>
      <h2 className="text-h1 mb-2">{t('title')}</h2>
      <p className="text-base mb-6">{t('message')}</p>
      <div className="flex justify-center">
        <Button
          className="w-full md:w-auto md:min-w-[180px] px-6 whitespace-nowrap"
          variant="primary"
          onClick={onClose}
        >
          {t('backButton')}
        </Button>
      </div>
    </section>
  );
};
