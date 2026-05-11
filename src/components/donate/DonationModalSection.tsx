'use client';

import React, { JSX } from 'react';
import { DonationModal } from '@/components/ui/modals/DonationModal/DonationModal';
import { StripeProviderLazy } from '@/components/providers/StripeProviderLazy';
import { donationModalStore } from '@/zustand/stores/donationModalStore';
import { useShallow } from 'zustand/react/shallow';

export function DonationModalSection(): JSX.Element {
  const { isOpen, close } = donationModalStore(
    useShallow((s) => ({ isOpen: s.isOpen, close: s.close }))
  );

  return (
    <StripeProviderLazy>
      <DonationModal isOpen={isOpen} onClose={close} scrollable />
    </StripeProviderLazy>
  );
}
