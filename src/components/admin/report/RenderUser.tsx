import { RenderUserProps } from '@/types/reportType';
import Image from 'next/image';
import React, { JSX } from 'react';
import Link from 'next/link';

export const RenderUser = ({
  user,
  className = '',
  imgClassName = '',
  isRenderNameOnly = true,
}: RenderUserProps): JSX.Element => (
  <div className={`flex items-center gap-2 min-w-0 ${className}`}>
    {user.avatar && (
      <Image
        src={user.avatar}
        alt={user.name}
        className={`rounded-full flex-shrink-0 w-[18px] h-[18px] ${imgClassName}`}
        width={40}
        height={40}
      />
    )}
    {isRenderNameOnly && <Link href={`/profile/${user.id}`}>{user.name}</Link>}
  </div>
);
