import React from 'react';
import { Section } from '../ui/Section';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';

export const BecameAVolunteer = (): React.JSX.Element => {
  const t = useTranslations('grantsPage');

  return (
    <Section>
      <div className="bg-dots border-[0.72px] border-btn-hover w-full p-5 md:p-9 lg:p-12 rounded-3xl">
        <h2 className="text-h2-m text-white mb-6 lg:mb-8 lg:text-h2 lg:w-213">
          {t('becomeVolunteer.title')}
        </h2>
        <Button
          variant="primary"
          className="w-full bg-btn-hover text-base lg:text-h3 md:w-49.5 lg:w-68.75"
        >
          {t('becomeVolunteer.volunteerBtn')}
        </Button>
      </div>
    </Section>
  );
};
