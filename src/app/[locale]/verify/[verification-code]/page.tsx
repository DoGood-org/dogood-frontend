import { Tlocale } from '@/types';
import { Metadata } from 'next';
import { JSX } from 'react';

interface Props {
  params: { code: string; locale: Tlocale };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = params;

  if (!code) {
    return {
      title: 'Verification failed',
      description: 'Verification code is missing.',
    };
  }

  console.log('Verification code:', code);

  return {
    title: 'Verify Email',
    description: 'Verifying your email address.',
  };
}

export default async function Verify({ params }: Props): Promise<JSX.Element> {
  const { code } = params;
  console.log('Verification code:', params);

  // Perform verification when the component is rendered

  return (
    <div className="flex flex-col items-center justify-center text-foreground w-full">
      {code ? (
        <p>User verified successfully.</p>
      ) : (
        <p>Verification failed. Please try again.</p>
      )}
    </div>
  );
}
