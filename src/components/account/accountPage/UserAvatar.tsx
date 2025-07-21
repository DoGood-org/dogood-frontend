import Image from 'next/image';
import { JSX } from 'react';

export const UserAavatar = (): JSX.Element => {
  return (
    <Image
      src="/account/userNone.png"
      alt="No user avatar"
      width={353}
      height={352}
      className="w-[353px] h-[352px] object-cover md:w-[270px] md:h-[323px] rounded-[10px]"
    />
  );
};
