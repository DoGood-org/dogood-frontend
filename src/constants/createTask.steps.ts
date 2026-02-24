import { Step1BasicInfo } from '@/components/tasks/createPage/steps/Step1BasicInfo/Step1BasicInfo';
import { Step2Category } from '@/components/tasks/createPage/steps/Step2Categories/Step2Category';
import { Step3Description } from '@/components/tasks/createPage/steps/Step3Description/Step3Description';
import { Step4Payment } from '@/components/tasks/createPage/steps/Step4Payment/Step4Payment';
import { Step5Preview } from '@/components/tasks/createPage/steps/Step5Preview/Step5Preview';
import { BasicInfoFormValuesExtended } from '@/types/createTask.type';
import { JSX } from 'react';
import { Path } from 'react-hook-form';

interface TaskStep<Props = object> {
  id: string;
  title: string;
  component: (props: Props) => JSX.Element;
  fields: Path<BasicInfoFormValuesExtended>[];
}

export const CREATE_TASK_STEPS: TaskStep[] = [
  {
    id: 'basic',
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
    id: 'category',
    title: 'Category',
    component: Step2Category,
    fields: ['category'],
  },
  {
    id: 'description',
    title: 'Description',
    component: Step3Description,
    fields: ['description'],
  },
  {
    id: 'payment',
    title: 'Payment',
    component: Step4Payment,
    fields: ['amount', 'currency'],
  },
  {
    id: 'preview',
    title: 'Preview',
    component: Step5Preview,
    fields: [],
  },
];
