'use client';

import { JSX } from 'react';
import { EmptyContent } from '../EmptyContent';
import { useTranslations } from 'next-intl';
import { OrgJoinRequestCard } from './OrgJoinRequestCard';
import { Slider } from '@/components/ui/Slider';
import { useJoinRequests } from '@/hooks/useJoinRequests';

export const OrgJoinRequestSection = ({
  organizationId,
}: {
  organizationId: string;
}): JSX.Element => {
  const t = useTranslations('organization');

  const { joinRequests, approve, reject } = useJoinRequests(organizationId);

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{t('request.title')}</h2>
      {!joinRequests || !joinRequests.length ? (
        <EmptyContent>{t('noRequest')}</EmptyContent>
      ) : (
        <Slider
          items={joinRequests}
          itemsPerSlide={3}
          listClassName="gap-5"
          itemClassName="p-0"
          renderItem={(request, idx) => (
            <OrgJoinRequestCard
              key={`${idx}-${request.id}`}
              request={request}
              onApprove={approve}
              onReject={reject}
            />
          )}
        />
      )}
    </>
  );
};
