import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { IExtendedITaskProps } from '@/types/tasks.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreateTaskState {
  createStep: number;
  createTaskDraft: Partial<IExtendedITaskProps>;
  isSuccess: boolean;
  isReview: boolean;
}

interface CreateTaskActions {
  nextCreateStep: () => void;
  prevCreateStep: () => void;
  setCreateTaskDraft: (data: Partial<IExtendedITaskProps>) => void;
  resetCreateTask: () => void;
  setIsSuccess: (status: boolean) => void;
  setIsReview: (status: boolean) => void;
}

export const useCreateTaskStore = create<CreateTaskState & CreateTaskActions>()(
  persist(
    (set) => ({
      createStep: 0,
      createTaskDraft: {},
      isSuccess: false,
      isReview: false,

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
      setIsReview: (status: boolean): void => {
        set({ isReview: status });
      },

      resetCreateTask: (): void => {
        set({
          createStep: 0,
          createTaskDraft: {} as Partial<IExtendedITaskProps>,
          isSuccess: false,
          isReview: false,
        });
      },
    }),
    {
      name: 'create-task-storage',
      partialize: (state) => ({
        createStep: state.createStep,
        createTaskDraft: state.createTaskDraft,
      }),
    }
  )
);
