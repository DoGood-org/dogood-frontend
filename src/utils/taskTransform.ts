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

  const normalized = time.includes(':') ? time.split(':') : time.split('-');

  if (normalized.length !== 2) return time;

  const hourNum = Number(normalized[0]);
  const minuteNum = Number(normalized[1]);

  if (isNaN(hourNum) || isNaN(minuteNum)) return time;

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
    host: task.host,
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

export const formatISOTimeTo12h = (isoString?: string): string => {
  if (!isoString) return '';

  if (isoString.includes('AM') || isoString.includes('PM')) {
    return isoString;
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    if (isoString.includes(':')) return formatTime(isoString);
    return '';
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;
};

export const getDistanceStr = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  if (d < 1000) {
    return `${Math.round(d)} km`;
  }

  const km = d / 1000;

  return km > 10 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`;
};
