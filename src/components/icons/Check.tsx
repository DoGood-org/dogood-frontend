import { JSX } from 'react';

export const Check = ({
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
      <path d="M9 16.17L4.83 12l-1.41 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
};
