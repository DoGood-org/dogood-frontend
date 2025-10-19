function safeNext(raw: string | null): string {
  if (!raw) return '/';
  const decoded = decodeURIComponent(raw);
  // prevent open-redirects: allow only same-site paths
  if (!decoded.startsWith('/') || decoded.startsWith('//')) return '/';
  return decoded;
}
export { safeNext };
