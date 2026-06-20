import { create } from 'zustand';

export type OrganizationStore = {
  search: string;
  page: number;

  setSearch: (value: string) => void;
  setPage: (page: number) => void;

  restoreFilters: (search: string, page: number) => void;
  resetFilters: () => void;
};

export const useOrganizationsStore = create<OrganizationStore>((set) => ({
  search: '',
  page: 1,

  setSearch: (search): void => set({ search, page: 1 }),
  setPage: (page): void => set({ page }),

  restoreFilters: (search: string, page: number): void =>
    set({
      search,
      page,
    }),

  resetFilters: (): void =>
    set({
      search: '',
      page: 1,
    }),
}));
