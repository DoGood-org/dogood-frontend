'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HeroPlanetLayerProps } from '@/types/heroTypes';
import PlanetMob from '@/assets/images/hero/PlanetMob.png';
import PlanetTabl from '@/assets/images/hero/PlanetTabl.png';
import PlanetDesk from '@/assets/images/hero/PlanetDesck.png';
import { useResponsiveImage } from '@/hooks/useResponsiveImage';

export const HeroPlanetLayer: React.FC<HeroPlanetLayerProps> = ({
  yPlanet,
  opacity,
}) => {
  const {
    image: heroImage,
    isMobile,
    isTablet,
  } = useResponsiveImage({
    mobile: PlanetMob,
    tablet: PlanetTabl,
    desktop: PlanetDesk,
  });
  const getDimensions = (): {
    width: number;
    height: number;
  } => {
    if (isMobile) return { width: 393, height: 397 };
    if (isTablet) return { width: 398, height: 397 };
    return { width: 991, height: 990 };
  };

  const { width, height } = getDimensions();
  return (
    <div className="absolute md:bottom-[-450px] lg:bottom-[-500px] w-full pointer-events-none z-25">
      <div className="sticky top-0 h-screen flex items-end justify-center ">
        <motion.div
          style={{ y: yPlanet, opacity, position: 'relative' }}
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <Image
            src={heroImage}
            alt="Planet"
            width={width}
            height={height}
            className="drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};
