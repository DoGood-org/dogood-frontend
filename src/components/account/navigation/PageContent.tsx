'use client';

import React from 'react';
import { navigationStore } from '@/zustand/stores/navigationStore';
import { ChatView } from '../chat/ChatView';

const pages = {
  Account: <div>Account</div>,
  Chat: <ChatView />,
  Map: <div>Map</div>,
  Goals: <div>Goals</div>,
  Settings: <div>Settings</div>,
};

export const PageContent: React.FC = () => {
  const { currentPage } = navigationStore();

  return pages[currentPage] ?? null;
};
