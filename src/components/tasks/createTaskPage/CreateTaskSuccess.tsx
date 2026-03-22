'use client';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { UiSuccessMessage } from '@/components/ui/UiSuccessMessage';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { StepCard } from './StepCard';
import { useTranslations } from 'next-intl';

export const CreateTaskSuccess = (): JSX.Element => {
  const router = useRouter();

  const t = useTranslations('tasks.createTask.success');

  const handleGoHome = (): void => {
    router.push('/');
  };

  return (
    <Section className="flex flex-col items-center justify-center">
      <UiSuccessMessage className="relative top-[-80px] z-50 flex justify-start max-none" />
      <StepCard className="z-10 relative top-[-180px] ">
        <h2 className="text-h1 mb-2 text-center w-full lg:max-w-full">
          {t('title')}
        </h2>

        <p className="text-base mb-8 md:text-start lg:text-center">
          {t('description')}
        </p>

        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={() => router.push('/support')}>
            {t('contactUs')}
          </Button>

          <Button variant="primary" onClick={handleGoHome}>
            {t('goHome')}
          </Button>
        </div>
      </StepCard>
    </Section>
  );
};
