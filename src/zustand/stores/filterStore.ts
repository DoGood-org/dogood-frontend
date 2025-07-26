import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import debounce from '@/lib/debounce';
import { IDistanceFilter, IExtendedCategoryFilter } from '@/types/filter.type';

interface TFilterState {
  currentPage: number;
  itemsPerPage: number;
  categories: IExtendedCategoryFilter[];
  choosenCategories: IExtendedCategoryFilter[];
  distanceFilter: IDistanceFilter | null;
  searchQuery: string;
  searchIsActive: boolean;

  sortBy: 'distance' | 'title';
}

interface TFilterActions {
  setCategories: (categories: IExtendedCategoryFilter[]) => void;
  toggleCategory: (category: IExtendedCategoryFilter) => void;
  setDistanceFilter: (distance: IDistanceFilter | null) => void;
  setSearchQuery: (searchQuery: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setSortBy: (sortBy: 'distance' | 'title') => void;
  removeDistanceFilter: () => void;
  resetFilters: () => void;
  setSearchActive: (active: boolean) => void;
}
type TFilterStore = TFilterState & TFilterActions;

const initialState: TFilterState = {
  categories: [],
  choosenCategories: [],
  distanceFilter: null,
  searchQuery: '',
  sortBy: 'distance',
  currentPage: 1,
  itemsPerPage: 13,
  searchIsActive: false,
};
export const useFilterStore = create<TFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCategories: (categories): void => set({ categories: categories }),

      toggleCategory: (category): void =>
        set((state) => {
          if (category === 'all') {
            return { choosenCategories: ['all'] as IExtendedCategoryFilter[] };
          }

          const updatedSet = new Set(state.choosenCategories);
          updatedSet.delete('all');
          const updatedCategories = Array.from(updatedSet);
          if (updatedCategories.includes(category)) {
            updatedCategories.splice(updatedCategories.indexOf(category), 1);
          } else {
            updatedCategories.push(category);
          }
          return {
            choosenCategories: updatedCategories as IExtendedCategoryFilter[],
            currentPage: 1,
          };
        }),

      setDistanceFilter: (distance): void => set({ distanceFilter: distance }),

      removeDistanceFilter: (): void =>
        set({ distanceFilter: null, currentPage: 1 }),

      setSearchQuery: debounce((query): void => {
        set({
          searchQuery: query,
        });
      }, 300),
      setSearchActive: (active): void =>
        set({
          searchIsActive: active,
          currentPage: 1,
        }),
      setSortBy: (sortBy): void => set({ sortBy }),
      setCurrentPage: (page): void => set({ currentPage: page }),
      setItemsPerPage: (items): void => set({ itemsPerPage: items }),

      resetFilters: (): void =>
        set({
          choosenCategories: [],
          distanceFilter: null,
          searchQuery: '',
          sortBy: 'distance',
        }),
    }),
    { name: 'task-filters' }
  )
);
