'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { SelectIcon } from '@radix-ui/react-select';
import { TimeIcon } from '@/components/icons';

const times = Array.from({ length: 24 * 2 }, (_, i) => {
  const h = Math.floor(i / 2)
    .toString()
    .padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

const formatDisplayTime = (time: string): string => {
  const [h, m] = time.split(':');
  return `${Number(h)}-${m}`;
};

export const TimePicker = ({
  value = '',
  setValue,
  placeholder = '',
}: {
  value?: string;
  setValue: (val: string) => void;
  placeholder?: string;
}): React.JSX.Element => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        className="w-full bg-white text-base text-black flex justify-between 
      items-center cursor-pointer [&>svg]:hidden py-3 px-2 focus:outline-none
      focus-visible:ring-0 focus-visible:ring-offset-0 rounded-sm border-2 border-[#999999]"
      >
        <SelectValue placeholder={placeholder}>
          {value ? formatDisplayTime(value) : ''}
        </SelectValue>
        <SelectIcon>
          <TimeIcon />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className="w-auto p-0 bg-text-gray text-white">
        {times.map((t) => (
          <SelectItem key={t} value={t}>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
