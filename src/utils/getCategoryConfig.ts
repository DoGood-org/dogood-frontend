import { CATEGORIES, CategoryConfig } from '@/constants/createTask.categories';
import { TaskCategoryEnum } from '@/types/createTask.type';

export const getCategoryConfig = (
  raw: TaskCategoryEnum | string | null | undefined
): CategoryConfig | undefined => {
  if (!raw) return undefined;
  const key = String(raw).toLowerCase();
  return CATEGORIES.find((c) => c.id === (key as TaskCategoryEnum));
};
