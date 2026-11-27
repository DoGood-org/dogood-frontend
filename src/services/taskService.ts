import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import type { CreateTaskApiPayload } from '@/utils/taskTransform';
import type { TaskStatus } from '@/types/tasks.type';
import { IAdminTask } from '@/types/admin';

// ============================================
// Response Interfaces
// ============================================

export interface ICreateTaskResponse {
  message: string;
  data: IAdminTask;
}

export interface IGetTaskByIdResponse {
  status: string;
  code: string;
  data: {
    task: IAdminTask;
  };
}

export interface IGetAllTasksResponse {
  status: string;
  code: string;
  data: {
    tasks: IAdminTask[];
  };
}

/**
 * Response of `DELETE /task/:id`.
 */
export interface IDeleteTaskResponse {
  message: string;
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
  return fetchFromApi<ICreateTaskResponse>('/task', {
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
  return fetchFromApi<IGetTaskByIdResponse>(`/task/${id}`, {
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
  return fetchFromApi<IGetAllTasksResponse>('/task', {
    method: 'GET',
    auth: true,
  });
};

/**
 * Delete a task by ID.
 * DELETE /task/:id
 */
export const deleteTaskService = async (
  id: string | number
): Promise<FetchResult<IDeleteTaskResponse>> => {
  return fetchFromApi<IDeleteTaskResponse>(`/task/${id}`, {
    method: 'DELETE',
    auth: true,
  });
};

/**
 * Update a task's status.
 * PATCH /task/:id/status   { status: "PENDING" }
 */
export const changeTaskStatusService = async (
  id: string | number,
  status: TaskStatus | string,
  rejectionReason?: string
): Promise<FetchResult<ICreateTaskResponse>> => {
  return fetchFromApi<ICreateTaskResponse>(`/task/${id}/status`, {
    method: 'PATCH',
    data: {
      status,
      ...(rejectionReason ? { rejectionReason } : {}),
    },
    auth: true,
  });
};
