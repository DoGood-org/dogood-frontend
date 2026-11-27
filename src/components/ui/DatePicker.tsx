'use client';

import React, { JSX, useEffect, useMemo, useState } from 'react';
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
import { DatePickerProps } from '@/types/admin';

const sharedClassNames = {
  day_button:
    'h-9 w-9 p-0 font-normal transition-colors ' +
    'hover:bg-primary/30 hover:text-foreground',
} as const;

const sharedModifiersClassNames = {
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
} as const;

const sharedModifiersStyles = {
  range_start: { backgroundColor: 'transparent', borderRadius: '1px' },
  range_end: { backgroundColor: 'transparent', borderRadius: '1px' },
  range_middle: { backgroundColor: 'transparent' },
} as const;

const toRange = (
  mode: 'single' | 'range',
  value: Date | DateRange | undefined
): DateRange | undefined => {
  if (!value) return undefined;
  if (mode === 'single') return { from: value as Date, to: value as Date };
  return value as DateRange;
};

export const DatePicker = (props: DatePickerProps): JSX.Element => {
  const {
    mode,
    className,
    placeholder,
    numberOfMonths = 2,
    disabled,
    align = 'center',
  } = props;

  const [open, setOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState<Date | undefined>();
  const [draftTo, setDraftTo] = useState<Date | undefined>();
  const t = useTranslations('adminReviews');

  const currentRange = useMemo(
    () => toRange(mode, props.value as Date | DateRange | undefined),
    [mode, props.value]
  );

  useEffect(() => {
    if (open) {
      setDraftFrom(currentRange?.from);
      setDraftTo(currentRange?.to);
    }
  }, [open, currentRange?.from, currentRange?.to]);

  const previewRange: DateRange | undefined = draftFrom
    ? { from: draftFrom, to: draftTo }
    : undefined;

  const calendarKey = `${draftFrom?.toISOString() ?? 'none'}-${
    draftTo?.toISOString() ?? 'none'
  }`;

  const handleDayClick = (day: Date): void => {
    if (mode === 'single') {
      setDraftFrom(day);
      setDraftTo(undefined);
      (props.onChange as (v: Date | undefined) => void)(day);
      setOpen(false);
      return;
    }

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
    if (mode === 'single') {
      (props.onChange as (v: Date | undefined) => void)(draftFrom);
    } else {
      if (draftFrom) {
        (props.onChange as (v: DateRange | undefined) => void)({
          from: draftFrom,
          to: draftTo ?? draftFrom,
        });
      } else {
        (props.onChange as (v: DateRange | undefined) => void)(undefined);
      }
    }
    setOpen(false);
  };

  const handleCancel = (): void => {
    setDraftFrom(undefined);
    setDraftTo(undefined);
  };

  const triggerLabel = placeholder ?? t('selectDate');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            'w-22.5 md:w-45 lg:w-75.5 justify-center bg-card p-3 text-foreground border border-transparent transition duration-300 hover:border-border',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate hidden md:block">{triggerLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-text-gray"
        align={align}
        sideOffset={8}
      >
        {mode === 'single' ? (
          <Calendar
            key={calendarKey}
            mode="single"
            selected={draftFrom}
            onDayClick={handleDayClick}
            numberOfMonths={1}
            classNames={sharedClassNames}
            modifiersClassNames={sharedModifiersClassNames}
            modifiersStyles={sharedModifiersStyles}
          />
        ) : (
          <Calendar
            key={calendarKey}
            mode="range"
            selected={previewRange}
            onDayClick={handleDayClick}
            numberOfMonths={numberOfMonths}
            required={false}
            classNames={sharedClassNames}
            modifiersClassNames={sharedModifiersClassNames}
            modifiersStyles={sharedModifiersStyles}
          />
        )}

        {mode === 'range' && (
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
        )}
      </PopoverContent>
    </Popover>
  );
};
