'use client';

import { Account } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import React from 'react';
import { Chat } from '@/components';
import { ProfileMap } from '@/components/main/map/profileMap/ProfileMap';

const pages = {
  Account: <Account />,
  Chat: <Chat />,
  Map: <ProfileMap />,
  Goals: <div>Goals</div>,
  Settings: <div>Settings</div>,
};

export const PageContent: React.FC = () => {
  const { currentPage } = navigationStore();

  return pages[currentPage] ?? null;
};
