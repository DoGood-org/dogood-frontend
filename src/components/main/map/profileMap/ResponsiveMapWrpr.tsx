'use client';
import { useMapStore } from '@/zustand/stores/mapStore';
import { JSX, useEffect } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

export const ResponsiveMapWrpr = (props: Props): JSX.Element => {
  const { fullscreenMap } = useMapStore();

  useEffect(() => {
    const pageContainer = document.querySelector('.account-layout-container');
    const profileMapWrapper = document.querySelector('.profile-map-wrapper');
    if (!pageContainer || !profileMapWrapper) return;

    if (fullscreenMap) {
      pageContainer.classList.add('p-0', 'relative');
      profileMapWrapper.classList.remove('relative');
    } else {
      pageContainer.classList.remove('p-0', 'relative');
      profileMapWrapper.classList.add('relative');
    }
  }, [fullscreenMap]);

  return (
    <motion.div
      key={fullscreenMap ? 'fullscreen' : 'default'}
      layout
      layoutRoot
      initial={{ opacity: 0.5, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }, // easeOut
        default: { duration: 0.4 },
      }}
      style={{ transformOrigin: 'center center' }}
      className={`transition-all duration-300 rounded-[10px] overflow-hidden ${
        fullscreenMap
          ? 'absolute w-full h-full left-0 top-0 justify-center items-center mx-auto z-[1000]'
          : 'w-[354px] h-[320px] mt-[60px] md:w-[648px] md:h-[586px] lg:w-[1064px] lg:h-[904px]'
      }`}
    >
      {props.children}
    </motion.div>
  );
};
