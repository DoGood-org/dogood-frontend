// // import { UserOrganization } from '@/types';
// import { JSX } from 'react';
// // import { useTranslations } from 'next-intl';
// import { EmptyContent } from '@/components/organization/EmptyContent';
// import { getJoinRequests } from '@/services/joinRequestService';
// // import { getTranslations } from 'next-intl/server';
// import { OrgJoinRequestClient } from './OrgJoinRequestClient';

// export const OrgJoinRequestSection = async ({
//   orgId,
// }: {
//   orgId: string;
// }): Promise<JSX.Element> => {
//   const result = await getJoinRequests(orgId);

//   if (!result.ok) {
//     return <EmptyContent>Something went wrong</EmptyContent>;
//   }

//   return <OrgJoinRequestClient data={result.data ?? []} />;
// };

'use client';

import { JSX } from 'react';
import { EmptyContent } from '../EmptyContent';
import { IJoinRequests } from '@/types/joinRequest.type';
import { useTranslations } from 'next-intl';

export const OrgJoinRequestSection = ({
  data,
}: {
  data: IJoinRequests[];
}): JSX.Element => {
  const t = useTranslations('organization');

  console.log(data);

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{t('request.title')}</h2>
      {data.length === 0 ? (
        <EmptyContent>{t('noRequest')}</EmptyContent>
      ) : (
        <ul>
          {data.map((req) => (
            <li key={req.id}>{req.sender?.email}</li>
          ))}
        </ul>
      )}
    </>
  );
};
