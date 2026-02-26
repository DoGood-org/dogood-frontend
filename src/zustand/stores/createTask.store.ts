import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { CreateTaskDraft } from '@/types/createTask.type';
import { TaskActionType } from '@/types/tasks.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreateTaskState {
  createStep: number;
  createTaskDraft: CreateTaskDraft;
  isSuccess: boolean;
  hasHydrated: boolean;
}

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
        set((state) => {
          const nextDraft = { ...state.createTaskDraft, ...data };

          if (nextDraft.actionType === TaskActionType.VOLUNTEERING) {
            nextDraft.amount = 0;
            nextDraft.currency = undefined;
          }

          const isDonation =
            nextDraft.actionType === TaskActionType.FUNDRAISING;
          const nextStep =
            !isDonation && state.createStep > 4 ? 4 : state.createStep;

          return {
            createTaskDraft: nextDraft,
            createStep: nextStep,
          };
        });
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
