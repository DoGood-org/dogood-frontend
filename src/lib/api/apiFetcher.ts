// import api from '@/lib/api';
import { AxiosError } from 'axios';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import * as Sentry from '@sentry/nextjs';
import { getApiInstance } from './getApiInstanse';

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

export type FetchSuccess<T> = {
  ok: true;
  data: T;
};

export type FetchFail = {
  ok: false;
  errorMessage: string;
  status?: number;
  code?: string;
  details?: any;
};

export type FetchResult<T> = FetchSuccess<T> | FetchFail;

export const fetchFromApi = async <T>(
  endpoint: string,
  options: FetchFromApiOptions = {}
): Promise<FetchResult<T>> => {
  const {
    method = 'GET',
    data,
    params = {},
    headers = {},
    auth = false,
  } = options;

  try {
    const instance = getApiInstance(auth);
    const response = await instance.request({
      url: endpoint,
      method,
      data,
      params,
      headers: {
        ...(data instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        ...headers,
      },
    });

    return {
      ok: true,
      data: response.data as T,
    };
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred';
    let status: number | undefined;
    let code: string | undefined;
    let details: any;

    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorData = axiosError.response?.data;

      status = axiosError.response?.status;
      code = errorData?.code;
      details = errorData?.details;
      errorMessage =
        errorData?.message ||
        axiosError.message ||
        'An unexpected error occurred';

      Sentry.captureException(axiosError, {
        tags: {
          scope: 'fetchFromApi',
          endpoint,
          method,
          auth: String(auth),
        },
        extra: {
          status,
          code,
          details,
          params,
          rawError: errorData,
        },
      });
    } else if (error instanceof Error) {
      errorMessage = error.message;

      Sentry.captureException(error, {
        tags: {
          scope: 'fetchFromApi',
          endpoint,
          method,
          auth: String(auth),
        },
        extra: { params },
      });
    } else {
      errorMessage = 'Network error. Please check your Internet connection.';

      Sentry.captureMessage('Unknown error in fetchFromApi', {
        level: 'error',
        extra: { endpoint, method, auth, params, error },
      });
    }

    return {
      ok: false,
      errorMessage,
      status,
      code,
      details,
    };
  }
};
