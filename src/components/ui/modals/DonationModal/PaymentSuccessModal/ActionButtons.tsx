'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from '@/i18n/navigation';
import { JSX } from 'react';

export const ActionButtons = (): JSX.Element => {
  const router = useRouter();

  const handleDownloadReceipt = (): void => {
    console.log('Ініціалізація завантаження квитанції...');
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
        className="w-[158px]
        md:w-[205px]"
      >
        Download a receipt
      </Button>
      <Button
        type="button"
        variant="primary"
        onClick={handleGoHome}
        className="w-[152px]
        text-[#ffffff]
        md:w-[256px]"
      >
        Home page
      </Button>
    </div>
  );
};
