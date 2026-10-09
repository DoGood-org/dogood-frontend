'use client';

import React, { JSX, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { useTranslations } from 'next-intl';
import { DateRangePickerProps } from '@/types/reviewType';

export const DateRangePicker = ({
  value,
  onChange,
  className,
}: DateRangePickerProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState<Date | undefined>(value?.from);
  const [draftTo, setDraftTo] = useState<Date | undefined>(value?.to);
  const t = useTranslations('adminReviews');
  useEffect(() => {
    if (open) {
      setDraftFrom(value?.from);
      setDraftTo(value?.to);
    }
  }, [open, value?.from, value?.to]);
  const previewRange: DateRange | undefined = draftFrom
    ? { from: draftFrom, to: draftTo }
    : undefined;

  const calendarKey = `${draftFrom?.toISOString() ?? 'none'}-${
    draftTo?.toISOString() ?? 'none'
  }`;

  const handleDayClick = (day: Date): void => {
    if (!draftFrom || (draftFrom && draftTo)) {
      setDraftFrom(day);
      setDraftTo(undefined);
      return;
    }
    if (day < draftFrom) {
      setDraftFrom(day);
      setDraftTo(draftFrom);
    } else {
      setDraftTo(day);
    }
  };
  const handleApply = (): void => {
    if (draftFrom) {
      onChange({ from: draftFrom, to: draftTo ?? draftFrom });
    } else {
      onChange(undefined);
    }
    setOpen(false);
  };
  const handleCancel = (): void => {
    setDraftFrom(undefined);
    setDraftTo(undefined);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'w-[99px] md:w-[165px] justify-center bg-card p-3 text-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate hidden md:block">{t('selectDate')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-text-gray"
        align="center"
        sideOffset={8}
      >
        <Calendar
          key={calendarKey}
          mode="range"
          selected={previewRange}
          onDayClick={handleDayClick}
          numberOfMonths={2}
          classNames={{
            day_button:
              'h-9 w-9 p-0 font-normal transition-colors ' +
              'hover:bg-primary/30 hover:text-foreground',
          }}
          modifiersClassNames={{
            selected:
              'bg-transparent ' +
              '[&>button]:!bg-transparent [&>button]:!text-foreground ' +
              '[&>button]:!border [&>button]:!border-[#2c8c8c] [&>button]:!rounded-md',

            range_start:
              'bg-transparent ' +
              '[&>button]:!bg-transparent [&>button]:!text-foreground ' +
              '[&>button]:!border [&>button]:!border-[#2c8c8c] [&>button]:!rounded-md',

            range_end:
              'bg-transparent ' +
              '[&>button]:!bg-transparent [&>button]:!text-foreground ' +
              '[&>button]:!border [&>button]:!border-[#2c8c8c] [&>button]:!rounded-md',
          }}
          modifiersStyles={{
            range_start: {
              backgroundColor: 'transparent',
              borderRadius: '1px',
            },
            range_end: {
              backgroundColor: 'transparent',
              borderRadius: '1px',
            },
            range_middle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <div className="flex items-center justify-end gap-2 border-t border-border p-3">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            {t('cancelBtn')}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            disabled={!draftFrom}
          >
            {t('applyBtn')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
