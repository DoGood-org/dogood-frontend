import { IExtendedITaskProps, TaskStatus } from '@/types/tasks.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TTaskState {
  tasks: IExtendedITaskProps[];
  joinedTasks: IExtendedITaskProps[];
  tasksByKey: Record<string, IExtendedITaskProps[]>;
  highlightedTaskId: string | null;
}

interface TTaskActions {
  setTasks: (tasks: IExtendedITaskProps[]) => void;
  setJoinedTasks: (tasks: IExtendedITaskProps[]) => void;
  joinTask: (taskId: string) => void;
  setTasksByKey: (key: string, tasks: IExtendedITaskProps[]) => void;
  setHighlightedTaskId: (taskId: string | null) => void;
  toggleFavorite: (taskId: string) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
}

type TTaskStore = TTaskState & TTaskActions;

export const useTaskStore = create<TTaskStore>()(
  persist<TTaskStore, [], [], Pick<TTaskState, 'tasks' | 'joinedTasks'>>(
    (set, get) => ({
      tasks: [],
      joinedTasks: [],
      tasksByKey: {},
      highlightedTaskId: null,

      setTasks: (tasks): any => set({ tasks }),
      setJoinedTasks: (tasks): any => set({ joinedTasks: tasks }),
      joinTask: (taskId): any => {
        const updated = get().tasks.map((task) => ({
          ...task,
          isSelected: task.id === taskId ? !task.isSelected : task.isSelected,
        }));
        set({
          tasks: updated,
          joinedTasks: updated.filter((task) => task.isSelected),
        });
      },
      toggleFavorite: (taskId): void => {
        const updatedTasks = get().tasks.map((task) =>
          task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
        );
        set({
          tasks: updatedTasks,
          joinedTasks: updatedTasks.filter((task) => task.isSelected),
        });
      },
      setTasksByKey: (key, tasks): void => {
        const updated = { ...get().tasksByKey, [key]: tasks };
        set({ tasksByKey: updated });
        const allTasks = Object.values(updated).flat();
        set({ tasks: allTasks });
      },
      updateTaskStatus: (taskId: string, status: TaskStatus): void => {
        set((prev) => {
          const updatedTasks = prev.tasks.map((t) =>
            t.id === taskId ? { ...t, status } : t
          );
          return {
            tasks: updatedTasks,
            joinedTasks: updatedTasks.filter((t) => t.isSelected),
          };
        });
      },
      setHighlightedTaskId: (taskId): any => set({ highlightedTaskId: taskId }),
    }),
    {
      name: 'task-storage',
      partialize: function (state): Pick<TTaskState, 'tasks' | 'joinedTasks'> {
        return {
          tasks: state.tasks,
          joinedTasks: state.joinedTasks,
        };
      },
    }
  )
);
