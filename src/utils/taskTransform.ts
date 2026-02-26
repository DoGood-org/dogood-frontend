import {
  ITaskDetails,
  TaskStatus,
  UserParticipationStatus,
  TaskActionType,
} from '@/types/tasks.type';
import { TaskCategoryEnum } from '@/types/createTask.type';

export interface TaskPreviewProps {
  task?: ITaskDetails;
}

export const formatTime = (time: string): string => {
  if (!time || typeof time !== 'string') return '';

  const parts = time.split('-');
  if (parts.length !== 2) return '';

  const hourNum = Number(parts[0]);
  const minuteNum = Number(parts[1]);

  if (isNaN(hourNum) || isNaN(minuteNum)) return '';

  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 || 12;

  return `${hour12.toString().padStart(2, '0')}:${minuteNum
    .toString()
    .padStart(2, '0')} ${ampm}`;
};

const parseDate = (date?: string | number | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};

export function transformBackendTaskToITaskDetails({
  task,
}: TaskPreviewProps): ITaskDetails {
  if (!task || typeof task !== 'object') {
    throw new Error('Invalid task data from backend');
  }

  const lat =
    typeof task.lat === 'number' ? task.lat : (task.location?.lat ?? 0);
  const lng =
    typeof task.lng === 'number' ? task.lng : (task.location?.lng ?? 0);

  const category: TaskCategoryEnum[] = Array.isArray(task.category)
    ? task.category.filter((c): c is TaskCategoryEnum =>
        Object.values(TaskCategoryEnum).includes(c as TaskCategoryEnum)
      )
    : [];

  const isActuallyFundraising =
    category.includes(TaskCategoryEnum.Donation) || Number(task.amount) > 0;
  const actionType = isActuallyFundraising
    ? TaskActionType.FUNDRAISING
    : task.actionType || TaskActionType.VOLUNTEERING;

  return {
    id: task.id ?? `task-${Date.now()}`,
    title: task.title || '',
    subtitle: task.subtitle || '',
    description: task.description || '',
    distance: '0',
    lat,
    lng,
    category,
    picture: task.picture ?? null,
    status: Object.values(TaskStatus).includes(task.status)
      ? task.status
      : TaskStatus.PENDING,
    locationName: task.locationName || '',
    location: { lat, lng },
    organization: task.organization,
    startDate: parseDate(task.startDate),
    endDate: parseDate(task.endDate),
    startTime: formatTime(task.startTime || ''),
    actionType,
    userParticipationStatus:
      task.userParticipationStatus || UserParticipationStatus.NONE,
    requirements: task.requirements || '',
    amount: task.amount ?? 0,
    currency: task.currency || 'USD',
  };
}
