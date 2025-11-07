import dynamic from 'next/dynamic';

export function lazyImport<T extends Record<string, any>, K extends keyof T>(
  factory: () => Promise<T>,
  name: K
): T[K] {
  return dynamic(
    async () => {
      const lazyModule = await factory();
      return lazyModule[name];
    },
    { ssr: false }
  ) as unknown as T[K];
}
