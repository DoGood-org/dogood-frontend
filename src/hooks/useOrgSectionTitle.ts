import { isAdminOrModerator } from '@/lib/getUserRole';
import { Role } from '@/types';
import { useTranslations } from 'next-intl';

export const useOrgSectionTitle = (role: Role, section: string): string => {
  const t = useTranslations('organization');
  const adminRole = isAdminOrModerator(role);

  const title = adminRole
    ? `${t(`${section}.title`)}`
    : `${t(`${section}.userTitle`)}`;

  return title;
};
