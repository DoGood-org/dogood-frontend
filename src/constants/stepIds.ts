export const STEP_IDS = {
  OWNER: 'owner',
  BASIC: 'basic',
  CATEGORY: 'category',
  DESCRIPTION: 'description',
  PAYMENT: 'payment',
  PREVIEW: 'preview',
} as const;

export type StepId = (typeof STEP_IDS)[keyof typeof STEP_IDS];
