'use client';
import React, { JSX } from 'react';
import dynamic from 'next/dynamic';
import { ProfileMapSkeleton } from './ProfileMapSkeleton';

const ProfileMap = dynamic(
  () =>
    import('@/components/main/map/profileMap/ProfileMap').then(
      (mod) => mod.ProfileMap
    ),
  {
    ssr: false,
    loading: (): JSX.Element => <ProfileMapSkeleton />,
  }
);

export const ProfileMapSection: React.FC = () => {
  return <ProfileMap />;
};
