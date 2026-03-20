import { Account } from '@/components/account/accountPage/Account';
import { JSX } from 'react';
import { fetchCurrentUser } from '@/facades/accountFacade';

export default async function AccountPage(): Promise<JSX.Element> {
  const user = await fetchCurrentUser();

  return <Account user={user!} />;
}
