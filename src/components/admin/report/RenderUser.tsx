import { RenderUserProps } from '@/types/reportType';
import Image from 'next/image';
import React, { JSX } from 'react';

export const RenderUser = ({
  user,
  className = '',
}: RenderUserProps): JSX.Element => (
  <div className={`flex items-center gap-2 min-w-0 ${className}`}>
    <Image
      src={user.avatar}
      alt={user.name}
      className="w-[18px] h-[18px] rounded-full flex-shrink-0"
      width={40}
      height={40}
    />
    <span className="truncate" title={user.name}>
      {user.name}
    </span>
  </div>
);
