import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreateTaskState {
  createStep: number;
  createTaskDraft: CreateTaskDraft;
  isSuccess: boolean;
  hasHydrated: boolean;
}

export type CreateTaskDraft = Partial<BasicInfoFormValues>;

interface CreateTaskActions {
  nextCreateStep: () => void;
  prevCreateStep: () => void;
  setCreateStep: (step: number) => void;
  setCreateTaskDraft: (data: CreateTaskDraft) => void;
  resetCreateTask: () => void;
  setIsSuccess: (status: boolean) => void;
  setHasHydrated: (value: boolean) => void;
}

export const useCreateTaskStore = create<CreateTaskState & CreateTaskActions>()(
  persist(
    (set) => ({
      createStep: 0,
      createTaskDraft: {},
      isSuccess: false,
      hasHydrated: false,

      setHasHydrated: (value: boolean): void => {
        set({ hasHydrated: value });
      },

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

      setCreateStep: (step): void => {
        set({ createStep: step });
      },

      setIsSuccess: (status: boolean): void => {
        set({ isSuccess: status });
      },

      setCreateTaskDraft: (data): void => {
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
          createTaskDraft: {},
          isSuccess: false,
        });
      },
    }),
    {
      name: 'create-task-storage',
      partialize: (state) => ({
        createStep: state.createStep,
        createTaskDraft: state.createTaskDraft,
      }),
      onRehydrateStorage:
        () =>
        (state?: CreateTaskState & CreateTaskActions): void => {
          state?.setHasHydrated(true);
        },
    }
  )
);
