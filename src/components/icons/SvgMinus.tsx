import { JSX } from 'react';

export const SvgMinus = ({
  className = 'w-6 h-6',
  fill = 'currentColor',
}: {
  className?: string;
  fill?: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
    >
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
};
