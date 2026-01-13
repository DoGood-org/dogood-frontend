import type { SVGProps } from 'react';
const ShootingStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <g
      stroke="#00C1AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="m20.5 16.207 4.473 2.692a.683.683 0 0 0 1.024-.733l-1.217-5.024 3.98-3.36a.672.672 0 0 0-.385-1.185l-5.224-.413-2.012-4.768a.69.69 0 0 0-1.265 0l-2.012 4.768-5.224.413a.672.672 0 0 0-.392 1.185l3.98 3.36L15 18.166a.683.683 0 0 0 1.024.733zM10.306 14.693 3 22M11.658 22.342 5 28.999M20.785 22.215 14 29" />
    </g>
  </svg>
);
export default ShootingStar;
