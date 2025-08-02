'use client';

import { Page } from '@/types/navigationType';
import { create } from 'zustand';

interface NavigationState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isChatMessageOpen: boolean;
  setIsChatMessageOpen: (open: boolean) => void;
}

export const navigationStore = create<NavigationState>(
  (set): NavigationState => ({
    currentPage: 'Account',
    setCurrentPage: (page: Page): void => set({ currentPage: page }),
    isChatMessageOpen: false,
    setIsChatMessageOpen: (open: boolean) => set({ isChatMessageOpen: open }),
  })
);
