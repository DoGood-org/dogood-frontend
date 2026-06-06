import DonateHero from '@/components/donate/DonateHero';
import DonateSteps from '@/components/donate/DonateSteps';
import MetricsSection from '@/components/donate/MetricsSection';
import WhySupportMatters from '@/components/donate/WhySupportMatters';
import { WhatPeopleSay } from '@/components/ui/globalReviews/WhatPeopleSay';
import { DonateSupportMission } from '@/components/donate/DonateSupportMission';
import { DonationModalSection } from '@/components/donate/DonationModalSection';
import React from 'react';

const DonatePage: React.FC = () => {
  return (
    <>
      <DonateHero />
      <DonateSteps />
      <DonateSupportMission />
      <MetricsSection />
      <WhySupportMatters />
      <WhatPeopleSay />
      <DonationModalSection />
    </>
  );
};

export default DonatePage;
