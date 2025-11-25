import { fetchFromApi } from './apiFetcher';
import * as Sentry from '@sentry/nextjs';

export interface CloudinaryDeleteResponse {
  result: string;
  [key: string]: any;
}

export interface CloudinaryErrorResponse {
  error: string;
  details?: any;
  url?: string;
  statusCode?: number;
}

export const deleteFromCloudinary = async (
  url: string
): Promise<CloudinaryDeleteResponse | CloudinaryErrorResponse> => {
  if (!isCloudinaryUrl(url)) {
    Sentry.captureMessage('Attempt to delete non-Cloudinary URL', {
      level: 'warning',
      extra: {
        url: url.substring(0, 100),
        operation: 'cloudinary-delete-validation',
      },
      tags: {
        scope: 'cloudinary-validation',
      },
    });
    return { error: 'Not a Cloudinary URL' };
  }

  const result = await fetchFromApi<CloudinaryDeleteResponse>(
    '/api/cloudinary/delete',
    {
      method: 'POST',
      data: { url },
      auth: true,
    }
  );

  if (!result.ok) {
    Sentry.captureException(
      new Error('Cloudinary deletion API request failed'),
      {
        level: 'error',
        extra: {
          url: url.substring(0, 100),
          errorMessage: result.errorMessage,
          status: result.status,
          code: result.code,
          details: result.details,
        },
        tags: {
          scope: 'cloudinary-api',
          endpoint: '/api/cloudinary/delete',
        },
      }
    );

    return {
      error: result.errorMessage,
      details: result.details,
      statusCode: result.status,
      url,
    };
  }

  const data = result.data;

  if (data.result !== 'ok' && data.result !== 'not found') {
    Sentry.captureException(
      new Error('Cloudinary deletion returned unexpected result'),
      {
        level: 'warning',
        extra: {
          url: url.substring(0, 100),
          cloudinaryResult: data.result,
          fullResponse: data,
        },
        tags: {
          scope: 'cloudinary-response',
        },
      }
    );

    return {
      error: (data as any).error?.message || `Cloudinary error: ${data.result}`,
      details: data,
      url,
    };
  }

  return data;
};

export const isCloudinaryUrl = (url: string): boolean => {
  const isCloudinary =
    typeof url === 'string' &&
    url.includes('cloudinary.com') &&
    url.includes('/upload/');

  if (!isCloudinary && typeof url === 'string' && url.length > 0) {
    Sentry.captureMessage('Invalid Cloudinary URL format detected', {
      level: 'debug',
      extra: {
        url: url.substring(0, 100),
        hasCloudinaryDomain: url.includes('cloudinary.com'),
        hasUploadPath: url.includes('/upload/'),
      },
      tags: {
        scope: 'cloudinary-validation',
      },
    });
  }

  return isCloudinary;
};
