import { TaskCategoryEnum } from '@/types/createTask.type';

export const isDonationCategory = (
  category?: TaskCategoryEnum | TaskCategoryEnum[]
): boolean => {
  if (!category) return false;

  const categories = Array.isArray(category) ? category : [category];

  return categories.includes(TaskCategoryEnum.Donation);
};
