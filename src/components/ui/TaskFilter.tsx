'use client';

import { JSX, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CaretDown } from '@/components/icons';
import { adminOptions, memberOptions } from '@/constants/taskFilterOptions';
import { Check } from '../icons/Check';
import { motion, AnimatePresence } from 'framer-motion';

type Role = 'ADMIN' | 'MODERATOR' | 'MEMBER';

interface TaskFilterProps {
  role?: Role;
  onChange: (filter: string) => void;
}

export const TaskFilter = ({
  role,
  onChange,
}: TaskFilterProps): JSX.Element => {
  const t = useTranslations('account');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('ALL');

  const options =
    role === 'ADMIN' || role === 'MODERATOR' ? adminOptions : memberOptions;

  const handleSelect = (option: string): void => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div>
      <span className="mr-4">{t('tasks.sortBy')}:</span>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 justify-between p-4 bg-card  rounded-lg shadow transition"
        >
          <span>{t(`tasks.filter.${selected}`)}</span>
          <CaretDown
            className={`size-4 ml-2 transition-transform duration-700 stroke-current ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute z-100 mt-2 w-[200px] bg-card rounded-xl shadow-lg"
            >
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="flex justify-between w-full text-left p-3"
                >
                  <span>{t(`tasks.filter.${option}`)}</span>
                  {selected === option && <Check className="size-4" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
