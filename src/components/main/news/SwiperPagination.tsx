import { JSX } from 'react';

type Props = {
  className?: string;
  bulletClassName?: string;
  onClick?: () => void;
};
export const SwiperPagination: React.FC<Props> = ({
  className,
  onClick,
  bulletClassName,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      <button
        className={`${bulletClassName} hover:scale-125 bg-transparent `}
        onClick={onClick}
        aria-label="Pagination bullet"
      ></button>
    </div>
  );
};
