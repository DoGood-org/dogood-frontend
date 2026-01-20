import { Account } from '@/components/account/accountPage/Account';
import { JSX } from 'react';
import { fetchCurrentUser } from '@/facades/accountFacade';
import { notFound } from 'next/navigation';
// import { useAuth } from '@/hooks';

export default async function AccountPage(): Promise<JSX.Element> {
  const user = await fetchCurrentUser();
  console.log('AccountPage -> ', user);

  if (!user) {
    notFound();
  }

  return <Account user={user} />;
}
