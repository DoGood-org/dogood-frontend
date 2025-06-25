import { MotionValue } from 'framer-motion';

export interface HeroContentLayerProps {
  yContent: MotionValue<number>;
  contentOpacity: MotionValue<number>;
}

export interface HeroPlanetLayerProps {
  yPlanet: MotionValue<number>;
  opacity: MotionValue<number>;
}
