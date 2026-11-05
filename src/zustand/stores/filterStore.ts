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
  showFavorites: boolean;

  sortBy: 'distance' | 'title';
  distanceUnit: 'km' | 'mi';
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
  setDistanceUnit: (unit: 'km' | 'mi') => void;
  toggleShowFavorites: () => void;
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
  distanceUnit: 'km',
  showFavorites: false,
};
export const useFilterStore = create<TFilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCategories: (categories): void => {
        set({ categories: categories });
      },

      toggleCategory: (category): void => {
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
        });
      },
      toggleShowFavorites: (): void => {
        set((state) => ({
          showFavorites: !state.showFavorites,
          currentPage: 1,
        }));
      },

      setDistanceFilter: (distance): void => {
        set({ distanceFilter: distance, currentPage: 1 });
      },

      removeDistanceFilter: (): void => {
        set({ distanceFilter: null, currentPage: 1 });
      },

      setSearchQuery: debounce((query: string): void => {
        set({
          searchQuery: query,
        });
      }, 300),
      setSearchActive: (active): void => {
        set({
          searchIsActive: active,
          currentPage: 1,
        });
      },
      setSortBy: (sortBy): void => {
        set({ sortBy });
      },
      setCurrentPage: (page): void => {
        set({ currentPage: page });
      },
      setItemsPerPage: (items): void => {
        set({ itemsPerPage: items });
      },

      resetFilters: (): void => {
        set({
          choosenCategories: [],
          distanceFilter: null,
          searchQuery: '',
          sortBy: 'distance',
          showFavorites: false,
          currentPage: 1,
          locationData: null,
        });
      },
      setLocationData: (data: ILocationData | null): void => {
        set({ locationData: data, currentPage: 1 });
      },

      setRadius: (radius: number): void => {
        set({ radius, currentPage: 1 });
      },
      setDistanceUnit: (unit: 'km' | 'mi'): void => {
        set({ distanceUnit: unit });
      },
    }),
    {
      name: 'task-filters',
      partialize: ({
        categories: _categories,
        showFavorites: _showFavorites,
        searchIsActive: _searchIsActive,
        locationData: _locationData,
        ...rest
      }) => rest,
    }
  )
);
