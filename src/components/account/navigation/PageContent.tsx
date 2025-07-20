'use client';

import { Account } from '@/components';
import { navigationStore } from '@/zustand/stores/navigationStore';
import React from 'react';
import { ChatView } from '../chat/ChatView';

const pages = {
  Account: <Account />,
  Chat: <ChatView />,
  Map: <div>Map</div>,
  Goals: <div>Goals</div>,
  Settings: <div>Settings</div>,
};

export const PageContent: React.FC = () => {
  const { currentPage } = navigationStore();

  return pages[currentPage] ?? null;
};
