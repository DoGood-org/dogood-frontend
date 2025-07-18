import type { SVGProps } from 'react';
const Binoculars = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 48 48"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g
      stroke="#F1F1F1"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16.5h9M43.548 28.935l-8.184-18.623a4.5 4.5 0 0 0-6.364 0V31.5M20 31.5V10.312a4.5 4.5 0 0 0-6.364 0L5.45 28.935" />
      <path d="M12.5 39a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15M36.5 39a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15" />
    </g>
  </svg>
);
export default Binoculars;
