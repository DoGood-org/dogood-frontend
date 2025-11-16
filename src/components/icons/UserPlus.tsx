import type { SVGProps } from 'react';
const UserPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#prefix__a)"
    >
      <path d="M18.75 12.75h4.5M21 10.5V15M10.125 15a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25M2.25 18.75C4.177 16.458 6.896 15 10.125 15s5.948 1.458 7.875 3.75" />
    </g>
  </svg>
);
export default UserPlus;
