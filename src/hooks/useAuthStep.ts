'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useAuthStep = (
  basePath: string
): {
  step: string | null;
  emailFromUrl: string;
  setStep: (step: string | null, email?: string | undefined) => void;
} => {
  const router = useRouter();
  const params = useSearchParams();

  const setStep = (step: string | null, email?: string): void => {
    const query = new URLSearchParams(params.toString());

    if (step) {
      query.set('step', step);
    } else {
      query.delete('step');
    }

    if (email) {
      query.set('email', email);
    } else {
      query.delete('email');
    }

    const queryString = query.toString();

    router.replace(queryString ? `${basePath}?${queryString}` : basePath, {
      scroll: false,
    });
  };

  return {
    step: params.get('step'),
    emailFromUrl: params.get('email') ?? '',
    setStep,
  };
};
