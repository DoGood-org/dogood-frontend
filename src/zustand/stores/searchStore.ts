import { create } from 'zustand';
import { fetchOrganizationsByName } from '@/facades/organizationFacade';
import type { OrganizationDetailedProps } from '@/types';

interface SearchStore {
  searchQuery: string;
  organizations: OrganizationDetailedProps[];
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  clearOrganizations: () => void;
  searchOrganizations: (query?: string) => Promise<void>;
}

export const useSearchStore = create<SearchStore>(
  (set, get): SearchStore => ({
    searchQuery: '',
    organizations: [],
    isLoading: false,

    setSearchQuery: (query: string): void => set({ searchQuery: query }),

    clearOrganizations: (): void => set({ organizations: [] }),

    searchOrganizations: async (query?: string): Promise<void> => {
      const searchQuery = query ?? get().searchQuery;
      if (!searchQuery.trim()) {
        set({ organizations: [] });
        return;
      }

      set({ isLoading: true });
      try {
        const results = await fetchOrganizationsByName(searchQuery);
        set({ organizations: results || [] });
      } catch (error) {
        console.error('Search failed:', error);
        set({ organizations: [] });
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
