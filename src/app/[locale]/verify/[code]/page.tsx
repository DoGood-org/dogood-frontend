import { Tlocale } from '@/types';
import { Metadata } from 'next';
import { JSX } from 'react';

interface Props {
  params: Promise<{ code: string; locale: Tlocale }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  if (!code) {
    return {
      title: 'Verification failed',
      description: 'Verification code is missing.',
    };
  }

  return {
    title: 'Verify Email',
    description: 'Verifying your email address.',
  };
}

export default async function Verify({ params }: Props): Promise<JSX.Element> {
  const { code } = await params;

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
