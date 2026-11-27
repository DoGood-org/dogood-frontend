import { FilterOption } from '@/types/admin';

export const getUserRoleOptions = (
  t: (key: string) => string
): FilterOption[] => [
  { value: 'user', label: t('roleUser') },
  { value: 'admin', label: t('roleAdmin') },
  { value: 'moderator', label: t('roleModerator') },
];
