import { ArrowRight, LogIn, LogOut } from '@/components/icons';
import { UserAvatar } from '../components/layout/header/UserAvatar';
import { useAuth } from '@/hooks/useAuth';

export type IconName = 'LogIn' | 'ArrowRight' | 'LogOut' | 'User';

export const useIconComponents = (): Record<IconName, React.ReactNode> => {
  const { isLoggedIn, user } = useAuth();
  const safeUser = user ?? undefined;

  const iconComponents: Record<IconName, React.ReactNode> = {
    LogIn: <LogIn className="size-6" />,
    ArrowRight: <ArrowRight className="size-6" />,
    LogOut: <LogOut className="size-6" />,
    User: (
      <UserAvatar
        isLoggedIn={isLoggedIn}
        user={safeUser}
        className="size-6 w-6 h-6"
      />
    ),
  };

  return iconComponents;
};
