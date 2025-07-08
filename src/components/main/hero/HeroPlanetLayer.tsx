'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HeroPlanetLayerProps } from '@/types/heroTypes';
import { useMediaQuery } from '@/hooks';
import PlanetMob from '@/assets/images/hero/PlanetMob.png';
import PlanetTabl from '@/assets/images/hero/PlanetTabl.png';
import PlanetDesk from '@/assets/images/hero/PlanetDesck.png';

export const HeroPlanetLayer: React.FC<HeroPlanetLayerProps> = ({
  yPlanet,
  opacity,
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1440px)');

  const heroImage = isMobile ? PlanetMob : isTablet ? PlanetTabl : PlanetDesk;

  return (
    <div className="absolute bottom-[-500px] w-full pointer-events-none z-25">
      <div className="sticky top-0 h-screen flex items-end justify-center ">
        <motion.div
          style={{ y: yPlanet, opacity }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <Image
            src={heroImage}
            alt="Planet"
            width={990}
            height={990}
            className="drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};
