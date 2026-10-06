import { AdminLayoutContent } from '@/components/admin/navigation/AdminLayoutContent';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { notFound } from 'next/navigation';
// import { redirect } from 'next/navigation';
import { JSX } from 'react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const me = await getServerCurrentUser();

  if (!me || 'isBanned' in me || me.siteRole !== 'ADMIN') {
    notFound();
  }

  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
