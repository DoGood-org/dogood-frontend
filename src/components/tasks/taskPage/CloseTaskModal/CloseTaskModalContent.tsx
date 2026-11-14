'use client';

import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

interface CloseTaskModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const CloseTaskModalContent = ({
  onClose,
  onConfirm,
  isLoading = false,
  error = null,
}: CloseTaskModalContentProps): JSX.Element => {
  const t = useTranslations('tasks.closeTaskModal');

  return (
    <section>
      <h2 className="text-h1 mb-2">{t('title')}</h2>
      <p className="text-base mb-3">{t('message')}</p>

      {error && (
        <p role="alert" className="text-base text-error">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 md:flex-row md:justify-center">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
          {t('buttons.confirm')}
        </Button>
      </div>
    </section>
  );
};
