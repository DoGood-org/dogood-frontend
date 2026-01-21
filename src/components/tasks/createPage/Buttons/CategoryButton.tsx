import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { JSX } from 'react';

interface CategoryButtonProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  colorClass?: string;
  onClick: () => void;
  isSelected?: boolean;
  withWhiteCircle?: boolean;
}

export const CategoryButton = ({
  icon: Icon,
  label,
  colorClass,
  onClick,
  isSelected,
  withWhiteCircle,
}: CategoryButtonProps): JSX.Element => {
  return (
    <div>
      <Button
        onClick={onClick}
        variant="ghost"
        size="md"
        className={cn(
          colorClass,
          'relative flex items-center justify-start gap-2 h-[56px] w-full',
          isSelected ? 'border-2 border-white' : ''
        )}
      >
        {Icon && (
          <>
            {withWhiteCircle ? (
              <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-white">
                <Icon className="w-2 h-2" />
              </div>
            ) : (
              <Icon className="w-6 h-6 mr-3" />
            )}
          </>
        )}

        <span>{label}</span>
      </Button>
    </div>
  );
};
