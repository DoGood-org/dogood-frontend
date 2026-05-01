import DonateHero from '@/components/donate/DonateHero';
import DonateSteps from '@/components/donate/DonateSteps';
import MetricsSection from '@/components/donate/MetricsSection';
import WhySupportMatters from '@/components/donate/WhySupportMatters';
import { WhatPeopleSay } from '@/components/grantsPage/WhatPeopleSay';
import { SupportMission } from '@/components/ui/SupportMission';
import { useTranslations } from 'next-intl';
import React from 'react';

const DonatePage: React.FC = () => {
  const t = useTranslations('donatePage');
  return (
    <>
      <DonateHero />
      <DonateSteps />
      <SupportMission href="#" description={t('supportMission.description')} />
      <MetricsSection />
      <WhySupportMatters />
      <WhatPeopleSay />
    </>
  );
};

export default DonatePage;
