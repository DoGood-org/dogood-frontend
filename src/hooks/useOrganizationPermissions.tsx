// import { getUserRole } from '@/lib/getUserRole';
import { hasPermission } from '@/lib/hasPermission';
import { Permission, Role } from '@/types';

export type OrgPermissionProps = {
  // role: Role;
  has: (permission: Permission) => boolean;
  isAdmin: boolean;
  isModerator: boolean;
  canViewMembers: boolean;
  canAddMember: boolean;
  canRemoveMember: boolean;
  canAddModerator: boolean;
  canRemoveModerator: boolean;
  canDismissModerator: boolean;
  canViewRequests: boolean;
  canApproveRequest: boolean;
  canDeleteOrg: boolean;
  canLeaveOrg: boolean;
  canJoinOrg: boolean;
  canSendMessage: boolean;
  canChat: boolean;
  canChangeRoles: boolean;
};

export const useOrganizationPermissions = (
  // members: UserOrganization[]
  role: Role
): OrgPermissionProps => {
  // const role = getUserRole(members);

  const has = (permission: Permission): boolean =>
    hasPermission(role, permission);

  const isAdmin = role === 'ADMIN';
  const isModerator = role === 'MODERATOR';

  const canViewMembers = has(Permission.VIEW_MEMBERS);
  const canAddMember = has(Permission.ADD_MEMBER);
  const canRemoveMember = has(Permission.REMOVE_MEMBER);
  const canAddModerator = has(Permission.ADD_MODERATOR);
  const canRemoveModerator = has(Permission.REMOVE_MODERATOR);
  const canDismissModerator = has(Permission.DISMISS_MODERATOR);
  const canViewRequests = has(Permission.VIEW_REQUESTS);
  const canApproveRequest = has(Permission.APPROVE_REQUEST);
  const canDeleteOrg = has(Permission.DELETE_ORG);
  const canLeaveOrg = has(Permission.LEAVE_ORGANIZATION);
  const canJoinOrg = has(Permission.JOIN_ORGANIZATION);
  const canSendMessage = has(Permission.SEND_MESSAGE);
  const canChat = has(Permission.CHAT_TO_ORGANIZATION);
  const canChangeRoles = has(Permission.CHANGE_ROLES);

  return {
    // role,
    has,
    isAdmin,
    isModerator,
    canViewMembers,
    canAddMember,
    canRemoveMember,
    canAddModerator,
    canRemoveModerator,
    canDismissModerator,
    canViewRequests,
    canApproveRequest,
    canDeleteOrg,
    canLeaveOrg,
    canJoinOrg,
    canSendMessage,
    canChat,
    canChangeRoles,
  };
};
