import {
  ArrowRight,
  Dollar,
  Gear,
  House,
  LogIn,
  LogOut,
  Megaphone,
  UsersThree,
} from '@/components/icons';
import { UserAvatar } from '../components/layout/header/UserAvatar';
import { useAuth } from '@/hooks/useAuth';

export const iconNames = [
  'LogIn',
  'ArrowRight',
  'LogOut',
  'User',
  'House',
  'Dollar',
  'UsersThree',
  'Gear',
  'Megaphone',
] as const;

export type IconName = (typeof iconNames)[number];

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
    House: <House className="size-6" />,
    Dollar: <Dollar className="size-6" />,
    UsersThree: <UsersThree className="size-6" />,
    Gear: <Gear className="size-6" />,
    Megaphone: <Megaphone className="size-6" />,
  };

  return iconComponents;
};
