import { FilterOption } from '@/types/admin';

export const getUserStatusOptions = (
  t: (key: string) => string
): FilterOption[] => [
  { value: 'active', label: t('allUsers') },
  { value: 'blocked', label: t('blockedUsers') },
];
