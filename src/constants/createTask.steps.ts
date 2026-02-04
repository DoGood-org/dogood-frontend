import { Step1BasicInfo } from '@/components/tasks/createPage/steps/Step1BasicInfo/Step1BasicInfo';
import { Step2Category } from '@/components/tasks/createPage/steps/Step2Categories/Step2Category';
import { Step3Description } from '@/components/tasks/createPage/steps/Step3Description/Step3Description';
import { Step4Payment } from '@/components/tasks/createPage/steps/Step4Payment/Step4Payment';
import { Step5Preview } from '@/components/tasks/createPage/steps/Step5Preview/Step5Preview';

export const CREATE_TASK_STEPS = [
  {
    id: 'basic',
    title: 'Basic info',
    component: Step1BasicInfo,
    fields: ['title', 'location', 'picture', 'time', 'startDate', 'finishDate'],
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
