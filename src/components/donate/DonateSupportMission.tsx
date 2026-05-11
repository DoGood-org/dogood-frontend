'use client';

import { useTranslations } from 'next-intl';
import { SupportMission } from '@/components/ui/SupportMission';
import { donationModalStore } from '@/zustand/stores/donationModalStore';

export function DonateSupportMission() {
  const t = useTranslations('donatePage');
  const open = donationModalStore((s) => s.open);

  return (
    <SupportMission
      href="#"
      description={t('supportMission.description')}
      onClick={open}
    />
  );
}
