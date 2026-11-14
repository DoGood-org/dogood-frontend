import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import type { CreateTaskApiPayload } from '@/utils/taskTransform';
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
  startTime: string;
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

// ============================================
// Response Interfaces
// ============================================

export interface ICreateTaskResponse {
  message: string;
  data: ITaskApi;
}

export interface IGetTaskByIdResponse {
  status: string;
  code: string;
  data: {
    task: ITaskApi;
  };
}

export interface IGetAllTasksResponse {
  status: string;
  code: string;
  data: {
    tasks: ITaskApi[];
  };
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
export const getAllTasksService = async (): Promise<
  FetchResult<IGetAllTasksResponse>
> => {
  return fetchFromApi<IGetAllTasksResponse>(apiRoutes.tasks.list, {
    method: 'GET',
    auth: true,
  });
};

/**
 * POST search task.
 * POST /task/search
 */

export const searchTasksService = async (
  payload: ISearchTasksPayload
): Promise<FetchResult<IGetAllTasksResponse>> => {
  return fetchFromApi<IGetAllTasksResponse>(apiRoutes.tasks.search, {
    method: 'POST',
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
  status: TaskStatus
): Promise<FetchResult<unknown>> =>
  fetchFromApi(apiRoutes.tasks.updateStatus(id), {
    method: 'PATCH',
    data: { status },
    auth: true,
  });
