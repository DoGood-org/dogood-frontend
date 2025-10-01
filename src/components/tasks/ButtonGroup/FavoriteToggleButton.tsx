'use client';
import { Favorite } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const FavoriteToggleButton: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (): void => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Button variant="iconOnly" size="icon" onClick={handleFavoriteClick}>
      <motion.div
        initial={false}
        animate={{ scale: isFavorite ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <Favorite
          className={`size-6 transition-all duration-300 ${
            isFavorite
              ? 'text-red-500 fill-red-500 stroke-red-500' // isFavorite: Червона заливка і, для надійності, червоний контур
              : 'text-gray-400 fill-transparent stroke-gray-400' // !isFavorite: Прозора заливка, сірий контур
          }`}
        />
      </motion.div>
    </Button>
  );
};
