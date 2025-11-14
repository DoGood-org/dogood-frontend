'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'react-toastify';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';

export const ActionButtons = (): JSX.Element => {
  const router = useRouter();
  const t = useTranslations('tasks');

  const handleDownloadReceipt = (): void => {
    toast.success('Receipt download initialized!');
  };

  const handleGoHome = (): void => {
    router.push('/');
  };
  return (
    <div className="flex gap-3 justify-center items-center">
      <Button
        type="button"
        variant="secondary"
        onClick={handleDownloadReceipt}
        className="min-w-[158px] md:min-w-[205px] px-3 py-2 text-sm"
      >
        {t('paymentSuccess.downloadReceipt')}
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleGoHome}
        className="w-[150px]
        text-[#ffffff]
        md:w-[256px]"
      >
        {t('paymentSuccess.homePage')}
      </Button>
    </div>
  );
};
