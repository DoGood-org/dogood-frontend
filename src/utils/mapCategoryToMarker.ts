import { MarkerCategoryEnum } from '@/types';
import { TaskCategoryEnum } from '@/types/createTask.type';

export const mapCategoryToMarker = (
  category: TaskCategoryEnum
): MarkerCategoryEnum => {
  const mapping: Record<TaskCategoryEnum, MarkerCategoryEnum> = {
    [TaskCategoryEnum.Medicine]: MarkerCategoryEnum.Medicine,
    [TaskCategoryEnum.Nature]: MarkerCategoryEnum.Nature,
    [TaskCategoryEnum.Animal]: MarkerCategoryEnum.Animal,
    [TaskCategoryEnum.Food]: MarkerCategoryEnum.Food,
    [TaskCategoryEnum.Donation]: MarkerCategoryEnum.Donation,
  };

  return mapping[category] || MarkerCategoryEnum.Default;
};
