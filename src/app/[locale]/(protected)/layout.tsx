// app/[locale]/(protected)/layout.tsx
import { ProtectedLayoutContent } from '@/components/account/ProtectedLayoutContent/ProtectedLayoutContent';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { ICurrentUser } from '@/types';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  const me: ICurrentUser | null = await getServerCurrentUser(); // server
  if (!me) {
    // no user, redirect to login
    const localePrefix = locale === 'en' ? '' : `/${locale}`;
    redirect(`${localePrefix}/login?next=/account`);
  }

  return (
    <>
      <ProtectedLayoutContent user={me}>{children}</ProtectedLayoutContent>
    </>
  );
}
