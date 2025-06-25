'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Planet from '../../../assets/images/hero/planet.png';
import { HeroPlanetLayerProps } from '@/types/heroTypes';

export const HeroPlanetLayer: React.FC<HeroPlanetLayerProps> = ({
  yPlanet,
  opacity,
}) => {
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
            src={Planet}
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
