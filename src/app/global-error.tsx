'use client';
import React, { type JSX } from 'react';
import { Button } from '@/components/ui/Button';
const GlobalErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element => {
  console.log(error);
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <Button variant="default" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
};

export default GlobalErrorPage;

export const metadata = {
  title: 'Global Error',
  description: 'An error occurred',
};
