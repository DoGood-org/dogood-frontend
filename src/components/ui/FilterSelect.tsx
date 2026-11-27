import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { JSX } from 'react';
import { FilterSelectProps } from '@/types/admin';

export const FilterSelect = ({
  value,
  onValueChange,
  options,
  translationNamespace = '',
  placeholderKey,
  placeholder,
  triggerClassName = '',
  contentClassName = '',
  triggerStyle,
  disabled = false,
}: FilterSelectProps): JSX.Element => {
  const t = useTranslations(translationNamespace);

  const resolvedPlaceholder =
    placeholder ?? (placeholderKey ? t(placeholderKey) : undefined);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={`w-full cursor-pointer bg-card text-xs md:text-sm border border-transparent transition duration-300 hover:border-border ${triggerClassName}`}
        style={{
          height: '48px',
          borderRadius: '4px',
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
            className="mb-3 last:mb-0 cursor-pointer hover:text-btn"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
