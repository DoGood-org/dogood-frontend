import { TaskStatus } from '@/types/tasks.type';

const MAP_STATUSES: TaskStatus[] = [TaskStatus.CREATED, TaskStatus.IN_PROGRESS];

const PUBLIC_STATUSES: TaskStatus[] = [
  ...MAP_STATUSES,
  TaskStatus.COMPLETED,
  TaskStatus.CLOSED,
];

export const isMapTask = (status: string): boolean =>
  MAP_STATUSES.includes(status as TaskStatus);

export const isPublicTask = (status: string): boolean =>
  PUBLIC_STATUSES.includes(status as TaskStatus);

export const canViewTask = (status: string, isHost: boolean): boolean =>
  isHost || isPublicTask(status);
