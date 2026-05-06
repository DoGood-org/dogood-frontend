'use client';

import DonateHero from '@/components/donate/DonateHero';
import DonateSteps from '@/components/donate/DonateSteps';
import MetricsSection from '@/components/donate/MetricsSection';
import WhySupportMatters from '@/components/donate/WhySupportMatters';
import { WhatPeopleSay } from '@/components/grantsPage/WhatPeopleSay';
import { SupportMission } from '@/components/ui/SupportMission';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const DonatePage: React.FC = () => {
  const t = useTranslations('donatePage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DonateHero onDonateClick={() => setIsModalOpen(true)} />
      <DonateSteps />
      <SupportMission
        href="#"
        description={t('supportMission.description')}
        onClick={() => setIsModalOpen(true)}
      />
      <MetricsSection />
      <WhySupportMatters />
      <WhatPeopleSay />
      <StripeProviderLazy>
        <DonationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          scrollable
        />
      </StripeProviderLazy>
    </>
  );
};

export default DonatePage;
