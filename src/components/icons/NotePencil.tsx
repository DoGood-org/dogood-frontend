import type { SVGProps } from 'react';
const NotePencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 101 100"
    {...props}
  >
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#prefix__a)"
    >
      <path d="M50.333 62.5h-12.5V50l37.5-37.5 12.5 12.5zM65.958 21.875l12.5 12.5" />
      <path d="M84.708 50v31.25a3.125 3.125 0 0 1-3.125 3.125h-62.5a3.125 3.125 0 0 1-3.125-3.125v-62.5a3.125 3.125 0 0 1 3.125-3.125h31.25" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.333 0h100v100h-100z" />
      </clipPath>
    </defs>
  </svg>
);
export default NotePencil;
