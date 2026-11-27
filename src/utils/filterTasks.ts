import { ITask } from '@/services/taskService';
import { FilterValues } from '@/types/admin';

const STATUS_MAP: Record<string, string> = {
  'Under consideration': 'PENDING',
  Confirmed: 'COMPLETED',
  Rejected: 'REJECTED',
};

const normalize = (s: string): string =>
  s
    .toUpperCase()
    .replace(/[\s_-]+/g, ' ')
    .trim();

export const applyTasksFilters = (
  tasks: ITask[],
  currentFilters: FilterValues,
  searchQuery: string = ''
): ITask[] => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    if (currentFilters.status) {
      const selected = normalize(
        STATUS_MAP[currentFilters.status] ?? currentFilters.status
      );
      if (selected !== normalize(task.status)) return false;
    }

    if (currentFilters.category) {
      const selected = normalize(currentFilters.category);
      const hasCategory = task.categories.some(
        (c) => normalize(c) === selected
      );
      if (!hasCategory) return false;
    }

    if (
      normalizedQuery &&
      !task.title.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }

    return true;
  });
};
