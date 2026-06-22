import { JSX } from 'react';

export const OrgItemSkeleton = (): JSX.Element => {
  return (
    <div className="relative flex justify-between w-full px-3 py-5 rounded-lg md:p-3 lg:p-6 bg-card md:gap-8 animate-pulse">
      <div className="flex gap-4 w-full">
        {/* Avatar */}
        <div className="shrink-0 w-[75px] h-[75px] rounded-[10px] bg-placeholder/20" />

        {/* Content */}
        <div className="flex flex-col justify-center w-full gap-2">
          <div className="h-5 w-[60%] rounded bg-placeholder/20" />

          <div className="h-3 w-[80%] rounded bg-placeholder/20" />
        </div>
      </div>

      {/* Menu button */}
      <div className="w-8 h-8 rounded bg-placeholder/20 self-start" />
    </div>
  );
};
