import { CREATE_TASK_STEPS } from '@/constants/createTask.steps';
import { STEP_IDS, StepId } from '@/constants/stepIds';
import { CreateTaskDraft } from '@/types/createTask.type';
import { HostUser, OrganizationFromBack } from '@/types/tasks.type';
import { isDonationCategory } from '@/utils/isDonationCategory';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreateTaskState {
  createStep: StepId;
  stepHistory: StepId[];
  createTaskDraft: CreateTaskDraft;
  isSuccess: boolean;
  hasHydrated: boolean;
  currentUser: HostUser | null;
  organizations: OrganizationFromBack[];
}

interface CreateTaskActions {
  nextCreateStep: () => void;
  prevCreateStep: () => void;
  setCreateStep: (step: StepId) => void;
  setCreateTaskDraft: (data: CreateTaskDraft) => void;
  resetCreateTask: () => void;
  setIsSuccess: (status: boolean) => void;
  setHasHydrated: (value: boolean) => void;
  isNextStepPreview: () => boolean;
  setUserInfo: (user: HostUser | null) => void;
  setOrganizations: (orgs: OrganizationFromBack[]) => void;
}

const getNextStepIndex = (
  currentIndex: number,
  draft: CreateTaskDraft
): number => {
  let nextIndex = currentIndex + 1;
  const isDonation =
    isDonationCategory(draft.category) || Number(draft.amount) > 0;

  if (CREATE_TASK_STEPS[nextIndex]?.id === STEP_IDS.PAYMENT && !isDonation) {
    nextIndex++;
  }
  return nextIndex;
};

export const useCreateTaskStore = create<CreateTaskState & CreateTaskActions>()(
  persist(
    (set, get) => ({
      createStep: STEP_IDS.OWNER,
      stepHistory: [],
      createTaskDraft: {},
      isSuccess: false,
      hasHydrated: false,
      currentUser: null,
      organizations: [],

      setHasHydrated: (value: boolean): void => {
        set({ hasHydrated: value });
      },

      setUserInfo: (user: HostUser | null): void => {
        set({ currentUser: user });
      },
      setOrganizations: (orgs: OrganizationFromBack[]): void => {
        set({ organizations: orgs });
      },

      isNextStepPreview: (): boolean => {
        const state = get();
        const currentIndex = CREATE_TASK_STEPS.findIndex(
          (s) => s.id === state.createStep
        );
        const nextIndex = getNextStepIndex(currentIndex, state.createTaskDraft);

        return CREATE_TASK_STEPS[nextIndex]?.id === STEP_IDS.PREVIEW;
      },

      nextCreateStep: (): void => {
        set((state) => {
          const currentIndex = CREATE_TASK_STEPS.findIndex(
            (s) => s.id === state.createStep
          );
          const nextIndex = getNextStepIndex(
            currentIndex,
            state.createTaskDraft
          );

          if (nextIndex < CREATE_TASK_STEPS.length) {
            return {
              createStep: CREATE_TASK_STEPS[nextIndex].id,
              stepHistory: [...state.stepHistory, state.createStep],
            };
          }
          return state;
        });
      },

      prevCreateStep: (): void => {
        set((state) => {
          if (state.stepHistory.length > 0) {
            const newHistory = [...state.stepHistory];
            const previousStep = newHistory.pop() as StepId;

            return {
              createStep: previousStep,
              stepHistory: newHistory,
            };
          }
          return state;
        });
      },

      setCreateStep: (step): void => {
        set((state) => ({
          createStep: step,
          stepHistory: [...state.stepHistory, state.createStep],
        }));
      },

      setIsSuccess: (status: boolean): void => {
        set({ isSuccess: status });
      },

      setCreateTaskDraft: (data): void => {
        set((state) => {
          const nextDraft = { ...state.createTaskDraft, ...data };
          const isDonation = isDonationCategory(nextDraft.category);

          if (!isDonation) {
            nextDraft.amount = null;
            nextDraft.currency = undefined;
          }

          return { createTaskDraft: nextDraft };
        });
      },

      resetCreateTask: (): void => {
        set((state) => ({
          createStep: STEP_IDS.OWNER,
          stepHistory: state.stepHistory,
          createTaskDraft: {},
          isSuccess: false,
        }));
      },
    }),
    {
      name: 'create-task-storage',
      partialize: (state) => ({
        createStep: state.createStep,
        stepHistory: [],
        createTaskDraft: state.createTaskDraft,
        currentUser: state.currentUser,
      }),
      onRehydrateStorage:
        () =>
        (state?: CreateTaskState & CreateTaskActions): void => {
          state?.setHasHydrated(true);
        },
    }
  )
);
