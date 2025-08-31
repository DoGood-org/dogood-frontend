import api from '@/lib/api';
import { AxiosError } from 'axios';
import { HTTP_METHOD } from 'next/dist/server/web/http';

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

export interface FetchFromApiOptions<
  D = unknown,
  P extends Record<string, unknown> = Record<string, unknown>,
> {
  method?: HTTP_METHOD;
  data?: D;
  params?: P;
  headers?: Record<string, string>;
  auth?: boolean;
}

export const fetchFromApi = async <T>(
  endpoint: string,
  options: FetchFromApiOptions = {}
): Promise<T> => {
  const {
    method = 'GET',
    data,
    params = {},
    headers = {},
    auth = false,
  } = options;

  try {
    const instance = auth ? api.auth : api.guest;

    const response = await instance(endpoint, {
      method,
      data,
      params,
      headers: {
        ...(data instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      withCredentials: auth,
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
