'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX, ReactNode, useState } from 'react';

export function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000, // 30 сек
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
