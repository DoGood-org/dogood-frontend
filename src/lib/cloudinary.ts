import { ApiError, fetchFromApi } from './apiFetcher';

export interface CloudinaryDeleteResponse {
  result: string;
  [key: string]: any;
}

export interface CloudinaryErrorResponse {
  error: string;
  details?: any;
  url?: string;
}

export const deleteFromCloudinary = async (
  url: string
): Promise<CloudinaryDeleteResponse | CloudinaryErrorResponse> => {
  if (!isCloudinaryUrl(url)) {
    console.error('Not a valid Cloudinary URL:', url);
    return { error: 'Not a Cloudinary URL' };
  }

  try {
    const result = await fetchFromApi<CloudinaryDeleteResponse>(
      '/api/cloudinary/delete',
      {
        method: 'POST',
        data: { url },
        auth: true,
      }
    );

    // Check if the request was successful
    if (!result.ok) {
      return {
        error: result.errorMessage,
        details: result.details,
        statusCode: result.status,
        url,
      };
    }

    // Now we can safely access result.data since we know it's a success
    const data = result.data;

    if (data.result !== 'ok' && data.result !== 'not found') {
      return {
        error:
          (data as any).error?.message || `Cloudinary error: ${data.result}`,
        details: data,
        url,
      };
    }

    return data;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);

    if (error instanceof ApiError) {
      return {
        error: error.message,
        details: error.details,
        statusCode: error.status,
        url,
      };
    }

    return {
      error: error instanceof Error ? error.message : String(error),
      url,
    };
  }
};

export const isCloudinaryUrl = (url: string): boolean => {
  return (
    typeof url === 'string' &&
    url.includes('cloudinary.com') &&
    url.includes('/upload/')
  );
};
