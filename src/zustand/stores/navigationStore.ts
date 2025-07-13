'use client';

import { Page } from '@/types/navigationType';
import { create } from 'zustand';

interface NavigationState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const navigationStore = create<NavigationState>(
  (set): NavigationState => ({
    currentPage: 'Account',
    setCurrentPage: (page: Page): void => set({ currentPage: page }),
  })
);
