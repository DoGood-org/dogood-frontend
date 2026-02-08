'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TimeIcon } from '@/components/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/Popover';

interface TimePickerProps {
  value?: string;
  setValue: (val: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

interface TimeColumnProps {
  label: string;
  items: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i.toString());

const minutes = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, '0')
);

export const TimePicker = ({
  value,
  setValue,
  onBlur,
  placeholder = 'Select time',
}: TimePickerProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState<string | null>(
    value ? value.split('-')[0] : null
  );
  const [selectedMinute, setSelectedMinute] = React.useState<string | null>(
    value ? value.split('-')[1] : null
  );

  React.useEffect(() => {
    if (!value) {
      setSelectedHour(null);
      setSelectedMinute(null);
      return;
    }

    const [h, m] = value.split('-');
    setSelectedHour(h);
    setSelectedMinute(m);
  }, [value]);

  const handleSelect = (h: string | null, m: string | null): void => {
    const newHour = h ?? selectedHour;
    const newMinute = m ?? selectedMinute;

    setSelectedHour(newHour);
    setSelectedMinute(newMinute);

    if (newHour && newMinute) {
      setValue(`${newHour}-${newMinute}`);
    }
  };

  const handleOpenChange = (open: boolean): void => {
    setIsOpen(open);
    if (!open) onBlur?.();
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex justify-between items-center px-3 py-3 md:max-w-[198px] w-full rounded-sm border-2 border-[#999999] bg-white text-black transition-all outline-none cursor-pointer',
            !value && 'text-gray-400'
          )}
        >
          <input
            type="text"
            readOnly
            value={value || ''}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-black placeholder-black cursor-pointer"
          />
          <TimeIcon className="w-6 h-6" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="flex p-0 border-2 border-[#999999] bg-[#999999] shadow-xl w-auto rounded-md overflow-hidden outline-none"
      >
        <TimeColumn
          label="Hrs"
          items={hours}
          selectedValue={selectedHour}
          onSelect={(h: string) => handleSelect(h, selectedMinute || '00')}
        />
        <TimeColumn
          label="Min"
          items={minutes}
          selectedValue={selectedMinute}
          onSelect={(m: string) => handleSelect(selectedHour || '00', m)}
        />
      </PopoverContent>
    </Popover>
  );
};

const TimeColumn = ({
  items,
  selectedValue,
  onSelect,
  label,
}: TimeColumnProps): React.JSX.Element => (
  <div className="w-[100px] flex flex-col border-r border-white/20 last:border-0 bg-[#999999]">
    <div className="text-[10px] font-bold uppercase text-center py-1.5 opacity-80 bg-black/40  dark:bg-black/60 text-white/80">
      {label}
    </div>
    <div className="flex flex-col p-1 overflow-y-auto custom-scrollbar-hide max-h-48">
      {items.map((item: string) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          aria-pressed={selectedValue === item}
          className={cn(
            'px-1 py-1 text-sm rounded-sm text-center transition-all duration-200 mb-0.5 last:mb-0',
            selectedValue === item
              ? 'bg-white/40 text-white font-bold shadow-sm'
              : 'hover:bg-white/20 text-white'
          )}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);
