'use client';

import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { UiSuccessMessage } from '@/components/ui/UiSuccessMessage';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { StepCard } from './StepCard';

export const CreateTaskSuccess = (): JSX.Element => {
  const router = useRouter();

  return (
    <Section className="flex flex-col items-center justify-center min-h-screen lg:mx-40">
      <UiSuccessMessage className="absolute -top-10 z-50 flex justify-start max-none" />
      <StepCard className="relative -top-34">
        <h2 className="text-h1 mb-2 text-center w-full lg:max-w-full">
          You&apos;ve successfully created your task!
        </h2>

        <p className="text-base mb-8 md:text-start lg:text-center">
          Your task will appear on the map after it has been verified by a
          moderator.
        </p>

        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={() => router.push('/support')}>
            Contact us
          </Button>

          <Button variant="primary" onClick={() => router.push('/')}>
            Go home
          </Button>
        </div>
      </StepCard>
    </Section>
  );
};
