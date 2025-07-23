'use client';
import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';
import { JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  className?: string;
  onClick?: () => void;
  isOpen?: boolean;
};

export const ButtonOpenTasks = ({
  className = '',
  onClick,
  isOpen = false,
}: Props): JSX.Element => {
  return (
    <Button
      type="button"
      variant={'secondary'}
      onClick={onClick}
      className={`transition py-1 p-0 w-full inline-flex items-center justify-center border-0 rounded-none ${className}`}
    >
      <div className="w-[76px] h-full">
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="flex items-center gap-2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              {!isOpen && (
                <motion.p
                  key="tasks-label"
                  className="block font-normal text-center"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  Tasks
                </motion.p>
              )}
            </AnimatePresence>

            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </Button>
  );
};
