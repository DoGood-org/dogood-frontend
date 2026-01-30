import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
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

interface TCreateTaskState {
  createStep: number;
  createTaskDraft: Partial<IExtendedITaskProps>;
  isSuccess: boolean;
}

interface TCreateTaskActions {
  nextCreateStep: () => void;
  prevCreateStep: () => void;
  setCreateTaskDraft: (data: Partial<IExtendedITaskProps>) => void;
  resetCreateTask: () => void;
  setIsSuccess: (status: boolean) => void;
}

type TTaskStore = TTaskState &
  TTaskActions &
  TCreateTaskState &
  TCreateTaskActions;

export const useTaskStore = create<TTaskStore>()(
  persist<
    TTaskStore,
    [],
    [],
    Pick<
      TTaskState & TCreateTaskState,
      'tasks' | 'joinedTasks' | 'createStep' | 'createTaskDraft'
    >
  >(
    (set, get) => ({
      tasks: [],
      joinedTasks: [],
      tasksByKey: {},
      highlightedTaskId: null,
      createStep: 0,
      createTaskDraft: {},
      isSuccess: false,

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

      nextCreateStep: (): void => {
        set((state) => ({
          createStep: Math.min(
            state.createStep + 1,
            CREATE_TASK_STEPS.length - 1
          ),
        }));
      },

      prevCreateStep: (): void => {
        set((state) => ({
          createStep: Math.max(state.createStep - 1, 0),
        }));
      },

      setIsSuccess: (status: boolean): void => {
        set({ isSuccess: status });
      },

      setCreateTaskDraft: (data: Partial<IExtendedITaskProps>): void => {
        set((state) => ({
          createTaskDraft: {
            ...state.createTaskDraft,
            ...data,
          },
        }));
      },

      resetCreateTask: (): void => {
        set({
          createStep: 0,
          createTaskDraft: {} as Partial<IExtendedITaskProps>,
          isSuccess: false,
        });
      },
    }),
    {
      name: 'task-storage',
      partialize: function (
        state
      ): Pick<
        TTaskState & TCreateTaskState,
        'tasks' | 'joinedTasks' | 'createStep' | 'createTaskDraft'
      > {
        return {
          tasks: state.tasks,
          joinedTasks: state.joinedTasks,
          createStep: state.createStep,
          createTaskDraft: state.createTaskDraft,
        };
      },
    }
  )
);
