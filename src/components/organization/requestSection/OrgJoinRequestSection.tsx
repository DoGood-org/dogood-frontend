'use client';

import { JSX } from 'react';
import { EmptyContent } from '../EmptyContent';
import { IJoinRequests } from '@/types/joinRequest.type';
import { useTranslations } from 'next-intl';
import { OrgJoinRequestCard } from './OrgJoinRequestCard';
import { Slider } from '@/components/ui/Slider';

type Props = {
  data: IJoinRequests[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
};

export const OrgJoinRequestSection = ({
  data,
  onApprove,
  onReject,
}: Props): JSX.Element => {
  const t = useTranslations('organization');

  console.log(data);

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{t('request.title')}</h2>
      {!data || !data.length ? (
        <EmptyContent>{t('noRequest')}</EmptyContent>
      ) : (
        <Slider
          items={data}
          itemsPerSlide={3}
          listClassName="gap-5"
          itemClassName="p-0"
          renderItem={(request, idx) => (
            <OrgJoinRequestCard
              key={`${idx}-${request.id}`}
              request={request}
              onApprove={onApprove}
              onReject={onReject}
            />
          )}
        />
      )}
    </>
  );
};
