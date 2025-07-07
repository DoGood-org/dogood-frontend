import { useTaskStore } from '@/zustand/stores/taskStore';
import { useFilterStore } from '@/zustand/stores/filterStore';
import { useMemo } from 'react';
import { IExtendedITaskProps } from '@/types/mapType';

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

  const filteredTasks = useMemo(() => {
    const tasksWithFilters = tasks.filter((task) => {
      const isCategoryMatch =
        choosenCategories.length === 0 || choosenCategories.includes('all')
          ? true
          : task.category.some((cat) => choosenCategories.includes(cat));

      const isDistanceMatch =
        !distanceFilter || isNaN(parseFloat(distanceFilter))
          ? true
          : parseFloat(task.distance) <= parseFloat(distanceFilter);

      const isSearchMatch =
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      return isCategoryMatch && isDistanceMatch && isSearchMatch;
    });

    if (sortBy === 'title') {
      tasksWithFilters.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'distance') {
      tasksWithFilters.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
      );
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
    itemsPerPage,
  ]);

  return filteredTasks;
};
