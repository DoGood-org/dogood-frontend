'use client';

import { Account } from '@/components';
import { ProfileMap } from '@/components/main/map/profileMap/ProfileMap';
import { navigationStore } from '@/zustand/stores/navigationStore';
import React from 'react';
import { Settings } from '@/components/account/settingsPage/SettingsForm';

const pages = {
  Account: <Account />,
  Chat: <div>Chat</div>,
  Map: <ProfileMap />,
  Goals: <div>Goals</div>,
  Settings: <Settings />,
};

export const PageContent: React.FC = () => {
  const { currentPage } = navigationStore();

  return pages[currentPage] ?? null;
};
