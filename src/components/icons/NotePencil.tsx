import type { SVGProps } from 'react';

const NotePencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
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
      <path d="M50.333 62.5h-12.5V50l37.5-37.5 12.5 12.5zM65.958 21.875l12.5 12.5" />
      <path d="M84.708 50v31.25a3.125 3.125 0 0 1-3.125 3.125h-62.5a3.125 3.125 0 0 1-3.125-3.125v-62.5a3.125 3.125 0 0 1 3.125-3.125h31.25" />
    </g>
  </svg>
);

export default NotePencil;
