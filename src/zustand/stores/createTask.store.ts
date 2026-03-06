import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { CreateTaskDraft } from '@/types/createTask.type';
import { isDonationCategory } from '@/utils/isDonationCategory';
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

export const DESCRIPTION_STEP = 3;
export const PAYMENT_STEP = 4;
export const PREVIEW_STEP = 5;

export const useCreateTaskStore = create<CreateTaskState & CreateTaskActions>()(
  persist(
    (set, get) => ({
      createStep: 0,
      createTaskDraft: {},
      isSuccess: false,
      hasHydrated: false,

      setHasHydrated: (value: boolean): void => {
        set({ hasHydrated: value });
      },

      nextCreateStep: (): void => {
        const { createStep, createTaskDraft } = get();
        const isDonation = isDonationCategory(createTaskDraft.category);

        if (createStep === DESCRIPTION_STEP && !isDonation) {
          set({ createStep: PREVIEW_STEP });
        } else {
          set({
            createStep: Math.min(createStep + 1, CREATE_TASK_STEPS.length - 1),
          });
        }
      },

      prevCreateStep: (): void => {
        const { createStep, createTaskDraft } = get();
        const isDonation = isDonationCategory(createTaskDraft.category);

        if (createStep === PREVIEW_STEP && !isDonation) {
          set({ createStep: DESCRIPTION_STEP });
        } else {
          set({ createStep: Math.max(createStep - 1, 0) });
        }
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
          const isDonation = isDonationCategory(nextDraft.category);

          if (!isDonation) {
            nextDraft.amount = undefined as unknown as number;
            nextDraft.currency = undefined;
          }

          return { createTaskDraft: nextDraft };
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
