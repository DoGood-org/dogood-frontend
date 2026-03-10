import {
  IExtendedITaskProps,
  ITaskDetails,
  OrganizationFromBack,
  TaskStatus,
} from '@/types/tasks.type';
import { TaskCategoryEnum } from '@/types/createTask.type';
import {
  BasicInfoFormValues,
  defaultTaskValues,
} from '@/lib/validation/createTask.schema';

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
  userLat: number,
  userLng: number,
  taskLat?: number,
  taskLng?: number
): string => {
  if (taskLat == null || taskLng == null) return '-- km';

  const R = 6371e3;
  const φ1 = (userLat * Math.PI) / 180;
  const φ2 = (taskLat * Math.PI) / 180;
  const Δφ = ((taskLat - userLat) * Math.PI) / 180;
  const Δλ = ((taskLng - userLng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const meters = R * c;
  const km = meters / 1000;

  if (km < 0.1) return '0.1 km';
  return km > 10 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`;
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

  return {
    id: task.id ?? `task-${Date.now()}`,
    title: task.title || '',
    subtitle: task.subtitle || '',
    description: task.description || '',
    distance: task.distance ?? '',
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
    requirements: task.requirements || '',
    amount: task.amount ?? 0,
    currency: task.currency || 'USD',
  };
}

export const mapFormToCreateTask = (
  data: BasicInfoFormValues,
  options: {
    currentUserId?: string;
    currentUserName?: string;
    organizations?: OrganizationFromBack[];
  }
): IExtendedITaskProps => {
  const { currentUserId, currentUserName, organizations } = options;

  const startDate = new Date(data.startDate ?? defaultTaskValues.startDate);
  const endDate = new Date(data.endDate ?? defaultTaskValues.endDate);

  const startTime = data.startTime
    ? ((): string => {
        const [hourStr, minuteStr] = data.startTime.split('-');
        const date = new Date(startDate);
        date.setHours(Number(hourStr), Number(minuteStr), 0, 0);
        return date.toISOString();
      })()
    : startDate.toISOString();

  const selectedOrg = organizations?.find(
    (org) => String(org.id) === String(data.organizationId)
  );

  const hostName =
    data.isOrganization && selectedOrg
      ? selectedOrg.name
      : !data.isOrganization && currentUserName
        ? currentUserName
        : '';

  return {
    id: crypto.randomUUID(),
    title: data.title,
    subtitle: data.description.slice(0, 60),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    startTime,
    picture: data.picture ?? null,
    description: data.description,
    category: data.category,
    locationName: data.locationName ?? defaultTaskValues.locationName,
    location: data.location ?? defaultTaskValues.location,
    lat: data.location?.lat ?? 0,
    lng: data.location?.lng ?? 0,
    distance: '0 km',
    status: TaskStatus.PENDING,
    host:
      data.isOrganization && selectedOrg
        ? {
            type: 'ORGANIZATION',
            organizationId: selectedOrg.id,
            name: selectedOrg.name,
          }
        : {
            type: 'USER',
            userId: Number(currentUserId ?? 0),
            name: hostName,
          },
    organization:
      data.isOrganization && selectedOrg
        ? { id: selectedOrg.id, name: selectedOrg.name }
        : null,
    isFavorite: false,
    isSelected: false,
    amount: data.amount ?? 0,
    currency: data.currency ?? 'USD',
    requirements: data.requirements ?? '',
  };
};
