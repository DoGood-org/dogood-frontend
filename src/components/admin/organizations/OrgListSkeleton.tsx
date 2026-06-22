import { JSX } from 'react';
import { OrgItemSkeleton } from './OrgItemSketeton';

export const OrgListSkeleton = ({ count }: { count: number }): JSX.Element => {
  return (
    <ul className="flex flex-col gap-[18px] md:gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <OrgItemSkeleton />
        </li>
      ))}
    </ul>
  );
};
