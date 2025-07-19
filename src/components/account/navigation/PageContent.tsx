'use client';

import React from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { Account } from '@/components';

const pages = {
  Account: <Account />,
  Chat: <div>Chat</div>,
  Map: <div>Map</div>,
  Goals: <div>Goals</div>,
  Settings: <div>Settings</div>,
};

export const PageContent: React.FC = () => {
  const { currentPage } = navigationStore();

  return pages[currentPage] ?? null;
};
