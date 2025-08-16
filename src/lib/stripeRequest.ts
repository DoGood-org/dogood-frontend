import type { AxiosResponse } from 'axios';

export async function stripeRequest<T>(
  req: Promise<AxiosResponse<any>>,
  map?: (data: any) => T
): Promise<T> {
  try {
    const res = await req;
    const data = res?.data;
    return map ? map(data) : (data as T);
  } catch (err: any) {
    console.error('Stripe API error:', err?.message ?? err);
    throw err;
  }
}
