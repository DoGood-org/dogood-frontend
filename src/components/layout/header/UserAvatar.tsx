import Image from 'next/image';
import { User } from '@/components/icons';

interface UserAvatarProps {
  isLoggedIn: boolean;
  user?: {
    name?: string;
    image?: string;
  };
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  isLoggedIn,
  user,
  className,
}) => {
  if (!isLoggedIn) {
    return <User className={className} />;
  }

  if (user?.image) {
    return (
      <Image
        src={user.image}
        alt={user.name ?? 'User'}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`rounded-full bg-btn text-white flex items-center justify-center min-w-6 ${className}`}
    >
      <p className="text-[12px]/[18px]">{initials || 'U'}</p>
    </div>
  );
};
