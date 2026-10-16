import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { FilterSelectProps } from '@/types';
import { JSX } from 'react';

export const FilterSelect = ({
  value,
  onValueChange,
  options,
  placeholderKey,
  placeholder = 'Select...',
  triggerClassName = '',
  contentClassName = '',
  triggerStyle,
}: FilterSelectProps): JSX.Element => {
  const t = useTranslations('adminReviews');
  const resolvedPlaceholder =
    (placeholderKey && t(placeholderKey)) || placeholder;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`w-full cursor-pointer bg-card  text-sm ${triggerClassName}`}
        style={{
          height: '48px',
          borderRadius: '4px',
          borderColor: 'transparent',
          ...triggerStyle,
        }}
      >
        <SelectValue placeholder={resolvedPlaceholder} />
      </SelectTrigger>
      <SelectContent
        className={`bg-card p-3 ${contentClassName}`}
        position="popper"
        sideOffset={4}
        align="start"
        data-ignore-click-outside="true"
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="mb-3 last:mb-0 cursor-pointer hover:text-btn "
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
