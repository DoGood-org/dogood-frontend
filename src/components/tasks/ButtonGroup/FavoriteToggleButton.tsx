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
        animate={{ scale: isFavorite ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <Favorite
          className={cn(
            'size-6 transition-all duration-300',
            isFavorite
              ? 'text-[#ee0606] fill-[#ee0606] stroke-[#ee0606]'
              : 'text-tag_text fill-transparent stroke-tag_tex'
          )}
        />
      </motion.div>
    </Button>
  );
};
