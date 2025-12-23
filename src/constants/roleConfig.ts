import { OrganizationRole } from '@/types';

export const ROLE_CONFIG: {
  role: OrganizationRole;
  title: string;
}[] = [
  { role: 'ADMIN', title: 'Owner' },
  { role: 'MODERATOR', title: 'Moderators' },
  { role: 'MEMBER', title: 'Members' },
];
