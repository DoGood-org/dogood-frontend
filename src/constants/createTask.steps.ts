import { Step0TaskOwner } from '@/components/tasks/createPage/steps/Step0TaskOwner/Step0TaskOwner';
import { Step1BasicInfo } from '@/components/tasks/createPage/steps/Step1BasicInfo/Step1BasicInfo';
import { Step2Category } from '@/components/tasks/createPage/steps/Step2Categories/Step2Category';
import { Step3Description } from '@/components/tasks/createPage/steps/Step3Description/Step3Description';
import { Step4Payment } from '@/components/tasks/createPage/steps/Step4Payment/Step4Payment';
import { Step5Preview } from '@/components/tasks/createPage/steps/Step5Preview/Step5Preview';
import { BasicInfoFormValues } from '@/lib/validation/createTask.schema';
import { CreateTaskProp } from '@/types/createTask.type';
import { JSX } from 'react';
import { Path } from 'react-hook-form';
import { STEP_IDS, StepId } from '@/constants/stepIds';

interface TaskStep {
  id: StepId;
  title: string;
  component: (props: CreateTaskProp) => JSX.Element;
  fields: Path<BasicInfoFormValues>[];
}

export const CREATE_TASK_STEPS: TaskStep[] = [
  {
    id: STEP_IDS.OWNER,
    title: 'Task Owner',
    component: Step0TaskOwner,
    fields: [],
  },
  {
    id: STEP_IDS.BASIC,
    title: 'Basic info',
    component: Step1BasicInfo,
    fields: [
      'title',
      'locationName',
      'picture',
      'startTime',
      'startDate',
      'endDate',
    ],
  },
  {
    id: STEP_IDS.CATEGORY,
    title: 'Category',
    component: Step2Category,
    fields: ['category'],
  },
  {
    id: STEP_IDS.DESCRIPTION,
    title: 'Description',
    component: Step3Description,
    fields: ['description'],
  },
  {
    id: STEP_IDS.PAYMENT,
    title: 'Payment',
    component: Step4Payment,
    fields: ['amount', 'currency'],
  },
  {
    id: STEP_IDS.PREVIEW,
    title: 'Preview',
    component: Step5Preview,
    fields: [],
  },
];
