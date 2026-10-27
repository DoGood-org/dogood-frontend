'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { JSX } from 'react';
import { ModalWrapper } from '@/components/ui/ModalWrapper';
import { ModalCloseButton } from '@/components/ui/ModalCloseButton';
import { useAuthModalStore } from '@/zustand/stores/authModalStore';
import { useTranslations } from 'next-intl';

export const AuthRequiredModal = (): JSX.Element => {
  const router = useRouter();
  const t = useTranslations('map');

  const isOpen = useAuthModalStore((s) => s.isOpen);
  const onClose = useAuthModalStore((s) => s.close);

  const goTo = (path: string): void => {
    onClose();
    router.push(path);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      wrapperClassName="max-w-[360px] max-h-[90vh] overflow-y-auto p-5 pt-12 sm:p-6 sm:pt-10 text-center bg-background-secondary"
      backdropClassName="bg-black/50 backdrop-blur-sm !z-[1100]"
    >
      <ModalCloseButton
        onClick={onClose}
        className="right-2 top-2 p-2 sm:right-4 sm:top-4 sm:p-0 text-[#fffcfc]"
      />

      <h2 className="mb-5 text-base font-medium text-[#fffcfc] sm:mb-6 sm:text-lg">
        {t('loginToJoin')}
      </h2>

      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <Button
          variant="primary"
          size="lg"
          className="text-white w-full sm:max-w-[200px]"
          onClick={() => goTo('/login')}
        >
          {t('login')}
        </Button>

        <p className="text-base text-[#fffcfc]">
          {t('noAccount')}{' '}
          <Button
            type="button"
            variant="ghost"
            className="h-auto px-0 py-2 align-baseline text-sm underline text-[#fffcfc]"
            onClick={() => goTo('/register')}
          >
            {t('register')}
          </Button>
        </p>
      </div>
    </ModalWrapper>
  );
};
