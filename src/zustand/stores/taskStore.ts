import { create } from 'zustand';
import { IExtendedITaskProps } from '@/types/mapType';
import { persist } from 'zustand/middleware';

interface TTaskState {
  tasks: IExtendedITaskProps[];
  selectedTasks: IExtendedITaskProps[];
  tasksByRadius: Record<number, IExtendedITaskProps[]>;
}

interface TTaskActions {
  setTasks: (tasks: IExtendedITaskProps[]) => void;
  setSelectedTasks: (tasks: IExtendedITaskProps[]) => void;
  toggleTaskDescription: (taskId: string) => void;
  setTasksByRadius: (radius: number, tasks: IExtendedITaskProps[]) => void;
}

type TTaskStore = TTaskState & TTaskActions;

export const useTaskStore = create<TTaskStore>()(
  persist<TTaskStore, [], [], Pick<TTaskState, 'tasks' | 'selectedTasks'>>(
    (set, get) => ({
      tasks: [],
      selectedTasks: [],
      tasksByRadius: {},

      setTasks: (tasks): void => set({ tasks }),
      setSelectedTasks: (tasks): void => set({ selectedTasks: tasks }),
      toggleTaskDescription: (taskId): void => {
        const updated = get().tasks.map((task) => ({
          ...task,
          isSelected: task.id === taskId ? !task.isSelected : task.isSelected,
        }));
        set({
          tasks: updated,
          selectedTasks: updated.filter((task) => task.isSelected),
        });
      },
      setTasksByRadius: (radius, tasks): void => {
        const updated = { ...get().tasksByRadius, [radius]: tasks };
        set({ tasksByRadius: updated });
        const allTasks = Object.values(updated).flat();

        set({ tasks: allTasks });
      },
    }),
    {
      name: 'task-storage',
      partialize: function (
        state
      ): Pick<TTaskState, 'tasks' | 'selectedTasks'> {
        return {
          tasks: state.tasks,
          selectedTasks: state.selectedTasks,
        };
      },
    }
  )
);
