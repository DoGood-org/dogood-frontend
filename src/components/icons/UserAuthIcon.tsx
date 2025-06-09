import React from 'react';

type Props = {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
};

const UserAuthIcon: React.FC<Props> = ({

  className,
  fill = 'white',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 59 60"
    fill="none"
    className={`w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] md:w-[59px] md:h-[60px] ${className}`}
   
  >
    <path
      d="M30 36C38.2843 36 45 27.9411 45 18C45 8.05887 38.2843 0 30 0C21.7157 0 15 8.05887 15 18C15 27.9411 21.7157 36 30 36Z"
      fill={fill}
    />
    <path
      d="M58 51.0001C55.3257 45.5863 50.5372 40.707 44 38.0001C42.2172 37.3986 40.4858 38.0978 39 39.0001C36.0286 40.8047 33.5658 41.0001 30 41.0001C26.4343 41.0001 22.9715 40.8047 20 39.0001C18.5143 38.3986 16.7829 38.0978 15 39.0001C8.46282 41.707 3.67435 45.5863 1.00003 51.0001C-1.07999 54.91 1.54284 60.0001 6.00003 60.0001H53C57.4572 60.0001 60.0801 55.2108 58 51.0001Z"
      fill={fill}
    />
  </svg>
);
export default UserAuthIcon;
