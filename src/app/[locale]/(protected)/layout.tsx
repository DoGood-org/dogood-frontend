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

  const currentUserData = await getServerCurrentUser();

  if (!currentUserData) {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    redirect(`${prefix}/login?next=/account`);
  }

  if ('isBanned' in currentUserData) {
    return (
      <ProtectedLayoutContent
        user={null}
        bannedUser={currentUserData.bannedUser}
      >
        {children}
      </ProtectedLayoutContent>
    );
  }

  return (
    <ProtectedLayoutContent user={currentUserData}>
      {children}
    </ProtectedLayoutContent>
  );
}
