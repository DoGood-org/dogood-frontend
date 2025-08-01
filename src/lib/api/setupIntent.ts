export async function createSetupIntent(): Promise<any> {
  const res = await fetch('/api/setup-intent', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to create SetupIntent');
  return res.json(); // { client_secret }
}
