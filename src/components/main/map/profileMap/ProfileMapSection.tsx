'use client';
import React, { JSX } from 'react';
import dynamic from 'next/dynamic';
import ContentLoader from '@/components/ui/ContentLoader';

const ProfileMap = dynamic(
  () =>
    import('@/components/main/map/profileMap/ProfileMap').then(
      (mod) => mod.ProfileMap
    ),
  {
    ssr: false,
    loading: (): JSX.Element => <ContentLoader />,
  }
);

export const ProfileMapSection: React.FC = () => {
  return <ProfileMap />;
};
