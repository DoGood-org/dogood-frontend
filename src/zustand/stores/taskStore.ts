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
  leaveTask: (taskId: string) => void;
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
      joinTask: (taskId: string): void => {
        const updated = get().tasks.map((task) =>
          task.id === taskId ? { ...task, isSelected: true } : task
        );
        set({
          tasks: updated,
          joinedTasks: updated.filter((task) => task.isSelected),
        });
      },

      leaveTask: (taskId: string): void => {
        const updated = get().tasks.map((task) =>
          task.id === taskId ? { ...task, isSelected: false } : task
        );
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
        set((state) => {
          const updated = { ...state.tasksByKey, [key]: tasks };
          const prev = new Map(state.tasks.map((t) => [t.id, t]));

          const uniqueTasks = Array.from(
            new Map(
              Object.values(updated)
                .flat()
                .map((t) => [t.id, t])
            ).values()
          ).map((t) => {
            const old = prev.get(t.id);
            return old
              ? { ...t, isSelected: old.isSelected, isFavorite: old.isFavorite }
              : t;
          });

          return {
            tasksByKey: updated,
            tasks: uniqueTasks,
            joinedTasks: uniqueTasks.filter((t) => t.isSelected),
          };
        });
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
