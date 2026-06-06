import { ProfileForm } from '@/components/account/settingsPage/ProfileForm';
import { fetchCurrentUser } from '@/facades/accountFacade';
import { fetchUserById } from '@/facades/profileFacade';
import React, { JSX } from 'react';

export default async function SettingsPage(): Promise<JSX.Element> {
  const currentUser = await fetchCurrentUser();
  const userId = String(currentUser!.id);
  const user = await fetchUserById(userId);
  return <ProfileForm user={user!} />;
}
