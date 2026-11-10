import { notFound } from 'next/navigation';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import type { HostUser } from '@/types/tasks.type';
import CreateTaskPage from '@/components/tasks/createTaskPage/CreateTaskPage';
import { isAdminOrModerator } from '@/lib/getUserRole';

const TaskPage = async (): Promise<React.JSX.Element> => {
  const user = await getServerCurrentUser();

  if (!user || 'isBanned' in user) notFound();
  console.log(
    '[DBG page] raw orgs:',
    JSON.stringify(user.organizations, null, 2)
  );

  const organizations = (user.organizations ?? []).filter(
    (org) => !!org.role && isAdminOrModerator(org.role)
  );

  console.log(
    '[DBG page] after role filter:',
    organizations.map((o) => ({ id: o.id, name: o.name, role: o.role }))
  );

  const hostUser: HostUser = {
    id: String(user.id),
    name: user.name,
    email: user.email,
    avatar: user.profile?.avatar ?? undefined,
  };

  return (
    <CreateTaskPage
      initialUser={hostUser}
      initialOrganizations={organizations}
    />
  );
};

export default TaskPage;
