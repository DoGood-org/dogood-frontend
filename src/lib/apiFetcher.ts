import api from '@/lib/api';
import { AxiosError } from 'axios';

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
  statusCode?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchFromApi = async <T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    auth?: boolean;
  } = {}
): Promise<T> => {
  const {
    method = 'GET',
    data = null,
    params = {},
    headers = {},
    auth = false,
  } = options;

  try {
    const instance = auth ? api.auth : api.guest;

    const response = await instance(endpoint, {
      method,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? params : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      throw new ApiError(
        errorData?.message ||
          axiosError.message ||
          'An unexpected error occurred',
        axiosError.response?.status,
        errorData?.code,
        errorData?.details
      );
    } else if (error instanceof Error) {
      throw new ApiError(error.message);
    } else {
      throw new ApiError(
        'Network error. Please check your Internet connection.'
      );
    }
  }
};
