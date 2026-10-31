import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import type { CreateTaskApiPayload } from '@/utils/taskTransform';
import type { ITaskDetails } from '@/types/tasks.type';

export interface ITask {
  id: number;
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
  joinedUsers: Array<{ id: number; name: string }>;
}

// ============================================
// Response Interfaces
// ============================================

export interface ICreateTaskResponse {
  message: string;
  data: ITask;
}

export interface IGetTaskByIdResponse {
  status: string;
  code: string;
  data: {
    task: ITask;
  };
}

export interface IGetAllTasksResponse {
  status: string;
  code: string;
  data: {
    tasks: ITask[];
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
