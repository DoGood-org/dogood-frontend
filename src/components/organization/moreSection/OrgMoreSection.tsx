import { JSX } from 'react';
import { useTranslations } from 'next-intl';
import { EmptyContent } from '../EmptyContent';
import { useUserRole } from '@/components/providers/UserRoleProvider';
import { useOrgSectionTitle } from '@/hooks/useOrgSectionTitle';

export const OrgMoreSection = ({ info }: { info?: string }): JSX.Element => {
  const t = useTranslations('organization');

  const role = useUserRole();

  const title = useOrgSectionTitle(role, 'more');

  return (
    <>
      <h2 className="text-h2-m lg:text-h2">{title}</h2>

      {!info ? (
        <EmptyContent>{t('noInfo')}</EmptyContent>
      ) : (
        // TODO ----------------
        <p className="whitespace-pre-line">{info}</p>
        // ----------------------
      )}
    </>
  );
};
