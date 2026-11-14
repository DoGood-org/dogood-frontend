import {
  HostUser,
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
import { hostMapping } from './hostMapping';
import type { ITaskApi } from '@/services/taskService';

export interface BackendTaskInput {
  task?: ITaskApi;
}

// ---------------------------------------------------------------------------
// Time / date helpers
// ---------------------------------------------------------------------------

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

export const formatDateForPreview = (date?: Date | string): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
};

/**
 * Combines a form time string ("HH:mm" or "HH-mm") with the picked start date
 * and returns an ISO string. Falls back to the date's own time if the input
 * is missing or invalid.
 */
export const combineDateTime = (date: Date, time?: string): string => {
  const safeDate = new Date(date);
  if (isNaN(safeDate.getTime())) return new Date().toISOString();

  if (!time) return safeDate.toISOString();

  const parts = time.includes(':') ? time.split(':') : time.split('-');
  if (parts.length !== 2) return safeDate.toISOString();

  const hour = Number(parts[0]);
  const minute = Number(parts[1]);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return safeDate.toISOString();
  }

  const d = new Date(safeDate);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

// Currency
const SUPPORTED_CURRENCIES = ['USD', 'EUR'] as const;
type Currency = (typeof SUPPORTED_CURRENCIES)[number];

const toCurrency = (raw?: string | null): Currency =>
  SUPPORTED_CURRENCIES.includes(raw as Currency) ? (raw as Currency) : 'USD';

// ---------------------------------------------------------------------------
// Category casing helpers
//
// Frontend uses lowercase (`TaskCategoryEnum.Nature === 'nature'`),
// backend uses uppercase (`'NATURE'`). These helpers convert at the boundary.
// ---------------------------------------------------------------------------

/** Frontend category → backend wire value (lowercase → UPPERCASE). */
export const toApiCategory = (c: TaskCategoryEnum): string => c.toUpperCase();

/** Backend wire value → frontend category (UPPERCASE → lowercase), or null if unknown. */
export const fromApiCategory = (raw: unknown): TaskCategoryEnum | null => {
  if (typeof raw !== 'string') return null;

  const lowered = raw.toLowerCase();

  return Object.values(TaskCategoryEnum).includes(lowered as TaskCategoryEnum)
    ? (lowered as TaskCategoryEnum)
    : null;
};

// ---------------------------------------------------------------------------
// Distance
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Backend task → ITaskDetails
// ---------------------------------------------------------------------------

export function transformBackendTaskToITaskDetails({
  task,
}: BackendTaskInput): ITaskDetails {
  if (!task || typeof task !== 'object') {
    throw new Error('Invalid task data from backend');
  }

  const category: TaskCategoryEnum[] = Array.isArray(task.categories)
    ? task.categories
        .map(fromApiCategory)
        .filter((c): c is TaskCategoryEnum => c !== null)
    : [];

  const lat = task.location?.lat ?? 0;
  const lng = task.location?.lng ?? 0;

  const joinedUsers = Array.isArray(task.joinedUsers)
    ? task.joinedUsers.map((u) => ({
        id: String(u.id ?? ''),
        name: u.name ?? '',
      }))
    : [];

  const status = Object.values(TaskStatus).includes(task.status as TaskStatus)
    ? (task.status as TaskStatus)
    : TaskStatus.PENDING;
  console.log('[TASK CREATED AT]', {
    id: task.id,
    title: task.title,
    createdAt: task.createdAt,
    type: typeof task.createdAt,
  });

  return {
    id: String(
      task.id ??
        (task as { _id?: string })._id ??
        (task as { taskId?: string }).taskId ??
        `task-${Date.now()}`
    ),
    title: task.title || '',
    description: task.description || '',
    category,
    picture: task.picture ?? null,
    status,
    locationName: task.locationName || '',
    location: { lat, lng },
    host: task.host,
    organizationId: task.organizationId ?? '',
    startDate: parseDate(task.startDate),
    endDate: parseDate(task.endDate),
    startTime: formatISOTimeTo12h(task.startTime),
    requirements: task.requirements || '',
    amount: task.amount ?? 0,
    currentAmount: task.currentAmount ?? 0,
    currency: toCurrency(task.currency),
    createdAt: task.createdAt ?? '',
    isOrganization: task.isOrganization ?? false,
    joinedUsers,
  };
}

// ---------------------------------------------------------------------------
// Form → local preview task (IExtendedITaskProps)
// ---------------------------------------------------------------------------

export const mapFormToCreateTask = (
  data: BasicInfoFormValues,
  options: {
    currentUser?: HostUser | null;
    organizations?: OrganizationFromBack[];
    id?: string;
  }
): IExtendedITaskProps => {
  const { currentUser, organizations, id } = options;

  const startDateRaw = data.startDate ?? defaultTaskValues.startDate;
  const endDateRaw = data.endDate ?? defaultTaskValues.endDate;

  const startDate = startDateRaw ? new Date(startDateRaw) : new Date();
  const endDate = endDateRaw ? new Date(endDateRaw) : startDate;

  return {
    id: id ?? 'preview-task',
    title: data.title,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    startTime: combineDateTime(startDate, data.startTime),
    picture: data.picture ?? null,
    description: data.description,
    category: data.category,
    locationName: data.locationName ?? defaultTaskValues.locationName,
    location: data.location ?? defaultTaskValues.location,
    status: TaskStatus.PENDING,
    host: hostMapping(data, currentUser ?? null, organizations ?? []),
    amount: data.amount ?? 0,
    currency: data.currency ?? 'USD',
    requirements: data.requirements ?? '',
    organizationId: data.organizationId ?? '',
    isOrganization: data.isOrganization,
    joinedUsers: [],
  };
};

// ---------------------------------------------------------------------------
// Form → API payload (POST /task)
// ---------------------------------------------------------------------------

export interface CreateTaskApiPayload {
  title: string;
  description: string;
  /** Omitted when empty/null — backend rejects empty string with "Invalid url". */
  picture?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  location?: { lat: number; lng: number };
  locationName: string;
  /** Only present for donation tasks. */
  amount?: number;
  /** Only present for donation tasks. */
  currency?: string;
  requirements: string;
  /** Uppercased enum strings, e.g. `['NATURE', 'ANIMAL']`. */
  categories: string[];
  isOrganization: boolean;
  /** Omitted when `isOrganization === false` — backend rejects `null`. */
  organizationId?: string;
}

export const mapFormToApiPayload = (
  data: BasicInfoFormValues,
  options: { isDonation?: boolean } = {}
): CreateTaskApiPayload => {
  const { isDonation } = options;

  const startDate = data.startDate
    ? new Date(data.startDate)
    : new Date(defaultTaskValues.startDate ?? Date.now());

  const endDate = data.endDate ? new Date(data.endDate) : startDate;

  const donation =
    isDonation ??
    (Array.isArray(data.category) &&
      data.category.includes(TaskCategoryEnum.Donation));

  const payload: CreateTaskApiPayload = {
    title: data.title ?? '',
    description: data.description ?? '',
    startDate: startDate.toISOString(),
    startTime: combineDateTime(startDate, data.startTime),
    endDate: endDate.toISOString(),
    locationName: data.locationName ?? '',
    requirements: data.requirements ?? '',
    categories: (data.category ?? []).map(toApiCategory),
    isOrganization: !!data.isOrganization,
  };

  // Picture is optional and must be a valid URL if sent. Omit when empty
  // to avoid the backend's "Invalid url" error.
  if (data.picture) {
    payload.picture = data.picture;
  }

  if (data.location) {
    payload.location = {
      lat: data.location.lat,
      lng: data.location.lng,
    };
  }

  // Backend's schema expects a string, not null. Omit for user-hosted tasks.
  if (data.isOrganization && data.organizationId) {
    payload.organizationId = data.organizationId;
  }

  if (donation) {
    payload.amount = data.amount ?? 0;
    payload.currency = data.currency ?? 'USD';
  }

  return payload;
};
