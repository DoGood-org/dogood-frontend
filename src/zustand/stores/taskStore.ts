import { create } from 'zustand';
import { IExtendedITaskProps } from '@/types/mapType';
import { persist } from 'zustand/middleware';

interface TTaskState {
  tasks: IExtendedITaskProps[];
  joinedTasks: IExtendedITaskProps[];
  tasksByKey: Record<string, IExtendedITaskProps[]>;
}

interface TTaskActions {
  setTasks: (tasks: IExtendedITaskProps[]) => void;
  setJoinedTasks: (tasks: IExtendedITaskProps[]) => void;
  joinTask: (taskId: string) => void;
  setTasksByKey: (key: string, tasks: IExtendedITaskProps[]) => void;
}

type TTaskStore = TTaskState & TTaskActions;

export const useTaskStore = create<TTaskStore>()(
  persist<TTaskStore, [], [], Pick<TTaskState, 'tasks' | 'joinedTasks'>>(
    (set, get) => ({
      tasks: [],
      joinedTasks: [],
      tasksByKey: {},

      setTasks: (tasks): void => set({ tasks }),
      setJoinedTasks: (tasks): void => set({ joinedTasks: tasks }),
      joinTask: (taskId): void => {
        const updated = get().tasks.map((task) => ({
          ...task,
          isSelected: task.id === taskId ? !task.isSelected : task.isSelected,
        }));
        set({
          tasks: updated,
          joinedTasks: updated.filter((task) => task.isSelected),
        });
      },
      setTasksByKey: (key, tasks): void => {
        const updated = { ...get().tasksByKey, [key]: tasks };
        set({ tasksByKey: updated });
        const allTasks = Object.values(updated).flat();
        set({ tasks: allTasks });
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
