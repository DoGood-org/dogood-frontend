import type { SVGProps } from 'react';
const CheckSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#prefix__a)">
      <rect width={24} height={24} fill="#2C8C8C" rx={4} />
      <path
        stroke="#FFFCFC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.25 12.75 10.5 15l5.25-5.25"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <rect width={24} height={24} fill="#fff" rx={4} />
      </clipPath>
    </defs>
  </svg>
);
export default CheckSquare;
