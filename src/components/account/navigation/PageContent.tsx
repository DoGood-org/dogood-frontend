'use client';

import React from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { ProfileMap } from '@/components/main/map/profileMap/ProfileMap';

const pages = {
  Account: <div>Account</div>,
  Chat: <div>Chat</div>,
  Map: <ProfileMap />,
  Goals: <div>Goals</div>,
  Settings: <div>Settings</div>,
};

export const PageContent: React.FC = () => {
  const { currentPage } = navigationStore();

  return pages[currentPage] ?? null;
};
