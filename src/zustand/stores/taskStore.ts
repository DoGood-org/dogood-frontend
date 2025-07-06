import { create } from 'zustand';
import { IExtendedITaskProps } from '@/types/mapType';
import { persist } from 'zustand/middleware';





interface TTaskState {
  tasks: IExtendedITaskProps[];
  selectedTasks: IExtendedITaskProps[];
}

interface TTaskActions {
  setTasks: (tasks: IExtendedITaskProps[]) => void;
  setSelectedTasks: (tasks: IExtendedITaskProps[]) => void;
  toggleTaskDescription: (taskId: string) => void;
}


type TTaskStore = TTaskState & TTaskActions;

export const useTaskStore = create<TTaskStore>()(
  persist<TTaskStore, [], [], Pick<TTaskState, 'tasks' | 'selectedTasks'>>(
    (set, get) => ({
      tasks: [],
      selectedTasks: [],
      setTasks: (tasks) => set({ tasks }),
      setSelectedTasks: (tasks) => set({ selectedTasks: tasks }),
      toggleTaskDescription: (taskId) => {
        const updated = get().tasks.map((task) => ({
          ...task,
          isSelected: task.id === taskId ? !task.isSelected : task.isSelected,
        }));
        set({
          tasks: updated,
          selectedTasks: updated.filter((task) => task.isSelected),
        });
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
