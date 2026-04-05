import { OrganizationRole, Permission, Role } from '@/types';

export const ROLE_CONFIG: {
  role: OrganizationRole;
  title: string;
}[] = [
  { role: 'ADMIN', title: 'Owner' },
  { role: 'MODERATOR', title: 'Moderators' },
  { role: 'MEMBER', title: 'Members' },
];

// type Role = OrganizationRole | 'USER';

export const ROLE_PERMISSIONS: Record<Exclude<Role, 'GUEST'>, Permission[]> = {
  ADMIN: [
    Permission.VIEW_MEMBERS,
    Permission.ADD_MEMBER,
    Permission.REMOVE_MEMBER,
    Permission.ADD_MODERATOR,
    Permission.REMOVE_MODERATOR,
    Permission.DISMISS_MODERATOR,
    Permission.VIEW_REQUESTS,
    Permission.APPROVE_REQUEST,
    Permission.DELETE_ORG,
    Permission.SEND_MESSAGE,
    Permission.CHANGE_ROLES,
  ],

  MODERATOR: [
    Permission.VIEW_MEMBERS,
    Permission.ADD_MEMBER,
    Permission.REMOVE_MEMBER,
    Permission.VIEW_REQUESTS,
    Permission.APPROVE_REQUEST,
    Permission.SEND_MESSAGE,
  ],

  MEMBER: [
    Permission.VIEW_MEMBERS,
    Permission.LEAVE_ORGANIZATION,
    Permission.SEND_MESSAGE,
    Permission.CHAT_TO_ORGANIZATION,
  ],

  USER: [
    Permission.VIEW_MEMBERS,
    Permission.JOIN_ORGANIZATION,
    Permission.CHAT_TO_ORGANIZATION,
    Permission.SEND_MESSAGE,
  ],
} as const;
