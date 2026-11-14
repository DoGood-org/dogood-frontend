'use client';

import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

interface FinishTaskModalContentProps {
  onClose: () => void;
  onConfirm: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export const FinishTaskModalContent = ({
  onClose,
  onConfirm,
  error = null,
  isLoading = false,
}: FinishTaskModalContentProps): JSX.Element => {
  const t = useTranslations('tasks');

  return (
    <section>
      <h2 className="text-h1 mb-2">{t('finishTaskModal.title')}</h2>
      <p className="text-base mb-3">{t('finishTaskModal.message')}</p>
      {error && (
        <p role="alert" className="text-base text-error">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:justify-center">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          {t('finishTaskModal.buttons.cancel')}
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
          {t('finishTaskModal.buttons.confirm')}
        </Button>
      </div>
    </section>
  );
};
