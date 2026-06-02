import { SignIn } from '@/components/icons';
import { UserAvatar } from '@/components/layout/header/UserAvatar';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks';
import { authStore } from '@/zustand/stores/authStore';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import { toast } from 'react-toastify';

export const AdminButtons = (): JSX.Element => {
  const { user } = useAuth();
  const safeUser = user ?? undefined;
  const locale = useLocale();
  const router = useRouter();
  const { logout } = authStore();
  const t = useTranslations('adminNav');

  const handleLogOut = async (): Promise<void> => {
    await logout();
    toast.success('Logout successful');
    router.refresh();
  };

  return (
    <div className="flex justify-between lg:block">
      <Button
        asChild
        variant="ghost"
        className="flex justify-start gap-2 px-3 border-0 cursor-pointer text-foregroud hover:text-btn-hover"
      >
        <Link href={`/${locale}/account`}>
          <UserAvatar
            isLoggedIn={true}
            user={safeUser}
            className="w-6 h-6 size-6 min-w-6d"
          />
          {user?.name}
        </Link>
      </Button>
      <Button
        variant="ghost"
        onClick={handleLogOut}
        className="flex justify-start gap-2 px-3 border-0 cursor-pointer text-foregroud hover:text-btn-hover"
      >
        <SignIn className="size-6" />
        <p className="hidden md:block">{t('logout')}</p>
      </Button>
    </div>
  );
};
