// app/[locale]/(protected)/layout.tsx
import { ProtectedLayoutContent } from '@/components/account/ProtectedLayoutContent/ProtectedLayoutContent';
import { getServerCurrentUser } from '@/lib/server/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  const me = await getServerCurrentUser();

  if (!me) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    redirect(`${prefix}/login?next=/account`);
  }

  return (
    <>
      <ProtectedLayoutContent user={me}>{children}</ProtectedLayoutContent>
    </>
  );
}
