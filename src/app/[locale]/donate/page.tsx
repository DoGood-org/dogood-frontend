import DonateHero from '@/components/donate/DonateHero';
import DonateSteps from '@/components/donate/DonateSteps';
import MetricsSection from '@/components/donate/MetricsSection';
import WhySupportMatters from '@/components/donate/WhySupportMatters';
import React from 'react';

const DonatePage: React.FC = () => {
  return (
    <>
      <DonateHero />
      <DonateSteps />
      <MetricsSection />
      <WhySupportMatters />
    </>
  );
};

export default DonatePage;
