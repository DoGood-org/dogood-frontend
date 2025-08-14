export async function withTryCatch<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (err: any) {
    console.error('Stripe API error:', err.message);
    throw err;
  }
}
