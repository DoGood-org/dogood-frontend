import { Close } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FilterButtonProps } from '@/types/mapType';
import { JSX } from 'react';

export const renderFilterButtons = ({
  items,
  onRemove,
  buttonClassName = 'flex gap-[10px] h-[52px]',
  keyPrefix = 'selected',
}: FilterButtonProps): JSX.Element[] => {
  return items.map((title: string) => (
    <Button
      key={`${keyPrefix}-${title}`}
      variant="filters"
      size="lg"
      className={buttonClassName}
      onClick={() => onRemove(title)}
    >
      {title}
      <Close className="stroke-foreground" />
    </Button>
  ));
};
