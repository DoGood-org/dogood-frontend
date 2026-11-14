import { IExtendedITaskProps, TaskStatus } from '@/types/tasks.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TTaskState {
  tasks: IExtendedITaskProps[];
  joinedTasks: IExtendedITaskProps[];
  tasksByKey: Record<string, IExtendedITaskProps[]>;
  highlightedTaskId: string | null;
  tasksVersion: number;
  newTaskId: string | null;
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
  upsertTasks: (tasks: IExtendedITaskProps[]) => void;
  refreshTasks: () => void;
  setNewTaskId: (taskId: string | null) => void;
}

type TTaskStore = TTaskState & TTaskActions;

export const useTaskStore = create<TTaskStore>()(
  persist<TTaskStore, [], [], Pick<TTaskState, 'tasks' | 'joinedTasks'>>(
    (set, get) => ({
      tasks: [],
      joinedTasks: [],
      tasksByKey: {},
      tasksVersion: 0,
      highlightedTaskId: null,
      newTaskId: null,

      setTasks: (tasks): void => {
        set({ tasks });
      },
      setJoinedTasks: (tasks): void => {
        set({ joinedTasks: tasks });
      },
      refreshTasks: (): void => {
        set((state) => ({ tasksVersion: state.tasksVersion + 1 }));
      },
      setNewTaskId: (taskId): void => {
        set({ newTaskId: taskId });
      },
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
          const prev = new Map(state.tasks.map((task) => [task.id, task]));

          const updatedTasks = tasks.map((task) => {
            const old = prev.get(task.id);

            return old
              ? {
                  ...task,
                  isSelected: old.isSelected,
                  isFavorite: old.isFavorite,
                }
              : task;
          });

          return {
            tasksByKey: {
              ...state.tasksByKey,
              [key]: tasks,
            },
            tasks: updatedTasks,
            joinedTasks: updatedTasks.filter((task) => task.isSelected),
          };
        });
      },
      upsertTasks: (incoming): void => {
        set((state) => {
          const existingIds = new Set(state.tasks.map((t) => t.id));
          const fresh = incoming.filter((t) => !existingIds.has(t.id));

          const updatedExisting = state.tasks.map((t) => {
            const inc = incoming.find((i) => i.id === t.id);
            return inc
              ? { ...inc, isSelected: t.isSelected, isFavorite: t.isFavorite }
              : t;
          });

          const tasks = [...fresh, ...updatedExisting];

          const tasksByKey = Object.fromEntries(
            Object.entries(state.tasksByKey).map(([k, list]) => {
              const listIds = new Set(list.map((t) => t.id));
              const newForList = fresh.filter((t) => !listIds.has(t.id));
              return [k, [...newForList, ...list]];
            })
          );

          return {
            tasks,
            tasksByKey,
            joinedTasks: tasks.filter((t) => t.isSelected),
          };
        });
      },
      updateTaskStatus: (taskId: string, status: TaskStatus): void => {
        set((prev) => {
          const updatedTasks = prev.tasks.map((t) =>
            t.id === taskId ? { ...t, status } : t
          );

          const updatedByKey = Object.fromEntries(
            Object.entries(prev.tasksByKey).map(([k, list]) => [
              k,
              list.map((t) => (t.id === taskId ? { ...t, status } : t)),
            ])
          );

          return {
            tasks: updatedTasks,
            tasksByKey: updatedByKey,
            joinedTasks: updatedTasks.filter((t) => t.isSelected),
          };
        });
      },
      setHighlightedTaskId: (taskId): void => {
        set({ highlightedTaskId: taskId });
      },
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
