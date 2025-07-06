import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IDistanceFilter, IExtendedCategoryFilter } from '@/types/mapType';
import debounce from '@/lib/debounce';

interface TFilterState {
  currentPage: number;
  itemsPerPage: number;
  categories: IExtendedCategoryFilter[];
  choosenCategories: IExtendedCategoryFilter[];
  distanceFilter: IDistanceFilter | null;
  searchQuery: string;
  sortBy: 'distance' | 'title';
}

interface TFilterActions {
  setCategories: (categories: IExtendedCategoryFilter[]) => void;
  toggleCategory: (category: IExtendedCategoryFilter) => void;
  setDistanceFilter: (distance: IDistanceFilter | null) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setSortBy: (sortBy: 'distance' | 'title') => void;
  resetFilters: () => void;
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

      setSearchQuery: debounce((query): void => {
        set({ searchQuery: query });
      }, 300),

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

