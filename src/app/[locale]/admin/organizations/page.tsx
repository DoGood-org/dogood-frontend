import { OrgPage } from '@/components/admin/organizations/OrgPage';
import { fetchUserById } from '@/facades/profileFacade';
import { notFound } from 'next/navigation';
import { JSX } from 'react';

export default async function AdminOrganizationPage(): Promise<JSX.Element> {
  const user = await fetchUserById('4e53467c-5377-420c-a7f8-5710fefa9896');

  if (!user) notFound();

  return <OrgPage organizations={user.organizations ?? []} />;
}
