import type { SVGProps } from 'react';
const ShieldCheck = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M27 14V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v7c0 12 11 15 11 15s11-3 11-15" />
      <path d="m11 17 3 3 7-7" />
    </g>
  </svg>
);
export default ShieldCheck;
