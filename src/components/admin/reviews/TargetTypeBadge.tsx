import AboutUs from '@/components/icons/AboutUs';
import Organizations from '@/components/icons/Organizations';
import UserReview from '@/components/icons/UserReview';
import { JSX } from 'react';

type TargetType = 'USER' | 'ORGANIZATION' | 'PLATFORM';
const TARGET_TYPE_COMPONENTS: Record<
  TargetType,
  React.ComponentType<{ className?: string }>
> = {
  USER: UserReview,
  ORGANIZATION: Organizations,
  PLATFORM: AboutUs,
};
interface TargetTypeBadgeProps {
  targetType: string;
  className?: string;
  iconClassName?: string;
  isTargetType?: boolean;
}
export const TargetTypeBadge = ({
  targetType,
  className = 'flex gap-1 items-center capitalize',
  iconClassName = 'h-5 w-5',
  isTargetType = true,
}: TargetTypeBadgeProps): JSX.Element => {
  const normalized = targetType.toUpperCase() as TargetType;
  const TargetComponent = TARGET_TYPE_COMPONENTS[normalized];

  return (
    <div className={className}>
      <span className="w-5">
        {TargetComponent && <TargetComponent className={iconClassName} />}
      </span>
      {isTargetType && (
        <span className="hidden md:block truncate">
          {targetType.toLowerCase()}
        </span>
      )}
    </div>
  );
};
