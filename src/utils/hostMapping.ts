import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { HostUser, OrganizationFromBack, TaskHost } from '@/types/tasks.type';

export const hostMapping = (
  draft: BasicInfoFormValues,
  currentUser: HostUser | null,
  organizations: OrganizationFromBack[]
): TaskHost => {
  if (draft.isOrganization && draft.organizationId) {
    const org = organizations.find(
      (o) => String(o.id) === String(draft.organizationId)
    );

    return {
      type: 'ORGANIZATION',
      organization: {
        id: String(org?.id ?? draft.organizationId),
        name: org?.name ?? 'Organization',
        avatar: org?.avatar ?? '',
      },
    };
  }

  return {
    type: 'USER',
    user: {
      id: currentUser?.id ?? '',
      name: currentUser?.name ?? '',
      avatar: currentUser?.avatar ?? '',
      email: currentUser?.email ?? '',
    },
  };
};
