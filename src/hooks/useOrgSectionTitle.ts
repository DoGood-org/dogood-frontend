import { SECTION_TITLES } from '@/constants/orgSectionTitles';
import { Role } from '@/types';
import { useTranslations } from 'next-intl';

type OrgSection = keyof (typeof SECTION_TITLES)['ADMIN'];

export const useOrgSectionTitle = (role: Role, section: OrgSection): string => {
  const t = useTranslations('organization');

  const title = t(SECTION_TITLES[role][section]);

  return title;
};
