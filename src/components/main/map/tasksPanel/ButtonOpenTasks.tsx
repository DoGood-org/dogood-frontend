'use client';
import { JSX } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMapStore } from '@/zustand/stores/mapStore';
import { ChevronDown } from '@/components/icons';

type Props = {
  className?: string;
  onClick?: () => void;
  dragListener?: boolean;
};

export const ButtonOpenTasks = ({
  className = '',
  onClick,
  dragListener = true,
}: Props): JSX.Element => {
  const { activePanel } = useMapStore();
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <motion.button
      id="tasksButton"
      type="button"
      onClick={clickHandler}
      dragListener={dragListener}
      className={`transition items-center justify-center border-0 rounded-none cursor-pointer  ${className}`}
    >
      <div className=" h-full">
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            className="flex items-center gap-2"
            animate={{ rotate: activePanel === 'tasks' ? 180 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              {activePanel !== 'tasks' && (
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
    </motion.button>
  );
};
