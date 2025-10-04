import { cn } from '@/lib/utils';
import Image from 'next/image';
import { JSX } from 'react';

export const UserNoAvatar = ({
  className = '',
}: {
  className?: string;
}): JSX.Element => {
  return (
    <Image
      src="/account/avatar.png"
      alt="No user avatar"
      width={353}
      height={352}
      className={cn(
        'w-[353px] h-[352px] object-cover md:w-[270px] md:h-[323px] lg:w-[511px] lg:h-[611px]  rounded-[10px]',
        className
      )}
    />
  );
};
