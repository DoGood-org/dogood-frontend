import { useTaskStore } from '@/zustand/stores/taskStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMapStore } from '@/zustand/stores/mapStore';
import { useMemo } from 'react';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { TaskCategoryEnum } from '@/types/createTask.type';
import { authStore } from '../stores/authStore';
import { getDistanceStr } from '@/utils/taskTransform';

const ALL_CATEGORIES = Object.values(TaskCategoryEnum).map((category) =>
  String(category).toUpperCase()
);

const toDistanceNumber = (value: string): number => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
};

export const useFilteredTasksSelector = (): {
  paginatedTasks: IExtendedITaskProps[];
  totalItems: number;
  totalPages: number;
  noPaginatedTasks: IExtendedITaskProps[];
} => {
  const tasks = useTaskStore((state) => state.tasks);
  const choosenCategories = useFilterStore((state) => state.choosenCategories);
  const distanceFilter = useFilterStore((state) => state.distanceFilter);
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const sortBy = useFilterStore((state) => state.sortBy);
  const currentPage = useFilterStore((state) => state.currentPage);
  const itemsPerPage = useFilterStore((state) => state.itemsPerPage);
  const showFavorites = useFilterStore((state) => state.showFavorites);
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const userLocation = useMapStore((state) => state.userLocation);

  const filteredTasks = useMemo(() => {
    // Categories typed in the search field (by prefix)
    const queryUpper = searchQuery.trim().toUpperCase();
    const searchedCategories = queryUpper
      ? ALL_CATEGORIES.filter((category) => category.startsWith(queryUpper))
      : [];

    // Categories chosen in the filter panel
    const panelCategories = choosenCategories
      .filter((category) => !!category && category !== 'all')
      .map((category) => String(category).toUpperCase());

    // Search field has priority over the filter panel
    const activeCategories = new Set(
      searchedCategories.length > 0 ? searchedCategories : panelCategories
    );

    const tasksWithDistance = tasks.map((task) => ({
      ...task,
      distance:
        userLocation && task.location
          ? getDistanceStr(
              userLocation.lat,
              userLocation.lng,
              task.location.lat,
              task.location.lng
            )
          : '',
    }));

    const tasksWithFilters = tasksWithDistance.filter((task) => {
      const isCategoryMatch =
        activeCategories.size === 0
          ? true
          : (task.category ?? []).some((cat) =>
              activeCategories.has(String(cat).toUpperCase())
            );

      const isDistanceMatch =
        !userLocation || !distanceFilter || isNaN(parseFloat(distanceFilter))
          ? true
          : toDistanceNumber(task.distance) <= parseFloat(distanceFilter);

      const isFavoriteMatch =
        !showFavorites || !isLoggedIn || !!task.isFavorite;

      // Text search (title / location) is done by the backend
      return isCategoryMatch && isDistanceMatch && isFavoriteMatch;
    });

    if (sortBy === 'title') {
      tasksWithFilters.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'distance') {
      if (userLocation) {
        tasksWithFilters.sort(
          (a, b) => toDistanceNumber(a.distance) - toDistanceNumber(b.distance)
        );
      }
    } else {
      tasksWithFilters.sort((a, b) => {
        const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tB - tA;
      });
    }

    const totalItems = tasksWithFilters.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedTasks = tasksWithFilters.slice(
      startIdx,
      startIdx + itemsPerPage
    );

    return {
      paginatedTasks,
      totalItems,
      totalPages,
      noPaginatedTasks: tasksWithFilters,
    };
  }, [
    tasks,
    choosenCategories,
    distanceFilter,
    searchQuery,
    sortBy,
    currentPage,
    showFavorites,
    itemsPerPage,
    isLoggedIn,
    userLocation,
  ]);

  return filteredTasks;
};
