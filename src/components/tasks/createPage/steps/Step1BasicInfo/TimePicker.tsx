'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/Popover';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { TimeIcon } from '@/components/icons';

const times = Array.from({ length: 24 * 2 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}-${m}`;
});

interface TimePickerProps {
  value?: string;
  setValue: (val: string) => void;
  placeholder?: string;
}

export const TimePicker = ({
  value = '',
  setValue,
  placeholder = 'Time',
}: TimePickerProps): React.JSX.Element | null => {
  const [open, setOpen] = React.useState(false);
  const selectedRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (open && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: 'center',
      });
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'w-full flex justify-between items-center px-2 py-3 rounded-sm border-2',
          'border-[#999999] bg-white hover:bg-gray-50 transition-colors text-left',
          !value && 'text-gray-500'
        )}
      >
        <span className={'text-black'}>{value ? value : placeholder}</span>
        <TimeIcon className="w-6 h-6" />
      </PopoverTrigger>

      <PopoverContent
        className="w-full max-h-60 overflow-y-auto custom-scrollbar-hide bg-text-gray text-white rounded-sm shadow-lg p-0"
        align="start"
      >
        <div className="flex flex-col">
          {times.map((t) => {
            const isSelected = t === value;
            return (
              <button
                key={t}
                ref={isSelected ? selectedRef : null}
                type="button"
                className={cn(
                  'px-4 py-2 h-[48px] cursor-pointer transition-colors',
                  'hover:bg-white/20',
                  isSelected && 'bg-white/30 font-bold'
                )}
                onClick={() => {
                  setValue(t);
                  setOpen(false);
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
