import type { SVGProps } from 'react';

export const EllipsisIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="5"
    viewBox="0 0 21 5"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <circle cx="2.5" cy="2.5" r="2" fill="currentColor" />
    <circle cx="10.5" cy="2.5" r="2" fill="currentColor" />
    <circle cx="18.5" cy="2.5" r="2" fill="currentColor" />
  </svg>
);

export default EllipsisIcon;