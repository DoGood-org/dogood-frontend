import { UserOrganization } from '@/types';
import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyContent } from '../EmptyContent';

export const OrgJoinRequestSection = ({
  members,
}: {
  members: UserOrganization[];
}): JSX.Element => {
  const t = useTranslations('organization');

  const pendingMembers = members.filter(
    (member) => member.status === 'PENDING'
  );

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{t('request.title')}</h2>

      {!!pendingMembers.length ? (
        <EmptyContent>{t('noRequest')}</EmptyContent>
      ) : (
        // ---------change this code ------
        <p>Count of members - {pendingMembers.length}</p>
        // ----------------------
      )}
    </>
  );
};
