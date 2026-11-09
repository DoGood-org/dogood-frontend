import { JSX } from 'react';
import { MapSkeleton } from '../MapSkeleton';

export const ProfileMapSkeleton = (): JSX.Element => (
  <div className="w-[354px] h-[320px] mt-[60px] mb-[60px] md:w-[648px] md:h-[586px] lg:w-[1064px] lg:h-[904px] rounded-[10px] overflow-hidden">
    <MapSkeleton />
  </div>
);
