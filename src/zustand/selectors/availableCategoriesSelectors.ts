import { useTaskStore } from '@/zustand/stores/taskStore';
import { useMemo } from 'react';

export const useAvailableCategories = (): string[] => {
  const tasks = useTaskStore((state) => state.tasks);

  return useMemo(() => {
    const categorySet = new Set<string>();
    tasks.forEach((task) => {
      task.category.forEach((cat) => categorySet.add(cat));
    });
    
    return Array.from(categorySet);
  }, [tasks]);
};
