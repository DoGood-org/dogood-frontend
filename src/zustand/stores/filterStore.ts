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
  locationData: ILocationData | null;
  radius: number;

  sortBy: 'distance' | 'title';
}

export interface ILocationData {
  address: string;
  lat: number;
  lng: number;
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
  setLocationData: (data: ILocationData | null) => void;
  setRadius: (radius: number) => void;
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
  locationData: null,
  radius: 10,
};
export const useFilterStore = create<TFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCategories: (categories): any => set({ categories: categories }),

      toggleCategory: (category): any =>
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

      setDistanceFilter: (distance): any => set({ distanceFilter: distance }),

      removeDistanceFilter: (): any =>
        set({ distanceFilter: null, currentPage: 1 }),

      setSearchQuery: debounce((query): any => {
        set({
          searchQuery: query,
        });
      }, 300),
      setSearchActive: (active): any =>
        set({
          searchIsActive: active,
          currentPage: 1,
        }),
      setSortBy: (sortBy): any => set({ sortBy }),
      setCurrentPage: (page): any => set({ currentPage: page }),
      setItemsPerPage: (items): any => set({ itemsPerPage: items }),

      resetFilters: (): any =>
        set({
          choosenCategories: [],
          distanceFilter: null,
          searchQuery: '',
          sortBy: 'distance',
        }),
      setLocationData: (data: ILocationData | null): void => {
        set({ locationData: data, currentPage: 1 });
      },

      setRadius: (radius: number): void => {
        set({ radius, currentPage: 1 });
      },
    }),
    { name: 'task-filters' }
  )
);
