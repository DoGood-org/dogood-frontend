'use client';
import { Favorite } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTaskStore } from '@/zustand/stores/taskStore';
import { authStore } from '@/zustand/stores/authStore';
import { useRouter } from 'next/navigation';

interface FavoriteToggleButtonProps {
  taskId: string;
  variant?: 'default' | 'map';
}

const INACTIVE_MAP = 'text-[#fffcfc] fill-transparent stroke-[#fffcfc]';
const INACTIVE_DEFAULT =
  'text-[#1B1B1B] stroke-[#1B1B1B] fill-transparent dark:text-[#fffcfc] dark:stroke-[#fffcfc]';

export const FavoriteToggleButton: React.FC<FavoriteToggleButtonProps> = ({
  taskId,
  variant = 'default',
}) => {
  const isLoggedIn = authStore((s) => s.isLoggedIn);
  const router = useRouter();
  const isFavorite = useTaskStore(
    (s) =>
      isLoggedIn && (s.tasks.find((t) => t.id === taskId)?.isFavorite ?? false)
  );
  const toggleFavorite = useTaskStore((s) => s.toggleFavorite);
  return (
    <Button
      variant="iconOnly"
      size="icon"
      aria-pressed={isFavorite}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
          router.push('/login');
          return;
        }
        toggleFavorite(taskId);
      }}
    >
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
              : variant === 'map'
                ? INACTIVE_MAP
                : INACTIVE_DEFAULT
          )}
        />
      </motion.div>
    </Button>
  );
};
