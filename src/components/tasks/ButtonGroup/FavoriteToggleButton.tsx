'use client';
import { Favorite } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const FavoriteToggleButton: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (): void => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Button variant="iconOnly" size="icon" onClick={handleFavoriteClick}>
      <motion.div
        initial={false}
        animate={
          isFavorite
            ? {
                scale: [1, 1.2, 1],
                filter: [
                  'drop-shadow(0 4px 8px rgba(238,6,6,0.8))',
                  'drop-shadow(0 4px 8px rgba(238,6,6,0))',
                ],
              }
            : {
                scale: 1,
                filter: 'none',
              }
        }
        transition={{
          duration: 0.4,
          ease: 'easeOut',
        }}
      >
        <Favorite
          className={cn(
            'size-6 transition-all duration-300',
            isFavorite
              ? 'text-[#ee0606] fill-[#ee0606] stroke-[#ee0606]'
              : 'text-tag_text fill-transparent stroke-tag_text'
          )}
        />
      </motion.div>
    </Button>
  );
};
