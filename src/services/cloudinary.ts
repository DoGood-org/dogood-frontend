import { fetchFromApi, FetchResult } from '../lib/api/apiFetcher';

export interface CloudinaryDeleteResponse {
  result: string;
  [key: string]: any;
}
export const deleteFromCloudinary = async (
  url: string
): Promise<FetchResult<CloudinaryDeleteResponse>> => {
  return await fetchFromApi('/api/cloudinary/delete', {
    method: 'POST',
    data: { url },
    auth: true,
  });
};
