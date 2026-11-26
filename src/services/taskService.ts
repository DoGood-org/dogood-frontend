import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import type {
  CreateTaskApiPayload,
  UpdateTaskApiPayload,
} from '@/utils/taskTransform';
import type {
  ISearchTasksPayload,
  ITaskDetails,
  TaskStatus,
} from '@/types/tasks.type';
import { apiRoutes } from '@/lib/server/apiRoutes';

export interface ITaskApi {
  id: string;
  title: string;
  description: string;
  picture: string | null;
  startDate: string;
  endDate: string;
  location: { lat: number; lng: number };
  locationName: string;
  status: string;
  amount: number | null;
  currentAmount: number | null;
  currency: string | null;
  requirements: string;
  categories: string[];
  host: ITaskDetails['host'];
  joinedUsers: Array<{ id: string; name: string }>;
  organizationId?: string;
  isOrganization?: boolean;
  createdAt?: string;
}

export interface IUpdateTaskResponse {
  status: string;
  code: string;
  data: { task: ITaskApi };
}

// ============================================
// Response Interfaces
// ============================================

export interface ICreateTaskResponse {
  status: string;
  code: string;
  data: { task: ITaskApi };
}

export interface IGetTaskByIdResponse {
  status: string;
  code: string;
  data: {
    task: ITaskApi;
  };
}

/**
 *Get all tasks (paginated).
 */
export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type IPaginationParams = {
  page?: number;
  limit?: number;
};

export interface IGetAllTasksResponse {
  status: string;
  code: string;
  data: {
    tasks: ITaskApi[];
  };
  pagination: IPagination;
}

// ============================================
// API Services
// ============================================

/**
 * Create a new task.
 * POST /task
 */
export const createTaskService = async (
  payload: CreateTaskApiPayload
): Promise<FetchResult<ICreateTaskResponse>> => {
  return fetchFromApi<ICreateTaskResponse>(apiRoutes.tasks.create, {
    method: 'POST',
    data: payload,
    auth: true,
  });
};

/**
 * Get a single task by ID.
 * GET /task/:id
 */
export const getTaskByIdService = async (
  id: string | number
): Promise<FetchResult<IGetTaskByIdResponse>> => {
  return fetchFromApi<IGetTaskByIdResponse>(apiRoutes.tasks.getById(id), {
    method: 'GET',
    auth: true,
  });
};

/**
 * Get all tasks.
 * GET /task
 */
export const getAllTasksService = async (
  params: IPaginationParams = {}
): Promise<FetchResult<IGetAllTasksResponse>> => {
  return fetchFromApi<IGetAllTasksResponse>(apiRoutes.tasks.list, {
    method: 'GET',
    params,
    auth: true,
  });
};

/**
 * Search tasks.
 * POST /task/search
 */

export const searchTasksService = async (
  payload: ISearchTasksPayload,
  params: IPaginationParams = {}
): Promise<FetchResult<IGetAllTasksResponse>> => {
  return fetchFromApi<IGetAllTasksResponse>(apiRoutes.tasks.search, {
    method: 'POST',
    data: payload,
    params,
    auth: true,
  });
};

/**
 * Update an existing task (host only).
 * PATCH /task/:id
 */

export const updateTaskService = async (
  id: string | number,
  payload: UpdateTaskApiPayload
): Promise<FetchResult<IUpdateTaskResponse>> => {
  return fetchFromApi<IUpdateTaskResponse>(apiRoutes.tasks.update(id), {
    method: 'PATCH',
    data: payload,
    auth: true,
  });
};

/**
 * Change task status (host: COMPLETED / CLOSED only).
 * PATCH /task/:id/status
 */

export const updateTaskStatusService = (
  id: string | number,
  status: TaskStatus,
  rejectionReason?: string
): Promise<FetchResult<unknown>> =>
  fetchFromApi(apiRoutes.tasks.updateStatus(id), {
    method: 'PATCH',
    data: { status, rejectionReason },
    auth: true,
  });

/**
 * Delete a task (host only).
 * DELETE /task/:id
 */

export const deleteTaskService = async (
  id: string | number
): Promise<FetchResult<IUpdateTaskResponse>> => {
  return fetchFromApi<IUpdateTaskResponse>(apiRoutes.tasks.delete(id), {
    method: 'DELETE',
    auth: true,
  });
};
